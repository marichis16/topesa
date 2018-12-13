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

    console.log('RUC:'+ returnArr[i].ruc);

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
    var cell11 = row.insertCell(10);
    var cell12 = row.insertCell(11);

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
    cell11.innerHTML = "<button class='btn btn-link' onclick='cargar_editar("+i+")'>Editar</button>";
    cell12.innerHTML = "<button class='btn btn-link' onclick='ejecutar_eliminar(\""+returnArr[i].key+"\")'>Eliminar</button>";
}



 /*const li= document.createElement('li');
listaUsuarios=JSON.stringify(snap.val());

 li.innerText = listaUsuarios;
 lista.appendChild(li);*/

  //console.log(JSON.stringify(snap.val()));


});

// ingresar en la autenticacion el usuario 


function cargar_editar(posicion){

  document.getElementById('ruc').value= returnArr[posicion].ruc;
  document.getElementById('nombre').value= returnArr[posicion].nombre;
  document.getElementById('responsable').value= returnArr[posicion].responsable;
  document.getElementById('direccion').value= returnArr[posicion].direccion;
  document.getElementById('telefono').value= returnArr[posicion].telefono;
  document.getElementById('celular').value= returnArr[posicion].celular;
  document.getElementById('email').value= returnArr[posicion].email;
  document.getElementById('imagenURI').value= returnArr[posicion].imagenURI;
  document.getElementById('lat').value= returnArr[posicion].lat;
  document.getElementById('lng').value= returnArr[posicion].lng;
  document.getElementById('key_cliente').value= returnArr[posicion].key;

  mostrarExistente();
}

function ejecutarEditar(){

  var ruc= document.getElementById('ruc').value;
  var nombre= document.getElementById('nombre').value;
  var responsable = document.getElementById('responsable').value;
  var direccion = document.getElementById('direccion').value;
  var telefono = document.getElementById('telefono').value;
  var celular = document.getElementById('celular').value;
  var email = document.getElementById('email').value;
  var imagenURI = document.getElementById('imagenURI').value;
  var lat = document.getElementById('lat').value;
  var lng = document.getElementById('lng').value;
  var key_cliente= document.getElementById('key_cliente').value;
    
  editar(key_cliente,ruc,nombre,responsable, direccion, telefono, celular,email, imagenURI, lat, lng);

}

function editar(key_cliente,ruc,nombre,responsable, direccion, telefono, celular, email, imagenURI, lat, lng){
  
  const dbRef = firebase.database().ref('clientes/' + key_cliente);//.child('empleados');
    var refnuevo = dbRef.set({
      ruc: ruc,
      nombre: nombre,
      responsable: responsable,
      direccion: direccion,
      telefono: telefono,
      celular: celular,
      email: email,
      imagenURI: imagenURI,
      lat: lat,
      lng: lng
    });
    alert("Guardado con éxito"); 
  }

  function ejecutar_eliminar(key_cliente){
    if( confirm("Seguro desea eliminar?")){
      eliminar(key_cliente);
    }
  }
  function eliminar(key_cliente){
    const dbRef = firebase.database().ref('clientes/' + key_cliente);//.child('empleados');
    dbRef.remove();
  }

function mostrarExistente(){
  document.getElementById("divNuevo").style.display = "block";
  document.getElementById('btn_editar').style.display = 'block'; 
}

function limit(element)
{
    var max_chars = 9;

    if(element.value.length > max_chars) {
        element.value = element.value.substring(0, max_chars);
    }
}

function cerrar(){
  document.getElementById('divNuevo').style.display = 'none';
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