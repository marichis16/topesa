var returnArr = [];
var returnEmpleados = [];
var returnClientes= [];

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
    const dbRef = firebase.database().ref().child('visitas');
    const dbRef_empleados = firebase.database().ref().child('empleados');// para pobalr el select 
    const dbRef_clientes= firebase.database().ref().child('clientes');
   
    // var empleado;
    // var cliente;

    // dbRef_empleados.on('value', snap=>{
    //     returnEmpleados= [];
    //     snap.forEach(function(snap){
    //         console.log('Elemento');
    //         var item = snap.val();
    //         item.key= snap.key;
    //         console.log(item);
    //         returnEmpleados.push(item);
    //     })
    // });

    // dbRef_clientes.on('value', snap=>{
    //     returnClientes= [];
    //     snap.forEach(function(snap){
    //         console.log('Elemento');
    //         var item = snap.val();
    //         item.key= snap.key;
    //         console.log(item);
    //         returnClientes.push(item);
    //     })
    // });


    dbRef.on('value', snap => {
        returnArr=[];
        snap.forEach(function(snap) {
          console.log('Elemento');
          var item=snap.val();
          item.key = snap.key;
          for (i in item) {
             if(item.key!= item[i]){
                  console.log( item[i]);
                  returnArr.push(item[i]);
              }
          }
        });

  console.log('Arreglo');

  console.log( returnArr);


// --------------------------------
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
    cell2.innerHTML = returnArr[i].empleadoID;
    cell3.innerHTML = returnArr[i].clienteID;
    cell4.innerHTML = returnArr[i].fecha;
    cell5.innerHTML = returnArr[i].horaInicio;
    cell6.innerHTML = returnArr[i].horafin;
    cell7.innerHTML = returnArr[i].observacion;
    cell8.innerHTML = "<img src='"+returnArr[i].imagenURI+"' width='100' heigth='100' >";
    cell9.innerHTML =  "<a  target='_blank' href='https://www.google.com/maps/?q="+returnArr[i].latitudInicio+","+returnArr[i].longitudInicio+"' >Ubicacion</a>";
    cell10.innerHTML = "<a  target='_blank' href='https://www.google.com/maps/?q="+returnArr[i].latitudFin+","+returnArr[i].longitudFin+"' >Ubicacion</a>";
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
    
    var cell9 = row.insertCell(8);
    var cel10 = row.insertCell(9);

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


    function fechaDDMMAA(fechaAAMMDD){
        //2018-01-01 --> 01-01-2018
        var anio= fechaAAMMDD.substring(0,4);
        var mes= fechaAAMMDD.substring(5,7);
        var dia= fechaAAMMDD.substring(8,10);
        return dia+"-"+mes+"-"+anio;
        
    }