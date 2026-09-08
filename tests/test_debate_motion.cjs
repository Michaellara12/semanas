const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 fs.mkdirSync('tmp/debate-motion',{recursive:true});
 const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,600,1440]){
  await page.setViewportSize({width,height:950});await page.goto('http://127.0.0.1:8765/reforma/#critica',{waitUntil:'networkidle'});
  for(const card of await page.locator('.debate-topic').all()){
   const summary=card.locator('summary'),img=summary.locator('img');await summary.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());
   if(width<=600){
    const boxes=await summary.evaluate(e=>({card:e.getBoundingClientRect().toJSON(),img:e.querySelector('img').getBoundingClientRect().toJSON(),text:e.querySelector(':scope>span').getBoundingClientRect().toJSON()}));
    assert.ok(boxes.img.width>=140);assert.ok(boxes.img.top<boxes.card.top);assert.ok(boxes.img.bottom>boxes.card.top);
    assert.ok(boxes.img.left>boxes.card.left+boxes.card.width*.4);assert.ok(boxes.text.top>boxes.img.bottom);
   }
   await summary.focus();await page.keyboard.press('Enter');await page.waitForTimeout(450);
   assert.equal(await card.getAttribute('open'),'');assert.equal(await card.locator('.is-animating').count(),0);
   if(width<=600)assert.ok(await summary.evaluate(e=>e.querySelector(':scope>span').getBoundingClientRect().top>e.querySelector('img').getBoundingClientRect().bottom));
   await page.keyboard.press('Space');await page.waitForTimeout(450);assert.equal(await card.getAttribute('open'),null);
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.locator('#debate-renta').scrollIntoViewIfNeeded();await page.screenshot({path:`tmp/debate-motion/closed-${width}.png`});
 }
 const card=page.locator('#debate-renta'),summary=card.locator('summary');
 await summary.click();await page.waitForTimeout(70);
 const mid=await card.locator('.debate-body').evaluate(e=>e.getBoundingClientRect().height);
 await page.waitForTimeout(400);const end=await card.locator('.debate-body').evaluate(e=>e.getBoundingClientRect().height);assert.ok(mid>0&&mid<end,'Height interpolates');
 await summary.click();await page.waitForTimeout(50);await summary.click();await page.waitForTimeout(450);assert.equal(await card.getAttribute('open'),'');
 await page.emulateMedia({reducedMotion:'reduce'});await summary.click();assert.equal(await card.getAttribute('open'),null);await summary.click();assert.equal(await card.getAttribute('open'),'');assert.equal(await card.locator('.is-animating').count(),0);
 await page.setViewportSize({width:390,height:950});await card.scrollIntoViewIfNeeded();await page.screenshot({path:'tmp/debate-motion/open-390.png'});
 await page.goto('http://127.0.0.1:8765/dist/semanas.html#critica',{waitUntil:'networkidle'});await page.locator('#debate-cobertura summary').click();assert.equal(await page.locator('#debate-cobertura').getAttribute('open'),'');
 assert.deepEqual(errors,[]);await browser.close();console.log('OK: 7 escenas flotantes, 4 anchuras, apertura/cierre, interrupción, teclado, movimiento reducido y standalone.');
})().catch(e=>{console.error(e);process.exit(1)});
