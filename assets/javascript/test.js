var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});
}

$(document).ready(function(){
  var skills = JSON.parse(localStorage.getItem('skills')) || [];
  _.forEach(skills, function(skill){
    var $skill = $("<span>").text(skill);
    $("#select-skills").append($skill);
  })
  
  $("#search").on("click", function(e){
    e.preventDefault();
    var newSkills = $("#key-words").val().split(" ");
    console.log("newSkills are >>>>", newSkills);
    skills=skills.concat(newSkills);
    console.log("skills are >>>", skills);
    localStorage.setItem('skills', JSON.stringify(skills));
    _.forEach(skills, function(skill){
      var $skill = $("<span>").text(skill);
      $("#select-skills").append($skill);
    })
  });
})
