const assert=require('node:assert/strict');
const {calculate:c,defaults}=require('../js/math-explainers.js');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
for(const w of [1,2.3,4,25])for(const u of [1,2.3,4]){
 const split=c('split',{w,u});near(split.publicBase+split.personalBase,w);assert.ok(split.personalBase>=0);
 const cot=c('contribution',{w,u});near(cot.total,w*.16);near(cot.employee+cot.employer,cot.total);near(cot.publicAmount+cot.personalAmount,cot.total);near(cot.credited,split.personalBase*.132);
}
const share=c('share',defaults.share);near(share.moneyShare,100*5.3/13);near(share.peopleShare,200/3);
near(c('share',{a:1,b:1,c:1,u:2.3}).moneyShare,100);
assert.ok(Number.isFinite(c('share',{a:0,b:0,c:0,u:2.3}).moneyShare));
assert.equal(c('pension',{w:5,u:2.3,n:1299}).payment,0);
assert.equal(c('pension',{w:5,u:2.3,n:1349}).blocks,0);
assert.equal(c('pension',{w:5,u:2.3,n:1350}).blocks,1);
near(c('pension',{w:1,u:2.3,n:1300}).payment,1);
near(c('pension',{w:5,u:2.3,n:2300}).rate,80);
near(c('fund',defaults.fund).balance,9.63);
const empty=c('fund',{b:0,r:0,g:3,s:1,p:3});near(empty.balance,0);near(empty.gap,2);near(empty.paid,1);
near(c('fund',{b:10,r:3,g:3,s:1,p:1}).balance,10);
console.log('OK: split, contributions, percentages, eligibility, blocks, cap and uncovered payments');
