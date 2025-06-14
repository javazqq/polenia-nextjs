const isDev = process.env.NODE_ENV === 'development';

export const BASE_URL = isDev ? 'https://gjvvhm5d-5001.usw3.devtunnels.ms' : ''; // Adjust as needed

export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const PROMOS_URL = `${BASE_URL}/api/promos`;
export const USERS_URL = `${BASE_URL}/api/users`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
