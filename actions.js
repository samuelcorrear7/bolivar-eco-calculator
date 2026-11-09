// Traducciones de la aplicación

const translations = {

    es: {
        description: "Descubre tu impacto ambiental y mejora tus hábitos ecológicos.",
        formTitle: "Calculadora de impacto ambiental",
        transportLabel: "Medio de transporte al colegio",
        transportPlaceholder: "Selecciona una opción",
        bus: "Bus",
        carro: "Carro privado",
        compartido: "Carro compartido",
        sostenible: "Bicicleta / Caminando",
        paperLabel: "Hojas de papel utilizadas al día",
        paperPlaceholder: "Ej. 10",
        recyclingLabel: "Nivel de reciclaje",
        recyclingPlaceholder: "Selecciona una opción",
        bajo: "Bajo",
        medio: "Medio",
        alto: "Alto",
        calculate: "Calcular impacto ambiental",
        resultsTitle: "🌍 Tus resultados ambientales",
        co2Label: "Emisiones semanales de CO₂",
        co2Description: "Kilogramos estimados de CO₂",
        ecoLabel: "Eco-Points",
        ecoDescription: "Puntos por hábitos ecológicos",
        print: "🖨️ Imprimir / Guardar Reporte PDF",
        footer: "Bolívar Eco-Calculator | Promoviendo un futuro sostenible 🌿",
        error: "Por favor, completa todos los campos con datos válidos.",
        certificateTitle: "Certificado de Impacto Ambiental",
        certificateMessage: "Este certificado presenta los resultados de la evaluación de hábitos ambientales y el impacto ecológico semanal.",
        certificateTransport: "Transporte:",
        certificatePaper: "Hojas utilizadas al día:",
        certificateRecycling: "Nivel de reciclaje:",
        certificateDate: "Fecha del reporte:",
        certificateFooter: "Bolívar Eco-Calculator | Comprometidos con un futuro sostenible.",
        points: "puntos"
    },

    en: {
        description: "Discover your environmental impact and improve your ecological habits.",
        formTitle: "Environmental Impact Calculator",
        transportLabel: "Transportation to school",
        transportPlaceholder: "Select an option",
        bus: "Bus",
        carro: "Private car",
        compartido: "Carpool",
        sostenible: "Bicycle / Walking",
        paperLabel: "Sheets of paper used per day",
        paperPlaceholder: "E.g. 10",
        recyclingLabel: "Recycling level",
        recyclingPlaceholder: "Select an option",
        bajo: "Low",
        medio: "Medium",
        alto: "High",
        calculate: "Calculate Environmental Impact",
        resultsTitle: "🌍 Your Environmental Results",
        co2Label: "Weekly CO₂ Emissions",
        co2Description: "Estimated kilograms of CO₂",
        ecoLabel: "Eco-Points",
        ecoDescription: "Points earned from ecological habits",
        print: "🖨️ Print / Save PDF Report",
        footer: "Bolívar Eco-Calculator | Promoting a sustainable future 🌿",
        error: "Please complete all fields with valid information.",
        certificateTitle: "Environmental Impact Certificate",
        certificateMessage: "This certificate presents the results of the environmental habits assessment and weekly ecological impact.",
        certificateTransport: "Transportation:",
        certificatePaper: "Sheets used per day:",
        certificateRecycling: "Recycling level:",
        certificateDate: "Report date:",
        certificateFooter: "Bolívar Eco-Calculator | Committed to a sustainable future.",
        points: "points"
    }

};

let currentLanguage = "es";
let lastResults = null;


// Cambiar idioma dinámicamente

const languageSelector = document.getElementById("language");

