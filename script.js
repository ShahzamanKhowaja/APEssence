// Enhanced product data
const products = [
    {
        id: 1,
        name: "Midnight Rose",
        price: 199,
        formattedPrice: "PKR 199",
        volume: "100ml",
        description: "A mysterious blend of Bulgarian rose, dark woods, and vanilla with hints of patchouli. Perfect for evening wear.",
        image: "download.jpeg" // Update with actual image path
    },
    {
        id: 2,
        name: "Ocean Breeze",
        price: 149,
        formattedPrice: "PKR 149",
        volume: "75ml",
        description: "Fresh aquatic notes combined with citrus undertones and a hint of sea salt. Ideal for daily wear.",
        image: "download (2).jpeg" // Update with actual image path
    },
    {
        id: 3,
        name: "Golden Amber",
        price: 229,
        formattedPrice: "PKR 229",
        volume: "100ml",
        description: "Warm amber enriched with Madagascar vanilla, white musk, and precious woods. A luxurious oriental fragrance.",
        image: "download (1).jpeg" // Update with actual image path
    },
    {
        id: 4,
        name: "Fresh Gardenia",
        price: 179,
        formattedPrice: "PKR 179",
        volume: "50ml",
        description: "Pure white florals featuring gardenia, jasmine, and ylang-ylang. A timeless feminine scent.",
        image: "a6528d147307e5bcfc243bfa6db785e7.jpg" // Update with actual image path
    },
    {
        id: 5,
        name: "Velvet Oud",
        price: 259,
        formattedPrice: "PKR 259",
        volume: "100ml",
        description: "Rich Arabian oud combined with Bulgarian rose and saffron. An exotic and sophisticated fragrance.",
        image: "velvet-oud-eau-de-parfum-100ml-lattafa-perfume.webp" // Update with actual image path
    },
    {
        id: 6,
        name: "Citrus Paradise",
        price: 139,
        formattedPrice: "PKR 139",
        volume: "75ml",
        description: "Sparkling blend of Italian bergamot, grapefruit, and mandarin. Perfect for summer days.",
        image: "dee996130573d28be11a9c1de0f9edfe.jpg" // Update with actual image path
    }
];

// Cart array to store selected products
let cart = [];

// Function to create product cards
function createProductCards() {
    const productGrid = document.getElementById('productGrid');
    
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <div class="price-volume">
                    <span class="price">${product.formattedPrice}</span>
                    <span class="volume">${product.volume}</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(card);
    });
    
    // Add event listeners to all Add to Cart buttons
    addCartButtonListeners();
}

// Function to add event listeners to Add to Cart buttons
function addCartButtonListeners() {
    const buttons = document.querySelectorAll('.add-to-cart');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Function to add product to cart
function addToCart(productId) {
    const selectedProduct = products.find(product => product.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }
    
    // Update cart UI
    updateCartUI();
    
    // Show confirmation message
    alert(`${selectedProduct.name} has been added to your cart!`);
}

// Function to update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">PKR ${item.price} × ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">×</button>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Update cart total
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: PKR ${totalPrice}`;
}

// Function to remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        updateCartUI();
    }
}

// Function to toggle cart dropdown
function toggleCartDropdown() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.classList.toggle('show');
}

// Function to generate receipt
function generateReceipt() {
    const receiptContent = document.getElementById('receiptContent');
    const receiptModal = document.getElementById('receiptModal');
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Generate receipt HTML
    const currentDate = new Date().toLocaleString();
    const receiptNumber = Math.floor(Math.random() * 1000000);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    let receiptHTML = `
        <div class="receipt-header">
            <div class="receipt-logo">ESSENCE COLLECTION</div>
            <div class="receipt-date">Date: ${currentDate}</div>
            <div>Receipt #: ${receiptNumber}</div>
        </div>
        <div class="receipt-items">
    `;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        receiptHTML += `
            <div class="receipt-item">
                <div class="receipt-item-name">${item.name} × ${item.quantity} (${item.volume})</div>
                <div class="receipt-item-price">PKR ${itemTotal}</div>
            </div>
        `;
    });
    
    receiptHTML += `
        </div>
        <div class="receipt-totals">
            <div>Subtotal: PKR ${totalPrice}</div>
            <div>Tax (0%): PKR 0</div>
            <div class="receipt-total">Total: PKR ${totalPrice}</div>
        </div>
        <div class="receipt-message">
            Thank you for shopping with Essence Collection!
        </div>
    `;
    
    receiptContent.innerHTML = receiptHTML;
    receiptModal.style.display = 'block';
}

// Function to save receipt (simulate screenshot)
function saveReceipt() {
    alert('Receipt saved! You can take a screenshot now.');
}

// Function to scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    createProductCards();
    
    // Setup event listeners
    document.getElementById('cartIcon').addEventListener('click', function(e) {
        e.preventDefault();
        toggleCartDropdown();
    });
    
    document.getElementById('checkoutBtn').addEventListener('click', generateReceipt);
    
    document.querySelector('.close-receipt').addEventListener('click', function() {
        document.getElementById('receiptModal').style.display = 'none';
    });
    
    document.getElementById('saveReceiptBtn').addEventListener('click', saveReceipt);
    
    // Close cart dropdown when clicking outside
    window.addEventListener('click', function(e) {
        const cartDropdown = document.getElementById('cartDropdown');
        const cartIcon = document.getElementById('cartIcon');
        
        if (!cartDropdown.contains(e.target) && e.target !== cartIcon && !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    });
});