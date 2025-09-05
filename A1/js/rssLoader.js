




function loadRSS() {
  //Use CORS API website as proxy
  let proxy = "https://cors-anywhere.herokuapp.com/";

  //Declare the URL where we fetch RSS file
  let url = "https://www.nasa.gov/news-release/feed/";

  //Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
  let xhttp = new XMLHttpRequest();
  xhttp.open("Get", proxy + url, true);
  xhttp.send();

  //Process RSS file when it has been loaded successfully
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //Load XML file as "XML" format and parse/process it by calling function parseRSS()
      let rss = this.responseText;
      parseRSS(this);
    }
  };
}

function parseRSS(rss) {
  //Load all "items" inside the RSS document, each item is a news
  let items = rss.responseXML.getElementsByTagName("item");
  let rssContent = "";//varible "rssContent" is used to store rss content in HTML format
  //Loop through all items and extract child node content: "title", "link", "description" and "pubdate"
  for (let i = 0; i < items.length; i++) {
    let nodes = items[i].children;
    //Extract "title", "link", "description" and "pubdate" of each "node"
    let title, pubdate, description, link;
    for (let j = 0; j < nodes.length; j++) {
      if (nodes[j].tagName == "title") {
        4
        title = nodes[j].childNodes[0].nodeValue;
      } else if (nodes[j].tagName == "link") {
        link = nodes[j].childNodes[0].nodeValue;
      } else if (nodes[j].tagName == "description") {
        description = nodes[j].childNodes[0].nodeValue;
      } else if (nodes[j].tagName == "pubDate") {
        pubdate = nodes[j].childNodes[0].nodeValue;
      }
    }
    //Format the extracted information above in HTML format and append it to the "rssContent" variable
    //each item (news) is wrapped inside a <div>
    //I've added class="rssDIV" for search functionality
    rssContent += `<div class="rssDIV" style="background-color: gray; margin: 2px;">
<h3>${title}</h3>
<p style="font-style: italic;">${pubdate}</p>
<p>${description}</p>
<p><a href="${link}">Read more</a></p>
 </div>`;
  }
  //Display the "rssContent" on the webpage
  document.getElementById("rssFeed").innerHTML = rssContent;
}

// And now for a search function



// Function to hide divs based on content
function hideDivsWithoutKeyword(className, keyword) {
  // Select all div elements with the specified class
  const divs = document.querySelectorAll(`div.${className}`);

  // Iterate over each selected div
  divs.forEach(div => {
    // Check if the div's text content does NOT contain the keyword
    if (!div.textContent.toUpperCase().includes(keyword)) { // The toUpperCase is so that the search function isn't case sensitive, the keyword value is made into uppercase when it's function is called.
      // If the keyword is not found, hide the div
      div.style.display = 'none'; // Or div.style.visibility = 'hidden';
    }
    else {
      div.style.display = "block"; // The else is so it can bring back content if you use the backspace in the search box or want to do another search.
    }
  });
}

// Example usage:
// Hide all divs with the class 'my-content' if they don't contain the word 'important'
//hideDivsWithoutKeyword('my-content', 'important');

function performSearch() {
  let searchTerm = document.getElementById('mySearchBox').value;
  //console.log('User searched for:', searchTerm);
  // Add your search logic here, e.g., filter a list, make an API call, etc.

  // The better way to do this would be to move the xml/rss buttons over here and then have a variable to keep track of which one is selected, then run the hideDivsWithoutKeyword function just once for the required one.
  // But this is working and I'm going to spend time I could be doing to make this better on doing stuff I still have to do.
  hideDivsWithoutKeyword("rssDIV", searchTerm.toUpperCase());
  hideDivsWithoutKeyword("ruleBoxes", searchTerm.toUpperCase());
}

// Originally I was going to have it do it when you press enter, but this caused the page to reload which would bring it back to the XML rules section which would be annoying if you were searching from the RSS section.
//document.getElementById("mySearchBox").addEventListener("search", logResult);

// Trigger on each key press (for "live search")
document.getElementById('mySearchBox').addEventListener('input', performSearch);




// This is just stuff I used for testing purposes.
/*
document.getElementById('mySearchBox').addEventListener('input', logResult);

function logResult() {
  let result = document.getElementById("mySearchBox");
  console.log("User searched for: " + result.value);
}
*/


