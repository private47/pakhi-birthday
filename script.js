document.addEventListener("DOMContentLoaded", () => {
  const passwordModal = document.getElementById("passwordModal")
  const passwordInput = document.getElementById("passwordInput")
  const passwordBtn = document.getElementById("passwordBtn")
  const passwordError = document.getElementById("passwordError")
  const app = document.getElementById("app")

  const CORRECT_PASSWORD = "iloveyoupakhi" // Hardcoded password for fun

  const unlockApp = () => {
    console.log("[v0] Password correct! Unlocking app...")
    passwordModal.classList.add("hidden")
    app.classList.remove("hidden")
  }

  passwordBtn.addEventListener("click", () => {
    console.log("[v0] Password button clicked. Input value:", passwordInput.value)
    if (passwordInput.value === CORRECT_PASSWORD) {
      console.log("[v0] Password matches!")
      passwordError.classList.add("hidden")
      unlockApp()
    } else {
      console.log("[v0] Password incorrect!")
      passwordError.classList.remove("hidden")
      passwordInput.value = ""
      passwordInput.focus()
    }
  })

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.log("[v0] Enter key pressed")
      passwordBtn.click()
    }
  })

  const screens = {
    intro: document.getElementById("intro"),
    quiz: document.getElementById("quiz"),
    memories: document.getElementById("memories"),
    final: document.getElementById("final"),
  }
  const bgMusic = document.getElementById("bg-music")

  const startBtn = document.getElementById("startBtn")
  const questionBox = document.getElementById("question-box")
  const questionEl = document.getElementById("question")
  const optionsEl = document.getElementById("options")
  const nextQBtn = document.getElementById("nextQBtn")
  const memoryPhoto = document.getElementById("memory-photo")
  const memoryCaption = document.getElementById("memory-caption")
  const nextMemoryBtn = document.getElementById("nextMemory")
  const replayBtn = document.getElementById("replayBtn")
  const celebrateBtn = document.getElementById("celebrateBtn")
  const loveContainer = document.getElementById("love-animation")
  const secretBtn = document.getElementById("secretBtn")
  const surpriseOverlay = document.getElementById("surpriseOverlay")
  const closeSurprise = document.getElementById("closeSurprise")

  const quizData = [
  { q: "Ke age somporker haat bariye6e? 🙂‍↔️", options: ["Tui", "Ami", "Destiny 🤭"], answer: "Destiny 🤭", correctMsg: "Akdm thikkkk 💕", wrongMsg: "Tui/Ami er thekeo eta destiny amader, tai vul answer 🥹" },
  { q: "Amar favourite khabar bol 😤", options: ["Biriyani", "chinese", "Jeta tr vlo lage setai 🤭"], answer: "Jeta tr vlo lage setai 🤭", correctMsg: "Good boy, akdm thikkkk 😋", wrongMsg: "6iiii eta vul blliii 😤" },
  { q: "Amar kon genre er movie sb theke vlo lge 😤", options: ["Crime/Thriller", "Romantic/Comedy", "Action and Action"], answer: "Crime/Thriller", correctMsg: "Good, eta vul bolte paris e naa jnii 🥹", wrongMsg: "I66e kore vul option press kre dkh6is nki 😒" },
  { q: "Ebar bol ami kon deshe ghurte jete chai 😤", options: ["USA", "Japan/Korea", "Greece"], answer: "Greece", correctMsg: "Andaje thik bole6e 😤", wrongMsg: "Jantam eta tui janis naa 🤭" },
  { q: "Amra ki adou konodin movie dkhte jbo cinema hall a? 😤", options: ["Noooo", "Yessss", "Etar third option nei 😤"], answer: "Yessss", correctMsg: "Thle kbe jbo date ta bll 😤", wrongMsg: "Jbo na kno haaa 😤" }
];

  const memories = [
    { photo: "images/1.jpg", caption: "Amader 2jon er first selfie 2016 end a 😌" },
    { photo: "images/2.jpg", caption: "First vodro vbe pic tule6ili amr sthe 🥹" },
    { photo: "images/3.jpg", caption: "Mone a6e to etaa first aksthe kheye6ilmm esbb 🤭" },
    { photo: "images/4.jpg", caption: "First Saraswati pujoy berono 🤭 but not as a couple, as a best friend 🤭" },
    { photo: "images/5.jpg", caption: "First aksthe dhakuria jayoyaa 💖" },
    { photo: "images/6.jpg", caption: "khb pochondoder 6obi tai dilam etaa 🤭" },
    { photo: "images/7.jpg", caption: "First chumu diye pic tule6ili 🥹" },
    { photo: "images/8.jpg", caption: "Puro lockdown evbe vcall a kete6ilo 🥹" },
    { photo: "images/9.jpg", caption: "Lockdown er por first dekha 🥹" },
    { photo: "images/10.jpg", caption: "Mone a6e to eta🤭 first tr bari te🤭" },
    { photo: "images/11.jpg", caption: "First durga pujo te berono aksthe 🥹❤️" },
    { photo: "images/12.jpg", caption: "First and last( er por mone hyna ge6i aar🤔) princep ghat a jayoya 🤭" },
    { photo: "images/13.jpg", caption: "First bike a uthiye6ilm tke 🥹🥹" },
    { photo: "images/14.jpg", caption: "First Saraswati pujo te berono as a couple 🤭❤️" },
    { photo: "images/15.jpg", caption: "Tke chumu kheye pic kom a6e, tai eta dilm 🥹🤭" },
    { photo: "images/16.jpg", caption: "Mone a6e to eta kothay aar ki ki hye6ilo 🤭🤭🤭" },
    { photo: "images/17.jpg", caption: "Bristi te kom e berono hy, eta sundor besh 🤭" },
    { photo: "images/18.jpg", caption: "Ei jama tai vule ge6ili jetay atto sundor akta pic a6e amader 😤❤️" },
    { photo: "images/19.jpg", caption: "Oneeek lomba jhograr por dekha hye6ilo, mone a6e trr 😤😤" },
    { photo: "images/20.jpg", caption: "Atto lomba journey er por amader last ghora kalipujoy ❤️😌 many more decades to go!" },
  ];

  let quizIndex = 0
  let memoryIndex = 0

  const showScreen = (name) => {
    Object.values(screens).forEach((s) => s.classList.add("hidden"))
    screens[name].classList.remove("hidden")
  }

  const fadeInElement = (el) => {
    window.gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" })
  }

  const tw = document.querySelector(".typewriter")
  tw?.addEventListener("animationend", (e) => {
    if (e.animationName === "typing") {
      tw.style.borderRight = "none"
      window.gsap.to(startBtn, { opacity: 1, duration: 1, delay: 0.4 })
    }
  })

  startBtn.addEventListener("click", () => {
    bgMusic?.play().catch(() => {})
    showScreen("quiz")
    fadeInElement(questionBox)
    loadQuestion()
  })

  const loadQuestion = () => {
    nextQBtn.classList.add("hidden")
    if (quizIndex >= quizData.length) return showScreen("memories"), showMemory()
    const q = quizData[quizIndex]
    questionEl.textContent = q.q
    optionsEl.innerHTML = ""
    fadeInElement(questionBox)
    q.options.forEach((opt) => {
      const btn = document.createElement("button")
      btn.textContent = opt
      btn.onclick = () => handleAnswer(btn, opt === q.answer, q)
      optionsEl.appendChild(btn)
    })
  }

  const handleAnswer = (btn, correct, q) => {
    btn.classList.add(correct ? "correct" : "wrong")
    btn.textContent = correct ? q.correctMsg : q.wrongMsg
    if (correct) window.confetti({ particleCount: 40, spread: 80, origin: { y: 0.7 } })
    optionsEl.querySelectorAll("button").forEach((b) => (b.disabled = true))
    nextQBtn.classList.remove("hidden")
  }

  nextQBtn.addEventListener("click", () => {
    quizIndex++
    loadQuestion()
  })

  const showMemory = () => {
    if (memoryIndex >= memories.length) return showScreen("final"), fireworks()
    const current = memories[memoryIndex]

    const loadingSpinner = document.getElementById("loadingSpinner")
    loadingSpinner.classList.remove("hidden")
    memoryPhoto.style.opacity = "0"

    const img = new Image()
    img.onload = () => {
      memoryPhoto.src = current.photo
      memoryCaption.textContent = current.caption
      loadingSpinner.classList.add("hidden")
      fadeInElement(memoryPhoto)
      fadeInElement(memoryCaption)
    }
    img.src = current.photo
  }

  nextMemoryBtn.addEventListener("click", () => {
    memoryIndex++
    showMemory()
  })

  replayBtn.addEventListener("click", () => {
    quizIndex = 0
    memoryIndex = 0
    showScreen("intro")
  })
  celebrateBtn.addEventListener("click", () => fireworks())

  const startLoveAnimation = () => {
    setInterval(() => {
      const span = document.createElement("span")
      span.classList.add("love")
      span.textContent = Math.random() > 0.5 ? "❤️" : "💖"
      span.style.left = Math.random() * 100 + "vw"
      span.style.animationDuration = 4 + Math.random() * 3 + "s"
      loveContainer.appendChild(span)
      setTimeout(() => span.remove(), 7000)
    }, 400)
  }

  const fireworks = () => {
    const end = Date.now() + 3000
    startLoveAnimation()
    ;(function frame() {
      window.confetti({
        particleCount: 8,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff4e88", "#ffb6c1", "#fff", "#ff69b4"],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  secretBtn.addEventListener("click", () => {
    surpriseOverlay.classList.remove("hidden")
    window.gsap.fromTo("#surpriseBox", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 })
  })
  closeSurprise.addEventListener("click", () => {
    window.gsap.to("#surpriseBox", {
      opacity: 0,
      duration: 0.25,
      onComplete: () => surpriseOverlay.classList.add("hidden"),
    })
  })

  showScreen("intro")
})
