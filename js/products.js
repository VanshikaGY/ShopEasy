const PRODUCTS = [
    {
        id: 1,
        name: "Wireless Earbuds Pro Max",
        price: 99.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviews: 150,
        category: "Electronics",
        images: [
            "images/products/earbuds-1.jpg",
            "images/products/earbuds-2.jpg",
            "images/products/earbuds-3.jpg",
            "images/products/earbuds-4.jpg"
        ],
        description: "Experience crystal-clear sound with our latest Wireless Earbuds Pro Max. Features include:",
        features: [
            "Active Noise Cancellation",
            "40-hour battery life with charging case",
            "IPX7 water resistance",
            "Touch controls",
            "Bluetooth 5.2 connectivity"
        ],
        specifications: {
            "Battery Life": "40 hours",
            "Bluetooth Version": "5.2",
            "Water Resistance": "IPX7",
            "Weight": "5.5g per earbud",
            "Charging Time": "1.5 hours"
        }
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 149.99,
        originalPrice: 199.99,
        rating: 5,
        reviews: 89,
        category: "Electronics",
        images: [
            "images/products/watch-1.jpg",
            "images/products/watch-2.jpg",
            "images/products/watch-3.jpg",
            "images/products/watch-4.jpg"
        ],
        description: "Stay connected and track your fitness with our advanced Smart Watch Series 5.",
        features: [
            "Heart rate monitoring",
            "Sleep tracking",
            "GPS navigation",
            "Water resistant",
            "5-day battery life"
        ],
        specifications: {
            "Display": "1.4 inch AMOLED",
            "Battery Life": "5 days",
            "Water Resistance": "5ATM",
            "Compatibility": "iOS and Android",
            "Weight": "45g"
        }
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.2,
        reviews: 234,
        category: "Accessories",
        images: [
            "images/products/backpack-1.jpg",
            "images/products/backpack-2.jpg",
            "images/products/backpack-3.jpg",
            "images/products/backpack-4.jpg"
        ],
        description: "Spacious and durable laptop backpack with multiple compartments.",
        features: [
            "Fits 15.6\" laptops",
            "Water resistant",
            "USB charging port",
            "Anti-theft design",
            "Padded straps"
        ],
        specifications: {
            "Capacity": "25L",
            "Material": "Polyester",
            "Weight": "0.8kg",
            "Dimensions": "30x45x15cm",
            "Color Options": "Black, Navy, Gray"
        }
    },
    {
        id: 4,
        name: "Portable Charger 20000mAh",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.8,
        reviews: 567,
        category: "Electronics",
        images: [
            "images/products/charger-1.jpg",
            "images/products/charger-2.jpg",
            "images/products/charger-3.jpg",
            "images/products/charger-4.jpg"
        ],
        description: "High-capacity portable charger with fast charging technology.",
        features: [
            "20000mAh capacity",
            "Fast charging",
            "Multiple ports",
            "LED indicator",
            "Compact design"
        ],
        specifications: {
            "Capacity": "20000mAh",
            "Output": "5V/2.4A",
            "Input": "5V/2A",
            "Weight": "400g",
            "Dimensions": "15x7x2cm"
        }
    }
];

class ProductService {
    static getAllProducts() {
        return PRODUCTS;
    }

    static getProductById(id) {
        return PRODUCTS.find(product => product.id === parseInt(id));
    }

    static searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return PRODUCTS.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    static getProductsByCategory(category) {
        return PRODUCTS.filter(product => product.category === category);
    }

    static getRelatedProducts(productId, limit = 3) {
        const product = this.getProductById(productId);
        if (!product) return [];
        
        return PRODUCTS
            .filter(p => p.id !== productId && p.category === product.category)
            .slice(0, limit);
    }
}

// Export for use in other files
window.ProductService = ProductService; 