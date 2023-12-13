interface DonutProvider {
    id: number;
    name: string;
    category: string;
    specialty: string;
    location: string;
    priceRange: string;
    image: string;
    gender: string;
}

let allProviders: DonutProvider[] = [];

document.addEventListener('DOMContentLoaded', () => {
    displayCurrentUser();
    fetchDonutProviders();
    initializeSlider();
});

function displayCurrentUser() {
    const currentUserData = localStorage.getItem("currentUserData");
    if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        console.log(`Welcome, ${currentUser.fname} ${currentUser.lname}`);
    }
}

function initializeSlider() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slider-content');
    const totalSlides = slides.length;

    function goToSlide(slideIndex: number) {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
        });
        currentSlideIndex = slideIndex;
    }

    function nextSlide() {
        let nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
        goToSlide(nextSlideIndex);
    }

    setInterval(nextSlide, 3000);
}

function fetchDonutProviders() {
    const apiUrl = 'https://randomuser.me/api/?results=100';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            Promise.all([fetchDonutFilters(), fetchDonutSpecialties()]).then(values => {
                const [filters, specialties] = values;
                displayFilterOptions(filters, specialties); // Populate filter sections
                allProviders = parseApiResponse(data, filters, specialties);
                displayDonutProviders(allProviders);
            });
        } else {
            console.error('HTTP Error:', xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send();
}

function parseApiResponse(apiResponse: any, filters: string[], specialties: string[]): DonutProvider[] {
    const results = apiResponse.results;
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
            gender: result.gender
        };
    });
}

function fetchDonutFilters(): Promise<string[]> {
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

function fetchDonutSpecialties(): Promise<string[]> {
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

function displayDonutProviders(data: DonutProvider[]) {
    const productCardsContainer = document.querySelector('.product-cards');
    if (!productCardsContainer) return;

    productCardsContainer.innerHTML = '';

    data.forEach(provider => {
        const card = createDonutProviderCard(provider);
        productCardsContainer.appendChild(card);
    });
}

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

    const addToCartButton = card.querySelector('.add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addToCart(provider.id); 
        });
    }

    return card;
}


function addToCart(providerId: number) {
    console.log(`Adding provider with ID ${providerId} to cart.`);
}

document.getElementById('apply-filters')?.addEventListener('click', () => {
    const selectedCategories = getSelectedFilters('category-filters');
    const selectedSpecialties = getSelectedFilters('specialty-filters');
    const selectedGenders = getSelectedFilters('gender-filters');

    applyFilters({
        categories: selectedCategories,
        specialties: selectedSpecialties,
        genders: selectedGenders,
    });
});

function getSelectedFilters(filterContainerId: string): string[] {
    const selectedFilters: string[] = [];
    const filterContainer = document.getElementById(filterContainerId);

    if (filterContainer) {
        const checkboxes = filterContainer.querySelectorAll('input[type="checkbox"]:checked');

        checkboxes.forEach(checkbox => {
            const inputElement = checkbox as HTMLInputElement; // Type casting
            selectedFilters.push(inputElement.value);
        });
    }

    return selectedFilters;
}

function applyFilters(selectedFilters: any) {
    const filteredProviders = allProviders.filter(provider => {
        return (
            (selectedFilters.categories.length === 0 || selectedFilters.categories.includes(provider.category)) &&
            (selectedFilters.specialties.length === 0 || selectedFilters.specialties.includes(provider.specialty)) &&
            (selectedFilters.genders.length === 0 || selectedFilters.genders.includes(provider.gender)) 
                    );
    });

    displayDonutProviders(filteredProviders);
}

// New function to extract unique values from the API data
function extractUniqueValues(dataArray: any[], key: string): string[] {
    const uniqueValues = new Set<string>();
    dataArray.forEach(item => {
        if (item[key]) {
            uniqueValues.add(item[key].toString());
        }
    });
    return Array.from(uniqueValues).sort();
}

function displayFilterOptions(filters: string[], specialties: string[]) {
    populateFilterSection('category-filters', filters, 'category');
    populateFilterSection('specialty-filters', specialties, 'specialty');
    populateFilterSection('gender-filters', ['male', 'female'], 'gender');
}

function populateFilterSection(containerId: string, options: string[], groupName: string) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container not found: ${containerId}`);
        return;
    }

    options.forEach(option => {
        const checkbox = createCheckbox(option, groupName);
        container.appendChild(checkbox);
    });
}


function createCheckbox(labelText: string, groupName: string): HTMLElement {
    const container = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = labelText;
    checkbox.name = groupName;
    const label = document.createElement('label');
    label.textContent = labelText;

    container.appendChild(checkbox);
    container.appendChild(label);

    return container;
}
