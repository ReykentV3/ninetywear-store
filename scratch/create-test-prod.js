// Using native fetch from Node 18+

const WC_URL = "https://admin.ninetywear.com/wp-json/wc/v3";
const CK = "ck_7c983c3de925994f395ce4869685ad82b7ae8a26";
const CS = "cs_19a52814b31bc9f3152c8f7cdfa63d4cccefab07";

async function createTestProduct() {
    const auth = Buffer.from(`${CK}:${CS}`).toString('base64');
    
    const productData = {
        name: "PRODUCTO_PRUEBA_SISTEMA",
        type: "simple",
        regular_price: "1.00",
        description: "Este es un producto de prueba creado automáticamente por el bot para verificar el flujo de compra.",
        short_description: "Test de integración NinetyWear.",
        categories: [
            { id: 16 } // Usando una categoría existente si es posible, o quitándola
        ]
    };

    try {
        console.log("Enviando petición a WooCommerce...");
        const response = await fetch(`${WC_URL}/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();
        if (data.id) {
            console.log(`✅ ¡ÉXITO! Producto creado con ID: ${data.id}`);
            console.log(`🔗 Link: ${data.permalink}`);
        } else {
            console.error("❌ Fallo al crear el producto:", data);
        }
    } catch (error) {
        console.error("❌ Error de red:", error);
    }
}

createTestProduct();
