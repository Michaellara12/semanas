global.window = global; require("../js/data.js"); global.SEMANAS = window.SEMANAS;
const M = require("../js/models.js");
const f = v => Math.round(v).toLocaleString("es-CO");
console.log("e65 M/F", M.lifeExpectancy(65,"M").toFixed(2), M.lifeExpectancy(65,"F").toFixed(2), " e0 M/F", M.lifeExpectancy(0,"M").toFixed(1), M.lifeExpectancy(0,"F").toFixed(1), " e62M", M.lifeExpectancy(62,"M").toFixed(1), " e57F", M.lifeExpectancy(57,"F").toFixed(1));
console.log("B params", M.mortality);
console.log("annuityDue 62M i=3%:", M.annuityDue(62,"M",0.03).toFixed(3), " 57F:", M.annuityDue(57,"F",0.03).toFixed(3));
const sm = M.smmlv(2026);
console.log("capital para renta 1 SMMLV, 62 M, i=3% con beneficiario:", f(M.capitalParaRenta(sm,62,"M",0.03,true)), " 2025 mínimo:", f(M.capitalParaRenta(1423500,62,"M",0.03,true)));
console.log("Ley100 RPM: H 62, 1300 sem, IBL 2 SMMLV:", M.ley100RPM({sex:"M",edad:62,semanas:1300,ibl:2*sm}));
console.log("Ley2381: H 62, 1400 sem, IBL 4 SMMLV, saldo CCAI 80M:", M.ley2381({sex:"M",edad:62,semanas:1400,ibl:4*sm,saldoCCAI:80e6,anio:2027}));
for (const w of [300, 416, 999]) { const r = M.semicontributivo({sex:"M",semanas:w,ibcMensual:sm,pobre:false,gapAnios:0}); console.log(`Semi H ${w} sem @1SMMLV: capital ${f(r.capital)} renta ${f(r.renta)} (sin tope ${f(r.rentaSinTope)}) tope ${f(r.tope)}`); const p = M.semicontributivo({sex:"M",semanas:w,ibcMensual:sm,pobre:true}); console.log(`   pobre: capital ${f(p.capital)} renta ${f(p.renta)}`); }
console.log("Indemnización sustitutiva 416 sem @1SMMLV:", f(M.indemnizacionSustitutiva({ibcMensual:sm,semanas:416})));
console.log("Devolución RAIS 416 sem @1SMMLV r=4%:", f(M.acumular({ibcMensual:sm,semanas:416,r:0.04})));
const rows = M.proyectar({tgf:1.25}); const pk = rows.reduce((a,r)=> r.total>a.total?r:a, rows[0]);
console.log("Demo: 2025", (rows[0].total/1e6).toFixed(1), "p65", rows[0].p65.toFixed(1), "dep", rows[0].dep.toFixed(1), "| peak", pk.y, (pk.total/1e6).toFixed(1), "| 2050", (rows[25].total/1e6).toFixed(1), "p65", rows[25].p65.toFixed(1), "env", rows[25].envejecimiento.toFixed(0), "| 2070", (rows[45].total/1e6).toFixed(1), "p65", rows[45].p65.toFixed(1), "depMay", rows[45].depMayores.toFixed(1), "env", rows[45].envejecimiento.toFixed(0));
const base = M.fapc({}); console.log("FAPC base: agotamiento", base.agotamiento, "maxSaldo", base.maxSaldo.y, base.maxSaldo.saldo.toFixed(1), "VPN transf", base.vpnTransferencias.toFixed(1));
console.log(" ingresos fondo 2027/2036/2051/2100:", [2027,2036,2051,2100].map(y=>base.rows.find(r=>r.y===y).ingresosFondo.toFixed(2)).join("/"), " transf 2027/2063:", [2027,2063].map(y=>base.rows.find(r=>r.y===y).transferencia.toFixed(2)).join("/"));
for (const u of [1,3,4]) { const r=M.fapc({umbral:u}); console.log(`umbral ${u}: agot ${r.agotamiento} VPN ${r.vpnTransferencias.toFixed(1)} maxSaldo ${r.maxSaldo.saldo.toFixed(1)}`); }
const r33 = M.fapc({rReal:0.033}); console.log("rReal 3.3%: agot", r33.agotamiento, "VPN", r33.vpnTransferencias.toFixed(1));
const gen = M.fapc({generacional:true}); console.log("generacional: agot", gen.agotamiento);
const mc = M.monteCarlo({ibcMensual:sm, anios:25, share:0.115, mu:0.045, sigma:0.09, n:500}); console.log("MC 25y p5/p50/p95:", f(mc.p5), f(mc.p50), f(mc.p95));
const h = M.parseHistoria("2010-01-01,2015-12-31,600000\n2016-01-01,2025-12-31,1300000"); console.log("historia: semanas", h.semanas.toFixed(1), "ibl10", f(h.ibl10), "iblVida", f(h.iblVida));
