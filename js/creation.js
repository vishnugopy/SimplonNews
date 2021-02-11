let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let mailadress = document.querySelector("#email");
let passwordfix = document.querySelector("#password");
let singup = document.querySelector("#signupbutton");


// let first = firstname.value ;
// let last = lastname.value ;
// let mail = mailadress.value ;
// let pass = passwordfix.value ;

singup.addEventListener("click" , () =>{
    if (firstname.value == undefined || lastname.value == undefined || mailadress.value == undefined || passwordfix.value == undefined) {
        singup.disabled = true;
        singup.style.cursor = "not-allowed";
        } else{
            singup.disabled = false;
            singup.style.cursor = "pointer";


            let fetchConfig = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
            
                    {
                        "firstName": firstname.value,
                        "lastName": lastname.valuet,
                        "email": mailadress.value,
                        "password": passwordfix.value,
                    }
                )
            }
            
            // Initialise la requete http avec l'url de la ressource et les configurations définis ci-dessus
            fetch("https://simplonews.brianboudrioux.fr/users", fetchConfig)
            .then(function (response) {
            
                // On appelle la method json a partir de l'objet response pour parser les données renvoyer par l'API
                response.json()
                    .then(function (data) {
                        if (response.status == 400) {
                            console.log(data);
                            // gestion erreur données envoyer a la requette
                        }
                        else if (response.status == 403) {
                            console.log(data);
                            // gestion erreur authentification
                        }
                        else {
                            console.log(data);
                            // ici on peut exploiter nos donnée
                            console.log("sccusse");
                            alert("done");
                            setInterval(() => {
                                document.location.href = "./index.html";
                            }, 5000);
                        }
                    })
                    .catch(function (data_parsing_error) {
                        console.log(data_parsing_error);
                    })
            })
            .catch(function(server_errors) {
                // Cas erreur server (API)
                console.log(server_errors);
            })
        
        

        }

})

   