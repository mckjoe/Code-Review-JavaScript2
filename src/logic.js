class API {

  makeCall(displayResult1, displayError1) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&skip=0&limit=25&user_key=${process.env.exports.apiKey}`;
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
      displayResult1(body);
    }, function(error) {
      displayError1(error);
    });
  }
}

export { API };
