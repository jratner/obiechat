define(['oc', 'backbone'], function(oc, Backbone) {
    oc.Controllers.ocController = Backbone.Router.extend({
        routes: {
            "": "defaultRoute"
        },

        defaultRoute: function() {
//            require(['views/topicListView'], function(TopicListView) {
  //              oc.Views.setContentView(TopicListView);
    //            oc.Views.contentView.render();
      //      });
        }
    });
    return oc.Controllers.ocController;
});
