import React, { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, PawPrint, Lock, Unlock, Sparkles, ChevronDown, Star, Mail, Flower2 } from "lucide-react";


const personConfig = {
  rita: {
    displayName: "Рита",
    certificate: "/certificate/rita.pdf",
  },
  ksyusha: {
    displayName: "Ксюша",
    certificate: "/certificate/ksyusha.pdf",
  },
};


const compliments = [
  "Ты делаешь нашу группу теплее и уютнее.",
  "Пусть этой весной у тебя будет много радости и лёгкости.",
  "Ты правда делаешь обычные дни красивее.",
  "Пусть у тебя всё получается именно так, как хочется.",
  "Твоя улыбка — уже маленький праздник.",
  "Ты заслуживаешь море приятных моментов и добрых слов.",
  "Пусть 8 марта подарит тебе отличное настроение.",
  "Ты очень классная, и это факт.",
];

const wishes = [
  "Побольше счастливых моментов",
  "Меньше стресса и больше улыбок",
  "Весеннего вдохновения",
  "Любви, радости и тепла",
  "Красивых событий и сюрпризов",
  "Уверенности в себе и лёгкости",
];

const secretCards = [
  { title: "Весенний сюрприз", text: "Этой весной тебя ждёт особенно тёплый и счастливый день." },
  { title: "Сила очарования", text: "Твоя улыбка ещё не раз сделает чей-то день лучше." },
  { title: "Удачный момент", text: "Совсем скоро тебя порадует приятная мелочь, которую ты запомнишь." },
  { title: "Милая магия", text: "Весна принесёт тебе больше лёгкости, красоты и вдохновения." },
  { title: "Тёплое сердце", text: "Рядом с тобой будет всё больше добрых и искренних людей." },
  { title: "Счастливый знак", text: "Очень скоро у тебя появится новый повод улыбаться без причины." },
];

const boysMessages = [
  { name: "Александров Максим Борисович", text: "С 8 Марта! Желаю много радостных моментов, тёплых встреч и отличного настроения." },
  { name: "Антипов Антон Эдуардович", text: "Пусть эта весна будет лёгкой, красивой и наполненной приятными сюрпризами." },
  { name: "Буданов Даниил Дмитриевич", text: "Желаю больше улыбок, вдохновения и ярких событий в каждом дне." },
  { name: "Григорьев Серафим Алексеевич", text: "Пусть рядом всегда будут хорошие люди, поддержка и душевное тепло." },
  { name: "Дунаев Никита Николаевич", text: "Пусть всё задуманное получается, а настроение каждый день будет солнечным." },
  { name: "Елагин Кирилл Петрович", text: "С праздником! Желаю счастья, гармонии и побольше поводов для радости." },
  { name: "Ершов Григорий Евгеньевич", text: "Пусть весна приносит только хорошие новости, вдохновение и приятные эмоции." },
  { name: "Ефимов Николай Васильевич", text: "Желаю лёгкости в делах, уверенности в себе и прекрасного весеннего настроения." },
  { name: "Ибрагимов Булат Илдарович", text: "Пусть каждый день дарит улыбки, уют и маленькие чудеса." },
  { name: "Иванов Денис Евгеньевич", text: "С 8 Марта! Пусть в жизни будет больше радости, красоты и счастливых моментов." },
  { name: "Кошкин Егор Валерьевич", text: "Желаю тепла, добра и исполнения самых светлых желаний." },
  { name: "Михайлов Павел Андреевич", text: "Пусть весна вдохновляет, а рядом всегда будут забота и поддержка." },
  { name: "Мурзаев Руслан Иванович", text: "Желаю яркой весны, душевного уюта и много-много поводов улыбаться." },
  { name: "Никандров Иван Александрович", text: "Пусть каждый день будет наполнен радостью, лёгкостью и приятными впечатлениями." },
  { name: "Никитин Эдуард Анатольевич", text: "С праздником! Желаю счастья, гармонии и неизменно хорошего настроения." },
  { name: "Николаев Павел Леонидович", text: "Пусть весна приносит вдохновение, красоту и только добрые события." },
  { name: "Прохоров Михаил Сергеевич", text: "Желаю, чтобы рядом всегда были любимые люди, тепло и поддержка." },
  { name: "Славин Игорь Вячеславович", text: "Пусть каждый день будет ярким, спокойным и по-настоящему счастливым." },
  { name: "Смертин Борис Дмитриевич", text: "С 8 Марта! Желаю побольше радости, улыбок и приятных сюрпризов." },
  { name: "Суварский Давид Евгеньевич", text: "Пусть этой весной всё складывается легко и красиво, как хочется." },
  { name: "Шишкин Кирилл Евгеньевич", text: "Желаю тепла в сердце, гармонии в душе и много счастливых дней." },
  { name: "Яковлев Никита Сергеевич", text: "Пусть весна будет наполнена вдохновением, любовью и светлыми моментами." },
  { name: "Яранцев Никита Анатольевич", text: "С праздником! Пусть каждый день дарит радость, уверенность и улыбки." },
];

