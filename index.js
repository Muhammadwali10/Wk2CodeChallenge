let shoppingList = [];

const shoppingListElement = document.getElementById('shopping-list');

const addItem = () => {
    const newItem = document.getElementById('new-item').value.trim();
    if (newItem) {
        shoppingList.push(newItem);
        document.getElementById('new-item').value = '';
        renderList();
    } else {
        alert('Please enter an item name.');
    }
};

const renderList = () => {
    shoppingListElement.innerHTML = '';
    shoppingList.forEach((item, index) => {
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
    renderList();
};

const handleListItemDblClick = (event) => {

};

const clearList = () => {
    shoppingList.length = 0;
    renderList();
};

document.getElementById('add-button').addEventListener('click', addItem);
document.getElementById('mark-purchased').addEventListener('click', () => {
    shoppingList.forEach((item, index) => {
        if (!item.endsWith(' (purchased)')) shoppingList[index] += ' (purchased)';
    });
    renderList();
});
document.getElementById('clear-list').addEventListener('click', clearList);

renderList(); 
