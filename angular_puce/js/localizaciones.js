// ---------------- Variables ----------------
var returnArr = [];
var latitudVehiculo;
var longitudVehiculo;
var placaVehiculo;
var objVehiculo;
var markerVehiculo;

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
const dbRef_localizaciones = firebase.database().ref().child('localizaciones');
dbRef_localizaciones.on('value', snap => {
  returnArr = [];
  snap.forEach(function (snap) {
    console.log('Elemento');
    var item = snap.val();
    item.key = snap.key;

    console.log(item);
    returnArr.push(item);
  });

  console.log('Arreglo');
  console.log(returnArr);

  //Llena tabla
  var table = document.getElementById('myTable');
  var cont = 0;

  var tableHeaderRowCount = 1;
  var table = document.getElementById('myTable');
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }

  for (i in returnArr) {
    if (returnArr[i].length > 0) {
      console.log("Última ubicación de " + returnArr[i].key);
      var objUbicacion = returnArr[i][returnArr[i].length - 1];
      console.log(objUbicacion);

      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);

      cell1.innerHTML = cont++;
      cell2.innerHTML = objUbicacion.lat;
      cell3.innerHTML = objUbicacion.lng;
      cell4.innerHTML = objUbicacion.power;
      cell5.innerHTML = returnArr[i].key;
      cell7.innerHTML = "<button class='btn btn-link' onclick='localizarEnMapa(" + i + ")'>Ver</button>";

    }

    if(returnArr[i].key== placaVehiculo){

      latitudVehiculo= objUbicacion.lat;
      longitudVehiculo= objUbicacion.lng;

      actualizarMarker(placaVehiculo,latitudVehiculo,longitudVehiculo);
    }
  }
});

// ---------------- Localiza en mapa ----------------
function localizarEnMapa(posicion) {
  var objUbicacion = returnArr[posicion][returnArr[posicion].length - 1];
  latitudVehiculo= objUbicacion.lat;
  longitudVehiculo= objUbicacion.lng;
  placaVehiculo= returnArr[posicion].key;
  actualizarMarker(placaVehiculo,latitudVehiculo,longitudVehiculo);
  initMap();

  console.log(returnArr[posicion]);
  latInicio = objUbicacion.lat;
  lngInicio =  objUbicacion.lng;
 
  var lugarInicio = {
    lat: latInicio,
    lng: lngInicio
  };

  map = new google.maps.Map(
    document.getElementById('map'), {
    zoom: 20,
    center: lugarInicio
  });

  console.log(lugarInicio);
  markerVehiculo= new google.maps.Marker({
    position: lugarInicio,
    label: returnArr[posicion].key,
    map: map
  });

}

// ---------------- Actualiza marcador ----------------
function actualizarMarker(placa_seleccionada,latitud,longitud){
  var placaVehiculo = document.getElementById('placa_seleccionada');
  //placaVehiculo.innerHTML= "Placa: " + placa_seleccionada + " Latitud: "+latitud+" Longitud:"+ longitud;
  localizarEnMapaObj(placa_seleccionada,latitud,longitud);
}

// ---------------- Localiza en mapa objeto ----------------
function localizarEnMapaObj(placa, latitud,longitud) {
  latitudVehiculo= latitud;
  longitudVehiculo= longitud;
  placaVehiculo= placa;
  //actualizarMarker(placaVehiculo,latitudVehiculo,longitudVehiculo);
  // alert(posicion);
  initMap();

  latInicio = latitud;
  lngInicio =  longitud;
 
  var lugarInicio = {
    lat: latInicio,
    lng: lngInicio
  };

  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 18,
      center: lugarInicio
  });

  console.log(lugarInicio);
  markerVehiculo= new google.maps.Marker({
    position: lugarInicio,
    label: placa,
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
    var objUbicacion = returnArr[i][returnArr[i].length - 1];
    var latitud = objUbicacion.lat;
    var longitud = objUbicacion.lng;
    var lugar = [returnArr[i].key, latitud, longitud, i];
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

// ---------------- Cierra Sesión ----------------
function logOut(){
  firebase.auth().signOut();
  //alert("Sesión cerrada.");
  window.location.href="../login.html";
}






