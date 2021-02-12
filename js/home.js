// import * as script from 'js/script.js';
var token = sessionStorage.getItem("token");
let fetch_config = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    }
}

// Initialise la requete http avec l'url de la ressource et les configurations définis ci-dessus
fetch("https://simplonews.brianboudrioux.fr/articles", fetch_config)
.then(function (response) {
    
    // On appelle la method json a partir de l'objet response pour parser les données renvoyer par l'API
    response.json()
    .then(function (data) {
        if (response.status == 400) {
            console.log(data);
            // gestion erreur données envoyer a la requette
        } else if (response.status == 403) {
            console.log(data);
            // gestion erreur authentification
        } else {
            console.log(data);
            // ici on peut exploiter nos donnée
            let homesection = document.querySelector(".homesection");
            let arr = data["articles"];
            let str = "";
                    for (let i = 0; i < arr.length; i++) {
                        str +=
                        `
                        <div class="post" id="${data["articles"].indexOf(arr[i])}">
                        <img src="${data["articles"][i]["img"]}" alt="${data["articles"][i]["title"]} image">
                        <div class="titreandresum">
                        <h2>${data["articles"][i]["title"]}</h2>
                        <h4>${data["articles"][i]["author"]}</h4>
                        <p>${data["articles"][i]["resume"]}</p>
                        </div>
                        </div>
                        `
                    }


 
                    homesection.innerHTML = str;
                    
                    let post = document.querySelectorAll(".post");
                    console.log(post);
                    
                    post.forEach(element => {
                        element.addEventListener("click" , () => {
                            var mainid = element.id;
                            //demain
                            sessionStorage.setItem("passid", mainid);
                            document.location.href="./article.html"; 
                        })
    
                    });
                }
            })
            .catch(function (data_parsing_error) {
                console.log(data_parsing_error);
            })
        })
        .catch(function (server_errors) {
            // Cas erreur server (API)
            console.log(server_errors);
        })


        
        window.onload = setupDisconnectFunction()

        function disconnectUserAndRedirectToLoginPage() {
        
            sessionStorage.clear()
            document.location.href = "./index.html";
        }
        
        function setupDisconnectFunction() {
            let disconnectButton = document.querySelectorAll(".disconnectButton")
            disconnectButton.forEach(element => {
                element.addEventListener("click", disconnectUserAndRedirectToLoginPage)
            });
        
        
        }        
        function redirectToLoginPage() {
            let tokenCheck = sessionStorage.getItem("token")
        
        
            if (tokenCheck == null) {
                disconnectUserAndRedirectToLoginPage()
            }
        }
        
        redirectToLoginPage();