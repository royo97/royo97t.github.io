api = 'https://62a61061430ba53411d09ef0.mockapi.io/compra';

getAll = async function () {
    try {
        const respuesta = await fetch(this.api);

        if (respuesta.status == 200) {
            let json = await respuesta.json();
            return json;
        }
    } catch (error) {
        console.log("ERROR: " + error)
    }
};

eliminar = async function (id) {
    try {
        const respuesta = await fetch(api + '/' + id, {
            method: 'DELETE',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const data = await respuesta.json();

        if (respuesta.status == 200) {
            console.log("Registro eliminado: " + data)
            var item = document.getElementById("row-" + id);
            item.parentNode.removeChild(item);
            alert("Registro eliminado")
        }
    } catch (error) {
        console.log("ERROR: " + error)
    }
};
guardar = async function (compra) {
    try {
        const respuesta = await fetch(api, {
            method: "POST",
            body: JSON.stringify(compra),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const data = await respuesta.json();

        if (respuesta.status == 201) {
            console.log("Registro creado!")
            return data;
        }
    } catch (error) {
        console.log("ERROR: " + error)
    }
};
function cargarDatos() {

    var tablaDatos = document.getElementById("tblDatos");
    var tBodyDatos = document.getElementById("tbdDatos");

    const todos = getAll()
        .then(data => {
            datosJson = data;
            data.forEach((element, index) => {
                var row = document.createElement("TR");
                var col1 = document.createElement("TD");
                col1.innerHTML = element.id;
                var col2 = document.createElement("TD");
                col2.innerHTML = element.fechaCompra;
                var col3 = document.createElement("TD");
                col3.innerHTML = element.cantidad;
                var col4 = document.createElement("TD");
                col4.innerHTML = element.monto;
                var col5 = document.createElement("TD");
                col5.innerHTML = `<a class="btn btn-success me-1 my-1" id="modificar" href="#" onclick="modificar(${element.id})">Modificar</a> 
                <a class="btn btn-danger"  href="#" onclick="eliminar(${element.id})">Eliminar</a>`;
                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);
                row.appendChild(col4);
                row.appendChild(col5);
                row.id = "row-" + element.id

                tBodyDatos.appendChild(row);
            });
        });
}

document.getElementById("btnAgregar").addEventListener("click", (e) => {
    seccion = document.getElementById("seccionFormulario");
    seccion.classList.remove("d-none");
    e.preventDefault();
});

function limpiarFormulario() {
    document.getElementById("fechaCompra").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("monto").value = "";

}


document.getElementById("btnCancelar").addEventListener("click", (e) => {
    seccion = document.getElementById("seccionFormulario");
    seccion.classList.add("d-none");
    limpiarFormulario()
    e.preventDefault();
});

document.getElementById("btnGuardar").addEventListener("click", (e) => {
    compra = {
        fechaCompra: document.getElementById("fechaCompra").value,
        cantidad: document.getElementById("cantidad").value,
        monto: document.getElementById("monto").value
    }
    guardar(compra)
        .then(response => {
            console.log(response)
            return response
        })

        .then(data => {
            console.log(data)
            alert("Registro creado con éxito!")
            var tBodyDatos = document.getElementById("tbdDatos");
            var row = document.createElement("TR");
            var col1 = document.createElement("TD");
            col1.innerHTML = data.id;
            var col2 = document.createElement("TD");
            col2.innerHTML = data.fechaCompra;
            var col3 = document.createElement("TD");
            col3.innerHTML = data.cantidad;
            var col4 = document.createElement("TD");
            col4.innerHTML = data.monto;
            var col5 = document.createElement("TD");
            col5.innerHTML = `<a class="btn btn-success me-1 my-1" id="modificar" href="#" onclick="">Modificar</a> 
            <a class="btn btn-danger" id="modificar" href="#" onclick="eliminar(${data.id})">Eliminar</a>`;
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            row.appendChild(col5);
            row.id = "row-" + data.id
            tBodyDatos.appendChild(row);
            limpiarFormulario()
        })
        .catch(function (err) {
            console.log("Se presento un error en la petición");
            console.error(err);
        });
    e.preventDefault();
});