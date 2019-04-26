function keydown(num){
    if(window.event.keyCode == 13)
    {
        if(num == 1 ) EmailBtnEvent();
        else SignUpBtnEvent();
    }
}

function active_login(id1,id2){
    clear();
    document.getElementById(id1).style.display = "none";
    document.getElementById(id2).style.display = "block";
}

function set_user(user){
    active_login('login_button','hide_dash');
    active_login('hide_login','change_login');

    document.getElementById('rounded1').style.backgroundImage = "url("+user.photoURL+")";
    document.getElementById('user_info').innerHTML = "Name : " + user.displayName + "<br>" + "Email : " +user.email +"<br>";
}

function emailCheck(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}


function validateJoinForm(email, password, rePassword){
    if(!emailCheck(email)){
        alert("Invalid Email");
        return false;
    }
    if(password !== rePassword){
        alert('Password is different');
        return false
    }
    return true;
}

function clear(){
    document.getElementById('joinUserName').value = "";
    document.getElementById('joinUserEmail').value = "";
    document.getElementById('joinPassword').value = "";
    document.getElementById('joinRePassword').value = "";
    document.getElementById('userName').value = "";
    document.getElementById('password').value = "";
}
//구글 로그인 버튼 이벤트
function GoogleBtnEvent(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().signInWithPopup(provider).then(function(result) {

    var user = firebase.auth().currentUser;

    set_user(user);
    }).catch(function(error) {
    });    
}

//이메일 로그인 버튼 이벤트
function EmailBtnEvent(){
    var email = document.getElementById('userName').value.trim();
    var password = document.getElementById('password').value.trim();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    if(!emailCheck(email)){
        alert('Invaild Email');
    }
    if(emailCheck(email) && password.length > 0){

        firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
            var user = firebase.auth().currentUser;
            if(!user.emailVerified){
                alert('You have to verify your Email');
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                  }).catch(function(error) {
                    // An error happened.
                  });
                retrun;
            }
            set_user(user);
        }).catch(function(error) {
            // Handle Errors here.
            switch(error.code){
                case "auth/invalid-email":
                    alert('invalid-email\nplease check your id ^^');
                    break;
                case "auth/user-disabled":
                    alert('Sorry... this User was disabled')
                    break;
                case "auth/user-not-found":
                    alert('user-not-found\nplease check your id ^^')
                    break;
                case "auth/wrong-password":
                    alert('wrong-password\nplease check your password ^^');
                    break;
            }
        });
    }
}


//이메일 가입버튼 이벤트
function SignUpBtnEvent(){
    var userName = document.getElementById('joinUserName').value.trim();
    var email = document.getElementById('joinUserEmail').value.trim();
    var password = document.getElementById('joinPassword').value.trim();
    var rePassword =document.getElementById('joinRePassword').value.trim();
    if(validateJoinForm(email, password, rePassword)){

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){

            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                alert('Verifying message is sent to your Email');
            }).catch(function(error) {
            });

            user.updateProfile({
                displayName: userName,
            }).then(function() {
            }).catch(function(error) {
            });

            active_login('hide_signup','hide_login');
        }).catch(function(error) {
            switch(error.code){
                case "auth/email-already-in-use":
                    alert('This Email is already in use');
                    break;
                case "auth/invalid-email":
                    alert('invalid-email');
                    break;
                case "auth/operation-not-allowed":
                    alert('operation-not-allowed');
                    break;
                case "auth/weak-password":
                    alert('Password must be at least 6 digits');
                    break;
            }
        });
    }
    
}

//로그아웃 이벤트
function LogOutEvent(){
    var user = firebase.auth().currentUser;
    firebase.auth().signOut().then(function() {
        document.getElementById('rounded1').style.backgroundImage = null;
        document.getElementById('user_info').innerHTML = "";
        active_login('hide_dash','login_button');
        // Sign-out successful
      }).catch(function(error) {
        // An error happened.
      });
}