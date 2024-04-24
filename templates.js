let shoppingBasket = []
let prices = []
let menu = [
    {
        "img": 'src="./img/pizza.jpg"',
        "headline": "Pizza",
        "description": "Alle Pizzen werden mit Tomatensugo und Mozzarella zubereitet."
    },
    {
        "name": "Pizza Margherita",
        "info": "mit Tomatensugo und Mozzarella",
        "price": 10.90,
        "quantity": 1
    },
    {
        "name": "Pizza Arrabbiata",
        "info": "mit Salsiccia, Speck, Peperoni-Salami und Chili-Ringen",
        "price": 16.90,
        "quantity": 1
    },
    {
        "name": "Pizza Quattro Stagioni",
        "info": "mit Artischocken, Oliven, Tomaten, frischen Champignons und gekochtem Schinken",
        "price": 15.90,
        "quantity": 1
    },
    {
        "img": 'src="./img/pasta.jpg"',
        "headline": "Pasta",
        "description": ""
    },
    {
        "name": "Spaghetti Bolognese",
        "info": "mit hausgemachter Rindfleischsauce und italienischem Hartkäse",
        "price": 12.90,
        "quantity": 1
    },
    {
        "name": "Spaghetti alla Carbonara",
        "info": "mit Speck, Zwiebeln, Ei, italienischem Hartkäse und Sahnesauce",
        "price": 12.90,
        "quantity": 1
    },
    {
        "name": "Penne Panna con Pollo",
        "info": "mit gegrillten Hähnchenbruststreifen, Kirschtomaten, Broccoli, Ei und Sahnesauce",
        "price": 14.40,
        "quantity": 1
    },
    {
        "img": 'src="./img/salad.jpg"',
        "headline": "Insalata",
        "description": "Alle Salate werden mit einem Dressing Ihrer Wahl zubereitet"
    },
    {
        "name": "Insalata Grande",
        "info": "gemischte Blattsalate mit Karottenstiften, Gurken und Kirschtomaten",
        "price": 9.90,
        "quantity": 1
    },
    {
        "name": "Insalata Caprese",
        "info": "Tomatenvariation mit Büffelmozzarella und Basilikum",
        "price": 10.90,
        "quantity": 1
    },
    {
        "name": "Insalata Mista con Gamberetti",
        "info": "gemischte Blattsalate mit Garnelen, Mangowürfeln, Karotten, Gurken und Kirschtomaten",
        "price": 13.40,
        "quantity": 1
    }
]

function menuHtml(dish) {
    return `
        <div id="${dish.headline}">
            <img ${dish.img} alt="">
            <div class="dish-section">
                <h3>${dish.headline}</h3>
                <span>${dish.description}</span>
            </div>
        </div>
    `;
}

function dishHtml(dish, index) {
    return `
        <div onclick="addToBasket(${index})" class="dish-container">
            <span>${dish.name}</span>
            <div class="button">+</div>
            <span>${dish.info}</span>
            <span>${dish.price.toFixed(2)} €</span>
        </div>
    `;
}

function basketHtml(dish, index, totalDishPrice) {
    return `
        <div class="dish-in-basket">
        <div>
        <span>${dish.quantity}</span>
        <span>${dish.name}</span>
        <span>${totalDishPrice.toFixed(2)} €</span>
        </div>
        <div>
        <div class="button" onclick="removeQuantity(${index})">-</div>
        <span>${dish.quantity}</span>
        <div class="button" onclick="addQuantity(${index})">+</div>
        </div>
        <div class="line"></div>
        </div>
        `;
}

function totalValueHtml(totalPrice, finalPrice) {
    return `  
        <div>
        <span>Zwischensumme</span>
        <span>${totalPrice.toFixed(2)} €</span>
        </div>
        <div>
        <span>Lieferkosten</span>
        <span>4.90 €</span>
        </div>
        <div>
        <span>Gesamt</span>
        <span>${finalPrice.toFixed(2)} €</span>
        </div>
        <button id="payBtn" onclick="order()">Bezahlen (${finalPrice.toFixed(2)} €)</button>
        `;
}