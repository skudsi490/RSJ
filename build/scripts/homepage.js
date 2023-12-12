"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This function is called when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the custom API endpoint
    fetchDonutProviders();
});
// Fetches donut providers using AJAX
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
// Parses the API response and assigns filters and specialties to each provider
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
// Fetches donut filters
function fetchDonutFilters() {
    return __awaiter(this, void 0, void 0, function* () {
        const filtersFilePath = '../../build/data/donut-filters.json';
        try {
            const response = yield fetch(filtersFilePath);
            const data = yield response.json();
            return data.filters;
        }
        catch (error) {
            console.error('Error:', error);
            return [];
        }
    });
}
// Fetches donut specialties
function fetchDonutSpecialties() {
    return __awaiter(this, void 0, void 0, function* () {
        const specialtiesFilePath = '../../build/data/donut-specialties.json';
        try {
            const response = yield fetch(specialtiesFilePath);
            const data = yield response.json();
            return data.specialties;
        }
        catch (error) {
            console.error('Error:', error);
            return [];
        }
    });
}
// Displays donut providers on the webpage
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
// Creates a card element for a donut provider
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
    // Add event listener for the "Add to Cart" button
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
// Example function to handle adding a provider to the cart
function addToCart(providerId) {
    // Implement the logic to add the selected provider to the cart
    console.log(`Adding provider with ID ${providerId} to cart.`);
    // Here you can implement further logic, like updating a cart state or storing in local storage
}
