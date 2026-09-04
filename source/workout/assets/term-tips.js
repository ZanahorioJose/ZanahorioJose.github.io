(function(){
  var TERMS=[
    ["RIR","Repetitions In Reserve","余次留量（预留次数）：一组做完后还能标准完成的次数。常用于自感强度，RPE = 10 − RIR。"],
    ["RPE","Rating of Perceived Exertion","主观用力程度，通常 0~10 分：10=完全力竭，9=还能做 1 次，8=还能做 2 次，≤6=热身强度。"],
    ["RM","Repetition Maximum","最大重复次数：某重量下能标准完成的最大次数。1RM=只能做1次，10RM=能做10次。"],
    ["渐进超负荷","Progressive Overload","逐步增加训练负荷（重量/次数/组数/频率），给身体持续的适应刺激，是长期变强的核心原则。"],
    ["肌肥大","Muscle Hypertrophy","肌肉体积增长。主要由机械张力驱动，辅以代谢压力与肌肉微损伤。"],
    ["机械张力","Mechanical Tension","肌肉在较大负荷下被拉长、收缩时承受的张力，是肌肥大的首要因素。"],
    ["代谢压力","Metabolic Stress","高次数、短间歇引起的泵感与灼烧感，是增肌的有效辅助刺激。"],
    ["肩肱节律","Scapulohumeral Rhythm","手臂上举时，肩胛骨与肱骨协同运动：大臂上举约 2°，肩胛相应上回旋约 1°（约 2:1）。"],
    ["复合动作","Compound Exercise","多关节参与、可上大重量、一次刺激多块肌肉的动作（如深蹲、卧推、硬拉、划船）。"],
    ["髋铰链","Hip Hinge","以髋关节为轴做屈伸：臀部后移、躯干前倾、膝微屈且角度基本固定。是硬拉类与后链发力的基础。"],
    ["肌肉微损伤","Microtrauma","离心收缩（下放）阶段对肌纤维造成的微小损伤，与延迟性肌肉酸痛（DOMS）相关。"],
    ["超量恢复","Supercompensation","训练后身体修复，肌肉力量短暂超过训练前的水平，是增长发生的过程。"],
    ["训练容量","Training Volume","重量 × 次数 × 组数的总量，是增肌的关键驱动变量。"],
    ["孤立动作","Isolation Exercise","只涉及单关节、针对少数肌肉的动作（如弯举、侧平举），用于精雕细琢局部。"],
    ["后链","Posterior Chain","身体后侧的肌群：腘绳肌、臀大肌、竖脊肌、背部等。"],
    ["杠杆","Leverage","以关节为支点的力学关系。肌肉拉力线与动作轨迹越吻合，发力效率越高。"]
  ];
  var map={}; TERMS.forEach(function(t){map[t[0]]=t;});
  function walk(root){
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
    while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(function(nd){
      if(!nd.parentNode)return;
      var pcn=nd.parentNode.className; if(pcn&&String(pcn).indexOf("term")>-1)return;
      var text=nd.nodeValue, frag=document.createDocumentFragment(), last=0, matched=false;
      var re=new RegExp(TERMS.map(function(t){return t[0];}).join("|"),"g"), m;
      while((m=re.exec(text))!==null){
        if(m.index<last)continue; matched=true;
        frag.appendChild(document.createTextNode(text.slice(last,m.index)));
        var key=m[0],t=map[key],sp=document.createElement("span");
        sp.className="term"; sp.setAttribute("data-e",t[1]); sp.setAttribute("data-z",t[0]); sp.setAttribute("data-d",t[2]);
        sp.textContent=key; frag.appendChild(sp); last=m.index+key.length;
        if(m.index===re.lastIndex)re.lastIndex++;
      }
      if(matched){ if(last<text.length)frag.appendChild(document.createTextNode(text.slice(last))); nd.parentNode.replaceChild(frag,nd); }
    });
  }
  function init(){ document.querySelectorAll(".pane,.lsub,.lhead").forEach(walk); }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init);}else{init();}
  var tip=document.createElement("div"); tip.className="termtip";
  tip.innerHTML="<div class=tt-top><span class=tt-emoji>💡</span><span class=tt-e></span></div><div class=tt-z></div><div class=tt-d></div>";
  document.body.appendChild(tip);
  function fill(t){ if(!t){tip.classList.remove("show");return;} tip.querySelector(".tt-e").textContent=t.getAttribute("data-e")||""; tip.querySelector(".tt-z").textContent=t.getAttribute("data-z")||""; tip.querySelector(".tt-d").textContent=t.getAttribute("data-d")||""; tip.classList.add("show"); }
  function place(t){ var r=t.getBoundingClientRect(); var tw=tip.offsetWidth||260; var th=tip.offsetHeight||90; var left=r.left+(r.width-tw)/2; var top=r.top-th-10; left=Math.max(8,Math.min(left,window.innerWidth-tw-8)); if(top<8)top=r.bottom+10; tip.style.left=left+"px"; tip.style.top=top+"px"; }
  document.addEventListener("mouseover",function(e){ var t=e.target.closest&&e.target.closest(".term"); if(t){fill(t);place(t);}else tip.classList.remove("show"); });
  document.addEventListener("mouseout",function(e){ if(e.target.closest&&e.target.closest(".term"))tip.classList.remove("show"); });
})();