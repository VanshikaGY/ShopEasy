# ShopEasy Integration Guide

## 1. API Configuration (Create new file: js/config.js)
```javascript
const API_CONFIG = {
    BASE_URL: 'YOUR_API_BASE_URL',
    ENDPOINTS: {
        auth: {
            login: '/api/auth/login',
            register: '/api/auth/register',
            logout: '/api/auth/logout',
            resetPassword: '/api/auth/reset-password'
        },
        products: {
            list: '/api/products',
            details: '/api/products/:id',
            search: '/api/products/search'
        },
        cart: {
            get: '/api/cart',
            add: '/api/cart/add',
            update: '/api/cart/update',
            remove: '/api/cart/remove'
        },
        orders: {
            create: '/api/orders',
            list: '/api/orders',
            details: '/api/orders/:id'
        },
        user: {
            profile: '/api/user/profile',
            addresses: '/api/user/addresses',
            payments: '/api/user/payments'
        }
    }
};
```

## 2. File-by-File Integration Points

### index.html Changes
1. **Cart Functionality**:
```javascript
// Replace this code
addToCartButtons.forEach(button => {
    if (button.textContent === 'Add to Cart') {
        button.addEventListener('click', async function(event) {
            event.preventDefault();
            try {
                const productId = this.closest('.product-card').dataset.productId;
                await CartService.addToCart(productId, 1);
                updateCartCount();
            } catch (error) {
                showError('Failed to add item to cart');
            }
        });
    }
});

// Add this function
async function updateCartCount() {
    try {
        const cart = await CartService.getCart();
        document.querySelector('.cart-count').textContent = cart.itemCount;
    } catch (error) {
        console.error('Failed to update cart count:', error);
    }
}
```

2. **Performance Monitoring**:
```javascript
// Replace simulated data with real API calls
async function updatePerformanceData() {
    try {
        const metrics = await PerformanceService.getMetrics();
        updateMetricsDisplay(metrics);
    } catch (error) {
        console.error('Failed to fetch performance metrics:', error);
    }
}
```

### cart.html Changes
1. **Cart Management**:
```javascript
// Replace these functions
async function updateQuantity(itemId, change) {
    try {
        await CartService.updateQuantity(itemId, change);
        await refreshCart();
    } catch (error) {
        showError('Failed to update quantity');
    }
}

async function removeItem(itemId) {
    try {
        await CartService.removeItem(itemId);
        await refreshCart();
    } catch (error) {
        showError('Failed to remove item');
    }
}

async function refreshCart() {
    try {
        const cart = await CartService.getCart();
        updateCartDisplay(cart);
        updateCartTotal(cart);
    } catch (error) {
        showError('Failed to refresh cart');
    }
}
```

### login.html Changes
1. **Authentication**:
```javascript
// Replace these functions
async function handleLogin(event) {
    event.preventDefault();
    try {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        await AuthService.login(email, password);
        window.location.href = '/account.html';
    } catch (error) {
        showError('Login failed: ' + error.message);
    }
}

async function handleRegister(event) {
    event.preventDefault();
    try {
        const userData = {
            name: document.getElementById('register-name').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value
        };
        await AuthService.register(userData);
        showSuccess('Registration successful! Please login.');
        showAuthForm('login');
    } catch (error) {
        showError('Registration failed: ' + error.message);
    }
}

async function socialLogin(provider) {
    try {
        await AuthService.socialLogin(provider);
    } catch (error) {
        showError('Social login failed: ' + error.message);
    }
}
```

### account.html Changes
1. **Profile Management**:
```javascript
// Replace these functions
async function updateProfile(event) {
    event.preventDefault();
    try {
        const profileData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        await UserService.updateProfile(profileData);
        showSuccess('Profile updated successfully');
    } catch (error) {
        showError('Failed to update profile');
    }
}

async function loadUserData() {
    try {
        const userData = await UserService.getProfile();
        populateUserData(userData);
    } catch (error) {
        showError('Failed to load user data');
    }
}
```

2. **Order History**:
```javascript
async function loadOrders() {
    try {
        const orders = await OrderService.getOrders();
        displayOrders(orders);
    } catch (error) {
        showError('Failed to load orders');
    }
}
```

### product-details.html Changes
1. **Product Information**:
```javascript
// Add this function
async function loadProductDetails(productId) {
    try {
        const product = await ProductService.getProductDetails(productId);
        displayProductDetails(product);
    } catch (error) {
        showError('Failed to load product details');
    }
}

// Replace this function
async function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newValue = parseInt(quantityInput.value) + change;
    if (newValue >= 1) {
        quantityInput.value = newValue;
    }
}

// Add this function for Add to Cart
document.querySelector('.add-to-cart-btn').addEventListener('click', async () => {
    try {
        const productId = new URLSearchParams(window.location.search).get('id');
        const quantity = parseInt(document.getElementById('quantity').value);
        await CartService.addToCart(productId, quantity);
        showSuccess('Product added to cart');
    } catch (error) {
        showError('Failed to add product to cart');
    }
});
```

## 3. Error Handling Implementation

Add this to all pages:
```javascript
function showError(message) {
    // Implement your error notification system
    console.error(message);
}

function showSuccess(message) {
    // Implement your success notification system
    console.log(message);
}
```

## 4. Authentication State Management

Add this to all pages:
```javascript
async function checkAuthState() {
    try {
        const isAuthenticated = await AuthService.isAuthenticated();
        updateUIForAuthState(isAuthenticated);
    } catch (error) {
        console.error('Failed to check auth state:', error);
    }
}

function updateUIForAuthState(isAuthenticated) {
    const authLinks = document.querySelectorAll('.auth-dependent');
    authLinks.forEach(link => {
        link.style.display = isAuthenticated ? 'block' : 'none';
    });
}
```

## 5. Loading States

Add this to all pages:
```javascript
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}
```

## 6. API Request Helper

Create a new file `js/api.js`:
```javascript
class API {
    static async request(endpoint, options = {}) {
        const url = API_CONFIG.BASE_URL + endpoint;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (AuthService.getToken()) {
            headers['Authorization'] = `Bearer ${AuthService.getToken()}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}
```

## 7. Integration Testing Checklist

Before deploying:
- [ ] Test all API endpoints with mock data
- [ ] Verify error handling for all API calls
- [ ] Test authentication flow
- [ ] Verify cart synchronization
- [ ] Test order processing
- [ ] Verify user profile updates
- [ ] Test payment integration
- [ ] Verify responsive design still works
- [ ] Test loading states
- [ ] Verify form validation 