(function(){

    const config = {
        apiKey: "AIzaSyD84c5uXptNfZa0UcaxvTuVZd2R3eTzvxA",
        authDomain: "control-7c5d7.firebaseapp.com",
        databaseURL: "https://control-7c5d7.firebaseio.com",
        projectId: "control-7c5d7",
        storageBucket: "control-7c5d7.appspot.com",
        messagingSenderId: "635319972706"
    };
    firebase.initializeApp(config);

    const txtEmail = document.getElementById("email");
    const txtPassword= document.getElementById("password");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignup");

    btnLogin.addEventListener('click', e=> {
        const email= txtEmail.value;
        const password = txtPassword.value;
        const auth= firebase.auth();

        auth.signInWithEmailAndPassword(email, password)
        .then(function(result){
            window.location.href="views/pantallaEmpleados.html";
        })
        .catch(function(error) {
            alert("El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.");
        });
    });

    btnSignUp.addEventListener('click', e=>{
        const email= txtEmail.value;
        const password = txtPassword.value;
        const auth= firebase.auth();

        auth.createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            alert(error.message);
            console.log(error.message);
          });
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
        }
        else{
            console.log('Error en autenticacion');
        }
           
    });

}());