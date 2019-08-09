firebase.auth().onAuthStateChanged(function(user){
    if(user){
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("home").style.display = "block";
    }
    else{
        document.getElementById("login-screen").style.display = "block";
        document.getElementById("home").style.display = "none";
    }
});

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert(errorMessage);
        // ...
    });
}

function logout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}