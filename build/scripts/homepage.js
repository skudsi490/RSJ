"use strict";
function initializeSlider() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slider-content');
    const totalSlides = slides.length;
    function goToSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
        });
        currentSlideIndex = slideIndex;
    }
    function nextSlide() {
        let nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
        goToSlide(nextSlideIndex);
    }
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
}
function fetchDonutProviders() {
    const apiUrl = 'https://randomuser.me/api/?results=10';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                Promise.all([fetchDonutFilters(), fetchDonutSpecialties()]).then(values => {
                    const [filters, specialties] = values;
                    console.log('Filters:', filters);
                    console.log('Specialties:', specialties);
                    const donutProviders = parseApiResponse(data, filters, specialties);
                    displayDonutProviders(donutProviders);
                });
            }
            catch (error) {
                console.error('Error parsing data:', error);
            }
        }
        else {
            console.error('HTTP Error:', xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network error occurred');
    };
    xhr.send();
}
function parseApiResponse(apiResponse, filters, specialties) {
    const results = apiResponse.results;
    return results.map((result, index) => {
        const randomFilter = filters[Math.floor(Math.random() * filters.length)];
        const randomSpecialty = specialties[Math.floor(Math.random() * specialties.length)];
        return {
            id: index + 1,
            name: `${result.name.first} ${result.name.last}`,
            category: randomFilter,
            specialty: randomSpecialty,
            location: `${result.location.city}, ${result.location.country}`,
            priceRange: '$$$',
            image: result.picture.large,
        };
    });
}
function fetchDonutFilters() {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        const filtersFilePath = '../../build/data/donut-filters.json';
        xhr.open('GET', filtersFilePath, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resolve(data.filters);
            }
        };
        xhr.send();
    });
}
function fetchDonutSpecialties() {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        const specialtiesFilePath = '../../build/data/donut-specialties.json';
        xhr.open('GET', specialtiesFilePath, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resolve(data.specialties);
            }
        };
        xhr.send();
    });
}
function displayDonutProviders(data) {
    const productCardsContainer = document.querySelector('.product-cards');
    if (!productCardsContainer)
        return;
    productCardsContainer.innerHTML = '';
    data.forEach(provider => {
        const card = createDonutProviderCard(provider);
        productCardsContainer.appendChild(card);
    });
}
function createDonutProviderCard(provider) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${provider.image}" alt="${provider.name}" class="provider-image">
        <h3>${provider.name}</h3>
        <p>Category: ${provider.category}</p>
        <p>Specialty: ${provider.specialty}</p>
        <p>Location: ${provider.location}</p>
        <p>Price Range: ${provider.priceRange}</p>
        <button class="add-to-cart-button" data-provider-id="${provider.id}">Add to Cart</button>
    `;
    const addToCartButton = card.querySelector('.add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const providerId = addToCartButton.getAttribute('data-provider-id');
            if (providerId) {
                addToCart(parseInt(providerId));
            }
        });
    }
    return card;
}
function addToCart(providerId) {
    console.log(`Adding provider with ID ${providerId} to cart.`);
}
fetchDonutProviders();
initializeSlider();
