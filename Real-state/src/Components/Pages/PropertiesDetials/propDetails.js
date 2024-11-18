const properties = [
  {
    id: "HZ27",
    title: "Gorgeous Villa Bay View",
    address: "1421 San Pedro St, Los Angeles, CA 90015",
    price: "$11000/mo",
    description:
      ["Evans Tower very high demand corner junior one bedroom plus a large balcony boasting full open NYC views. You need to see the views to believe them. Mint condition with new hardwood floors. Lots of closets plus washer and dryer.",
        "Evans Tower very high demand corner junior one bedroom plus a large balcony boasting full open NYC views. You need to see the views to believe them. Mint condition with new hardwood floors. Lots of closets plus washer and dryer.","Evans Tower very high demand corner junior one bedroom plus a large balcony boasting full open NYC views. You need to see the views to believe them. Mint condition with new hardwood floors. Lots of closets plus washer and dryer.",
        "Evans Tower very high demand corner junior one bedroom plus a large balcony boasting full open NYC views. You need to see the views to believe them. Mint condition with new hardwood floors. Lots of closets plus washer and dryer.",],
    propertyDetails: {
      id:"HZ27",
      propertyType: "Apartment",
      price: "$130,000",
      bedrooms: 8,
      bathrooms: 4,
      propertySize: "1560 Sq Ft",
      garage: 2,
      garageSize: "200 Sq Ft",
      propertyStatus: "For Sale",
      yearBuilt: "2016-01-09",
    },
    additionalDetails: {
      deposit: "20%",
      lastRemodeledYear: 1987,
      poolSize: "300 Sqft",
      amenities: "Clubhouse",
      additionalRooms: "Guest Bath",
      equipment: "Grill - Gas",
      
    },
    features: [
      "Air Conditioning",
      "Barbeque",
      "Dryer",
      "Gym",
      "Lawn",
      "Microwave",
      "Outdoor Shower",
      "Refrigerator",
      "Sauna",
      "Swimming Pool",
      "TV Cable",
      "Washer",
      "WiFi",
      "Window Coverings",
    ],
    location: {
      address: "1421 San Pedro St, Los Angeles, CA 90015",
      coordinates: {
        lat: 34.048927,
        lng: -118.258178,
      },
    },
    images: [
      "/assets/images/1.jpg",
      "/assets/images/1.jpg",
      "/assets/images/1.jpg",
      "/assets/images/1.jpg",
      "/assets/images/1.jpg",
      "/assets/images/1.jpg",
      "/assets/images/1.jpg",
    ],
    listedBy: {
      name: "Samuel Williams",
      phone: "(123) 456-7890",
      email: "info@findhouse.com",
      profileImage: "/assets/images/1.jpg",
    },
  },
];
const featuredProperties = [
    {
        id: "FP1",
        title: "Luxury Family Home",
        price: "$13000/mo",
        images: ["/assets/images/1.jpg"],
        propertyDetails: {
            propertyStatus: "For Sale",
            bedrooms: 4,
            bathrooms: 3,
            propertySize: "3500 Sq Ft"
        }
    },
    {
        id: "FP2",
        title: "Modern Condo in City Center",
        price: "$8500/mo",
        images: ["/assets/images/1.jpg"],
        propertyDetails: {
            propertyStatus: "For Rent",
            bedrooms: 2,
            bathrooms: 2,
            propertySize: "1800 Sq Ft"
        }
    },
    {
        id: "FP3",
        title: "Beachside Villa",
        price: "$25000/mo",
        images: ["/assets/images/1.jpg"],
        propertyDetails: {
            propertyStatus: "For Sale",
            bedrooms: 5,
            bathrooms: 4,
            propertySize: "4200 Sq Ft"
        }
    }
];
const propertyCategories = [
    { name: "Apartment", count: 6 },
    { name: "Condo", count: 12 },
    { name: "Family House", count: 8 },
    { name: "Modern Villa", count: 26 },
    { name: "Town House", count: 89 }
];
const recentlyViewedProperties = [
    {
        id: "RV1",
        title: "Luxury Family Home",
        price: "$19000/mo",
        images: ["/assets/images/1.jpg"],
        propertyDetails: {
            bedrooms: 4,
            bathrooms: 2,
            propertySize: "5280 SqFt"
        }
    },
    {
        id: "RV2",
        title: "Luxury Family Home",
        price: "$12000/mo",
        images: ["/assets/images/1.jpg"],
        propertyDetails: {
            bedrooms: 4,
            bathrooms: 2,
            propertySize: "5280 SqFt"
        }
    },
    {
        id: "RV3",
        title: "Renovated Apartment",
        price: "$11000/mo",
        images: ["/assets/images/1.jpg"],
        propertyDetails: {
            bedrooms: 3,
            bathrooms: 2,
            propertySize: "2750 SqFt"
        }
    }
];


