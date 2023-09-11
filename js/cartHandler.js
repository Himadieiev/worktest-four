const cartList = document.getElementById("cart");

function addToCart(title, price, img) {
  const listItem = document.createElement("li");
  const priceAsNumber = parseFloat(price);
  let totalProduct = 1;

  listItem.innerHTML = `
        <div class="w-full flex justify-between">
          <div class="flex">
            <div class="w-[74px] h-[74px] border-[1px] rounded-[4px] border-solid border-white-a">
              <img src="${img}" alt="${title}">
            </div>
            <div class="ml-[18px] flex flex-col gap-[5px]">
              <p>${title}</p>
              <p id="price">${priceAsNumber.toFixed(2)} KR.</p>
              <p>
              <span id="decrement" onclick="decrementProduct(this)" class=" cursor-pointer">- </span>
              <span id="total-product">${totalProduct}</span>
              <span id="increment" onclick="incrementProduct(this)" class=" cursor-pointer"> +</span>
              </p>
            </div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick="deleteProduct(this)"
              class="hover:scale-125 cursor-pointer"
            >
              <g clip-path="url(#clip0_2720_971)">
                <path
                  d="M7 4V2H17V4H22V6H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"
                  fill="#FCF7E6"
                />
              </g>
              <defs>
                <clipPath id="clip0_2720_971">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      `;

  cartList.appendChild(listItem);

  calculateTotal();
}

function decrementProduct(decrementElement) {
  const listItem = decrementElement.closest("li");
  const totalProductElement = listItem.querySelector("#total-product");
  let totalProduct = parseInt(totalProductElement.textContent);

  if (totalProduct > 1) {
    totalProduct--;
    totalProductElement.textContent = totalProduct;
    calculateTotal();
  }
}

function incrementProduct(incrementElement) {
  const listItem = incrementElement.closest("li");
  const totalProductElement = listItem.querySelector("#total-product");
  let totalProduct = parseInt(totalProductElement.textContent);

  totalProduct++;
  totalProductElement.textContent = totalProduct;
  calculateTotal();
}

function deleteProduct(svgElement) {
  const listItem = svgElement.closest("li");
  if (listItem) {
    cartList.removeChild(listItem);
    calculateTotal();
  }
}

function calculateTotal() {
  const cartItems = cartList.querySelectorAll("li");
  let total = 0;

  cartItems.forEach((item) => {
    const priceElement = item.querySelector("#price");
    const totalProductElement = item.querySelector("#total-product");

    if (priceElement && totalProductElement) {
      const price = parseFloat(priceElement.textContent.replace(" KR.", ""));
      const totalProduct = parseInt(totalProductElement.textContent);

      if (!isNaN(price) && !isNaN(totalProduct)) {
        total += price * totalProduct;
      }
    }
  });

  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.textContent = `${total.toFixed(2)} KR.`;
  }
}
