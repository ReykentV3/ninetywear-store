const { getProducts } = require('./src/services/woocommerce/products');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log("Testing WooCommerce connection...");
    console.log("URL:", process.env.NEXT_PUBLIC_WC_API_URL);
    const { products, total } = await getProducts({ per_page: 1 });
    console.log("Success! Total products:", total);
    if (products.length > 0) {
      console.log("First product name:", products[0].name);
    } else {
      console.log("No products found (but API responded).");
    }
  } catch (error) {
    console.error("Connection failed!");
    console.error(error.message);
  }
}

testConnection();
