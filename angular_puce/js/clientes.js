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
const lista = document.getElementById('lista');
const dbRef_clientes = firebase.database().ref().child('clientes');

dbRef_clientes.on('value', snap => {
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

  cell1.innerHTML = returnArr.length-i;
  cell2.innerHTML = returnArr[i].ruc;
  cell3.innerHTML = returnArr[i].nombre;
  cell4.innerHTML = returnArr[i].responsable;
  cell5.innerHTML = returnArr[i].direccion;
  cell6.innerHTML = returnArr[i].telefono;
  cell7.innerHTML = returnArr[i].celular;
  cell8.innerHTML = returnArr[i].email;
  cell9.innerHTML = "<img src='"+returnArr[i].imagenURI+"' width='100' heigth='100' >";
  cell10.innerHTML = "<button class='btn btn-link' onclick='verUbicacionMapa(" + i + ")'>Ver en mapa</button>";
  cell11.innerHTML = "<button class='btn btn-link' onclick='cargarEditar("+i+")'>Editar</button>";
  cell12.innerHTML = "<button class='btn btn-link' onclick='ejecutarEliminar(\""+returnArr[i].key+"\")'>Eliminar</button>";
}

});


// ---------------- Carga datos para editar ----------------

function cargarEditar(posicion){

  cerrarMapa();
  document.getElementById('ruc').value= returnArr[posicion].ruc;
  document.getElementById('nombre').value= returnArr[posicion].nombre;
  document.getElementById('responsable').value= returnArr[posicion].responsable;
  document.getElementById('direccion').value= returnArr[posicion].direccion;
  document.getElementById('telefono').value= returnArr[posicion].telefono;
  document.getElementById('celular').value= returnArr[posicion].celular;
  document.getElementById('email').value= returnArr[posicion].email;
  document.getElementById('imagenURI').value= returnArr[posicion].imagenURI;
  document.getElementById('imagen').src= returnArr[posicion].imagenURI;
  document.getElementById('lat').value= returnArr[posicion].lat;
  document.getElementById('lng').value= returnArr[posicion].lng;
  document.getElementById('key_cliente').value= returnArr[posicion].key;

  mostrarExistente();
}

// ---------------- Ejecuta edición ----------------
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

// ---------------- Editar ----------------
function editar(key_cliente,ruc,nombre,responsable, direccion, telefono, celular, email, imagenURI, lat, lng){
  
  const dbRef_clientes = firebase.database().ref('clientes/' + key_cliente);//.child('empleados');
    var refNuevo = dbRef_clientes.set({
      ruc: ruc,
      nombre: nombre,
      responsable: responsable,
      direccion: direccion,
      telefono: telefono,
      celular: celular,
      email: email,
      imagenURI: imagenURI,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });
  alert("Guardado con éxito"); 
}

// ---------------- Confirma Eliminar ----------------
function ejecutarEliminar(key_cliente){
  if( confirm("Seguro desea eliminar?")){
    eliminar(key_cliente);
  }
}

// ---------------- Elimina ----------------
function eliminar(key_cliente){
  const dbRef_clientes = firebase.database().ref('clientes/' + key_cliente);//.child('empleados');
  dbRef_clientes.remove();
}

// ---------------- Muestra Formulario ----------------
function mostrarExistente(){
  document.getElementById("divNuevo").style.display = "block";
  document.getElementById('btnEditar').style.display = 'block'; 
  document.getElementById('divRUC').style.display = 'none'; 
}


// ---------------- Cargar Imagen ----------------
var uploader = document.getElementById('uploader');
var btnImagen = document.getElementById('btnImagen');

btnImagen.addEventListener('change', function(e){
  var imagenFile = e.target.files[0];
  var storageRef= firebase.storage().ref('clientes/'+imagenFile.name);

  var task= storageRef.put(imagenFile);
  task.on('state_changed',
    function progress(snapshot){
      var porcentaje =(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      uploader.value = porcentaje;
    },
    function error (err){
      alert(err);
    },
    function (){
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        document.getElementById('imagen').src= downloadURL;
        document.getElementById('imagenURI').value= "";
        document.getElementById('imagenURI').value= downloadURL;
      });
    }
  );
});

// ---------------- Ver Ubicación en Mapa ----------------
function verUbicacionMapa(posicion) {

  document.getElementById('divMapa').style.display = 'block'; 

  initMap();

  console.log(returnArr[posicion]);
  latitud = returnArr[posicion].lat;
  longitud = returnArr[posicion].lng;
  nombre = returnArr[posicion].nombre;
  var lugar= {
    lat: latitud,
    lng: longitud
  };

  map = new google.maps.Map(
  document.getElementById('map'), {
    zoom: 20,
    center: lugar
  });

  console.log(lugar);
  
  marker = new google.maps.Marker({
    position: lugar,
    label: "" + nombre,
    map: map
  });

}

// ---------------- Despliega visitas en mapa ----------------
function verTodosMapa(){
  document.getElementById('divMapa').style.display = 'block'; 

  initMap();

  var locations = [];
  console.log('Arreglo: ');
  console.log(returnArr);
  for(i in returnArr){
    var latitud = returnArr[i].lat;
    var longitud = returnArr[i].lng;
    var lugar = [returnArr[i].nombre, latitud, longitud, i];
    locations.push(lugar);
  }
  console.log('Local: ');
  console.log(locations);

  var centro = {
    lat: locations[0][1],
    lng: locations[0][2]
  };
  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 20,
      center: centro
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      id: locations[i][3],
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

// ---------------- Oculta Formulario ----------------
function cerrar(){
  document.getElementById('divNuevo').style.display = 'none';
}

// ---------------- Oculta Mapa ----------------
function cerrarMapa(){
  document.getElementById('divMapa').style.display = 'none';
}

// ---------------- Cierra Sesisón ----------------
function logOut(){
  firebase.auth().signOut();
  window.location.href="../login.html";
}