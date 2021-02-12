var passid = sessionStorage.getItem("passid");
// var passid = mainid-1;
console.log(passid);
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
            let article = document.querySelector(".articlesection");
            article.innerHTML =
                        `
                        <article>
                        <div>
                            <h2 class="articleTitle">${data["articles"][passid]["title"]}</h2>
                            <p class="authorName">${data["articles"][passid]["author"]}</p>
                            </div>
                        <section>
                            <img class="articleImage" src="${data["articles"][passid]["img"]}" alt="${data["articles"][passid]["title"]}">
                            <p class="reume">${data["articles"][passid]["resume"]}</p>
                            <p class="articleText"> ${data["articles"][passid]["content"]}
                            </p>
        
                        </section>
                        <a href="home.html" class="longbutton">Accueil</a>
                        </article>

                   
                        `
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
        
        redirectToLoginPage()
        