function displayPropertyTitle(property) {
  const propertySection = document.getElementById("property-section");
  const priceSection = document.getElementById("price-section");

  // Property title HTML
  const propertyTitleHTML = `
        <div class="Text-Find-props">
            <div class="flex flex-col my-14 space-y-2 text-left">
                <h1 class="font-sans text-3xl text-gray-700"
                    style="font-family: 'Nunito', sans-serif;font-weight: 700;">
                    ${property.title}
                </h1>
                <p class="text-lg text-gray-500">
                    ${property.address}
                </p>
            </div>
        </div>
    `;
  const priceSectionHtml = `
      <div class="Text-Find-props">
            <div class="flex flex-col my-14 space-y-2 text-left">
                <h1 class="font-sans text-3xl text-gray-700"
                    style="font-family: 'Nunito', sans-serif;font-weight: 700;">
                    ${property.price}
                </h1>
                 </div>
                  </div>
                
    `;
  priceSection.innerHTML = priceSectionHtml;
  propertySection.innerHTML = propertyTitleHTML;
}
function displayPropertyImages(property) {
    const mainImage = document.getElementById("main-image");
    const subImages = document.getElementById("sub-images");
  
    // Main Image with rounded corners, centered
    const mainImageHTML = `
          <img class="h-[70vh] w-full object-cover rounded-lg mx-auto" src="${property.images[0]}" alt="Main Property Image">
      `;
  
    let subImagesHTML = `
      <div class="flex flex-wrap flex-col justify-between h-[70vh] items-center"> <!-- Add 'items-center' to center the thumbnails -->
    `;
  
    // For loop for displaying thumbnails with rounded corners, centered
    for (let i = 1; i < property.images.length; i++) {
      subImagesHTML += `
           <div class="cursor-pointer w-[45%] h-[30%] flex items-center justify-center">
               <img src="${property.images[i]}" alt="Property Thumbnail ${i + 1}" class="w-full h-full object-cover rounded-lg thumbnail" data-index="${i}">
           </div>
       `;
    }
  
    subImagesHTML += `</div>`;
  
    mainImage.innerHTML = mainImageHTML;
    subImages.innerHTML = subImagesHTML;
  }
  function displayPropertyDescription(property) {
    const propertySection = document.getElementById("paragraphs");
  
    // Ensure the description is an array of paragraphs
    const paragraphs = Array.isArray(property.description) ? property.description : [property.description];

    let descriptionHTML = `
        <div class="my-8 text-left">
    `;

    // Loop through each paragraph in the description array
    paragraphs.forEach(paragraph => {
        descriptionHTML += `
            <p class="text-lg text-gray-500 mt-8">
                ${paragraph}
            </p>
        `;
    });

    descriptionHTML += `</div>`;

    // Append the description to the property section
    propertySection.innerHTML += descriptionHTML;
}

