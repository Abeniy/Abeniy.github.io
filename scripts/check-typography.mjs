import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
await mkdir('../outputs',{recursive:true});
const errors=[];
for(const width of [360,390,768,1440]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 for(const theme of ['day','night']){
  await page.addInitScript(()=>localStorage.setItem('abeniy-theme',window.name));
  await page.evaluate(t=>window.name=t,theme);
  for(const path of ['about','experience','works','gaming','lab','works/brush3d']){
   await page.goto('http://localhost:3000/'+path+'/',{waitUntil:'networkidle'});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+path+' '+width);
   assert.equal(await page.locator('h1').evaluate(e=>getComputedStyle(e).fontSize),path==='about'?'28px':'26px');
   assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).fontSize),'14px');
   assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
   if(path==='works')assert.equal(await page.locator('main article').count(),8);
   if(width===1440||width===390)await page.screenshot({path:'../outputs/type-small-'+path.replace('/','-')+'-'+theme+'-'+width+'.png',fullPage:true});
  }
 }
 await page.goto('http://localhost:3000/works/');
 const links=await page.locator('main article h2 a').evaluateAll(es=>es.map(e=>e.href));
 for(const link of links){await page.goto(link);await page.getByRole('link',{name:'返回全部作品'}).click();await page.waitForURL('**/works/');}
 if(width<761){await page.getByRole('button',{name:'打开导航'}).click();await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'打开导航'}).getAttribute('aria-expanded'),'false');}
 await page.goto('http://localhost:3000/about/');await page.keyboard.press('Tab');
 assert(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none'));
 console.log('PASS layout/themes/links/keyboard',width);await page.close();
}
// A 720 CSS-pixel viewport represents the reflow width of a 1440px window at 200% zoom.
const zoom=await browser.newPage({viewport:{width:720,height:500},deviceScaleFactor:2,reducedMotion:'reduce'});
await zoom.goto('http://localhost:3000/about/');assert(await zoom.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await zoom.getByRole('button',{name:'打开导航'}).click();
assert(await zoom.getByRole('navigation').isVisible());console.log('PASS 200% equivalent reflow (not native browser zoom)');
assert.deepEqual(errors,[]);await browser.close();
