//Global Variables
//example api call to careeronestop
var headers = {
  headers: {
    Authorization: `Bearer ${"VxzwGtuIBO4RhfWqV1PE5A6Fv+th3lF+0OvVdE2Ut+o3cWNPShrrWi+d2ZRH5mWgBRGkFn/a2zCtczThZhYZ1A=="}`,
  },
};
var careerApi =
  "https://api.careeronestop.org/v1/occupation/cy8juvgHGs77LlU/web%20developers/85268?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false";

// variables for job listings
var jobSearch = document.querySelector("#job-search");
var locationSearch = document.querySelector("#location-search");
var testContainer = document.querySelector("#test-job-container");

var getJobDetails = function () {
  //variables for job details - need to add url encoding to variables above
  var careerUrl =
    "https://api.careeronestop.org/v1/occupation/cy8juvgHGs77LlU/" +
    jobSearch.value +
    "/" +
    locationSearch.value +
    "?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false";
  fetch(careerUrl, headers).then(function (response) {
    //fetch(careerApi, headers).then(function(response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        /*
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
          */
      });
    }
  });
};

//search Google for parameters inserted in page
function searchJobs() {
  var searchApi =
    "https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyDN1URsMNvO298DwJn6yW7QN8FC-uaAe-U&cx=261baf09873055c10&cr=us&dateRestrict=d[30]&num=10&sort=date&q=" +
    jobSearch.value +
    "&hq=";
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
      getJobDetails();
    }
    //otherwise return error code
    else {
      alert("error:" + response.statusText);
    }
  });
}

//Display search results on page
function displaySearchResults(arr) {
  //empty div of old contents
  testContainer. textContent = ""
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
  }
}

//search Google on button click
document.querySelector("#go-button").addEventListener("click", searchJobs);
