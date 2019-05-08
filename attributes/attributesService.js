var app = angular.module("site");
app.service('AttributesService', ['UglyService', 'CharCreatorService',
 function(UglyService, CharCreatorService){

  this.priorityChange = priorityChange;
  this.selectAttribute = selectAttribute;
  this.getPriority = getPriority;
  this.getPriorityPts = getPriorityPts;
  this.isUglyClan = isUglyClan;
  this.resetAttributes = resetAttributes;
  this.resetPriorities = resetPriorities;
  this.attributePriorities = ["Primär", "Sekundär", "Tertiär"];
  this.attributesPage = "./attributes/attributes.html";
  this.attributePtsTotal = 15;
  this.primaryPts = 7;
  this.secondaryPts = 5;
  this.tertiaryPts = 3;
  this.selectedPriorities = [null, null, null];
  this.attributesList = {};
  var vm = this;

  class Attribute {
    constructor(name){
      this.name = name;
      this.pointCount = 1;
      this.points = [{id:0, img:"./full.png", type: "original"},
                     {id:1, img:"./empty.png", type: ""},
                     {id:2, img:"./empty.png", type: ""},
                     {id:3, img:"./empty.png", type: ""},
                     {id:4, img:"./empty.png", type: ""}];

      this.reset = function(){
        vm.attributePtsTotal += (this.pointCount - 1);
        this.pointCount = 1;
        this.points.forEach(function(point){
          if(point.type == "freebie"){
            CharCreatorService.changeFreebiePts(5);
          }
          if(point.id == 0){
            point.img = "./full.png";
            point.type = "original";
          }
          else {
            point.img = "./empty.png";
            point.type = "";
          }
        });
      }

      this.select = function(index){
        if(this.points[index].img=="./full.png" ||
           this.points[index].img=="./free.png")
        {
          this.points.forEach(function(point){
            if(point.id <= index){
              return;
            }
            else{
              point.img = "./empty.png";
              point.type = "";
            }
          });
        }
        if(this.points[index].img=="./empty.png")
        {
          this.points.forEach(function(point){
            if(point.id > index){
              return;
            }
            else{
              if(CharCreatorService.freebieMode && point.img != "./full.png"){
                point.img = "./free.png";
                point.type = "freebie";
              }
              else{
                point.img = "./full.png";
                point.type = "original";
              }
            }
          });
        }
      };

      this.zero = function(){
        this.points.forEach(function(point){
          point.img = "./empty.png";
          point.type = "";
        });
      };
    };
  };

  this.strength = new Attribute("Körperkraft");
  this.attributesList.strength = this.strength;
  this.dexterity = new Attribute("Geschick");
  this.attributesList.dexterity = this.dexterity
  this.stamina = new Attribute("Widerstandsfähigkeit");
  this.attributesList.stamina = this.stamina;
  this.charisma = new Attribute("Charisma");
  this.attributesList.charisma = this.charisma;
  this.manipulation = new Attribute("Manipulation");
  this.attributesList.manipulation = this.manipulation;
  this.appearance = new Attribute("Erscheinungsbild")
  this.attributesList.appearance = this.appearance;
  this.perception = new Attribute("Wahrnehmung");
  this.attributesList.perception = this.perception
  this.intelligence = new Attribute("Intelligenz");
  this.attributesList.intelligence = this.intelligence;
  this.wits = new Attribute("Geisteschärfe");
  this.attributesList.wits = this.wits;

  this.attributeCategories = [
    {
      id: 0,
      category: "Körperlich",
      attributes:[this.strength, this.dexterity, this.stamina],
      priority:null
   },
   {
     id: 1,
     category: "Gesellschaftlich",
     attributes:[this.charisma, this.manipulation, this.appearance],
     priority: null
   },
   {
     id: 2,
     category: "Geistig",
     attributes:[this.perception, this.intelligence, this.wits],
     priority: null
   }];

  function isUglyClan(){
    if(UglyService.isUgly()){
      if(UglyService.dirtyBit){
        this.resetAttributes();
        this.resetPriorities();
        UglyService.dirtyBit = false;
      }
      this.appearance.zero();
      this.appearance.pointCount = 0;
      return true;
    }
    else {
      if(UglyService.previousUgly()){
        this.appearance.reset();
        this.appearance.pointCount = 1;
        UglyService.previousClan = null;
      }
      return false;
    }
  };

  function resetAttributes(){
    this.attributeCategories.forEach(function(attrCat){
      attrCat.attributes.forEach(function(attr){
        attr.reset();
        attr.pointCount = 1;
      });
    });
  };

  function resetPriorities(){
    this.attributeCategories.forEach(function(attrCat){
      attrCat.priority = null;
    });
    this.primaryPts = 7;
    this.secondaryPts = 5;
    this.tertiaryPts = 3;
  };

function getPriority(attribute){
 for(var i = 0; i < this.attributeCategories.length; i++){
   if(this.attributeCategories[i].attributes.indexOf(attribute)!=-1){
     return this.selectedPriorities[i];
   }
 }
};

function getPriorityPts(priority){
  switch(priority){
    case "Primär":
      return this.primaryPts;
      break;
    case "Sekundär":
      return this.secondaryPts;
      break;
    case "Tertiär":
      return this.tertiaryPts;
      break;
    default:
      break;
  }
};

function selectAttribute(attribute, index, catIndex){

  if(attribute.name == "Erscheinungbild" && UglyService.isUgly()){
    return null;
  }
  var priority = this.getPriority(attribute);

  if(priority==null){
    return null;
  }

  var priorityPts = 0;
  var pointDiff = 0;

  //Different operations if using Freebie points.
  if(CharCreatorService.freebieMode){

    if(attribute.points[index].type == "original")
      return null;

    priorityPts = CharCreatorService.getFreebiePts();

    if(index )

    if(index < attribute.pointCount - 1)
      pointDiff = (attribute.pointCount * 5) - ((index + 1) * 5);
    if((index == attribute.pointCount-1 && index!=0)){
      pointDiff = (attribute.pointCount * 5) - (index * 5);
      index -= 1;
    }
    else if(index > attribute.pointCount-1)
      pointDiff = ((attribute.pointCount-1) * 5) + (-5 * index);


    if(priorityPts + pointDiff < 0)
      return null;

    CharCreatorService.changeFreebiePts(pointDiff);
    attribute.pointCount = (index+1);
    attribute.select(index, "freebie");
    return;
  }
  else{
     priorityPts = this.getPriorityPts(priority);
     var pointDiff = attribute.pointCount - (index+1);
  }

  //Do math to make sure they can't spend points they don't have, even when
  //priorityPts isn't equal to 0.
  //Case example: increase 3 pts when priorityPts = 2.
  if(priorityPts+pointDiff < 0)
    return null;

  //Change the point count in the attribute.
  attribute.pointCount = (index+1);

  //Change the total amount of points still available for that category.
  switch(priority){
    case "Primär":
      this.primaryPts += pointDiff;
      break;
    case "Sekundär":
      this.secondaryPts += pointDiff;
      break;
    case "Tertiär":
      this.tertiaryPts += pointDiff;
      break;
    default:
      break;
  }
  this.attributePtsTotal += pointDiff;
  //Fill in the dots!
  attribute.select(index, "original");
};

function priorityChange(changedPriority, id, prevPriority){
  this.attributeCategories[id].priority = changedPriority;
  for(var i = 0; i < this.selectedPriorities.length; i++){
    if(changedPriority == this.selectedPriorities[i] && id != i){
      this.selectedPriorities[i] = null;
      this.attributeCategories[i].attributes.forEach(function(attr){
        attr.reset();
      });
    }
  }
    //Reset the dots.
    this.attributeCategories[id].attributes.forEach(function(attr){
      attr.reset();

    });
    //Reset the point values.
    if(prevPriority == "Primär"){
      this.primaryPts = 7;
    }
    if(prevPriority == "Sekundär"){
      this.secondaryPts  = 5;
    }
    if(prevPriority == "Tertiär"){
      this.tertiaryPts = 3;
    }
    if(changedPriority == "Primär"){
      this.primaryPts = 7;
    }
    if(changedPriority == "Sekundär"){
      this.secondaryPts = 5;
    }
    if(changedPriority == "Tertiär"){
      this.tertiaryPts = 3;
    }
  };

}]);
