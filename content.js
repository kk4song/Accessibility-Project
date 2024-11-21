document.querySelectorAll("img").forEach(img => {
    img.addEventListener("mouseenter", () => {
        magnify(img, 2); // Adjust zoom level here
    });
});