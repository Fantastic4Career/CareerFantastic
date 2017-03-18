// Initialize Firebase
var config = {
  apiKey: "AIzaSyA1g2zHte-oWy_n2r_BQCGZ7ydZnAaEK3k",
  authDomain: "careerfantastic-e91d7.firebaseapp.com",
  databaseURL: "https://careerfantastic-e91d7.firebaseio.com",
  storageBucket: "careerfantastic-e91d7.appspot.com",
  messagingSenderId: "389453357831"
};
firebase.initializeApp(config);
var database = firebase.database();
var jobsAppliedDB = database.ref("/jobsApplied");

var seedData = [
  {
    title: "Front End Engineer",
    skills: ["Angular", "HTML", "CSS", "BootStrap"],
    dateApplied: null,
    companyInfo: {
      name: "Apple",
      location: "One Infinity Loop, Cupertino, CA 95014",
    },
    jobLink: "http://www.apple.com/jobs/us/",
  },
  {
    title: "Back End Engineer",
    skills: ["NodeJs", "Python", "MySQL", "MongoDB"],
    dateApplied: null, 
    companyInfo: {
      name: "The Startup",
      location:"123 FooBar St. , San Francisco, CA 94111",
    },
    jobLink: "http://www.google.com",
  },
];

//_.forEach(seedData, d=> jobsAppliedDB.push(d));
