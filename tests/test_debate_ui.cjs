const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8765';
(async()=>{
 fs.mkdirSync('tmp/reforma',{recursive:true});
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/reforma/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.debate-topic').count(),7);
 assert.equal(await page.locator('.debate-topic[open]').count(),0);
 assert.equal(await page.locator('#sb-columns,#sb-claims,.profile .avatar').count(),0);
 const integrity=await page.locator('#critica').evaluate(el=>({
  refs:[...el.querySelectorAll('[data-ref]')].filter(a=>!SEMANAS.SRC[a.dataset.ref]).map(a=>a.dataset.ref),
  terms:[...el.querySelectorAll('[data-t]')].filter(a=>!SEMANAS.GLOSARIO[a.dataset.t]).map(a=>a.dataset.t)
 }));assert.deepEqual(integrity,{refs:[],terms:[]});
 for(const topic of await page.locator('.debate-topic').all()){
  await topic.locator('summary').focus();await page.keyboard.press('Enter');
  assert.equal(await topic.getAttribute('open'),'');
  assert.equal(await topic.locator('.debate-arguments>div').count(),2);
  assert.ok((await topic.locator('.debate-reading').textContent()).includes('Qué podría resolverla'));
  await topic.locator('img').evaluate(el=>el.decode());
  for(const ref of await topic.locator('.cite').all()){
   await ref.click();assert.equal(await page.locator('#gloss.open').count(),1);
   assert.ok((await page.locator('#gloss-term').textContent()).length>5);
   await page.keyboard.press('Escape');await page.waitForTimeout(300);
   assert.equal(await page.locator('#gloss').isVisible(),false);
  }
  await topic.locator('summary').click();
 }
 await page.locator('#debate-renta>summary').click();
 await page.locator('#debate-capital').fill('48000000');
 assert.equal(await page.locator('[data-debate-meses]').textContent(),'240 meses');
 await page.locator('#debate-mensual').fill('400000');
 assert.equal(await page.locator('[data-debate-meses]').textContent(),'120 meses');
 await page.locator('#debate-mensual').fill('0');await page.locator('#debate-capital').focus();
 assert.equal(await page.locator('#debate-mensual').inputValue(),'400000');
 assert.ok(!(await page.locator('#debate-cuenta-result').textContent()).includes('Infinity'));
 await page.locator('#debate-renta [data-t="renta-vitalicia"]').click();
 assert.ok((await page.locator('#gloss-body').textContent()).includes('regla distinta'));
 await page.keyboard.press('Escape');await page.waitForTimeout(300);
 const art=page.locator('#debate-renta [data-law-article="18"]').first();await art.click();
 assert.equal(await page.locator('#modal').getAttribute('data-article'),'18');
 await page.keyboard.press('Escape');
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const topic of await page.locator('.debate-topic').all()){
   await topic.evaluate(el=>el.open=true);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Overflow '+width);
   const columns=await topic.locator('.debate-arguments>div').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().y));
   if(width<600)assert.ok(columns[1]>columns[0]);
   await topic.evaluate(el=>el.open=false);
  }
  await page.locator('#critica').screenshot({path:`tmp/reforma/debate-${width}.png`});
  await page.locator('#debate-renta').evaluate(el=>el.open=true);
  await page.locator('#debate-renta').screenshot({path:`tmp/reforma/debate-open-${width}.png`});
  await page.locator('#debate-renta').evaluate(el=>el.open=false);
 }
 await page.goto(base+'/dist/semanas.html',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.debate-topic').count(),7);
 assert.ok((await page.locator('#debate-renta img').getAttribute('src')).startsWith('data:image/webp;'));
 await page.locator('#debate-renta>summary').click();await page.locator('#debate-mensual').fill('400000');
 assert.equal(await page.locator('[data-debate-meses]').textContent(),'60 meses');
 assert.deepEqual(errors,[]);await browser.close();console.log('OK: 7 compact debates, all citations, keyboard, concepts, article, arithmetic, 4 widths and standalone');
})().catch(e=>{console.error(e);process.exit(1)});
