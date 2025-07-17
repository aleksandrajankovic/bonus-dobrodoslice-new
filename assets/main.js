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
        const slide = document.createElement("div");
        slide.className = "swiper-slide p-4 rounded-lg cursor-pointer";
        slide.innerHTML = `
          <p class="text-[16px]">
            ${win.name} je osvojio/la
            <span class="text-[#54FD11]">${val}&nbsp;rsd</span>
            na igri <span class="text-[#CE5DFF]">${win.game_name || "-"}</span>
          </p>
          <p class="text-xs text-gray-400 mt-1 flex items-center">
            <span class="inline-block bg-green-500 w-2 h-2 rounded-full mr-1"></span>
           Pre ${win.time || "-"}
          </p>
        `;
        wrapper.appendChild(slide);
      });

      new Swiper(".swiper-container", {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 60,
        grabCursor: true,
        autoplay: {
          delay: 0, // odmah vozi
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        speed: 50000, // dužina jednog full‑cycle scrolla
        watchSlidesVisibility: true,
        breakpoints: {
          0: {
            slidesPerView: 1,
            speed: 500,
            autoplay: { delay: 2000 },
          },
          768: {
            slidesPerView: 4,
            speed: 500,
            autoplay: { delay: 2000 },
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
