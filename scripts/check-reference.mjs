import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const b=await chromium.launch({channel:'msedge',headless:true});
const measurements=[];
for(const width of [360,390,768,1440])for(const theme of ['day','night']){
const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
await p.addInitScript(t=>localStorage.setItem('abeniy-theme',t),theme);
await p.goto('http://localhost:3000/about/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
const data=await p.evaluate(()=>{const h=document.querySelector('h1'),s=document.querySelector('main section h2');return {titleX:h.getBoundingClientRect().x,titleY:h.getBoundingClientRect().y,sectionX:s.getBoundingClientRect().x,sectionY:s.getBoundingClientRect().y,bg:getComputedStyle(document.body).backgroundColor,font:getComputedStyle(h).fontSize,scroll:getComputedStyle(document.querySelector('main')).overflowY}});
if(theme==='day')assert.equal(data.bg,'rgb(250, 249, 246)');
assert.equal(data.font,'28px');
if(width===1440){assert(Math.abs(data.titleX-656)<=2);assert(Math.abs(data.titleY-108)<=2);assert(Math.abs(data.sectionY-404)<=2);assert.equal(data.scroll,'auto');}
if(width===1440||width===390)await p.screenshot({path:'../outputs/exact-about-'+theme+'-'+width+'.png'});
if(width>768)await p.setViewportSize({width,height:600});
await p.locator('main').evaluate(e=>e.scrollTop=500);
if(width>768)assert(await p.locator('main').evaluate(e=>e.scrollTop>0));
await p.keyboard.press('Tab');assert(await p.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none'));
measurements.push({width,theme,...data});await p.close();
}
const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('https://chaimi-s-bolg.netlify.app/#/about?tab=profile',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'../outputs/exact-reference-1440.png'});
measurements.push({reference:await p.locator('.about-section-title').first().evaluate(e=>({x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y}))});
await p.close();
const fallback=await b.newPage({viewport:{width:390,height:844}});
await fallback.route('**/fonts/**',route=>route.abort());await fallback.goto('http://localhost:3000/about/');
assert(await fallback.locator('h1').isVisible());assert(await fallback.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
console.log(JSON.stringify(measurements,null,2));console.log('PASS coordinates, colors, responsive, scroll, focus, font fallback');
await writeFile('../outputs/exact-measurements.json',JSON.stringify(measurements,null,2));await b.close();
