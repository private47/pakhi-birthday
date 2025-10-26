const screens = {
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  memories: document.getElementById("memories"),
  final: document.getElementById("final"),
};
const bgMusic = document.getElementById("bg-music");

const startBtn = document.getElementById("startBtn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const memoryPhoto = document.getElementById("memory-photo");
const memoryCaption = document.getElementById("memory-caption");
const nextMemoryBtn = document.getElementById("nextMemory");
const replayBtn = document.getElementById("replayBtn");
const celebrateBtn = document.getElementById("celebrateBtn");
const loveContainer = document.getElementById("love-animation");
const secretBtn = document.getElementById("secretBtn");
const surprise = document.getElementById("surprise");
const closeSurprise = document.getElementById("closeSurprise");

const quizData = [
  { q: "Who made the first move? 😏", options: ["You did", "I did", "The Universe did"], answer: "You did" },
  { q: "My go-to snack during movie night?", options: ["Popcorn", "Fries", "Your leftover pizza 🍕"], answer: "Your leftover pizza 🍕" },
  { q: "What’s my most iconic line?", options: ["‘I’m not mad but…’", "‘Can you bring food?’", "‘Leave me alone!’"], answer: "‘Can you bring food?’" },
  { q: "If we were a movie, what genre would it be?", options: ["Rom-Com", "Drama", "Stand-up Comedy"], answer: "Rom-Com" },
];

const memories = [
  { photo: "images/1.jpg", caption: "The first time we met 💫" },
  { photo: "images/2.jpg", caption: "Our first trip 🌄" },
  { photo: "images/3.jpg", caption: "Midnight giggles 😂" },
  { photo: "images/4.jpg", caption: "Lazy mornings with coffee ☕" },
  { photo: "images/5.jpg", caption: "Your unstoppable laughter 💖" },
  { photo: "images/6.jpg", caption: "Our small fights and bigger hugs 🫶" },
  { photo: "images/7.jpg", caption: "Every time you caught me staring 😍" },
  { photo: "images/8.jpg", caption: "You being effortlessly you 🌸" },
  { photo: "images/9.jpg", caption: "Moments that feel like home 🏡" },
  { photo: "images/10.jpg", caption: "Forever my favorite chapter 💞" },
];

let quizIndex = 0;
let memoryIndex = 0;

// Navigation helpers
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

// Intro
startBtn.addEventListener("click", () => {
  bgMusic.play();
  showScreen("quiz");
  loadQuestion();
});

// Quiz logic
function loadQuestion() {
  if (quizIndex >= quizData.length) {
    showScreen("memories");
    showMemory();
    return;
  }
  const q = quizData[quizIndex];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt === q.answer);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(correct) {
  const emoji = document.createElement("span");
  emoji.textContent = correct ? "💖" : "😂";
  emoji.style.position = "absolute";
  emoji.style.fontSize = "2em";
  emoji.style.top = Math.random() * 80 + "vh";
  emoji.style.left = Math.random() * 80 + "vw";
  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 1000);
  quizIndex++;
  setTimeout(loadQuestion, 800);
}

// Memories carousel
function showMemory() {
  if (memoryIndex >= memories.length) {
    showScreen("final");
    fireworks();
    return;
  }
  const current = memories[memoryIndex];
  memoryPhoto.src = current.photo;
  memoryCaption.textContent = current.caption;
  gsap.fromTo(memoryPhoto, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8 });
  gsap.fromTo(memoryCaption, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
}

nextMemoryBtn.addEventListener("click", () => {
  memoryIndex++;
  showMemory();
});

// Finale
replayBtn.addEventListener("click", () => {
  quizIndex = 0;
  memoryIndex = 0;
  showScreen("intro");
});

celebrateBtn.addEventListener("click", () => fireworks());

// Love animation
function startLoveAnimation() {
  setInterval(() => {
    const span = document.createElement("span");
    span.classList.add("love");
    span.textContent = Math.random() > 0.5 ? "❤️" : "💖";
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 4 + Math.random() * 3 + "s";
    loveContainer.appendChild(span);
    setTimeout(() => span.remove(), 7000);
  }, 400);
}

// Confetti fireworks
function fireworks() {
  const end = Date.now() + 3000;
  startLoveAnimation();
  (function frame() {
    confetti({
      particleCount: 8,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4e88", "#ffb6c1", "#fff", "#ff69b4"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Surprise 💌
secretBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  gsap.fromTo(surprise, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 });
});

closeSurprise.addEventListener("click", () => {
  gsap.to(surprise, { opacity: 0, duration: 0.4, onComplete: () => surprise.classList.add("hidden") });
});
