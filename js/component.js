export class Component extends HTMLElement {
    constructor() {
        super();
        this.shadowDocument = this.attachShadow({ mode: "open" });
        this.templateLoaded = false;
        this.pendingAttributes = {};
        this.repeatables = {};
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

    // static get observedAttributes() {
    //     return [];
    // }
    
    // onTemplateLoad() {
    //     this.elementName = document.querySelector(".elementClassName").
    //     this.elementName.addEventListener("click" () => {});
    // }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (!this.templateLoaded) {
            this.pendingAttributes[attributeName] = newValue;
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

    capturePotentialClones() {
        [...this.shadowDocument.querySelectorAll("*")].forEach(element => {
            const className = element.className;
            if (className) {
                this.repeatables[className] = element;
            }
        });
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
        
        this.capturePotentialClones();
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

    /**
     * 
     * @param {*} repeatElementClassName like pressing ctrl + C on an element
     * @param {*} containerClassName like selecting the area to be pasted
     * @param {*} alterations 
     * @param {Boolean} replace like pressing ctrl + A before ctrl + V 
     * @returns {HTMLElement} output of ctrl + V
     */
    repeat(repeatElementClassName, containerClassName, alterations = {}, replace = false) {
        const repeatElement = this.repeatables[repeatElementClassName];
        Object.keys(alterations).forEach(attribute => {
            repeatElement[attribute] = alterations[attribute];
        })
        const container = this.repeatables[containerClassName];
        if (replace) {
            // container.innerHTML = ""
            container.querySelector(`.${repeatElementClassName}`).remove();
            // console.log("replace");
        }
        container.appendChild(repeatElement);
        this.repeatables[repeatElementClassName] = repeatElement.cloneNode(true);
        return container.lastElementChild;
    }

    // copyPasteNew(copiedClassName, alterations = {}, purgeContainer = false, targetContainer) {
    //     const copiedElement = this.shadowDocument.querySelector(`.${copiedClassName}`);
    //     const container = targetContainer ? targetContainer : copiedElement.parentElement;
    //     const clone = copiedElement.cloneNode(true);
    //     Object.keys(alterations).forEach(attribute => {
    //         clone[attribute] = alterations[attribute];
    //     });
    //     clone.dataset.clone = "clone";
    //     if (purgeContainer) {
    //         container.innerHTML = "";
    //     }
    //     container.appendChild(clone);
    //     if (copiedElement.dataset.clone !== "clone") copiedElement.remove();
    //     return clone;
    // }
}