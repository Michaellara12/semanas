const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
process.chdir(path.resolve(__dirname,'..'));
fs.mkdirSync('tmp/reforma',{recursive:true});
const base=(process.env.TEST_BASE_URL||'http://127.0.0.1:8765').replace(/\/$/,'');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/reforma/',{waitUntil:'networkidle'});
 await page.screenshot({path:'tmp/reforma/desktop-hero.png'});
 assert.equal(await page.locator('.art').count(),10);
 assert.equal(await page.locator('#art-count').textContent(),'95 artículos');
 assert.equal(await page.locator('.law-hero-art img').evaluate(el=>el.complete&&el.naturalWidth>0),true);
 assert.equal(await page.locator('#que-es img, #ley .law-reading-head img').count(),11);
 const articleLink=page.locator('#que-es [data-law-article="75"]').first();
 await articleLink.click();
 assert.equal(await page.locator('#modal').getAttribute('data-article'),'75');
 assert.ok(await page.locator('.law-plain').isVisible());
 await page.keyboard.press('Escape');
 assert.equal(await articleLink.evaluate(el=>el===document.activeElement),true);
 await articleLink.press('Enter');
 assert.equal(await page.locator('#modal.open').count(),1);
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('.law-before [data-law-article]').count(),0);
 assert.equal(await page.locator('.law-table [data-law-article="40"]').count(),1);
 assert.equal(await page.locator('.law-table [data-law-article="56"]').count(),1);
 for(const row of await page.locator('.law-compare-pair').all()){
   const old=await row.locator('.law-before').boundingBox(),next=await row.locator('.law-after').boundingBox();
   assert.ok(Math.abs(old.y-next.y)<1&&next.x>old.x,'Comparación sin alinear en escritorio');
 }
 await page.locator('.law-pillar-rows').scrollIntoViewIfNeeded();
 await page.screenshot({path:'tmp/reforma/v2-desktop-pillars.png'});
 await page.locator('#comparador').scrollIntoViewIfNeeded();
 await page.screenshot({path:'tmp/reforma/v2-desktop-compare.png'});

 await page.locator('.art[data-n="1"]').click();
 await page.locator('#law-tab-entender').focus();
 await page.keyboard.press('ArrowRight');
 assert.equal(await page.locator('#law-tab-interpretar').getAttribute('aria-selected'),'true');
 await page.keyboard.press('End');
 assert.equal(await page.locator('#law-tab-fuentes').getAttribute('aria-selected'),'true');
 await page.keyboard.press('Home');
 assert.equal(await page.locator('#law-tab-entender').getAttribute('aria-selected'),'true');
 await page.locator('#modal-close').focus();
 await page.keyboard.press('Shift+Tab');
 assert.equal(await page.locator('#art-next').evaluate(el=>el===document.activeElement),true);
 await page.keyboard.press('Tab');
 assert.equal(await page.locator('#modal-close').evaluate(el=>el===document.activeElement),true);
 await page.getByRole('tab',{name:'Interpretación jurídica',exact:true}).click();
 assert.equal(await page.locator('#law-panel-interpretar').isVisible(),true);
 assert.equal(await page.locator('#modal [data-law-article="48"]').count(),0,'No enlazar la Constitución como Ley 2381');
 await page.screenshot({path:'tmp/reforma/desktop-article.png'});
 const cite=page.locator('#law-panel-interpretar .cite[data-ref="ley2381"]').first();
 await cite.click();
 await page.locator('#gloss.open').waitFor();
 await page.waitForTimeout(350);
 assert.equal(await page.locator('#modal').evaluate(el=>el.inert),true);
 assert.ok((await page.locator('#gloss-body').textContent()).includes('En el artículo 1'));
 await page.screenshot({path:'tmp/reforma/desktop-source.png'});
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#modal.open').count(),1);
 assert.equal(await page.locator('#gloss.open').count(),0);
 assert.equal(await cite.evaluate(el=>el===document.activeElement),true);
 await page.getByRole('tab',{name:'Entenderlo',exact:true}).click();
 await page.locator('summary').filter({hasText:'Texto exacto del artículo 1'}).click();
 assert.ok(await page.locator('.law-official-content').filter({hasText:'Transcripción'}).isVisible());
 await page.locator('[data-law-pdf]').click();
 assert.equal(await page.locator('#pdfview.open').count(),1);
 assert.ok((await page.locator('#pdf-frame').getAttribute('src')).includes('#page=2'));
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#modal.open').count(),1);
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#modal.open').count(),0);
 assert.equal(await page.locator('main').evaluate(el=>el.inert),false);
 await page.locator('.art[data-n="1"]').click();
 for(let n=1;n<=95;n++){
   assert.equal(await page.locator('#modal').getAttribute('data-article'),String(n));
   assert.equal(await page.getByRole('tab').count(),4);
   for(const id of ['entender','interpretar','aplicar','fuentes']){
     await page.locator('#law-tab-'+id).click();
     assert.equal(await page.locator('#law-panel-'+id).isVisible(),true);
     assert.ok((await page.locator('#law-panel-'+id).textContent()).length>200);
   }
   assert.equal(await page.locator('#modal .cite').filter({hasText:'?'}).count(),0);
   if(n===18) assert.equal(await page.locator('#law-panel-interpretar .law-analysis-block').nth(1).locator('[data-law-article="37"],[data-law-article="66"]').count(),0,'No enlazar artículos de la Ley 100 al lector de Ley 2381');
   assert.equal(await page.locator('.law-official-content [data-law-article]').count(),0,'No modificar la transcripción oficial');
   if(n<95) await page.locator('#art-next').click();
 }
 assert.equal(await page.locator('#art-next').isDisabled(),true);
 await page.keyboard.press('Escape');
 await page.locator('#art-search').fill('campesinado');
 assert.ok(await page.locator('.art[data-n="93"]').count()||+(await page.locator('#art-count').textContent()).split(' ')[0]>10);
 await page.locator('#art-search').fill('zzzz-nada-zzzz');
 assert.equal(await page.locator('.art').count(),0);
 await page.locator('#art-search').fill('');
 await page.locator('#art-filter').selectOption('transicion');
 assert.ok((await page.locator('#art-count').textContent()).startsWith('3 '));
 await page.locator('#art-filter').selectOption('all');
 await page.locator('#art-status').selectOption('dev');
 assert.equal(await page.locator('.art').count(),3);
 await page.locator('.art[data-n="93"]').click();
 await page.getByRole('tab',{name:'Fuentes y método',exact:true}).click();
 await page.locator('#law-panel-fuentes .cite[data-ref="ley2381pdf"]').click();
 await page.locator('#gloss.open').waitFor(); await page.waitForTimeout(300);
 await page.locator('#gloss-body [data-pdfk="ley2381pdf"]').click();
 assert.ok((await page.locator('#pdf-frame').getAttribute('src')).includes('#page=49'));
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#gloss.open').count(),1);
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#modal.open').count(),1);
 await page.keyboard.press('Escape');
 await page.locator('#art-status').selectOption('all');
 for(const width of [390,320,768]){
   await page.setViewportSize({width,height:844}); await page.evaluate(()=>window.scrollTo(0,0));
   await page.screenshot({path:`tmp/reforma/viewport-${width}.png`});
   const sizes=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(sizes.scroll<=sizes.width,`Overflow ${width}: ${JSON.stringify(sizes)}`);
   if(width<761){
     const step=page.locator('#law-primer-paso');
     const bounds=await step.boundingBox(),content=await step.locator(':scope > div').boundingBox();
     assert.ok(Math.abs(bounds.x-content.x)<1&&Math.abs(bounds.width-content.width)<1,'La columna del número resta ancho al texto');
     for(const row of await page.locator('.law-compare-pair').all()){
       const old=await row.locator('.law-before').boundingBox(),next=await row.locator('.law-after').boundingBox();
       assert.ok(next.y>=old.y+old.height-1&&Math.abs(next.x-old.x)<1,'La comparación móvil no intercala antes/después');
     }
     assert.equal(await page.locator('.law-reading-head img').evaluate(el=>getComputedStyle(el).backgroundColor),'rgba(0, 0, 0, 0)');
   }
   if(width===390){
     for(const [selector,name] of [['#law-primer-paso','intro'],['.law-pillar-rows','pillars'],['#comparador','comparison'],['.law-reading-head','reader']]){
       await page.locator(selector).scrollIntoViewIfNeeded();
       await page.screenshot({path:`tmp/reforma/v2-mobile-${name}.png`});
     }
   }

   await page.locator('.art[data-n="1"]').click();
   await page.getByRole('tab',{name:'Fuentes y método',exact:true}).click();
   await page.locator('#law-panel-fuentes .cite[data-ref="ley2381"]').click();
   await page.waitForTimeout(350);
   if(width===390) await page.screenshot({path:'tmp/reforma/mobile-source.png'});
   await page.keyboard.press('Escape');await page.keyboard.press('Escape');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+'/fuentes/',{waitUntil:'networkidle'});
 assert.ok(await page.locator('li').filter({hasText:'C-054 de 2016'}).count());
 await page.goto(base+'/dist/semanas.html',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.art').count(),10);
 assert.equal(await page.locator('.law-hero-art img').evaluate(el=>el.complete&&el.naturalWidth>0&&el.src.startsWith('data:image/webp;base64,')),true);
 await page.locator('.art[data-n="1"]').click();
 await page.getByRole('tab',{name:'Interpretación jurídica',exact:true}).click();
 assert.equal(await page.locator('#law-panel-interpretar').isVisible(),true);
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log('OK: 95 artículos × 4 pestañas, búsqueda, filtros, tres capas, teclado/foco, PDF exacto, vistas 320/390/768/1440, archivo único, cero errores JS.');
})().catch(e=>{console.error(e);process.exit(1)});
