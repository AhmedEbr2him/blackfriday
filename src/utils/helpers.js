export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateDiscountPrice = (price, discountPercent) => {
  return price - (discountPercent / 100) * price;
};

export const storeInLocalStorage = (data, itemName) => {
  localStorage.setItem(itemName, JSON.stringify(data));
};

export const fetchFromLocalStorage = (itemName) => {
  let basket = localStorage.getItem(itemName);

  if (basket) {
    return JSON.parse(localStorage.getItem(itemName));
  } else {
    return [];
  }
};
