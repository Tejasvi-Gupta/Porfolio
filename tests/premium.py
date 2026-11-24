import os
"""V2 regression suite: run with Python Playwright and Chromium installed."""
from pathlib import Path
from playwright.sync_api import sync_playwright
html=(Path(__file__).resolve().parents[1]/'preview/index.html').read_text(encoding='utf-8')
def load(page):
 page.set_content(html,wait_until='domcontentloaded')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROME_PATH'),args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1000}); errors=[]; page.on('pageerror',lambda e:errors.append(str(e)))
 load(page); page.wait_for_timeout(350)
 assert page.locator('html').get_attribute('data-effects')=='active'
 card=page.locator('.portrait'); card.hover(position={'x':25,'y':40}); page.wait_for_timeout(250)
 assert card.evaluate("e=>e.style.getPropertyValue('--rx')") not in ('','0deg')
 assert card.evaluate("e=>e.style.getPropertyValue('--x')") not in ('','50%')
 page.locator('[data-motion]').click(); assert page.locator('html').get_attribute('data-effects')=='paused'
 card.hover(); assert card.evaluate("e=>e.style.getPropertyValue('--rx')")==''
 page.locator('[data-motion]').click(); assert page.locator('html').get_attribute('data-effects')=='active'
 page.locator('button[data-theme]').click(); assert page.locator('html').get_attribute('data-theme')=='light'; page.locator('button[data-theme]').click()
 page.locator('nav a[href="#work"]').click(); page.wait_for_timeout(1000); assert page.locator('nav a[href="#work"]').get_attribute('aria-current')=='location'
 assert page.locator('.scroll-meter').evaluate("e=>e.style.transform") not in ('','scaleX(0)')
 page.screenshot(path='projects.png')
 page.evaluate('window.scrollTo(0,0)'); page.wait_for_timeout(1000)
 page.screenshot(path='desktop.png')
 page.locator('button[data-theme]').click(); page.wait_for_timeout(400); page.screenshot(path='light.png')
 for w in [320,390,768,1024]:
  m=b.new_page(viewport={'width':w,'height':900},is_mobile=w<761,has_touch=w<761,device_scale_factor=1)
  load(m); m.wait_for_timeout(350); assert m.evaluate('document.documentElement.scrollWidth <= innerWidth'),w
  assert m.locator('nav a:visible').count()==4,w
  if w==390:m.screenshot(path='mobile.png')
  m.close()
 r=b.new_page(reduced_motion='reduce');load(r); assert r.locator('html').get_attribute('data-effects')=='paused';assert r.locator('[data-motion]').is_disabled()
 assert not errors,errors
 print('PASS V2: pointer tilt/spotlight, pause/resume, theme switching, scroll progress and active navigation, four viewport widths, system reduced motion, no JS errors on desktop.')
 b.close()
