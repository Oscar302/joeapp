const button = document.getElementById('signup-button');
button.addEventListener("click", CreateUser);

async function CreateUser(){
    //henter alle input felter  
    const allInput = document.querySelectorAll('input');


    for(let i = 0; i < allInput.length; i++){
        for(let j = 0; j < allInput[i].value.length; j++){
            if(allInput[i].value[j] === "æ" || allInput[i].value[j] === "å" || allInput[i].value[j] === "ø" ){
                Alert("Please do not use æ, ø or å in your input")
                return
            }
        }

    }


    //laver address object
    let address = {
        street: allInput[7].value,
        zip: allInput[8].value,
        city: allInput[9].value,
        country : allInput[10].value
    }

    const firstname = allInput[0].value;
    const lastname = allInput[1].value;
    const username = allInput[2].value;
    const email = allInput[3].value;
    const password = allInput[4].value;
    const passwordRepeat = allInput[5].value;
    const phone = allInput[6].value;
    

    const fullName = firstname + " " + lastname;
    //console.log(fullName);
    //address = JSON.stringify(address);


    if(password === ""){
        Alert("Please enter a password");
        return;
    }

    if(password !== passwordRepeat){
        Alert("Passwords do not match");
        return;
    }


    let data = await fetch("/user/signup", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
                "username" : username,
                "password" : password,
                "email" : email,
                "fullName" : fullName,
                "address" : address,
                "phone" : phone
            }
        )
        })
    .then(res => res.json())
    .then(res => {
        Alert(res.msg);
        console.log(res.status)
        
        if(res.status === 200){
            setTimeout(() => {
                window.location.href = res.href;
            }, 1000)
        }
        
    })
}


function Alert(message){

    const alertBox = document.getElementById("alertbox")

    para = document.createElement("p");
    para.innerHTML = message;

    alertBox.appendChild(para);
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.removeChild(para);
        alertBox.style.display = "none";
    }, 5000);
}
