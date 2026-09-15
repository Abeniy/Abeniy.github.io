import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import sharp from 'sharp';
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
await mkdir('../outputs',{recursive:true});
for(const [size,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 page.on('pageerror',e=>console.error(e.message));
 await page.goto('http://localhost:3000/camp-preview/',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('canvas')).opacity==='1');
 await page.getByRole('button',{name:'暂停场景动画'}).click();await page.waitForTimeout(600);
 await sharp(await page.locator('canvas').screenshot()).webp({quality:90}).toFile('public/scene/blockout-'+size+'.webp');
 await page.screenshot({path:'../outputs/blockout-'+size+'.png'});
 console.log(size,await page.locator('a[aria-label="篝火：作品"]').getAttribute('style'));await page.close();
}
await browser.close();
