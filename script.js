const imageCont = document.getElementById("img-cont")
const loader = document.getElementById("loader")

let ready = false
let imagesLoaded = 0;
let totalImages = 0;

let photosArr = []

let count = 5
const apiKey = "jqPiJW5brxLmymgG_HVRcKAXgnzekY2fw_qgW-dS90g"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check all images are loaded

function imageloaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true;
        count = 10

    }
}

// helper function

function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}

// Create element for links and photos

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArr.length;

    // for each method
    photosArr.forEach((each) => {
        // creating <A> to link to unsplash
        const item = document.createElement("a")
        // item.setAttribute('href', each.links.html)
        // item.setAttribute("target", "_blank")
        //  Create img for photo

        setAttributes(item, {
            href: each.links.html,
            target: "_blank"
        })
        const img = document.createElement("img")
        // img.setAttribute('src', each.urls.regular)
        // img.setAttribute('alt', each.alt_description)
        // img.setAttribute('title', each.alt_description)
        setAttributes(img, {
            src: each.urls.regular,
            alt: each.alt_description,
            title: each.alt_description
        })
        img.addEventListener("load", imageloaded)
        // put img inside <a> and merge in img cont
        item.appendChild(img)
        imageCont.appendChild(item)
    })
}


// get photos

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArr = await response.json()
        displayPhotos();
    }
    catch (error) {
        // if error
    }
}

// check scroll reaching bottom
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos()