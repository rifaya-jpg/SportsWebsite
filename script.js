const categoryCards = document.querySelectorAll('.cat-card');
const categorySelection = document.getElementById('categories-selection');
const eventsSection = document.getElementById('events');
const eventCards = document.querySelectorAll('.event-card');
const backButton = document.getElementById('back-button');
const activeTitle = document.getElementById('active-category-title');

//Click event for category cards
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedcategory = card.dataset.category;

        // Switch screens: Hide home view, show events view
        categorySelection.classList.add('hidden');
        eventsSection.classList.remove('hidden');

        //Update title to match chosen category
        const categoryName = card.querySelector('h3').textContent;
        if (activeTitle) {
            activeTitle.textContent = categoryName + ' Events';
        }
        // Show only matching event cards 
        eventCards.forEach(eventCard => {
            if (eventCard.classList.contains(selectedcategory)) {
                eventCard.style.display = 'block';
            } else {
                eventCard.style.display = 'none';
            }
        });
    });
});
// Live search filtering 
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {const query = searchInput.value.toLocaleLowerCase().trim();

    if (query === '') {
        eventsSection.classList.add('hidden');
        categorySelection.classList.remove('hidden');
        return;
    }

    categorySelection.classList.add('hidden');
    eventsSection.classList.remove('hidden');
    if (activeTitle) {
        activeTitle.textContent = 'Search results "' + searchInput.value + '"';
    }
    eventCards.forEach(eventCard => {
        const text = eventCard.textContent.toLowerCase();
        eventCard.style.display = text.includes(query) ? 'block' : 'none';
    });
});
// Click event for the back button
if (backButton) {
    backButton.addEventListener('click', () => {
        eventsSection.classList.add('hidden');
        categorySelection.classList.remove('hidden');
        searchInput.value = '';
    });
}
const addCard = document.querySelector('.add-card');
const addModal = document.getElementById('add-modal');
const closeModal = document.getElementById('close-modal');

addCard.addEventListener('click', () => {
    addModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    addModal.classList.add('hidden');
});
const addForm = document.getElementById('add-form');
const eventGrid = document.getElementById('event-grid');

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const card = document.createElement('div');
    card.classList.add('event-card', document.getElementById('new-category').value);

    const title = document.createElement('h3');
    title.textContent = document.getElementById('new-name').value;

    const info = document.createElement('p');
    info.textContent = document.getElementById('new-location').value + ' - ' +
    document.getElementById('new-date').value + ' ' +
    document.getElementById('new-time').value;

    const extra = document.createElement('p');
    extra.textContent = 'Price:' + document.getElementById('new-price').value;

    const joinBtn = document.createElement('button');
    joinBtn.textContent = 'Join';

    card.append(title, info, extra, joinBtn);
    eventGrid.insertBefore(card, document.querySelector('.add-card'));
    
    addForm.reset();
    addModal.classList.add('hidden');
});