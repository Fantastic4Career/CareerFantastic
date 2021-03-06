var $selectSkills = $("#select-skills");
var $addSkillsButton = $("#add-skill-button");
var $searchButton = $("#search");
var $jobTitleInput = $("#job-title");
var $locationInput = $("#location");
var selectedSkills = [];
var results =[];
var markers = [];

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  var autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('location')), {
      types: ['geocode']
    });
}

function populateAllSkillTags($target, skills){
  $target.empty();
  _.forEach(skills, function(skill){
    var skillObj = new SkillTag(skill);
    $target.append(skillObj.$skill);
  })
}

function SkillTag(skill){
  this.skill = skill;
  this.$skill = $("<li>");
  this.$a = $("<a>");
  this.$a.attr({"class":""}).html("<span></span>"+skill);
  this.$skill.append(this.$a);
  this.$skill.on("click", function(){
    this.$a.attr({"class": "clicked"});
    selectedSkills.push(this.skill);
  }.bind(this))
}

$(document).ready(function(){
  var skills = JSON.parse(localStorage.getItem('skills')) || [];
  populateAllSkillTags($selectSkills, skills)
  
  $addSkillsButton.on("click", function(e){
    e.preventDefault();

    var newSkills = $("#key-words").val();
    if (newSkills.length >0){
      skills=skills.concat(newSkills);
      localStorage.setItem('skills', JSON.stringify(skills));
      populateAllSkillTags($selectSkills, skills);
      $("#key-words").val("");
    }
  });

  var newJobsVue = new Vue({
    el: '#search-results',
    data: {
      jobs: []
    },
    firebase: {
      jobApplied: jobsAppliedDB.limitToLast(25)
    },
    methods: {
      updateData: function (data) {
        this.jobs = data;
      }, 
      removeJob: function (job) {
        // remove current job
        console.log("here>>>>", this.jobApplied);
        this.jobs.splice(this.jobs.indexOf(job), 1);
        var lastIndex = this.jobApplied.length -1;
        var lastElement = this.jobApplied[lastIndex];
        console.log("lastElement is>>>", lastElement);
        var index = _.get(lastElement,".key", null);
        if (index !== null){
          index = parseInt(index) +1;
        } else {
          index =0;
        }
        jobsAppliedDB.child(index).set(job);
        console.log("here>>>>", this.jobApplied);
        var glassdoorQueryURL = ("http://api.glassdoor.com/api/api.htm?t.p=133031&t.k=Fihlm10MyE&userip=0.0.0.0&useragent=&format=json&v=1&action=employers");
        
        $.ajax({
         url: glassdoorQueryURL,
         method: "GET",
         CrossDomain: true,
         dataType: 'jsonp',
         data: {
          q: job.company
         }
        })
        .done(function(response){
          var companyInfos = _.get(response, "response.employers", [])
          jobsAppliedDB.child(index).child("glassdoor").set(companyInfos);
        })
        
      }
    }
  });

  $searchButton.on("click", function(e){
    e.preventDefault();
    var title = $jobTitleInput.val().trim();
    var location = $locationInput.val().trim();
    $(".tag-cloud a").attr({"class":""});
    skills = [];
    // make a call to indeed/dice api here
    var jobQuery = selectedSkills.concat(title);
    var skillsString = selectedSkills.join(" ");
    jobQuery = jobQuery.join(" ");
    selectedSkills= [];
    // make a call to indeed/dice api here
    //TODO: Indeed(q:jobQuery, l: location);
    var indeedAjax = 
    $.ajax({
      method: 'GET',
      url: 'https://api.indeed.com/ads/apisearch',
      crossDomain: true,
      dataType: 'jsonp',
      data: {
        'v': '2', 
        'format': 'json', 
        'publisher': "9049151526441005",
        q: jobQuery,
        l: location,
        userip: 'localhost',
        useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
        latlong: '1'
      }
    });// end ajax

    var queryURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json";
    var diceAjax = 
    $.ajax({
     url: queryURL,
     method: "GET",
     data: {
      direct: 1,
      //skill: skillsString,
      text: title,
      city: location,
      page: 1,
      pgcnt: 10,
      sort: 1,
      sd: 'd',
     }
    })
    

    Promise.all([Promise.resolve(indeedAjax), Promise.resolve(diceAjax)])
    .spread(function(indeedResponse, diceResponse){
      
      var indeedResults = _.get(indeedResponse,'results',[]);
      console.log("indeedResults >>>", indeedResults);
      indeedResults = _.map(indeedResults, function(d){
        d.source_api = "Indeed";
        d.company = d.company;
        d.job_title= d.jobtitle;
        d.location = d.city + " " +d.state;
        d.skills = parseJobSkills(d.snippet);
        d.date_posted= moment(d.date).format("YYYY-MM-DD");
        return d;
      })
      
  
      var diceResults = _.get(diceResponse, 'resultItemList',[]);
      console.log("diceResults>>>", diceResults);
      diceResults = _.map(diceResults, function(d){
        d.source_api = "Dice";
        d.company = d.company;
        d.job_title= d.jobTitle;
        d.location = d.location;
        d.skills = null;
        d.date_posted= moment(d.date).format("YYYY-MM-DD");
        return d;
      })

      results = indeedResults.concat(diceResults);
      console.log("results are>>>", results);
      console.log("newVue is>>>", newJobsVue);
      newJobsVue.updateData(_.cloneDeep(results));
      _.forEach(results, function(r){
      if (r.lattitude && r.longtitude)
        markers. push([r.company, r.lattitude, r.longitude]);
      });

    });
    

  });
})

