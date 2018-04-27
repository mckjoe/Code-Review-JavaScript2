import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from './logic.js';

let displayResult1 = function(body) {
debugger;
  let practices = body.data;
  for ( let i=0; i<practices.length; i++) {
    $('#output').append("<li>" + practices[i].profile.first_name + ", " + practices[i].profile.last_name +  " " + practices[i].profile.title + "</li>");
  }
}
let displayError1 = function(error) {
  $("#output").text(`There was an error processing your request: ${error.message}`);
}
$(document).ready(function() {
  $("#inPortland").click(function() {
    $("#search-in-portland").toggle();
  });
  $("#bySymptom").click(function() {
    $("#search-by-symptom").toggle();
  });
  $("#byName").click(function() {
    $("#search-by-name").toggle();
  });
  $("#listDoctors").click(function() {
    let api = new API();
    api.makeCall(displayResult1, displayError1);

    // let promise = new Promise(function(resolve, reject) {
    //   let request = new XMLHttpRequest();
    //   let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&skip=0&limit=25&user_key=${process.env.exports.apiKey}`;
    //   request.onload = function() {
    //     if (this.status === 200) {
    //       resolve(request.response);
    //     } else {
    //       reject(Error(request.statusText));
    //     }
    //   };
    //   request.open("GET", url, true);
    //   request.send();
    // });
    //
    // promise.then(function(response) {
    //   const body = JSON.parse(response);
    //   // console.log(body.data);
    //   let practices = body.data;
    //   for ( let i=0; i<practices.length; i++) {
    //     $('#output').append("<li>" + practices[i].profile.first_name + ", " + practices[i].profile.last_name +  " " + practices[i].profile.title + "</li>");
    //   }
    //   console.log(practices);
    // }, function(error) {
    //   $('#output').text(`There was an error loading your request: ${error.responseText}.  Please try again.`);
    // });
  });
  $("#searchSymptom").submit(function(event) {
    event.preventDefault();
    let symptomName = $("#symptomName").val();
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptomName}&location=or-portland&skip=0&limit=5&user_key=${process.env.exports.apiKey}`;
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
      let practices = body.data;
      for ( let i=0; i<practices.length; i++) {
        $('#bySymptomList').append("<li>" + practices[i].profile.first_name + ", " + practices[i].profile.last_name +  " " + practices[i].profile.title + "</li>");
        console.log(practices[i].profile.first_name);
      }
    }, function(error) {
      $('#bySymptomList').text(`There was an error loading your request: ${error.responseText}.  Please try again.`);
    });
  });
  $("#searchName").submit(function(event) {
    event.preventDefault();
    let doctorName = $("#doctorName").val();
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=or-portland&skip=0&limit=25&user_key=${process.env.exports.apiKey}`;
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
      for ( let i=0; i<practi.length; i++) {
        $('#byNameList').append("<li>" + practi[i].profile.first_name + ", " + practi[i].profile.last_name +  " " + practi[i].profile.title + "; Address: "  + practi[i].practices[0].visit_address.street + ", " + practi[i].practices[0].visit_address.city + "Oregon;  Telephone: " + practi[i].practices[0].phones[0].number + "; Accepting New Patients: " + practi[i].practices[0].accepts_new_patients + "; " + practi[i].practices[0].website + ";" + "</li>");
        // console.log(practi[i].practices[0].website);
      }
    }, function(error) {
      $('#byNameList').text(`There was an error loading your request: ${error.responseText}.  Please try again.`);
    });
  });
});
