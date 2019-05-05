var app = angular.module("site");

app.service('CharCreatorService', [function(){

  this.freebiePts = 15;
  this.freebieMode = false;
  this.freebieSpent = 0;

  this.charPlayer = null;
  this.charChronicle = null;
  this.charName = null;
  this.charConcept = null;
  this.charNature = null;
  this.charDemeanor = null;
  this.charGeneration = "13";
  this.charSire = null;

  this.getPlayer = function(){
    return this.charPlayer;
  }

  this.generations = ["3", "4", "5", "6", "7",
                      "8", "9", "10", "11", "12",
                      "13", "14", "15"];

  this.getFreebiePts = function(){
    return this.freebiePts;
  }
  this.changeFreebiePts = changeFreebiePts;
  this.toggleFreebieMode = toggleFreebieMode;

  function changeFreebiePts(addPts, flaw){
    //Add to freebie pts spent when using anything other than a flaw.
    if(!flaw)
      this.freebieSpent -= addPts;

    this.freebiePts += addPts;
  }

  function toggleFreebieMode(){
    if(this.freebieSpent > 0){
      return;
    }
    this.freebieMode = !this.freebieMode;
  }
}]);