const moodCards = [
  { emoji: "🌷", title: "Нежность", text: "Пусть весна будет мягкой и уютной." },
  { emoji: "🌞", title: "Солнечность", text: "Пусть каждый день начинается с хорошего настроения." },
  { emoji: "💌", title: "Тепло", text: "Пусть рядом будут любимые и важные люди." },
  { emoji: "✨", title: "Вдохновение", text: "Пусть хочется мечтать, творить и пробовать новое." },
];

const quizQuestions = [
  {
    question: "Какой подарок делает день лучше?",
    answers: ["Милый сюрприз", "Цветы и открытка", "Объятия и добрые слова"],
  },
  {
    question: "Что ближе тебе по вайбу весны?",
    answers: ["Нежность", "Солнечность", "Магия"],
  },
  {
    question: "Что хочется почувствовать этой весной?",
    answers: ["Лёгкость", "Счастье", "Вдохновение"],
  },
];

function deterministicRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function getRandomFlyingHeartPosition(id = 1) {
  return {
    x: 10 + Math.random() * 75,
    y: 10 + Math.random() * 70,
    id,
  };
}

const initialFlyingHeart = getRandomFlyingHeartPosition(1);

function formatSurnameWithInitials(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;

  const [surname, firstName = "", middleName = ""] = parts;
  const initials = [firstName, middleName]
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}.`)
    .join("");

  return `${surname} ${initials}`.trim();
}

function FloatingSticker({ children, className = "" }) {
  return (
    <Motion.div
      className={className}
      animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </Motion.div>
  );
}

function RevealSection({ children, delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </Motion.div>
  );
}

function ParticleBurst({ particles = [] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
      {particles.map((particle) => (
        <Motion.div
          key={particle.id}
          initial={{ opacity: 1, scale: 0.8, x: particle.startX, y: particle.startY }}
          animate={{ opacity: 0, scale: 1.2, x: particle.startX + particle.dx, y: particle.startY + particle.dy, rotate: particle.rotate }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute text-xl"
        >
          {particle.symbol}
        </Motion.div>
      ))}
    </div>
  );
}

function BackgroundParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5) % 90}%`,
    top: `${(i * 13) % 95}%`,
    duration: 8 + (i % 5),
    delay: (i % 7) * 0.4,
    symbol: ["💖", "✨", "🌸", "☃️", "🐾"][i % 5],
    size: 14 + (i % 4) * 6,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60">
      {particles.map((p) => (
        <Motion.div
          key={p.id}
          className="absolute"
          style={{ left: p.left, top: p.top, fontSize: p.size }}
          animate={{ y: [0, -18, 0], x: [0, 8, -6, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.symbol}
        </Motion.div>
      ))}
    </div>
  );
}

