var returnArr = [];
// vehiculo seleccionado 
var latitud_vehiculo;
var longitud_vehiculo;
var placa_vehiculo;
var obj_vehiculo;
var marker_vehiculo;
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
const dbRef = firebase.database().ref().child('localizaciones');
//dbRef.on('value', snap => holamundo.innerText = snap.val());
//console.log(snap.val());
// const dbRefLista= dbRef.child('clientes');
dbRef.on('value', snap => {
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

  //--------------------------------
  var table = document.getElementById('myTable');
  var cont = 0;

  var tableHeaderRowCount = 1;
  var table = document.getElementById('myTable');
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }


  for (i in returnArr) {


    /*

    */
    //cell2.innerHTML = returnArr[i].lat;

    // solo obtener el ultimo 
    if (returnArr[i].length > 0) {
      console.log("ultima ubicacione de " + returnArr[i].key);
      var obj_ubicacion = returnArr[i][returnArr[i].length - 1];
      console.log(obj_ubicacion);

      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);

      cell1.innerHTML = cont++;
      cell2.innerHTML = obj_ubicacion.lat;
      cell3.innerHTML = obj_ubicacion.lng;
      cell4.innerHTML = obj_ubicacion.power;
      cell5.innerHTML = returnArr[i].key;
      cell6.innerHTML = obj_ubicacion.power;
      cell7.innerHTML = "<button onclick='localizar_en_mapa(" + i + ")'>Seguir</button>";

    }

    if(returnArr[i].key== placa_vehiculo){

      latitud_vehiculo= obj_ubicacion.lat;
      longitud_vehiculo=obj_ubicacion.lng;

      actualizar_marker(placa_vehiculo,latitud_vehiculo,longitud_vehiculo);
    }

    /*  for (j in returnArr[i]) {
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
  
        cell1.innerHTML = cont++;
        cell2.innerHTML =  returnArr[i][j].lat;
        cell3.innerHTML = returnArr[i][j].lng;
        cell4.innerHTML = returnArr[i][j].power;
        cell5.innerHTML = returnArr[i].key;

      }*/


  }



  /*const li= document.createElement('li');
listaUsuarios=JSON.stringify(snap.val());

 li.innerText = listaUsuarios;
 lista.appendChild(li);*/

  //console.log(JSON.stringify(snap.val()));
// al final actualizar el marcador 


});

//***************************************************/

function actualizar_marker(placa_seleccionada,latitud,longitud){
  var placa_vehiculo = document.getElementById('placa_seleccionada');
  placa_vehiculo.innerHTML= "Placa: " + placa_seleccionada + " Latitud: "+latitud+" Longitud:"+ longitud;
  //obj_vehiculo;
  localizar_en_mapa_obj(placa_seleccionada,latitud,longitud);
}
//***************************************************/
function localizar_en_mapa(posicion) {
  var obj_ubicacion = returnArr[posicion][returnArr[posicion].length - 1];
  latitud_vehiculo= obj_ubicacion.lat;
  longitud_vehiculo= obj_ubicacion.lng;
  placa_vehiculo= returnArr[posicion].key;
  actualizar_marker(placa_vehiculo,latitud_vehiculo,longitud_vehiculo);
  // alert(posicion);
  initMap();


  // posicion
  console.log(returnArr[posicion]);
  lat_inicio = obj_ubicacion.lat;
  long_inicio =  obj_ubicacion.lng;
 
  var lugar_inicio = {
    lat: lat_inicio,
    lng: long_inicio
  };

  // zoom al mapa
  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 20,
      center: lugar_inicio
    });

  console.log(lugar_inicio);
  // The marker, positioned at Uluru
  marker_vehiculo= new google.maps.Marker({
    position: lugar_inicio,
    label: returnArr[posicion].key,

    map: map
  });

}

//***************************************************/
function localizar_en_mapa_obj(placa, latitud,longitud) {
  latitud_vehiculo= latitud;
  longitud_vehiculo= longitud;
  placa_vehiculo= placa;
  //actualizar_marker(placa_vehiculo,latitud_vehiculo,longitud_vehiculo);
  // alert(posicion);
  initMap();


  // posicion
  lat_inicio = latitud;
  long_inicio =  longitud;
 
  var lugar_inicio = {
    lat: lat_inicio,
    lng: long_inicio
  };

  // zoom al mapa
  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 18,
      center: lugar_inicio
    });

  console.log(lugar_inicio);
  // The marker, positioned at Uluru
  marker_vehiculo= new google.maps.Marker({
    position: lugar_inicio,
    label: placa,

    map: map
  });

}






