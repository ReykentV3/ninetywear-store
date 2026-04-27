// Using native fetch from Node 18+

const WC_URL = "https://admin.ninetywear.com/wp-json/wc/v3";
const CK = "ck_7c983c3de925994f395ce4869685ad82b7ae8a26";
const CS = "cs_19a52814b31bc9f3152c8f7cdfa63d4cccefab07";

async function checkGateways() {
    const auth = Buffer.from(`${CK}:${CS}`).toString('base64');
    
    try {
        console.log("Consultando pasarelas activas...");
        const response = await fetch(`${WC_URL}/payment_gateways`, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        const gateways = await response.json();
        const active = gateways.filter(g => g.enabled);
        
        console.log("\n--- MÉTODOS DE PAGO ACTIVOS ---");
        active.forEach(g => {
            console.log(`[ID: ${g.id}] - ${g.title} (${g.description || 'Sin descripción'})`);
        });

        if (active.length === 0) {
            console.log("⚠️ No hay métodos de pago activos en WooCommerce.");
        }
    } catch (error) {
        console.error("❌ Error al consultar pasarelas:", error);
    }
}

checkGateways();
