var app = angular.module("site");

app.service("AbilitiesService",
['CharCreatorService',
 function(CharCreatorService){

   this.priorityChange = priorityChange;
   this.selectAbility = selectAbility;
   this.getPriority = getPriority;
   this.getPriorityPts = getPriorityPts;
   this.resetAbilities = resetAbilities;
   this.resetPriorities = resetPriorities;
   this.setCustomAbility = setCustomAbility;
   this.abilityPriorities = ["Primär", "Sekundär", "Tertiär"];
   this.abilitiesPage = "./abilities/abilities.html";
   this.abilityPtsTotal = 27;
   this.primaryPts = 13;
   this.secondaryPts = 9;
   this.tertiaryPts = 5;
   this.selectedPriorities = [null, null, null];
   this.abilitiesList = {};
   var vm = this;

   class Ability {
     constructor(name, id){
       this.name = name;
       if(id != null){
         this.id = id;
       }
       this.pointCount = 0;
       this.points = [{id: 0, img: "./empty.png", type: ""},
                      {id: 1, img: "./empty.png", type: ""},
                      {id: 2, img: "./empty.png", type: ""},
                      {id: 3, img: "./empty.png", type: ""},
                      {id: 4, img: "./empty.png", type: ""}];

       this.reset = function(){
         //Reset name for custom abilities on load, then load names if they exist.
         if(this.id != null){
           this.name = "";
         }
         this.points.forEach(function(ability){
           ability.img = './empty.png';
           ability.type = "";
         });
         this.pointCount = 0;
       };

       this.select = function(index){
         if(index == -1){
           this.reset();
           return;
         }
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
        if(this.points[index].img == "./empty.png"){
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
     }
   };
   this.alertness = new Ability("Aufmerksamkeit");
   this.abilitiesList.alertness = this.alertness;
   this.expression = new Ability("Ausdruck");
   this.abilitiesList.expression = this.expression;
   this.subterfuge = new Ability("Ausflüchte");
   this.abilitiesList.subterfuge = this.subterfuge;
   this.intimidation = new Ability("Einschüchtern");
   this.abilitiesList.intimidation = this.intimidation;
   this.empathy = new Ability("Empathie");
   this.abilitiesList.empathy = this.empathy;
   this.leadership = new Ability("Führungsqualitäten");
   this.abilitiesList.leadership = this.leadership;
   this.brawl = new Ability("Handgemenge");
   this.abilitiesList.brawl = this.brawl;
   this.awareness = new Ability("Magiegespür");
   this.abilitiesList.awareness = this.awareness; 
   this.athletics = new Ability("Sportlichkeit");
   this.abilitiesList.athletics = this.athletics;       
   this.streetwise = new Ability("Szenekenntnis");
   this.abilitiesList.streetwise = this.streetwise;   
   this.customtalent = new Ability('', 'Hobbytalent');
   this.abilitiesList.customtalent = this.customtalent;
   this.larceny = new Ability("Diebstahl");
   this.abilitiesList.larceny = this.larceny;
   this.etiquette = new Ability("Etikette");
   this.abilitiesList.etiquette = this.etiquette;
   this.drive = new Ability("Fahren");
   this.abilitiesList.drive = this.drive;
   this.crafts = new Ability("Handwerk");
   this.abilitiesList.crafts = this.crafts;
   this.stealth = new Ability("Heimlichkeit");
   this.abilitiesList.stealth = this.stealth;
   this.melee = new Ability("Nahkampf");
   this.abilitiesList.melee = this.melee;
   this.firearms = new Ability("Schusswaffen");
   this.abilitiesList.firearms = this.firearms;
   this.animalken = new Ability("Tierkunde");
   this.abilitiesList.animalken = this.animalken;
   this.survival = new Ability("Überleben");
   this.abilitiesList.survival = this.survival;
   this.performance = new Ability("Vortrag");
   this.abilitiesList.performance = this.performance;
   this.customskill = new Ability('', 'customskill');
   this.abilitiesList.customskill = this.customskill;
   this.academics = new Ability("Akademisches Wissen");
   this.abilitiesList.academics = this.academics;  
   this.computer = new Ability("Computer");
   this.abilitiesList.computer = this.computer;
   this.finance = new Ability("Finanzen");
   this.abilitiesList.finance = this.finance;
   this.law = new Ability("Gesetzeskenntnis");
   this.abilitiesList.law = this.law;
   this.medicine = new Ability("Medizin");
   this.abilitiesList.medicine = this.medicine;
   this.investigation = new Ability("Nachforschungen");
   this.abilitiesList.investigation = this.investigation;
   this.science = new Ability("Naturwissenschaften");
   this.abilitiesList.science = this.science;
   this.occult = new Ability("Okkultismus");
   this.abilitiesList.occult = this.occult;
   this.politics = new Ability("Politik");
   this.abilitiesList.politics = this.politics;
   this.technology = new Ability("Technologie");
   this.abilitiesList.technology = this.technology;
   this.customknowledge = new Ability('', 'customknowledge');
   this.abilitiesList.customknowledge = this.customknowledge;

   this.abilityCategories = [
     {
       id: 0, category: "Talente", priority: null,
       abilities:
       [
         this.alertness, this.expression, this.subterfuge, this.intimidation,
         this.empathy, this.leadership, this.brawl,
         this.awareness, this.athletics, 
         this.streetwise, this.customtalent
       ]
    },
    {
      id: 1, category: "Fertigkeiten", priority: null,
      abilities: [
        this.larceny, this.etiquette, this.drive, this.crafts, this.stealth, this.melee,
        this.firearms, this.animalken, this.survival, this.performance, this.customskill
      ]
    },
    {
      id: 2, category: "Kenntnisse", priority: null,
      abilities:
      [
        this.academics, this.computer, this.finance, this.law,
        this.medicine, this.investigation, this.science, this.occult,
        this.politics, this.technology, this.customknowledge
      ]
    }];

    function getPriority(ability){
     for(var i = 0; i < this.abilityCategories.length; i++){
       if(this.abilityCategories[i].abilities.indexOf(ability)!=-1){
         return this.selectedPriorities[i];
       }
     }
    }

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

    function selectAbility(ability, index){

      var priortyPts = 0;
      var pointDiff = 0;

      var priority = this.getPriority(ability);

      //Different operations if using Freebie points.
      if(CharCreatorService.freebieMode){

        if(ability.points[index].type == "original")
          return null;

        priorityPts = CharCreatorService.getFreebiePts();

        if(index < ability.pointCount - 1)
          pointDiff = (ability.pointCount * 2) - ((index + 1) * 2);
        if((index == ability.pointCount-1)){
          pointDiff = (ability.pointCount * 2) - (index * 2);
           index -= 1;
        }
        else if(index > ability.pointCount-1)
          pointDiff = ((ability.pointCount-1) * 2) + (-2 * index);

        if(priorityPts + pointDiff < 0)
          return null;

        CharCreatorService.changeFreebiePts(pointDiff);
        ability.pointCount = (index+1);
        ability.select(index);
        return;
      }
      else{
         priorityPts = this.getPriorityPts(priority);
         var pointDiff = ability.pointCount - (index+1);
      }

      if(priority==null || (!CharCreatorService.freebieMode && index >= 3)){
       return null;
      }

      //Do math to make sure they can't spend points they don't have,
      //even when priorityPts isn't equal to 0.
      //Case example: increase 3 pts when priorityPts = 2.
      if((priorityPts+pointDiff < 0)){
       return null;
      }

      if(index == 0 && ability.pointCount == 1){
        ability.pointCount = 0;
        pointDiff = 1;
        index = -1;
      }
      else{
        //Change the point count in the ability.
        ability.pointCount = (index+1);
      }


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
      this.abilityPtsTotal += pointDiff;
      //Fill in the dots!
      ability.select(index);
    };

    function priorityChange(changedPriority, id, prevPriority){
      this.abilityCategories[id].priority = changedPriority;
      for(var i = 0; i < this.selectedPriorities.length; i++){
        if(changedPriority == this.selectedPriorities[i] && id != i){
          this.selectedPriorities[i] = null;
          this.abilityCategories[i].abilities.forEach(function(abil){
            abil.reset();
          });
        }
      }
        //Reset the dots.
        this.abilityCategories[id].abilities.forEach(function(abil){
          abil.reset();

        });
        //Reset the point values.
        if(prevPriority == "Primär"){
          this.primaryPts = 13;
        }
        if(prevPriority == "Sekundär"){
          this.secondaryPts  = 9;
        }
        if(prevPriority == "Tertiär"){
          this.tertiaryPts = 5;
        }
        if(changedPriority == "Primär"){
          this.primaryPts = 13;
        }
        if(changedPriority == "Sekundär"){
          this.secondaryPts = 9;
        }
        if(changedPriority == "Tertiär"){
          this.tertiaryPts = 5;
        }
    };

    function resetAbilities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.abilities.forEach(function(ab){
          ab.reset();
        });
      });
    };

    function resetPriorities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.priority = null;
      });
      this.primaryPts = 13;
      this.secondaryPts = 9;
      this.tertiaryPts = 5;
    };

    function setCustomAbility(ability, name){
      if(ability == this.customtalent){
        this.customtalent.name = name;
      }
      else if(ability == this.customskill){
        this.customskill.name = name;
      }
      else{
        this.customknowledge.name = name;
      }
    };

}]);
