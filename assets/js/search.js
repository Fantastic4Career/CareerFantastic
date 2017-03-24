var $selectSkills = $("#select-skills");
var $addSkillsButton = $("#add-skill-button");
var $searchButton = $("#search");
var $jobTitleInput = $("#job-title");
var $locationInput = $("#location");
var selectedSkills = [];

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
    var newSkills = $("#key-words").val().split(" ");
    skills=skills.concat(newSkills);
    localStorage.setItem('skills', JSON.stringify(skills));
    populateAllSkillTags($selectSkills, skills);
  });

  $searchButton.on("click", function(e){
    e.preventDefault();
    var title = $jobTitleInput.val().trim();
    var location = $locationInput.val().trim();
    $(".tag-cloud a").attr({"class":""});
    
    // make a call to indeed/dice api here
    var jobQuery = selectedSkills.concat(title);
    jobQuery = jobQuery.join(" ");
    selectedSkills= [];
    // make a call to indeed/dice api here
    //TODO: Indeed(q:jobQuery, l: location);
  });
})

