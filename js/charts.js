/* =====================================================================
   SEMANAS · charts.js — librería de gráficas SVG sin dependencias.
   Lee la paleta desde las variables CSS (--c1..--c6, --chart-text, --chart-grid).
   API: Charts.line · bar · donut · pyramid · hist · heatmap · tornado · dual
   ===================================================================== */
(function(){
  const NS="http://www.w3.org/2000/svg";
  function theme(){ const cs=getComputedStyle(document.documentElement); const g=(v,d)=>(cs.getPropertyValue(v)||d).trim();
    return {pal:[g("--c1","#6B3FF2"),g("--c2","#FFC300"),g("--c3","#0E6BE8"),g("--c4","#141414"),g("--c5","#B08CFF"),g("--c6","#FF6B35"),g("--c7","#12B76A"),g("--c8","#E4D8FF")], text:g("--chart-text","#5a5470"), grid:g("--chart-grid","rgba(20,20,20,.12)"), bg:g("--paper","#FBFAF7")}; }
  const fmt=(v,f)=>{ if(typeof f==="function") return f(v); if(f==="pct") return (Math.round(v*10)/10).toLocaleString("es-CO")+" %"; if(f==="int") return Math.round(v).toLocaleString("es-CO"); if(f==="cop") return "$"+Math.round(v).toLocaleString("es-CO"); return (Math.round(v*100)/100).toLocaleString("es-CO"); };
  let tip; function tooltip(){ if(!tip){ tip=document.createElement("div"); tip.className="tooltip"; document.body.appendChild(tip);} return tip; }
  function showTip(html,ev){ const t=tooltip(); t.innerHTML=html; t.style.opacity=1; const x=Math.min(ev.clientX+14, window.innerWidth-290); t.style.left=x+"px"; t.style.top=(ev.clientY+14)+"px"; }
  function hideTip(){ const t=tooltip(); t.style.opacity=0; }
  function el(tag,attrs,parent){ const e=document.createElementNS(NS,tag); for(const k in attrs){ if(attrs[k]!=null) e.setAttribute(k,attrs[k]); } if(parent) parent.appendChild(e); return e; }
  function nice(max){ if(max<=0) return 1; const p=Math.pow(10,Math.floor(Math.log10(max))); const m=max/p; const n=m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10; return n*p; }
  function ticks(min,max,n){ const span=max-min; if(span<=0) return [min]; const step=nice(span/n); const t=[]; const start=Math.ceil(min/step)*step; for(let v=start; v<=max+1e-9; v+=step) t.push(+v.toFixed(10)); if(t[0]>min) t.unshift(+(start-step).toFixed(10)); return t; }
  function base(container,cfg){ container.innerHTML=""; const W=Math.max(280, container.clientWidth||600); const H=cfg.height||Math.max(220,Math.min(380,W*0.52)); const m=Object.assign({t:22,r:20,b:46,l:60},cfg.margin||{}); const svg=el("svg",{viewBox:`0 0 ${W} ${H}`,width:W,height:H,role:"img","aria-label":cfg.title||"gráfica"},container); return {svg,W,H,m,iw:W-m.l-m.r,ih:H-m.t-m.b,th:theme()}; }
  function axes(ctx,xs,ys,cfg){
    const {svg,m,iw,ih,th}=ctx; const g=el("g",{class:"axis"},svg);
    ys.ticks.forEach(t=>{ const y=ys.scale(t); el("line",{x1:m.l,x2:m.l+iw,y1:y,y2:y,class:"gridline",stroke:th.grid},g); const tx=el("text",{x:m.l-10,y:y+4,"text-anchor":"end",fill:th.text},g); tx.textContent=fmt(t,cfg.yFormat||"num"); });
    const n=xs.labels.length; const slot=xs.slot||iw/Math.max(1,n-1); const every=xs.slot?1:Math.max(1,Math.ceil(n/Math.max(3,Math.floor(iw/95)))); const maxChars=Math.max(6,Math.floor(slot/7.2));
    /* Con ranuras estrechas las etiquetas se pisan: se giran en lugar de encimarse. */
    const rot=!!xs.slot&&slot<62;
    xs.labels.forEach((l,i)=>{ if(i%every!==0&&i!==n-1) return; const x=xs.scale(i); const s=String(l);
      if(rot){ const ty=m.t+ih+16; const tx=el("text",{x,y:ty,"text-anchor":"end",fill:th.text,transform:`rotate(-40 ${x} ${ty})`},g); tx.textContent=s.length>18?s.slice(0,17)+"…":s; return; }
      const tx=el("text",{x,y:m.t+ih+20,"text-anchor":"middle",fill:th.text},g); if(s.length<=maxChars){ tx.textContent=s; return; }
      const words=s.split(" "); const lines=[]; let cur=""; words.forEach(w=>{ if((cur+" "+w).trim().length>maxChars&&cur){ lines.push(cur); cur=w; } else cur=(cur+" "+w).trim(); }); if(cur) lines.push(cur); if(lines.length>3){ lines.length=3; lines[2]=lines[2].slice(0,Math.max(3,maxChars-1))+"…"; }
      lines.forEach((ln,k)=>{ const ts=el("tspan",{x,dy:k===0?0:12.5},tx); ts.textContent=ln; }); });
    el("line",{x1:m.l,x2:m.l+iw,y1:m.t+ih,y2:m.t+ih,stroke:th.grid},g);
    if(cfg.yLabel){ const t=el("text",{x:m.l,y:m.t-6,class:"lbl",fill:th.text},svg); t.textContent=cfg.yLabel; }
  }
  function yScale(ctx, vals, cfg){ let ymin=cfg.yMin!=null?cfg.yMin:Math.min(0,...vals); let ymax=cfg.yMax!=null?cfg.yMax:Math.max(...vals); if(ymax===ymin) ymax=ymin+1; const tk=ticks(ymin,ymax,5); ymin=Math.min(ymin,tk[0]); ymax=Math.max(ymax,tk[tk.length-1]); return {ticks:tk, min:ymin, max:ymax, scale:v=> ctx.m.t+ctx.ih-(v-ymin)/(ymax-ymin)*ctx.ih}; }

  function line(container,cfg){
    const ctx=base(container,cfg); const {svg,m,iw,ih,th}=ctx; const labels=cfg.labels, series=cfg.series;
    let all=[]; series.forEach(s=>s.values.forEach(v=>{ if(v!=null) all.push(v); })); (cfg.bands||[]).forEach(b=>{ all=all.concat(b.lo,b.hi); });
    const ys=yScale(ctx,all,cfg); const xs={labels, scale:i=> m.l+(labels.length===1?iw/2:i*(iw/(labels.length-1)))};
    axes(ctx,xs,ys,cfg);
    (cfg.bands||[]).forEach((b,bi)=>{ const top=b.hi.map((v,i)=>`${xs.scale(i)},${ys.scale(v)}`); const bot=b.lo.map((v,i)=>`${xs.scale(i)},${ys.scale(v)}`).reverse(); el("polygon",{points:top.concat(bot).join(" "),fill:b.color||th.pal[4],class:"area"},svg); });
    series.forEach((s,si)=>{ const color=s.color||th.pal[si%th.pal.length]; const pts=s.values.map((v,i)=>v==null?null:[xs.scale(i),ys.scale(v)]).filter(Boolean); if(!pts.length) return;
      let d=""; pts.forEach((p,i)=>{ d+=(i===0?"M":"L")+p[0].toFixed(1)+" "+p[1].toFixed(1)+" "; });
      if(s.area){ el("path",{d:d+`L${pts[pts.length-1][0]} ${ys.scale(Math.max(ys.min,0))} L${pts[0][0]} ${ys.scale(Math.max(ys.min,0))} Z`,fill:color,class:"area"},svg); }
      const path=el("path",{d,stroke:color,class:"line"},svg); if(s.dashed) path.setAttribute("stroke-dasharray","6 5"); else { try{ path.style.setProperty("--len",path.getTotalLength()); }catch(e){} }
      if(cfg.dots!==false&&pts.length<=40){ s.values.forEach((v,i)=>{ if(v==null) return; const c=el("circle",{cx:xs.scale(i),cy:ys.scale(v),r:3.4,fill:color,class:"dot",stroke:th.bg},svg); c.addEventListener("mousemove",ev=>showTip(`<b>${s.name}</b><br>${labels[i]}: ${fmt(v,cfg.yFormat)}${s.unit?" "+s.unit:""}`,ev)); c.addEventListener("mouseleave",hideTip); }); }
      if(cfg.endLabels){ const last=pts[pts.length-1]; const t=el("text",{x:last[0]+6,y:last[1]+3,class:"lbl",fill:color,style:"font-weight:700"},svg); t.textContent=s.name; } });
    (cfg.annotations||[]).forEach((a,ai)=>{ const x=xs.scale(a.i); el("line",{x1:x,x2:x,y1:m.t,y2:m.t+ih,class:"annot-line",stroke:th.pal[1]},svg); const near=x>m.l+iw-72; const t=el("text",{x:near?x-5:x+5,y:m.t+12+(ai%2)*15,"text-anchor":near?"end":"start",class:"annot",fill:th.text},svg); t.textContent=a.text; });
    const hit=el("rect",{x:m.l,y:m.t,width:iw,height:ih,fill:"transparent"},svg);
    hit.addEventListener("mousemove",ev=>{ const r=svg.getBoundingClientRect(); const px=(ev.clientX-r.left)*(ctx.W/r.width); const i=Math.round((px-m.l)/(iw/Math.max(1,labels.length-1))); if(i<0||i>=labels.length) return hideTip(); let html=`<b>${labels[i]}</b>`; series.forEach((s,si)=>{ if(s.values[i]!=null) html+=`<br><span style="color:${s.color||th.pal[si%th.pal.length]}">●</span> ${s.name}: ${fmt(s.values[i],cfg.yFormat)}${s.unit?" "+s.unit:""}`; }); showTip(html,ev); });
    hit.addEventListener("mouseleave",hideTip); container.classList.add("chart","animate");
  }

  /* Doble eje: series izquierda (left) y derecha (right) */
  function dual(container,cfg){
    const ctx=base(container,Object.assign({margin:{t:22,r:64,b:46,l:60}},cfg)); const {svg,m,iw,ih,th}=ctx; const labels=cfg.labels;
    const L=cfg.left, R=cfg.right; const ysL=yScale(ctx,L.values.filter(v=>v!=null),{yMin:L.yMin,yMax:L.yMax}); const ysR=yScale(ctx,R.values.filter(v=>v!=null),{yMin:R.yMin,yMax:R.yMax});
    const xs={labels,scale:i=>m.l+i*(iw/(labels.length-1))}; axes(ctx,xs,ysL,{yFormat:L.format});
    ysR.ticks.forEach(t=>{ const y=ysR.scale(t); const tx=el("text",{x:m.l+iw+10,y:y+4,fill:R.color||th.pal[2],class:"axis-right"},svg); tx.textContent=fmt(t,R.format); });
    [[L,ysL,L.color||th.pal[0]],[R,ysR,R.color||th.pal[2]]].forEach(([s,ys,color])=>{ const pts=s.values.map((v,i)=>v==null?null:[xs.scale(i),ys.scale(v)]).filter(Boolean); let d=""; pts.forEach((p,i)=>{ d+=(i===0?"M":"L")+p[0]+" "+p[1]+" "; });
      if(s.bars){ const bw=iw/labels.length*0.6; s.values.forEach((v,i)=>{ if(v==null) return; const x=xs.scale(i)-bw/2; const y=ys.scale(v); const r=el("rect",{x,y,width:bw,height:Math.max(0,ys.scale(Math.max(ys.min,0))-y),fill:color,rx:3,class:"bar",opacity:.85},svg); r.style.setProperty("--ox",x+"px"); r.style.setProperty("--oy",ys.scale(Math.max(ys.min,0))+"px"); r.addEventListener("mousemove",ev=>showTip(`<b>${labels[i]}</b><br>${s.name}: ${fmt(v,s.format)}`,ev)); r.addEventListener("mouseleave",hideTip); }); }
      else { const path=el("path",{d,stroke:color,class:"line"},svg); try{ path.style.setProperty("--len",path.getTotalLength()); }catch(e){} s.values.forEach((v,i)=>{ if(v==null) return; const c=el("circle",{cx:xs.scale(i),cy:ys.scale(v),r:3.4,fill:color,class:"dot",stroke:th.bg},svg); c.addEventListener("mousemove",ev=>showTip(`<b>${labels[i]}</b><br>${s.name}: ${fmt(v,s.format)}`,ev)); c.addEventListener("mouseleave",hideTip); }); } });
    container.classList.add("chart","animate");
  }

  function bar(container,cfg){
    const nc=(cfg.categories||[]).length;
    if(nc>=7&&!(cfg.margin&&cfg.margin.b)) cfg=Object.assign({},cfg,{margin:Object.assign({b:74},cfg.margin||{})});
    const ctx=base(container,cfg); const {svg,m,iw,ih,th}=ctx; const cats=cfg.categories, series=cfg.series, stacked=!!cfg.stacked;
    let ymax=0,ymin=0; cats.forEach((c,i)=>{ let pos=0,neg=0; series.forEach(s=>{ const v=s.values[i]||0; if(stacked){ if(v>=0) pos+=v; else neg+=v; } else { ymax=Math.max(ymax,v); ymin=Math.min(ymin,v); } }); if(stacked){ ymax=Math.max(ymax,pos); ymin=Math.min(ymin,neg);} });
    if(cfg.yMax!=null) ymax=cfg.yMax; const ys=yScale(ctx,[ymin,ymax],{yMin:ymin,yMax:ymax}); const gw=iw/cats.length; const inner=gw*0.72; const bw=stacked?inner:inner/series.length;
    const xs={labels:cats,slot:gw,scale:i=>m.l+gw*i+gw/2}; axes(ctx,xs,ys,cfg); const y0=ys.scale(0);
    cats.forEach((c,i)=>{ let accP=0,accN=0; series.forEach((s,si)=>{ const v=s.values[i]; if(v==null) return; const color=s.color||th.pal[si%th.pal.length]; const x=stacked?m.l+gw*i+(gw-inner)/2:m.l+gw*i+(gw-inner)/2+bw*si; let y1,y2; if(stacked){ if(v>=0){ y1=ys.scale(accP+v); y2=ys.scale(accP); accP+=v; } else { y1=ys.scale(accN); y2=ys.scale(accN+v); accN+=v; } } else { y1=Math.min(y0,ys.scale(v)); y2=Math.max(y0,ys.scale(v)); }
      const r=el("rect",{x,y:y1,width:Math.max(1,bw-2),height:Math.max(0,y2-y1),fill:color,rx:3,class:"bar"},svg); r.style.setProperty("--ox",x+"px"); r.style.setProperty("--oy",y0+"px"); r.style.animationDelay=(i*40+si*20)+"ms";
      r.addEventListener("mousemove",ev=>showTip(`<b>${c}</b><br>${s.name}: ${fmt(v,cfg.yFormat)}${s.unit?" "+s.unit:""}`,ev)); r.addEventListener("mouseleave",hideTip);
      const autoLbl=cfg.valueLabels!==false&&(cfg.valueLabels||(series.length===1&&cats.length<=12));
      if(autoLbl&&!stacked){ const t=el("text",{x:x+(bw-2)/2,y:(v>=0?y1-6:y2+14),"text-anchor":"middle",class:"val",fill:th.text},svg); t.textContent=fmt(v,cfg.yFormat); } }); });
    container.classList.add("chart","animate");
  }

  /* Tornado / barras horizontales divergentes: items [{label, lo, hi}] alrededor de base */
  function tornado(container,cfg){
    const ctx=base(container,Object.assign({margin:{t:14,r:20,b:30,l:190}},cfg)); const {svg,m,iw,ih,th}=ctx; const items=cfg.items; const base0=cfg.base;
    const ext=Math.max(...items.map(x=>Math.max(Math.abs(x.lo-base0),Math.abs(x.hi-base0))))*1.1||1; const sc=v=> m.l+iw/2+(v-base0)/ext*(iw/2); const rowh=ih/items.length;
    el("line",{x1:sc(base0),x2:sc(base0),y1:m.t,y2:m.t+ih,stroke:th.pal[3],"stroke-width":1.2},svg);
    items.forEach((it,i)=>{ const y=m.t+i*rowh+rowh*0.18; const h=rowh*0.64; const x1=Math.min(sc(it.lo),sc(base0)), w1=Math.abs(sc(it.lo)-sc(base0)); const x2=Math.min(sc(it.hi),sc(base0)), w2=Math.abs(sc(it.hi)-sc(base0));
      const r1=el("rect",{x:x1,y,width:w1,height:h,fill:th.pal[0],rx:3,class:"bar"},svg); const r2=el("rect",{x:x2,y,width:w2,height:h,fill:th.pal[1],rx:3,class:"bar"},svg);
      [r1,r2].forEach(r=>{ r.style.setProperty("--ox",sc(base0)+"px"); r.style.setProperty("--oy",y+"px"); r.style.animationName="none"; });
      r1.addEventListener("mousemove",ev=>showTip(`<b>${it.label}</b><br>${it.loLabel||"bajo"}: ${fmt(it.lo,cfg.format)}`,ev)); r2.addEventListener("mousemove",ev=>showTip(`<b>${it.label}</b><br>${it.hiLabel||"alto"}: ${fmt(it.hi,cfg.format)}`,ev)); [r1,r2].forEach(r=>r.addEventListener("mouseleave",hideTip));
      const t=el("text",{x:m.l-8,y:y+h/2+4,"text-anchor":"end",class:"lbl",fill:th.text},svg); t.textContent=it.label;
      const tl=el("text",{x:sc(it.lo)+(it.lo<base0?-4:4),y:y+h/2+4,"text-anchor":it.lo<base0?"end":"start",class:"lbl",fill:th.text},svg); tl.textContent=fmt(it.lo,cfg.format);
      const th2=el("text",{x:sc(it.hi)+(it.hi<base0?-4:4),y:y+h/2+4,"text-anchor":it.hi<base0?"end":"start",class:"lbl",fill:th.text},svg); th2.textContent=fmt(it.hi,cfg.format); });
    const tb=el("text",{x:sc(base0),y:m.t+ih+18,"text-anchor":"middle",class:"annot",fill:th.text},svg); tb.textContent=(cfg.baseLabel||"base")+": "+fmt(base0,cfg.format);
    container.classList.add("chart");
  }

  /* Mapa de calor: rows (labels), cols (labels), values[r][c]; color de min→max entre dos tonos */
  function heatmap(container,cfg){
    const ctx=base(container,Object.assign({margin:{t:28,r:16,b:16,l:70}},cfg)); const {svg,m,iw,ih,th}=ctx; const rows=cfg.rows, cols=cfg.cols, V=cfg.values;
    const flat=V.flat().filter(v=>v!=null); const lo=cfg.min!=null?cfg.min:Math.min(...flat), hi=cfg.max!=null?cfg.max:Math.max(...flat);
    const cw=iw/cols.length, rh=ih/rows.length; const hex2rgb=h=>{ h=h.replace("#",""); if(h.length===3) h=h.split("").map(c=>c+c).join(""); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; };
    const c0=hex2rgb(cfg.colorLo||"#F4F0FF"), c1=hex2rgb(cfg.colorHi||th.pal[0]); const mix=t=>`rgb(${c0.map((a,i)=>Math.round(a+(c1[i]-a)*t)).join(",")})`;
    rows.forEach((r,ri)=>{ const t=el("text",{x:m.l-8,y:m.t+ri*rh+rh/2+4,"text-anchor":"end",class:"lbl",fill:th.text},svg); t.textContent=r;
      cols.forEach((c,ci)=>{ const v=V[ri][ci]; if(v==null) return; const tt=(v-lo)/((hi-lo)||1); const x=m.l+ci*cw, y=m.t+ri*rh; const rect=el("rect",{x:x+1,y:y+1,width:cw-2,height:rh-2,fill:mix(Math.max(0,Math.min(1,tt))),rx:4,class:"bar"},svg); rect.style.setProperty("--ox",(x+cw/2)+"px"); rect.style.setProperty("--oy",(y+rh/2)+"px"); rect.style.animationName="none";
        rect.addEventListener("mousemove",ev=>showTip(`<b>${cfg.rowName||""} ${r} · ${cfg.colName||""} ${c}</b><br>${cfg.valueName||""} ${fmt(v,cfg.format)}${cfg.extra?"<br>"+cfg.extra(ri,ci):""}`,ev)); rect.addEventListener("mouseleave",hideTip);
        if(cfg.labels!==false){ const lt=el("text",{x:x+cw/2,y:y+rh/2+4,"text-anchor":"middle",class:"lbl",fill: tt>0.55? "#fff": th.text, style:"font-size:10px;font-weight:700"},svg); lt.textContent=fmt(v,cfg.format); } }); });
    cols.forEach((c,ci)=>{ const t=el("text",{x:m.l+ci*cw+cw/2,y:m.t-10,"text-anchor":"middle",class:"lbl",fill:th.text},svg); t.textContent=c; });
    container.classList.add("chart");
  }

  function donut(container,cfg){ container.innerHTML=""; const th=theme(); const W=Math.max(220,container.clientWidth||300); const H=cfg.height||Math.min(280,W); const R=Math.min(W,H)/2-10; const r2=R*0.62; const svg=el("svg",{viewBox:`0 0 ${W} ${H}`,width:W,height:H},container); const cx=W/2,cy=H/2; const total=cfg.items.reduce((a,b)=>a+b.value,0); let a0=-Math.PI/2;
    cfg.items.forEach((it,i)=>{ const a1=a0+it.value/total*2*Math.PI; const large=a1-a0>Math.PI?1:0; const p=(a,rr)=>[cx+rr*Math.cos(a),cy+rr*Math.sin(a)]; const [x0,y0]=p(a0,R),[x1,y1]=p(a1,R),[x2,y2]=p(a1,r2),[x3,y3]=p(a0,r2); const d=`M${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r2} ${r2} 0 ${large} 0 ${x3} ${y3} Z`; const path=el("path",{d,fill:it.color||th.pal[i%th.pal.length],class:"bar",stroke:th.bg,"stroke-width":2},svg); path.addEventListener("mousemove",ev=>showTip(`<b>${it.label}</b><br>${fmt(it.value,cfg.format||"pct")} (${(it.value/total*100).toFixed(1)} %)`,ev)); path.addEventListener("mouseleave",hideTip);
      const share=it.value/total; if(share>=0.055){ const am=(a0+a1)/2, rr=(R+r2)/2; const lx=cx+rr*Math.cos(am), ly=cy+rr*Math.sin(am);
        const tl=el("text",{x:lx,y:ly+4,"text-anchor":"middle",class:"val",fill:"#fff",style:"stroke:rgba(0,0,0,.45)"},svg); tl.textContent=(share*100).toFixed(share<0.1?1:0)+" %"; }
      a0=a1; });
    const t=el("text",{x:cx,y:cy-4,"text-anchor":"middle",class:"annot",fill:th.pal[3],style:"font-size:26px;font-weight:800;letter-spacing:-.03em"},svg); t.textContent=cfg.center||""; const t2=el("text",{x:cx,y:cy+16,"text-anchor":"middle",class:"lbl",fill:th.text},svg); t2.textContent=cfg.centerLabel||""; container.classList.add("chart"); }

  function pyramid(container,cfg){ const ctx=base(container,Object.assign({margin:{t:14,r:14,b:34,l:14}},cfg)); const {svg,m,iw,ih,th}=ctx; const g=cfg.groups; const maxv=Math.max(...g.map(x=>Math.max(x.m,x.f)))*1.05; const rowh=ih/g.length; const half=iw/2-28;
    g.forEach((x,i)=>{ const y=m.t+ih-(i+1)*rowh; const wm=x.m/maxv*half, wf=x.f/maxv*half; const rm=el("rect",{x:m.l+half-wm,y:y+1,width:wm,height:rowh-2,fill:cfg.colorM||th.pal[0],class:"bar",rx:2},svg); const rf=el("rect",{x:m.l+half+56,y:y+1,width:wf,height:rowh-2,fill:cfg.colorF||th.pal[1],class:"bar",rx:2},svg); [rm,rf].forEach(r=>{ r.style.animationName="none"; });
      rm.addEventListener("mousemove",ev=>showTip(`<b>${x.label}</b><br>Hombres: ${fmt(x.m,cfg.format||"pct")}`,ev)); rf.addEventListener("mousemove",ev=>showTip(`<b>${x.label}</b><br>Mujeres: ${fmt(x.f,cfg.format||"pct")}`,ev)); rm.addEventListener("mouseleave",hideTip); rf.addEventListener("mouseleave",hideTip);
      if(i%2===0||g.length<=12){ const t=el("text",{x:m.l+half+28,y:y+rowh/2+4,"text-anchor":"middle",class:"val",fill:th.text},svg); t.textContent=x.label; } });
    const t1=el("text",{x:m.l+half-4,y:m.t+ih+18,"text-anchor":"end",class:"annot",fill:th.text},svg); t1.textContent="Hombres"; const t2=el("text",{x:m.l+half+60,y:m.t+ih+18,class:"annot",fill:th.text},svg); t2.textContent="Mujeres"; container.classList.add("chart"); }

  function hist(container,cfg){ const vals=cfg.values.slice().sort((a,b)=>a-b); const n=vals.length; const bins=cfg.bins||30; const lo=cfg.min!=null?cfg.min:vals[0], hi=cfg.max!=null?cfg.max:vals[n-1]; const w=(hi-lo)/bins||1; const counts=new Array(bins).fill(0); vals.forEach(v=>{ let b=Math.floor((v-lo)/w); if(b>=bins) b=bins-1; if(b<0) b=0; counts[b]++; });
    const th=theme(); bar(container,{categories:counts.map((c,i)=>fmt(lo+w*i,cfg.xFormat||"num")),series:[{name:cfg.name||"frecuencia",values:counts.map(c=>c/n*100),color:cfg.color||th.pal[0]}],yFormat:"pct",yLabel:"% de simulaciones",height:cfg.height,margin:{l:56},valueLabels:false});
    if(cfg.markers){ const svg=container.querySelector("svg"); const W=+svg.getAttribute("width"); const m={l:56,r:20}; const iw=W-m.l-m.r; const H=+svg.getAttribute("height"); cfg.markers.forEach(mk=>{ const x=m.l+(mk.value-lo)/(hi-lo)*iw; if(x<m.l||x>m.l+iw) return; el("line",{x1:x,x2:x,y1:18,y2:H-46,class:"annot-line",stroke:th.pal[1]},svg); const t=el("text",{x:x+4,y:30,class:"annot",fill:th.text},svg); t.textContent=mk.text; }); } }

  const registry=new Map(); let ro; function register(elm,fn){ registry.set(elm,fn); if(!ro&&window.ResizeObserver){ ro=new ResizeObserver(entries=>{ entries.forEach(e=>{ const f=registry.get(e.target); if(f){ clearTimeout(e.target._rt); e.target._rt=setTimeout(()=>{ e.target.classList.remove("animate"); f(); },120);} }); }); } if(ro) ro.observe(elm); }
  function wrap(fn){ return (container,cfg)=>{ const render=()=>fn(container,cfg); register(container,render); render(); }; }
  window.Charts={line:wrap(line),bar:wrap(bar),donut:wrap(donut),pyramid:wrap(pyramid),hist:wrap(hist),heatmap:wrap(heatmap),tornado:wrap(tornado),dual:wrap(dual),fmt,theme};
})();
