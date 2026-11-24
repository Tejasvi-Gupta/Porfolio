import os
from playwright.sync_api import sync_playwright
from pathlib import Path
import json, re
from urllib.parse import unquote
html=(Path(__file__).resolve().parents[1]/'preview/index.html').read_text(encoding='utf-8')
# Exercise the unconfigured fallback independently of the deployed public settings.
html, count = re.subn(r'"emailjs":\{[^{}]*\}', '"emailjs":{"serviceId":"","templateId":"","publicKey":""}', html, count=1)
assert count == 1
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROME_PATH'),args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':844});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.set_content(html,wait_until='domcontentloaded');page.set_default_timeout(5000)
 # Copy silently, including fallback and failure paths.
 before=page.locator('#contact').inner_text();assert before.count('tejasvi.work08@gmail.com')==1
 page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied')}}});document.execCommand=(cmd)=>{window.fallbackCopied=document.activeElement.value;return true}")
 page.locator('[data-copy]').click();assert page.evaluate('window.fallbackCopied')=='tejasvi.work08@gmail.com';assert page.locator('#contact').inner_text()==before
 page.evaluate("document.execCommand=()=>{throw new Error('denied')};void 0");page.locator('[data-copy]').click();assert page.locator('#contact').inner_text()==before;assert page.locator('#copy-status').count()==0
 page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(t)=>{window.copiedEmail=t}}})")
 page.locator('[data-copy]').click();assert page.evaluate('window.copiedEmail')=='tejasvi.work08@gmail.com';assert page.locator('#contact').inner_text()==before
 page.locator('[data-email-me]').click();assert page.locator('#email-dialog').evaluate('(e)=>e.open');assert page.locator('#email-form').evaluate('(e)=>!e.checkValidity()')
 def fill():
  for k,v in {'name':'Jane & Doe','email':'jane@example.com','subject':'SDE & cloud','message':'Hello!\nInterested in your work.'}.items():page.locator('#email-form [name='+k+']').fill(v)
 fill();page.evaluate("document.querySelector('#email-draft').addEventListener('click',e=>{e.preventDefault();window.draftClicked=true})");page.locator('#email-submit').click();assert page.evaluate('window.draftClicked');href=unquote(page.locator('#email-draft').get_attribute('href'));assert 'mailto:tejasvi.work08@gmail.com?subject=SDE & cloud' in href and 'Jane & Doe' in href;assert 'no message has been sent' in page.locator('#email-status').inner_text();assert page.evaluate('document.documentElement.scrollWidth <= innerWidth');assert page.locator('#email-dialog').evaluate('(e)=>e.scrollWidth <= e.clientWidth+1');page.screenshot(path='contact.png');page.keyboard.press('Escape')
 # Test configured request logic with mock transport, not a real send.
 mock=html.replace('"emailjs":{"serviceId":"","templateId":"","publicKey":""}', '"emailjs":{"serviceId":"test_service","templateId":"test_template","publicKey":"test_public"}')
 assert mock!=html
 page.set_content(mock.replace('<script>','<script>window.fetch=async(url,options)=>{window.lastRequest={url,body:JSON.parse(options.body)};return {ok:!window.failEmail}};</script><script>',1),wait_until='domcontentloaded');page.locator('[data-email-me]').click();fill();page.locator('#email-submit').click();page.wait_for_function("document.querySelector('#email-status').textContent.includes('accepted')");r=page.evaluate('window.lastRequest');assert r['url']=='https://api.emailjs.com/api/v1.0/email/send' and r['body']['template_params']['reply_to']=='jane@example.com';assert r['body']['user_id']=='test_public';assert page.locator('#email-form [name=name]').input_value()=='';page.wait_for_timeout(3100);page.evaluate('window.failEmail=true');fill();page.locator('#email-submit').click();page.wait_for_function("document.querySelector('#email-status').textContent.includes('Could not confirm')");assert page.locator('#email-form [name=name]').input_value()=='Jane & Doe';assert not errors,errors;print('PASS: contact modal, validation, encoded mailto, mobile width, mocked EmailJS success/failure; no live email sent');b.close()
