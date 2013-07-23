define(['oc', 'jquery', 'backbone', 'hbs!templates/main', 'collections/topicCollection', 'views/topicListView', 'models/userModel', 'views/userAccountView'],
function(oc, $, Backbone, template, TopicCollection, TopicListView, UserModel, UserAccountView) {
    oc.Views.mainView = Backbone.View.extend({
        el: $('#main'),
        events: {
        },
        
        initialize: function(options) {
            this.topicList = new TopicCollection();
            this.topicList.getMainTopics();
            this.topicListView = new TopicListView({collection: this.topicList});
            this.userAccountView = new UserAccountView({model: oc.currentUser});
        },

        render: function() {
            $(this.el).html(template({info: "poop"}));
            this.userAccountView.el = $('.userAccountHolder');
            this.userAccountView.render();
            this.topicListView.el = $('.topicListHolder');
            this.topicListView.render();
        }
    });
    return oc.Views.mainView;
});
