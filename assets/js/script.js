//example api call to careeronestop
var headers = {headers: {"Authorization": `Bearer ${"VxzwGtuIBO4RhfWqV1PE5A6Fv+th3lF+0OvVdE2Ut+o3cWNPShrrWi+d2ZRH5mWgBRGkFn/a2zCtczThZhYZ1A=="}`}};
var careerApi = "https://api.careeronestop.org/v1/occupation/cy8juvgHGs77LlU/web%20developers/85268?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false"

// variables for job listings
var jobName = "web developer"
var jobLocation = "phoenix az"

var getJobDetails = function() {
  //variables for job details - need to add url encoding to variables above
  var jobName = "web%20developers";
  var jobLocation = "85268";
  var careerUrl = "https://api.careeronestop.org/v1/occupation/cy8juvgHGs77LlU/" + jobName + "/" + jobLocation + "?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false";     
  fetch(careerUrl, headers).then(function(response) {

  //fetch(careerApi, headers).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      console.log(data);
      //display data
      document.querySelector("#outlook-container").innerHTML = "Outlook: " + data.OccupationDetail[0].BrightOutlook;
      document.querySelector("#growth-container").innerHTML = "Growth: " + data.OccupationDetail[0].BrightOutlookCategory;
      document.querySelector("#description-container").innerHTML = "Description: " + data.OccupationDetail[0].OnetDescription;
      document.querySelector("#mediansalary-container").innerHTML = "Median salary: $" + parseFloat(data.OccupationDetail[0].Wages.StateWagesList[0].Median).toLocaleString("en");
      document.querySelector("#salaryrange-container").innerHTML = "Salary range: $" + parseFloat(data.OccupationDetail[0].Wages.StateWagesList[0].Pct10).toLocaleString("en") + "-$" + parseFloat(data.OccupationDetail[0].Wages.StateWagesList[0].Pct90).toLocaleString("en");
      });
    };  
  });
};
  
getJobDetails();

var jobName = "web developer"
var jobLocation = "phoenix az"
var searchApi = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDN1URsMNvO298DwJn6yW7QN8FC-uaAe-U&cx=261baf09873055c10&q=" + jobName + jobLocation

function searchJobs(){
  fetch(searchApi)
      .then(function(response){
         if(response.ok){ 
          response.json().then(function(data){
          document.querySelector("#test-container").textContent = data;
          console.log(data);

          document.querySelector("#test-container").innerHTML = data.items[1].htmlTitle
          })
      }
      else{
          alert("error:" + response.statusText); 
      }
  });
};
  
searchJobs()