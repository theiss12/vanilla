import { appState } from "./state.js";

const MAX_SLIDE_INDEX = document.querySelectorAll(".slides__slide").length - 1;
let intervalId = null;

export function startAutoSlide() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
        const newIndex = appState.slideIndex + 1;
        appState.slideIndex = newIndex > MAX_SLIDE_INDEX ? 0 : newIndex;
    }, 3000);
}

function swapSlide() {
    [...document.querySelectorAll(".slides__slide")].forEach((slide, slideIndex) => {
        if (slideIndex === appState.slideIndex) {
            slide.classList.add("slides__slide--active");
            const slideLeft = slide.offsetLeft;
            const slideWidth = slide.offsetWidth;
            const sliderWidth = slide.parentElement.offsetWidth;
            const scrollPosition = slideLeft - (sliderWidth / 2) + (slideWidth / 2);
            slide.parentElement.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
        else {
            slide.classList.remove("slides__slide--active");
        }
    });
    [...document.querySelectorAll(".slide-pagination__button")].forEach(button => {
        if (button.value == appState.slideIndex) {
            button.classList.add("slide-pagination__button--active");
        }
        else {
            button.classList.remove("slide-pagination__button--active");
        }
    })
}

function initializePagination() {
    [...document.querySelectorAll(".slide-pagination__button")].forEach(button => {
        button.addEventListener("click", clickEvent => {
            const newIndex = parseInt(clickEvent.target.value);
            appState.slideIndex = newIndex;
            startAutoSlide();
        });
    })
}

function initializeControlls() {
    document.querySelector(".slide-controlls__button--left").addEventListener("click", () => {
        const newIndex = appState.slideIndex - 1;
        appState.slideIndex = newIndex < 0 ? MAX_SLIDE_INDEX : newIndex;
        startAutoSlide();
    });
    document.querySelector(".slide-controlls__button--right").addEventListener("click", () => {
        const newIndex = appState.slideIndex + 1;
        appState.slideIndex = newIndex > MAX_SLIDE_INDEX ? 0 : newIndex;
        startAutoSlide();
    });
}

export const initializeSlides = () => {
    initializePagination();
    initializeControlls();
    startAutoSlide();
    document.querySelector(".slides").addEventListener("scroll", startAutoSlide);
    window.addEventListener("slideindexchange", swapSlide);
}