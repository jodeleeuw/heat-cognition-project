const browser_check = {
  type: jsPsychBrowserCheck,
}

const ip_check = {
  type: jsPsychCallFunction,
  func: (done) => {
    // do this without jquery
    fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(data => {
        jsPsych.data.addProperties({public_ip: data.ip});
        done();
      });
  },
  async: true
}