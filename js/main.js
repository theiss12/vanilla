// import { appState } from "./state.js";
import { initializeSlides } from "./slides.js";
import { startNavigation } from "./navigation.js";
import { startServiceSection } from "./services.js";
import { initializeFooter } from "./footer.js";

window.addEventListener("load", () => {
    startNavigation();
    initializeSlides();
    startServiceSection();
    initializeFooter();
});