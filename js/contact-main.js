import { TypingClassInjector, CounterClassInjector } from "./text-animations.js";

window.addEventListener("load", () => {
    const after = true;
    const counterDurationSeconds = 6;
    const reelDurationSeconds = 15;
    new CounterClassInjector(
        "counter-1", 
        "job-applications", 
        counterDurationSeconds, 
        8934, 
        after
    ).inject();
    new CounterClassInjector(
        "counter-2", 
        "tears-shed", 
        counterDurationSeconds, 
        2622, 
        after
    ).inject();
    new CounterClassInjector(
        "counter-3", 
        "sleepless-hours", 
        counterDurationSeconds, 
        3368, 
        after
    ).inject();
    new TypingClassInjector(
        "info-reel", 
        "infos-animation", 
        reelDurationSeconds, 
        ["LinkedIn - Tamás Zeiss", "Github - @theiss12", "http://www.tamas-zeiss-dev.hu", "tamas.zeiss@gmail.com"], 
        after
    ).inject();
})