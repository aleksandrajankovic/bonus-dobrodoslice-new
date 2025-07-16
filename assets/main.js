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
      // formatiraj broj na 4 cifre
      const str = String(data.players || 0).padStart(4, "0");

      // popuni mobile
      document
        .querySelectorAll(".akviz-counter-mobile")
        .forEach((el, i) => (el.textContent = str[i]));


      document
        .querySelectorAll(".akviz-counter-desk")
        .forEach((el, i) => (el.textContent = str[i]));
    })
    .catch((err) => console.error(err));
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
          <p class="text-sm">
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
        slidesPerView: 1,
        spaceBetween: 15,
        grabCursor: true,
        rewind: true, // ← аутоматски враћа на први slide
        watchSlidesVisibility: true,
        breakpoints: {
          768: { slidesPerView: 4 },
        },
      });
    })
    .catch(console.error);
});

/*footer slider*/

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
