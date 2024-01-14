from django.http import JsonResponse
from .auth import devboard_access
from django.urls import path
import smtplib
from email.mime.text import MIMEText
from devboard.models import Email
import json
import imaplib
import email as emaillib
import re

@devboard_access
def get_emails(request):
    emails = Email.objects.all()
    return JsonResponse({
        'emails': [email.json() for email in emails]
    })

@devboard_access
def get_email_info(request, email):
    email = Email.objects.filter(email=email).first()
    return JsonResponse(email.json())

@devboard_access
def send_email(request):
    email = Email.objects.filter(email=request.POST.get('email')).first()
    msg = MIMEText(request.POST.get('content'))
    msg['Subject'] = request.POST.get('subject')
    msg['From'] = email.email
    msg['To'] = request.POST.get('recipients')
    with smtplib.SMTP(email.smtp, email.port_smtp) as smtp_server:
        smtp_server.starttls()
        smtp_server.login(email.email, email.password)
        smtp_server.sendmail(email.email, request.POST.get('recipients'), msg.as_string())
    return JsonResponse({})


def search_string(uid_max, criteria):
    c = list(map(lambda t: (t[0], '"'+str(t[1])+'"'), criteria.items())) + [('UID', '%d:*' % (uid_max+1))]
    return '(%s)' % ' '.join(chain(*c))

@devboard_access
def read_inbox(request, email):
    email = Email.objects.filter(email=email).first()

    with imaplib.IMAP4_SSL(email.imap, email.port_imap) as imap_server:
        imap_server.login(email.email, email.password)
        _, messages = imap_server.select(request.GET.get('folder') or 'inbox')
        length = request.GET.get('length') or 30
        page = request.GET.get('page') or 0
        email_counter = int(messages[0])

        emails = []
        for email_index in range(email_counter-int(page)*int(length), email_counter-int(page)*int(length) - int(length), -1):
            res, msg = imap_server.fetch(str(email_index), b'RFC822')    
            email_info = {}
            for response in msg:
                if isinstance(response, tuple):
                    msg = emaillib.message_from_bytes(response[1])
                    subject, encoding = emaillib.header.decode_header(msg['Subject'])[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding or 'utf-8')
                    
                    fromHeader, encoding = emaillib.header.decode_header(msg.get('From'))[0]

                    if isinstance(fromHeader, bytes):
                        fromHeader = fromHeader.decode(encoding or 'utf-8')

                    fromHeader = str(fromHeader)
                    pattern = re.compile(r'"?(?P<name>[\w\s]+)"?\s?<(?P<email>[\w\.-]+@[\w\.-]+)>')
                    match = pattern.search(str(fromHeader))
                    if match:
                        fromName = match.group('name')
                        fromEmail = match.group('email')
                    else:
                        fromName = fromHeader
                        fromEmail = fromHeader
                
                    email_info['subject'] = subject
                    email_info['fromName'] = fromName
                    email_info['fromEmail'] = fromEmail
                    email_info['id'] = email_index

                    if msg.is_multipart():
                        for part in msg.walk():
                            content_type = part.get_content_type()
                            content_disposition = str(part.get("Content-Disposition"))
                            try:
                                body = part.get_payload(decode=True).decode()
                            except:
                                pass
                            if content_type == 'text/plain':
                                email_info['body'] = body
                    else:
                        content_type = msg.get_content_type()
                        body = msg.get_payload(decode=True).decode()
                    if content_type in ("text/plain", "text/html"):
                        email_info['body'] = body
                email_info
            emails.append(email_info)
    return JsonResponse({
        'email_counter': email_counter,
        'emails': [eml for eml in emails]
    })

@devboard_access
def connect_email(request):
    emailData = json.loads(request.POST.get('emailData'))
    error_connecting = False

    try:
        with smtplib.SMTP(emailData['smtpUrl'], emailData['smtpPort']) as smtp_server:
            smtp_server.starttls()
            smtp_server.login(emailData['email'], emailData['password'])
    except:
        error_connecting = True

    try:
        with imaplib.IMAP4_SSL(emailData['imapUrl'], emailData['imapPort']) as smtp_server:
            smtp_server.login(emailData['email'], emailData['password'])
    except:
        error_connecting = True

    if not error_connecting:
        email_exists = Email.objects.filter(email=emailData['email']).exists()
        if not email_exists:
            email = Email(
                email=emailData['email'],
                password=emailData['password'],
                smtp=emailData['smtpUrl'],
                imap=emailData['imapUrl'],
                port_smtp=emailData['smtpPort'],
                port_imap=emailData['imapPort'],
                name=emailData['name']
            )
            email.save()

    return JsonResponse({
        'error': error_connecting
    })

@devboard_access
def star_email(request):
    email = Email.objects.filter(email=request.POST.get('email')).first()
    email.star = request.POST.get('star') == 'true'
    email.save()
    return JsonResponse({})

urlpatterns = [
    path('send/', send_email),
    path('all/', get_emails),
    path('info/<email>/', get_email_info),
    path('inbox/<email>/', read_inbox),
    path('connect/', connect_email),
    path('star/', star_email),
]
