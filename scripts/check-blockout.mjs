import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
for(const width of [360,768,1440]){
 const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000/camp-preview/',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('canvas')).opacity==='1');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 if(width<=760)await page.getByRole('button',{name:'打开导航'}).click();
 assert.equal(await page.getByRole('navigation').getByRole('link').count(),5);
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'暂停场景动画'}).click();await page.waitForTimeout(500);
 const a=await page.locator('canvas').evaluate(c=>c.toDataURL());await page.waitForTimeout(200);
 assert.equal(a,await page.locator('canvas').evaluate(c=>c.toDataURL()));
 assert.deepEqual(errors,[]);console.log('viewport/pause/nav PASS',width);await page.close();
}
for(const fallback of ['reduce','webgl']){
 const page=await browser.newPage({reducedMotion:fallback==='reduce'?'reduce':'no-preference'});
 if(fallback==='webgl')await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return String(type).includes('webgl')?null:get.call(this,type,...args);};});
 await page.goto('http://localhost:3000/camp-preview/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('main picture img').evaluate(i=>i.complete&&i.naturalWidth>0),true);
 assert.equal(await page.locator('canvas').evaluate(c=>getComputedStyle(c).opacity),'0');
 assert.equal(await page.getByRole('button',{name:'暂停场景动画'}).count(),0);
 console.log('fallback PASS',fallback);await page.close();
}
await browser.close();
