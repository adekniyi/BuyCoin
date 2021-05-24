// Create anchor element.
var setting = document.createElement('a'); 
var codespace = document.createElement('a'); 
var sponsor = document.createElement('a'); 
var imageName = document.createElement('a'); 
                  
// Create the text node for anchor element.
var settingLink = document.createTextNode("Settings");
var codespaceLink = document.createTextNode("Codespaces");
var sponsorLink = document.createTextNode("Sponsors");
  
// Append the text node to anchor element.
setting.appendChild(settingLink); 
codespace.appendChild(codespaceLink); 
sponsor.appendChild(sponsorLink); 
  
// Set the title.
setting.title = "Settings"; 
codespace.title = "Codespaces"; 
sponsor.title = "Sponsorser"; 
  
// Set the href property.
setting.href = "#"; 
codespace.href = "#"; 
sponsor.href = "#"; 


function myFunction(x) {
  if (x.matches) { // If media query matches
    const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navbar .details');
  const userIcon = document.querySelector('.user-icon-image .user-icon');
  const name = "Adekniyi"

  imageName.classList.add("mystyle");
  imageName.append(userIcon,name);
  nav.appendChild(codespace);
  nav.appendChild(sponsor);
  nav.appendChild(setting);
  nav.appendChild(imageName);

  burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
  })
  } else {
    
  }
}

var x = window.matchMedia("(max-width: 691px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes