import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
await mkdir('public/scene',{recursive:true});
await mkdir('test-results',{recursive:true});
for(const [size,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>{const c=document.querySelector('canvas');return c&&getComputedStyle(c).opacity==='1';},{timeout:30000});
 for(const theme of ['day','night']){
  await page.evaluate(t=>{localStorage.setItem('abeniy-theme',t);},theme);await page.reload({waitUntil:'networkidle'});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('canvas')).opacity==='1');
  await page.getByRole('button',{name:'暂停场景动画'}).click();
  await page.waitForTimeout(600);
  const image=await page.locator('canvas').screenshot();
  await sharp(image).webp({quality:88}).toFile(`public/scene/${theme}-${size}.webp`);
  await page.screenshot({path:`test-results/${theme}-${size}.png`});
 }
 console.log(JSON.stringify({size,errors}));await page.close();
}
await browser.close();
