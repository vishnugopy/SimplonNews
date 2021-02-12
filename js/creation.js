let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let mailadress = document.querySelector("#email");
let passwordfix = document.querySelector("#password");
let singup = document.querySelector("#signupbutton");
let errorme = document.querySelector(".errorme");
let errormessgage = document.querySelector(".errormessgage");
let close = document.querySelector(".errormessgage i")


close.addEventListener("click" , ()=>{
    errormessgage.style.display = "none";
   
})

singup.addEventListener("click" , () =>{
  
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
                            if (firstname.value == null || firstname.value =="" || lastname.value == null || lastname.value == "" || mailadress.value == null || mailadress.value == "" || passwordfix.value == null || passwordfix.value == "") {
                                errorme.textContent = "Remplissez tous les champs requis";
                            }
                            // gestion erreur données envoyer a la requette
                            errormessgage.style.display = "block";
                        }
                        else if (response.status == 403) {
                            console.log(data);
                            // gestion erreur authentification
                            errorme.innerHTML = data["error"] ;
                            errormessgage.style.display = "block";
                        }
                        else {
                            console.log(data);
                            // ici on peut exploiter nos donnée
                            console.log("sccusse");
                            errormessgage.style.display = "block";
                            errormessgage.classList.add("greenmessage");
                            errormessgage.classList.remove("errormessgage");
                            errorme.textContent = "Succès! Revenir à la page de connexion en 3 secondes"; 
                            setInterval(() => {
                                document.location.href = "./index.html";
                            }, 3000);
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
})

   