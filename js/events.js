const items = [
    { img:'img/jsc.jpg', 
      title: 'Jetisu Startup Challenge', 
      description: 'Startup competition for founders from the Jetisu region who are approaching solutions in AgriTech, TravelTech, Creative Industries.', 
      deadline: ' June 13, 2023', 
      city: 'Taldykorgan', 
      page:'jsc.html',
      eventType:'competition' },
    
    /*{ img:'img/tfi.jpg', 
      title: 'Time for Industry 4.0', 
      description: "Don't miss your chance - The time for Industry 4.0 has come!", 
      deadline: ' May 17, 2023', 
      city: 'Astana', 
      page:'tfi.html',
      eventType:'hackathon' },*/    
    
    { img:'img/Decentrathon.jpg', 
      title: 'Decentraton', 
      description: 'Get ready for the biggest Web3 hackathon in Central Asia - Decentrathon!',
      deadline: ' June 14, 2023', 
      city: 'Astana', 
      page:'decentrathon.html',
      eventType:'hackathon' },
    
    { img:'img/learning hack.png', 
      title: 'Learning Hack 2023', 
      description: 'The main event of the year for developers of educational products.',
      deadline: ' June 15, 2023', 
      city: 'Almaty',
      page:'learninghack.html',
      eventType:'hackathon'},
    {
      img:'img/industry4.0.jpg', 
      title: 'Industry 4.0 Startup Battle', 
      description: 'This event is for startups in the field of Industry 4.0',
      deadline: ' June 16, 2023', 
      city: 'Almaty',
      page:'industry.html',
      eventType:'competition'},
    
    {
        img:'img/svp.jpg', 
        title: 'SportTech vs PropTech', 
        description: 'The main event of the year for developers of educational products.',
        deadline: ' June 22, 2023', 
        city: 'Karaganda',
        page:'svp.html',
        eventType:'hackathon'},
    
    // Add more items as objects
];

const dataContainer = document.getElementById('data-container');
const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
const pagination = document.querySelector('.pagination');
const cityFilter = document.getElementById('city-filter');
const eventTypeFilter = document.getElementById('event-type-filter');
const itemsPerPage = 6;
let currentPage = 1;
let filteredItems = items.slice();
function displayItems(items, container) {
    container.innerHTML = '';
    
    if (!items || items.length === 0) {
        container.innerHTML = '<div class="noevf">No events found.</div>';
        return;
    }

    items.forEach(item => {
        const card = `
        <div class="col-md-4 mb-4">
        <div class="card">
            <img src="${item.img}" class="card-img-top" alt="Event 1">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text c1">${item.description}</p>
                <p class="card-text cc1"><strong>City:</strong> ${item.city}</p>
                <p class="cc1"><strong>Deadline:</strong>${item.deadline}</p>
                <a href="${item.page}" class="btn btn-primary bt1">View Details</a>
            </div>
        </div>
    </div>
        `;

        container.insertAdjacentHTML('beforeend', card);
    });
}

function paginate(items, itemsPerPage) {
    const numberOfPages = Math.ceil(items.length / itemsPerPage);
    const paginatedItems = Array.from({ length: numberOfPages }, (_, i) => {
        const start = i * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    });

    return paginatedItems;
}

function displayPagination(paginatedItems) {
    pagination.innerHTML = ''; // clear the existing pagination buttons

    // Add previous button
    pagination.insertAdjacentHTML('beforeend', `
        <li class="page-item" id="previous-li">
            <a class="page-link" href="#" id="previous-btn">Prev</a>
        </li>
    `);

    // Add page number buttons
    paginatedItems.forEach((_, index) => {
        const pageNumber = `
            <li class="page-item">
                <a class="page-link" href="#" data-page="${index + 1}">${index + 1}</a>
            </li>
        `;

        pagination.insertAdjacentHTML('beforeend', pageNumber);
    });

    // Add next button
    pagination.insertAdjacentHTML('beforeend', `
        <li class="page-item" id="next-li">
            <a class="page-link" href="#" id="next-btn">Next</a>
        </li>
    `);
}

function updateUI(page) {
    const paginatedItems = paginate(filteredItems, itemsPerPage);
    displayItems(paginatedItems[page - 1], dataContainer);
    currentPage = page;

    pagination.querySelectorAll('.page-item').forEach((item) => {
        if (item.querySelector(`[data-page="${currentPage}"]`)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const previousLi = document.getElementById('previous-li');
    const nextLi = document.getElementById('next-li');

    if (currentPage === 1) {
        previousLi.classList.add('disabled');
    } else {
        previousLi.classList.remove('disabled');
    }

    if (currentPage === paginatedItems.length) {
        nextLi.classList.add('disabled');
    } else {
        nextLi.classList.remove('disabled');
    }
}

function filterItems() {
    const selectedCity = cityFilter.value;
    const selectedEventType = eventTypeFilter.value;

    if (selectedCity === 'all' && selectedEventType === 'all') {
        filteredItems = items.slice();
    } else {
        filteredItems = items.filter(item => {
            const cityMatch = selectedCity === 'all' || item.city === selectedCity;
            const eventTypeMatch = selectedEventType === 'all' || item.eventType === selectedEventType;
            return cityMatch && eventTypeMatch;
        });
    }

    currentPage = 1;
    updateUI(currentPage);
    displayPagination(paginate(filteredItems, itemsPerPage));
}
cityFilter.addEventListener('change', filterItems);
eventTypeFilter.addEventListener('change', filterItems);
// Add event filter options

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение отправки формы

    const emailInput = document.getElementById('exampleInputEmail1');
    const email = emailInput.value;

    // Создаем объект FormData для отправки данных формы
    const formData = new FormData();
    formData.append('email', email);

    // Отправляем запрос на сервер
    fetch('php/subscribe.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      alert(result); // Выводим сообщение с результатом
      emailInput.value = ''; // Очищаем поле ввода email
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  });





pagination.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target.closest('.page-link');    
    if (!target) return;
    if (target.id === 'previous-btn' && currentPage > 1) 
    {
      updateUI(currentPage - 1);
    } 
    else if (target.id === 'next-btn' && currentPage < paginate(filteredItems, itemsPerPage).length) 
    {
     updateUI(currentPage + 1);
    } 
     else if (!target.id) 
    {
     const pageNumber = parseInt(target.dataset.page, 10);
     updateUI(pageNumber);
    }
});


updateUI(currentPage);
displayPagination(paginate(filteredItems, itemsPerPage));

