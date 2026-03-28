document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    loadCart();

    document.getElementById("searchInput").addEventListener("input", searchProducts);
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
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "card p-2 m-2";

        div.innerHTML = `
            <h5>${p.description}</h5>
            <p>Category: ${p.category}</p>
            <p>Price: $${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;

        productList.appendChild(div);
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
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.description} - $${item.price}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(li);
    });

    // Save as JSON
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    let saved = localStorage.getItem("cart");
    if (saved) {
        cart = JSON.parse(saved);
        updateCart();
    }
}

function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    let filtered = products.filter(p =>
        p.description.toLowerCase().includes(input)
    );

    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    filtered.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h5>${p.description}</h5>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}