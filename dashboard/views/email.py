from django.http import JsonResponse
from .auth import dashboard_access
from django.urls import path
import smtplib
from email.mime.text import MIMEText
from dashboard.models import Email
import ssl
import imaplib
import email as emaillib


@dashboard_access
def get_emails(request):
    emails = Email.objects.all()
    return JsonResponse({
        'emails': [email.json() for email in emails]
    })

@dashboard_access
def get_email_info(request, email):
    email = Email.objects.filter(email=email).first()
    return JsonResponse(email.json())

@dashboard_access
def send_email(request):
    email = Email.objects.filter(email=request.POST.get('email')).first()
    msg = MIMEText(request.POST.get('content'))
    msg['Subject'] = request.POST.get('subject')
    msg['From'] = email.email
    msg['To'] = request.POST.get('to')
    with smtplib.SMTP(email.smtp, email.port_smtp) as smtp_server:
        smtp_server.starttls()
        smtp_server.login(email.email, email.password)
        smtp_server.sendmail(email.email, request.POST.get('to'), msg.as_string())
    return JsonResponse({})


def search_string(uid_max, criteria):
    c = list(map(lambda t: (t[0], '"'+str(t[1])+'"'), criteria.items())) + [('UID', '%d:*' % (uid_max+1))]
    return '(%s)' % ' '.join(chain(*c))

@dashboard_access
def read_inbox(request, email):
    email = Email.objects.filter(email=email).first()
    with imaplib.IMAP4_SSL(email.imap) as imap_server:
        imap_server.login(email.email, email.password)
        status, messages = imap_server.select(request.GET.get('folder') or 'inbox')
        length = request.GET.get('length') or 30
        page = request.GET.get('page') or 0
        email_counter = int(messages[0])
        print("Email counter:", email_counter)
        emails = []
        for email_index in range(email_counter-int(page)*int(length), email_counter-int(page)*int(length) - int(length), -1):
            res, msg = imap_server.fetch(str(email_index), "(RFC822)")    
            email_info = {}        
            for response in msg:
                if isinstance(response, tuple):
                    msg = emaillib.message_from_bytes(response[1])
                    subject, encoding = emaillib.header.decode_header(msg.get('Subject'))[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding)
                    
                    fromHeader, encoding = emaillib.header.decode_header(msg.get('From'))[0]
                    if isinstance(fromHeader, bytes):
                        fromHeader = fromHeader.decode(encoding)
                
                    email_info['subject'] = subject
                    email_info['from'] = fromHeader

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

urlpatterns = [
    path('send/', send_email),
    path('all/', get_emails),
    path('info/<email>/', get_email_info),
    path('inbox/<email>/', read_inbox),
]