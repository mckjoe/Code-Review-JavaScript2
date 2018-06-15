import './styles.css';
import $ from 'jquery';
import { API } from './logic.js';

let displayResult1 = function(body) {
  let practices = body.data;
  for ( let i=0; i<practices.length; i++) {
    $('#output').append("<li>" + practices[i].profile.first_name + ", " + practices[i].profile.last_name +  " " + practices[i].profile.title + "<br> <strong>Address:</strong> " + practices[i].practices[0].visit_address.street + " "  + practices[i].practices[0].visit_address.city + ", Oregon <br> <strong>Phone: </strong>" + practices[i].practices[0].phones[0].number + "<br> <strong>Accepting new patients: </strong>" + practices[i].practices[0].accepts_new_patients + " <br> <strong>Website:</strong> " +  practices[i].practices[0].website + "</li>");
    }
}
let displayError1 = function(error) {
  $("#output").text(`There was an error processing your request: ${error.message}`);
}
$(document).ready(function() {
  $("#search-location").click(function() {
    $("#search-by-symptom").hide();
    $("#search-by-name").hide();
    $("#search-in-portland").fadeToggle();
  });
  $("#search-symptom").click(function() {
    $("#search-by-name").hide();
    $("#search-in-portland").hide();
    $("#search-by-symptom").fadeToggle();
  });
  $("#search-name").click(function() {
    $("#search-in-portland").hide();
    $("#search-by-symptom").hide();
    $("#search-by-name").fadeToggle();
  });

  $("#listDoctors").click(function() {
    let api = new API();
    api.makeCall(displayResult1, displayError1);
  });

  $("#searchSymptom").submit(function(event) {
    event.preventDefault();
    let symptomName = $("#symptomName").val();
    $("#symptomName").val("");
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptomName}&location=or-portland&skip=0&limit=5&user_key=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      let practices = body.data;
      if (practices.length === 0) {
        alert("Oops, that input didn't match any results.");
      } else {
      for ( let i=0; i<practices.length; i++) {
        $('#bySymptomList').append("<li>" + practices[i].profile.first_name + ", " + practices[i].profile.last_name +  " " + practices[i].profile.title + "<br> <strong>Address:</strong> " + practices[i].practices[0].visit_address.street + " "  + practices[i].practices[0].visit_address.city + ", Oregon <br> <strong>Phone: </strong>" + practices[i].practices[0].phones[0].number + "<br> <strong>Accepting new patients: </strong>" + practices[i].practices[0].accepts_new_patients + " <br> <strong>Website:</strong> " +  practices[i].practices[0].website + "</li>"    );
        }
      }
    }, function(error) {
      $('#bySymptomList').text(`There was an error loading your request: ${error.responseText}.  Please try again.`);
    });
  });






  $("#searchName").submit(function(event) {
    event.preventDefault();
    let doctorName = $("#doctorName").val();
    $("#doctorName").val("");
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=or-portland&skip=0&limit=25&user_key=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      // console.log(body.data);
      let practi = body.data;
      if (practi.length === 0){
        alert("Oops, that input didn't match any results.");
      } else {
      for ( let i=0; i<practi.length; i++) {
        $('#byNameList').append("<li>" + practi[i].profile.first_name + ", " + practi[i].profile.last_name +  " " + practi[i].profile.title + ";<br>  <strong>Address:</strong> "  + practi[i].practices[0].visit_address.street + ", " + practi[i].practices[0].visit_address.city + "Oregon <br> <strong>Telephone:</strong> " + practi[i].practices[0].phones[0].number + " <br> <strong>Accepting new patients:</strong> " + practi[i].practices[0].accepts_new_patients + " <br> <strong>Website:</strong> " + practi[i].practices[0].website + "</li>");
        }
      }
    }, function(error) {
      $('#byNameList').text(`There was an error loading your request: ${error.responseText}.  Please try again.`);
    });
  });
});
