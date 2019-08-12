const auth = firebase.auth()
const db = firebase.firestore();
const user = firebase.auth().currentUser;
var load = false;
var cgpa;
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
                cgpa = data.cgpa
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
        document.getElementById("btn-login").innerHTML = "Login"
        document.getElementById("btn-login").disabled = false;
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


    
   if(!load){
    db.collection("company").get()
    .then(function (querySnapshot){
        querySnapshot.forEach(function(doc){
            
            var data = doc.data();
            console.log(data);
            var flag = false;
            var list = data.student;
            list.forEach(function(value){
                if(value==firebase.auth().currentUser.uid){
                    flag = true;
                }
            })
            var item = document.createElement("DIV");
            if(flag){
                var itemData = data.name + "<button class='button is-success' title='Your cgpa is less than required'  disabled>Registered </button><br> CGPA : "+ data.CGPA;
            }
            else if (data.CGPA>cgpa) {
                var itemData = data.name + "<button class='button is-danger' title='Your cgpa is less than required'  disabled>Register </button><br> CGPA : "+ data.CGPA;
            } else {
                var itemData = data.name + "<button class='button is-primary' onclick='apply(\""+doc.id+"\")' title='By applying you are agreeing to terms and conditions'>REGISTER</button><br> CGPA : "+ data.CGPA;
            }

            item.innerHTML = itemData;
            document.getElementById("company").appendChild(item);
            load = true;
        });
    })
    .catch(function(error){
        console.log(error)
    })
   }

}


function profile(){
    
}
function apply(id){
    var ref = db.collection("company").doc(id);
    ref.update({
        student : firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
    }).then(function(){
        window.alert("Successfully registered for " + id);
    }).catch(function(error){
        console.log(error)
    });
    

}