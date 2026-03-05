const URL = "http://localhost:3000";

// Crea una tabla HTML a partir de cualquier Array de objetos
function mostrarResultado(data) {
  const contenedor = document.getElementById("contenedor-tabla");
  contenedor.innerHTML = ""; // Limpiar contenido previo

  // Si no hay datos o el array está vacío
  if (!data || (Array.isArray(data) && data.length === 0)) {
    contenedor.innerHTML = "<p>No se encontraron registros.</p>";
    return;
  }

  // Para el endpoint /solitos (que devuelve un objeto con dos arrays)
  if (data.conductoresSinAuto || data.autosSinConductor) {
    contenedor.innerHTML += "<h3>Conductores sin Auto</h3>";
    crearTabla(data.conductoresSinAuto, contenedor);
    contenedor.innerHTML += "<h3>Autos sin Conductor</h3>";
    crearTabla(data.autosSinConductor, contenedor);
    return;
  }

  // Si es un solo objeto (como en buscar por patente exacta), se convierte a array
  const lista = Array.isArray(data) ? data : [data];
  crearTabla(lista, contenedor);
}

// Función auxiliar para construir la tabla
function crearTabla(arr, destino) {
  if (arr.length === 0) {
    destino.innerHTML += "<p>Lista vacía.</p>";
    return;
  }

  const tabla = document.createElement("table");
  const encabezado = document.createElement("tr");

  // Crear cabeceras basadas en las llaves del primer objeto
  Object.keys(arr[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key.toUpperCase();
    encabezado.appendChild(th);
  });
  tabla.appendChild(encabezado);

  // Crear filas con los datos
  arr.forEach(item => {
    const fila = document.createElement("tr");
    Object.values(item).forEach(val => {
      const td = document.createElement("td");
      td.textContent = val === null ? "---" : val;
      fila.appendChild(td);
    });
    tabla.appendChild(fila);
  });

  destino.appendChild(tabla);
}

// Función auxiliar para hacer fetch y mostrar resultado
function fetchData(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => mostrarResultado(data));
}

// GET /conductores
function getConductores() {
  fetchData(`${URL}/conductores`);
}

// GET /automoviles
function getAutomoviles() {
  fetchData(`${URL}/automoviles`);
}

// GET /conductoressinauto?edad=
function getConductoresSinAuto() {
  const edad = document.getElementById("edad").value;
  fetchData(`${URL}/conductoressinauto?edad=${edad}`);
}

// GET /solitos
function getSolitos() {
  fetchData(`${URL}/solitos`);
}

// GET /auto?patente=
function getAutoPorPatente() {
  const patente = document.getElementById("patente").value;
  fetchData(`${URL}/auto?patente=${patente}`);
}

// GET /auto?iniciopatente=
function getAutosPorInicio() {
  const inicio = document.getElementById("inicio").value;
  fetchData(`${URL}/auto?iniciopatente=${inicio}`);
}