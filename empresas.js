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
        const cartaOriginal = cartaContainer.querySelector('.carta-empresa');
        if (!cartaOriginal || !empresaActual) {
            alert('Primero debes generar una empresa para poder compartirla.');
            return;
        }
        generarImagenYCompartir(cartaOriginal);
    });

    function generarImagenYCompartir(elemento) {
        const elementoParaRenderizar = elemento.cloneNode(true);

        Object.assign(elementoParaRenderizar.style, {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'sans-serif',
            textAlign: 'left',
            borderRadius: '12px',
            padding: '16px',
            width: '320px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            top: '0',
            left: '-9999px'
        });

        const h2 = elementoParaRenderizar.querySelector('h2');
        if (h2) { Object.assign(h2.style, { color: '#000000', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }); }

        const paragraphs = elementoParaRenderizar.querySelectorAll('p');
        if (paragraphs) { paragraphs.forEach(p => Object.assign(p.style, { color: '#333333', fontSize: '16px', margin: '4px 0' })); }

        const strong = elementoParaRenderizar.querySelector('strong');
        if (strong) { strong.style.color = '#000000'; }

        document.body.appendChild(elementoParaRenderizar);

        html2canvas(elementoParaRenderizar, { 
            scale: 2, 
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            document.body.removeChild(elementoParaRenderizar);
            canvas.toBlob(blob => {
                if (!blob) {
                    compartirTextoWhatsApp();
                    return;
                }
                const file = new File([blob], "corpo-cracia.png", { type: "image/png" });
                const shareData = { files: [file] };

                if (navigator.canShare && navigator.canShare(shareData)) {
                    navigator.share(shareData).catch(err => {
                        if (err.name !== 'AbortError') { compartirTextoWhatsApp(); }
                    });
                } else {
                    compartirTextoWhatsApp();
                }
            }, 'image/png');
        }).catch(err => {
            document.body.removeChild(elementoParaRenderizar);
            console.error("Error en html2canvas, pasando a texto:", err);
            compartirTextoWhatsApp();
        });
    }

    function compartirTextoWhatsApp() {
        enlaceContainer.innerHTML = '';
        if (!empresaActual) return; 
        const texto = `*Empresa: ${empresaActual.nombre}*\n\n*Actividad:*\n${empresaActual.actividad}\n\n*Detalle:*\n${empresaActual.detalle}`;
        const textoCodificado = encodeURIComponent(texto);
        const url = `https://api.whatsapp.com/send?text=${textoCodificado}`;
        enlaceContainer.innerHTML = `<a href="${url}" target="_blank" class="whatsapp-link">¡Listo! Haz clic aquí para compartir en WhatsApp</a>`;
    }

    // --- Lógica Principal ---
    // La página inicia con los contenedores vacíos.
    cartaContainer.innerHTML = '';
    enlaceContainer.innerHTML = '';
});
