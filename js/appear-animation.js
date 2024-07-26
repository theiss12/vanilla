export class AppearAnimationDriver {
    constructor(element, animationName, finishPosition) {
        this.element = element;
        this.animationName = animationName;
        this.finishPosition = finishPosition;
        this.previousProgress = -1;
    }

    getProgress() {
        const rect = this.element.getBoundingClientRect();
        const elementCenterY = rect.top + rect.height / 2;
        const viewportBottomY = window.innerHeight;
        const normalizedDiffY = (viewportBottomY - elementCenterY) / (viewportBottomY * this.finishPosition); // 3 => end animation after bottom 3rd
        return Math.max(0, Math.min(1, normalizedDiffY));
    }

    setAnimationProgress() {
        const element = this.element;
        const progress = this.getProgress();
        if (progress === this.previousProgress) {
            return;
        }
        element.style.animationPlayState = 'paused';
        element.style.animation = 'none';
        void element.offsetWidth; // Trigger a reflow, flushing the CSS changes
        element.style.animation = `${this.animationName} 1s linear forwards`;
        element.style.animationDelay = `-${progress}s`;
        element.style.animationPlayState = 'paused'; // Keep the animation paused at the desired state
        this.previousProgress = progress;
    }

    start() {
        this.setAnimationProgress();
        const listener = () => {
            if (!this.element) {
                document.removeEventListener("scroll", listener);
                return;
            }
            this.setAnimationProgress();
        };
        document.addEventListener("scroll", listener)
    }
}