(function () {
  "use strict";
  const svgNS = "http://www.w3.org/2000/svg";
  const $ = (id) => document.getElementById(id);
  const svg = $("chart"), summary = $("summary");
  if (!svg || !summary) return;
  const node = (tag, attrs, value) => { const x = document.createElementNS(svgNS, tag); Object.entries(attrs || {}).forEach(([k, v]) => x.setAttribute(k, String(v))); if (value !== undefined) x.textContent = value; svg.append(x); return x; };
  const txt = (x, y, value, size = 13, color = "#263247", anchor = "start") => node("text", { x, y, "font-size": size, fill: color, "text-anchor": anchor, "font-family": "system-ui, sans-serif" }, value);
  const line = (x1, y1, x2, y2, color = "#d6dce4", width = 1) => node("line", { x1, y1, x2, y2, stroke: color, "stroke-width": width });
  const rect = (x, y, width, height, color, rx = 4) => node("rect", { x, y, width: Math.max(0, width), height: Math.max(0, height), rx, fill: color });
  const value = (id) => Number($(id).value);
  const pct = (x) => (100 * x).toFixed(1) + "%";
  const addAxes = (yMax, label) => { line(52, 222, 568, 222, "#7b8797"); line(52, 34, 52, 222, "#7b8797"); txt(48, 24, label, 12); txt(52, 245, "0", 11); txt(568, 245, String(Number(yMax.toPrecision(3))), 11, "#263247", "end"); };
  const ranks = (xs) => { const order = xs.map((x, i) => ({ x, i })).sort((a, b) => a.x - b.x), out = Array(xs.length); for (let i = 0; i < order.length;) { let j = i + 1; while (j < order.length && order[j].x === order[i].x) j++; const r = (i + 1 + j) / 2; for (let k = i; k < j; k++) out[order[k].i] = r; i = j; } return out; };
  const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
  const pearson = (a, b) => { const ma = mean(a), mb = mean(b), da = a.reduce((s, x) => s + (x - ma) ** 2, 0), db = b.reduce((s, x) => s + (x - mb) ** 2, 0); return da && db ? a.reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0) / Math.sqrt(da * db) : NaN; };
  const clear = () => { svg.replaceChildren(); };
  const watch = (ids, update) => { ids.forEach((id) => $(id).addEventListener("input", update)); update(); };
  const sims = {
    pseudoreplication() {
      const update = () => {
        const reps = value("replicates"), cells = value("cells"), icc = value("icc"), total = reps * cells, designEffect = 1 + (cells - 1) * icc, effective = total / designEffect;
        $("replicates-value").textContent = reps; $("cells-value").textContent = cells; $("icc-value").textContent = icc.toFixed(2);
        summary.textContent = total.toLocaleString() + " cells across " + reps + " biological replicates; approximate independent-cell information is " + effective.toFixed(1) + " at ICC " + icc.toFixed(2) + ".";
        clear(); addAxes(total, "Relative information");
        const maxW = 470, maxVal = total || 1;
        [["Naive cell count", total, "#9aa5b4"], ["Cluster-adjusted effective n", effective, "#386fa4"]].forEach(([label, n, color], i) => { const y = 75 + i * 75, w = maxW * n / maxVal; txt(58, y - 9, label + " · " + Number(n).toFixed(1), 13); rect(58, y, w, 28, color); });
        txt(58, 220, "Design effect = 1 + (cells per replicate − 1) × ICC", 12, "#526174");
      };
      watch(["replicates", "cells", "icc"], update);
    },
    leakage() {
      const update = () => {
        const m = Math.floor(value("group-size")), p = value("holdout"), mixed = Math.max(0, Math.min(1, 1 - Math.pow(p, m) - Math.pow(1 - p, m)));
        $("group-size-value").textContent = m; $("holdout-value").textContent = pct(p);
        summary.textContent = "With " + m + " related cells and a " + pct(p) + " validation fraction, independent cell-level splitting puts the same group in both partitions with probability " + pct(mixed) + ". Group-held-out splitting makes that probability 0 by construction.";
        clear(); addAxes(1, "Probability group spans both partitions");
        [["Random cell split", mixed, "#d9822b"], ["Group-held-out split", 0, "#386fa4"]].forEach(([label, n, color], i) => { const y = 82 + i * 76; txt(58, y - 10, label + " · " + pct(n), 13); rect(58, y, 470 * n, 30, color); });
        txt(58, 220, "Illustration assumes each cell is assigned independently.", 12, "#526174");
      };
      watch(["group-size", "holdout"], update);
    },
    multiple() {
      const update = () => {
        const m = Math.floor(value("tests")), nullFraction = value("null-fraction"), alpha = value("alpha"), nullTests = m * nullFraction, expected = nullTests * alpha, familywise = -Math.expm1(nullTests * Math.log1p(-alpha));
        $("tests-value").textContent = m.toLocaleString(); $("null-value").textContent = pct(nullFraction); $("alpha-value").textContent = alpha.toFixed(3);
        summary.textContent = "If " + m.toLocaleString() + " hypotheses are tested at α = " + alpha.toFixed(3) + " and " + pct(nullFraction) + " are truly null, the expected false-positive count is " + expected.toFixed(1) + ".";
        clear(); line(58, 222, 558, 222, "#7b8797"); line(58, 40, 58, 222, "#7b8797");
        txt(58, 28, "Fraction on a 0–100% scale", 12); txt(58, 245, "0", 11); txt(558, 245, "100%", 11, "#263247", "end");
        const expectedFraction = nullTests ? expected / nullTests : 0;
        txt(58, 82, "Expected false positives / true-null tests · " + pct(expectedFraction), 13); rect(58, 92, 470 * expectedFraction, 30, "#d9822b");
        txt(58, 157, "Chance of ≥1 false positive · " + pct(familywise), 13); rect(58, 168, 470 * familywise, 30, "#386fa4");
        txt(58, 220, "Family-wise probability assumes independent, calibrated null p-values.", 12, "#526174");
      };
      watch(["tests", "null-fraction", "alpha"], update);
    },
    simpson() {
      const update = () => {
        const c1=value("c1"), c2=value("c2"), t1=value("t1"), t2=value("t2"), pc=value("p-control"), pt=value("p-treated");
        ["c1","c2","t1","t2"].forEach(id=>$(id+"-value").textContent=value(id).toFixed(1)); $("p-control-value").textContent=pct(pc); $("p-treated-value").textContent=pct(pt);
        const control=pc*c1+(1-pc)*c2, treated=pt*t1+(1-pt)*t2, delta=treated-control, pMid=(pc+pt)/2, comp=(pt-pc)*((c1+t1)/2-(c2+t2)/2), within=pMid*(t1-c1)+(1-pMid)*(t2-c2);
        summary.textContent="Within-type changes are "+(t1-c1>=0?"+":"")+(t1-c1).toFixed(1)+" and "+(t2-c2>=0?"+":"")+(t2-c2).toFixed(1)+"; the aggregate changes by "+(delta>=0?"+":"")+delta.toFixed(1)+". Composition effect: "+comp.toFixed(2)+"; within-type effect: "+within.toFixed(2)+".";
        clear(); line(55,222,570,222,"#7b8797"); const vals=[c1,c2,t1,t2,control,treated],max=Math.max(1,...vals)*1.15; line(55,35,55,222,"#7b8797");
        const bars=[["C type 1",c1,"#386fa4"],["C type 2",c2,"#76a5c9"],["T type 1",t1,"#d9822b"],["T type 2",t2,"#e9ae72"],["C aggregate",control,"#345"],["T aggregate",treated,"#684"]];
        bars.forEach(([label,n,color],i)=>{const x=70+i*82,h=170*n/max;rect(x,222-h,50,h,color,3);txt(x+25,242,label,10,"#263247","middle");txt(x+25,216-h,n.toFixed(1),11,"#263247","middle");});
        txt(58,24,"Mean value (synthetic example)",12);
      };
      watch(["c1","c2","t1","t2","p-control","p-treated"],update);
    },
    metrics() {
      const update=()=>{
        const mode=$("mode").value, amount=value("amount"), actual=[1,2,3,4,5,6,7,8];
        const pred=actual.map((x,i)=>mode==="offset"?x+amount:mode==="scale"?x*(1+amount):i===7?x+amount:x);
        const rmse=Math.sqrt(mean(actual.map((x,i)=>(x-pred[i])**2))), r=pearson(actual,pred), rho=pearson(ranks(actual),ranks(pred));
        $("amount-value").textContent=amount.toFixed(1);
        summary.textContent="Pearson r = "+(Number.isFinite(r)?r.toFixed(3):"NA")+"; Spearman ρ = "+(Number.isFinite(rho)?rho.toFixed(3):"NA")+"; RMSE = "+rmse.toFixed(3)+". The metrics respond differently to scale and outliers.";
        clear(); const bound=Math.max(10,...pred)*1.08, sx=(x)=>60+500*x/bound, sy=(y)=>220-180*y/bound;
        line(60,220,560,220,"#7b8797");line(60,40,60,220,"#7b8797");line(sx(0),sy(0),sx(bound),sy(bound),"#aab4c1",2);txt(64,30,"Predicted versus reference values; diagonal = perfect agreement",12);
        actual.forEach((x,i)=>node("circle",{cx:sx(x),cy:sy(pred[i]),r:5,fill:"#386fa4",opacity:.85}));
        txt(310,247,"Reference",12,"#263247","middle");node("text",{x:17,y:132,transform:"rotate(-90 17 132)","font-size":12,fill:"#263247","font-family":"system-ui, sans-serif"},"Predicted");
      };
      watch(["mode","amount"],update);
    },
    confounding() {
      const update=()=>{
        const off=Math.floor(value("cross")), diag=10, max=diag, combos=[["Control","Batch 1",diag,88,84],["Control","Batch 2",off,338,84],["Treated","Batch 1",off,88,154],["Treated","Batch 2",diag,338,154]], rank=off===0?2:3;
        $("cross-value").textContent=off; summary.textContent="The two factor columns have design rank "+rank+" of 3."+(off===0?" Condition and batch are perfectly confounded; adding more cells within these samples cannot separate them.":"Both off-diagonal combinations are present, so exact aliasing is removed; balance and power still need review.");
        clear();txt(70,36,"Condition × batch sample counts",13);line(70,56,542,56,"#cbd3dd");
        combos.forEach(([condition,batch,n,x,y])=>{const opacity=.18+.82*n/max;node("rect",{x,y,width:170,height:52,rx:8,fill:"#386fa4",opacity});txt(x+12,y+21,condition+" · "+batch,12,"#fff");txt(x+12,y+42,n+" samples",12,"#fff");});
        txt(88,230,"Batch 1",12);txt(338,230,"Batch 2",12);txt(567,116,"",12);
      };
      watch(["cross"],update);
    },
    dose() {
      const update=()=>{
        const shape=$("shape").value,maxDose=value("max-dose"),n=40,points=[];
        for(let i=0;i<=n;i++){const d=maxDose*i/n;let y;if(shape==="linear")y=1+.45*d;else if(shape==="saturating")y=1+4*d/(1+d);else y=1+1.7*d*Math.exp(-d/2.2);points.push({d,y});}
        $("max-dose-value").textContent=maxDose.toFixed(1);
        const shapeLabel=shape==="linear"?"linear":shape==="saturating"?"saturating": "biphasic";
        summary.textContent="Synthetic "+shapeLabel+" response shown over dose 0–"+maxDose.toFixed(1)+". Short ranges can make different response shapes look similar; measurements and controls are needed to distinguish them.";
        clear();const maxY=Math.max(...points.map(p=>p.y))*1.12,sx=d=>58+500*d/maxDose,sy=y=>220-180*y/maxY;
        line(58,220,558,220,"#7b8797");line(58,40,58,220,"#7b8797");txt(62,29,"Synthetic feature value",12);txt(308,249,"Dose",12,"#263247","middle");
        node("polyline",{points:points.map(p=>sx(p.d)+","+sy(p.y)).join(" "),fill:"none",stroke:"#386fa4","stroke-width":3,"stroke-linejoin":"round"});
        [0,.25,.5,.75,1].forEach(f=>{const p=points[Math.round(n*f)];node("circle",{cx:sx(p.d),cy:sy(p.y),r:4,fill:"#d9822b"});});
      };
      watch(["shape","max-dose"],update);
    },
    spatial() {
      const pts=[[1,1,"A"],[1.8,1.4,"A"],[2.4,2.1,"A"],[3,1.1,"B"],[3.5,2,"B"],[5.2,1,"B"],[5.8,1.6,"B"],[6.5,1.2,"A"],[7.1,2.1,"A"],[8.2,1,"A"],[8.5,2.1,"B"],[4.5,3.4,"A"],[5.3,4.1,"A"],[6.1,3.5,"B"],[7,4,"B"],[2,4,"B"]];
      const update=()=>{
        const radius=value("radius"),edges=[];for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i][0]-pts[j][0],pts[i][1]-pts[j][1]);if(d<=radius)edges.push([i,j]);}
        const cross=edges.filter(([i,j])=>pts[i][2]!==pts[j][2]).length,frac=edges.length?cross/edges.length:0;$("radius-value").textContent=radius.toFixed(1);
        summary.textContent=edges.length+" neighbor edges at radius "+radius.toFixed(1)+"; "+cross+" ("+pct(frac)+") connect different labels. Changing radius changes both graph density and the observed label mix.";
        clear();line(36,230,570,230,"#7b8797");line(36,28,36,230,"#7b8797");
        edges.forEach(([i,j])=>{const a=pts[i],b=pts[j],x1=48+a[0]*58,y1=35+a[1]*38,x2=48+b[0]*58,y2=35+b[1]*38;line(x1,y1,x2,y2,a[2]===b[2]?"#9ca8b6":"#d9822b",1.5);});
        pts.forEach((p)=>node("circle",{cx:48+p[0]*58,cy:35+p[1]*38,r:7,fill:p[2]==="A"?"#386fa4":"#d9822b",stroke:"#fff","stroke-width":1.5}));
        txt(45,255,"Synthetic 2D point cloud · blue = A · orange = B",12,"#526174");
      };
      watch(["radius"],update);
    }
  };
  const render = sims[document.body.dataset.sim]; if (render) render();
})();
