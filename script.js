function mostrarMensaje() {
    alert("¡Únete a nosotros!");
}

function mostrarDatos(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

    if (nombre === "" || correo === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let actores = JSON.parse(localStorage.getItem("actoresData")) || [];

    const actorData = { nombre, correo };

    actores.push(actorData);

    localStorage.setItem("actoresData", JSON.stringify(actores));

    const mensajeGuardado = document.querySelector(".mensaje_guardado");
    mensajeGuardado.style.display = "block";

    document.getElementById("actorForm").reset();

    mostrarListaActores();
}

function mostrarListaActores() {
    const divResultados = document.querySelector(".actor_list");

    let actores = JSON.parse(localStorage.getItem("actoresData")) || [];

    if (actores.length > 0) {
        divResultados.innerHTML = `
            <h3>Actores guardados:</h3>
            <ul>
                ${actores.map(actor => `
                    <li><strong>Nombre:</strong> ${actor.nombre} <strong>Correo:</strong> ${actor.correo}</li>
                `).join('')}
            </ul>
        `;
        divResultados.style.display = "block";
    } else {
        divResultados.style.display = "none";
    }
}

function toggleActorList() {
    const div = document.querySelector(".actor_list");
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}

window.onload = function() {
    mostrarListaActores();
}

document.addEventListener("DOMContentLoaded", function() {
    obtenerPaises();
});

function obtenerPaises() {
    fetch('https://restcountries.com/v3.1/region/europe')
        .then(response => response.json()) 
        .then(data => {
            // Obtener la lista de países
            const listaPaises = document.getElementById('listaPaises');
            data.slice(0, 10).forEach(pais => {
                const li = document.createElement('li');
                li.textContent = pais.name.common;
                listaPaises.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener los países:', error);
        });
}
