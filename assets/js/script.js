//Global Variables
//search Google on button click
document.querySelector("#go-button").addEventListener("click", formSubmitHandler);

//example api call to careeronestop
var headers = {
  headers: {
    Authorization: `Bearer ${"VxzwGtuIBO4RhfWqV1PE5A6Fv+th3lF+0OvVdE2Ut+o3cWNPShrrWi+d2ZRH5mWgBRGkFn/a2zCtczThZhYZ1A=="}`,
  },
};
var careerApi =
  "https://api.careeronestop.org/v1/occupation/cy8juvgHGs77LlU/web%20developers/85268?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false";
var jobSearch = document.querySelector("#job-search");
var locationSearch = document.querySelector("#location-search");
var stateSearchContainer = document.querySelector("#state-dropdown");
var zipSearchContainer = document.querySelector("#zip-search");
var jobSearchContainer = document.querySelector("#job-listing-container");

var getJobDetails = function (title, location) {
  document.querySelector("#outlook-container").innerHTML = ""
  document.querySelector("#growth-container").innerHTML = ""
  document.querySelector("#description-container").innerHTML = ""
  document.querySelector("#mediansalary-container").innerHTML = ""
  document.querySelector("#salaryrange-container").innerHTML = ""
  //variables for job details -  make plural and add url encoding to variables above for this api
  var encodedJobName = encodeURIComponent(title + "s");

  var careerUrl =
    "https://api.careeronestop.org/v1/occupation/cy8juvgHGs77LlU/" +
    encodedJobName +
    "/" +
    location +
    "?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false";

  //return career info from careeronestop api
  fetch(careerUrl, headers).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //display data
        document.querySelector("#outlook-container").innerHTML =
          "Outlook: " + data.OccupationDetail[0].BrightOutlook;
        document.querySelector("#growth-container").innerHTML =
          "Growth: " + data.OccupationDetail[0].BrightOutlookCategory;
        document.querySelector("#description-container").innerHTML =
          "Description: " + data.OccupationDetail[0].OnetDescription;
        document.querySelector("#mediansalary-container").innerHTML =
          "Median salary: $" +
          parseFloat(
            data.OccupationDetail[0].Wages.StateWagesList[0].Median
          ).toLocaleString("en");
        document.querySelector("#salaryrange-container").innerHTML =
          "Salary range: $" +
          parseFloat(
            data.OccupationDetail[0].Wages.StateWagesList[0].Pct10
          ).toLocaleString("en") +
          "-$" +
          parseFloat(
            data.OccupationDetail[0].Wages.StateWagesList[0].Pct90
          ).toLocaleString("en");
      });
    }
    else{
      document.querySelector("#outlook-container").textContent = "No statistics available for this occupation."
    }
  });
};

// function to save searches as array of objects in localstorage
var saveSearch = function(searchTerm, searchLocation) {

  //parse the array in local storage
  var searchObjArr = JSON.parse(localStorage.getItem("searchObjArr")) || [];
  //console.log(searchObjArr);
  //console.log({searchTerm, searchLocation});

  for (i=0; i<searchObjArr.length; i++) {
    if(searchObjArr[i].searchTerm === searchTerm
      && searchObjArr[i].searchLocation === searchLocation) {
      //console.log("they're equal");
      return
      };
  };

  // if the array doesn't have this search, add it and make a button
  searchObjArr.push({
    searchTerm: searchTerm,
    searchLocation: searchLocation
  });
  // save the array as a string in local storage
  var searchObjArrStringified = JSON.stringify(searchObjArr);
  localStorage.setItem("searchObjArr", searchObjArrStringified);
  // and make a button and append to page
  makeButton(searchTerm, searchLocation);
  }

//function to make buttons for saved searches
var makeButton = function(searchTerm, searchLocation) {
  //target the div to append buttons to 
  var buttonsEl = document.querySelector(".tag-cloud");
  //make city button
  var searchButton = document.createElement("span");
  searchButton.innerText = searchTerm + " in " + searchLocation;
  buttonsEl.appendChild(searchButton);
  searchButton.classList.add("tag-cloud-individual-tag");
  //console.log("make buttons");
  //add event listener. Do not call function, just attach it to button
  searchButton.addEventListener("click", buttonClickHandler); 
}

// function with event parameter to get button info and send to search jobs function
var sendButtonToSearchJobs = function(event) {
  //get and split text from buttons
  var buttonText = event.target.innerText;
  //console.log(buttonText);//get info from button
  buttonTextSplit = buttonText.split(" IN ");
  var searchTerm = buttonTextSplit[0];
  var searchLocation = buttonTextSplit[1];
  //console.log("searchTerm", searchTerm);
  //console.log("searchLocation", searchLocation);

  //send the variables to the search jobs function
  //searchJobs function isn't built to take parameters, so we need to solve how to call this using the variables split from the buttons
  searchJobs();
}

