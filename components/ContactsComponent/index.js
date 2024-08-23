import { Component } from "../../js/component.js";
import { AppearAnimationDriver } from "../../js/appear-animation.js";

export class ContactsComponent extends Component {
    constructor() {
        super();

        this.changeCallbacks = {
            links: newLinksJSON => {
                this.contactList.innerHTML = "";
                const newLinks = JSON.parse(newLinksJSON);
                newLinks.forEach(linkObject => {
                    this.repeat(
                        "component-contacts__link",
                        "component-contacts__item",
                        {
                            href: linkObject.endpointUrl,
                            innerHTML: linkObject.label
                        },
                        true
                    )
                    const item = this.repeat(
                        "component-contacts__item",
                        "component-contacts"
                    )
                    new AppearAnimationDriver(item, "pop-in", 0.3).start();
                });
            }
        };
    }

    onTemplateLoad() {
        this.contactList = this.shadowDocument.querySelector(".component-contacts");
    }

    static get observedAttributes() {
        return ["links"];
    }
}

customElements.define("contacts-component", ContactsComponent);