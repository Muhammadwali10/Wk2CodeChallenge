const STORAGE_KEY = 'shoppingList';
const shoppingList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const shoppingListElement = document.getElementById('shopping-list');
const sortSelect = document.getElementById('sort-select');

const saveShoppingList = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingList));

const addItem = () => {
    const newItem = document.getElementById('new-item').value.trim();
    if (newItem) {
        shoppingList.push(newItem);
        document.getElementById('new-item').value = '';
        saveShoppingList();
        renderList();
    } else {
        alert('Please enter an item name.');
    }
};

const renderList = () => {
    shoppingListElement.innerHTML = '';
    const sortedList = sortSelect.value === 'alphabetical' ? [...shoppingList].sort() : shoppingList;
    sortedList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.dataset.index = index;
        listItem.classList.toggle('purchased', item.endsWith(' (purchased)'));
        listItem.addEventListener('click', handleListItemClick);
        listItem.addEventListener('dblclick', handleListItemDblClick);
        shoppingListElement.appendChild(listItem);
    });
};

const handleListItemClick = (event) => {
    const itemIndex = parseInt(event.target.dataset.index, 10);
    shoppingList[itemIndex] = shoppingList[itemIndex].endsWith(' (purchased)') ? shoppingList[itemIndex].replace(' (purchased)', '') : shoppingList[itemIndex] + ' (purchased)';
    saveShoppingList();
    renderList();
};

const handleListItemDblClick = (event) => {
    const itemIndex = parseInt(event.target.dataset.index, 10);
    const newValue = prompt("Edit item:", shoppingList[itemIndex].replace(' (purchased)', ''));
    if (newValue) {
        shoppingList[itemIndex] = newValue;
        saveShoppingList();
        renderList();
    }
};

const clearList = () => {
    shoppingList.length = 0;
    saveShoppingList();
    renderList();
};

document.getElementById('add-button').addEventListener('click', addItem);
document.getElementById('mark-purchased').addEventListener('click', () => {
    shoppingList.forEach((item, index) => {
        if (!item.endsWith(' (purchased)')) shoppingList[index] += ' (purchased)';
    });
    saveShoppingList();
    renderList();
});
document.getElementById('clear-list').addEventListener('click', clearList);
sortSelect.addEventListener('change', renderList);

renderList();
