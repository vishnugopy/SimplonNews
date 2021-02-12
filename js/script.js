
//histoire du la nav
let nav = document.querySelector("nav");
nav.innerHTML= 
`<a href="home.html"><img src="./assets/images/SIMPLONNEWS.png" alt="logo" ></a>

<div>
    <i class="barbuton fas fa-bars"></i>
</div>

<div class="navigationhidden">
    <a href="home.html">Accueil</a>
    <a href="index.html">Se déconnecter</a>
</div>

<div class="navigationphone">
    <a href="home.html">Accueil</a>
    <a href="index.html">Se déconnecter</a>
</div>`;


let barbuton = document.querySelector(".barbuton");
let navigation = document.querySelector(".navigationhidden");
barbuton.addEventListener("click" , () =>{

    if (navigation.className === "navigationhidden") {
        navigation.classList.add("navigation");
        navigation.classList.remove("navigationhidden");
      } else {
        navigation.classList.add("navigationhidden");
        navigation.classList.remove("navigation");

      }
      
})
//fin du la nav


//histoire du la footer
let footer = document.querySelector("footer");
footer.innerHTML = `
<div class="footer-right">

<a href="#"><i class="fab fa-facebook-f"></i></a>
<a href="#"><i class="fab fa-twitter"></i></a>
<a href="#"><i class="fab fa-linkedin"></i></a>
<a href="#"><i class="fab fa-whatsapp"></i></a>
<a href="#"><i class="fab fa-pinterest"></i></a>

</div>
<p>Tous les droits réservés par Team Simplon News &copy; 2021</p>
<div class="footer-left">


<div class="footer-links">
    <a href="#">Contact</a>
    <a href="#">À propos</a>
    <a href="#">Aide</a>
</div>
</div>`

//fin du la footer