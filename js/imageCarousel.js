function createCarousel(targetElement, templateID, itemTemplateID) {
    const template = document.getElementById(templateID).content.querySelector("div");
    const itemTemplate = document.getElementById(itemTemplateID).content.querySelector("div");

    const id = targetElement.id;
    const sources = targetElement.getAttribute("sources").split(" ");

    var imageCarousel = document.importNode(template, true);

    targetElement.replaceWith(imageCarousel);
    imageCarousel.id = id;

    const carouselIndicators = imageCarousel.querySelector("div.carousel-indicators");
    const carouselInner = imageCarousel.querySelector("div.carousel-inner");

    sources.forEach((src, index, sources) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-target", `#${id}`);
        button.setAttribute("data-bs-slide-to", index);
        button.setAttribute("aria-label", `Slide ${index + 1}`);

        var item = document.importNode(itemTemplate, true);
        item.querySelector("div img").setAttribute("src", src);

        if (index == 0) {
            button.classList.add("active");
            button.setAttribute("aria-current", "true");
            item.classList.add("active")
        }

        carouselIndicators.appendChild(button);
        carouselInner.appendChild(item);
    });

    var prevButton = imageCarousel.querySelector("button.carousel-control-prev");
    prevButton.setAttribute("data-bs-target", `#${id}`);

    var nextButton = imageCarousel.querySelector("button.carousel-control-next");
    nextButton.setAttribute("data-bs-target", `#${id}`);
}

const imageCarousels = document.getElementsByTagName("image-carousel");

while (imageCarousels.length > 0) {
    let element = imageCarousels[0];
    let templateID = element.getAttribute("template");
    let itemTemplateID = element.getAttribute("item-template");

    createCarousel(element, templateID, itemTemplateID);
}