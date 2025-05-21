let cart = [];
let total = 0;

function addItemWithQty(name, unitPrice, qtyInputId) {
  const qty = parseInt(document.getElementById(qtyInputId).value);
  if (qty > 0 && qty <= 20) {
    const itemTotal = unitPrice * qty;
    cart.push({ item: `${name} x${qty}`, price: itemTotal });
    total += itemTotal;
    updateCart();
  } else {
    alert("Please enter a quantity between 1 and 20.");
  }
}

function addFries() {
  const sizeDropdown = document.getElementById("fries-size");
  const price = parseInt(sizeDropdown.value);
  const label = sizeDropdown.options[sizeDropdown.selectedIndex].text;
  cart.push({ item: `Fries (${label})`, price: price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${entry.item} - P${entry.price} 
    <button style="margin-left: 10px; background-color: red;" onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("payment-method").addEventListener("change", function () {
  const method = this.value;
  document.getElementById("gcash-qr").style.display = method === "GCASH" ? "block" : "none";
  document.getElementById("bank-card-fields").style.display = method === "Bank Card" ? "block" : "none";
});

function checkout() {
  const paymentMethod = document.getElementById("payment-method").value;
  const address = document.getElementById("address").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (!address) {
    alert("Please enter your delivery address.");
    return;
  }

  if (!contact) {
    alert("Please enter your Contact Number.");
    return;
  }

  if (paymentMethod === "Bank Card") {
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("card-expiry").value.trim();
    const cvv = document.getElementById("card-cvv").value.trim();

    if (!cardNumber || !expiry || !cvv) {
      alert("Please complete all bank card fields.");
      return;
    }
  }

  let summary = "🛒 Order Summary:\n";
  cart.forEach(entry => {
    summary += `- ${entry.item} - P${entry.price}\n`;
  });

  summary += `\nTotal: P${total}\nPayment Method: ${paymentMethod}\nDelivery Address: ${address}\nContact Number: ${contact}`;
  alert(summary);

  // Reset
  cart = [];
  total = 0;
  updateCart();
  document.getElementById("address").value = "";
  document.getElementById("contact").value = "";
  document.getElementById("payment-method").selectedIndex = 0;
  document.getElementById("gcash-qr").style.display = "none";
  document.getElementById("bank-card-fields").style.display = "none";
  document.getElementById("card-number").value = "";
  document.getElementById("card-expiry").value = "";
  document.getElementById("card-cvv").value = "";
}