function displayPropertyDetails(property) {
    const detailsSection = document.getElementById('Detials');

    // Extract property details
    const allDetails = { ...property.propertyDetails };
    const detailEntries = Object.entries(allDetails);
    
    // Determine the number of columns (3) and rows needed
    const numCols = 3;
    const numRows = Math.ceil(detailEntries.length / numCols);

    // Create an array to group details into rows
    let columns = Array.from({ length: numCols }, () => []);

    // Fill each column with items by row
    detailEntries.forEach((detail, index) => {
        columns[Math.floor(index / numRows)].push(detail);
    });

    let detailsHTML = `
        <div class="grid grid-cols-3 gap-4">
    `;

    // Loop through each row and create HTML for each row
    for (let i = 0; i < numRows; i++) {
        for (let col = 0; col < numCols; col++) {
            const detail = columns[col][i];
            if (detail) {
                const [key, value] = detail;
                const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
                    .replace(/^./, str => str.toUpperCase());  // Capitalize the first letter

                detailsHTML += `
                    <div class="flex">
                        <span class="font-semibold text-gray-500 mr-1">${formattedKey}:</span>
                        <span class="font-semibold text-gray-600">${value}</span>
                    </div>
                `;
            } else {
                // Add an empty div if there's no data for this grid cell
                detailsHTML += `<div></div>`;
            }
        }
    }

    detailsHTML += `</div>`;

    // Append the details to the details section
    detailsSection.innerHTML = detailsHTML;
}
function displayPropertyAddDetails(property) {
    const detailsSection = document.getElementById('AddDetials');

    // Extract property details
    const allDetails = { ...property.additionalDetails };
    const detailEntries = Object.entries(allDetails);
    
    // Determine the number of columns (3) and rows needed
    const numCols = 3;
    const numRows = Math.ceil(detailEntries.length / numCols);

    // Create an array to group details into rows
    let columns = Array.from({ length: numCols }, () => []);

    // Fill each column with items by row
    detailEntries.forEach((detail, index) => {
        columns[Math.floor(index / numRows)].push(detail);
    });

    let detailsHTML = `
        <div class="grid grid-cols-3 gap-4">
    `;

    // Loop through each row and create HTML for each row
    for (let i = 0; i < numRows; i++) {
        for (let col = 0; col < numCols; col++) {
            const detail = columns[col][i];
            if (detail) {
                const [key, value] = detail;
                const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
                    .replace(/^./, str => str.toUpperCase());  // Capitalize the first letter

                detailsHTML += `
                    <div class="flex">
                        <span class="font-semibold text-gray-500 mr-1">${formattedKey}:</span>
                        <span class="font-semibold text-gray-600">${value}</span>
                    </div>
                `;
            } else {
                // Add an empty div if there's no data for this grid cell
                detailsHTML += `<div></div>`;
            }
        }
    }

    detailsHTML += `</div>`;

    // Append the details to the details section
    detailsSection.innerHTML = detailsHTML;
}
function displayFeatures(property) {
    const featuresSection = document.getElementById('Features');

    // Extract features array
    const features = property.features;

    // Determine the number of columns (based on total features and rows)
    const numCols = Math.ceil(features.length / 5); // 5 rows
    const numRows = 5;

    // Create an array to hold the features in a column-first order
    let columns = Array.from({ length: numCols }, () => []);

    // Fill each column with items by row
    features.forEach((feature, index) => {
        columns[Math.floor(index / numRows)].push(feature);
    });

    let featuresHTML = `
        <div class="grid grid-cols-${numCols} gap-4">
    `;

    // Loop through each row and create HTML for each row in all columns
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const feature = columns[col][row];
            if (feature) {
                featuresHTML += `
                    <div class="flex items-center">
                        <img src="/assets/images/check.png" alt="Checkmark" class="h-4 w-4 mr-2" /> 
                        <span class="text-gray-500 text-base">${feature}</span>
                    </div>
                `;
            } else {
                // Add an empty div if there's no feature for this grid cell
                featuresHTML += `<div></div>`;
            }
        }
    }

    featuresHTML += `</div>`;

    // Append the features to the features section
    featuresSection.innerHTML = featuresHTML;
}
function displayAddress(property){
    const addrssSection = document.getElementById('address');
    console.log(addrssSection);
    
    addressHTML = `<p>${property.address}</p>`

    addrssSection.innerHTML = addressHTML

}
function displayAgentForm(property) {
    const formSection = document.getElementById('form-section'); // This is where the form will be appended

    const agent = property.listedBy; 
    console.log(agent);
    

    const formHTML = `
        <div class="bg-white">
            <div class="flex items-center mb-4">
                <img src="${agent.profileImage}" alt="Agent" class="w-16 h-16 rounded-full mr-4">
                <div>
                    <h6 class="text-lg font-semibold text-gray-700">${agent.name}</h6>
                    <p class="text-sm text-gray-500">${agent.phone}</p>
                    <p class="text-sm text-gray-500">${agent.email}</p>
                    <a href="#" class="text-red-500 text-sm">View My Listing</a>
                </div>
            </div>

            <form action="#" method="POST" class="space-y-4">
                <div>
                    <input type="text" name="name" placeholder="Your Name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                <div>
                    <input type="text" name="phone" placeholder="Phone" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                <div>
                    <input type="email" name="email" placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                <div>
                    <textarea name="message" placeholder="Your Message" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" rows="4"></textarea>
                </div>
                <div>
                    <button type="submit" class="w-full bg-red-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Search</button>
                </div>
            </form>
        </div>
    `;

    formSection.innerHTML = formHTML;
}

