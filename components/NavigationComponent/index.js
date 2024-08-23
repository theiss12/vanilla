import { Component } from "../../js/component.js";
export class NavigationComponent extends Component {
    constructor() {
        super();
        const component = this;
        this.changeCallbacks = {
            navigationitems: newItemsJSON => {
                this.navigationItems.innerHTML = "";
                const newItems = JSON.parse(newItemsJSON);
                newItems.forEach((navigationItemObject, navigationItemIndex) => {
                    this.repeat(
                        "navigation-item__link",
                        "navigation-item",
                        {
                            href: navigationItemObject.endpointUrl,
                            innerHTML: navigationItemObject.label
                        },
                        true
                    );
                    this.repeat(
                        "navigation-item",
                        "component-navigation__items",
                        {
                            className: `navigation-item${
                                false ? " navigation-item--active" : ""
                            }`
                        }
                    )
                });
            },

            open: newOpen => {
                switch (newOpen) {
                    case "true":
                        this.navigation.classList.add("component-navigation--open");
                        this.toggleButton.classList.remove("navigation-toggle--lined");
                        break;
                    case "false":
                        this.navigation.classList.remove("component-navigation--open");
                        this.toggleButton.classList.add("navigation-toggle--lined");
                        break;
                    default:
                        console.error("unknown state");
                }
            }
        };
    }

    static get observedAttributes() {
        return ["navigationitems", "open"];
    }

    onTemplateLoad() {
        this.navigationItems = this.shadowDocument.querySelector(".component-navigation__items");
        this.navigation = this.shadowDocument.querySelector(".component-navigation");
        this.toggleButton = this.shadowDocument.querySelector(".navigation-toggle");
        this.toggleButton.addEventListener("click", () => {
            if (this.state.open === "true") {
                this.state.open = "false";
            } else if (this.state.open === "false") {
                this.state.open = "true"
            }
        });
    }
}

customElements.define("navigation-component", NavigationComponent);