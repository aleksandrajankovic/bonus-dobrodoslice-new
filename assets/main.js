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

      // popuni desktop
      document
        .querySelectorAll(".akviz-counter-desk")
        .forEach((el, i) => (el.textContent = str[i]));
    })
    .catch((err) => console.error(err));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://smartdog.meridianbet.com/feeds/akvizicija_counter")
    .then((res) => res.json())
    .then((data) => {
      // izvuci broj igrača i pretvori u string
      const countStr = String(data.players || 0);
      // dohvatimo sve boxeve
      const boxes = document.querySelectorAll(
        "#akvizicijaCounters .akviz-counter"
      );
      // ako broj ima manje cifara od boxeva, dopuni s leva nulama
      const digits = countStr.padStart(boxes.length, "0").split("");
      // popuni svaki box odgovarajućom cifrom
      boxes.forEach((box, i) => {
        box.textContent = digits[i];
      });
    })
    .catch((err) => {
      console.error("Greška pri učitavanju akvizicija countera:", err);
    });
});
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

      function applyBlur() {
        swiper.slides.forEach((s) => s.classList.remove("blur-slide"));

        const visible = Array.from(swiper.slides).filter((s) =>
          s.classList.contains("swiper-slide-visible")
        );

        if (visible.length) {
          visible[visible.length - 1].classList.add("blur-slide");
        }
      }

      const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 15,
        rewind: true,
        resistanceRatio: 0,
        grabCursor: true,
        watchSlidesVisibility: true,
        breakpoints: { 768: { slidesPerView: 4 } },
        on: {
          init: applyBlur,
          slideChangeTransitionEnd: applyBlur,
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
