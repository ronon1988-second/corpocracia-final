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

    function mostrarEmpresaAleatoria() {
        empresaActual = empresas[Math.floor(Math.random() * empresas.length)];
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
        const cartaElement = cartaContainer.querySelector('.carta-empresa');
        if (!cartaElement || !empresaActual) {
            alert('Primero debes generar una empresa para compartir.');
            return;
        }

        enlaceContainer.innerHTML = '';

        html2canvas(cartaElement, { 
            scale: 2, 
            useCORS: true,
            backgroundColor: null // Usará el color de fondo definido en el CSS
        }).then(canvas => {
            canvas.toBlob(blob => {
                if (!blob) {
                    compartirTextoWhatsApp();
                    return;
                }
                const file = new File([blob], "corpo-cracia.png", { type: "image/png" });
                const shareData = { files: [file] };

                if (navigator.canShare && navigator.canShare(shareData)) {
                    navigator.share(shareData).catch(err => {
                        if (err.name !== 'AbortError') {
                            compartirTextoWhatsApp();
                        }
                    });
                } else {
                    compartirTextoWhatsApp();
                }
            }, 'image/png');
        }).catch(err => {
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
