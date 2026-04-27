// Using native fetch from Node 18+

const WP_URL = "https://admin.ninetywear.com/wp-json/wp/v2";
const CK = "ck_7c983c3de925994f395ce4869685ad82b7ae8a26";
const CS = "cs_19a52814b31bc9f3152c8f7cdfa63d4cccefab07";

async function checkEnvironment() {
    const auth = Buffer.from(`${CK}:${CS}`).toString('base64');
    
    try {
        console.log("Revisando plugins instalados...");
        // El endpoint de plugins requiere permisos especiales, pero intentaremos ver qué plugins exponen info
        const response = await fetch(`https://admin.ninetywear.com/wp-json/wc/v3/system_status`, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        const status = await response.json();
        
        console.log("\n--- REPORTE DE SISTEMA ---");
        if (status.environment) {
            console.log(`Versión WC: ${status.environment.wc_version}`);
            console.log(`WP URL: ${status.environment.site_url}`);
        }

        if (status.active_plugins) {
            console.log("\n--- PLUGINS ACTIVOS ---");
            status.active_plugins.forEach(p => {
                console.log(`- ${p.name} (v${p.version})`);
            });
        } else {
            console.log("⚠️ No pude obtener la lista de plugins. Es posible que el usuario del API no tenga permisos de administrador total.");
        }

    } catch (error) {
        console.error("❌ Error al consultar el estado del sistema:", error);
    }
}

checkEnvironment();
