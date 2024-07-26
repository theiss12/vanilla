import { appState } from "./state.js";
import { startAutoSlide } from "./slides.js";

export const startNavigation = () => {
    const toggleButton = document.querySelector(".navigation__toggle");
    toggleButton.addEventListener("click", () => {
        appState.isNavigationOpen = !appState.isNavigationOpen;
    });

    [...document.querySelectorAll(".navigation__item a")].forEach(link => {
        link.addEventListener("click", () => {
            appState.isNavigationOpen = false;
            startAutoSlide();
        });
    });

    window.addEventListener("navigationopenchange", () => {
        if (appState.isNavigationOpen) {
            toggleButton.classList.remove("navigation__toggle--lined");
        }
        else {
            toggleButton.classList.add("navigation__toggle--lined");
        }
        
        document.querySelector(".navigation").classList.toggle("navigation--open");
    });
};