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

  var Beach = Backbone.Model.extend({
    idAttribute: 'id'
  });

  var BeachCollection = Backbone.Collection.extend({

    model: Beach,
    url: 'beaches',

    fetch: function() {
      var ref = database.ref(this.url);
      ref.on('value', (snapshot) => {
        snapshot.val().forEach((data, id) => {
          this.add(data);
        });
        this.trigger('sync');
      }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      });
    },

    searchModelsName: function (query) {
      if (!query) {
        return this.models;
      }
      return this.filter((model) => {
        return model.get('name').toLowerCase().indexOf(query) > -1;
      });
    }
  })

  var SearchListView = Backbone.View.extend({
    template: _.template($('#search-list-template').html()),

    initialize: function() {
      this.listenTo(this.collection, 'reset', this.render);
      this.render();
    },

    render: function() {
      this.$el.html(this.template({
        beaches: this.collection.toJSON()
      }));
      return this;
    }

  })

  var SearchView = Backbone.View.extend({

    template: _.template($('#search-template').html()),
    events: {
      'keyup .search': 'updateList'
    },

    initialize: function() {
      this.filteredCollection = new BeachCollection();
      this.listenTo(this.collection, 'sync', this.initList);
      this.render()
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.find('.list').html(new SearchListView({
        collection: this.filteredCollection
      }).el);
    },

    initList: function() {
      this.filteredCollection.reset(this.collection.searchModelsName(''))
    },

    updateList: function(event) {
      var query = event.target.value.toLowerCase();
      this.filteredCollection.reset(this.collection.searchModelsName(query));
    }
  });

  var AppView = Backbone.View.extend({

    template: _.template('<div id="main"></div'),
    state: 'search',

    searchTemplate: _.template($('#search-template').html()),

    initialize: function() {
      this.beachCollection = new BeachCollection();
      this.render();
      this.beachCollection.fetch();
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
    database = firebase.database();
    $('#app').html(new AppView().el)
  }

  return {
    'run': run
  }

})(firebase, Backbone);

$(document).ready(function() {
  app.run();
})
