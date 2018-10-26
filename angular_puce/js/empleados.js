
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
var db = firebase.database();
var auth = firebase.auth();

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
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

  cell1.innerHTML = returnArr.length-i;
  cell2.innerHTML = returnArr[i].cedula;
  cell3.innerHTML = returnArr[i].nombre;
  cell4.innerHTML = returnArr[i].apellido;
  cell5.innerHTML = returnArr[i].email;
  cell6.innerHTML = returnArr[i].telefono;
  cell7.innerHTML = "<button class='btn btn-link' onclick='cargar_editar("+i+")'>Editar</button>";
  cell8.innerHTML = "<button class='btn btn-link' onclick='ejecutar_eliminar(\""+returnArr[i].key+"\")'>Eliminar</button>";

}



/*const li= document.createElement('li');
listaUsuarios=JSON.stringify(snap.val());

li.innerText = listaUsuarios;
lista.appendChild(li);*/

//console.log(JSON.stringify(snap.val()));


});



// inserta la data en el arbol de firebase 
function insertar(cedula,apellido,email, nombre, telefono, userID){


  const dbRef = firebase.database().ref().child('empleados').child(userID);
  var refnuevo = dbRef.set({
    cedula: cedula,
    apellido: apellido,
    email: email,
    nombre: nombre,
    telefono: telefono
  });

  alert("Empleado creado correctamente");
  console.log("Obteniendo el empleado ingresado a firebase: ");
  console.log(refnuevo);
  mostrarNuevo();
}


function createUser(cedula,apellido,email, nombre, telefono, pass){
  
  const password = pass;
  var userId="";
  
  auth.createUserWithEmailAndPassword(email, password)
      .then(function (event) {
          user = auth.currentUser;
          userId = user.uid;
          console.log("UserID: "+userId);
          insertar(cedula,apellido,email, nombre, telefono, userId);
    })
    .catch(function(error) {
        alert(error.message);
        console.log(error.message);
    });


}


function editar(key_empleado,cedula,apellido,email, nombre, telefono){
  
const dbRef = firebase.database().ref('empleados/' + key_empleado);//.child('empleados');
  var refnuevo = dbRef.set({
    cedula: cedula,
    apellido: apellido,
    email: email,
    nombre: nombre,
    telefono: telefono
  });
}

function ejecutarEditar(){

  var cedula= document.getElementById('cedula').value;
  var apellido= document.getElementById('apellido').value;
  var email = document.getElementById('email').value;
  var nombre = document.getElementById('nombre').value;
  var telefono = document.getElementById('telefono').value;
  var key_empleado= document.getElementById('key_empleado').value;
    
  editar(key_empleado,cedula,apellido,email, nombre, telefono);

}

function cargar_editar(posicion){

  document.getElementById('cedula').value= returnArr[posicion].cedula;
  document.getElementById('apellido').value= returnArr[posicion].apellido;
  document.getElementById('email').value= returnArr[posicion].email;
  document.getElementById('nombre').value= returnArr[posicion].nombre;
  document.getElementById('telefono').value= returnArr[posicion].telefono;
  document.getElementById('key_empleado').value= returnArr[posicion].key;

  mostrarExistente();
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
  var password = document.getElementById('password').value;

  createUser(cedula,apellido,email, nombre, telefono, password);

}


//*****************************eliminar
function ejecutar_eliminar(key_empleado){
  if( confirm("Seguro desea eliminar?")){
    eliminar(key_empleado);
  }
}
function eliminar(key_empleado){
  const dbRef = firebase.database().ref('empleados/' + key_empleado);//.child('empleados');
  dbRef.remove();
}
//*****************************************

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
      document.getElementById('divEmail').style.display = 'block'; 
      document.getElementById('divPass').style.display = 'block'; 

      document.getElementById('cedula').value= "";
      document.getElementById('apellido').value= "";
      document.getElementById('email').value= "";
      document.getElementById('password').value= "";
      document.getElementById('nombre').value= "";
      document.getElementById('telefono').value="";
      document.getElementById('key_empleado').value="";
  } else {
      x.style.display = "none";
  }
}

function mostrarExistente(){
  document.getElementById("divNuevo").style.display = "block";
  document.getElementById('btn_insertar').style.display = 'none'; 
  document.getElementById('btn_editar').style.display = 'block'; 
  document.getElementById('divEmail').style.display = 'none'; 
  document.getElementById('divPass').style.display = 'none'; 
}
function cerrarNuevo(){
  document.getElementById('divNuevo').style.display = 'none';
}

function logOut(){
  firebase.auth().signOut();
  //alert("Sesión cerrada.");
  window.location.href="../login.html";
}