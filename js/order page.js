if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Set up event listeners
    var removeButtons = document.getElementsByClassName("remove");
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("qty");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName("addtocart");
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    // Set up favorites buttons
    document.getElementById("addFavorites").addEventListener("click", saveCartToLocalStorage);
    document.getElementById("applyFavorite").addEventListener("click", loadCartFromLocalStorage);
}

// Function to add items to cart
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("box2")[0].innerText;
    var price = shopItem.getElementsByClassName("box3")[0].innerText;
    var image = shopItem.getElementsByClassName("cartImage")[0].src;
    addItemToCart(title, price, image);
    updateCartTotal();
}

// Function to remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// Function to add an item to the cart
function addItemToCart(title, price, image) {
    var cartRow = document.createElement('tr');
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cartTitle");

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("This item is already added to the cart!");
            return;
        }
    }

    var cartRowContents = `
        <td class="cart-item">
            <img src="${image}" alt="T-Shirt" width="50px" height="50px">
            <span class="cartTitle">${title}</span>
        </td>
        <td class="cart-price">${price}</td>
        <td class="quantity">
            <input type="number" class="qty" value="1">
            <button class="remove">Remove</button>
        </td>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("remove")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("qty")[0].addEventListener("change", quantityChanged);
}

// Function to validate the quantity entered
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// Function to update the total of the cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var qtyElement = cartRow.getElementsByClassName("qty")[0];
        var price = parseFloat(priceElement.innerText.replace('Rs.', ''));
        var qty = qtyElement.value;
        total += price * qty;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = 'Rs. ' + total;
}

// Function to save the cart to local storage
function saveCartToLocalStorage() {
    const cartItems = document.getElementsByClassName("cart-items")[0];
    const cartRows = cartItems.getElementsByClassName("cart-row");
    const cart = [];

    for (let i = 0; i < cartRows.length; i++) {
        const row = cartRows[i];
        const title = row.getElementsByClassName("cartTitle")[0].innerText;
        const price = row.getElementsByClassName("cart-price")[0].innerText;
        const quantity = row.getElementsByClassName("qty")[0].value;
        const imageSrc = row.getElementsByTagName('img')[0].src;

        cart.push({ title, price, quantity, imageSrc });
    }

    localStorage.setItem('favoriteCart', JSON.stringify(cart));
    alert("Favorites saved!");
}

// Function to load the cart from local storage
function loadCartFromLocalStorage() {
    const favoriteCart = JSON.parse(localStorage.getItem("favoriteCart"));
    if (favoriteCart) {
        const cartItems = document.getElementsByClassName("cart-items")[0];
        cartItems.innerHTML = ""; // Clear current cart

        favoriteCart.forEach(item => {
            addItemToCart(item.title, item.price, item.imageSrc);

            // Update quantity
            const cartRows = cartItems.getElementsByClassName("cart-row");
            const lastCartRow = cartRows[cartRows.length - 1];
            lastCartRow.getElementsByClassName("qty")[0].value = item.quantity;
        });

        updateCartTotal();
    } else {
        alert("No favorites saved!");
    }
}
