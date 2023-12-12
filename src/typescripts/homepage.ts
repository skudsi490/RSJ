// Define the DonutProvider interface
interface DonutProvider {
    id: number;
    name: string;
    category: string;
    specialty: string;
    location: string;
    priceRange: string;
    image: string;
}

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
                const data: any = JSON.parse(xhr.responseText);

                Promise.all([fetchDonutFilters(), fetchDonutSpecialties()]).then(values => {
                    const [filters, specialties] = values;
                    console.log('Filters:', filters); 
                    console.log('Specialties:', specialties); 

                    const donutProviders = parseApiResponse(data, filters, specialties);
                    displayDonutProviders(donutProviders);
                });
            } catch (error) {
                console.error('Error parsing data:', error);
            }
        } else {
            console.error('HTTP Error:', xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send();
}

// Parses the API response and assigns filters and specialties to each provider
function parseApiResponse(apiResponse: any, filters: string[], specialties: string[]): DonutProvider[] {
    const results: any[] = apiResponse.results;
    return results.map((result: any, index: number) => {
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
async function fetchDonutFilters(): Promise<string[]> {
    const filtersFilePath = '../../build/data/donut-filters.json';
    try {
        const response = await fetch(filtersFilePath);
        const data = await response.json();
        return data.filters;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Fetches donut specialties
async function fetchDonutSpecialties(): Promise<string[]> {
    const specialtiesFilePath = '../../build/data/donut-specialties.json';
    try {
        const response = await fetch(specialtiesFilePath);
        const data = await response.json();
        return data.specialties;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Displays donut providers on the webpage
function displayDonutProviders(data: DonutProvider[]) {
    const productCardsContainer = document.querySelector('.product-cards');
    if (!productCardsContainer) return;

    productCardsContainer.innerHTML = '';

    data.forEach(provider => {
        const card = createDonutProviderCard(provider);
        productCardsContainer.appendChild(card);
    });
}

// Creates a card element for a donut provider
function createDonutProviderCard(provider: DonutProvider): HTMLElement {
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
function addToCart(providerId: number) {
    // Implement the logic to add the selected provider to the cart
    console.log(`Adding provider with ID ${providerId} to cart.`);
    // Here you can implement further logic, like updating a cart state or storing in local storage
}