function MiniConfetti({ show }) {
  if (!show) return null;
  const items = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${deterministicRandom(i + 1) * 100}%`,
    symbol: ["💖", "✨", "🌸", "⭐", "🎀"][i % 5],
    rotate: deterministicRandom(i + 101) * 160 - 80,
    x: deterministicRandom(i + 201) * 80 - 40,
    duration: 1.8 + deterministicRandom(i + 301) * 1.2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
      {items.map((item) => (
        <Motion.div
          key={item.id}
          className="absolute top-0 text-2xl"
          style={{ left: item.left }}
          initial={{ opacity: 1, y: -10, x: 0, rotate: 0 }}
          animate={{ opacity: 0, y: 280, x: item.x, rotate: item.rotate }}
          transition={{ duration: item.duration, ease: "easeOut" }}
        >
          {item.symbol}
        </Motion.div>
      ))}
    </div>
  );
}

export default function March8GreetingPage() {

  const [personKey] = useState(() => {
    if (typeof window === "undefined") return "rita";
    const params = new URLSearchParams(window.location.search);
    const person = params.get("person");
    return person && personConfig[person] ? person : "rita";
  });

  const currentPerson = personConfig[personKey];


  const [compliment, setCompliment] = useState(compliments[0]);
  const [heartsFound, setHeartsFound] = useState([]);
  const [petted, setPetted] = useState(0);
  const [wish, setWish] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [secretCard, setSecretCard] = useState(null);
  const [secretFlipped, setSecretFlipped] = useState(false);
  const [catHearts, setCatHearts] = useState([]);
  const [burstParticles, setBurstParticles] = useState([]);
  const [pageParticles, setPageParticles] = useState([]);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [caughtFlying, setCaughtFlying] = useState(0);
  const [flyingHeart, setFlyingHeart] = useState(initialFlyingHeart);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const interactedEnough = useMemo(() => {
    return heartsFound.length >= 3 && petted >= 5 && Boolean(wish) && selectedMood !== null && secretFlipped && envelopeOpened && caughtFlying >= 3 && quizAnswers.length === 3;
  }, [heartsFound, petted, wish, selectedMood, secretFlipped, envelopeOpened, caughtFlying, quizAnswers]);

  const unlocked = scrolledToEnd && interactedEnough;
  const confetti = unlocked;

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = scrollTop / docHeight;
      setScrolledToEnd(progress > 0.9);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlyingHeart((prev) => getRandomFlyingHeartPosition(prev.id + 1));
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const revealCompliment = () => {
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(random);
  };

  const catchHeart = (id) => {
    if (!heartsFound.includes(id)) {
      setHeartsFound((prev) => [...prev, id]);
    }
  };

  const spawnParticles = (setter, symbols = ["💖", "✨", "🌸"]) => {
    const arr = Array.from({ length: 10 }, (_, i) => ({
      id: `${Date.now()}-${Math.random()}-${i}`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      startX: 180,
      startY: 160,
      dx: Math.random() * 220 - 110,
      dy: Math.random() * 180 - 90,
      rotate: Math.random() * 120 - 60,
    }));
    setter(arr);
    setTimeout(() => setter([]), 1000);
  };

  const petCat = () => {
    setPetted((prev) => prev + 1);
    revealCompliment();
    const id = `${Date.now()}-${Math.random()}`;
    const heart = {
      id,
      left: `${40 + Math.random() * 20}%`,
      size: 18 + Math.random() * 18,
      duration: 1.8 + Math.random() * 0.8,
    };
    setCatHearts((prev) => [...prev, heart]);
    setTimeout(() => {
      setCatHearts((prev) => prev.filter((item) => item.id !== id));
    }, 2600);
  };

  const revealWish = () => {
    const random = wishes[Math.floor(Math.random() * wishes.length)];
    setWish(random);
    spawnParticles(setBurstParticles, ["✨", "💌", "🌷"]);
  };

  const revealSecretCard = () => {
    setSecretFlipped(false);
    setSecretCard(null);
    setTimeout(() => {
      const random = secretCards[Math.floor(Math.random() * secretCards.length)];
      setSecretCard(random);
      setSecretFlipped(true);
      spawnParticles(setPageParticles, ["💖", "🌸", "⭐", "✨"]);
    }, 650);
  };

  const catchFlyingHeart = () => {
    setCaughtFlying((prev) => Math.min(prev + 1, 3));
    spawnParticles(setPageParticles, ["💖", "✨", "🌸"]);
    setFlyingHeart((prev) => getRandomFlyingHeartPosition(prev.id + 1));
  };

  const answerQuiz = (answer) => {
    if (quizStep >= quizQuestions.length) return;
    const next = [...quizAnswers, answer];
    setQuizAnswers(next);
    setQuizStep((prev) => Math.min(prev + 1, quizQuestions.length));
    spawnParticles(setBurstParticles, ["✨", "⭐", "💖"]);
  };

  const quizResult = useMemo(() => {
    if (quizAnswers.length < 3) return "";
    const joined = quizAnswers.join(" ");
    if (joined.includes("Нежность") || joined.includes("объятия")) return "Ты нежная весна 🌷";
    if (joined.includes("Солнечность") || joined.includes("Цветы")) return "Ты солнечная весна 🌞";
    return "Ты волшебная весна ✨";
  }, [quizAnswers]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fff7fb] text-[#7b5268]">
      <BackgroundParticles />

      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-semibold tracking-wide text-[#d26c9d]">8 марта ✿</div>
          <div className="text-sm text-[#9f7f90]">
            {unlocked ? "Подарок открыт ✨" : "Подарок откроется в конце страницы"}
          </div>
        </div>
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pb-16 pt-28 md:px-6">
        <FloatingSticker className="absolute left-6 top-28 hidden md:block">
          <div className="rounded-full bg-[#ffd8ea] p-4 shadow-sm"><Heart className="h-6 w-6 text-[#e56495]" /></div>
        </FloatingSticker>
        <FloatingSticker className="absolute right-10 top-36 hidden md:block">
          <div className="rounded-full bg-[#dff2ff] p-4 shadow-sm"><Sparkles className="h-6 w-6 text-[#6aa8d9]" /></div>
        </FloatingSticker>
        <FloatingSticker className="absolute right-20 bottom-20 hidden md:block">
          <div className="rounded-full bg-[#f7ebff] p-4 shadow-sm"><Flower2 className="h-6 w-6 text-[#b58be0]" /></div>
        </FloatingSticker>

        <div className="grid items-center gap-6 md:grid-cols-2">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[36px] border border-white bg-[#ffdce9] p-8 shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm text-[#d26c9d] shadow-sm">
              персональное поздравление для {currentPerson.displayName} ✨
            </div>
            <h1 className="text-4xl font-black uppercase leading-tight text-[#cf3d74] md:text-6xl">
              {currentPerson.displayName},
              <br />
              с 8 Марта 💖
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#9a617b]">
  {currentPerson.displayName}, эта страничка сделана специально для тебя:
  с весенним настроением, котиками, милыми анимациями, маленькими сюрпризами
  и подарком в самом конце.
</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#interactive" className="rounded-full bg-white px-6 py-3 font-semibold text-[#cf3d74] shadow-sm transition hover:-translate-y-0.5">
                Начать ✿
              </a>
              <a href="#gift" className="rounded-full border border-white/80 px-6 py-3 font-semibold text-[#cf3d74] transition hover:bg-white/40">
                Где подарок?
              </a>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-[36px] bg-[#dff2ff] p-4 shadow-lg"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-white p-4">
              <img
                src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80"
                alt="Милый котик"
                className="h-[420px] w-full rounded-[22px] object-cover"
              />
              <div className="absolute inset-6 rounded-[24px] border-4 border-white/80" />
              <Motion.div className="absolute right-6 top-6 rounded-full bg-[#fff1f7] px-3 py-2 text-sm font-semibold text-[#cf3d74] shadow-sm" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                котики + весна + поздравления
              </Motion.div>
            </div>
          </Motion.div>
        </div>

        <div className="mt-8 flex justify-center text-[#d26c9d]">
          <Motion.a href="#letter" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="flex flex-col items-center gap-2 text-sm">
            <span>листай вниз</span>
            <ChevronDown className="h-5 w-5" />
          </Motion.a>
        </div>
      </section>

      <section id="letter" className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6">
        <RevealSection>
          <div className="rounded-[34px] bg-white p-8 shadow-md">
            <div className="mb-4 inline-flex rounded-full bg-[#f2e6ff] px-4 py-2 text-sm text-[#9a74c6]">письмо для вас</div>
            <h2 className="text-3xl font-bold text-[#cf3d74]">Немного тёплых слов</h2>
            <p className="mt-5 text-lg leading-8 text-[#8d687a]">
              Поздравляем вас с 8 Марта! Спасибо вам за красоту, доброту, атмосферу, поддержку и настроение, которое вы приносите даже в самые обычные учебные дни. Пусть у вас будет много счастья, спокойствия, вдохновения, улыбок и только хороших людей рядом.
            </p>
          </div>
        </RevealSection>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6">
        <RevealSection>
          <div className="grid gap-5 md:grid-cols-3">
            {["Вы делаете группу уютнее", "С вами в группе теплее и веселее", "Вы реально украшаете каждый день"].map((item) => (
              <Motion.div key={item} whileHover={{ y: -6, rotate: -1 }} className="rounded-[28px] bg-[#ffeef5] p-6 shadow-sm">
                <Star className="mb-3 h-6 w-6 text-[#f08bb4]" />
                <p className="text-lg font-semibold text-[#b05580]">{item}</p>
              </Motion.div>
            ))}
          </div>
        </RevealSection>
      </section>

      <section id="interactive" className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6">
        <RevealSection>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex rounded-full bg-[#dff2ff] px-4 py-2 text-sm text-[#5f9ccc]">праздничные сюрпризы</div>
              <h2 className="mt-3 text-3xl font-bold text-[#cf3d74]">Немного весенней магии перед подарком</h2>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-sm shadow-sm text-[#9f7f90]">
              Выполнено: {Number(heartsFound.length >= 3) + Number(petted >= 5) + Number(Boolean(wish)) + Number(selectedMood !== null) + Number(secretFlipped) + Number(envelopeOpened) + Number(caughtFlying >= 3) + Number(quizAnswers.length === 3)}/8
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] bg-[#fff1f7] p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2 text-[#cf3d74]"><PawPrint className="h-5 w-5" /> Нажми на котика 5 раз</div>
              <button onClick={petCat} className="group relative w-full overflow-hidden rounded-[28px] bg-white p-4 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=80"
                  alt="Котик для комплиментов"
                  className="h-72 w-full rounded-[22px] object-cover transition duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute left-5 top-5 rounded-full bg-[#ffdce9] px-4 py-2 text-sm font-semibold text-[#cf3d74] shadow-sm">погладь котика</div>
                {catHearts.map((heart) => (
                  <Motion.div
                    key={heart.id}
                    initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -150, scale: 1.2 }}
                    transition={{ duration: heart.duration, ease: "easeOut" }}
                    className="absolute"
                    style={{ left: heart.left, bottom: "20%", fontSize: heart.size }}
                  >
                    💖
                  </Motion.div>
                ))}
                {petted >= 5 && (
                  <Motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute bottom-5 right-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#cf3d74] shadow-sm">
                    котик доволен ✨
                  </Motion.div>
                )}
              </button>
              <div className="mt-4 rounded-[24px] bg-white p-5 text-[#9a617b] shadow-sm">
                <div className="mb-2 text-sm text-[#cf3d74]">Комплимент:</div>
                <p className="text-lg font-medium">{compliment}</p>
                <p className="mt-3 text-sm">Поглажено: {petted}/5</p>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#eef8ff] p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2 text-[#6aa8d9]"><Heart className="h-5 w-5" /> Найди 3 сердечка</div>
              <div className="relative h-[360px] rounded-[28px] bg-white p-4 shadow-sm">
                <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,_#ffe4f0,_transparent_35%),radial-gradient(circle_at_bottom_right,_#dff2ff,_transparent_35%)]" />
                {[
                  { id: 1, top: "15%", left: "18%" },
                  { id: 2, top: "55%", left: "70%" },
                  { id: 3, top: "72%", left: "28%" },
                ].map((heart) => (
                  <Motion.button
                    key={heart.id}
                    animate={heartsFound.includes(heart.id) ? { scale: 1.2, opacity: 0.35 } : { scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: heartsFound.includes(heart.id) ? 0 : Infinity }}
                    onClick={() => catchHeart(heart.id)}
                    className="absolute"
                    style={{ top: heart.top, left: heart.left }}
                  >
                    <Heart className="h-8 w-8 fill-[#ff8db6] text-[#ff8db6] drop-shadow" />
                  </Motion.button>
                ))}
                <div className="absolute bottom-4 left-4 rounded-full bg-[#fff1f7] px-4 py-2 text-sm text-[#cf3d74] shadow-sm">
                  Найдено: {heartsFound.length}/3
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#f6efff] p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2 text-[#9a74c6]"><Gift className="h-5 w-5" /> Открой пожелание</div>
              <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-sm">
                <button onClick={revealWish} className="rounded-full bg-[#cfb7ff] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5">
                  Получить пожелание
                </button>
                <div className="mt-5 flex min-h-[88px] items-center rounded-[20px] bg-[#fcf8ff] p-5 text-lg text-[#8d68ab]">
                  {wish || "Нажми на кнопку, чтобы открыть маленькое пожелание ✨"}
                </div>
                <ParticleBurst particles={burstParticles} />
              </div>
            </div>

            <div className="rounded-[32px] bg-[#fff6ea] p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2 text-[#d79d56]"><Sparkles className="h-5 w-5" /> Выбери настроение на 8 марта</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {moodCards.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => setSelectedMood(index)}
                    className={`rounded-[24px] p-5 text-left shadow-sm transition ${selectedMood === index ? "bg-[#ffd8ea] ring-2 ring-[#f59abc]" : "bg-white hover:-translate-y-1"}`}
                  >
                    <div className="text-3xl">{item.emoji}</div>
                    <div className="mt-3 font-semibold text-[#b66b4d]">{item.title}</div>
                    <p className="mt-2 text-sm text-[#9e7b64]">{item.text}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={0.05}>
          <div className="mt-6 rounded-[32px] bg-[#fff0f6] p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2 text-[#cf3d74]"><Sparkles className="h-5 w-5" /> Тайная карта-предсказание</div>
            <div className="grid items-center gap-6 md:grid-cols-[320px,1fr]">
              <div className="relative mx-auto h-[420px] w-[280px] [perspective:1200px]">
                <Motion.button
                  onClick={revealSecretCard}
                  whileTap={{ scale: 0.98 }}
                  animate={{ rotateY: secretFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-full w-full [transform-style:preserve-3d]"
                >
                  <div className="absolute inset-0 rounded-[30px] border-4 border-white bg-gradient-to-br from-[#ffcfe2] via-[#ffe8f1] to-[#dff2ff] p-6 shadow-lg [backface-visibility:hidden]">
                    <div className="flex h-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-white/80 bg-white/30 text-center">
                      <div className="text-6xl">🎀</div>
                      <div className="mt-4 text-2xl font-black uppercase text-[#cf3d74]">Тайная карта</div>
                      <p className="mt-3 max-w-[180px] text-sm text-[#a06d86]">Открой карту и получи тёплое предсказание</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-[30px] border-4 border-white bg-white p-6 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="flex h-full flex-col justify-between rounded-[24px] bg-[#fff7fb] p-5 text-left">
                      <div>
                        <div className="inline-flex rounded-full bg-[#ffe2ef] px-3 py-1 text-sm font-semibold text-[#cf3d74]">для тебя</div>
                        <div className="mt-5 text-2xl font-bold text-[#cf3d74]">{secretCard?.title || "Ожидание..."}</div>
                        <p className="mt-4 leading-7 text-[#8f677a]">{secretCard?.text || "Выбери карту, чтобы открыть предсказание"}</p>
                      </div>
                      <div className="text-sm text-[#c084a3]">Можно открыть ещё одну карту ✨</div>
                    </div>
                  </div>
                </Motion.button>
                <ParticleBurst particles={pageParticles} />
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-[#cf3d74]">Тёплое предсказание</h3>
                <p className="mt-4 leading-7 text-[#8f677a]">
                  Выбери карту и пусть она подарит тебе маленький приятный знак на эту весну.
                </p>
                <div className="mt-5 inline-flex rounded-full bg-[#fff0f6] px-4 py-2 text-sm text-[#cf3d74]">
                  {secretFlipped ? "Предсказание открыто" : "Выбери карту"}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={0.1}>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] bg-[#fff8ec] p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2 text-[#d58d40]"><Heart className="h-5 w-5" /> Поймай летающее сердечко</div>
              <div className="relative h-[280px] overflow-hidden rounded-[28px] bg-white p-4 shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#fff0f6,_transparent_35%),radial-gradient(circle_at_bottom,_#e9f5ff,_transparent_35%)]" />
                <Motion.button
                  key={flyingHeart.id}
                  onClick={catchFlyingHeart}
                  className="absolute text-3xl"
                  animate={{ left: `${flyingHeart.x}%`, top: `${flyingHeart.y}%`, scale: [1, 1.18, 1] }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                >
                  💖
                </Motion.button>
                <div className="absolute bottom-4 left-4 rounded-full bg-[#fff0f6] px-4 py-2 text-sm text-[#cf3d74] shadow-sm">
                  Поймано: {caughtFlying}/3
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#eef7ff] p-6 shadow-md">
              <div className="mb-4 flex items-center gap-2 text-[#6698c7]"><Mail className="h-5 w-5" /> Открой конверт</div>
              <button
                onClick={() => setEnvelopeOpened(true)}
                className="relative mx-auto block h-[280px] w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white p-6 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {!envelopeOpened ? (
                    <Motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-full">
                      <div className="absolute inset-x-0 bottom-0 h-[60%] rounded-b-[24px] bg-[#ffdce9]" />
                      <Motion.div className="absolute inset-x-0 top-[28%] mx-auto h-0 w-0 border-l-[160px] border-r-[160px] border-t-[110px] border-l-transparent border-r-transparent border-t-[#ffc2dc]" animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#c94a81]">Нажми, чтобы открыть письмо 💌</div>
                    </Motion.div>
                  ) : (
                    <Motion.div key="open" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex h-full flex-col justify-center rounded-[20px] bg-[#fff8fb] p-6 text-center">
                      <div className="text-4xl">💌</div>
                      <div className="mt-4 text-2xl font-bold text-[#cf3d74]">Внутри послание</div>
                      <p className="mt-3 leading-7 text-[#8f677a]">Пусть эта весна подарит тебе побольше света, нежности, красивых событий и счастливых моментов.</p>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={0.15}>
          <div className="mt-6 rounded-[32px] bg-[#f2ecff] p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2 text-[#8d6ad7]"><Sparkles className="h-5 w-5" /> Мини-квиз: какой ты весенний вайб?</div>
            <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-sm">
              {quizStep < quizQuestions.length ? (
                <div>
                  <div className="text-sm text-[#a18cbf]">Вопрос {quizStep + 1} из {quizQuestions.length}</div>
                  <h3 className="mt-2 text-2xl font-bold text-[#cf3d74]">{quizQuestions[quizStep].question}</h3>
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {quizQuestions[quizStep].answers.map((answer) => (
                      <button key={answer} onClick={() => answerQuiz(answer)} className="rounded-[22px] bg-[#faf6ff] p-4 text-left text-[#7e648e] transition hover:-translate-y-1 hover:shadow-sm">
                        {answer}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <div className="text-5xl">🌸</div>
                  <div className="mt-4 text-3xl font-black text-[#cf3d74]">{quizResult}</div>
                  <p className="mt-3 text-[#8f677a]">У тебя очень красивый весенний вайб — нежный, милый и запоминающийся.</p>
                </Motion.div>
              )}
              <ParticleBurst particles={burstParticles} />
            </div>
          </div>
        </RevealSection>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-6">
        <RevealSection>
          <div className="rounded-[34px] bg-[#fff] p-8 shadow-md">
            <div className="mb-4 inline-flex rounded-full bg-[#ffe8f2] px-4 py-2 text-sm text-[#cf3d74]">подписи от парней группы</div>
            <h2 className="text-3xl font-bold text-[#cf3d74]">Поздравление в карточках</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {boysMessages.map((msg, idx) => (
                <Motion.div
                  key={msg.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6, rotate: idx % 2 === 0 ? -1 : 1 }}
                  className="rounded-[26px] bg-[#fff4f8] p-5 shadow-sm"
                >
                  <div className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#cf3d74]">{formatSurnameWithInitials(msg.name)}</div>
                  <p className="leading-7 text-[#8f677a]">{msg.text}</p>
                  <div className="mt-4 text-sm text-[#cf86a7]">с теплом и уважением</div>
                </Motion.div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      <section id="gift" className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6">
        <RevealSection>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#ffdce9] via-[#fff6fb] to-[#dff2ff] p-8 shadow-lg">
            <MiniConfetti show={confetti} />
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm text-[#cf3d74] shadow-sm">финал</div>
              <h2 className="text-4xl font-black uppercase text-[#cf3d74]">Подарок ждёт внизу</h2>
              <p className="mt-4 text-lg leading-8 text-[#8f677a]">
                Чтобы открыть сертификат, нужно долистать до конца и пройти все маленькие сюрпризы выше.
              </p>

              <div className="mt-8 rounded-[28px] bg-white/90 p-6 text-left shadow-sm">
                <div className="flex items-center gap-3 text-[#9a617b]">
                  {unlocked ? <Unlock className="h-5 w-5 text-[#5fbf88]" /> : <Lock className="h-5 w-5 text-[#cf3d74]" />}
                  <span className="font-semibold">{unlocked ? "Подарок открыт" : "Подарок пока закрыт"}</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className={`rounded-2xl p-4 ${heartsFound.length >= 3 ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Найти 3 сердечка — {heartsFound.length}/3</div>
                  <div className={`rounded-2xl p-4 ${petted >= 5 ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Погладить котика — {petted}/5</div>
                  <div className={`rounded-2xl p-4 ${wish ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Открыть пожелание — {wish ? "да" : "нет"}</div>
                  <div className={`rounded-2xl p-4 ${selectedMood !== null ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Выбрать настроение — {selectedMood !== null ? "да" : "нет"}</div>
                  <div className={`rounded-2xl p-4 ${secretFlipped ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Открыть тайную карту — {secretFlipped ? "да" : "нет"}</div>
                  <div className={`rounded-2xl p-4 ${envelopeOpened ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Открыть конверт — {envelopeOpened ? "да" : "нет"}</div>
                  <div className={`rounded-2xl p-4 ${caughtFlying >= 3 ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Поймать сердечко — {caughtFlying}/3</div>
                  <div className={`rounded-2xl p-4 ${quizAnswers.length === 3 ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>Пройти мини-квиз — {quizAnswers.length}/3</div>
                </div>
                <div className={`mt-3 rounded-2xl p-4 ${scrolledToEnd ? "bg-[#eafaf1] text-[#3d9965]" : "bg-[#fff4f8] text-[#b15f82]"}`}>
                  Долистать до конца — {scrolledToEnd ? "да" : "ещё нет"}
                </div>
              </div>

              <div className="mt-8">
                <Motion.a
                  href={unlocked ? currentPerson.certificate : undefined}
                  aria-disabled={!unlocked}
                  animate={unlocked ? { scale: [1, 1.04, 1], boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 24px rgba(207,61,116,0.22)", "0 0 0 rgba(0,0,0,0)"] } : {}}
                  transition={{ duration: 1.6, repeat: unlocked ? Infinity : 0 }}
                  className={`inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-semibold shadow-md transition ${unlocked ? "bg-[#cf3d74] text-white hover:-translate-y-0.5" : "cursor-not-allowed bg-white text-[#c5a7b5]"}`}
                >
                  <Gift className="h-5 w-5" />
                  {unlocked ? "Открыть сертификат" : "Подарок откроется после всех заданий"}
                </Motion.a>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}


