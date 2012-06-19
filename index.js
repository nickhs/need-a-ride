$(function() {

    var Person = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "not a person...",
                order: Ride.nextOrder(),
            };
        },

        initialize: function() {
            if (!this.get("title")) {
                this.set({"title": this.defaults.title});
            }
        },

        clear: function() {
            // this.destroy();
        }
    });

    var RideList = Backbone.Collection.extend({

        model: Person,

        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order')+1;
        },

        comparator: function(person) {
            return person.get('order');
        }
    });

    var Ride = new RideList;

    var RideView = Backbone.View.extend({

        tagName: "li",

        events: {
            "dblclick .view": "destroy"
        },

        initialize: function() {
            this.model.bind('destroy', this.remove, this);
        },

        clear: function() {
            this.model.clear();
        }

    });

    var AppView = Backbone.View.extend({

        el: $("#rideapp"),

        events: {
            "keypress #new-person": "createOnEnter"
        },

        initialize: function() {
            this.input = this.$("#new-person");
            Ride.bind('add', this.addOne, this)


            this.main = $("#main");
        },

        addOne: function(person) {
            var view = new RideView({model: person})
            this.$("#person-list").append(view.render().el);
        },

        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            Ride.create({title: this.input.val()});
            this.input.val('');
        },

    });

    var App = new AppView;

});
