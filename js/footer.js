import { AppearAnimationDriver } from "./appear-animation.js";

export const initializeFooter = () => {
    [...document.querySelectorAll(".footer__link")].forEach(link => {
        new AppearAnimationDriver(link, "pop-in", 0.2).start();
    })
};