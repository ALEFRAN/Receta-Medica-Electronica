let recetas = [];
let nombrePacienteGlobal = "";

function agregarReceta(event) {
    event.preventDefault();

    const nombrePaciente = document.getElementById("nombrePaciente").value.trim();
    const medicamento = document.getElementById("medicamento").value.toLowerCase();
    const dosificacion = document.getElementById("dosificacion").value;

    if (!nombrePaciente || !medicamento || !dosificacion) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (medicamento === "prohibido") {
        Swal.fire({
            title: 'Este medicamento debe cargarlo al Farmamed',
            text: 'Para poder continuar presione',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        return;
    }

    if (nombrePacienteGlobal === "") {
        nombrePacienteGlobal = nombrePaciente.charAt(0).toUpperCase() + nombrePaciente.slice(1);
    }

    recetas.push({ paciente: nombrePacienteGlobal, medicamento: medicamento, dosificacion: dosificacion });
    document.getElementById("nombrePaciente").value = ""; 
    document.getElementById("dosificacion").value = "";

    actualizarTabla();
}

function actualizarTabla() {
    const tbody = document.getElementById("tablaRecetas").querySelector("tbody");
    tbody.innerHTML = "";

    recetas.forEach((receta, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${receta.paciente}</td>
            <td>${capitalize(receta.medicamento)}</td>
            <td>${capitalize(receta.dosificacion)}</td>
            <td>
                <button onclick="eliminarReceta(${index})">Eliminar</button>
                <button onclick="modificarReceta(${index})">Modificar</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function eliminarReceta(index) {
    recetas.splice(index, 1);
    actualizarTabla();
}

function modificarReceta(index) {
    const nuevaDosificacion = prompt("Ingrese la nueva dosificación:", recetas[index].dosificacion);
    if (nuevaDosificacion) {
        recetas[index].dosificacion = nuevaDosificacion;
        actualizarTabla();
    }
}

document.getElementById('imprimir').addEventListener('click', function() {
    window.print();
});

/*function imprimirReceta() {
    let contenido = "Receta Médica - Hospital Provincial de Rosario\n\n";
    recetas.forEach((receta) => {
        contenido += `${receta.paciente}: ${capitalize(receta.medicamento)}, ${capitalize(receta.dosificacion)}\n`;
    });
    const ventana = window.open("", "Imprimir", "width=600,height=400");
    ventana.document.write("<pre>" + contenido + "</pre>");
    ventana.print();
    ventana.close();
}*/

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitalizarNombre() {
    const inputNombre = document.getElementById("nombrePaciente");
    inputNombre.value = inputNombre.value.toLowerCase();
}
