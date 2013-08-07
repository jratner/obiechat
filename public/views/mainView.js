define(['oc', 'jquery', 'backbone', 'hbs!templates/main', 'collections/topicCollection', 'views/topicListView', 'views/notificationCenterView', 'models/userModel', 'views/headerView'],
function(oc, $, Backbone, template, TopicCollection, TopicListView, NotificationCenterView, UserModel, HeaderView) {
    oc.Views.mainView = Backbone.View.extend({
        el: $('#main'),
        events: {
        },
        
        initialize: function(options) {
            this.topicList = new TopicCollection();
            this.topicList.getMainTopics();
        },

        render: function() {
            $(this.el).html(template());
            this.headerView = new HeaderView({model: oc.currentUser, el: $('.pageHeader')});
            this.headerView.render();
            this.notificationCenterView = new NotificationCenterView({el: $('#notificationCenter')});
            this.notificationCenterView.render();
            this.topicListView = new TopicListView({collection: this.topicList, el: $('#content')});
            this.topicListView.render();
        }
    });
    return oc.Views.mainView;
});
