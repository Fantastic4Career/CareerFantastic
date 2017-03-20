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
var jobsAppliedDB = database.ref("/test");

var seedData = [
  {
    title: "Front End Engineer",
    skills: ["Angular", "HTML", "CSS", "BootStrap"],
    dateApplied: null,
    companyInfo: {
      name: "Apple",
      location: "One Infinity Loop, Cupertino, CA 95014",
    },
    jobLink: "https://www.apple.com/jobs/us/",
  },
  {
    title: "Back End Engineer",
    skills: ["NodeJs", "Python", "MySQL", "MongoDB"],
    dateApplied: null, 
    companyInfo: {
      name: "The Startup",
      location:"123 FooBar St. , San Francisco, CA 94111",
    },
    jobLink: "https://www.google.com",
  },
];

//_.forEach(seedData, d=> jobsAppliedDB.push(d));
//var jobApplied =[];
$.ajax({
  method: 'POST',
  url : '/api',
  dataType: 'json',
  data: {
    a: 'b'
  },
  success: function (data) {
    console.log('success');
    console.log("indeed response from backend is>>>", data);
  },
  error: function(error){
    console.log("error is>>>", error);
  }
});

/*
$.ajax({
  method: 'GET',
  url: 'https://api.indeed.com/ads/apisearch',
  crossDomain: true,
  dataType: 'jsonp',
  data: {
    'v': '2', 
    'format': 'json', 
    'publisher': "9049151526441005",
    q: 'javascript',
    l: '94112',
    userip: 'localhost',
    useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
    latlong: '1'
  }
})
.done(function(response){
  //render the jobs from the search_response
  console.log("response is>>>>>", response.results);
  let results = [].concat(response.results);
  
  var newJobsVue = new Vue({
    el: '#new-jobs',
    data: {
      jobs: results
    },
    firebase: {
      jobApplied: jobsAppliedDB.limitToLast(25)
    },
    methods: {
      removeJob: function (job) {
        // remove current job
        console.log("here>>>>", this.jobApplied)
        this.jobs.splice(this.jobs.indexOf(job), 1);
        let index = this.jobApplied.length;
        jobsAppliedDB.child(index).set(job);
        console.log("here>>>>", this.jobApplied);
        return $.ajax({
          method: 'GET',
          url: 'https://api.glassdoor.com/api/api.htm',
          crossDomain: true,
          dataType: 'jsonp',
          data: {
            "t.p": '133036',
            "t.k": 'hKjBTq5hhVK',
            "v" : '1',
            "format": 'json',
            "userip": 'localhost',
            "useragent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
            "action" : 'employers',
            "q": job.company,
            "city": job.city
          }
        })
        .done(function (response) {
          console.log("glassdoor response is>>>>", response);
          jobsAppliedDB.child(index).child("glassdoor").set(response.response.employers)
        })
        .fail(function (error) {
          console.log("glassdoor error>>>", error);
        });
        //
        // put it into jobApplied array
      }
    }
  });
})
.fail(function(error){
  console.log("error is>>>", error);
});

var appliedJobsVue = new Vue({
  el: '#applied-jobs',
  firebase: {
    jobs: jobsAppliedDB.limitToLast(25)
  },
  methods: {
    noop: function () {
      
    }
  }
})
*/

