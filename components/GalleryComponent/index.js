import {Component} from "../../js/component.js";
import { AppearAnimationDriver } from "../../js/appear-animation.js";

export class GalleryComponent extends Component {
    constructor() {
        super();
        const component = this;
        this.changeCallbacks = {
            images: pathsJSON => {

                this.clearForRepeat("image-wrapper--left");
                this.clearForRepeat("image-wrapper--middle");
                this.clearForRepeat("image-wrapper--right");

                const paths = JSON.parse(pathsJSON);
                paths.forEach((path, index) => {

                    let wrapper = "";
                    const rest = index % 3;

                    if (rest === 0) wrapper = "image-wrapper--left";
                    else if (rest === 1) wrapper = "image-wrapper--middle";
                    else if (rest === 2) wrapper = "image-wrapper--right";

                    const image = this.repeat(wrapper, {
                        "column__image": {
                            src: path,
                            onclick: () => {
                                component.state.inspectoractive = "true",
                                component.state.activeindex = index
                            }
                        }
                    });
                    new AppearAnimationDriver(image, "fade-in", 0.3).start();
                });
            },
            
            inspectoractive: bool => {
                if (bool === "true") {
                    this.inspector.classList.add("inspector--active");
                } else {
                    this.inspector.classList.remove("inspector--active");
                }
            },

            activeindex: newIndex => {
                const path = JSON.parse(component.state.images)[newIndex];
                if (path) {
                    this.inspectorImage.src = path;
                }
            }
        };
    }

    static get observedAttributes() {
        return ["images", "inspectoractive", "activeindex"];
    }
    
    onTemplateLoad() {
        this.inspector = this.shadowDocument.querySelector(".inspector");
        this.inspectorImage = this.shadowDocument.querySelector(".inspector__image");

        this.inspector.addEventListener("click", () => {this.state.inspectoractive = "false"});
    }
}

customElements.define("gallery-component", GalleryComponent);