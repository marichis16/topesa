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
    const dbRef = firebase.database().ref().child('clientes');
    //dbRef.on('value', snap => holamundo.innerText = snap.val());
    //console.log(snap.val());
   // const dbRefLista= dbRef.child('clientes');
    dbRef.on('value', snap => {
  returnArr=[];
  snap.forEach(function(snap) {
    console.log('Elemento');
    var item=snap.val();
    item.key = snap.key;

     console.log( item);
     returnArr.push(item);



  });



  console.log('Arreglo');

  console.log( returnArr);




  for (i in returnArr) {
    console.log('Item ['+i+']');

    console.log('Cedula:'+ returnArr[i].cedula);

}

//--------------------------------
var table= document.getElementById('myTable');

var tableHeaderRowCount = 1;
var table = document.getElementById('myTable');
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
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);

/*

*/
    cell1.innerHTML = returnArr.length-i;
    cell2.innerHTML = returnArr[i].ruc;
    cell3.innerHTML = returnArr[i].nombre;
    cell4.innerHTML = returnArr[i].responsable;
    cell5.innerHTML = returnArr[i].direccion;
    cell6.innerHTML = returnArr[i].telefono;
    cell7.innerHTML = returnArr[i].celular;
    cell8.innerHTML = returnArr[i].email;
    cell9.innerHTML = "<img src='"+returnArr[i].imagenURI+"' width='100' heigth='100' >";
    cell10.innerHTML = "<a  target='_blank' href='https://www.google.com/maps/?q="+returnArr[i].lat+","+returnArr[i].lng+"' >Ubicacion</a>";
}



 /*const li= document.createElement('li');
listaUsuarios=JSON.stringify(snap.val());

 li.innerText = listaUsuarios;
 lista.appendChild(li);*/

  //console.log(JSON.stringify(snap.val()));


});


function myFunction() {
var table= document.getElementById('myTable');

var elmtTable = document.getElementById('myTable');
var tableRows = elmtTable.getElementsByTagName('tr');
var rowCount = tableRows.length;

for (var x=rowCount-1; x>0; x--) {
   elmtTable.removeChild(tableRows[x]);
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

    cell1.innerHTML = i;
    cell2.innerHTML = returnArr[i].cedula;
    cell3.innerHTML = returnArr[i].nombre;
    cell4.innerHTML = returnArr[i].codigocuenta;
    cell5.innerHTML = returnArr[i].correo;
    cell6.innerHTML = returnArr[i].fecha;
    cell7.innerHTML = returnArr[i].activa;
    cell8.innerHTML = returnArr[i].enuso;



  //  console.log('Cedula:'+ returnArr[i].cedula);

}


}

function insertar(cedula,clave,codigocuenta, correo, latitud, longitud, fecha, nombre , tiponegocio){
  const dbRef = firebase.database().ref().child('tutienda');
  //dbRef.on('value', snap => holamundo.innerText = snap.val());
  //console.log(snap.val());
  const dbRefLista= dbRef.child('cuenta');
var refnuevo = dbRefLista.push({
  activa: true,
  cedula: cedula,
  clave: clave,
  codigocuenta: codigocuenta,
  correo: correo,
  direccionlatitud: latitud,
  direccionlongitud: longitud,
  enuso: true,
  existencia: true,
  fecha: fecha,
  nombre: nombre,
tiponegocio: tiponegocio

});
// ingresar en la autenticacion el usuario 
console.log("Obtenuiendo el usuario ingresado a firebase: ");
console.log(refnuevo);


}


function ejecutarInsert(){
var cedula= document.getElementById('cedula').value;
var clave= document.getElementById('clave').value;
var codigocuenta = document.getElementById('cedula').value;
var correo = document.getElementById('correo').value;
var latitud = 0//document.getElementById('latitud').value;
var longitud = 0;//document.getElementById('longitud').value;
var fecha = document.getElementById('fecha').value;
fecha= fechaDDMMAA(fecha);
    
    
var nombre = document.getElementById('nombre').value;
var tiponegocio = document.getElementById('tiponegocio').value;
    

    
insertar(cedula,clave,codigocuenta, correo, latitud, longitud, fecha, nombre ,tiponegocio);

}

function fechaDDMMAA(fechaAAMMDD){
    //2018-01-01 --> 01-01-2018
    var anio= fechaAAMMDD.substring(0,4);
    var mes= fechaAAMMDD.substring(5,7);
    var dia= fechaAAMMDD.substring(8,10);
    return dia+"-"+mes+"-"+anio;
    
}


function logOut(){
  firebase.auth().signOut();
  //alert("Sesión cerrada.");
  window.location.href="../login.html";
}