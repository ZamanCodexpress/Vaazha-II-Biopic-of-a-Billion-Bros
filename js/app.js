// actors list for the marquee
const actors = [
  "Aju Varghese",
  "Alphonse Puthren",
  "Ameen",
  "Amith Mohan Rajeswari",
  "Anu",
  "Anuraj O B",
  "Arun A Kumar",
  "Biju Kuttan",
  "Devaraj T R",
  "Joemon Jyothir",
  "Nibraz Noushad",
  "Nihal Nizam",
  "Saaf",
  "Sabari D R",
  "Sabir S",
  "Shahubas",
  "Siju Sunny",
  "Sreenath Ps",
  "Sudheesh",
  "Veda Shankar",
  "Vijay Babu",
  "Vinod Kedamangalam",
];

// smooth scroll setup
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  lerp: 0.1, // added for extra stability
});

// sync scroll triggers
lenis.on("scroll", ScrollTrigger.update);

// buttery smooth sync loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ensure gsap uses the same timing
gsap.ticker.lagSmoothing(0);

// fill the marquee track
const actorsTrack = document.getElementById("actors-track");
if (actorsTrack) {
  const allActors = [...actors, ...actors, ...actors];
  allActors.forEach((actor) => {
    const box = document.createElement("div");
    box.className = "actor-box";
    box.innerHTML = `
            <img src="assets/Actors/${actor}.jpg" alt="${actor}" loading="lazy">
            <p>${actor}</p>
        `;
    actorsTrack.appendChild(box);
  });
}

// start animations when ready
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- Hero Section ---
  const heroTl = gsap.timeline();
  heroTl
    .from(".hero-poster", {
      y: 100,
      opacity: 0,
      rotationX: 45,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out",
    })
    .to(
      ".hero-title-container",
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
      },
      "-=1",
    )
    .to(
      ".scroll-indicator",
      {
        opacity: 1,
        duration: 1,
      },
      "-=0.5",
    );

  // hero parallax
  gsap.to("#poster-1", {
    y: -300,
    scale: 1.1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to("#poster-2", {
    y: -150,
    x: -200,
    rotationZ: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to("#poster-3", {
    y: -150,
    x: 200,
    rotationZ: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(".hero-title-container", {
    y: 200,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // --- About Section ---
  gsap.to(".about-image-wrapper", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 70%",
    },
  });

  gsap.to(".about-image", {
    y: 50,
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".about-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".about-line", {
    y: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-text-wrapper",
      start: "top 75%",
    },
  });

  // --- Trailer Section ---
  gsap.to(".trailer-container", {
    scale: 1,
    boxShadow: "0 40px 100px rgba(255,184,0,0.3)",
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".trailer-section",
      start: "top 80%",
      end: "center center",
      scrub: 1,
    },
  });

  // --- Cast Section ---
  gsap.to(".cast-card", {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".cast-section",
      start: "top 60%",
    },
  });

  // endless marquee logic
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carouselWrapper = document.getElementById("carousel-wrapper");
  const track = document.querySelector(".marquee-track");

  if (prevBtn && nextBtn && carouselWrapper && track) {
    let currentX = 0;
    let targetX = 0;
    let isHovering = false;

    const boxes = document.querySelectorAll(".actor-box");
    const loopWidth =
      boxes.length > actors.length
        ? boxes[actors.length].offsetLeft - boxes[0].offsetLeft
        : 5060;

    gsap.ticker.add(() => {
      if (!isHovering) {
        targetX -= 1;
      }

      if (targetX <= -loopWidth) {
        targetX += loopWidth;
        currentX += loopWidth;
      } else if (targetX > 0) {
        targetX -= loopWidth;
        currentX -= loopWidth;
      }

      currentX += (targetX - currentX) * 0.1;
      gsap.set(track, { x: currentX });
    });

    prevBtn.addEventListener("click", () => {
      targetX += 450;
    });
    nextBtn.addEventListener("click", () => {
      targetX -= 450;
    });

    carouselWrapper.addEventListener("mouseenter", () => (isHovering = true));
    carouselWrapper.addEventListener("mouseleave", () => (isHovering = false));
  }

  // --- Crew Section ---
  gsap.to(".crew-card", {
    opacity: 1,
    scale: 1,
    stagger: 0.3,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".crew-section",
      start: "top 75%",
    },
  });

  // --- 3D Blockbuster tunnel ---
  const bbTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".blockbuster-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
    },
  });

  bbTl
    .to(".bb-h1", { opacity: 1, z: 500, duration: 1 })
    .to(".bb-h1", { opacity: 0, z: 1500, duration: 1 }, "+=0.5")

    .fromTo(
      ".bb-card-1",
      { opacity: 0, z: -2000 },
      { opacity: 1, z: 0, duration: 2 },
      "-=0.5",
    )
    .to(".bb-card-1", { z: 1000, opacity: 0, duration: 2 }, "+=1")

    .to(".bb-h2", { opacity: 1, z: 500, duration: 1 }, "-=1")
    .to(".bb-h2", { opacity: 0, z: 1500, duration: 1 }, "+=0.5")

    .fromTo(
      ".bb-card-2",
      { opacity: 0, z: -2000 },
      { opacity: 1, z: 0, duration: 2 },
      "-=0.5",
    )
    .to(".bb-card-2", { z: 1000, opacity: 0, duration: 2 }, "+=1")

    .to(".bb-h3", { opacity: 1, z: 500, duration: 1.5 }, "-=0.5")
    .to(".bb-h3", { opacity: 0.5, scale: 1.2, duration: 1 });
});
