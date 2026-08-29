/* =========================================================
   ZAMANI LIGHTING — INTERACTION LAYER
========================================================= */

// ===== Header background + mobile navigation =====
const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

function onScroll(){
  header?.classList.toggle("scrolled", window.scrollY > 24);
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

navToggle?.addEventListener("click", () => {
  const open = mainNav?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(!!open));
});

mainNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded","false");
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window){
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  revealEls.forEach(el => io.observe(el));
}else{
  revealEls.forEach(el => el.classList.add("in"));
}

// ===== Gallery =====
// نکته: این آرایه را می‌توان بعداً با URL واقعی عکس‌های اینستاگرام برند جایگزین کرد.
// چون اینستاگرام لینک مستقیم CDN عکس‌ها را پایدار و عمومی ارائه نمی‌کند، در این دموی مستقل
// عکس‌های نمونه از منابع عمومی استفاده شده و لینک خود اینستاگرام در تمام CTAها فعال است.
const galleryItems = [
  {
    title:"Golden Cascade",
    subtitle:"کریستال · طلایی · شاخص",
    badge:"SIGNATURE",
    image:"https://assets.danubehome.com/media/dh-seller/p/230400400397/230400400397-sp-ai-OFF-1.jpg"
  },
  {
    title:"Crystal Wave",
    subtitle:"کریستال · مجلسی · لوکس",
    badge:"NEW",
    image:"https://assets.danubehome.com/media/dh-seller/p/assets/230400400390/400x400/10/112/230400400390-sp-ON-1.jpg?width=800"
  },
  {
    title:"Ramas",
    subtitle:"مدرن · طلایی · دکوراتیو",
    badge:"MODERN",
    image:"https://kandilegypt.com/cdn/shop/files/D9_86_D8_AC_D9_81_D9_87-_D9_84_D9_8A_D8_AF-80-_D8_B3_D9_85-_D8_B1_D8_A7_D9_85_D8_A7_D8_B3-_D8_AF_D9_87_D8_A8_D9_8A-2_ef41261a-c1a8-4af0-9ca1-8c60af49383c.jpg?v=1766639413&width=1200"
  },
  {
    title:"Modern Rings",
    subtitle:"مشکی · طلایی · مینیمال",
    badge:"MINIMAL",
    image:"https://meshkati.sa/media/catalog/product/cache/3d6fa0099921c1f018e752651beef9ef/y/d/yd-3126-6_2_.png"
  },
  {
    title:"Crystal Statement",
    subtitle:"کریستال · آبشاری · مجلل",
    badge:"PREMIUM",
    image:"https://kandilegypt.com/cdn/shop/collections/1020011731466336-2.jpg?v=1770113608"
  }
];

const galleryTrack = document.getElementById("galleryTrack");
const galleryProgress = document.getElementById("galleryProgress");

function renderGallery(){
  if(!galleryTrack) return;
  galleryTrack.innerHTML = galleryItems.map((item,i) => `
    <article class="gallery-card ${i===0 ? "large":""}">
      <div class="gallery-image" style="background-image:url('${item.image}')"></div>
      <span class="gallery-badge">${item.badge}</span>
      <div class="gallery-overlay">
        <span class="gallery-index">0${i+1} / 0${galleryItems.length}</span>
        <h3>${item.title}</h3>
        <p>${item.subtitle}</p>
      </div>
    </article>
  `).join("");
}
renderGallery();

function galleryStep(dir){
  if(!galleryTrack) return;
  const card = galleryTrack.querySelector(".gallery-card");
  if(!card) return;
  const amount = card.getBoundingClientRect().width + 16;
  galleryTrack.scrollBy({left: dir * amount, behavior:"smooth"});
}
document.getElementById("prevSlide")?.addEventListener("click",()=>galleryStep(-1));
document.getElementById("nextSlide")?.addEventListener("click",()=>galleryStep(1));

galleryTrack?.addEventListener("scroll",()=>{
  const max = galleryTrack.scrollWidth - galleryTrack.clientWidth;
  const ratio = max ? galleryTrack.scrollLeft / max : 0;
  galleryProgress.style.width = `${Math.max(18, ratio * 100)}%`;
});

// ===== Products =====
const products = [
  {
    title:"آویز طلایی آورا",
    category:"modern",
    categoryLabel:"MODERN",
    price:"۲۴٬۸۰۰٬۰۰۰ تومان",
    desc:"فرم شاخه‌ای با جزئیات کریستالی برای پذیرایی و فضاهای شاخص.",
    image:galleryItems[2].image
  },
  {
    title:"لوستر کریستالی کاسکید",
    category:"crystal",
    categoryLabel:"CRYSTAL",
    price:"۳۲٬۰۰۰٬۰۰۰ تومان",
    desc:"ساختار لایه‌ای و درخشش کریستال برای یک نقطه کانونی مجلل.",
    image:galleryItems[4].image
  },
  {
    title:"رینگ طلایی نوا",
    category:"minimal",
    categoryLabel:"MINIMAL",
    price:"۱۸٬۹۰۰٬۰۰۰ تومان",
    desc:"خطوط ساده و نور یکدست؛ مناسب فضاهای مدرن و مینیمال.",
    image:galleryItems[3].image
  },
  {
    title:"لوستر موج کریستال",
    category:"classic",
    categoryLabel:"CLASSIC",
    price:"۲۹٬۵۰۰٬۰۰۰ تومان",
    desc:"ترکیب فرم کلاسیک و درخشش کریستال با حس لوکس.",
    image:galleryItems[1].image
  },
  {
    title:"گلدن داماس",
    category:"crystal",
    categoryLabel:"CRYSTAL",
    price:"۲۷٬۴۰۰٬۰۰۰ تومان",
    desc:"ساختار دایره‌ای طلایی با کریستال‌های شفاف و نور گرم.",
    image:galleryItems[0].image
  },
  {
    title:"رینگ دکوراتیو",
    category:"modern",
    categoryLabel:"MODERN",
    price:"۱۵٬۷۰۰٬۰۰۰ تومان",
    desc:"مدل معاصر با خطوط هندسی برای نشیمن، غذاخوری و لابی.",
    image:galleryItems[3].image
  }
];

