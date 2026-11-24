import os
from playwright.sync_api import sync_playwright
from pathlib import Path
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROME_PATH'),args=['--no-sandbox']); page=b.new_page(viewport={'width':1440,'height':1000}); errors=[];page.on('pageerror',lambda e:errors.append(str(e))); page.set_content((Path(__file__).resolve().parents[1]/'preview/index.html').read_text(encoding='utf-8'),wait_until='domcontentloaded');page.set_default_timeout(5000);page.wait_for_timeout(300)
 assert page.locator('.milestones li').count()==7
 assert 'Innotech 2026 · Departmental winner' in page.locator('.milestones').inner_text()
 assert 'Smart India Hackathon 2026 · Institute-level selection' in page.locator('.milestones').inner_text()
 assert 'Institute-level Smart India Hackathon 2025 selection' in page.locator('.milestones').inner_text()
 assert page.locator('h1').inner_text().endswith('Tejasvi Gupta.')
 assert page.locator('.nav .brand-word, .nav [data-command]').count()==0
 assert page.locator('.nav .brand-mark').inner_text()=='TG.'
 assert page.locator('.portrait-img img').evaluate('(e)=>e.complete && e.naturalWidth>0')
 page.screenshot(path='desktop.png')
 page.locator('button[data-theme]').click();assert page.locator('html').get_attribute('data-theme')=='light';page.wait_for_timeout(350);page.screenshot(path='light.png');page.locator('button[data-theme]').click()
 page.locator('[data-filter="AI"]').click();assert page.locator('.project:visible').count()==1
 page.locator('[data-project="netra"]').first.click();assert page.locator('#project-dialog').evaluate('(e)=>e.open');assert page.locator('#project-detail img').evaluate('(e)=>e.complete && e.naturalWidth>0');page.keyboard.press('Escape')
 page.locator('[data-filter="all"]').click();assert page.locator('.project:visible').count()==4
 page.locator('[data-skill="React"]').click();assert 'NETRA' in page.locator('#skill-result').inner_text()
 page.keyboard.press('Control+k');page.locator('#command-search').fill('attendance');assert page.locator('#commands button').count()==1;page.keyboard.press('Enter');assert 'Attendance Management System' in page.locator('#project-detail h2').inner_text();page.keyboard.press('Escape')
 with page.expect_download() as dl: page.locator('[data-resume]').first.click()
 assert dl.value.suggested_filename=='Tejasvi_Gupta_Resume.pdf'
 page.locator('[data-view-resume]').click();assert page.locator('#resume-dialog').evaluate('(e)=>e.open');page.keyboard.press('Escape')
 mobile=b.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=1);mobile.set_content((Path(__file__).resolve().parents[1]/'preview/index.html').read_text(encoding='utf-8'),wait_until='domcontentloaded');mobile.wait_for_timeout(350);assert mobile.evaluate('document.documentElement.scrollWidth <= innerWidth');mobile.screenshot(path='mobile.png');assert not errors,errors
 print('PASS: image loading, theme toggle, project filters, dialogs, skill explorer, command palette, PDF download, resume dialog, mobile width; no page errors')
 b.close()
