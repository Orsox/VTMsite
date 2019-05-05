var app = angular.module("site");

app.service("MeritFlawService", ['CharCreatorService',
 function(CharCreatorService){

   this.maxFlawPts = 7;
   this.addedFlawPts = 0;
   this.meritCount = 0;
   this.flawCount = 0;

  class MeritFlaw {
    constructor(name, pointCost){
      this.name = name;
      this.pointCost = pointCost;
   }
 };

 this.masterMeritList;
 this.masterFlawList;

 this.physicalMeritList = {"": 0, "Geschärfte Sinne (1pt)": 1, "Beidhändig (1pt)": 1, "Schläger (1pt)": 1, "Katzenhaftes Gleichgewicht (1pt)": 1,
                           "Frühaufsteher (1pt)": 1, "Essen (1pt)": 1, "Freundliches Gesicht (1pt)": 1, "Rosiger Teint (2pt)": 2,
                           "Bezauberne Stimme (2pt)": 2, "Draufgänger (3pt)": 3, "Wirksame Verdauung (3pt)": 3, "Riesenwuchs (4pt)": 4};

 this.physicalFlawList = {"": 0, "Schwerhörigkeit (1pt)": 1, "Klein (1pt)": 1, "Grabgeruch (1pt)": 1,
                          "Tic/Zucken (1pt)": 1, "Schlechtes Sehvermögen (1pt)": 1, "Schlechtes Sehvermögen (2pt)": 2,
                          "Schlechtes Sehvermögen (3pt)": 3, "Vierzehnte Generation (2pt)": 2,
                          "Fünfzehnte Generation (4pt)": 4, "Entstellt (2pt)": 2, "Stumpfer Biss (2pt)": 2, "Infektiöser Biss (2pt)": 2,
                          "Einäugigkeit (2pt)":2, "Anfällig gegen Siber (2pt)": 2, "Offene Wunde (2pt)": 2,"Offene Wunde (3pt)": 3,
                           "Offene Wunde (4pt)": 4,
                          "Sucht (3pt)": 3, "Kind (3pt)": 3, "Missbildung (3pt)": 3, "Glühende Augen (3pt)": 3,
                          "Lähmung (3pt)": 3, "Faul (3pt)": 3, "Monstrosität (3pt)": 3, "Dauerhafte Fangzähne (3pt)": 3,
                          "Dauerhafte Wunde (3pt)": 3, "Langsame Heilung (3pt)": 3, "Krankheitsüberträger (4pt)": 4, "Taubheit (4pt)": 4,
                          "Stummheit (4pt)": 4, "Anämie (4pt)": 4, "Leichenfleisch (5pt)": 5, "Unfruchtbare Vitae (5pt)": 5,
                          "Blindheit (6pt)": 6};

 this.mentalMeritList = {"": 0, "Eiskalte Logik (1pt)": 1, "Gesunder Menschenverstand (1pt)": 1, "Konzentration (1pt)": 1,
                         "Innenschau (1pt)": 1, "Sprachen (1pt)": 1, "Zeitgefühl (1pt)": 1, "Nützliche Kenntnis (1pt)": 1,
                         "Ehrenkodex (2pt)": 2,"Computerbegabung (2pt)": 2, "Fotografisches Gedächnis (2pt)": 2, "Leichter Schlaf (2pt)": 2,
                         "Sprachtalent (2pt)": 2, "Ruhe (3pt)": 3, "Eiserner Wille (3pt)": 3, "Frühreif (3pt)": 3};

 this.mentalFlawList = {"": 0, "Tiefer Schlaf (1pt)": 1, "Ungeduld (1pt)": 1, "Albträume (1pt)": 1,
                        "Beuteausschluss (1pt)": 1, "Schüchternheit (1pt)": 1, "Sensibilität (1pt)": 1, "Sprachfehler (1pt)": 1,
                        "Nicht überzeugt (1pt)": 1, "Amnesie (2pt)": 2, "Mondsüchtig (2pt)": 2, "Phobie (2pt)": 2,
                        "Mangelnde Beherrschung (2pt)": 2, "Stereotyp (2pt)": 2, "Ortsgebunden (2pt)": 2, "Durst nach Unschuld (2pt)": 2,
                        "Rache (2pt)": 2, "Opfer der Masquerade (2pt)": 2, "Schwacher Wille (3pt)": 3, "Gourmet (4pt)": 4,
                        "Schuldbeladen (4pt)": 4, "Rückblenden (6pt)": 6};

 this.socialMeritList = {"": 0, "Stammgast im Elysium (1pt)": 1, "Ehemaliger Ghoul (1pt)": 1, "Harmlos (1pt)": 1,
                         "Führungstalent (1pt)": 1, "Angesehender Erzeuger (1pt)": 1, "Protege (1pt)": 1, "Ruf (1pt)": 1,
                         "Überlebender des Sabbat (1pt)": 1, "Gefallen (1pt)": 1, "Gefallen (2pt)": 2, "Gefallen (3pt)": 3,"Gefallen (4pt)": 4,
                         "Gefallen (5pt)": 5, "Gefallen (6pt)": 6, "Raufbold (2pt)": 2, "Alter Kumpel (2pt)": 2, "Freund des Vogts (2pt)": 2,
                         "Freie Strasse (2pt)": 2, "Heiligkeit (2pt)": 2, "Scholar des Anderen (2pt)": 2, "Scholar der Feinde (2pt)": 2,
                         "Freund des Untergrunds (3pt)": 3, "Maulwurf (3pt)": 3, "Aufgehender Stern (3pt)": 3, "Zerissendes Band (4pt)": 4,
                          "Clan-Freundschaft (4pt)": 4, "Freundschaft mit Erstgeborenen/Bischöfen (4pt)": 4};

 this.socialFlawList = {"": 0, "Verpatzte Präsentation (1pt)": 1, "Dunkles Geheimnis (1pt)": 1, "Entbehrlich (1pt)": 1,
                        "Unvollkommendes Verständnis (1pt)": 1, "Ablehnender Erzeuger (1pt)": 1, "Verwechslung (1pt)": 1, "Neuankömmling (1pt)": 1,
                        "Nesthäkchen (1pt)": 1, "Rekrutierungsziel (1pt)": 1, "Berüchtigter Erzeuger (1pt)": 1, "Spezieller Verantwortungsbereich (1pt)": 1,
                        "Sympathisant (1pt)": 1, "Feind (1pt)": 1, "Feind (2pt)": 2, "Feind (3pt)": 3,
                        "Feind (4pt)": 4, "Feind (5pt)": 5, "Gebunden (2pt)": 2, "Handlanger (2pt)": 2,
                        "Geflüchtetes Ziel (2pt)": 2, "Versager (2pt)": 2, "Bruch der Masquerade (2pt)": 2,
                        "Alte Flamme (2pt)": 2, "Rivalisierender Erzeuger (2pt)": 2, "Hochnäsig (2pt)": 2, "Schande für das Blut (3pt)": 3,
                        "ehemaliger Prinz (3pt)": 3, "Gehetzt wie ein Hund (3pt)": 3, "Schnüffler (3pt)": 3, "Mit dem feind schlafen (3pt)": 3,
                        "Gejagd (4pt)": 4,
                        "Clan-Feindschaft (4pt)": 4, "Abscheulicher Herrscher (4pt)": 4, "Sich Übernehmen (4pt)": 4, "Sektenmitglied auf Probe (4pt)": 4,
                        "Blutjagd (4pt)": 4, "Blutjagd (6pt)": 6, "Zielscheibe des Spotts (5pt)": 5, "Rote Liste (7pt)": 7};

 this.supernaturalMeritList = {"": 0, "Täuschende Aura (1pt)": 1, "Heilende Berührung (1pt)": 1, "Harmlos für Tiere (1pt)": 1,
                               "Medium (2pt)": 2, "Magieresistenz (2pt)": 2, "Verborgene Diablerie (3pt)": 3, "Glück (3pt)": 3,
                               "Orakel (3pt)": 3, "Geister Mentor (3pt)": 3, "Wahre Liebe (4pt)": 4, "Zusätzliche Disziplin (5pt)": 5,
                               "Immun gegen Blutsbande (5pt)": 5, "Neun Leben (6pt)": 6, "Wahrer Glaube (7pt)": 7};

 this.supernaturalFlawList = {"": 0, "Kein Spiegelbild (1pt)": 1, "Kalte Brise (1pt)": 1, "Abgestoßen durch Knoblauch (1pt)": 1,
                              "Frostige Berührung (1pt)": 1, "Verflucht (1pt)": 1, "Verflucht (2pt)": 2, "Verflucht (3pt)": 3,
                              "Verflucht (4pt)": 4, "Verflucht (5pt)": 5, "Leuchtfeuer des Gottlosen (2pt)": 2, "Todessicht (2pt)": 2,
                              "Eerie Presence (2pt)": 2, "Lord of the Flies (2pt)": 2, "Kann kein fließendes Wasser überqueren (3pt)": 3,
                              "Spuk (3pt)": 3, "Angst for Kreuzen (3pt)": 3, "Griff der Verdammten (4pt)": 4, "Dunkles Schicksal (5pt)": 5,
                              "Lichtempfindlich (5pt)": 5};

this.clansMeritList = {"": 0, "Sectarian Ally (1pt)": 1, "Thousand Meter Killer (1pt)": 1,
                              "Fury's Focus (3pt, Prerequisite: Path of Entelechy)": 3, "Dynamic Personality (5pt)": 5,
                              "Drug Resistance (2pt)": 2, "Addictive Blood (3pt)": 3,
                              "Setite Initiate (5pt)": 5, "Hive-Minded (1pt)": 1,
                              "Hive-Minded (2pt)": 2, "Skald (2pt)": 2, "Lesser Mark of the Beast (4pt)": 4,
                              "Totemic Change (5pt)": 5, "Cannibal (1pt)": 1, "Consanguineous Reistance (1pt)": 1,
                              "Mortuario (2pt)": 2, "Mortuario (4pt)": 4, "Sanguine Incongruity (5pt)": 5,
                              "Court Favorite (1pt)": 1, "Court Favorite (2pt)": 2, "Court Favorite (3pt)": 3,
                              "Court Favorite (4pt)": 4, "Court Favorite (5pt)": 5, "Eyes of Shadow (1pt)": 1,
                              "Eyes of Shadow (2pt)": 2, "Eyes of Shadow (3pt)": 3, "Eyes of Shadow (4pt)": 4,
                              "Bigger Boys Came (2pt)": 2, "Call of the Sea (2pt)": 2, "Controllable Night Sight (2pt)": 2,
                              "Secret Stash (2pt)": 2, "Secret Stash (3pt)": 3, "Secret Stash (4pt)": 4,
                              "Secret Stash (5pt)": 5, "Aura of Command (3pt)": 3, "King or Queen of Shadow (4pt)": 4,
                              "Long-Term Planning (4pt)": 4, "Instrument of God (5pt)": 5,  "Distracting Aura (2pt)": 2,
                              "Prophetic Dreams (2pt)": 2, "Cold Read (3pt)": 3, "Foul Blood (1pt)": 1,
                              "Lizard Limbs (1pt)": 1, "Long Fingers (1pt)": 1, "Monstrous Maw (1pt)": 1,
                              "Piscine (1pt)": 1, "Slimy (1pt)": 1, "Spawning Pool (1pt)": 1, "Spawning Pool (2pt)": 2,
                              "Spawning Pool (3pt)": 3, "Tunnel Rat (1pt)": 1, "Tunnel Rat (2pt)": 2, "Tunnel Rat (3pt)": 3,
                              "Tunnel Rat (4pt)": 4, "Tunnel Rat (5pt)": 5, "Sleep Unseen (1pt)": 1, "Tough Hide (2pt)": 2,
                              "False Reflection (3pt)": 3, "Patagia (4pt)": 4, "Rugged Bad Looks (5pt)": 5,
                              "Antitoxin Blood (1pt)": 1, "Brahmin (1pt)": 1, "Kshatriya (1pt)": 1, "Legerdemain (1pt)": 1,
                              "Mute Devotion (1pt)": 1, "Vaishya (1pt)": 1, "Critters (2pt)": 2, "Heart of Needles (3pt)": 3,
                              "Indelible (1pt)": 1, "Indelible (2pt)": 2, "Impressive Restraint (2pt)": 2,
                              "Master of the Masquerade (2pt)": 2, "Slowed Degeneration (5pt)": 5,
                              "Embraced without the Cup (1pt)": 1, "Secret Society Member (1pt)": 1, "Keys to the Library (1pt)": 1,
                              "Keys to the Library (2pt)": 2, "Keys to the Library (3pt)": 3, "Keys to the Library (4pt)": 4,
                              "Keys to the Library (5pt)": 5, "Unmarked Antitribu (2pt)": 2, "Unmarked Antitribu (5pt)": 5,
                              "Quartermaster (3pt)": 3, "Bioluminescence (1pt)": 1, "Pain Tolerance (2pt)": 2,
                              "Dracon's Temperament (3pt)": 3, "Haven Affinity (3pt)": 3, "Revenant Disciplines (3pt)": 3,
                              "Promethean Clay (5pt)": 5, "Connoisseur (2pt)": 2, "Blessed by St. Gustav (4pt)": 4};

this.clansFlawList = {"": 0, "Outcast (2pt)": 2, "Broken Antitribu (3pt)": 3, "Multiple Curses (3pt)": 3,
                             "Obvious Predator (2pt)": 2, "Scales (1pt)": 1, "Scales (2pt)": 2,
                             "Scales (3pt)": 3, "Venemous Bite (2pt)": 2, "Forked Tongue (2pt)": 2,
                             "Heartless (4pt)": 4, "Aura of the Typhon (5pt)": 5, "Member of the Pack (2pt)": 2,
                             "Rat in a Cage (2pt)": 2, "Inbred (1pt)": 1, "Inbred (2pt)": 2, "Inbred (3pt)": 3,
                             "Inbred (4pt)": 4, "Inbred (5pt)": 5, "Shadow Walker (6pt)": 6, "Uncontrollable Night Sight (2pt)": 2,
                             "Insubordinate (3pt)": 3, "Unproven (3pt)": 3, "Paper Trail (2pt)": 2, "Stigmata (2pt)": 2,
                             "Stigmata (4pt)": 4, "Infectious (3pt)": 3, "Overstimulated (3pt)": 3, "Dead Inside (4pt)": 4,
                             "Stench (1pt)": 1, "Dangerous Secret (1pt)": 1, "Dangerous Secret (2pt)": 2, "Dangerous Secret (3pt)": 3,
                             "Dangerous Secret (4pt)": 4, "Dangerous Secret (5pt)": 5, "Anosmia (2pt)": 2, "Parasitic Infestation (2pt)": 2,
                             "Bestial (3pt)": 3, "Feind Brood (3pt)": 3, "Putrescent (4pt)": 4, "Contagious (5pt)": 5, "Incoherent (5pt)": 5,
                             "Chandala (1pt)": 1, "Flawed Reality (2pt)": 2, "Oathbreaker (2pt)": 2, "Lost Svadharma (3pt)": 3,
                             "Tortured Artist (1pt)": 1, "Private Life (3pt)": 3, "Arcane Curse (1pt)": 1, "Arcane Curse (2pt)": 2,
                             "Arcane Curse (3pt)": 3, "Arcane Curse (4pt)": 4, "Arcane Curse (5pt)": 5, "Cloistered (2pt)": 2,
                             "Betrayer's Mark (3pt)": 3, "Bound to the Clan (3pt)": 3, "Mage Blood (5pt)": 5, "Thaumaturgically Inept (5pt)": 5,
                             "Unblinking (1pt)": 1, "Ancestral Soil Dependence (2pt)": 2, "Faceless (3pt)": 3, "Privacy Obsession (3pt)": 3,
                             "Revenant Weakness (3pt)": 3, "Consumption (5pt)": 5, "Uncommon Vitae Preference (2pt)": 2};

this.bloodlinesMeritList = {"": 0, "The High Price (3pt)": 3, "Simply Waiting (4pt)": 4, "Chorus Trained (3pt)": 3,
                            "Chorus Trained (5pt)": 5, "Fugue Instinct (3pt)": 3, "Stillness of Death (2pt)": 2,
                            "Heavy Hands (3pt)": 3, "Disciple of Lazarus/Japheth (2pt)": 2, "Styx Baptism (3pt)": 3,
                            "Half-Life (6pt)": 6, "Prized Collection (1pt)": 1, "Prized Collection (2pt)": 2,
                            "Alien Perfection (2pt)": 2, "Paranormal Link (2pt)": 2, "Skin of Porcelain (4pt)": 4,
                            "Vitae Mutation (5pt)": 5, "Extra Sharp (2pt)": 2, "Speed Eater (2pt)": 2,
                            "Speed Eater (4pt)": 4, "Wolverine's Palate (3pt)": 3, "Scent of the Other (1pt)": 1,
                            "Sight Beyond Sight (3pt)": 3, "Warrior's Heart (3pt)": 3, "Death Grip (3pt)": 3,
                            "Stitcher (3pt)": 3, "Advanced Tech (1pt)": 1, "Advanced Tech (2pt)": 2,
                            "Advanced Tech (3pt)": 3, "Advanced Tech (4pt)": 4, "Advanced Tech (5pt)": 5,
                            "Fatalist (3pt)": 3, "True Celerity (5pt)": 5};

this.bloodlinesFlawList = {"": 0, "Carrion Presence (2pt)": 2, "Dark Aura (3pt)": 3, "Plague of Demons (4pt)": 4,
                           "Banshee-in-Waiting (5pt)": 5, "Stone Tongue (3pt)": 3, "Blood Weakness (4pt)": 4,
                           "Blood Weakness (7pt)": 7, "Unsanctioned Embrace (2pt)": 2, "Shadow Scarred (3pt)": 3,
                           "Lightweight (1pt)": 1, "Illiterate (1pt)": 1, "Illiterate (2pt)": 2, "Refined Palate (1pt)": 1,
                           "Refined Palate (2pt)": 2, "Refined Palate (3pt)": 3, "Dreadful Mara (4pt)": 4, "The Largest Maw (2pt)": 2,
                           "Body Trail (4pt)": 4, "The Eighth (6pt)": 6, "Permanent Third Eye (2pt)": 2,
                           "Permanent Third Eye (4pt)": 4, "Brittle Body (2pt)": 2, "Brittle Body (4pt)": 4,
                           "Mortal Flashbacks (5pt)": 5, "Out of Phase (2pt)": 2};

 this.selectedPhysicalMerits = {0: new MeritFlaw("", 0)};
 this.selectedPhysicalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedMentalMerits = {0: new MeritFlaw("", 0)};
 this.selectedMentalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSocialMerits = {0: new MeritFlaw("", 0)};
 this.selectedSocialFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSupernaturalMerits = {0: new MeritFlaw("", 0)};
 this.selectedSupernaturalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedClanMerits = {0: new MeritFlaw("", 0)};
 this.selectedClanFlaws = {0: new MeritFlaw("", 0)};

 this.selectedBloodlineMerits = {0: new MeritFlaw("", 0)};
 this.selectedBloodlineFlaw = {0: new MeritFlaw("", 0)};

this.chooseMeritFlaw = chooseMeritFlaw;
 function chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category){
   if(meritFlaw.name != ""){
     if(category.includes("Flaw"))
        this.flawCount++;
     else
        this.meritCount++;
      }
   else{
     if(category.includes("Flaw")){
        this.flawCount--;

      }
     else{
        this.meritCount--;
      }
   }
   switch(category){
      case "physicalMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.physicalMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedPhysicalMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedPhysicalMerits).length; i++){
            if(this.selectedPhysicalMerits[i].name == meritFlaw.name && i != index){
              this.selectedPhysicalMerits[index].name = "";
              this.selectedPhysicalMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "physicalFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.physicalFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if((this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost) <= this.maxFlawPts){
          this.selectedPhysicalFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedPhysicalFlaws).length; i++){
            if(this.selectedPhysicalFlaws[i].name == meritFlaw.name && i != index){
              this.selectedPhysicalFlaws[index].name = "";
              this.selectedPhysicalFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedPhysicalFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     case "mentalMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.mentalMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedMentalMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedMentalMerits).length; i++){
            if(this.selectedMentalMerits[i].name == meritFlaw.name && i != index){
              this.selectedMentalMerits[index].name = "";
              this.selectedMentalMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "mentalFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.mentalFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedMentalFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedMentalFlaws).length; i++){
            if(this.selectedMentalFlaws[i].name == meritFlaw.name && i != index){
              this.selectedMentalFlaws[index].name = "";
              this.selectedMentalFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedMentalFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     case "socialMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.socialMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedSocialMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSocialMerits).length; i++){
            if(this.selectedSocialMerits[i].name == meritFlaw.name && i != index){
              this.selectedSocialMerits[index].name = "";
              this.selectedSocialMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "socialFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.socialFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if((this.addedFlawPts + meritFlaw.pointCost -prevMeritFlaw.pointCost) <= this.maxFlawPts){
          this.selectedSocialFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSocialFlaws).length; i++){
            if(this.selectedSocialFlaws[i].name == meritFlaw.name && i != index){
              this.selectedSocialFlaws[index].name = "";
              this.selectedSocialFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedSocialFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     case "supernaturalMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.supernaturalMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedSupernaturalMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSupernaturalMerits).length; i++){
            if(this.selectedSupernaturalMerits[i].name == meritFlaw.name && i != index){
              this.selectedSupernaturalMerits[index].name = "";
              this.selectedSupernaturalMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "supernaturalFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.supernaturalFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedSupernaturalFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSupernaturalFlaws).length; i++){
            if(this.selectedSupernaturalFlaws[i].name == meritFlaw.name && i != index){
              this.selectedSupernaturalFlaws[index].name = "";
              this.selectedSupernaturalFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedSupernaturalFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     default:
        break;
   }
 }

 this.addMeritFlaw = addMeritFlaw;
 function addMeritFlaw(category, name, pointCost, index){
   if(pointCost == undefined){
     name = "";
     pointCost = 0;
   };
   switch(category){
     case "physicalMerit":
        if(!index)
          index = Object.keys(this.selectedPhysicalMerits).length;
        if(name != "")
          this.meritCount++;
        this.selectedPhysicalMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "physicalFlaw":
        if(!index)
          index = Object.keys(this.selectedPhysicalFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedPhysicalFlaws[index] = new MeritFlaw(name, pointCost);
        break;
     case "mentalMerit":
        if(!index)
          var index = Object.keys(this.selectedMentalMerits).length;
          if(name != "")
            this.meritCount++;
        this.selectedMentalMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "mentalFlaw":
        if(!index)
          var index = Object.keys(this.selectedMentalFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedMentalFlaws[index] = new MeritFlaw(name, pointCost);
        break;
     case "socialMerit":
        if(!index)
          var index = Object.keys(this.selectedSocialMerits).length;
          if(name != "")
            this.meritCount++;
        this.selectedSocialMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "socialFlaw":
        if(!index)
          var index = Object.keys(this.selectedSocialFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedSocialFlaws[index] = new MeritFlaw(name, pointCost);
        break;
     case "supernaturalMerit":
        if(!index)
          var index = Object.keys(this.selectedSupernaturalMerits).length;
          if(name != "")
            this.meritCount++;
        this.selectedSupernaturalMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "supernaturalFlaw":
        if(!index)
          var index = Object.keys(this.selectedSupernaturalFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedSupernaturalFlaws[index] = new MeritFlaw(name, pointCost);
        break;
   }
 }

 this.removeMeritFlaw = removeMeritFlaw;
 function removeMeritFlaw(index, category){
   switch(category){
   case "physicalMerit":
      CharCreatorService.changeFreebiePts(this.selectedPhysicalMerits[index].pointCost);
      delete this.selectedPhysicalMerits[index];
      this.meritCount--;
      break;
   case "physicalFlaw":
      if(CharCreatorService.getFreebiePts() < this.selectedPhysicalFlaws[index].pointCost)
        break;
      CharCreatorService.changeFreebiePts(-this.selectedPhysicalFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedPhysicalFlaws[index].pointCost;
      delete this.selectedPhysicalFlaws[index];
      this.flawCount--;
      break;
   case "mentalMerit":
      CharCreatorService.changeFreebiePts(this.selectedMentalMerits[index].pointCost);
      delete this.selectedMentalMerits[index];
      this.meritCount--;
      break;
   case "mentalFlaw":
      if(CharCreatorService.getFreebiePts() < this.selectedMentalFlaws[index].pointCost)
        break;
      CharCreatorService.changeFreebiePts(-this.selectedMentalFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedMentalFlaws[index].pointCost;
      delete this.selectedMentalFlaws[index];
      this.flawCount--;
      break;
   case "socialMerit":
      CharCreatorService.changeFreebiePts(this.selectedSocialMerits[index].pointCost);
      delete this.selectedSocialMerits[index];
      this.meritCount--;
      break;
   case "socialFlaw":
      if(CharCreatorService.getFreebiePts() < this.selectedSocialFlaws[index].pointCost)
        break;
      CharCreatorService.changeFreebiePts(-this.selectedSocialFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedSocialFlaws[index].pointCost;
      delete this.selectedSocialFlaws[index];
      this.flawCount--;
      break;
   case "supernaturalMerit":
      CharCreatorService.changeFreebiePts(this.selectedSupernaturalMerits[index].pointCost);
      delete this.selectedSupernaturalMerits[index];
      this.meritCount--;
      break;
   case "supernaturalFlaw":
      if(CharCreatorService.getFreebiePts() < this.selectedSupernaturalFlaws[index].pointCost)
        break;
      CharCreatorService.changeFreebiePts(-this.selectedSupernaturalFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedSupernaturalFlaws[index].pointCost;
      delete this.selectedSupernaturalFlaws[index];
      this.flawCount--;
      break;
   default:
      break;
    }
 }

 this.createMasterLists = createMasterLists;
 function createMasterLists(){
   this.masterMeritList = [];
   this.masterFlawList = [];
   var meritFlawList = [this.selectedPhysicalMerits, this.selectedPhysicalFlaws,
                        this.selectedMentalMerits, this.selectedMentalFlaws,
                        this.selectedSocialMerits, this.selectedSocialFlaws,
                        this.selectedSupernaturalMerits, this.selectedSupernaturalFlaws];

   for(var i = 0; i < meritFlawList.length; i++){
     for(var j = 0; j < Object.values(meritFlawList[i]).length; j++){
       if(meritFlawList[i][j].name == "")
        continue;
       var meritFlawName = meritFlawList[i][j].name.substr(0, meritFlawList[i][j].name.lastIndexOf(' '));
       var meritFlaw = new MeritFlaw(meritFlawName, meritFlawList[i][j].pointCost);
       if((i%2))
         this.masterFlawList.push(meritFlaw);
        else
         this.masterMeritList.push(meritFlaw);
     }
   }
 }

 this.resetMeritFlaws = resetMeritFlaws;
 function resetMeritFlaws(){

   this.meritCount = 0;
   this.flawCount = 0;
   this.addedFlawPts = 0;

   for(var i = 0; i < this.meritFlawList.length; i++){
     var objLength = Object.keys(this.meritFlawList[i]).length;

     if(objLength > 1){
       for(var j = 1; j <= objLength; j++){
         delete this.meritFlawList[i][j];
       }
     }
     this.meritFlawList[i][0] = new MeritFlaw("", 0);

   }
 }

 this.meritFlawList = [this.selectedPhysicalMerits, this.selectedPhysicalFlaws,
                       this.selectedMentalMerits, this.selectedMentalFlaws,
                       this.selectedSocialMerits, this.selectedSocialFlaws,
                       this.selectedSupernaturalMerits, this.selectedSupernaturalFlaws];

}]);
