// ---------------- Variables ----------------
var returnArr = [];
var placaVehiculo = "";

// ---------------- Inicializa Firebase ----------------
var config = {
  apiKey: "AIzaSyD84c5uXptNfZa0UcaxvTuVZd2R3eTzvxA",
  authDomain: "control-7c5d7.firebaseapp.com",
  databaseURL: "https://control-7c5d7.firebaseio.com",
  projectId: "control-7c5d7",
  storageBucket: "control-7c5d7.appspot.com",
  messagingSenderId: "635319972706"
};
firebase.initializeApp(config);

// ---------------- Inicializa las bases ----------------
const lista = document.getElementById('lista');
const dbRef_vehiculos = firebase.database().ref().child('vehiculos');
const dbRef_empleados = firebase.database().ref().child('empleados');// Para el select 

dbRef_vehiculos.on('value', snap => {
  returnArr=[];
  snap.forEach(function(snap) {// Recorre los empleados
    console.log('Elemento vehiculo');
    var item=snap.val();
    item.key = snap.key;
    for (i in item) {
      if(item.key!= item[i]){
            console.log( item[i]);
            returnArr.push(item[i]);
      }
    }
  });

  // Llena tabla
  var table= document.getElementById('myTable');
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }

  for (i in returnArr) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    cell1.innerHTML = returnArr.length-i;
    cell2.innerHTML = returnArr[i].placa;
    cell3.innerHTML = returnArr[i].modelo;
    cell4.innerHTML = returnArr[i].marca;
    cell5.innerHTML = returnArr[i].color;
    cell6.innerHTML = returnArr[i].anio;
    cell7.innerHTML = "<button class='btn btn-link' onclick='cargarEditar("+i+")'>Editar</button>";
    cell8.innerHTML = "<button class='btn btn-link' onclick='ejecutarEliminar(\""+returnArr[i].vehiculoID+"\", \""+returnArr[i].empleadoID+"\")'>Eliminar</button>";
  }
});

// ---------------- Llena el select de empleados ----------------
dbRef_empleados.on('value', snap => {
  returnArrEmpleados=[];
  snap.forEach(function(snap) {
    console.log('Empleado');
    var item=snap.val();// Un vehiculo 
    item.key = snap.key;
    console.log( item);
    returnArrEmpleados.push(item);// Agrega a la lista 
  });

  console.log('Arreglo de empleados');
  console.log( returnArrEmpleados);
  var select_empleado = document.getElementById("empleado");

  for (i in returnArrEmpleados) {
    var option = document.createElement("option");
    option.text =  returnArrEmpleados[i].nombre + " "+  returnArrEmpleados[i].apellido;
    option.value =  returnArrEmpleados[i].key;
    select_empleado.add(option);
  }
});

// ---------------- Ejecutar Insert ----------------
function ejecutarInsert(){
  var empleadoID = document.getElementById('empleado').value;
  var placa = document.getElementById('placa').value;
  var marca = document.getElementById('marca').value;
  var modelo = document.getElementById('modelo').value;
  var color = document.getElementById('color').value;
  var anio = document.getElementById('anio').value;
  if(empleadoID != ""){
    if( placa != "" && marca != "" && color != "" && anio != "" && modelo!= ""){
      if(verificarRepeticion()){
        //alert("Valido.");
        insertar(placa, marca, modelo, color, anio, empleadoID);
      }
      else
       alert("La placa del vehículo ya existe.");
    }
    else
      alert("Ingrese todos los campos.");
  }
  else
    alert("Seleccione un empleado..");
}

// ---------------- Inserta en la base ----------------
function insertar(placa, marca, modelo, color, anio, empleadoID){
  var dbRef_vehiculos = firebase.database().ref().child('vehiculos').child(empleadoID);
  var refnuevo = dbRef_vehiculos.push({
      placa: placa,
      marca : marca,
      modelo : modelo,
      color : color,
      anio : anio,
      empleadoID : empleadoID,
      vehiculoID: dbRef_vehiculos.key
  });

  var key= refnuevo.key;
  dbRef_vehiculos = firebase.database().ref().child('vehiculos').child(empleadoID).child(key);
    var refnuevo = dbRef_vehiculos.set({
      placa: placa,
      marca : marca,
      modelo : modelo,
      color : color,
      anio : anio,
      empleadoID : empleadoID,
      vehiculoID: key
    });

  alert("Vehículo ingresado correctamente.");
  console.log("vehiculo nuevo .");
  console.log(refnuevo);
  mostrarNuevo();
}