function displayFeaturedProperties(properties) {
    const featuredSection = document.getElementById('featured-section');
    
    let featuredHTML = `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h6 class="text-lg font-sans text-gray-700 font-semibold mb-5">Featured Properties</h6>
            <div class="relative carousel-container">
                <div class="carousel">
    `;

    properties.forEach((property, index) => {
        // Display only the first image by default; others are hidden
        featuredHTML += `
            <div class="carousel-item ${index === 0 ? 'block' : 'hidden'}">
                <div class="relative">
                    <img src="${property.images[0]}" alt="Property Image" class="rounded-xl">
                    <div class="absolute top-0 left-0 p-2">
                        <span class="bg-gray-800 text-white px-2 py-1 text-sm rounded">Featured</span>
                        <span class="bg-red-500 text-white px-2 py-1 text-sm rounded ml-2">${property.propertyDetails.propertyStatus}</span>
                    </div>
                    <div class="absolute bottom-0 left-0 p-4 text-white">
                        <h3 class="text-xl font-semibold">${property.price}</h3>
                        <p>${property.title}</p>
                    </div>
                </div>
            </div>
        `;
    });

    featuredHTML += `
            </div>
            <div class="flex justify-center mt-4 space-x-2">
    `;

    // Create the navigation points (indicators)
    properties.forEach((_, index) => {
        featuredHTML += `
            <span class="carousel-indicator h-3 w-3 rounded-full ${index === 0 ? 'bg-gray-800' : 'bg-gray-300'} cursor-pointer" data-index="${index}"></span>
        `;
    });

    featuredHTML += `
            </div>
        </div>
    `;

    featuredSection.innerHTML = featuredHTML;

    // JavaScript to handle carousel navigation
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = indicator.getAttribute('data-index');

            // Hide all items and reset indicators
            items.forEach(item => item.classList.add('hidden'));
            indicators.forEach(ind => ind.classList.remove('bg-gray-800'));
            indicators.forEach(ind => ind.classList.add('bg-gray-300'));

            // Show the selected item and activate the corresponding indicator
            items[index].classList.remove('hidden');
            indicators[index].classList.remove('bg-gray-300');
            indicators[index].classList.add('bg-gray-800');
        });
    });
}
function displayCategories(categories) {
    const categoriesSection = document.getElementById('categories-section');

    let categoriesHTML = `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h6 class="text-lg font-sans text-gray-700 font-semibold mb-5">Categories Property</h6>
            <ul class="space-y-3">
    `;

    categories.forEach(category => {
        categoriesHTML += `
            <li class="flex justify-between items-center">
                <div class="flex items-center">
                    <!-- Arrow Icon -->
                    <span class="mr-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                    <!-- Category Name -->
                    <a href="#" class="text-gray-700">${category.name}</a>
                </div>
                <span class="text-gray-500">${category.count} properties</span>
            </li>
        `;
    });

    categoriesHTML += `</ul></div>`;

    categoriesSection.innerHTML = categoriesHTML;
}
function displayRecentlyViewed(recentlyViewed) {
    const recentlyViewedSection = document.getElementById('recently-viewed-section');

    let recentlyViewedHTML = `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h6 class="text-lg font-sans text-gray-700 font-semibold mb-5">Recently Viewed</h6>
            <ul class="space-y-4">
    `;

    recentlyViewed.forEach(property => {
        recentlyViewedHTML += `
            <li class="flex items-center space-x-4">
                <img src="${property.images[0]}" alt="Property Image" class="w-52 h-32 rounded-lg object-cover">
                <div>
                    <h4 class="text-red-500">${property.price}/mo</h4>
                    <p class="text-gray-700">${property.title}</p>
                    <p class="text-gray-500 text-sm">Beds: ${property.propertyDetails.bedrooms} Baths: ${property.propertyDetails.bathrooms} SqFt: ${property.propertyDetails.propertySize}</p>
                </div>
            </li>
        `;
    });

    recentlyViewedHTML += `</ul></div>`;

    recentlyViewedSection.innerHTML = recentlyViewedHTML;
}




displayAgentForm(properties[0]);
displayAddress(properties[0])
displayFeatures(properties[0]);
displayPropertyAddDetails(properties[0])
displayPropertyDetails(properties[0])
displayPropertyDescription(properties[0])
displayPropertyTitle(properties[0]);
displayPropertyImages(properties[0]);
displayFeaturedProperties(featuredProperties);
displayCategories(propertyCategories);
displayRecentlyViewed(recentlyViewedProperties)