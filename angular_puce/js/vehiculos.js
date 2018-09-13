var returnArr = [];
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD84c5uXptNfZa0UcaxvTuVZd2R3eTzvxA",
    authDomain: "control-7c5d7.firebaseapp.com",
    databaseURL: "https://control-7c5d7.firebaseio.com",
    projectId: "control-7c5d7",
    storageBucket: "control-7c5d7.appspot.com",
    messagingSenderId: "635319972706"
  };
  firebase.initializeApp(config);

  const lista = document.getElementById('lista');
  const dbRef = firebase.database().ref().child('vehiculos');
  const dbRef_empleados = firebase.database().ref().child('empleados');// para pobalr el select 

  dbRef.on('value', snap => {
  returnArr=[];
  snap.forEach(function(snap) {// recorremos los empleados
    console.log('Elemento');
    var item=snap.val();
    item.key = snap.key;
    for (i in item) {
      if(item.key!= item[i]){
            console.log( item[i]);
            returnArr.push(item[i]);
      }
    }
  });
 





//--------------------------------
var table= document.getElementById('myTable');

var tableHeaderRowCount = 1;
var table = document.getElementById('myTable');
var rowCount = table.rows.length;
for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
}

// poblando la tabla
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
    cell7.innerHTML = "<button class='btn btn-link' onclick='cargar_editar("+i+")'>Editar</button>";
    cell8.innerHTML = "<button class='btn btn-link' onclick='ejecutar_eliminar(\""+returnArr[i].vehiculoID+"\", \""+returnArr[i].empleadoID+"\")'>Eliminar</button>";
}

});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 // recorrer los empleados

    dbRef_empleados.on('value', snap => {
    returnArrEmpleados=[];
    snap.forEach(function(snap) {
      console.log('Elemento vehiculos');
      var item=snap.val();// un vehiculo 
      item.key = snap.key;

      console.log( item);
      returnArrEmpleados.push(item);// agregar el vehiculo a la lista 
  });


  console.log('Arreglo de empleados');
  console.log( returnArrEmpleados);
  // poblar el select de empleados con id. empleado
  var select_empleado = document.getElementById("empleado");

    for (i in returnArrEmpleados) {

        var option = document.createElement("option");// crear la opcion 
        option.text =  returnArrEmpleados[i].nombre + " "+  returnArrEmpleados[i].apellido;
        option.value =  returnArrEmpleados[i].key;
        select_empleado.add(option);
    }
  });


function myFunction() {


}

// inserta la data en el arbol de firebase 
function ejecutarInsert(){
    // obtener los datos del formulario 
  var empleadoID = document.getElementById('empleado').value;
  var placa = document.getElementById('placa').value;
  var marca = document.getElementById('marca').value;
  var modelo = document.getElementById('modelo').value;
  var color = document.getElementById('color').value;
  var anio = document.getElementById('anio').value;

  insertar(placa, marca, modelo, color, anio, empleadoID);
}

function insertar(placa, marca, modelo, color, anio, empleadoID){
  var dbRef = firebase.database().ref().child('vehiculos').child(empleadoID);
  var refnuevo = dbRef.push({
      placa: placa,
      marca : marca,
      modelo : modelo,
      color : color,
      anio : anio,
      empleadoID : empleadoID,
      vehiculoID: dbRef.key
  });
  var key= refnuevo.key;
  dbRef = firebase.database().ref().child('vehiculos').child(empleadoID).child(key);
    var refnuevo = dbRef.set({
      placa: placa,
      marca : marca,
      modelo : modelo,
      color : color,
      anio : anio,
      empleadoID : empleadoID,
      vehiculoID: key
    });
  alert("key: "+key);
  // alert("Vehículo creado correctamente");
  console.log("vehiculo nuevo .");
  console.log(refnuevo);
  mostrarNuevo();

}

function cargar_editar(posicion){

  document.getElementById('empleado').value= returnArr[posicion].empleadoID;
  document.getElementById('placa').value= returnArr[posicion].placa;
  document.getElementById('marca').value= returnArr[posicion].marca;
  document.getElementById('modelo').value= returnArr[posicion].modelo;
  document.getElementById('color').value= returnArr[posicion].color;
  document.getElementById('anio').value= returnArr[posicion].anio;
  document.getElementById('key_vehiculo').value= returnArr[posicion].vehiculoID;

  mostrarExistente();
}

function ejecutarEditar(){

  var empleadoID = document.getElementById('empleado').value;
  var placa = document.getElementById('placa').value;
  var marca = document.getElementById('marca').value;
  var modelo = document.getElementById('modelo').value;
  var color = document.getElementById('color').value;
  var anio = document.getElementById('anio').value;
  var key_vehiculo = document.getElementById('key_vehiculo').value;
    
  editar(key_vehiculo,empleadoID,placa,marca, modelo, color, anio);

}

function editar(key_vehiculo,empleadoID,placa,marca, modelo, color, anio){
  const dbRef = firebase.database().ref('vehiculos/' + empleadoID+'/'+key_vehiculo);//.child('empleados');
    var refnuevo = dbRef.update({
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

function ejecutar_eliminar(key_vehiculo, empleadoID){
  if( confirm("Seguro desea eliminar?")){
    eliminar(key_vehiculo, empleadoID);
  }
}

function eliminar(key_vehiculo, empleadoID){
  const dbRef = firebase.database().ref('vehiculos/' + empleadoID+'/'+key_vehiculo);//.child('empleados');
  dbRef.remove();
}

function fechaDDMMAA(fechaAAMMDD){
    //2018-01-01 --> 01-01-2018
    var anio= fechaAAMMDD.substring(0,4);
    var mes= fechaAAMMDD.substring(5,7);
    var dia= fechaAAMMDD.substring(8,10);
    return dia+"-"+mes+"-"+anio;
    
}
function mostrarNuevo() {
  var x = document.getElementById("divNuevo");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById('btn_insertar').style.display = 'block'; 
    document.getElementById('btn_editar').style.display = 'none'; 

    document.getElementById('empleado').value= document.getElementById('selecEmpleado').value;
    document.getElementById('placa').value= "";
    document.getElementById('marca').value= "";
    document.getElementById('modelo').value= "";
    document.getElementById('color').value= "";
    document.getElementById('anio').value= "";
    document.getElementById('key_vehiculo').value="";
  } else {
    x.style.display = "none";
  }
}

function mostrarExistente() {
  document.getElementById("divNuevo").style.display = "block";
  document.getElementById('btn_insertar').style.display = 'none'; 
  document.getElementById('btn_editar').style.display = 'block'; 
}

function cerrarNuevo(){
  document.getElementById('divNuevo').style.display = 'none';
}

function logOut(){
  firebase.auth().signOut();
  //alert("Sesión cerrada.");
  window.location.href="../login.html";
}