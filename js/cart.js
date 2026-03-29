
$(document).ready(function () {
    loadProducts();
    loadCart();


    $("#searchInput").on("input", function () {
        let input = $(this).val().toLowerCase();

        let filtered = products.filter(p =>
            p.description.toLowerCase().includes(input)
        );

        displayProducts(filtered);
    });
});


let products = [
    {
        id: 1,
        description: "T-Shirt",
        category: "Clothing",
        unit: "piece",
        price: 19.99
    },
    {
        id: 2,
        description: "Hat",
        category: "Accessories",
        unit: "piece",
        price: 14.99
    },
    {
        id: 3,
        description: "Hoodie",
        category: "Clothing",
        unit: "piece",
        price: 39.99
    }
];


let cart = [];


function loadProducts() {
    displayProducts(products);
}

function displayProducts(productArray) {
    const productList = $("#productList");
    productList.empty();

    productArray.forEach(p => {
        productList.append(`
            <div class="card p-2 m-2">
                <h5>${p.description}</h5>
                <p>Category: ${p.category}</p>
                <p>Price: $${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `);
    });
}


function addToCart(id) {
    let product = products.find(p => p.id === id);
    cart.push(product);

    updateCart();
}


function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}


function updateCart() {
    const cartList = $("#cartList");
    cartList.empty();

    cart.forEach(item => {
        cartList.append(`
            <li>
                ${item.description} - $${item.price}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </li>
        `);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    $("#jsonOutput").text(JSON.stringify(cart, null, 2));
}


function loadCart() {
    let saved = localStorage.getItem("cart");
    if (saved) {
        cart = JSON.parse(saved);
        updateCart();
    }
}

function sendCartToAPI() {
    $.ajax({
        url: "https://example.com/api/cart", // placeholder
        method: "POST",
        data: JSON.stringify(cart),
        contentType: "application/json",
        success: function () {
            alert("Cart sent successfully!");
        },
        error: function () {
            alert("Error sending cart.");
        }
    });
}