function updateLanguage(language) {

    currentLanguage = language;

    const t = translations[language];

    document.documentElement.lang = language;

    document.getElementById("mainDescription").textContent = t.description;
    document.getElementById("formTitle").textContent = t.formTitle;

    document.getElementById("transportLabel").textContent = t.transportLabel;
    document.getElementById("paperLabel").textContent = t.paperLabel;
    document.getElementById("recyclingLabel").textContent = t.recyclingLabel;

    const transporte = document.getElementById("transporte");

    transporte.options[0].textContent = t.transportPlaceholder;
    transporte.options[1].textContent = t.bus;
    transporte.options[2].textContent = t.carro;
    transporte.options[3].textContent = t.compartido;
    transporte.options[4].textContent = t.sostenible;

    const reciclaje = document.getElementById("reciclaje");

    reciclaje.options[0].textContent = t.recyclingPlaceholder;
    reciclaje.options[1].textContent = t.bajo;
    reciclaje.options[2].textContent = t.medio;
    reciclaje.options[3].textContent = t.alto;

    document.getElementById("papel").placeholder = t.paperPlaceholder;

    document.getElementById("calculateButton").textContent = t.calculate;
    document.getElementById("resultsTitle").textContent = t.resultsTitle;

    document.getElementById("co2Label").textContent = t.co2Label;
    document.getElementById("co2Description").textContent = t.co2Description;
    document.getElementById("ecoLabel").textContent = t.ecoLabel;
    document.getElementById("ecoDescription").textContent = t.ecoDescription;

    document.getElementById("printButton").textContent = t.print;
    document.getElementById("footerText").textContent = t.footer;

    document.getElementById("certificateTitle").textContent = t.certificateTitle;
    document.getElementById("certificateMessage").textContent = t.certificateMessage;

    document.getElementById("certificateCo2Label").textContent = t.co2Label;
    document.getElementById("certificateEcoLabel").textContent = t.ecoLabel;

    document.getElementById("certificateTransportLabel").textContent = t.certificateTransport;
    document.getElementById("certificatePaperLabel").textContent = t.certificatePaper;
    document.getElementById("certificateRecyclingLabel").textContent = t.certificateRecycling;
    document.getElementById("certificateDateLabel").textContent = t.certificateDate;

    document.getElementById("certificateFooter").textContent = t.certificateFooter;

    if (lastResults !== null) {
        updateCertificate(lastResults);
        updateResultsDisplay(lastResults);
    }

}


// Evento para cambiar idioma

languageSelector.addEventListener("change", function() {
    updateLanguage(this.value);
});


// Calculadora ambiental

const formulario = document.getElementById("ecoForm");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const transporte = document.getElementById("transporte").value;
    const papelInput = document.getElementById("papel").value;
    const papel = Number(papelInput);
    const reciclaje = document.getElementById("reciclaje").value;

    // Validación de datos

    if (
        transporte === "" ||
        reciclaje === "" ||
        papelInput === "" ||
        !Number.isInteger(papel) ||
        papel < 0
    ) {
        alert(translations[currentLanguage].error);
        return;
    }

    // Factores estimados de emisiones por día (kg CO2)

    const emisionesTransporte = {
        bus: 1.2,
        carro: 4.6,
        compartido: 2.3,
        sostenible: 0
    };

    const emisionesPorHoja = 0.005;

    // Cálculo de emisiones semanales (5 días)

    const co2Transporte = emisionesTransporte[transporte] * 5;
    const co2Papel = papel * emisionesPorHoja * 5;

    // Reducción estimada por reciclaje

    const reduccionReciclaje = {
        bajo: 0,
        medio: 0.10,
        alto: 0.20
    };

    const co2Total = (co2Transporte + co2Papel) *
        (1 - reduccionReciclaje[reciclaje]);

    // Cálculo de Eco-Points

    const puntosTransporte = {
        bus: 20,
        carro: 0,
        compartido: 10,
        sostenible: 40
    };

    const puntosReciclaje = {
        bajo: 0,
        medio: 20,
        alto: 40
    };

    const puntosPapel = Math.max(0, 30 - papel);

    const ecoPoints =
        puntosTransporte[transporte] +
        puntosReciclaje[reciclaje] +
        puntosPapel;

    // Guardar resultados

    lastResults = {
        transporte,
        papel,
        reciclaje,
        co2Total,
        ecoPoints
    };

    // Mostrar resultados

    updateResultsDisplay(lastResults);

    // Actualizar certificado

    updateCertificate(lastResults);

    // Activar botón de impresión

    document.getElementById("printButton").disabled = false;

});


// Mostrar resultados en pantalla

function updateResultsDisplay(data) {

    const t = translations[currentLanguage];

    document.getElementById("co2Resultado").textContent =
        data.co2Total.toFixed(2) + " kg";

    document.getElementById("ecoResultado").textContent =
        data.ecoPoints + " " + t.points;

}


// Actualizar certificado ecológico

function updateCertificate(data) {

    const t = translations[currentLanguage];

    document.getElementById("certificateCo2").textContent =
        data.co2Total.toFixed(2) + " kg";

    document.getElementById("certificateEco").textContent =
        data.ecoPoints + " " + t.points;

    document.getElementById("certificateTransport").textContent =
        t[data.transporte];

    document.getElementById("certificatePaper").textContent =
        data.papel;

    document.getElementById("certificateRecycling").textContent =
        t[data.reciclaje];

    const date = new Date();

    document.getElementById("certificateDate").textContent =
        date.toLocaleDateString(
            currentLanguage === "es" ? "es-CO" : "en-US"
        );

}


// Imprimir o guardar como PDF

document.getElementById("printButton").addEventListener("click", function() {

    if (lastResults === null) {
        alert(translations[currentLanguage].error);
        return;
    }

    updateCertificate(lastResults);

    window.print();

});


// Inicializar aplicación

updateLanguage("es");