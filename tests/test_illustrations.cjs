/* npm/entorno: Sharp. Detecta fondos opacos y superficies verdes sin recortar. */
const sharp=require('sharp'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
process.chdir(path.resolve(__dirname,'..'));
(async()=>{
 const jobs=['generacion-v2.json','generacion-math.json'].flatMap(file=>JSON.parse(fs.readFileSync('assets/illustrations/'+file,'utf8')).images);
 assert.equal(jobs.length,16);let bytes=0;
 for(const job of jobs){
   const meta=await sharp(job.output).metadata();assert.equal(meta.hasAlpha,true,job.name);
   const {data,info}=await sharp(job.output).ensureAlpha().raw().toBuffer({resolveWithObject:true});
   let empty=0,green=0;
   for(let i=0;i<data.length;i+=4){if(data[i+3]===0)empty++;if(data[i+3]>60&&data[i+1]-Math.max(data[i],data[i+2])>55)green++;}
   const pixels=info.width*info.height;
   assert.ok(empty/pixels>.2,'Fondo sin transparencia: '+job.name);
   // La mezcla de cian/amarillo y la compresión pueden dar píxeles verdes aislados.
   assert.ok(green/pixels<.001,'Superficie verde residual: '+job.name);
   for(const pixel of [0,info.width-1,(info.height-1)*info.width,pixels-1]) assert.equal(data[pixel*4+3],0,'Esquina opaca: '+job.name);
   bytes+=fs.statSync(job.output).size;
 }
 console.log('OK: 16 ilustraciones con canal alfa, fondo recortado y esquinas transparentes; '+Math.round(bytes/1024)+' KiB.');
})().catch(e=>{console.error(e);process.exit(1)});
