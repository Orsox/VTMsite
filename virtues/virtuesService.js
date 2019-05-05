var app = angular.module("site");

app.service("VirtuesService",
 ['CharCreatorService', 'PathService', 'WillpowerService',
 function(CharCreatorService, PathService, WillpowerService){

   this.virtuePts = 7;
   this.selectVirtuePt = selectVirtuePt;

   function selectVirtuePt(virtue, index){

     var pointDiff = 0;

     //Different operations if using Freebie points.
     if(CharCreatorService.freebieMode){

       if(virtue.points[index].type == "original")
        return null;

       var virtueFree = CharCreatorService.getFreebiePts();

       if(index < virtue.pointCount - 1)
         pointDiff = (virtue.pointCount * 2) - ((index + 1) * 2);
       if((index == virtue.pointCount-1)){
         pointDiff = (virtue.pointCount * 2) - (index * 2);
         index -= 1;
       }
       else if(index > virtue.pointCount-1)
         pointDiff = ((virtue.pointCount-1) * 2) + (-2 * index);

       if(virtueFree + pointDiff < 0)
         return null;

       CharCreatorService.changeFreebiePts(pointDiff);
       virtue.pointCount = (index+1);
       virtue.select(index);
       return;
     }
     else{
          pointDiff = virtue.pointCount - (index+1);

       //Do math to make sure they can't spend points they don't have, even when
       //priorityPts isn't equal to 0.
       //Case example: increase 3 pts when pts = 2.
       if((this.virtuePts + pointDiff < 0))
         return null;

       if(index == 0 && virtue.pointCount == 1){
         pointDiff = 0;
       }
       else{
         //Change the point count in the virtue.
         virtue.pointCount = (index+1);
       }

       if(virtue.name != "Mut"){
         PathService.selectedPath.pointCount += (-pointDiff);
         PathService.selectedPath.select(PathService.selectedPath.pointCount-1);
         PathService.selectedPath.pointMin = PathService.selectedPath.pointCount;
       }
       else{
         var willpower = WillpowerService.willpower;
         willpower.pointCount +=(-pointDiff);
         willpower.select(willpower.pointCount-1);
         willpower.pointMin = willpower.pointCount;
       }

       this.virtuePts += pointDiff;
       //Fill in the dots!
       virtue.select(index);
     }
   };

  var vm = this;

  class Virtue {
    constructor(name){
      this.name = name;
      if(name == "Gewissen")
        this.displayName = "Gewissen/Conviction";
      else{
        if(name == "Selbstbeherrschung")
          this.displayName = "Selbstbeherrschung/Instinct"
        else
          this.displayName = name;
        }
      this.pointCount = 1;
      this.points = [{id:0, img:"./full.png", type: "original"},
                     {id:1, img:"./empty.png", type: ""},
                     {id:2, img:"./empty.png", type: ""},
                     {id:3, img:"./empty.png", type: ""},
                     {id:4, img:"./empty.png", type: ""}];

      this.reset = function(){
        vm.virtuePts += (this.pointCount - 1);
        this.pointCount = 1;
        this.points.forEach(function(point){
          if(point.id == 0)
            point.img = "./full.png";
          else {
            point.img = "./empty.png";
          }
        });
      }

      this.select = function(index, type){
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
                point.type = type;
              }
              else{
                point.img = "./full.png";
                point.type = "original";
              }
            }
          });
        }
      }
    };
  };

  this.resetVirtues = resetVirtues;
  function resetVirtues(){
    for(var virtue in this.virtueList){
      this.virtueList[virtue].reset();
    }
  }

  this.virtueList = {"Gewissen": new Virtue("Gewissen"),
                     "Selbstbeherrschung": new Virtue("Selbstbeherrschung"),
                     "Mut": new Virtue("Mut")};

  this.pathCount = this.virtueList["Gewissen"].pointCount + this.virtueList["Selbstbeherrschung"].pointCount;

}]);
