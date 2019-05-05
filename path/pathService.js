var app = angular.module("site");

app.service("PathService",
 ['CharCreatorService',
 function(CharCreatorService){

   this.pathList = ["Menschlichkeit", "Pfad des Grabes", "Pfad der Asche", "Pfad der Gebeine",
                    "Pfad des Nachrufs", "Pfad des Leichnams", "Pfad des Verfalls", "Pfad der vier Säfte",
                    "Gläserne Pfad", "Pfad des Blutes", "Elementarherrschaft", "Der Grüne Pfad",
                    "Hände der Vernichtung", "Lockruf der Flammen", "Neptuns Macht", "Bewegung durch den Geist",
                    "Pfad der Anrufung", "Pfad der Verführung", "Pfad des Mars", "Pfad der Technomantie",
                    "Pfad der Rache des Vaters", "Thaumaturgische Gegenzauber", "Wetterkontrolle"];

  this.selectPathPt = selectPathPt;

  function selectPathPt(path, index){

    if(!CharCreatorService.freebieMode)
      return null;

    if(path.name == "")
      return;

    if(index == 0)
      index = 1;

    var pointDiff = path.pointCount - (index+1);

    if((CharCreatorService.getFreebiePts() + pointDiff < 0))
      return null;

    if(path.points[index].type == "original")
      return;

    if(index == path.pointCount - 1){
      pointDiff = 1;
      index -= 1;
    }

    CharCreatorService.changeFreebiePts(pointDiff);
    path.select(index, "freebie");
    path.pointCount = index+1;
  };

  var self = this;
  class Path{
    constructor(name){

      this.name = name;
      this.pointCount = 2;
      this.pointMin = 2;
      this.points = [{id:0, img:"./full.png", type: "original"},
                     {id:1, img:"./full.png", type: "original"},
                     {id:2, img:"./empty.png", type: ""},
                     {id:3, img:"./empty.png", type: ""},
                     {id:4, img:"./empty.png", type: ""},
                     {id:5, img:"./empty.png", type: ""},
                     {id:6, img:"./empty.png", type: ""},
                     {id:7, img:"./empty.png", type: ""},
                     {id:8, img:"./empty.png", type: ""},
                     {id:9, img:"./empty.png", type: ""}];

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
             if(type == "freebie" && point.img != "./full.png"){
               point.img = "./free.png"
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
    };
  };

  this.resetPath = resetPath;
  function resetPath(){
    this.selectedPath.points = [{id:0, img:"./full.png", type: "original"},
                                {id:1, img:"./full.png", type: "original"},
                                {id:2, img:"./empty.png", type: ""},
                                {id:3, img:"./empty.png", type: ""},
                                {id:4, img:"./empty.png", type: ""},
                                {id:5, img:"./empty.png", type: ""},
                                {id:6, img:"./empty.png", type: ""},
                                {id:7, img:"./empty.png", type: ""},
                                {id:8, img:"./empty.png", type: ""},
                                {id:9, img:"./empty.png", type: ""}];
    this.selectedPath.name = this.pathList[0];
    this.selectedPath.pointCount = 2;
  };

  this.selectedPath = new Path("");

}]);
