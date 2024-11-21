function magnify(img, zoom) {
    const glass = document.createElement("div");
    glass.setAttribute("class", "img-magnifier-glass");
    document.body.appendChild(glass);

    glass.style.backgroundImage = `url('${img.src}')`;
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;

    const bw = 3;
    const w = glass.offsetWidth / 2;
    const h = glass.offsetHeight / 2;

    img.addEventListener("mousemove", moveMagnifier);
    glass.addEventListener("mousemove", moveMagnifier);

    function moveMagnifier(e) {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x > img.width || y > img.height || x < 0 || y < 0) {
            glass.style.display = "none";
            return;
        }

        glass.style.display = "block";
        glass.style.left = `${e.pageX - w}px`;
        glass.style.top = `${e.pageY - h}px`;

        glass.style.backgroundPosition = `-${(x * zoom - w)}px -${(y * zoom - h)}px`;
    }
}
