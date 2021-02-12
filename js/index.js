let emailDiv = document.querySelector("#email")
let passwordDiv = document.querySelector("#password")
let loginDiv = document.querySelector("#loginbutton")
let errorme = document.querySelector(".errorme");
let errormessgage = document.querySelector(".errormessgage");
let close = document.querySelector(".errormessgage i")

let createAccountDiv = document.querySelector("#createAccount")
let email;
let password;

close.addEventListener("click" , ()=>{
    errormessgage.style.display = "none"
})

loginDiv.addEventListener("click", (e) => {
    email = emailDiv.value
    password = passwordDiv.value

    console.log(email + ' ' + password);

    if (email == undefined || password == undefined) {
        return console.log("please enter user and password")

    } else {
        let fetch_config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                "email": email,
                "password": password
            })



        }

        // Initialise la requete http avec l'url de la ressource et les configurations définis ci-dessus
        fetch("https://simplonews.brianboudrioux.fr/users/login", fetch_config)
            .then(function(response) {

                // On appelle la method json a partir de l'objet response pour parser les données renvoyer par l'API
                response.json()
                    .then(function(data) {
                        if (response.status == 400) {
                            console.log(data);
                            if (email == null || email =="" || password == null || password == "") {
                                errorme.innerHTML = "Remplissez tous les champs requis";  
                            }else{
                                errorme.innerHTML = data["error"] ;
                            }
                            errormessgage.style.display = "block";


                            // gestion erreur données envoyer a la requette
                        } else if (response.status == 403) {
                            console.log(data);

                            if (email == null || email =="" || password == null || password == "") {
                                errorme.textContent = "Remplissez tous les champs requis";  
                            }else{
                                errorme.innerHTML = data["error"] ;
                            }
                            errormessgage.style.display = "block";
                            // gestion erreur authentification
                        } else {
                            console.log(data);
                            // console.log();
                            let tokenResponse = data["token"]
                            sessionStorage.setItem("token", tokenResponse);
                            
                            errormessgage.style.display = "block";
                            errormessgage.classList.add("greenmessage");
                            errormessgage.classList.remove("errormessgage");
                            errorme.textContent = "Connexion en 2 secondes";  
                            setInterval(() => {
                                document.location.href = "./home.html";
                                
                            }, 2000);
                        }
                    })
                    .catch(function(data_parsing_error) {
                        console.log(data_parsing_error);
                    })
            })
            .catch(function(server_errors) {
                // Cas erreur server (API)
                console.log(server_errors);
            })
    }
})



function test(params) {

}