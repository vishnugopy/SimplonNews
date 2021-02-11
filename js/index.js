let emailDiv = document.querySelector("#email")
let passwordDiv = document.querySelector("#password")
let loginDiv = document.querySelector("#loginbutton")

let createAccountDiv = document.querySelector("#createAccount")
let email;
let password;


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
                            // gestion erreur données envoyer a la requette
                        } else if (response.status == 403) {
                            console.log(data);
                            // gestion erreur authentification
                        } else {
                            console.log(data);
                            // console.log();
                            let tokenResponse = data["token"]
                            sessionStorage.setItem("token", tokenResponse);
                            document.location.href = "./home.html";
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