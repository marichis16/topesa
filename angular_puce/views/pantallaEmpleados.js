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
    const dbRef = firebase.database().ref().child('empleados');
    //dbRef.on('value', snap => holamundo.innerText = snap.val());
    //console.log(snap.val());
    //const dbRefLista= dbRef.child('cuenta');
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

    cell1.innerHTML = returnArr.length-i;
    cell2.innerHTML = returnArr[i].cedula;
    cell3.innerHTML = returnArr[i].nombre;
    cell4.innerHTML = returnArr[i].apellido;
    cell5.innerHTML = returnArr[i].email;
    cell6.innerHTML = returnArr[i].telefono;

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
// inserta la data en el arbol de firebase 
function insertar(cedula,apellido,email, nombre, telefono){
  const dbRef = firebase.database().ref().child('empleados');
  //dbRef.on('value', snap => holamundo.innerText = snap.val());
  //console.log(snap.val());
 // const dbRefLista= dbRef.child('cuenta');
var refnuevo = dbRef.push({
  cedula: cedula,
  apellido: apellido,
  email: email,
  nombre: nombre,
  telefono: telefono
  

});
// ingresar en la autenticacion el usuario 
console.log("Obtenuiendo el empleado ingresado a firebase: ");
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
var cedula= document.getElementById('cedula').value;
var apellido= document.getElementById('apellido').value;
var email = document.getElementById('email').value;
var nombre = document.getElementById('nombre').value;
var telefono = document.getElementById('telefono').value;


    

    
insertar(cedula,apellido,email, nombre, telefono);

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