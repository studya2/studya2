/* =========================================================
   Study @ A² — site behaviour. Content you may want to edit
   (programmes, toppers, phone) is at the top of this file.
   ========================================================= */
const PHONE_WA = "918420317980";

const PROGRAMMES = {
  school: {
    title: "Class 8, 9 & 10",
    sub: "A strong foundation for board exams and beyond.",
    subjects: ["Mathematics", "Science", "English", "Social Science"],
    points: ["Concept-first teaching with regular practice", "Chapter-wise tests and doubt clearing", "Concise revision notes before every exam", "Personal mentor for each student"]
  },
  science: {
    title: "Class 11–12 Science",
    sub: "Board and entrance preparation for the Science group.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    points: ["Deep conceptual clarity with problem solving", "Full test series with detailed analysis", "Revision notes for every chapter", "Mentor support for planning and exam stress"]
  },
  commerce: {
    title: "Class 11–12 Commerce",
    sub: "Clear, structured coaching for the Commerce group.",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    points: ["Step-by-step numericals and theory handling", "Regular tests that mirror the board pattern", "Quick-revision notes and answer-writing practice", "Career guidance seminars"]
  },
  neet: {
    title: "NEET (Competitive)",
    sub: "Focused medical entrance preparation.",
    subjects: ["Physics", "Chemistry", "Biology"],
    points: ["Syllabus coverage with NCERT-first approach", "Weekly and full-length mock test series", "Targeted revision notes and quizzes", "One-to-one mentorship and progress tracking"]
  }
};

/* Add toppers here as results come in, e.g.
   { name: "Student Name", score: "96%", exam: "Class 10 Boards", year: "2026" }  */
const TOPPERS = [];

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- mobile menu ---------- */
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
$$("#menu a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  burger.setAttribute("aria-expanded", false);
}));

/* ---------- programme tabs ---------- */
const panel = $("#panel");
function showProgramme(key) {
  const p = PROGRAMMES[key];
  panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
  panel.innerHTML = `
    <div>
      <h3>${esc(p.title)}</h3>
      <p class="sub">${esc(p.sub)}</p>
      <ul class="chips">${p.subjects.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
      <p style="margin-top:1.4rem"><a class="btn btn-sm" href="#contact" data-course="${esc(p.title)}">Enquire for this</a></p>
    </div>
    <ul class="ticks">${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
}
$$(".tabs button").forEach(b => b.addEventListener("click", () => {
  $$(".tabs button").forEach(x => x.setAttribute("aria-selected", x === b));
  showProgramme(b.dataset.t);
}));
showProgramme("school");

/* "Enquire for this" pre-selects the course in the form */
panel.addEventListener("click", e => {
  const a = e.target.closest("[data-course]");
  if (!a) return;
  const sel = $("select[name=course]");
  const t = a.dataset.course;
  const map = { "Class 8, 9 & 10": "Class 10", "Class 11–12 Science": "Class 11–12 Science", "Class 11–12 Commerce": "Class 11–12 Commerce", "NEET (Competitive)": "NEET" };
  sel.value = map[t] || "";
});

/* ---------- toppers ---------- */
const tp = $("#toppers");
if (TOPPERS.length) {
  tp.innerHTML = TOPPERS.map(t => `
    <article class="topper reveal">
      <b>${esc(t.score)}</b><span>${esc(t.exam)} · ${esc(t.year)}</span>
      <h3>${esc(t.name)}</h3>
    </article>`).join("");
} else {
  tp.innerHTML = `
    <div class="empty reveal">
      <h3>Results are celebrated here</h3>
      <p>Our toppers' names and scores are published every year. Call us to hear about our recent results.</p>
      <a class="link" href="tel:+918420317980">+91 84203 17980</a>
    </div>`;
}

/* ---------- gallery lightbox ---------- */
const imgs = $$("#gallery-grid .g img");
const lb = $("#lb"), lbImg = $("#lb-img");
let cur = 0, lastFocus = null;
function openLb(i) {
  cur = (i + imgs.length) % imgs.length;
  lbImg.src = imgs[cur].src; lbImg.alt = imgs[cur].alt;
  lb.hidden = false; document.body.style.overflow = "hidden";
  $("#lb-x").focus();
}
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
$$("#gallery-grid .g").forEach((b, i) => b.addEventListener("click", () => { lastFocus = b; openLb(i); }));
$("#lb-x").addEventListener("click", closeLb);
$("#lb-prev").addEventListener("click", () => openLb(cur - 1));
$("#lb-next").addEventListener("click", () => openLb(cur + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") openLb(cur - 1);
  if (e.key === "ArrowRight") openLb(cur + 1);
});
let sx = null;
lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
lb.addEventListener("touchend", e => {
  if (sx === null) return;
  const dx = e.changedTouches[0].clientX - sx; sx = null;
  if (Math.abs(dx) > 50) openLb(cur + (dx < 0 ? 1 : -1));
}, { passive: true });

/* ---------- enquiry form → WhatsApp ---------- */
$("#enquiry").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, err = $("#err");
  const name = f.name.value.trim(), course = f.course.value, phone = f.phone.value.replace(/\D/g, "");
  let msg = "";
  if (name.length < 2) msg = "Please enter the student's name.";
  else if (!course) msg = "Please choose a class or programme.";
  else if (phone && phone.replace(/^91/, "").length !== 10) msg = "Please enter a valid 10-digit phone number, or leave it blank.";
  err.hidden = !msg; err.textContent = msg;
  if (msg) return;
  const text = `Hello Study @ A², I'd like to book a demo class.\nStudent: ${name}\nClass: ${course}` + (phone ? `\nPhone: ${phone}` : "");
  window.open(`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

/* ---------- reveal on scroll ---------- */
const rev = $$(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: .12 });
  rev.forEach(el => io.observe(el));
} else rev.forEach(el => el.classList.add("in"));

$("#yr").textContent = new Date().getFullYear();
