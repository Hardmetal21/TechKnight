document.addEventListener('DOMContentLoaded', function() {
    const priceRange = document.querySelector('.price-range');
    const priceValue = document.getElementById('priceValue');
    const filterSelects = document.querySelectorAll('.filter-select');
    const productGrid = document.querySelector('.product-grid');

    // Оновлення ціни при русі повзунка
    priceRange.addEventListener('input', function() {
        priceValue.textContent = this.value;
        filterProducts();
    });

    // Фільтрація при зміні селектів
    filterSelects.forEach(select => {
        select.addEventListener('change', filterProducts);
    });

    function filterProducts() {
        const selectedBrand = document.querySelector('.filter-select:nth-of-type(1)').value;
        const selectedCondition = document.querySelector('.filter-select:nth-of-type(2)').value.toLowerCase();
        const maxPrice = parseInt(priceRange.value);

        document.querySelectorAll('.product-card').forEach(card => {
            const brand = card.querySelector('.product-name').textContent.toLowerCase();
            const conditionText = card.querySelector('.product-specs li:nth-child(3)').textContent;
            const condition = conditionText.replace('Стан:', '').trim().toLowerCase();
            const price = parseInt(card.querySelector('.product-price').textContent.replace(/\D/g, ''));

            const brandMatch = !selectedBrand || brand.includes(selectedBrand);
            const conditionMatch = !selectedCondition || condition === selectedCondition;
            const priceMatch = price <= maxPrice;

            card.style.display = (brandMatch && conditionMatch && priceMatch) ? 'block' : 'none';
        });
    }

    // Анімація фільтрації
    productGrid.style.transition = 'opacity 0.3s';
    function animateFilter() {
        productGrid.style.opacity = '0.5';
        setTimeout(() => productGrid.style.opacity = '1', 300);
    }
});