export const appState = new Proxy({slideIndex: 0, isNavigationOpen: false}, {
    set(object, property, value) {
        object[property] = value;

        if (property === "slideIndex") {
            window.dispatchEvent(new Event("slideindexchange"));
        }

        if (property === "isNavigationOpen") {
            window.dispatchEvent(new Event("navigationopenchange"));
        }

        return true;
    }
});