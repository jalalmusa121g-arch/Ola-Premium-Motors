/* =========================
   OLA PREMIUM MOTORS
   REAL INVENTORY
========================= */


const cars = [

    {
        name: "Mercedes-Benz GLK 350",
        brand: "Mercedes-Benz",
        year: "2015",
        transmission: "Automatic",
        fuel: "Petrol",
        price: "Contact for Price",

        images: [
            "images/glk1.jpg",
            "images/glk2.jpg",
            "images/glk3.jpg",
            "images/glk4.jpg",
            "images/glk5.jpg"
        ]
    },


    {
        name: "Mercedes-Benz GLE 43 AMG",
        brand: "Mercedes-Benz",
        year: "2017",
        transmission: "Automatic",
        fuel: "Petrol",
        price: "Contact for Price",

        images: [
            "images/gle1.jpg",
            "images/gle2.jpg",
            "images/gle3.jpg",
            "images/gle4.jpg",
            "images/gle5.jpg"
        ]
    },


    {
        name: "Lexus RX",
        brand: "Lexus",
        year: "2020",
        transmission: "Automatic",
        fuel: "Petrol",
        price: "Contact for Price",

        images: [
            "images/lexus1.jpg",
            "images/lexus2.jpg",
            "images/lexus3.jpg",
            "images/lexus4.jpg",
            "images/lexus5.jpg"
        ]
    },


    {
        name: "Honda",
        brand: "Honda",
        year: "Contact Dealer",
        transmission: "Automatic",
        fuel: "Petrol",
        price: "Contact for Price",

        images: [
            "images/honda.jpg"
        ]
    }

];


let currentCarIndex = 0;
let currentImageIndex = 0;


/* =========================
   DISPLAY CARS
========================= */

function displayCars(list) {

    const grid = document.getElementById("carsGrid");

    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
                background:white;
                border-radius:10px;
            ">

                <h3>No vehicle found</h3>

                <p style="color:#777;margin:10px 0 20px;">
                    We couldn't find that vehicle.
                </p>

                <a
                    href="https://wa.me/2348029911091?text=Hello%20Ola%20Premium%20Motors%2C%20I%20am%20looking%20for%20a%20vehicle."
                    target="_blank"
                    class="btn btn-gold">

                    💬 Ask on WhatsApp

                </a>

            </div>
        `;

        return;
    }


    list.forEach((car) => {

        const originalIndex = cars.indexOf(car);

        const card = document.createElement("div");

        card.className = "car-card";


        card.innerHTML = `

            <div class="car-image">

                <img
                    src="${car.images[0]}"
                    alt="${car.name}"
                    onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80'"
                >

                <div class="car-badge">
                    AVAILABLE
                </div>

            </div>


            <div class="car-content">

                <h3>
                    ${car.name}
                </h3>


                <div class="car-meta">

                    <span>📅 ${car.year}</span>

                    <span>⚙ ${car.transmission}</span>

                    <span>⛽ ${car.fuel}</span>

                </div>


                <div class="car-price">
                    ${car.price}
                </div>


                <button
                    class="details-btn"
                    onclick="openCarModal(${originalIndex})">

                    View Details →

                </button>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* =========================
   SEARCH
========================= */

function filterCars() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const brand =
        document
        .getElementById("brandFilter")
        .value;


    const filtered = cars.filter(car => {

        const matchesSearch =
            car.name
            .toLowerCase()
            .includes(search);


        const matchesBrand =
            brand === "all" ||
            car.brand === brand;


        return matchesSearch && matchesBrand;

    });


    displayCars(filtered);

}


document
    .getElementById("searchInput")
    .addEventListener("input", filterCars);


document
    .getElementById("brandFilter")
    .addEventListener("change", filterCars);


/* =========================
   OPEN CAR MODAL
========================= */

function openCarModal(index) {

    currentCarIndex = index;
    currentImageIndex = 0;


    const car = cars[index];


    document
        .getElementById("carModal")
        .style.display = "block";


    document
        .getElementById("modalCarName")
        .textContent = car.name;


    document
        .getElementById("modalCarPrice")
        .textContent = car.price;


    document
        .getElementById("modalCarDetails")
        .innerHTML = `

            <div style="
                display:grid;
                grid-template-columns:repeat(2,1fr);
                gap:10px;
                color:#555;
                font-size:14px;
            ">

                <div>
                    <strong>Brand:</strong>
                    ${car.brand}
                </div>

                <div>
                    <strong>Year:</strong>
                    ${car.year}
                </div>

                <div>
                    <strong>Transmission:</strong>
                    ${car.transmission}
                </div>

                <div>
                    <strong>Fuel:</strong>
                    ${car.fuel}
                </div>

            </div>

        `;


    const whatsappMessage =
        `Hello Ola Premium Motors, I am interested in the ${car.name}. Please send me more details.`;


    document
        .getElementById("modalWhatsapp")
        .href =
        "https://wa.me/2348029911091?text=" +
        encodeURIComponent(whatsappMessage);


    updateModalImage();

    createThumbnails();

}


/* =========================
   UPDATE MODAL IMAGE
========================= */

function updateModalImage() {

    const car = cars[currentCarIndex];

    const image =
        document.getElementById("modalCarImage");


    image.src =
        car.images[currentImageIndex];


    image.alt = car.name;


    updateActiveThumbnail();

}


/* =========================
   THUMBNAILS
========================= */

function createThumbnails() {

    const car = cars[currentCarIndex];

    const thumbs =
        document.getElementById("modalThumbs");


    thumbs.innerHTML = "";


    car.images.forEach((image, index) => {

        const img =
            document.createElement("img");


        img.src = image;

        img.alt = `${car.name} image ${index + 1}`;


        img.onclick = function () {

            currentImageIndex = index;

            updateModalImage();

        };


        thumbs.appendChild(img);

    });


    updateActiveThumbnail();

}


function updateActiveThumbnail() {

    const thumbnails =
        document.querySelectorAll(
            "#modalThumbs img"
        );


    thumbnails.forEach((thumb, index) => {

        thumb.classList.toggle(
            "active",
            index === currentImageIndex
        );

    });

}


/* =========================
   NEXT IMAGE
========================= */

function nextImage() {

    const car = cars[currentCarIndex];


    currentImageIndex =
        (currentImageIndex + 1)
        % car.images.length;


    updateModalImage();

}


/* =========================
   PREVIOUS IMAGE
========================= */

function previousImage() {

    const car = cars[currentCarIndex];


    currentImageIndex =
        (currentImageIndex - 1 + car.images.length)
        % car.images.length;


    updateModalImage();

}


/* =========================
   CLOSE MODAL
========================= */

function closeCarModal() {

    document
        .getElementById("carModal")
        .style.display = "none";

}


/* CLOSE WHEN CLICKING OUTSIDE */

document
    .getElementById("carModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeCarModal();

        }

    });


/* ESC KEY */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeCarModal();

    }

});


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("active");

}


/* CLOSE MENU AFTER CLICK */

document
    .querySelectorAll("#navMenu a")
    .forEach(link => {

        link.addEventListener("click", function() {

            document
                .getElementById("navMenu")
                .classList.remove("active");

        });

    });


/* =========================
   START WEBSITE
========================= */

displayCars(cars);