from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import re
from threading import Thread
import re
from termcolor import colored
from queue import Queue, Empty
import subprocess
import pty
import time
import os

def remove_terminal_codes(s):
    return re.sub(r'\x1b\[\d*m', '', s)

class Runner:
    def __init__(self, program, args, interval=1):
        self.master, self.slave = pty.openpty()
        self.program = [program, *args]
        self.lineQueue = Queue()
        self.errorLineQueue = Queue()
        self.thread = None
        self.interval = interval

    def run_command(self, ansi_code):
        os.write(self.master, ansi_code)

    def enqueue_output(self, out, queue):
        try:
            while True:
                o = out.read(1)
                if not o: time.sleep(0.3) 
                queue.put(str(o))
        except:
            ...

    def start(self):
        self.proc = subprocess.Popen(
            self.program,
            stdin=self.slave,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=0,
        )
        self.thread = Thread(target=self.enqueue_output, args=(self.proc.stdout, self.lineQueue))
        self.errorThread = Thread(target=self.enqueue_output, args=(self.proc.stderr, self.errorLineQueue))
        self.thread.daemon = True
        self.errorThread.daemon = True
        self.thread.start()
        self.errorThread.start()
