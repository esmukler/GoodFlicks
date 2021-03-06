GoodFlicks.Views.LibButton = Backbone.View.extend({
  template: JST['lib_button'],

  className: "lib-button",

  tagName: "li",

  events: {
    "click p": "goToLibrary",
    "click button.add" : "addToLibrary",
    "click button.remove" : "removeFromLibrary"
  },

  initialize: function(options) {
    this.movie = options.movie;
    this.listenTo(this.model, "sync add remove", this.render)
    this.listenTo(this.movie.libraries(), "sync change:added", this.render)
  },

  goToLibrary: function(event) {
    event.preventDefault();
    var libId = this.$('button').data("lib-id")
    Backbone.history.navigate("#/libraries/" + libId, {trigger: true});
  },

  renderButton: function() {
    if (this.model.get("added")) {
      this.$('button').addClass("remove");
      this.$('button').text("Remove from Library");

    } else {
      this.$('button').addClass("add");
      this.$('button').text("Add to Library");
    }
  },

  addToLibrary: function(event) {
    event.preventDefault();
    var libId = $(event.currentTarget).data("lib-id")
    this.movie.toggleFromLibrary(libId)
  },

  removeFromLibrary: function(event) {
    event.preventDefault();
    var libId = $(event.currentTarget).data("lib-id")
    this.movie.toggleFromLibrary(libId)
  },

  render: function() {
    var content = this.template({
      library: this.model
    })

    this.$el.html(content);
    this.renderButton();

    return this;
  }



})
