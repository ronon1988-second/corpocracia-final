console.error("Error en html2canvas, pasando a texto:", err);
            compartirTextoWhatsApp();
        });
    });

    function compartirTextoWhatsApp() {
        console.log("Plan B activado: Mostrando enlace de WhatsApp.");
        const texto = `*Empresa: ${empresaActual.nombre}*\n\n*Actividad:*\n${empresaActual.actividad}\n\n*Detalle:*\n${empresaActual.detalle}`;
        const textoCodificado = encodeURIComponent(texto);
        const url = `https://api.whatsapp.com/send?text=${textoCodificado}`;
        
        enlaceContainer.innerHTML = `<a href="${url}" target="_blank" class="whatsapp-link">¡Listo! Haz clic aquí para compartir en WhatsApp</a>`;
    }

    // --- Lógica Principal ---
    cartaContainer.innerHTML = '';
    enlaceContainer.innerHTML = '';
});
