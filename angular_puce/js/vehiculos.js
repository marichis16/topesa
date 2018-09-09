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
    for (i in item) {// recorrer  los vehiculos que tienen un empleado 
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
console.log("+++++++++recorrriendo la tabla"),
    console.log("Color"+ returnArr[i].color)

    cell1.innerHTML = returnArr.length-i;
    cell2.innerHTML = returnArr[i].placa;
    cell3.innerHTML = returnArr[i].modelo;
    cell4.innerHTML = returnArr[i].marca;
    cell5.innerHTML = returnArr[i].color;
    cell6.innerHTML = returnArr[i].anio;

}



 /*const li= document.createElement('li');
listaUsuarios=JSON.stringify(snap.val());

 li.innerText = listaUsuarios;
 lista.appendChild(li);*/

  //console.log(JSON.stringify(snap.val()));


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
function insertar(placa, marca, modelo, color, anio, empleadoID){
  const dbRef = firebase.database().ref().child('vehiculos').child(empleadoID);
var refnuevo = dbRef.push({
    placa: placa,
    marca : marca,
    modelo : modelo,
    color : color,
    anio : anio,
    empleadoID : empleadoID
});
// ingresar en la autenticacion el usuario 
console.log("vehiculo nuevo .");
console.log(refnuevo);

}


function ejecutarInsert(){
  /*
  apellido:"Marcillo"
cedula:"1705610689"
email:"fmarcillo@topesa.com.ec"
key:"IWBKCFiGgvaitbPtP6YZy5BC5Dp2"
nombre:"Fabian"
telefono:"0998334085"
  */
  // obtener los datos del formulario 
var empleadoID = document.getElementById('empleado').value;
var placa = document.getElementById('placa').value;
var marca = document.getElementById('marca').value;
var modelo = document.getElementById('modelo').value;
var color = document.getElementById('color').value;
var anio = document.getElementById('anio').value;

    

    
insertar(placa, marca, modelo, color, anio, empleadoID);

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
    } else {
        x.style.display = "none";
    }
}
function cerrarNuevo(){
  document.getElementById('divNuevo').style.display = 'none';
}
    