
let cart = [];

$(document).ready(function () {
    displayProducts(products);
    displayCart();

    // SEARCH
    $("#searchInput").on("keyup", function () {
        let value = $(this).val().toLowerCase();

        let filtered = products.filter(p =>
            p.description.toLowerCase().includes(value) ||
            p.category.toLowerCase().includes(value)
        );

        displayProducts(filtered);
    });
});


// DISPLAY PRODUCTS
function displayProducts(list) {
    $("#productList").empty();

    list.forEach(product => {
        $("#productList").append(`
            <div class="card product-card p-2">
                <h6>${product.description}</h6>
                <p>${product.category}</p>
                <p>$${product.price}</p>
                <button class="btn btn-sm btn-primary addToCart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `);
    });
}


// DISPLAY CART
function displayCart() {
    $("#cartList").empty();

    cart.forEach((item, index) => {
        $("#cartList").append(`
            <li class="list-group-item d-flex justify-content-between">
                ${item.description} - $${item.price}
                <button class="btn btn-danger btn-sm removeItem" data-index="${index}">
                    Remove
                </button>
            </li>
        `);
    });

    // JSON output
    $("#jsonOutput").text(JSON.stringify(cart, null, 2));
}


// ADD TO CART 
$(document).on("click", ".addToCart", function () {
    let id = $(this).data("id");

    let product = products.find(p => p.id === id);
    cart.push(product);

    displayCart();
});


// REMOVE FROM CART
$(document).on("click", ".removeItem", function () {
    let index = $(this).data("index");

    cart.splice(index, 1);
    displayCart();
});


// ADD NEW PRODUCT / Validation
$("#productForm").submit(function (e) {
    e.preventDefault();

    let desc = $("#prodDesc").val().trim();
    let cat = $("#prodCategory").val().trim();
    let unit = $("#prodUnit").val().trim();
    let price = $("#prodPrice").val().trim();

    if (!desc || !cat || !unit || !price) {
        $("#formError").text("All fields are required!");
        return;
    }

    if (isNaN(price)) {
        $("#formError").text("Price must be a number!");
        return;
    }

    $("#formError").text("");

    let newProduct = {
        id: Date.now(),
        description: desc,
        category: cat,
        unit: unit,
        price: parseFloat(price)
    };

    products.push(newProduct);
    displayProducts(products);

    this.reset();
});


// SEND CART TO API
function sendCartToAPI() {
    $.ajax({
        url: "https://example.com/api", // placeholder
        method: "POST",
        data: JSON.stringify(cart),
        contentType: "application/json",
        success: function () {
            alert("Cart sent successfully!");
        },
        error: function () {
            alert("API not implemented yet (expected)");
        }
    });
}
