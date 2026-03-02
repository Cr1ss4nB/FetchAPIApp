const tabla = document.getElementById("tablaUsuarios");
const detalle = document.getElementById("detalleUsuario");

function cargarUsuarios() {

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la petición GET: " + response.status);
            }
            return response.json();
        })
        .then(usuarios => {
            console.log("Usuarios obtenidos correctamente:", usuarios);
            usuarios.slice(0, 30).forEach(usuario => {
                tabla.innerHTML += `
                    <tr>
                        <td>
                            <a href="#" onclick="verDetalle(${usuario.id})">
                                ${usuario.name}
                            </a>
                        </td>
                        <td>${usuario.email}</td>
                        <td>${usuario.phone}</td>
                        <td>${usuario.company.name}</td>
                        <td>${usuario.website}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error("Error capturado en GET:", error);
        });
} cargarUsuarios();

function verDetalle(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en detalle usuario: " + response.status);
            }
            return response.json();
        })
        .then(usuario => {
            console.log("Detalle del usuario seleccionado:", usuario);
            detalle.innerHTML = `
                <p>ID: ${usuario.id}</p>

                <p>Nombre:
                    <input id="nombre" value="${usuario.name}">
                </p>

                <p>Username:
                    <input id="username" value="${usuario.username}">
                </p>

                <p>Email:
                    <input id="email" value="${usuario.email}">
                </p>

                <p>Teléfono:
                    <input id="phone" value="${usuario.phone}">
                </p>

                <p>Website:
                    <input id="website" value="${usuario.website}">
                </p>

                <p>Ciudad: ${usuario.address.city}</p>
                <p>Calle: ${usuario.address.street}</p>
                <p>Suite: ${usuario.address.suite}</p>
                <p>Compañía: ${usuario.company.name}</p>
                <p>CatchPhrase: ${usuario.company.catchPhrase}</p>
                <button onclick="actualizarUsuario(${usuario.id})">Actualizar</button>
            `;
        })
        .catch(error => {
            console.error("Error capturado en detalle:", error);
        });
}

function actualizarUsuario(id) {
    const nombre = document.getElementById("nombre").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const website = document.getElementById("website").value;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nombre,
            username: username,
            email: email,
            phone: phone,
            website: website
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la petición PATCH: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("PATCH ejecutado correctamente:", data);
        alert("Actualización simulada correctamente. Revisar consola.");
    })
    .catch(error => {
        console.error("Error capturado en PATCH:", error);
    });
}