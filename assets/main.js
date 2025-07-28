document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("heroSection");
  const cta = document.getElementById("stickyCta");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          cta.classList.remove("hidden");
        } else {
          cta.classList.add("hidden");
        }
      });
    },
    {
      root: null,
      threshold: 0,
    }
  );

  observer.observe(hero);
});

/*ACCORDION*/
document.querySelectorAll(".faq-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    content.classList.toggle("hidden");
    // okretanje strelice
    const arrow = btn.querySelector("img");
    arrow.classList.toggle("rotate-90");
  });
});

/*COUNTER*/
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://smartdog.meridianbet.com/feeds/akvizicija_counter")
    .then((res) => res.json())
    .then((data) => {
      const digits = String(data.players || 0).split("");

      function renderCounters(containerId, cls) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        digits.forEach((d) => {
          const box = document.createElement("div");
          box.className =
            cls +
            " w-5 h-9 bg-[#D51023] text-white text-[29px] font-bold flex items-center justify-center rounded";
          box.textContent = d;
          container.appendChild(box);
        });
      }

      renderCounters("akvizicijaMobileCounters", "akviz-counter-mobile");
      renderCounters("akvizicijaDeskCounters", "akviz-counter-desk");
    })
    .catch((err) =>
      console.error("Greška pri učitavanju akvizicija countera:", err)
    );
});

/*WINNERS SLIDER & DATA*/
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("winnersGrid");

  fetch("https://smartdog.meridianbet.com/feeds/top_wins")
    .then((r) => r.json())
    .then((data) => {
      wrapper.innerHTML = "";
      data.slice(0, 20).forEach((win) => {
        const val = (win.win_value || 0).toLocaleString("en-US");
        const verb = win.gender === "f" ? "osvojila" : "osvojio";
        const slide = document.createElement("div");
        slide.className = `
    swiper-slide
    relative               
    border-2 border-[#8836D2]
    flex-none
    w-[240px] md:w-[400px] lg:w-[500px]
    p-4
    rounded-lg
    cursor-pointer
    bg-cover bg-center bg-no-repeat
    bg-[url('./assets/images/swipe.png')]
  `;

  slide.innerHTML = `
  
    <div
      class="
       absolute inset-y-0           
        right-[-2px]                
        top-[-2px]                
        bottom-[-2px]                 
        w-[40%]                      
        bg-gradient-to-l             
        from-[rgba(16,24,28,1)]  
        to-transparent               
        z-20                       
        pointer-events-none        
        rounded-r-lg                          
      "
    ></div>

    <p class="text-[13px] text-gray-400">
      <span class="semibold text-white">${win.name}</span>
      je ${verb}<br>
      <span
        class="
          font-condensed text-[40px]
          bg-[linear-gradient(180deg,#C380FF_0%,#8836D2_100%)]
          bg-clip-text text-transparent font-black
        "
      >${val}&nbsp;RSD</span><br>
      na <span class="text-white text-[14px] capitalize">${win.game_name || "-"}</span>
    </p>
  `;

  wrapper.appendChild(slide);
});

      new Swiper(".swiper-container", {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        grabCursor: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        speed: 50000,
        watchSlidesVisibility: true,
        breakpoints: {
          0: {
            slidesPerView: 1,
            speed: 500,
            autoplay: { delay: 4000 },
          },
          640: {
            slidesPerView: 2,
            speed: 500,
            autoplay: { delay: 4000 },
          },
          840: {
            slidesPerView: 3,
            speed: 500,
            autoplay: { delay: 4000 },
          },
         1366: {
            slidesPerView: 4,
            speed: 500,
            autoplay: { delay: 4000 },
          },
        },
      });
    })
    .catch(console.error);
});

/*SHOW MORE*/
const btn = document.getElementById("showMoreBtn");
const more = document.getElementById("moreText");
const container = document.getElementById("textContainer");
const overlay = document.getElementById("fadeOverlay");

btn.addEventListener("click", () => {
  more.classList.toggle("hidden");

  container.classList.toggle("expanded");

  overlay.classList.toggle("hidden");

  btn.textContent = more.classList.contains("hidden")
    ? "PRIKAZI VIŠE"
    : "PRIKAŽI MANJE";
});
/*FOOTER SLIDER*/

function autoSlide(sliderContainer) {
  const wrapper = sliderContainer.querySelector(".slider-wrapper");
  const slides = sliderContainer.querySelectorAll(".slider-slide");
  const slideWidth = slides[0].offsetWidth;
  let currentPosition = 0;

  function moveSlides() {
    currentPosition -= 1;
    wrapper.style.transform = `translateX(${currentPosition}px)`;

    if (Math.abs(currentPosition) >= slideWidth) {
      currentPosition = 0;
      wrapper.style.transition = "none";
      wrapper.appendChild(wrapper.firstElementChild);
      wrapper.style.transform = `translateX(${currentPosition}px)`;
    }
  }

  setInterval(moveSlides, 30);
}
const sliderContainers = document.querySelectorAll(".slider-container");
sliderContainers.forEach(autoSlide);
