const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 fs.mkdirSync('tmp/historia',{recursive:true});
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:950});await page.goto('http://127.0.0.1:8765/historia/',{waitUntil:'networkidle'});
  assert.equal(await page.locator('.history-section').count(),8);
  assert.equal(await page.locator('.history-page img').count(),7);
  for(const img of await page.locator('.history-page img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
  assert.equal(await page.locator('.history-archive[open]').count(),0);
  const refs=await page.locator('.history-page [data-ref]').evaluateAll(nodes=>nodes.filter(n=>!SEMANAS.SRC[n.dataset.ref]||!n.textContent.trim()).map(n=>n.dataset.ref));assert.deepEqual(refs,[]);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width);
  await page.locator('.history-archive>summary').click();
  for(const filter of ['hist','ref','jur','all']){
   await page.locator(`#tl-filter [data-f="${filter}"]`).click();
   assert.equal(await page.locator('#timeline .tl-item').count(),await page.evaluate(f=>SEMANAS.TIMELINE.filter(i=>f==='all'||i.c===f).length,filter));
   assert.equal(await page.locator('#tl-filter [aria-pressed="true"]').count(),1);
  }
  await page.locator('.history-archive>summary').click();
  await page.locator('#origen .cite').first().click();assert.equal(await page.locator('#gloss.open').count(),1);
  await page.locator('[data-goto]').click();assert.equal(await page.locator('.refs-local details[open]').count(),1);
  await page.locator('.refs-local summary').click();
  await page.screenshot({path:`tmp/historia/history-${width}.png`,fullPage:true});
  await page.goto('http://127.0.0.1:8765/reforma/#umbral',{waitUntil:'networkidle'});
  await page.locator('.salary-story img').scrollIntoViewIfNeeded();await page.locator('.salary-story img').evaluate(el=>el.decode());
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Reforma overflow '+width);
  await page.locator('.salary-story').screenshot({path:`tmp/historia/salary-${width}.png`});
 }
 await page.goto('http://127.0.0.1:8765/dist/semanas.html#historia',{waitUntil:'networkidle'});
 assert.equal(await page.locator('#historia .history-art').count(),1);await page.locator('#historia .history-art').evaluate(el=>el.decode());
 assert.equal(await page.locator('.history-next a').first().getAttribute('href'),'#series');
 assert.deepEqual(errors,[]);await browser.close();console.log('OK: historia y reparto en 320/390/768/1440, imágenes, fuentes, filtros, teclado y versión autocontenida.');
})().catch(e=>{console.error(e);process.exit(1)});
