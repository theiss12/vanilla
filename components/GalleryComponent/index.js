import {Component} from "../../js/component.js";

export class GalleryComponent extends Component {
    constructor() {
        super();
        const component = this;
        this.changeCallbacks = {
            images: pathsJSON => {
                // clear columns
                this.leftColumn.innerHTML = 
                this.rightColumn.innerHTML = 
                this.middleColumn.innerHTML = "";

                const paths = JSON.parse(pathsJSON);
                paths.forEach((path, index) => {
                    this.repeat(
                        "column__image",
                        "image-wrapper",
                        {
                            src: path,
                            onclick: () => {
                                component.state.inspectoractive = "true",
                                component.state.activeindex = index
                            }
                        },
                        true
                    );

                    let column = "";
                    const rest = index % 3;

                    if (rest === 0) column = "column column--left";
                    else if (rest === 1) column = "column column--middle";
                    else if (rest === 2) column = "column column--right";

                    this.repeat(
                        "image-wrapper",
                        column
                    )
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
        this.leftColumn = this.shadowDocument.querySelector(".column--left");
        this.middleColumn = this.shadowDocument.querySelector(".column--middle");
        this.rightColumn = this.shadowDocument.querySelector(".column--right");
        this.inspector = this.shadowDocument.querySelector(".inspector");
        this.inspectorImage = this.shadowDocument.querySelector(".inspector__image");

        this.inspector.addEventListener("click", () => {this.state.inspectoractive = "false"});
    }
}

customElements.define("gallery-component", GalleryComponent);