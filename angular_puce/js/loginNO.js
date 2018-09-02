window.onload = inicializar;

var form;

function inicializar(){
  form= document.getElementById("formulario");
  form.addEventListener("submit", autenticacion, false);
}

function autenticacion(event){
 

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result){
      window.location.href="views/pantallaEmpleados.html";
    })
    .catch(function(error) {
      alert("El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.");
    });
}

// function crearNuevo(){
//   event.preventDefault();
//   var email= event.target.email.value;
//   var password= event.target.password.value;

//   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

//   });
// }