// ---------------- Cargar Editar ----------------
function cargarEditar(posicion){

  document.getElementById('empleado').value= returnArr[posicion].empleadoID;
  document.getElementById('placa').value= returnArr[posicion].placa;
  document.getElementById('marca').value= returnArr[posicion].marca;
  document.getElementById('modelo').value= returnArr[posicion].modelo;
  document.getElementById('color').value= returnArr[posicion].color;
  document.getElementById('anio').value= returnArr[posicion].anio;
  document.getElementById('key_vehiculo').value= returnArr[posicion].vehiculoID;
  placaVehiculo = returnArr[posicion].placa;
  mostrarExistente();
}

// ---------------- Ejecutar Editar ----------------
function ejecutarEditar(){

  var empleadoID = document.getElementById('empleado').value;
  var placa = document.getElementById('placa').value;
  var marca = document.getElementById('marca').value;
  var modelo = document.getElementById('modelo').value;
  var color = document.getElementById('color').value;
  var anio = document.getElementById('anio').value;
  var key_vehiculo = document.getElementById('key_vehiculo').value;

  if(empleadoID != ""){
    if( placa != "" && marca != "" && color != "" && anio != "" && modelo!= ""){
      if(verificarRepeticion()){
        //alert("Valido.");
        editar(key_vehiculo,empleadoID,placa,marca, modelo, color, anio);
      }
      else
       alert("La placa del vehículo ya existe.");
    }
    else
      alert("Ingrese todos los campos.");
  }
  else
    alert("Seleccione un empleado..");
}

// ---------------- Edita en la base ----------------
function editar(key_vehiculo,empleadoID,placa,marca, modelo, color, anio){
  const dbRef_vehiculos = firebase.database().ref('vehiculos/' + empleadoID+'/'+key_vehiculo);//.child('empleados');
    var refnuevo = dbRef_vehiculos.update({
      placa: placa,
      marca : marca,
      modelo : modelo,
      color : color,
      anio : anio,
      empleadoID : empleadoID,
      vehiculoID: key_vehiculo
    });
    alert("Actualizado correctamente");
}

// ---------------- Ejecuta Eliminar ----------------
function ejecutarEliminar(key_vehiculo, empleadoID){
  if( confirm("Seguro desea eliminar?")){
    eliminar(key_vehiculo, empleadoID);
  }
}

// ---------------- Elimina de la base ----------------
function eliminar(key_vehiculo, empleadoID){
  const dbRef_vehiculos = firebase.database().ref('vehiculos/' + empleadoID+'/'+key_vehiculo);//.child('empleados');
  dbRef_vehiculos.remove();
}

// ---------------- Verificar Repetición ----------------
function verificarRepeticion (){
  var placa = document.getElementById('placa').value.trim();
  var verifica = true;

  console.log('Arreglo de empleados');
  console.log( returnArr);

    for (i in returnArr) {
      if(placa == returnArr[i].placa){
        if(placa != placaVehiculo){
          verifica = false;
          break;
        }
        else
          verifica = true;
      }
    }
  return verifica;
}

// ---------------- Formulario nuevo registro ----------------
function mostrarNuevo() {
  var x = document.getElementById("divNuevo");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById('btnInsertar').style.display = 'block'; 
    document.getElementById('btnEditar').style.display = 'none'; 

    document.getElementById('empleado').value= document.getElementById('selecEmpleado').value;
    document.getElementById('placa').value= "";
    document.getElementById('marca').value= "";
    document.getElementById('modelo').value= "";
    document.getElementById('color').value= "";
    document.getElementById('anio').value= "";
    document.getElementById('key_vehiculo').value="";
  } 
  else {
    x.style.display = "none";
  }
}

// ---------------- Formulario registro existente ----------------
function mostrarExistente() {
  document.getElementById("divNuevo").style.display = "block";
  document.getElementById('btnInsertar').style.display = 'none'; 
  document.getElementById('btnEditar').style.display = 'block'; 
}

// ---------------- Cierra Formulario ----------------
function cerrarNuevo(){
  document.getElementById('divNuevo').style.display = 'none';
}

// ---------------- Cierra Sesión ----------------
function logOut(){
  firebase.auth().signOut();
  //alert("Sesión cerrada.");
  window.location.href="../login.html";
}

// ---------------- Mayúsculas ----------------
function upperCase(a){
  setTimeout(function(){
      a.value = a.value.toUpperCase();
  }, 1);
}