import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $("#listDoctors").click(function() {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = "https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&skip=0&limit=10&user_key=5a42f7e9bf2406d748b79384a67ff5fd";
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
      var practices = body.data;
      console.log(practices);
      for ( let i=0; i<practices.length; i++) {
        $('#output').append("<li>" + practices[i].profile.first_name + ", " + practices[i].profile.last_name + "</li>");
      }
    }, function(error) {
      $('#output').text(`There was an error loading your request: ${error.responseText}.  Please try again.`);
    });
  });
});
