const auth = firebase.auth()
const db = firebase.firestore();
var loaed = false;
auth.onAuthStateChanged(function(user){
    if(user){
        console.log("state changed");
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("home-page").style.display = "block";
        document.getElementById("home").style.display = "block";
        
        var docRef = db.collection("user").doc(user.uid);
        docRef.get().then(function (doc) {
            if(doc.exists){
                var data = doc.data()
                var name = data.Name
                document.getElementById("username").innerHTML = name;
                console.log(doc.data());
            }
            else{
                document.getElementById("username").innerHTML = "no user found";
                console.log("not found")
            }
        }).catch(function (error){
            document.getElementById("username").innerHTML = "error";
            console.log(error)
        })
        
    }
    else{
        document.getElementById("login-screen").style.display = "block";
        document.getElementById("home-page").style.display = "none";
        document.getElementById("home").style.display = "none";
        document.getElementById("recruiter").style.display = "none";

    }
});

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var login = document.getElementById("btn-login");
    console.log("email : " + email);
    console.log("password : " + password);
    login.innerHTML = "Logging in"
    login.disabled = true;

    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);

        // window.alert(errorMessage);
        // ...
    });
}

function logout(){
    auth.signOut().then(function() {
        console.log("Signed out");
        document.getElementById("btn-login").innerHTML = "Login";
        document.getElementById("btn-login").disabled = false;
      }).catch(function(error) {
        // An error happened.
      });
}

function home(){
    document.getElementById("home").style.display = "block";
    document.getElementById("placement").style.display = "none";
    document.getElementById("recruiter").style.display = "none";


}
function recruiters(){
    document.getElementById("home").style.display = "none";
    document.getElementById("placement").style.display = "none";
    document.getElementById("recruiter").style.display = "block";
    

}
function academics(){
    document.getElementById("home").style.display = "none";
    document.getElementById("placement").style.display = "none";
    document.getElementById("recruiter").style.display = "none";


}
function placement(){
    document.getElementById("home").style.display = "none";
    document.getElementById("placement").style.display = "block";
    document.getElementById("recruiter").style.display = "none";


    
   if(!loaed){
    db.collection("company").get()
    .then(function (querySnapshot){
        querySnapshot.forEach(function(doc){
            
            var data = doc.data();
            console.log(data.name);
            var item = document.createElement("DIV");
            var itemData = data.name + "<button class='btn btn-success'>Apply</button>";
            item.innerHTML = itemData;
            document.getElementById("company").appendChild(item);
            loaed = true;
        });
    })
    .catch(function(error){
        console.log(error)
    })
   }

}