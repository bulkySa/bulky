const cart = [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function updateCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = totalPrice;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">السلة فارغة حالياً.</p>';
    return;
  }

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div>${item.price} ر.س × ${item.quantity}</div>
      </div>
      <div class="cart-item-controls">
        <button type="button" onclick="changeQuantity(${index}, 1)">+</button>
        <span>${item.quantity}</span>
        <button type="button" onclick="changeQuantity(${index}, -1)">-</button>
      </div>
    `;

    cartItems.appendChild(row);
  });
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.name, Number(button.dataset.price));
    button.textContent = "تمت الإضافة ✓";

    setTimeout(() => {
      button.textContent = "أضف للسلة";
    }, 1000);
  });
});

document.getElementById("clear-cart").addEventListener("click", () => {
  cart.length = 0;
  updateCart();
});

document.getElementById("register-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("register-message");

  message.textContent = `تم إنشاء الحساب بنجاح، أهلاً ${name}!`;
  event.target.reset();
});