// 2 functions - one to get variables from form and the other to get variables from button
var buttonClickHandler = function(event) {
  var buttonText = event.target.innerText;
  //console.log(buttonText);//get info from button
  //split the text on the button into two variables for search
  buttonTextSplit = buttonText.split(" IN ");
  var searchTerm = buttonTextSplit[0];
  var searchLocation = buttonTextSplit[1];
  //console.log(searchTerm, searchLocation);
  //send variables as parameters and call searchJobs function
  searchJobs(searchTerm, searchLocation);
}

var formSubmitHandler = function(event) {
  // get value from input element and trim off any spaces
  var searchTerm = jobSearch.value;
  //determine which inputs to use for location variable in searches
  if (
    locationSearch.value !== "" &&
    stateSearchContainer.value !== "" &&
    zipSearchContainer.value !== ""
  ) {
    searchLocation =
      locationSearch.value +
      ", " +
      stateSearchContainer.value +
      " " +
      zipSearchContainer.value;
  } else if (locationSearch.value !== "" && stateSearchContainer.value !== "") {
    searchLocation = locationSearch.value + ", " + stateSearchContainer.value;
  } else if (zipSearchContainer.value !== "") {
    searchLocation = zipSearchContainer.value;
  } else {
    locationModal();
  };
  searchJobs(searchTerm, searchLocation);
}

//search Google for parameters inserted in page
function searchJobs(searchTerm, searchLocation) {
  console.log(searchTerm, searchLocation);
  //var searchTerm = jobSearch.value;
  //var searchLocation;
  var searchApi =
    "https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyDN1URsMNvO298DwJn6yW7QN8FC-uaAe-U&cx=261baf09873055c10&cr=us&dateRestrict=d[30]&num=10&sort=date&q=" +
    searchTerm +
    "&hq=";
  if (searchTerm !== "") {
    fetch(searchApi).then(function (response) {
      //if valid response received
      if (response.ok) {
        var searchArr = []; //define object array for results
        //parse JSON into array then assign variables for all releveant objects
        response.json().then(function (data) {
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
          getJobDetails(searchTerm, searchLocation);
        });
      }
      //otherwise return
      else {
        return;
      }
    });
  } else {
    jobModal();
  }

  // save this search in local storage
  saveSearch(searchTerm.toUpperCase(), searchLocation.toUpperCase());
}

//Display search results on page
function displaySearchResults(arr) {
  document.querySelector("#job-listing-container").innerHTML = "";
  //loop through array of results
  for (i = 0; i < arr.length; i++) {
    //create elements on the page
    var jobContainer = document.createElement("div");
    var jobTitleText = document.createElement("h3");
    var jobSnippetText = document.createElement("p");

    //apply classes
    jobTitleText.classList.add("searchTitle");
    jobSnippetText.classList.add("searchSnippet");

    //insert text into those elements
    jobTitleText.innerHTML =
      "<a href='" + arr[i].link + "'>" + arr[i].title + "</a>";
    jobSnippetText.innerHTML = arr[i].description;

    //append content to page
    jobContainer.appendChild(jobTitleText);
    jobContainer.appendChild(jobSnippetText);
    jobSearchContainer.appendChild(jobContainer);

    //show content
    document
      .querySelector("#listing-search-container")
      .classList.remove("hide");
    document
      .querySelector("#statistics-search-container")
      .classList.remove("hide");
  }
  
}

function locationModal() {
  $("#locationModal").foundation("open");
}

function jobModal() {
  $("#jobModal").foundation("open");
}

//search Google on button click
document.querySelector("#go-button").addEventListener("click", formSubmitHandler);


//function to make buttons load on page load
var buttonHistory = () =>{
  if(localStorage.getItem("searchObjArr")) {
      searchObjArr = JSON.parse(localStorage.getItem("searchObjArr"));
      console.log("this is the array for buttons", searchObjArr);
      for (i=0; i<searchObjArr.length; i++) {
          var buttonsEl = document.querySelector(".tag-cloud");
          var searchButton = document.createElement("span");
          searchButton.innerText = searchObjArr[i].searchTerm + " IN " + searchObjArr[i].searchLocation;
          buttonsEl.appendChild(searchButton);
          searchButton.classList.add("tag-cloud-individual-tag");
          searchButton.addEventListener("click", buttonClickHandler);
      } 
  } else {
      console.log("empty storage");
  }
}
buttonHistory();