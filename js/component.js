export class Component extends HTMLElement {
    constructor() {
        super();
        this.shadowDocument = this.attachShadow({ mode: "open" });
        this.templateLoaded = false;
        this.pendingAttributes = {};
        const component = this;
        this.state = new Proxy( // shortcut to attributes
            {},
            {
                set(state, property, newValue) {
                    state[property] = newValue;
                    if (component.getAttribute(property) !== newValue) { // need to react to the change?
                        component.setAttribute(property, newValue);
                    }
                    return true;
                }
            }
        )
        this.loadTemplate();

        // this.changeCallbacks = {
        //     attributeName: newValue => {}
        // };
    }

    static get observedAttributes() {
        console.warn(`Implement satic get observedAttributes method: return ["attribute1", "attribute2", ...];`);
        return [];
    }
    
    onTemplateLoad() {
        console.warn(`Implement onTemplateLoad method for ${this.constructor.name}:
this.elementName = document.querySelector(".elementClassName");
this.elementName.addEventListener("click", () => {});
        `);
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (!this.templateLoaded) {
            this.pendingAttributes[attributeName] = newValue;
            return;
        }
        if (!this.changeCallbacks) {
            console.warn(`Implement changeCallbacks property in constructor of ${this.constructor.name}: 
this.changeCallbacks = {
    attributeName: newValue => {
        /*... do something */
    }
};`)
            return;
        }
        const callback = this.changeCallbacks[attributeName];
        if (callback) {
            callback(newValue);
        }
        if (this.state[attributeName] !== newValue) {
            this.state[attributeName] = newValue;
        }
    }

    async loadTemplate() {
        // const templateResponse = await fetch(new URL('./template.html', new URL(import.meta.url)));
        const templateResponse = await fetch(`./components/${this.constructor.name}/template.html`);
        const templateText = await templateResponse.text();
        const templateElement = document.createElement('template');
        templateElement.innerHTML = templateText;

        // const styleResponse = await fetch(new URL('./style.css', new URL(import.meta.url)));
        const styleResponse = await fetch(`./components/${this.constructor.name}/style.css`);
        const styleText = await styleResponse.text();
        const styleElement = document.createElement('style');
        styleElement.textContent = styleText;

        this.shadowDocument.appendChild(styleElement);
        this.shadowDocument.appendChild(templateElement.content.cloneNode(true));
        
        if (this.onTemplateLoad) {
            this.onTemplateLoad();
        }

        this.templateLoaded = true;
        this.applyPendingAttributes();
    }

    applyPendingAttributes() {
        for (const [attributeName, value] of Object.entries(this.pendingAttributes)) {
            this.attributeChangedCallback(attributeName, null, value);
        }
        this.pendingAttributes = {};
    }

    clearForRepeat(className) {
        [...this.shadowDocument.querySelectorAll(`.${className}`)].forEach((element, elementIndex) => {
            if (elementIndex === 0) {
                element.dataset.copied = false;
            }
            else {
                element.remove();
            }
        })
    }

    repeat(className, changer) {
        const allClassElements = this.shadowDocument.querySelectorAll(`.${className}`);
        let element = allClassElements[allClassElements.length - 1];
        if (element.dataset.copied === "true") {
            element.parentElement.appendChild(element.cloneNode(true));
            element = element.nextElementSibling;
        }
        element.dataset.copied = true;
        this.change(element, changer);
        return element;
    }

    change(element, changer) {
        Object.keys(changer).forEach(attributeName => {
            if (attributeName in element) {
                element[attributeName] = changer[attributeName];
            }
            else {
                const child = element.querySelector(`.${attributeName}`);
                this.change(child, changer[attributeName]);
            }
        })
    }
}