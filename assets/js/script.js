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