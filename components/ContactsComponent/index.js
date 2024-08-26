import { Component } from "../../js/component.js";
import { AppearAnimationDriver } from "../../js/appear-animation.js";

export class ContactsComponent extends Component {
    constructor() {
        super();

        this.changeCallbacks = {
            links: newLinksJSON => {
                this.clearForRepeat("component-contacts__item");
                const newLinks = JSON.parse(newLinksJSON);
                newLinks.forEach(linkObject => {
                    const item = this.repeat("component-contacts__item", {
                        "component-contacts__link": {
                            href: linkObject.endpointUrl,
                            innerHTML: linkObject.label
                        }
                    })
                    new AppearAnimationDriver(item, "pop-in", 0.3).start();
                });
            }
        };
    }

    onTemplateLoad() {}

    static get observedAttributes() {
        return ["links"];
    }
}

customElements.define("contacts-component", ContactsComponent);