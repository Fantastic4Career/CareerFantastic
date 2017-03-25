var normalizedSkills = {
  "Javascript": "Javascript",
  "Ruby": "Ruby",
  "Java": "Java",
  "Software": "Software", 
  "Angular": "Angular",
  "React": "React", 
  "Vue": "Vue",
  "Node": "Node",
  "CSS": "CSS",
  "HTML": "HTML",
  "Bootstrap":  "Bootstrap",
  "MySQL": "MySQL",
  "MongoDB": "MongoDB",
  "Firebase": "Firebase",
  "Sass": "Sass",
  "Python": "Python",
  "Django": "Django",
  "Rail": "Ruby on Rails",
  "Flask": "Flask"
};

function parseJobSkills (skills) {
  var processedSkills = skills.toLowerCase();
  var skillsArray = [];
  _.forEach(normalizedSkills, function(value, key){
    var processedKey = key.toLowerCase();
    if (processedSkills.indexOf(processedKey) !== -1) {
      skillsArray.push(value);
    }
  })
  return skillsArray.join(", ");
}
