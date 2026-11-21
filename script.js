
// =================================
// SNAPSPACE - JAVASCRIPT
// =================================


// GET HTML ELEMENTS

const items = Array.from(
    document.querySelectorAll(".gallery-item")
);

const filterButtons = document.querySelectorAll(".filter-btn");

const searchInput = document.getElementById("search-input");

const clearSearch = document.getElementById("clear-search");

const photoCount = document.getElementById("photo-count");

const noResults = document.getElementById("no-results");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const caption = document.getElementById("caption");

const imageNumber = document.getElementById("image-number");

const closeBtn = document.getElementById("close");

const nextBtn = document.getElementById("next");

const prevBtn = document.getElementById("prev");


// VARIABLES

let activeCategory = "all";

let visibleItems = [...items];

let currentIndex = 0;


// =================================
// FILTER AND SEARCH
// =================================

function filterGallery() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    visibleItems = [];

    items.forEach(item => {

        const category = item.dataset.category;

        const title = item.querySelector("h3")
            .textContent.toLowerCase();

        const description = item.querySelector(".image-info p")
            .textContent.toLowerCase();

        const categoryMatch =
            activeCategory === "all" ||
            category === activeCategory;

        const searchMatch =
            title.includes(searchText) ||
            description.includes(searchText);

        const shouldShow =
            categoryMatch && searchMatch;

        if (shouldShow) {

            item.classList.remove("hide");

            item.classList.remove("filter-in");

            // Restart animation

            void item.offsetWidth;

            item.classList.add("filter-in");

            visibleItems.push(item);

        } else {

            item.classList.remove("filter-in");

            item.classList.add("hide");

        }

    });

    updateCounter();

    updateEmptyMessage();

}


// =================================
// DYNAMIC IMAGE COUNTER
// =================================

function updateCounter() {

    const count = visibleItems.length;

    photoCount.textContent = count;

}


// =================================
// EMPTY RESULTS
// =================================

function updateEmptyMessage() {

    if (visibleItems.length === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


// =================================
// CATEGORY FILTER BUTTONS
// =================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        filterGallery();

    });

});


// =================================
// SEARCH FUNCTIONALITY
// =================================

searchInput.addEventListener("input", () => {

    filterGallery();

    if (searchInput.value.trim().length > 0) {

        clearSearch.classList.add("show");

    } else {

        clearSearch.classList.remove("show");

    }

});


// CLEAR SEARCH

clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    clearSearch.classList.remove("show");

    filterGallery();

    searchInput.focus();

});


// =================================
// OPEN LIGHTBOX
// =================================

function openLightbox(index) {

    if (visibleItems.length === 0) return;

    currentIndex = index;

    showImage();

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

    closeBtn.focus();

}


// =================================
// DISPLAY SELECTED IMAGE
// =================================

function showImage() {

    const selectedItem = visibleItems[currentIndex];

    if (!selectedItem) return;

    const image = selectedItem.querySelector("img");

    const title = selectedItem.querySelector("h3");

    lightboxImg.src = image.src;

    lightboxImg.alt = image.alt;

    caption.textContent = title.textContent;

    imageNumber.textContent =
        `IMAGE ${currentIndex + 1} OF ${visibleItems.length}`;

}


// =================================
// CLICK IMAGE TO OPEN LIGHTBOX
// =================================

items.forEach(item => {

    item.addEventListener("click", () => {

        const index = visibleItems.indexOf(item);

        if (index !== -1) {

            openLightbox(index);

        }

    });

});


// =================================
// NEXT IMAGE
// =================================

nextBtn.addEventListener("click", () => {

    if (visibleItems.length === 0) return;

    currentIndex =
        (currentIndex + 1) % visibleItems.length;

    showImage();

});


// =================================
// PREVIOUS IMAGE
// =================================

prevBtn.addEventListener("click", () => {

    if (visibleItems.length === 0) return;

    currentIndex =
        (currentIndex - 1 + visibleItems.length) %
        visibleItems.length;

    showImage();

});


// =================================
// CLOSE LIGHTBOX
// =================================

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


// CLOSE BUTTON

closeBtn.addEventListener("click", closeLightbox);


// CLICK OUTSIDE IMAGE

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// =================================
// KEYBOARD NAVIGATION
// =================================

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {

        nextBtn.click();

    }

    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (event.key === "Escape") {

        closeLightbox();

    }

});


// =================================
// INITIALIZE GALLERY
// =================================

filterGallery();

console.log("SNAPSPACE Gallery Loaded Successfully!");

