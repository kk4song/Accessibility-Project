// Function to create the magnifier effect
function magnify(img, zoom) {
    // Check if the magnifier already exists for this image
    if (img.hasAttribute('data-magnified')) return;  // Prevent multiple magnifiers for the same image

    var glass = document.createElement("div");
    glass.setAttribute("class", "img-magnifier-glass");
    img.parentElement.insertBefore(glass, img);

    // Mark the image as having a magnifier
    img.setAttribute('data-magnified', 'true');

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    var bw = 3;
    var w = glass.offsetWidth / 2;
    var h = glass.offsetHeight / 2;

    // Show the magnifier only when the user hovers over the image
    img.addEventListener("mouseenter", function() {
        glass.style.display = "block";
    });

    img.addEventListener("mouseleave", function() {
        glass.style.display = "none";
    });

    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        e.preventDefault();
        var pos = getCursorPos(e);
        var x = pos.x;
        var y = pos.y;

        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }

        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();

        x = e.pageX - a.left - window.scrollX;
        y = e.pageY - a.top - window.scrollY;
        return { x: x, y: y };
    }
}

// Automatically apply magnifier to all images on the page when the extension runs
var images = document.querySelectorAll("img");

images.forEach(function(img) {
    magnify(img, 3);  // 3 is the zoom level, adjust as needed
});
