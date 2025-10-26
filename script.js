const screens = {
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  reasons: document.getElementById("reasons"),
  final: document.getElementById("final"),
};
const bgMusic = document.getElementById("bg-music");

const startBtn = document.getElementById("startBtn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const reasonText = document.getElementById("reason-text");
const nextReasonBtn = document.getElementById("nextReason");
const replayBtn = document.getElementById("replayBtn");
const celebrateBtn = document.getElementById("celebrateBtn");
const loveContainer = document.getElementById("love-animation");

const quizData = [
  {
    q: "Who made the first move? 😏",
    options: ["You did", "I did", "The Universe did"],
    answer: "You did",
    reaction: "Correct! You started the chaos 💕",
  },
  {
    q: "My go-to snack during movie night?",
    options: ["Popcorn", "Fries", "Your leftover pizza 🍕"],
    answer: "Your leftover pizza 🍕",
    reaction: "Hehe... I knew you'd pick that one 😂",
  },
  {
    q: "What’s my most iconic line?",
    options: ["‘I’m not mad but…’", "‘Can you bring food?’", "‘Leave me alone!’"],
    answer: "‘Can you bring food?’",
    reaction: "Obviously! You and food are soulmates 😋",
  },
  {
    q: "If we were a movie, what genre would it be?",
    options: ["Rom-Com", "Drama", "Stand-up Comedy"],
    answer: "Rom-Com",
    reaction: "Exactly! Romantic... with *occasional chaos* 💞",
  },
];

const reasons = [
  "You turn boring days into meme-worthy adventures 😂",
  "You’re my favorite person to annoy and then hug ❤️",
  "You have the world’s cutest ‘angry face’ 😡→😊",
  "You can’t cook without dancing (and burning toast).",
  "You laugh at your own jokes — and I still laugh too.",
  "You made friendship turn into magic 💫",
  "You roast me but also defend me like a bodyguard 🛡️",
  "You have a PhD in ‘being dramatic’ — and I love it!",
  "You think you’re always right… and annoyingly, you are 😏",
  "You send voice notes that could be full albums 🎶",
  "You make every photo better just by being in it 📸",
  "You’re part chaos, part peace, 100% mine 💕",
  "You talk like a stand-up comedian at 2 AM.",
  "You still give me butterflies after 6 years 🦋",
  "You can make me smile mid-fight — witchcraft!",
  "You always remember tiny things that matter big.",
  "You eat my fries but never my patience 🍟😂",
  "You know me better than Google or ChatGPT 😅",
  "You always make the last bite the tastiest.",
  "You make ‘doing nothing’ feel special.",
  "You’re the playlist I never skip 🎧",
  "You’re my default emergency contact — emotionally & otherwise.",
  "You somehow make sarcasm sound like poetry.",
  "You’re weirdly perfect and perfectly weird 💖",
  "You make me believe in love stories again.",
  "You’re my best friend, my favorite headache, my Pakhi 💞",
  "And finally — you’re my home 💫",
];

let quizIndex = 0;
let reasonIndex = 0;

startBtn.addEventListener("click", () => {
  bgMusic.play();
  showScreen("quiz");
  loadQuestion();
});

function showScreen(screenName) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  screens[screenName].classList.remove("hidden");
}

function loadQuestion() {
  if (quizIndex >= quizData.length) {
    showScreen("reasons");
    showReason();
    return;
  }
  const current = quizData[quizIndex];
  questionEl.textContent = current.q;
  optionsEl.innerHTML = "";
  current.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt === current.answer, current.reaction);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(correct, reaction) {
  const msg = document.createElement("p");
  msg.textContent = correct ? reaction : "Haha wrong 😜 but I still love you!";
  optionsEl.innerHTML = "";
  optionsEl.appendChild(msg);
  setTimeout(() => {
    quizIndex++;
    loadQuestion();
  }, 2000);
}

function showReason() {
  if (reasonIndex >= reasons.length) {
    showScreen("final");
    fireworks();
    return;
  }
  reasonText.textContent = reasons[reasonIndex];
  gsap.fromTo(reasonText, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
}

nextReasonBtn.addEventListener("click", () => {
  reasonIndex++;
  showReason();
});

replayBtn.addEventListener("click", () => {
  quizIndex = 0;
  reasonIndex = 0;
  showScreen("intro");
});

function startLoveAnimation() {
  setInterval(() => {
    const span = document.createElement("span");
    span.classList.add("love");
    span.textContent = Math.random() > 0.5 ? "❤️" : "💖";
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 4 + Math.random() * 3 + "s";
    loveContainer.appendChild(span);
    setTimeout(() => span.remove(), 7000);
  }, 300);
}

function fireworks() {
  const duration = 4000;
  const end = Date.now() + duration;
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

celebrateBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 80,
        startVelocity: 40,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#ff4e88", "#ffd6e0", "#ff69b4", "#fff"],
      });
    }, i * 200);
  }
});
