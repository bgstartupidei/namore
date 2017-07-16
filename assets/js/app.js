var app = (function(firebase, Backbone){
  var $ = Backbone.$;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCpYfVRKTtXnOr54rF80uvbpuvo9AoBbqc",
    authDomain: "writtn.firebaseapp.com",
    databaseURL: "https://writtn.firebaseio.com",
    projectId: "writtn",
    storageBucket: "",
    messagingSenderId: "185715436769"
  };

  var beaches = [
    {
      "name": "плаж Дуранкулак",
      "lat": 43.6773,
      "lon": 28.5634
    }, {
      "name": "къмпинг Карвуна",
      "lat": 43.6478,
      "lon": 28.571
    }, {
      "name": "къмпинг Добруджа / Шабленския плаж",
      "lat": 43.5738,
      "lon": 28.5823
    }, {
      "name": "Балчик - централен плаж",
      "lat": 43.4037,
      "lon": 28.17
    }, {
      "name": "Албена",
      "lat": 43.3661,
      "lon": 28.0833
    }, {
      "name": "Нудистки плаж - резерват Балтата",
      "lat": 43.3498,
      "lon": 28.0742
    }, {
      "name": "Кранево - Централен плаж (Ванила Бийч)",
      "lat": 43.3415,
      "lon": 28.0702
    }, {
      "name": "Златни пясъци - Панорамен плаж",
      "lat": 43.3067,
      "lon": 28.0546
    }, {
      "name": "Златни пясъци - Централен плаж",
      "lat": 43.2837,
      "lon": 28.0449
    }, {
      "name": "кк.Чайка - плаж Кабакум",
      "lat": 43.2569,
      "lon": 28.0314
    }, {
      "name": "плаж Слънчев Ден (Кокодива)",
      "lat": 43.2435,
      "lon": 28.0193
    }, {
      "name": "плаж Сахара",
      "lat": 43.2364,
      "lon": 28.0156
    }, {
      "name": "плаж на Гранд Хотел Варна",
      "lat": 43.2262,
      "lon": 28.0134
    }, {
      "name": "плаж Летовище - Евксиноград",
      "lat": 43.2233,
      "lon": 28.0084
    }, {
      "name": "плаж на залива Св. Яни - Евксиноград",
      "lat": 43.2212,
      "lon": 28.0034
    }, {
      "name": "плаж Траката - Евксиноград",
      "lat": 43.2196,
      "lon": 27.9862
    }, {
      "name": "Варна - плаж Почивка",
      "lat": 43.2129,
      "lon": 27.9592
    }, {
      "name": "Варна - плаж Трета буна",
      "lat": 43.2107,
      "lon": 27.9501
    }, {
      "name": "Варна - плаж Рапонги (Буните)",
      "lat": 43.2096,
      "lon": 27.941
    }, {
      "name": "Варна - Офицерски плаж",
      "lat": 43.2089,
      "lon": 27.9387
    }, {
      "name": "Варна - Централен плаж",
      "lat": 43.2035,
      "lon": 27.9254
    }, {
      "name": "Варна - Южен плаж",
      "lat": 43.1984,
      "lon": 27.922
    }, {
      "name": "Варна - плаж Аспарухово",
      "lat": 43.1777,
      "lon": 27.9122
    }, {
      "name": "плаж Галата",
      "lat": 43.1571,
      "lon": 27.9438
    }, {
      "name": "плаж Фичоза",
      "lat": 43.1433,
      "lon": 27.9402
    }, {
      "name": "плаж Черноморец (м-ст Ракитника)",
      "lat": 43.1201,
      "lon": 27.9287
    }, {
      "name": "плаж Паша дере",
      "lat": 43.1082,
      "lon": 27.9239
    }, {
      "name": "плаж Камчия",
      "lat": 43.0296,
      "lon": 27.8876
    }, {
      "name": "Камчийски пясъци",
      "lat": 43.0061,
      "lon": 27.889
    }, {
      "name": "плаж Шкорпиловци",
      "lat": 42.9607,
      "lon": 27.8972
    }, {
      "name": "плаж Кара дере",
      "lat": 42.9136,
      "lon": 27.8961
    }, {
      "name": "плаж Бяла",
      "lat": 42.8725,
      "lon": 27.8976
    }, {
      "name": "плаж Обзор",
      "lat": 42.8249,
      "lon": 27.8835
    }, {
      "name": "плажна ивица Иракли",
      "lat": 42.7476,
      "lon": 27.8895
    }, {
      "name": "плажна ивица Елените",
      "lat": 42.7029,
      "lon": 27.8127
    }, {
      "name": "Несебърски залив - Слънчев бряг",
      "lat": 42.7041,
      "lon": 27.7224
    }, {
      "name": "Несебърски залив - Какаов плаж",
      "lat": 42.6708,
      "lon": 27.7121
    }, {
      "name": "плажна ивица Равда",
      "lat": 42.6432,
      "lon": 27.6825
    }, {
      "name": "Градски плаж на Поморие",
      "lat": 42.5571,
      "lon": 27.648
    }, {
      "name": "плаж Сарафово",
      "lat": 42.5579,
      "lon": 27.5248
    }, {
      "name": "Бургас - плаж Солниците",
      "lat": 42.5123,
      "lon": 27.4849
    }, {
      "name": "Бургас - Северен плаж",
      "lat": 42.499,
      "lon": 27.4837
    }, {
      "name": "Бургас - Централен (Южен) плаж",
      "lat": 42.4916,
      "lon": 27.482
    }, {
      "name": "Крайморие",
      "lat": 42.4454,
      "lon": 27.4923
    }, {
      "name": "плаж Вромос",
      "lat": 42.4465,
      "lon": 27.603
    }, {
      "name": "Черноморец - Централен плаж",
      "lat": 42.4487,
      "lon": 27.6352
    }, {
      "name": "Черноморец - Нудистки плаж",
      "lat": 42.4384,
      "lon": 27.6468
    }, {
      "name": "къмпинг Градина",
      "lat": 42.4204,
      "lon": 27.6462
    }, {
      "name": "къмпинг Златна рибка",
      "lat": 42.4087,
      "lon": 27.6722
    }, {
      "name": "Созопол - Северен плаж",
      "lat": 42.4202,
      "lon": 27.6946
    }, {
      "name": "Созопол - плаж Харманите",
      "lat": 42.4128,
      "lon": 27.7009
    }, {
      "name": "Созопол - Райски залив",
      "lat": 42.4065,
      "lon": 27.7123
    }, {
      "name": "Созопол - Германката",
      "lat": 42.4058,
      "lon": 27.7271
    }, {
      "name": "къмпинг Каваците",
      "lat": 42.3959,
      "lon": 27.7066
    }, {
      "name": "къмпинг Смокиня",
      "lat": 42.3889,
      "lon": 27.7065
    }, {
      "name": "къмпинг Веселие",
      "lat": 42.3851,
      "lon": 27.7076
    }, {
      "name": "Дюни (м-ст Алепу)",
      "lat": 42.368,
      "lon": 27.7089
    }, {
      "name": "Аркутино",
      "lat": 42.3312,
      "lon": 27.733
    }, {
      "name": "плаж Ропотамо",
      "lat": 42.3259,
      "lon": 27.7525
    }, {
      "name": "Приморско - Северен плаж",
      "lat": 42.2804,
      "lon": 27.7529
    }, {
      "name": "ММЦ Приморско",
      "lat": 42.2551,
      "lon": 27.7504
    }, {
      "name": "Китен - Северен плаж",
      "lat": 42.2402,
      "lon": 27.7698
    }, {
      "name": "Китен - Южен плаж",
      "lat": 42.2311,
      "lon": 27.776
    }, {
      "name": "къмпинг Юг",
      "lat": 42.2194,
      "lon": 27.7866
    }, {
      "name": "къмпинг Корал",
      "lat": 42.2152,
      "lon": 27.7922
    }, {
      "name": "ММЦ Лозенец",
      "lat": 42.2124,
      "lon": 27.8037
    }, {
      "name": "плаж Оазис",
      "lat": 42.2011,
      "lon": 27.818
    }, {
      "name": "плаж Арапя",
      "lat": 42.1881,
      "lon": 27.8366
    }, {
      "name": "Царево - Попски плаж",
      "lat": 42.1787,
      "lon": 27.8459
    }, {
      "name": "Царево - Централен плаж",
      "lat": 42.1734,
      "lon": 27.8503
    }, {
      "name": "къмпинг Нестинарка",
      "lat": 42.1574,
      "lon": 27.8666
    }, {
      "name": "Ахтопол",
      "lat": 42.1024,
      "lon": 27.9253
    }, {
      "name": "плаж Велека",
      "lat": 42.0669,
      "lon": 27.9719
    }, {
      "name": "плаж Бутамята - Синеморец",
      "lat": 42.0546,
      "lon": 27.986
    }, {
      "name": "плаж Липите",
      "lat": 42.0469,
      "lon": 27.9912
    }, {
      "name": "плаж Листи",
      "lat": 42.0339,
      "lon": 28.0042
    }, {
      "name": "плаж Силистар",
      "lat": 42.0221,
      "lon": 28.0096
    }, {
      "name": "Равда - Южен плаж",
      "lat": 42.6379,
      "lon": 27.6737
    }, {
      "name": "плаж Болата",
      "lat": 43.3825,
      "lon": 28.4699
    }
  ];


  var Beach = Backbone.Model;

  var BeachCollection = Backbone.Collection.extend({
    model: Beach,
  })



  var SearchList = Backbone.View.extend({
    template: _.template($('#search-list-template').html()),

    initialize: function() {
      this.listenTo(this.collection, 'reset', render())
    },

  })

  var SearchView = Backbone.View.extend({

    template: _.template($('#search-template').html()),

    initialize: function() {
      this.render()
    },

    render: function() {
      this.$el.html(this.template({
        beaches: this.collection.toJSON()
      }));
    }
  });

  var AppView = Backbone.View.extend({

    template: _.template('<div id="main"></div'),
    state: 'search',

    searchTemplate: _.template($('#search-template').html()),

    initialize: function() {
      this.beachCollection = new BeachCollection(beaches);
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.mainArea = this.$('#main');
      if (this.state == 'search') {
        this.mainArea.html(new SearchView({
          collection: this.beachCollection
        }).el);
      }
      return this;
    }
  });


  function run() {
    firebase.initializeApp(config);
    $('#app').html(new AppView().el)
  }
  return {
    'run': run
  }
})(firebase, Backbone);

$(document).ready(function() {
  app.run();
})