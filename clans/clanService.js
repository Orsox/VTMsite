var app = angular.module("site");

app.service("ClanService", function(){

  this.filterClans = filterClans;

  this.clanFilters =
  [
    "Alle", "Die Dreizehn", "Camarilla", "Sabbat", "Die Unabhängigen", "Alle Clans",
    "Alle Blutlinien", "Camarilla (angehörige Clans)", "Sabbat (angehörige Clans)",
    "Dunkles Zeitalter", "Hohe Clans", "Niedere Clans"
  ];

  this.clanList = [{
      id: 0, name: "Ahrimanen",
      filters: ["Alle", "Sabbat", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Tierhaftigkeit", "Stärke", "Spiritus"]
    },
    {
      id: 1, name: "Anda",
      filters: ["Alle", "Die Unabhängigen", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Tierhaftigkeit", "Seelenstärke", "Gestaltwandel"]
    },
    {
      id: 2, name: "Assamiten",
      filters: ["Alle", "Die Dreizehn", "Die Unabhängigen", "Alle Clans",
        "Niedere Clans", "Dunkles Zeitalter"
      ],
      disciplines: ["Geschwindigkeit", "Verdunkelung", "Quietus"]
    },
    {
      id: 3, name: "Baali",
      filters: ["Alle", "Die Unabhängigen", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Daimonion", "Verdunkelung", "Präsenz"]
    },
    {
      id: 4, name: "Blutsbrüder",
      filters: ["Alle", "Sabbat", "Alle Blutlinien"],
      disciplines: ["Seelenstärke", "Stärke", "Sanguinus"]
    },
    {
      id: 5, name: "Brujah",
      filters: ["Alle", "Die Dreizehn", "Camarilla", "Alle Clans",
                "Camarilla (angehörige Clans)", "Hohe Clans", "Dunkles Zeitalter"],
      disciplines: ["Geschwindigkeit", "Stärke", "Präsenz"]
    },
    {
      id: 6, name: "Caitiff",
      filters: ["Alle", "Alle Clans", "Dunkles Zeitalter"],
      disciplines: []
    }, {
      id: 7, name: "Kappadozianer",
      filters: ["Alle", "Alle Clans", "Dunkles Zeitalter", "Hohe Clans"],
      disciplines: ["Auspex", "Seelenstärke", "Nekromantie"]
    },
    {
      id: 8, name: "Kinder des Osiris",
      filters: ["Alle", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Bardo", "2 andere Disziplinen des original Clans"]
    },
    {
      id: 9, name: "Töchter der Kakophonie",
      filters: ["Alle", "Alle Blutlinien"],
      disciplines: ["Seelenstärke", "Melpominee", "Präsenz"]
    },
    {
      id: 10, name: "Jünger des Set",
      filters: ["Alle", "Die Dreizehn", "Die Unabhängigen", "Alle Clans", "Dunkles Zeitalter",
                "Niedere Clans"],
      disciplines: ["Verdunkelung", "Präsenz", "Serpentis"]
    },
    {
      id: 11, name: "Gargylen",
      filters: ["Alle", "Alle Blutlinien"],
      disciplines: ["Fliegen", "Seelenstärke", "Stärke", "Visceratika"]
    },
    {
      id: 12, name: "Gangrel",
      filters: ["Alle", "Die Dreizehn", "Die Unabhängigen", "Alle Clans", "Niedere Clans",
                "Dunkles Zeitalter"],
      disciplines: ["Tierhaftigkeit", "Seelenstärke", "Gestaltwandel"]
    },
    {
      id: 13, name: "Giovanni",
      filters: ["Alle", "Die Dreizehn", "Die Unabhängigen", "Alle Clans", "Dunkles Zeitalter"],
      disciplines: ["Beherrschung", "Nekromantie", "Stärke"]
    },
    {
      id: 14, name: "Sendboten des Todes",
      filters: ["Alle", "Sabbat", "Alle Blutlinien"],
      disciplines: ["Auspex", "Seelenstärke", "Nekromantie"]
    },
    {
      id: 15, name: "Kiasyd",
      filters: ["Alle", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Beherrschung", "Schattenspiele", "Mytherceria"]
    },
    {
      id: 16, name: "Lamien",
      filters: ["Alle", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Seelenstärke", "Nekromantie", "Stärke"]
    },
    {
      id: 17, name: "Lasombra",
      filters: ["Alle", "Die Dreizehn", "Sabbat", "Alle Clans", "Sabbat (angehörige Clans)",
                "Dunkles Zeitalter", "Hohe Clans"],
      disciplines: ["Beherrschung", "Schattenspiele", "Stärke"]
    },
    {
      id: 18, name: "Lhiannan",
      filters: ["Alle", "Die Unabhängigen", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Tierhaftigkeit", "Ogham", "Präsenz"]
    },
    {
      id: 19, name: "Malkavianer",
      filters: ["Alle", "Die Dreizehn", "Camarilla", "Alle Clans",
                "Camarilla (angehörige Clans)", "Dunkles Zeitalter", "Niedere Clans"],
      disciplines: ["Auspex", "Irrsinn", "Verdunkelung"]
    },
    {
      id: 20, name: "Nagaraja",
      filters: ["Alle", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Auspex", "Beherrschung", "Nekromantie"]
    },
    {
      id: 21, name: "Noiaden",
      filters: ["Alle", "Alle Blutlinien", "Dunkles Zeitalter"],
      disciplines: ["Tierhaftigkeit", "Auspex", "Gestaltwandel"]
    },
    {
      id: 22, name: "Nosferatu",
      filters: ["Alle", "Die Dreizehn", "Camarilla", "Alle Clans",
                "Camarilla (angehörige Clans)", "Dunkles Zeitalter", "Niedere Clans"],
      disciplines: ["Tierhaftigkeit", "Verdunkelung", "Stärke"]
    },
    {
      id: 23, name: "Alter Clan Tzimisce",
      filters: ["Alle", "Dunkles Zeitalter, Hohe Clans"],
      disciplines: ["Tierhaftigkeit", "Auspex", "Beherrschung"]
    },
    {
      id: 24, name: "Ravnos",
      filters: ["Alle", "Die Dreizehn", "Die Unabhängigen", "Alle Clans", "Dunkles Zeitalter",
                "Niedere Clans"],
      disciplines: ["Tierhaftigkeit", "Schimären", "Seelenstärke"]
    },
    {
      id: 25, name: "Salubri",
      filters: ["Alle", "Die Unabhängigen", "Alle Clans", "Dunkles Zeitalter"],
      disciplines: ["Auspex", "Seelenstärke", "Obeah", "Valeren"]
    },
    {
      id: 26, name: "Samedi",
      filters: ["Alle", "Alle Blutlinien"],
      disciplines: ["Seelenstärke", "Verdunkelung", "Thanatosis"]
    },
    {
      id: 27, name: "Toreador",
      filters: ["Alle", "Die Dreizehn", "Camarilla", "Alle Clans",
                "Camarilla (angehörige Clans)", "Dunkles Zeitalter", "Hohe Clans"],
      disciplines: ["Auspex", "Geschwindigkeit", "Präsenz"]
    },
    {
      id: 28, name: "Tremere",
      filters: ["Alle", "Die Dreizehn", "Camarilla", "Alle Clans",
                "Camarilla (angehörige Clans)", "Dunkles Zeitalter", "Niedere Clans"],
      disciplines: ["Auspex", "Beherrschung", "Thaumaturgie"]
    },
    {
      filters: ["Alle", "Alle Blutlinien", "Die Unabhängigen", "Dunkles Zeitalter"],
      disciplines: ["Stärke", "Präsenz", "Temporis"]
    },
    {
      id: 30, name: "Tzimisce",
      filters: ["Alle", "Die Dreizehn", "Sabbat", "Alle Clans", "Sabbat (angehörige Clans)",
                "Dunkles Zeitalter", "Hohe Clans"],
      disciplines: ["Tierhaftigkeit", "Auspex", "Fleischformen"]
    },
    {
      id: 31, name: "Ventrue",
      filters: ["Alle", "Die Dreizehn", "Camarilla", "Alle Clans",
                "Camarilla (angehörige Clans)", "Dunkles Zeitalter", "Hohe Clans"],
      disciplines: ["Beherrschung", "Seelenstärke", "Präsenz"]
    }
  ];

  this.filteredClanList = this.clanList;
  this.selectedClan = this.filteredClanList[0];
  this.selectedClanFilter = this.clanFilters[0];

  function filterClans(filter) {
    this.filteredClanList = [];
    if (filter === 'All') {
      this.filteredClanList = this.clanList;
      return this.filteredClanList;
    }
    for(var i = 0; i<this.clanList.length; i++){
      if(this.clanList[i].filters.includes(filter)){
        this.filteredClanList.push(this.clanList[i]);
      }
    }
    return this.filteredClanList;
  };

});
