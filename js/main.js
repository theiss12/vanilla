import { GalleryComponent } from "../components/GalleryComponent/index.js"
import { SliderComponent } from "../components/SliderComponent/index.js"
import { NavigationComponent } from "../components/NavigationComponent/index.js";
import { ServicesComponent } from "../components/ServicesComponent/index.js";
import { ContactsComponent } from "../components/ContactsComponent/index.js";

window.addEventListener("load", () => {
    fetch("./assets/data/slides.json")
        .then(res => res.json())
        .then(json => {
            const images = json.map(slide => slide.imageUrl);
            document.querySelector("slider-component").state.slides = JSON.stringify(json);
            document.querySelector("gallery-component").state.images = JSON.stringify(images);
        });
    
    fetch("./assets/data/services.json")
        .then(res => res.json())
        .then(json => {
            document.querySelector("services-component").state.items = JSON.stringify(json);
        });
});