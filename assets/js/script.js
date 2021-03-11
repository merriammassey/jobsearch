//example api call to careeronestop
var token = "VxzwGtuIBO4RhfWqV1PE5A6Fv+th3lF+0OvVdE2Ut+o3cWNPShrrWi+d2ZRH5mWgBRGkFn/a2zCtczThZhYZ1A=="

var getJobDetails = function() {
    //fetch("https://api.bls.gov/publicAPI/v2/timeseries/popular").then(function(response) {
        fetch("https://api.careeronestop.org/v1/occupation/cy8juvgHGs77LlU/web%20developers/85268?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false", {headers: {"Authorization": `Bearer ${token}`}}).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
      });
    console.log("outside");
}

getJobDetails();