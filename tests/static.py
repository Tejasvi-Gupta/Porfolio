"""Check the deployment artifact over HTTP and verify local assets and anchors."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
from urllib.request import urlopen, Request
from html.parser import HTMLParser
import hashlib, json
root=Path(__file__).resolve().parents[1]/'out'
class Parser(HTMLParser):
 def __init__(self): super().__init__(); self.ids=[];self.local=[];self.anchors=[];self.external=[];self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  for k in ('href','src'):
   v=a.get(k,'').split('?')[0]
   if v.startswith('/') and not v.startswith('//'):self.local.append(v)
   if v.startswith('#') and len(v)>1:self.anchors.append(v[1:])
  if tag=='a' and a.get('target')=='_blank':assert 'noopener' in a.get('rel','').split(),a
  if tag=='img':assert a.get('alt'),a
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
s=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(root))); Thread(target=s.serve_forever,daemon=True).start()
base=f'http://127.0.0.1:{s.server_port}'
try:
 with urlopen(base+'/',timeout=4) as r:assert r.status==200;html=r.read().decode();assert r.headers.get_content_type()=='text/html'
 p=Parser();p.feed(html);assert len(p.ids)==len(set(p.ids));assert set(p.anchors)<=set(p.ids),set(p.anchors)-set(p.ids)
 files=set(p.local)|{'/images/netra.webp','/resume/Tejasvi_Gupta_Resume.pdf'}
 for f in sorted(files):
  with urlopen(base+f,timeout=4) as r:
   assert r.status==200;content=r.read();assert content==((root/f.lstrip('/'))/('index.html' if f.endswith('/') else '')).read_bytes();print('200',f,len(content),r.headers.get_content_type())
 assert (root/'resume/Tejasvi_Gupta_Resume.pdf').read_bytes().startswith(b'%PDF-')
 print('PASS: HTTP document and local assets, exact served file bytes, anchors, unique IDs, image alternative text and external target protections.')
finally:s.shutdown();s.server_close()
