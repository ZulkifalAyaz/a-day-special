/* ====== EDIT THIS PART ====== */
const CONFIG = {
  name: "Safiyyah Afridi",            // birthday person (or share a link like ?name=Ayesha)
  from: "none",
  wishes: [
    "May this year bring you more laughter than you can carry.",
    "I hope every plan you make turns out better than you imagined.",
    "Thank you for being someone I can always count on.",
    "May you have time for the things and people you love most.",
    "Here's to new adventures, good health and a very big slice of cake."
  ]
};
/* ============================ */

const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const name = (params.get("name") || CONFIG.name).slice(0, 40);
$("name").textContent = name;
document.title = `Happy Birthday, ${name}!`;

/* Balloons */
const colors = ["#f4a5b8", "#ffcf70", "#8fd9c8", "#b9a6ff"];
for (let i = 0; i < 12; i++) {
  const b = document.createElement("span");
  b.className = "balloon";
  b.style.left = Math.random() * 100 + "%";
  b.style.background = colors[i % colors.length];
  b.style.setProperty("--sway", (Math.random() * 120 - 60) + "px");
  b.style.animationDuration = 14 + Math.random() * 12 + "s";
  b.style.animationDelay = -Math.random() * 20 + "s";
  b.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
  $("balloons").appendChild(b);
}

/* Confetti */
const canvas = $("confetti"), ctx = canvas.getContext("2d");
let pieces = [], running = false;
const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
resize(); addEventListener("resize", resize);

function burst() {
  for (let i = 0; i < 180; i++) {
    const a = Math.random() * Math.PI * 2, s = 6 + Math.random() * 10;
    pieces.push({
      x: innerWidth / 2, y: innerHeight * 0.55,
      vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6,
      w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
      r: Math.random() * 6, vr: Math.random() * 0.4 - 0.2,
      c: colors[(Math.random() * colors.length) | 0], life: 0
    });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter(p => p.y < canvas.height + 20 && p.life < 300);
  for (const p of pieces) {
    p.vy += 0.25; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
    ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
  }
  if (pieces.length) requestAnimationFrame(tick); else running = false;
}

/* Wishes */
$("wishList").innerHTML = CONFIG.wishes
  .map((w, i) => `<li style="animation-delay:${0.4 + i * 0.35}s"></li>`).join("");
[...$("wishList").children].forEach((li, i) => li.textContent = CONFIG.wishes[i]);
$("sign").textContent = CONFIG.from;

/* Interaction */
$("blow").addEventListener("click", () => {
  document.body.classList.add("out");
  $("blow").disabled = true;
  $("sub").textContent = "Wish made. Happy birthday!";
  burst(); setTimeout(burst, 500);
  const w = $("wishes");
  w.hidden = false;
  setTimeout(() => w.scrollIntoView({ behavior: "smooth", block: "start" }), 900);
});
$("again").addEventListener("click", () => {
  document.body.classList.remove("out");
  $("blow").disabled = false;
  $("sub").textContent = "Make a wish, then blow out the candles.";
  $("wishes").hidden = true;
  scrollTo({ top: 0, behavior: "smooth" });
});
