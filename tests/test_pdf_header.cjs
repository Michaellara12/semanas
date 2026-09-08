const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/reforma/',{waitUntil:'networkidle'});
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:900});
  await page.evaluate(()=>SEMANAS.abrirCita('abece',3));
  assert.equal(await page.locator('.cita-lista button').count(),0);
  assert.equal(await page.locator('.cita-page-info').count(),3);
  const trigger=page.locator('#gloss [data-pdfk]').first();await trigger.click();
  assert.equal(await page.locator('#pdf-title').textContent(),'ABECÉ Reforma Pensional – Aspectos generales de la Ley 2381');
  assert.equal(await page.locator('#pdf-kicker').textContent(),'Dónde buscar · página 3');
  assert.equal(await page.locator('#pdf-pages button').count(),0);
  assert.equal(await page.locator('.pdf-guide').getAttribute('open'),null);
  assert.ok((await page.locator('#pdf-frame').getAttribute('src')).includes('abece.pdf#page=3'));
  const h=await page.locator('#pdfview .bar').boundingBox();assert.ok(h.height<=150,'Header too tall: '+h.height);
  await page.locator('#pdfview .bar').screenshot({path:`tmp/reforma/pdf-header-${width}.png`});
  await page.locator('#pdf-kicker').click();
  assert.ok((await page.locator('#pdf-pages').textContent()).includes('1, 2'));
  assert.ok((await page.locator('#pdf-note').textContent()).includes('factores'));
  assert.equal(await page.locator('#pdfview .bar').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
  await page.keyboard.press('Escape');assert.equal(await page.locator('#pdfview.open').count(),0);
  assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
  await page.keyboard.press('Escape');await page.waitForTimeout(300);
 }
 await page.goto('http://127.0.0.1:8765/dist/semanas.html',{waitUntil:'networkidle'});
 await page.evaluate(()=>SEMANAS.abrirCita('ley2381pdf',49));await page.locator('#gloss [data-pdfk]').first().click();
 assert.equal(await page.locator('#pdf-kicker').textContent(),'Dónde buscar · página 49');
 assert.equal(await page.locator('#pdf-pages button').count(),0);
 assert.deepEqual(errors,[]);await browser.close();console.log('OK: compact PDF header, static page guidance, original target, focus and standalone');
})().catch(e=>{console.error(e);process.exit(1)});
