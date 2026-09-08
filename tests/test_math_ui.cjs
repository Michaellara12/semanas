const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8765';
(async()=>{
 fs.mkdirSync('tmp/reforma',{recursive:true});
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/reforma/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('[data-math]').count(),5);
 assert.equal(await page.locator('.math-detail[open]').count(),0);
 const initial=await page.locator('[data-result]').allTextContents();
 for(const [i,card] of (await page.locator('[data-math]').all()).entries()){
  await card.scrollIntoViewIfNeeded();
  const img=card.locator('img');await img.evaluate(el=>el.decode());
  for(const input of await card.locator('input[type=number]').all()){
   const old=await card.locator('[data-result]').textContent();
   const max=await input.getAttribute('max');await input.fill(max);await input.dispatchEvent('input');
   assert.notEqual(await card.locator('[data-result]').textContent(),old,'Variable has no visible effect: '+await input.getAttribute('aria-label'));
   await card.locator('[data-reset]').click();
  }
  assert.deepEqual(await page.locator('[data-result]').allTextContents(),initial,'Simulator must be independent and resettable');
  await card.locator('summary').click();
  await card.locator('.math-detail .term').first().click();
  assert.equal(await page.locator('#gloss.open').count(),1);
  assert.ok((await page.locator('#gloss-body').textContent()).includes('Ejemplo'));
  await page.keyboard.press('Escape');await page.waitForTimeout(300);
  assert.equal(await page.locator('#gloss').isVisible(),false,'Closed drawer must be hidden');
  await card.locator('summary').click();
  await card.locator('footer .cite').click();assert.equal(await page.locator('#gloss.open').count(),1);
  await page.keyboard.press('Escape');await page.waitForTimeout(300);
  assert.equal(await page.locator('#gloss').isVisible(),false,'Closed drawer must be hidden');
 }
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Page overflow '+width);
  for(const card of await page.locator('[data-math]').all()){
   const boxes=await card.locator('.math-stage').evaluateAll(nodes=>nodes.map(el=>({x:el.getBoundingClientRect().x,y:el.getBoundingClientRect().y})));
   if(width<=600)assert.ok(boxes.every((b,i)=>!i||b.y>boxes[i-1].y),'Mobile must read vertically');
   else if(await card.getAttribute('data-math')!=='fund')assert.ok(boxes.every(b=>Math.abs(b.y-boxes[0].y)<2),'Desktop steps must align');
   await card.locator('summary').click();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Formula overflow '+width);
   await card.locator('summary').click();
  }
  await page.locator('[data-math=split]').screenshot({path:`tmp/reforma/math-${width}.png`});
 }
 await page.goto(base+'/dist/semanas.html',{waitUntil:'networkidle'});
 assert.equal(await page.locator('[data-math]').count(),5);
 assert.ok((await page.locator('[data-math] img').first().getAttribute('src')).startsWith('data:image/webp;'));
 assert.deepEqual(errors,[]);
 await browser.close();console.log('OK: five independent interactive lessons, glossary, sources, four responsive widths, standalone');
})().catch(e=>{console.error(e);process.exit(1)});
