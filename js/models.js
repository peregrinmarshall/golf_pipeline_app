$(document).ready( function()
{
  // Models
  Course = Backbone.Model.extend(
  {
    initialize: function()
    {
      console.log("Course is created.");
    }
  });

  TeeTime = Backbone.Model.extend(
  {
    initialize: function()
    {
      console.log("TeeTime is created.");
    }
  });

  TimeResult = Backbone.Model.extend(
  {
    initialize: function()
    {
      console.log("TimeResult is created.");
    }
  });

  Notification = Backbone.Model.extend(
  {
    initialize: function()
    {
      console.log("Notification is created.");
    }
  });

  Activity = Backbone.Model.extend(
  {
    initialize: function()
    {
      console.log("Activity is created.");
    }
  });

  User = Backbone.Model.extend(
  {
    initialize: function()
    {
      window.localStorage.setItem("token", this.get("authentication_token"));
      $(".h_first_name").html(this.get("first_name"));
      $(".h_last_name").html(this.get("last_name"));
      $(".v_first_name").val(this.get("first_name"));
      $(".v_last_name").val(this.get("last_name"));

      this.on("change:first_name change:last_name", function()
      {
        $(".h_first_name").html(this.get("first_name"));
        $(".h_last_name").html(this.get("last_name"));
        $(".v_first_name").val(this.get("first_name"));
        $(".v_last_name").val(this.get("last_name"));
      });
    }
  });


  // Collections
  Courses = Backbone.Collection.extend(
  {
    model: Course
  });

  TeeTimes = Backbone.Collection.extend(
  {
    model: TeeTime
  });

  TimeResults = Backbone.Collection.extend(
  {
    model: TimeResult
  });

  Notifications = Backbone.Collection.extend(
  {
    model: Notification
  });

  Activities = Backbone.Collection.extend(
  {
    model: Activity
  });

  // Views
  TimeResultsView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#time-results_template").html(), { time_results: this.options.time_results } );
      this.$el.html( template );
    }
  });

  NotificationsView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#notifications_template").html(), { notifications: this.options.notifications } );
      this.$el.html( template );
    }
  });

  ActivitiesView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#activities_template").html(), { activities: this.options.activities } );
      this.$el.html( template );
    }
  });

  TimeView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#time_template").html(), { course: this.options.course } );
      this.$el.html( template );
    }
  });

  TeeTimesView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#tee-times_template").html(), { tee_times: this.options.tee_times } );
      this.$el.html( template );
    }
  });

  PaymentView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#payment_template").html(), { user: this.options.user, slot: this.options.slot } );
      this.$el.html( template );
    }
  });

  ProfileView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#profile_template").html(), { user: this.options.user } );
      this.$el.html( template ).trigger('create');
    }
  });

  ProfileEditorView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      var template = _.template( $("#profile-editor_template").html(), { user: this.options.user } );
      this.$el.html( template ).trigger('create');
    }
  });
});
