import { Component } from "../../js/component.js";

export class SliderComponent extends Component {
    constructor() {
        super();
        this.maxSlides = 0;
        this.intervalId = null;
        const component = this;
        this.changeCallbacks = {
            slides: slides => {
                this.clearForRepeat("slides__slide");
                this.clearForRepeat("slide-pagination__button");

                const newSlides = JSON.parse(slides);
                component.maxSlides = newSlides.length - 1;
                newSlides.forEach((slideObject, slideObjectIndex) => {
                    this.repeat("slides__slide", {
                        className: `slides__slide${slideObjectIndex === 0 ? " slides__slide--active" : ""}`,
                        style: `background-image: url("${slideObject.imageUrl}")`,
                        "slide-title": {innerHTML: slideObject.title}
                    })

                    this.repeat("slide-pagination__button", {
                        className: `slide-pagination__button${slideObjectIndex === 0 ? " slide-pagination__button--active" : ""}`,
                        value: slideObjectIndex,
                        innerHTML: slideObjectIndex,
                        onclick: () => component.state.slideindex = slideObjectIndex
                    })
                })
            },

            slideindex: newIndex => {
                [...component.shadowDocument.querySelectorAll(".slides__slide")].forEach((slide, slideIndex) => {
                    if (slideIndex == newIndex) {
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

                [...component.shadowDocument.querySelectorAll(".slide-pagination__button")].forEach(button => {
                    if (button.value == newIndex) {
                        button.classList.add("slide-pagination__button--active");
                    }
                    else {
                        button.classList.remove("slide-pagination__button--active");
                    }
                });
            }
        };
    }

    static get observedAttributes() {
        return ["slideindex", "slides"];
    }

    onTemplateLoad() {
        this.shadowDocument.querySelector(".slide-controlls__button--left").addEventListener("click", () => {this.changeIndexBy(-1)});
        this.shadowDocument.querySelector(".slide-controlls__button--right").addEventListener("click", () => {this.changeIndexBy(1)});
        this.shadowDocument.querySelector(".slides").addEventListener("scroll", () => {this.startAutoSlide()});
        this.startAutoSlide();
    }

    startAutoSlide() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(() => {
            const newIndex = parseInt(this.state.slideindex) + 1;
            this.state.slideIndex = newIndex > this.maxSlides ? 0 : newIndex;
        }, 3000);
    }

    changeIndexBy(amount) {
        const newIndex = parseInt(this.state.slideindex) + amount;
        // this.state.slideindex = Math.min(Math.max(newIndex, 0), this.maxSlides);
        if (newIndex > this.maxSlides) {
            this.state.slideindex = 0;
        } else if (newIndex < 0) {
            this.state.slideindex = this.maxSlides;
        }
        else {
            this.state.slideindex = newIndex;
        }
        this.startAutoSlide();
    }
}

customElements.define("slider-component", SliderComponent);