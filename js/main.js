const limit = 24;
let currentPage = 1;
const defoltImgUrl =
  "https://cdn.shopify.com/s/files/1/0690/0075/7529/products/AAUvwnj0ICORVuxs41ODOvnhvedArLiSV20df7r8XBjEUQ_s900-c-k-c0x00ffffff-no-rj.jpg?v=1670516994";

async function fetchProducts(page) {
  const response = await fetch(
    `https://voodoo-sandbox.myshopify.com/products.json?limit=${limit}&page=${page}`
  );
  const data = await response.json();
  return data.products;
}

function createProductListItem(product) {
  const listItem = document.createElement("li");

  listItem.innerHTML = `
         <li class="h-[402px] w-[342px] 391:w-[300px] relative">
              <button
                class="hover:bg-blue-900 pt-[5px] pb-[5px] px-[8px] uppercase text-light-sand bg-black rounded-[4px] text-[12px] absolute top-[12px] left-[12px]"
              >
                Used
              </button>
              ${
                product.images.length
                  ? `
                <img
                  src="${
                    product.images.length > 1
                      ? product.images[0].src
                      : product.images[0].src
                  }"
                  alt="product"
                  class="object-cover w-[342px] 391:w-[300px] h-[300px] mb-[12px] border-solid border-black border-[1px] rounded-[4px] overflow-hidden"
                />
              `
                  : `
                <img
                  src="${defoltImgUrl}"
                  alt="product"
                  class="object-cover w-[342px] 391:w-[300px] h-[300px] mb-[12px] border-solid border-black border-[1px] rounded-[4px] overflow-hidden"
                />
              `
              }
              <div class="flex justify-between text-[14px] mb-[12px]">
                <div class="flex flex-col items-start font-bold w-[190px]">
                  <h3 class="flex mb-[50px] max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis" style="width: 190px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${
                    product.title
                  }</h3>
                  <p>000 KR.</p>
                </div>
                <div class="flex flex-col items-end">
                  <h3 class="font-medium">Condition</h3>
                  <p class="font-normal">Slightly used</p>
                </div>
              </div>
              <button
                class="hover:bg-blue-900 pt-[14px] pb-[10px] bg-black text-white text-[14px] w-full rounded-[4px] uppercase font-normal" onclick="addToCart('${
                  product.title
                }', '${product.variants[0].price}', '${defoltImgUrl}')"
              >
                ADD TO CART
              </button>
            </li>
    `;

  return listItem;
}

function updateProductList(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = createProductListItem(product);
    productList.appendChild(listItem);
  });
}

function createPaginationButton(pageNumber) {
  const isActive = pageNumber === currentPage;
  const backgroundColorStyle = isActive
    ? "background-color: #1E1E1E; color: white;"
    : "";

  return `
    <button
      style="width: 39px; height: 39px; border-radius: 50%; ${backgroundColorStyle}"
      class="text-m-black border-[1px] border-black rounded-full"
      onclick="goToPage(${pageNumber})"
    >
      ${pageNumber}
    </button>
  `;
}

function updatePagination(totalProducts) {
  const totalPages = Math.ceil(totalProducts / limit);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const maxVisibleButtons = 7;
  const halfMaxButtons = Math.floor(maxVisibleButtons / 2);

  let startPage = currentPage - halfMaxButtons;
  let endPage = currentPage + halfMaxButtons;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, maxVisibleButtons);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pagination.innerHTML += createPaginationButton(i);
  }
}

function goToPage(pageNumber) {
  if (pageNumber !== currentPage) {
    currentPage = pageNumber;
    fetchAndRenderProducts();
  }
}

async function fetchAndRenderProducts() {
  const products = await fetchProducts(currentPage);
  updateProductList(products);

  updatePagination(461);
}

fetchAndRenderProducts();