const productGrid = document.getElementById("productGrid");

function renderProducts(filter="all"){
  productGrid.innerHTML = products.map((p,index) => `
    <article class="product-card ${filter!=="all" && p.category!==filter ? "is-hidden":""}" data-index="${index}">
      <div class="product-photo" style="background-image:url('${p.image}')"></div>
      <div class="product-info">
        <span class="tag">${p.categoryLabel}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="product-foot">
          <span class="product-price">${p.price}</span>
          <span class="view-btn">مشاهده جزئیات</span>
        </div>
      </div>
    </article>
  `).join("");

  productGrid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click",()=>openProduct(+card.dataset.index));
  });
}
renderProducts();

document.querySelectorAll("#filters button").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll("#filters button").forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

// ===== Product modal =====
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");

function openProduct(index){
  const p = products[index];
  if(!p || !modal) return;
  modalImage.style.backgroundImage = `url('${p.image}')`;
  modalCategory.textContent = p.categoryLabel;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = p.price;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function closeModal(){
  modal?.classList.remove("open");
  modal?.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeModal()});

// ===== AR =====
const arLaunch = document.getElementById("arLaunch");
const arButton = document.getElementById("arButton");
const arHint = document.getElementById("arHint");
const mv = document.getElementById("mv");

function isMobile(){
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

arLaunch?.addEventListener("click",()=>{
  document.getElementById("ar-demo")?.scrollIntoView({behavior:"smooth",block:"center"});
  if(isMobile()){
    setTimeout(()=>arButton?.click(),650);
  }else if(arHint){
    arHint.textContent = "برای AR، همین صفحه را با گوشی موبایل باز کن.";
    arHint.style.color = "var(--gold2)";
  }
});

mv?.addEventListener("error",()=>{
  const frame = document.querySelector(".ar-frame");
  if(frame){
    frame.innerHTML = `
      <div style="height:100%;display:grid;place-items:center;padding:30px;text-align:center;color:#a99d89">
        مدل سه‌بعدی نمونه بارگذاری نشد. در نسخه نهایی، فایل GLB واقعی هر محصول اینجا قرار می‌گیرد.
      </div>`;
  }
});

// ===== Hero parallax desktop =====
const hero = document.querySelector(".hero");
const heroArt = document.querySelector(".hero-art");

if(hero && heroArt && matchMedia("(hover:hover)").matches){
  hero.addEventListener("mousemove",(e)=>{
    const x = (e.clientX / innerWidth - .5);
    const y = (e.clientY / innerHeight - .5);
    heroArt.style.transform = `translate3d(${x*12}px,${y*10}px,0)`;
  });
  hero.addEventListener("mouseleave",()=>{
    heroArt.style.transform = "translate3d(0,0,0)";
  });
}

// ===== Footer year =====
const year = document.getElementById("year");
if(year) year.textContent = new Date().getFullYear();


/* FINAL FIX: deterministic hero slider */
(function(){
  const root=document.getElementById("heroSlider");
  if(!root) return;
  const slides=[...root.querySelectorAll(".hero-slide")];
  const dots=[...root.querySelectorAll("[data-hero-slide]")];
  const prev=document.getElementById("heroPrev");
  const next=document.getElementById("heroNext");
  const current=document.getElementById("heroCurrent");
  const progress=document.getElementById("heroProgress");
  if(!slides.length) return;
  let i=0, timer=null, startX=0;
  const D=5500;

  function render(n){
    i=(n+slides.length)%slides.length;
    slides.forEach((s,k)=>s.classList.toggle("active",k===i));
    dots.forEach((d,k)=>d.classList.toggle("active",k===i));
    if(current) current.textContent=String(i+1).padStart(2,"0");
    if(progress){
      progress.style.transition="none";
      progress.style.width="0%";
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        progress.style.transition=`width ${D}ms linear`;
        progress.style.width="100%";
      }));
    }
  }
  function play(){
    clearInterval(timer);
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer=setInterval(()=>render(i+1),D);
  }
  function go(n){render(n);play()}
  prev?.addEventListener("click",()=>go(i-1));
  next?.addEventListener("click",()=>go(i+1));
  dots.forEach(d=>d.addEventListener("click",()=>go(Number(d.dataset.heroSlide))));
  root.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;clearInterval(timer)},{passive:true});
  root.addEventListener("touchend",e=>{
    const dx=e.changedTouches[0].clientX-startX;
    if(Math.abs(dx)>45) go(i+(dx<0?1:-1)); else play();
  },{passive:true});
  root.addEventListener("mouseenter",()=>clearInterval(timer));
  root.addEventListener("mouseleave",play);
  render(0); play();
})();
