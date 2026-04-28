// Using native fetch from Node 18+
const WC_API_URL = "https://admin.ninetywear.com/wp-json";

async function checkStoreAPI() {
    try {
        console.log("Probando Store API (Cart)...");
        const response = await fetch(`${WC_API_URL}/wc/store/v1/cart`);
        const status = response.status;
        const data = await response.json();
        
        console.log(`Status: ${status}`);
        console.log("Data:", JSON.stringify(data, null, 2).substring(0, 500) + "...");
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

checkStoreAPI();
