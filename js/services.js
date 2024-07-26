import { AppearAnimationDriver } from "./appear-animation.js";

export const startServiceSection = () => {
    const finishPosition = 0.3;
    [...document.querySelectorAll(".service")].forEach(service => {
        new AppearAnimationDriver(service, "appear", finishPosition).start();
        new AppearAnimationDriver(
            service.querySelector(".service__image"),
            "from-right",
            finishPosition
        ).start();
    })
};