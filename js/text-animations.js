class CSSInjector {
    inject() {
        const style = document.createElement("style");
        style.innerHTML = this.generateCSS();
        document.head.appendChild(style);
    }
}

class CounterAnimationInjector extends CSSInjector {
    constructor(name, steps) {
        super();
        this.name = name;
        this.steps = steps; // maybe not the best name :(
    }

    getAnimationBody() {
        let body = "";
        for (let contentValue = 0; contentValue < this.steps; contentValue++) {
            const percentage = (contentValue / (this.steps - 1)) * 100;
            const step = `${percentage}% {content: '${contentValue + 1}'}`;
            body += step;
        }
        return body;
    }

    generateCSS() {
        const body = this.getAnimationBody();
        const css = `@keyframes ${this.name} {${body}}`;
        return css;
    }
}

export class CounterClassInjector extends CSSInjector{
    constructor(className, animationName, duration, steps, after) {
        super();
        this.className = className;
        this.animationName = animationName;
        this.duration = duration;
        this.steps = steps;
        this.after = after;
    }

    generateCSS() {
        const pseudoClass = this.after ? "after" : "before";
        const animationInjector = new CounterAnimationInjector(this.animationName, this.steps);
        const css = 
        `.${this.className}::${pseudoClass}{
            content: '1';
            animation: ${this.animationName} ${this.duration}s steps(${this.steps});
            animation-fill-mode: forwards;
        }
        ${animationInjector.generateCSS()}`;
        return css;
    }
}

export class TypingClassInjector extends CSSInjector {
    constructor(className, animationName, duration, strings, after, typingIndicator = "_") {
        super();
        this.className = className;
        this.animationName = animationName;
        this.duration = duration;
        this.strings = strings;
        this.steps = (strings.reduce((sum, string) => sum + string.length, 0)) * 2;
        this.after = after;
        this.typingIndicator = typingIndicator;
    }

    getAnimationCSS() {
        let body = "";
        let stepIndex = 0;
        for (let stringIndex = 0; stringIndex < this.strings.length; stringIndex++) {
            const currentString = this.strings[stringIndex];
            const currentLength = currentString.length;
            const lastIndex = currentLength - 1;
            const previousLength = this.strings[stringIndex - 1] ? this.strings[stringIndex - 1].length : 0;

            for (let charIterator = 0; charIterator < currentString.length * 2; charIterator++) {
                const percentage = (stepIndex / (this.steps - 1)) * 100; // (previousLength + (charIterator / (this.steps - 1))) * 100;
                const end = charIterator < currentLength ? charIterator : currentLength - (charIterator - currentLength);
                const step = `${percentage}% {content: '${currentString.substring(0, end) + this.typingIndicator}'}`;
                body += step;
                stepIndex++;
            }
        }
        const css = `@keyframes ${this.animationName} {${body}}`;
        return css;
    }

    generateCSS() {
        const pseudoClass = this.after ? "after" : "before";
        const animationDefinition = this.getAnimationCSS();
        const css = 
        `.${this.className}::${pseudoClass}{
            content: '';
            animation: ${this.animationName} ${this.duration}s steps(${this.steps}) infinite;
        }
        ${animationDefinition}`;
        return css;
    }
}