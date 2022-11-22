const emailInput=document.getElementById('email');
emailInput.addEventListener("change",updateValue);
const checkEmailDiv=document.getElementById("checkIfExist");
let flag=true;
function updateValue(e){
    console.log(e.target.value);
    fetch("http://18.236.9.61/api/v1/checkEmail",{
        method:'post',
        headers:{
            'content-type': 'application/json',
          },
        body:  JSON.stringify({
            email:e.target.value
        })
    })
    .then(res => res.text())
    .then(body => {

        let body_json;
        try {
            body_json= JSON.parse(body);
        } catch {
            throw Error(body);
        }
       if(body_json['exist']=="exist"){
                checkEmailDiv.innerHTML='<p id="howhow">帳號存在囉!!!!</p>'
                flag=false;
       }
       else {
            flag=true;
            if(checkEmailDiv)checkEmailDiv.removeChild(checkEmailDiv.firstChild);
       }
    })
    .catch(err=>{
        console.log(err);
    })
}


// This function is to checker whether password is equal to confirm password. If not, we will send an alert. Besides, we also check if users' password is strong enough.
function checkPassword(){
    var pwd=document.getElementById("password").value;  
    var confirm_password=document.getElementById("password_confirm").value;
    console.log(flag);
    if(!flag) return false;
    if(pwd==""){                                           //To check if password is empty.
        alert("密碼不可以空白");
        return false;
    }
    else {
        if (pwd.length<6) alert("密碼太短");                // to check the password strength
        else if (pwd!=confirm_password) alert("密碼不符合"); // to check if password is equal to confirm_password
        else return true;
        return false;
    }
}

