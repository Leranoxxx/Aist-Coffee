//Открытие и закрытие корзины
function  openCart() {
    let element = document.getElementById('hiddenCart');
    if (element.style.display === 'none') {
        element.style.display = 'flex';
    } else {
        element.style.display = 'none';
    }
}

//Контейнер корзины
const cart = [];

function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-block-header__item');
    const cartTotalPrice = document.querySelector('.cart-block-header__result__price');

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

//Помещение товара в корзину

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-block-header__item', 'item-cart-header');
        itemDiv.dataset.name = item.name;

//Макет вставки с использованием html-конструкции из файла menu.html

        itemDiv.innerHTML = `
        <a href="${item.href}" class="item-cart-header__link">
            <h4 class="item-cart-header__title">${item.name}</h4>
        </a>
        <span class="item-cart-header__price">${item.price}₽</span>
        <div class="item-cart-header__count">
            <button type="button" class="item-cart-header__btn btn-minus"><b>-</b></button>
            <span class="item-cart-header__number">${item.quantity}</span>
            <button type="button" class="item-cart-header__btn btn-plus"><b>+</b></button>
        </div>
        <button type="button" class="item-cart-header__remove btn-remove">✖</button>`;

    cartItemsContainer.appendChild(itemDiv);

    totalPrice += item.price * item.quantity;

})

    cartTotalPrice.textContent = `${totalPrice.toFixed(2)}₽`
}

//Подсчёт переменных внутри корзины после добавления в неё товара

document.querySelectorAll('.item-hero__add-btn').forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price); // Преобразование строки в численный формат
        const itemHref = this.dataset.href;

        const existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name:itemName,
                price:itemPrice,
                href:itemHref,
                quantity:1
            })
        }
        updateCart();
    })
});

//Делигирование событий

document.querySelector('.cart-block-header__item').addEventListener 
('click', function(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    const itemContainer = btn.closest('.item-cart-header');
    const itemName = itemContainer?.dataset.name;
    if (!itemName) return;

    if (btn.classList.contains('btn-minus')) {
        descreaseQuantity(itemName);
    } else if (btn.classList.contains('btn-plus')) {
        increaseQuantity(itemName)
    } else if (btn.classList.contains('btn-remove')) {
        removeItem(itemName)
    }
});

//Удаление товара

function removeItem(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        cart.splice(index,1);
    }
    updateCart();
}

//Увеличение
function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
    }
    updateCart();
}

//Уменьшение
function descreaseQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity--;
    }
    updateCart();
}
