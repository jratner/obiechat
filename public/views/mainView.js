define(['oc', 'jquery', 'backbone', 'hbs!templates/main', 'collections/topicCollection', 'views/topicListView', 'models/userModel', 'views/userAccountView'],
function(oc, $, Backbone, template, TopicCollection, TopicListView, UserModel, UserAccountView) {
    oc.Views.mainView = Backbone.View.extend({
        el: $('#main'),
        events: {
        },
        
        initialize: function(options) {
            this.topicList = new TopicCollection();
            this.topicList.getMainTopics();
        },

        render: function() {
            $(this.el).html(template({info: "poop"}));
            this.userAccountView = new UserAccountView({model: oc.currentUser, el: $('.userAccountHolder')});
            this.userAccountView.render();
            oc.Views.contentView = this.topicListView = new TopicListView({collection: this.topicList, el: $('#content')});
            this.topicListView.render();
        }
    });
    return oc.Views.mainView;
});
