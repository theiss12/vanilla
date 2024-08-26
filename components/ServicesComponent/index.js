import { Component } from "../../js/component.js";
import { AppearAnimationDriver } from "../../js/appear-animation.js";

export class ServicesComponent extends Component {
    constructor() {
        super();

        this.changeCallbacks = {
            items: newItemsJSON => {
                this.clearForRepeat("service");
                const newItems = JSON.parse(newItemsJSON);
                newItems.forEach(itemObject => {
                    const service = this.repeat("service", {
                        "service__image": {
                            src: itemObject.imageUrl
                        },
                        "service__title": {
                            innerHTML: itemObject.title
                        }
                    });
                    const image = service.querySelector(".service__image");
                    new AppearAnimationDriver(service, "appear", 0.33).start();
                    new AppearAnimationDriver(image, "from-right", 0.3).start();
                });
            }
        }
    }

    static get observedAttributes() {
        return ["items"];
    }

    onTemplateLoad() {}
}

customElements.define("services-component", ServicesComponent);