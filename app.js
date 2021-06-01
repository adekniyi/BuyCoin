// Create anchor element.
var setting = document.createElement('a');
var codespace = document.createElement('a');
var sponsor = document.createElement('a');
var imageName = document.createElement('a');

// Create the text node for anchor element.
var settingLink = document.createTextNode('Settings');
var codespaceLink = document.createTextNode('Codespaces');
var sponsorLink = document.createTextNode('Sponsors');

// Append the text node to anchor element.
setting.appendChild(settingLink);
codespace.appendChild(codespaceLink);
sponsor.appendChild(sponsorLink);

// Set the title.
setting.title = 'Settings';
codespace.title = 'Codespaces';
sponsor.title = 'Sponsorser';

// Set the href property.
setting.href = '#';
codespace.href = '#';
sponsor.href = '#';


var topInput = document.getElementById('search');
var userImage = document.querySelector('.user-image');
var userName = document.querySelector('.user-name h2');
var userLogin = document.querySelector('.user-name span');
var bio = document.querySelector('.bio');
var followers = document.querySelector('.follow');
var following = document.querySelector('.following span');
var star = document.querySelector('.star');
var work = document.querySelector('.work .work1');
var newLocation = document.querySelector('.location span');
var twitterusername = document.querySelector('.twitter1');
var repoWrapper = document.querySelector('.repos');
var userIcon = document.querySelector('.user-icon');




function myFunction(x) {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navbar .details');
  const userIcon = document.querySelector('.user-icon-image .user-icon');
  const userIconDiv = document.querySelector('.user-icon-image');
  if (x.matches) {
    // If media query matches
    const name = `${topInput.value}`;
    
    imageName.classList.add('mystyle');
    imageName.append(userIcon, name);
    nav.appendChild(codespace);
    nav.appendChild(sponsor);
    nav.appendChild(setting);
    nav.appendChild(imageName);
    
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    });
  } 
  else if(window.innerWidth >= 691)
  {
    if(nav.contains(codespace))
    {
      nav.removeChild(codespace);
    }
    if(nav.contains(sponsor))
    {
      nav.removeChild(sponsor);
    }
    if(nav.contains(setting))
    {
      nav.removeChild(setting)
    }
    if(nav.contains(imageName))
    {
      nav.removeChild(imageName)
      userIconDiv.prepend(imageName);
    }
  }
}
//window.addEventListener('resize',myFunction)

var x = window.matchMedia('(max-width: 690px)');
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes


const github_data = {
  token: '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',
  username: 'adekniyi',
};

var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ' + github_data.token);
myHeaders.append('Content-Type', 'application/json');

var graphql = JSON.stringify({
  query: `{
    user(login: "adekniyi") {
      avatarUrl
      bio
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 20, orderBy: {field: CREATED_AT, direction: ASC}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          url
        }
      }
    }
  }`,
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow',
};

topInput.addEventListener('keyup', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    console.log(topInput.value);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + github_data.token);
    myHeaders.append('Content-Type', 'application/json');

    var graphql = JSON.stringify({
      query: `{
    user(login: "${topInput.value}") {
      avatarUrl
      bio
      company
      name
      twitterUsername
      login
      location
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 20, orderBy: {field: CREATED_AT, direction: ASC}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          url
          forkCount
          pushedAt
          stargazerCount
          primaryLanguage {
            color
            name
          }
        }
      }
    }
  }`,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    };

    fetch('https://api.github.com/graphql', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        userImage.src = result.data.user.avatarUrl;
        userIcon.src = result.data.user.avatarUrl;
        userName.innerHTML = result.data.user.name;
        userLogin.innerHTML = result.data.user.login;
        bio.innerHTML = result.data.user.bio;
        followers.innerHTML = ' ' + result.data.user.followers.totalCount;
        following.innerHTML = ' ' + result.data.user.following.totalCount;
        work.innerHTML = ' ' + result.data.user.company;
        newLocation.innerHTML = ' ' + result.data.user.location;
        twitterusername.innerHTML = ' ' + result.data.user.twitterUsername;

        let useRepos = '';
        result.data.user.repositories.nodes.forEach((repo) => {
          var newdate = new Date(repo.pushedAt).toDateString().split(' ');
          if (
            repo.primaryLanguage == null
          ) {
            useRepos += ` <div class="repo">
        <div class="repo-name">
            <a href="#"><h3 class="name">${repo.name}</h3></a>
        </div>
      <div class="star">
            <button type="button">
                <i class="far fa-star"></i> Star
            </button>                    
        </div>
    </div>
    <hr class="new1">
    `;
          } else {
            useRepos += `
      <div class="repo">
                        <div class="repo-name">
                            <a href="#"><h3 class="name">${repo.name}</h3></a>
                            <div class="technology">
                                <p><span class="repo-language-color" style="background-color: ${
                                  repo.primaryLanguage.color
                                }"></span>
                                ${repo.primaryLanguage.name}</p>
                                <p><svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> 
                                     ${repo.stargazerCount}</p>
                                <p><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> 
                                ${repo.forkCount}</p>
                                <p>Updated on ${
                                  newdate[1] +
                                  ' ' +
                                  newdate[2] +
                                  ' ' +
                                  newdate[3]
                                }</p>
                            </div>
                        </div>
                      <div class="star">
                            <button type="button">
                                <i class="far fa-star"></i> Star
                            </button>                    
                        </div>
      </div>
      <hr class="new1">
      `;
          }
        });
        repoWrapper.innerHTML = useRepos;
      })
      .catch((error) => console.log('error', error));
  }
});
