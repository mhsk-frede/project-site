// Глобальные переменные
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
const productsPerPage = 12;
let filteredProducts = [];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация темы
    initTheme();
    
    // Генерация товаров
    products = generateProducts();
    filteredProducts = [...products];
    
    // Инициализация страницы
    if (document.getElementById('products-container')) {
        displayProducts(filteredProducts);
    }
    
    // Инициализация корзины
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
    
    // Обновление счетчика корзины
    updateCartCount();
    
    // Обработчики событий
    setupEventListeners();
});

// Инициализация темы
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Генерация тестовых товаров (50,000 товаров)
function generateProducts() {
    const categories = ['electronics', 'clothing', 'home', 'beauty', 'sports', 'toys', 'food'];
    const brands = {
        electronics: ['Samsung', 'Apple', 'Xiaomi', 'Sony', 'LG', 'Huawei', 'Asus', 'Lenovo'],
        clothing: ['Nike', 'Adidas', 'Zara', 'H&M', 'Puma', 'Levi\'s', 'Gucci', 'Lacoste'],
        home: ['IKEA', 'Home Depot', 'Leroy Merlin', 'Ashley', 'Wayfair', 'Williams-Sonoma', 'Crate & Barrel'],
        beauty: ['L\'Oreal', 'Maybelline', 'Nivea', 'Garnier', 'Estée Lauder', 'Clinique', 'MAC'],
        sports: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'Decathlon', 'Wilson'],
        toys: ['LEGO', 'Hasbro', 'Mattel', 'Fisher-Price', 'Nerf', 'Playmobil', 'Barbie'],
        food: ['Nestlé', 'Coca-Cola', 'Pepsi', 'Kellogg\'s', 'Unilever', 'Mars', 'Danone']
    };
    
    const productTypes = {
        electronics: ['Смартфон', 'Ноутбук', 'Наушники', 'Телевизор', 'Фотоаппарат', 'Планшет', 'Умные часы', 'Монитор', 'Принтер', 'Роутер'],
        clothing: ['Футболка', 'Джинсы', 'Куртка', 'Платье', 'Кроссовки', 'Рубашка', 'Шорты', 'Пальто', 'Юбка', 'Свитер'],
        home: ['Диван', 'Стол', 'Стул', 'Лампа', 'Ковер', 'Шкаф', 'Кровать', 'Шторы', 'Посуда', 'Бытовая техника'],
        beauty: ['Крем', 'Шампунь', 'Духи', 'Помада', 'Лосьон', 'Тушь', 'Тональный крем', 'Тени', 'Лак для ногтей', 'Гель для душа'],
        sports: ['Мяч', 'Кроссовки', 'Велосипед', 'Гиря', 'Скакалка', 'Гантели', 'Спортивный костюм', 'Ракетка', 'Бутсы', 'Штанга'],
        toys: ['Конструктор', 'Кукла', 'Машинка', 'Мягкая игрушка', 'Пазл', 'Настольная игра', 'Кубик Рубика', 'Игровая приставка', 'Радиоуправляемая игрушка', 'Набор для творчества'],
        food: ['Шоколад', 'Кофе', 'Чай', 'Печенье', 'Макароны', 'Сок', 'Мюсли', 'Йогурт', 'Сыр', 'Колбаса']
    };

    const stores = {
        'Wildberries': 'https://www.wildberries.ru',
        'Ozon': 'https://www.ozon.ru',
        'AliExpress': 'https://www.aliexpress.com',
        'Яндекс.Маркет': 'https://market.yandex.ru',
        'СберМегаМаркет': 'https://sbermegamarket.ru',
        'DNS': 'https://www.dns-shop.ru',
        'М.Видео': 'https://www.mvideo.ru',
        'Лама': 'https://www.lamoda.ru',
        'Ситилинк': 'https://www.citilink.ru'
    };
    
    // Реальные изображения товаров из интернета
    const imageUrls = {
        electronics: [
            'https://images.samsung.com/is/image/samsung/p6pim/ru/2202/gallery/ru-galaxy-s22-ultra-s908-412360-sm-s908bzgdser-531165728?$650_519_PNG$',
            'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1633037804000',
            'https://cdn.thewirecutter.com/wp-content/media/2023/10/wiredheadphones-2048px-7128-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024',
            'https://m.media-amazon.com/images/I/71tZW1aa+PL._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/81w9b2+4MaL._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/61L5QgPvgxL._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/71LkDBT+pML._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/71HUnJvHsbL._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/61WcZQ6+YlL._AC_UF1000,1000_QL80_.jpg'
        ],
        clothing: [
            'https://m.media-amazon.com/images/I/61-8GtWbY+L._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg'
        ],
        home: [
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg'
        ],
        beauty: [
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg'
        ],
        sports: [
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg'
        ],
        toys: [
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg'
        ],
        food: [
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3fJh6E6L._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71k3g2ikqFL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/71W+tG+T3ZL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/61K5fZ+QyzL._AC_UL1500_.jpg',
            'https://m.media-amazon.com/images/I/81zqGQzRoZL._AC_UL1500_.jpg'
        ]
    };
    
    let generatedProducts = [];
    
    // Генерация 50,000 товаров
    for (let i = 0; i < 50000; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const brand = brands[category][Math.floor(Math.random() * brands[category].length)];
        const typeIndex = Math.floor(Math.random() * productTypes[category].length);
        const type = productTypes[category][typeIndex];
        const storeKeys = Object.keys(stores);
        const store = storeKeys[Math.floor(Math.random() * storeKeys.length)];
        
        // Случайно делаем некоторые товары без изображения (10% chance)
        const hasImage = Math.random() > 0.1;
        const imageUrl = hasImage ? imageUrls[category][typeIndex] : '';
        
        generatedProducts.push({
            id: `${category}-${i}`,
            name: `${brand} ${type} ${Math.floor(Math.random() * 1000) + 1}`,
            category: category,
            brand: brand,
            type: type,
            price: Math.floor(Math.random() * 100000) + 100,
            rating: (Math.random() * 5).toFixed(1),
            date: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
            store: store,
            storeUrl: `${stores[store]}/catalog/${i}/detail.aspx`,
            imageUrl: imageUrl
        });
    }
    
    return generatedProducts;
}

// Получение изображения товара
function getProductImage(product) {
    if (product.imageUrl) {
        return product.imageUrl;
    }
    // Если изображения нет, возвращаем заглушку
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';
}

// Отображение товаров
function displayProducts(productsToDisplay) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    // Очистка контейнера
    container.innerHTML = '';
    
    // Пагинация
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = productsToDisplay.slice(startIndex, endIndex);
    
    // Отображение товаров
    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${getProductImage(product)}" alt="${product.name}" class="product-image" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <div class="product-store">Магазин: ${product.store}</div>
                <div class="product-rating">Рейтинг: ${product.rating} ★</div>
                <div class="product-actions">
                    <button class="add-to-cart btn btn-primary" data-id="${product.id}">В корзину</button>
                    <a href="${product.storeUrl}" target="_blank" class="btn btn-secondary buy-now">Купить сейчас</a>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
    
    // Обновление пагинации
    updatePagination(productsToDisplay.length);
    
    // Добавление обработчиков событий для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            addToCart(this.getAttribute('data-id'));
        });
    });
}

// Обновление пагинации
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (pageInfo) {
        pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Сохранение в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновление счетчика корзины
    updateCartCount();
    
    // Анимация добавления
    const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (button) {
        button.classList.add('added');
        setTimeout(() => button.classList.remove('added'), 1000);
    }
}

// Отображение товаров в корзине
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${getProductImage(item)}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'">
                <div>
                    <h3>${item.name}</h3>
                    <div>${item.price.toLocaleString()} ₽</div>
                    <div>Магазин: ${item.store}</div>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <button class="remove-from-cart" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotalElement.textContent = total.toLocaleString();
    
    // Добавление обработчиков событий для кнопок корзины
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            updateCartItemQuantity(this.getAttribute('data-id'), -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            updateCartItemQuantity(this.getAttribute('data-id'), 1);
        });
    });
    
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(this.getAttribute('data-id'));
        });
    });
}

// Обновление количества товара в корзине
function updateCartItemQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    // Сохранение в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновление отображения корзины
    displayCartItems();
    updateCartCount();
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    // Сохранение в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновление отображения корзины
    displayCartItems();
    updateCartCount();
}

// Обновление счетчика корзины
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Фильтрация товаров
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortBy = document.getElementById('sort-by');
    const searchInput = document.getElementById('search-input');
    
    if (!categoryFilter || !priceFilter || !sortBy || !searchInput) return;
    
    // Фильтрация по категории
    let filtered = products;
    if (categoryFilter.value !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter.value);
    }
    
    // Фильтрация по цене
    if (priceFilter.value !== 'all') {
        const [min, max] = priceFilter.value.split('-').map(part => {
            if (part.endsWith('+')) {
                return parseInt(part) || 0;
            }
            return parseInt(part) || 0;
        });
        
        filtered = filtered.filter(product => {
            if (priceFilter.value === '50000+') {
                return product.price >= 50000;
            }
            return product.price >= min && product.price <= max;
        });
    }
    
    // Поиск по названию
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.brand.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm)
        );
    }
    
    // Сортировка
    switch (sortBy.value) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filtered.sort((a, b) => b.date - a.date);
            break;
        default: // 'popular'
            filtered.sort((a, b) => (b.rating * 2 + Math.random()) - (a.rating * 2 + Math.random()));
    }
    
    filteredProducts = filtered;
    currentPage = 1;
    displayProducts(filteredProducts);
}

// Поиск товаров с подсказками
function setupSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.querySelector('.suggestions-container');
    const searchBtn = document.getElementById('search-btn');
    
    if (!searchInput || !suggestionsContainer || !searchBtn) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // Поиск совпадений в товарах
        const matches = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.brand.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm)
        ).slice(0, 5);
        
        if (matches.length > 0) {
            suggestionsContainer.innerHTML = '';
            matches.forEach(product => {
                const suggestion = document.createElement('div');
                suggestion.className = 'suggestion-item';
                suggestion.textContent = product.name;
                suggestion.addEventListener('click', function() {
                    searchInput.value = product.name;
                    suggestionsContainer.style.display = 'none';
                    filterProducts();
                });
                suggestionsContainer.appendChild(suggestion);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    searchBtn.addEventListener('click', function() {
        filterProducts();
        suggestionsContainer.style.display = 'none';
    });
    
    // Скрытие подсказок при клике вне поля поиска
    document.addEventListener('click', function(e) {
        if (e.target !== searchInput && e.target !== suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтры каталога
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortBy = document.getElementById('sort-by');
    
    if (categoryFilter && priceFilter && sortBy) {
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
        sortBy.addEventListener('change', filterProducts);
    }
    
    // Кнопки пагинации
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayProducts(filteredProducts);
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts(filteredProducts);
            }
        });
    }
    
    // Кнопка оформления заказа
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Заказ оформлен! Спасибо за покупку!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
        });
    }
    
    // Поиск с подсказками
    setupSearchSuggestions();
    
    // Кнопка редактирования профиля
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('Функция редактирования профиля будет реализована в будущем');
        });
    }
}