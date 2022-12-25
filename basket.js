'use strict';

const basketIcon = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
const parentForItem = document.querySelector('.featuredItems');
const basketTotalEl = document.querySelector('.basketTotal');
const totalCountEl = basketIcon.querySelector('span');
const totalPriceEl = document.querySelector('.basketTotalValue');

basketIcon.addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};
let totalCount = 0;
totalCountEl.textContent = totalCount;
let totalPrice = 0;

parentForItem.addEventListener('click', event => {
  if (!event.target.closest('.addToCart')) {
    return;
  }
  const itemEl = event.target.closest('.featuredItem');
  addToCart(itemEl.dataset.id, itemEl.dataset.name, +itemEl.dataset.price);
});


/**
 * Функция добавляет продукт в корзину.
 * @param {number} id - Id продукта.
 * @param {string} name - Название продукта.
 * @param {number} price - Цена продукта.
 */
function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id: id, name: name, price: price, count: 0 };
  }

  basket[id].count++;
  updateTotalVal(price);

  const basketItem = basketEl.querySelector(`.basketRow[data-id="${id}"]`)
  if (!basketItem) {
    renderNewProductInBasket(id);
    return;
  }

  const item = basket[id];
  basketItem.querySelector('.productCount').textContent = item.count;
  basketItem.querySelector('.productTotalRow')
    .textContent = (item.count * item.price).toFixed(2);

}

/**
 * Функция обновляет общее количество товаров и общую цену.
 * @param {number} price - Цена продукта.
 */
function updateTotalVal(price) {
  totalCount++;
  totalCountEl.textContent = totalCount;
  totalPrice = totalPrice + price;
  totalPriceEl.textContent = totalPrice.toFixed(2);
}


/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId - Id товара.
 */
function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}