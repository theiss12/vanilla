import { Component } from "../../js/component.js";
import { AppearAnimationDriver } from "../../js/appear-animation.js";

export class ServicesComponent extends Component {
    constructor() {
        super();

        this.changeCallbacks = {
            items: newItemsJSON => {
                this.servicesContainer.innerHTML = "";
                const newItems = JSON.parse(newItemsJSON);
                newItems.forEach(itemObject => {
                    const image = this.repeat(
                        "service__image",
                        "service",
                        {src: itemObject.imageUrl},
                        true
                    );
                    this.repeat(
                        "service__title",
                        "service",
                        {innerHTML: itemObject.title},
                        true
                    );
                    const service = this.repeat(
                        "service",
                        "container",
                    );
                    new AppearAnimationDriver(service, "appear", 0.33).start();
                    new AppearAnimationDriver(image, "from-right", 0.3).start();
                });
            }
        }
    }

    static get observedAttributes() {
        return ["items"];
    }

    onTemplateLoad() {
        this.servicesContainer = this.shadowDocument.querySelector(".container");
    }
}

customElements.define("services-component", ServicesComponent);