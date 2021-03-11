var jobSearch = document.querySelector("#job-search");
var locationSearch = document.querySelector("#location-search");
var testContainer = document.querySelector("#test-job-container");

//search Google for parameters inserted in page
function searchJobs() {
  var searchApi =
    "https://www.googleapis.com/customsearch/v1?key=AIzaSyDN1URsMNvO298DwJn6yW7QN8FC-uaAe-U&cx=261baf09873055c10&q=" +
    jobSearch.value + "&hq="
    locationSearch.value;

  fetch(searchApi).then(function (response) {
    //if valid response received
    if (response.ok) {
      var searchArr = []; //define object array for results
      //parse JSON into array then assign variables for all releveant objects
      response.json().then(function (data) {
        console.log(data);
        for (i = 0; i < data.items.length; i++) {
          var searchTitle = data.items[i].title; //HTML title of page
          var searchLink = data.items[i].link; //URL of job posting
          var searchDescription = data.items[i].htmlSnippet; //snippet of job description

          //insert valid objects into array
          searchArr.push({
            title: searchTitle,
            link: searchLink,
            description: searchDescription,
          });
        }
        displaySearchResults(searchArr);
      });
    }
    //otherwise return error code
    else {
      alert("error:" + response.statusText);
    }
  });
}

//Display search results on page
function displaySearchResults(arr) {
  //loop through array of results
  for (i = 0; i < arr.length; i++) {
    //create elements on the page
    var jobContainer = document.createElement("div");
    var jobTitleText = document.createElement("h3");
    var jobSnippetText = document.createElement("p");

    //insert text into those elements
    jobTitleText.innerHTML =
      "<a href='" + arr[i].link + "'>" + arr[i].title + "</a>";
    jobSnippetText.innerHTML = arr[i].description;

    //append content to page
    jobContainer.appendChild(jobTitleText);
    jobContainer.appendChild(jobSnippetText);
    testContainer.appendChild(jobContainer);
  };
};

//search Google on button click
document.querySelector("#go-button").addEventListener("click", searchJobs);
