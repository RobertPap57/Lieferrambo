function render() {
    const menus = document.getElementById('menu');
    menus.innerHTML = '';
    menuForLoop(menu, menus);
    loadDataFromLocalStorage();
    renderBasket();
    renderBasketMobile();
}

function menuForLoop(menu, menus) {
    for (let i = 0; i < menu.length; i++) {
        const dish = menu[i];
        if (i % 4 === 0) {
            menus.innerHTML += menuHtml(dish);
        } else {
            menus.innerHTML += dishHtml(dish, i);
        }
    }
}

function renderBasketMobile() {
    const basketMobile = document.getElementById('basketMobile');
    basketMobile.innerHTML = '';
    basketForLoop(shoppingBasket, basketMobile);
    renderTotalValue();
    renderTotalValueMobile();
    renderMobileBtn();
    emptyBasketClass('emptyBasketMobile');
}
function renderBasket() {
    const basket = document.getElementById('basket');
    basket.innerHTML = '';
    basketForLoop(shoppingBasket, basket);
    emptyBasketClass('emptyBasket');
    renderTotalValue();
}

function basketForLoop(shoppingBasket, basket) {
    for (let i = 0; i < shoppingBasket.length; i++) {
        const dish = shoppingBasket[i];
        let totalDishPrice = dish.price * dish.quantity;
        basket.innerHTML += basketHtml(dish, i, totalDishPrice);
    }
}

function emptyBasketClass(id) {
    const emptyBasket = document.getElementById(id);
    if (shoppingBasket.length > 0) {
        emptyBasket.classList.add('d-none');
    } else {
        emptyBasket.classList.remove('d-none');
    }
}

function addToBasket(index) {
    let selectedDish = menu[index];
    let dishIndex = shoppingBasket.findIndex(item => item.name === selectedDish.name);
    if (dishIndex === -1) {
        shoppingBasket.push(selectedDish);
        prices.push(selectedDish.price);
    } 
    
    saveDataToLocalStorage();
    renderBasket();
    renderBasketMobile();
    
}

function addQuantity(index) {
    shoppingBasket[index].quantity++;
    updatePrices(index);
    saveDataToLocalStorage();
    renderBasket();
    renderBasketMobile();
}

function removeQuantity(index) {
    if (shoppingBasket[index].quantity > 1) {
        shoppingBasket[index].quantity--;
        updatePrices(index);
        saveDataToLocalStorage();
        renderBasket();
        renderBasketMobile();
    } else {
        shoppingBasket.splice(index, 1);
        prices.splice(index, 1);
        saveDataToLocalStorage();
        renderBasket();
        renderBasketMobile();
        
    }
}

function updatePrices(index) {
    let dish = shoppingBasket[index];
    prices[index] = dish.price * dish.quantity;
}

function sumPrices() {
    let totalPrice = 0;
    for (let i = 0; i < prices.length; i++) {
        totalPrice += prices[i];
    }
    let finalPrice = totalPrice + 4.90;
    return { totalPrice, finalPrice };
}

function renderMobileBtn() {
    const mobileBtn = document.getElementById('payBtnMobile');
    const footer = document.getElementById('footer');
    if (shoppingBasket.length > 0) {
        let { finalPrice } = sumPrices();
        footer.style = 'height: 200px';
        mobileBtn.innerHTML =
            `<div class="pay-btn-mobile">
        <button class="fixed-btn" onclick="toggleMobileBasket('flex')">Bezahlen (${finalPrice.toFixed(2)} €)</button>
        </div>`;
    } else {
        mobileBtn.innerHTML = '';
        footer.style = 'height: 80px';
    }
}

function renderTotalValueMobile() {
    const totalValueMobile = document.getElementById('toPayMobile');
    if (shoppingBasket.length > 0) {
        const { totalPrice, finalPrice } = sumPrices();
        totalValueMobile.innerHTML = totalValueHtml(totalPrice, finalPrice);
    } else {
        totalValueMobile.innerHTML = '';
    }
}

function renderTotalValue() {
    const totalValue = document.getElementById('toPay');
    if (shoppingBasket.length > 0) {
        const { totalPrice, finalPrice } = sumPrices();
        totalValue.innerHTML = totalValueHtml(totalPrice, finalPrice);
    } else {
        totalValue.innerHTML = '';
    }
}

function order() {
    shoppingBasket = [];
    prices = [];
    saveDataToLocalStorage();
    renderBasket();
    renderBasketMobile();
    window.location.href = './order-received.html';
}

function saveDataToLocalStorage() {
    localStorage.setItem('shoppingBasket', JSON.stringify(shoppingBasket));
    localStorage.setItem('prices', JSON.stringify(prices));
}

function loadDataFromLocalStorage() {
    const savedBasket = localStorage.getItem('shoppingBasket');
    const savedPrices = localStorage.getItem('prices');
    if (savedBasket && savedPrices) {
        shoppingBasket = JSON.parse(savedBasket);
        prices = JSON.parse(savedPrices);
        renderBasket();
        renderBasketMobile();
    }
}

function toggleMobileBasket(toggle) {
    let basketContainerMobile = document.getElementById('basketContainerMobile');
    basketContainerMobile.style = 'display: ' + toggle;
}

window.onscroll = function () {
    let basketContainer = document.getElementById('basketContainer');
    if (window.scrollY > 0) {
        basketContainer.style = 'top: 0';
    } else {
        basketContainer.style = 'top: 100px';
    }
}    