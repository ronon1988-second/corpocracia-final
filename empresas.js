document.addEventListener('DOMContentLoaded', () => {
    const empresas = [
        { nombre: "NexaCom", actividad: "Producción y distribución de contenido multimedia y noticias digitales.", detalle: "Especializada en marketing de contenido y redes sociales." },
        { nombre: "TransGlobe", actividad: "Servicios de transporte urbano e interurbano de carga y pasajeros.", detalle: "Foco en innovación logística y movilidad sustentable." },
        { nombre: "EduNova", actividad: "Plataformas educativas online y capacitación corporativa.", detalle: "Implementa IA para aprendizaje personalizado." },
        { nombre: "TechCore", actividad: "Desarrollo de software, aplicaciones y soluciones IoT.", detalle: "Reconocida por su innovación en inteligencia artificial." },
        { nombre: "InfraBuild", actividad: "Proyectos de construcción de infraestructura y edificios inteligentes.", detalle: "Especialidad en diseño sostenible y eficiencia energética." },
        { nombre: "Finara", actividad: "Servicios bancarios, inversión y gestión de activos.", detalle: "Innovación en fintech y soluciones de pago digital." },
        { nombre: "GlobeTrips", actividad: "Agencia de viajes, turismo corporativo y experiencias premium.", detalle: "Programa de fidelidad con incentivos para clientes frecuentes." },
        { nombre: "SolEnergia", actividad: "Generación y distribución de energía renovable.", detalle: "Proyectos de energía solar y eólica a gran escala." },
        { nombre: "MediLife", actividad: "Centros de salud, telemedicina y servicios farmacéuticos.", detalle: "Investigación en medicina preventiva y tecnología biomédica." },
        { nombre: "NutriCorp", actividad: "Producción y distribución de alimentos saludables y suplementos.", detalle: "Enfoque en productos orgánicos y sustentables." }
    ];

    let empresaActual;

    const cartaContainer = document.getElementById('carta-container');
    const nuevaEmpresaBtn = document.getElementById('nueva-empresa');
    const compartirBtn = document.getElementById('compartir-hibrido');
    const enlaceContainer = document.getElementById('enlace-container');
    const hiddenCamera = document.getElementById('hidden-camera');

    function mostrarEmpresaAleatoria() {
        empresaActual = empresas[Math.floor(Math.random() * empresas.length)];
        // Ahora se usa la clase correcta para la tarjeta visible
        cartaContainer.innerHTML = `
            <div class="carta-empresa">
                <h2>${empresaActual.nombre}</h2>
                <p>${empresaActual.actividad}</p>
                <p><strong>Detalle:</strong> ${empresaActual.detalle}</p>
            </div>
        `;
        enlaceContainer.innerHTML = '';
    }

    nuevaEmpresaBtn.addEventListener('click', mostrarEmpresaAleatoria);

    compartirBtn.addEventListener('click', () => {
        if (!empresaActual) {
            alert('Primero debes generar una empresa para poder compartirla.');
            return;
        }
        generarImagenYCompartir();
    });

    function generarImagenYCompartir() {
        // 1. Construir la tarjeta en la cámara oculta
        hiddenCamera.innerHTML = `
            <div class="carta-para-imagen">
                <h2>${empresaActual.nombre}</h2>
                <p>${empresaActual.actividad}</p>
                <p><strong>Detalle:</strong> ${empresaActual.detalle}</p>
            </div>
        `;
        const elementoParaRenderizar = hiddenCamera.querySelector('.carta-para-imagen');

        // 2. Usar html2canvas en el elemento de la cámara oculta
        html2canvas(elementoParaRenderizar, { 
            scale: 2, 
            useCORS: true,
            backgroundColor: '#ffffff' // Forzar fondo blanco
        }).then(canvas => {
            // 3. Limpiar la cámara oculta inmediatamente
            hiddenCamera.innerHTML = '';

            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Error: El blob de la imagen es nulo.');
                    compartirTextoWhatsApp(); // Plan B si falla la creación del blob
                    return;
                }
                const file = new File([blob], "corpo-cracia-empresa.png", { type: "image/png" });
                const shareData = { files: [file] };

                if (navigator.canShare && navigator.canShare(shareData)) {
                    navigator.share(shareData).catch(err => {
                        if (err.name !== 'AbortError') {
                            console.error('Error al compartir, pasando a WhatsApp de texto:', err);
                            compartirTextoWhatsApp();
                        }
                    });
                } else {
                    compartirTextoWhatsApp();
                }
            }, 'image/png');
        }).catch(err => {
            // Limpiar la cámara oculta también si hay un error
            hiddenCamera.innerHTML = '';
            console.error("Error en html2canvas, pasando a texto:", err);
            compartirTextoWhatsApp();
        });
    }

    function compartirTextoWhatsApp() {
        enlaceContainer.innerHTML = ''; // Limpiar por si acaso
        if (!empresaActual) return; 
        const texto = `*Empresa: ${empresaActual.nombre}*\n\n*Actividad:*\n${empresaActual.actividad}\n\n*Detalle:*\n${empresaActual.detalle}`;
        const textoCodificado = encodeURIComponent(texto);
        const url = `https://api.whatsapp.com/send?text=${textoCodificado}`;
        enlaceContainer.innerHTML = `<a href="${url}" target="_blank" class="whatsapp-link">¡Listo! Haz clic para compartir en WhatsApp</a>`;
    }

    // --- Lógica Principal ---
    // La página inicia con los contenedores vacíos.
    cartaContainer.innerHTML = '';
    enlaceContainer.innerHTML = '';
});
