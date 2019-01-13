// ---------------- Variables ----------------
var returnArr = [];
var returnEmpleados = [];
var returnClientes = [];

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
const dbRef_visitas = firebase.database().ref().child('visitas');
const dbRef_empleados = firebase.database().ref().child('empleados'); 
const dbRef_clientes = firebase.database().ref().child('clientes');

dbRef_empleados.on('value', snap=>{
    returnEmpleados= [];
    snap.forEach(function(snap){
        console.log('Empleado: ');
        var item = snap.val();
        item.key= snap.key;
        console.log(item);
        returnEmpleados.push(item);
    });

    // Llena Select
    var selectEmpleado = document.getElementById("empleado");

    for (i in returnEmpleados) {
      var option = document.createElement("option");// crear la opcion 
      option.text =  returnEmpleados[i].nombre + " "+  returnEmpleados[i].apellido;
      option.value =  returnEmpleados[i].key;
      selectEmpleado.add(option);
    }
});

dbRef_clientes.on('value', snap=>{
    returnClientes= [];
    snap.forEach(function(snap){
        console.log('Cliente: ');
        var item = snap.val();
        item.key= snap.key;
        console.log(item);
        returnClientes.push(item);
    })
});

dbRef_visitas.on('value', snap => {
  returnArr = [];
  snap.forEach(function (snap) {
    var item = snap.val();
    item.key = snap.key;
    for (i in item) {
      if (item.key != item[i]) {
        //Busca el nombre del cliente de acuerdo a su key
        for(cli in returnClientes){
          if(returnClientes[cli].key == item[i].clienteID){
            item[i].clienteID = returnClientes[cli].nombre;

          }
        }

        //Busca el nombre del empleado de acuerdo a su key
        for(emp in returnEmpleados){
          if(returnEmpleados[emp].key == item[i].empleadoID){
            item[i].empleadoID = returnEmpleados[emp].nombre + " "+returnEmpleados[emp].apellido;
          }
        }
        returnArr.push(item[i]);
        console.log(item[i]);
      }
    }
  });

  console.log('Visitas: ');
  console.log(returnArr);

});


// ---------------- Ubica en Mapa ----------------
function verUbicacionMapa(posicion) {

  document.getElementById('divMapa').style.display = 'block'; 

  initMap();

  console.log(returnArr[posicion]);
  latInicio = returnArr[posicion].latitudInicio;
  lngInicio = returnArr[posicion].longitudInicio;
  latFin = returnArr[posicion].latitudFin;
  lngFin = returnArr[posicion].longitudFin;
  var lugarInicio = {
    lat: latInicio,
    lng: lngInicio
  };
  var lugarFin = {
    lat: latFin,
    lng: lngFin
  };

  map = new google.maps.Map(
    document.getElementById('map'), {
    zoom: 20,
    center: lugarInicio
  });

  console.log(lugarInicio);
  console.log(lugarFin);

  markerInicio = new google.maps.Marker({
    position: lugarInicio,
    label: "Inicio",
    map: map
  });
  markerFin = new google.maps.Marker({
    position: lugarFin,
    label: "Fin",
    map: map
  });
}

// ---------------- Busca Visitas ----------------
function buscarVisitas(){

  document.getElementById('divMapa').style.display = 'none'; 

  var fechaInicio = document.getElementById('fechaInicio').value;
  var fechaFin = document.getElementById('fechaFin').value;
  var empleadoID = document.getElementById('empleado').value;

  if(fechaInicio != "" && fechaFin != "")
  {
    var from = new Date(fechaInicio);
    console.log('From: '+from);

    var to = new Date(fechaFin);
    console.log('To: '+to);

    if(from<=to)
    {
      if(empleadoID!="")
      {
        document.getElementById('tabla').style.display = 'block';
        document.getElementById('divMostrar').style.display = 'block';

        const dbRefBusqueda = firebase.database().ref().child('visitas').child(empleadoID);
        dbRefBusqueda.on('value', snap => {
          returnArr = [];
          snap.forEach(function (snap) {
            var item = snap.val();
            item.key = snap.key;
            returnArr.push(item);
            console.log('Visitas: ');
            console.log(returnArr);
      
            // Transformar Fecha
            console.log('Fecha: '+item.fecha); //Fecha: 21-12-2018
            var itemFecha = item.fecha;;
            var dia = itemFecha.substring(0, 2);
            var mes = itemFecha.substring(3,5);
            var anio = itemFecha.substring(6, 10);
            var fecha = anio + "-" + mes + "-" + dia;
      
            var check = new Date(fecha);
            console.log('Check: '+check);
      
            // Verificar
            if(check >= from && check < to)
            {
              //Busca el nombre del cliente de acuerdo a su key
              for(cli in returnClientes){
                if(returnClientes[cli].key == item.clienteID){
                  item.clienteID = returnClientes[cli].nombre;
                }
              }
      
              //Busca el nombre del empleado de acuerdo a su key
              for(emp in returnEmpleados){
                if(returnEmpleados[emp].key == item.empleadoID){
                  item.empleadoID = returnEmpleados[emp].nombre + " "+returnEmpleados[emp].apellido;
                }
              }
            }
            else
            {
              document.getElementById('divMostrar').style.display = 'none';
              returnArr = [];
            }
          });
        });
        
        // Llena Tabla
        
        var table = document.getElementById('myTable');
      
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
      
          cell1.innerHTML = returnArr.length - i;
          cell2.innerHTML = returnArr[i].empleadoID;
          cell3.innerHTML = returnArr[i].clienteID;
          cell4.innerHTML = returnArr[i].fecha;
          cell5.innerHTML = returnArr[i].horaInicio;
          cell6.innerHTML = returnArr[i].horafin;
          cell7.innerHTML = returnArr[i].observacion;
          cell8.innerHTML = "<img src='" + returnArr[i].imagenURI + "' width='100' heigth='100' >";
          cell9.innerHTML = "<button class='btn btn-link' onclick='verUbicacionMapa(" + i + ")'>Ver en mapa</button>";
        }
      }
      else
        alert("Seleccione un empleado.");
    }
    else
      alert("La fecha de inicio no puede ser mayor a la fecha fin.");
  }
  else
    alert("Escoger fechas. ");
}

// ---------------- Despliega visitas en mapa ----------------
function verTodosMapa(){
  document.getElementById('divMapa').style.display = 'block'; 

  initMap();

  var locations = [];
  console.log('Arreglo: ');
  console.log(returnArr);
  for(i in returnArr){
    var latitud = returnArr[i].latitudInicio;
    var longitud = returnArr[i].longitudInicio;
    var lugar = [returnArr[i].clienteID, latitud, longitud, i];
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
  window.location.href="../login.html";
}

// ---------------- Cierra Mapa ----------------
function cerrarMapa(){
  document.getElementById('divMapa').style.display = 'none';
}
