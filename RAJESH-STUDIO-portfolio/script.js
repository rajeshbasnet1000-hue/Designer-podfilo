const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

const header=$('.site-header'), menu=$('.menu-toggle'), nav=$('.nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

const counter=$('[data-count]');
if(counter){const co=new IntersectionObserver(es=>{if(es[0].isIntersecting){let n=0;const target=+counter.dataset.count;const timer=setInterval(()=>{counter.textContent=++n;if(n>=target)clearInterval(timer)},120);co.disconnect()}},{threshold:.7});co.observe(counter)}

$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const type=btn.dataset.filter;
  $$('.project').forEach(card=>{
    const show=type==='all'||card.dataset.type===type;
    card.style.display=show?'block':'none';
  });
}));

const quotes=$$('.quote'), qIndex=$('#quoteIndex');let qi=0;
function showQuote(i){qi=(i+quotes.length)%quotes.length;quotes.forEach((q,n)=>q.classList.toggle('active',n===qi));qIndex.textContent=`0${qi+1} / 0${quotes.length}`}
$('#nextQuote').addEventListener('click',()=>showQuote(qi+1));$('#prevQuote').addEventListener('click',()=>showQuote(qi-1));
setInterval(()=>showQuote(qi+1),7000);

const copyBtn=$('.copy-email'), toast=$('.copy-toast');
copyBtn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('rajeshbasnet1000@gmail.com');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}catch(e){window.location.href='mailto:rajeshbasnet1000@gmail.com'}});

$$('[data-placeholder]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();alert(`${a.dataset.placeholder} link is a placeholder. Replace href="#" in index.html with your real profile URL.`)}));

if(matchMedia('(pointer:fine)').matches){
 const dot=$('.cursor-dot'),ring=$('.cursor-ring');let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
 addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.transform=`translate(${x-3}px,${y-3}px)`});
 function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform=`translate(${rx-16}px,${ry-16}px)`;requestAnimationFrame(loop)}loop();
 $$('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>ring.style.transform+= ' scale(1.35)');el.addEventListener('mouseleave',()=>{})});
}

$$('.play,.mini-play').forEach(btn=>btn.addEventListener('click',()=>alert('Video preview placeholder — replace this card with your MP4/YouTube/Vimeo URL.')));
