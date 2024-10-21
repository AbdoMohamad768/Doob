const sections = document.querySelectorAll(".section");

const our_company_comments = document.querySelectorAll(".comments p");
const our_company_sliders = document.querySelector(".sliders");

const stories_rows = document.querySelectorAll(".stories-wrapers .row");
const stories_sliders = document.querySelector(".stories .sliders");

const show_more_btn = document.querySelectorAll(".works .more");
const our_work_slides = document.querySelectorAll(".works .works-slide");
const our_work_sliders = document.querySelector(".our-work .sliders");

const navDrobBars = document.querySelector(".header nav > i");
const navLinks = document.querySelectorAll(".header ul a");

let currentComment = 0;
let currentStoriesRow = 0;
let currentworksSlide = 0;

const deActivateBtn = function (btn) {
  btn.setAttribute("disabled", "true");
  btn.classList.remove("active");
};
const activateBtn = function (btn) {
  btn.removeAttribute("disabled");
  btn.classList.add("active");
};
const checkSlide = function (btn_container, slides, currentSlide) {
  const go_right_button = btn_container.querySelector("button:last-child");
  const go_left_button = btn_container.querySelector("button:first-child");

  if (slides.length - 1 === currentSlide) deActivateBtn(go_right_button);
  else activateBtn(go_right_button);

  if (currentSlide === 0) deActivateBtn(go_left_button);
  else activateBtn(go_left_button);
};

const handleSliders = function (slides, slider, currentSlide) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - currentSlide) * 200}%)`;
  });

  checkSlide(slider, slides, currentSlide);
};

const renderWorkSlides = function (rowsToShow, maxRows) {
  our_work_slides.forEach((slide) => {
    slide.querySelectorAll(".row").forEach((row, i) => {
      if (i < rowsToShow) return;
      row.classList.add("hide");
    });

    if (slide.children.length < maxRows)
      slide.querySelector(".more").classList.add("hide");
  });
};
window.addEventListener("load", function () {
  checkSlide(our_company_sliders, stories_rows, currentComment);
  checkSlide(stories_sliders, stories_rows, currentStoriesRow);
  checkSlide(our_work_sliders, our_work_slides, currentworksSlide);

  if (window.visualViewport.width >= 991) {
    renderWorkSlides(2, 4);
  }
  if (window.visualViewport.width < 991) {
    renderWorkSlides(1, 3);
  }
});

our_company_sliders.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-slide");
  if (!clicked) return;

  if (clicked.value === "slide-right") ++currentComment;
  if (clicked.value === "slide-left") --currentComment;

  handleSliders(our_company_comments, our_company_sliders, currentComment);
});

stories_sliders.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-slide");
  if (!clicked) return;

  if (clicked.value === "slide-right") ++currentStoriesRow;
  if (clicked.value === "slide-left") --currentStoriesRow;

  handleSliders(stories_rows, stories_sliders, currentStoriesRow);
});

our_work_sliders.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-slide");
  if (!clicked) return;

  if (clicked.value === "slide-right") ++currentworksSlide;
  if (clicked.value === "slide-left") --currentworksSlide;

  console.log();

  handleSliders(our_work_slides, our_work_sliders, currentworksSlide);
});

show_more_btn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    btn.parentElement.querySelectorAll(".row").forEach((row) => {
      row.classList.remove("hide");
      btn.classList.add("hide");
    });

    if (window.visualViewport.width < 991) {
      document.querySelector(".our-work .works").style.height = "2450px";
    }
  });
});

const toggleNavList = function () {
  navDrobBars.nextElementSibling.classList.toggle("show");
};
navDrobBars.addEventListener("click", toggleNavList);

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const href = link.getAttribute("href");

    document.querySelector(href).scrollIntoView();
    toggleNavList();
  });
});
