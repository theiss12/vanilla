// export class HeaderComponent extends HTMLElement {
//     constructor() {
//         super();
//         this.shadowDocument = this.attachShadow({ mode: "open" });
//         this.templateLoaded = false;
//         this.pendingAttributes = {};
//         const component = this;
//         this.state = new Proxy( // shortcut to attributes
//             new Set(component.attributes),
//             {
//                 set(state, property, newValue) {
//                     state[property] = newValue;
//                     if (component.getAttribute(property) === newValue) {
//                         return true;
//                     }
//                     else {
//                         component.setAttribute(property, newValue);
//                         return true;
//                     }
//                 }
//             }
//         )
//         this.loadTemplate();

//         this.changeCallbacks = {
//             color: newColor => {
//                 this.mainTitle.style.color = newColor;
//                 this.subtitle.style.color = newColor;
//             },
//             level: newLevel => {
//                 console.log(newLevel);
//             }
//         };
//     }

//     static get observedAttributes() {
//         return ["color", "level"];
//     }

//     onTemplateLoad() {
//         this.mainTitle = this.shadowDocument.querySelector(".main-title");
//         this.subtitle = this.shadowDocument.querySelector(".subtitle");
//     }

//     attributeChangedCallback(attributeName, oldValue, newValue) {
//         if (this.templateLoaded) {
//             this.changeCallbacks[attributeName](newValue);
//             if (this.state[attributeName] !== newValue) {
//                 this.state[attributeName] = newValue;
//             }
//         } else {
//             this.pendingAttributes[attributeName] = newValue;
//         }
//     }

//     connectedCallback() {
//         console.log(this, this.constructor.name);
//     }

//     disconnectedCallback() {
//         console.log("header disconnected");
//     }

//     async loadTemplate() {
//         const templateResponse = await fetch(new URL('./template.html', new URL(import.meta.url)));
//         const templateText = await templateResponse.text();
//         const templateElement = document.createElement('template');
//         templateElement.innerHTML = templateText;

//         const styleResponse = await fetch(new URL('./style.css', new URL(import.meta.url)));
//         const styleText = await styleResponse.text();
//         const styleElement = document.createElement('style');
//         styleElement.textContent = styleText;

//         this.shadowDocument.appendChild(styleElement);
//         this.shadowDocument.appendChild(templateElement.content.cloneNode(true));

//         this.onTemplateLoad();

//         this.templateLoaded = true;
//         this.applyPendingAttributes();
//     }

//     applyPendingAttributes() {
//         for (const [attributeName, value] of Object.entries(this.pendingAttributes)) {
//             this.attributeChangedCallback(attributeName, null, value);
//         }
//         this.pendingAttributes = {};
//     }
// }

// customElements.define("header-component", HeaderComponent);
import { Component } from "../../js/component.js";
export class HeaderComponent extends Component {
    constructor() {
        super();

        this.changeCallbacks = {
            color: newColor => {
                this.mainTitle.style.color = newColor;
                this.subtitle.style.color = newColor;
            },
            level: newLevel => {
                // console.log(newLevel);
            }
        };
    }

    static get observedAttributes() {
        return ["color", "level"];
    }

    onTemplateLoad() {
        this.mainTitle = this.shadowDocument.querySelector(".main-title");
        this.subtitle = this.shadowDocument.querySelector(".subtitle");
    }

    // connectedCallback() {
    //     console.log(this, this.constructor.name);
    // }

    // disconnectedCallback() {
    //     console.log("header disconnected");
    // }
}

customElements.define("header-component", HeaderComponent);