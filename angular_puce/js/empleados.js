// ---------------- Variables ----------------
var returnArr = [];

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
var db = firebase.database();
var auth = firebase.auth();
const lista = document.getElementById('lista');
const dbRef_empleados = firebase.database().ref().child('empleados');

dbRef_empleados.on('value', snap => {
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


  //Llena tabla
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
    cell2.innerHTML = returnArr[i].cedula;
    cell3.innerHTML = returnArr[i].nombre;
    cell4.innerHTML = returnArr[i].apellido;
    cell5.innerHTML = returnArr[i].email;
    cell6.innerHTML = returnArr[i].telefono;
    cell7.innerHTML = "<button class='btn btn-link' onclick='cargarEditar("+i+")'>Editar</button>";
    cell8.innerHTML = "<button class='btn btn-link' onclick='ejecutarEliminar(\""+returnArr[i].key+"\")'>Eliminar</button>";
  }
});


// ---------------- Ejecuta Insert ----------------
function ejecutarInsert(){

  var cedula= document.getElementById('cedula').value;
  var apellido= document.getElementById('apellido').value;
  var email = document.getElementById('email').value;
  var nombre = document.getElementById('nombre').value;
  var telefono = document.getElementById('telefono').value;
  var password = document.getElementById('password').value;

  if(cedula != "" && nombre != "" && apellido != "" && email != "" && telefono != "" && password != ""){
    if(validar()){
      if (verificarRepeticion()){
        //alert("Cedula válida");
        createUser(cedula,apellido,email, nombre, telefono, password);
      }
      else
        alert("La cédula de identificación ya existe.");
    }
    else
      alert("Cédula inválida.");
  } 
  else
    alert("Ingrese todos los campos.");
}

// ---------------- Crea un nuevo usuario ----------------
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

// ---------------- Ingresa los datos ----------------
function insertar(cedula,apellido,email, nombre, telefono, userID){
  const dbRef_empleados = firebase.database().ref().child('empleados').child(userID);
  var refnuevo = dbRef_empleados.set({
    cedula: cedula,
    apellido: apellido,
    email: email,
    nombre: nombre,
    telefono: telefono
  });

  alert("Empleado creado correctamente"); 
  console.log("Empleado ingresado a firebase: ");
  console.log(refnuevo);
  mostrarNuevo();
}

// ---------------- Carga datos para editar ----------------
function cargarEditar(posicion){

  document.getElementById('cedula').value= returnArr[posicion].cedula;
  document.getElementById('apellido').value= returnArr[posicion].apellido;
  document.getElementById('email').value= returnArr[posicion].email;
  document.getElementById('nombre').value= returnArr[posicion].nombre;
  document.getElementById('telefono').value= returnArr[posicion].telefono;
  document.getElementById('key_empleado').value= returnArr[posicion].key;

  mostrarExistente();
}

// ---------------- Ejecuta Editar ----------------
function ejecutarEditar(){

  var cedula= document.getElementById('cedula').value;
  var apellido= document.getElementById('apellido').value;
  var email = document.getElementById('email').value;
  var nombre = document.getElementById('nombre').value;
  var telefono = document.getElementById('telefono').value;
  var key_empleado= document.getElementById('key_empleado').value;
  
  if(cedula != "" && nombre != "" && apellido != "" && email != "" && telefono != ""){
    if(validar()){
        editar(key_empleado,cedula,apellido,email, nombre, telefono);
    }
    else
      alert("Cedula inválida");
  }
  else
    alert("Ingrese todos los campos.");
}

// ---------------- Edita en la base ----------------
function editar(key_empleado,cedula,apellido,email, nombre, telefono){
  
  const dbRef_empleados = firebase.database().ref('empleados/' + key_empleado);
  var refnuevo = dbRef_empleados.set({
    cedula: cedula,
    apellido: apellido,
    email: email,
    nombre: nombre,
    telefono: telefono
  });
  alert("Guardado con éxito.");
}

// ---------------- Ejecuta Eliminar ----------------
function ejecutarEliminar(key_empleado){
  if( confirm("Seguro desea eliminar?")){
    eliminar(key_empleado);
  }
}

// ---------------- Elimina de la base ----------------
function eliminar(key_empleado){
  const dbRef_empleados = firebase.database().ref('empleados/' + key_empleado);//.child('empleados');
  dbRef_empleados.remove();
}

// ---------------- Valida la cédula ----------------
function validar() {
  var ced = document.getElementById('cedula').value.trim();
  var total = 0;
  var longitud = ced.length;
  var longcheck = longitud - 1;

  if (ced !== "" && longitud === 10){
    for(i = 0; i < longcheck; i++){
      if (i%2 === 0) {
        var aux = ced.charAt(i) * 2;
        if (aux > 9) aux -= 9;
        total += aux;
      } 
      else 
        total += parseInt(ced.charAt(i)); 
    }

    total = total % 10 ? 10 - total % 10 : 0;

    if (ced.charAt(longitud-1) == total) 
      return true;
    else
      return false;
  }
}

// ---------------- Verifica repetición de cédula ----------------
function verificarRepeticion (){
  var ced = document.getElementById('cedula').value.trim();
  var verifica = true;

  console.log('Arreglo de empleados');
  console.log( returnArr);

    for (i in returnArr) {
      if(ced == returnArr[i].cedula){
        verifica = false;
        break;
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

// ---------------- Formulario registro existente ----------------
function mostrarExistente(){
  document.getElementById("divNuevo").style.display = "block";
  document.getElementById('btnInsertar').style.display = 'none'; 
  document.getElementById('btnEditar').style.display = 'block'; 
  document.getElementById('divEmail').style.display = 'none'; 
  document.getElementById('divPass').style.display = 'none'; 
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