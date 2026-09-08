const sharp=require('sharp'),fs=require('node:fs');
process.chdir(require('node:path').resolve(__dirname,'..'));
fs.mkdirSync('tmp/reforma',{recursive:true});
const manifest=JSON.parse(fs.readFileSync(process.argv[2] || 'assets/illustrations/generacion-v2.json','utf8'));
(async()=>{
  const sheets=[];
  for(const job of manifest.images){
    if(!job.source) throw Error('No source for '+job.name);
    const {data,info}=await sharp(job.source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    let transparent=0;
    for(let i=0;i<data.length;i+=4){
      const r=data[i],g=data[i+1],b=data[i+2],m=Math.max(r,b),excess=g-m;
      if(excess>14&&g>m*1.12){
        let a=1-excess/Math.max(1,255-m);
        if(a<.23||excess>180) a=0;
        data[i+3]=Math.round(255*a);
        if(a){data[i]=Math.min(255,Math.round(r/a));data[i+2]=Math.min(255,Math.round(b/a));data[i+1]=Math.min(data[i],data[i+2]);}
        else{data[i]=0;data[i+1]=0;data[i+2]=0;transparent++;}
      }
    }
    const size=job.name==='hero-v2'?900:job.name.startsWith('pilar-')?500:700;
    const keyed=await sharp(data,{raw:info}).png().toBuffer();
    const final=await sharp(keyed).trim({background:'#00000000',threshold:8}).resize(size-24,size-24,{fit:'contain',background:'#00000000'}).extend({top:12,bottom:12,left:12,right:12,background:'#00000000'}).webp({quality:87,alphaQuality:100}).toBuffer();
    fs.writeFileSync(job.output,final);
    console.log(job.name,final.length+' bytes',Math.round(transparent/(info.width*info.height)*100)+'% fully transparent');
    const thumb=await sharp(final).resize(260,260).flatten({background:'#E7E7F0'}).png().toBuffer();
    sheets.push({input:thumb,left:(sheets.length%4)*280,top:Math.floor(sheets.length/4)*280});
  }
  await sharp({create:{width:1120,height:Math.ceil(sheets.length/4)*280,channels:3,background:'#E7E7F0'}}).composite(sheets).png().toFile(process.argv[3] || 'tmp/reforma/chroma-contact.png');
})().catch(e=>{console.error(e);process.exit(1)});
