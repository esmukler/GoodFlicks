GoodFlicks.Collections.Libraries = Backbone.Collection.extend({
  url: "/api/libraries",

  comparator: "order",

  model: GoodFlicks.Models.Library,

  getOrFetch: function(id) {
    var library = this.get(id);

    if (!library) {
      var library = new GoodFlicks.Models.Library({ id : id });
      library.fetch({
        success: function() {
          this.add(library);
        }.bind(this)
      });
    } else {
      library.fetch();
    }
    return library;
  }
})
