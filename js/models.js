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
      t = renderTemplate('time_results', { time_results: this.options.time_results } );
      $("#results_times").html(t).trigger("create");
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
      t = renderTemplate('notifications', { notifications: this.options.notifications } );
      $("#notifications_holder").html(t).trigger("create");
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
      t = renderTemplate('activities', { activities: this.options.activities } );
      $("#activities_holder").html(t).trigger("create");
    }
  });

  CoursesView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      t = renderTemplate('courses', { courses: this.options.courses } );
      $("#courses_holder").html(t).trigger("create");
    }
  });

  CourseView = Backbone.View.extend(
  {
    initialize: function(options)
    {
      this.render();
    },
    render: function()
    {
      t = renderTemplate('course', { course: this.options.course } );
      $("#course_holder").html(t).trigger("create");
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
      t = renderTemplate('time', { course: this.options.course } );
      $("#tee_holder").html(t).trigger("create");
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
      t = renderTemplate('tee_times', { tee_times: this.options.tee_times } );
      $("#tee-times_holder").html(t).trigger("create");
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
      t = renderTemplate('payment', { user: this.options.user, slot: this.options.slot } );
      $("#payment_holder").html(t).trigger("create");
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
      t = renderTemplate('profile', { user: this.options.user });
      $("#profile_holder").html(t).trigger("create");
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
      for (var i=0; i < selections.length; i++) {
        key = selections[i];
        if (typeof this.options.user.attributes[key] != "undefined")
          window[key] = this.options.user.attributes[key]
        else if (typeof this.options.user.attributes.profile[key])
          window[key] = this.options.user.attributes.profile[key]
        else
          window[key] = this.options.user.get("profile")[key];
      }

      t = renderTemplate('profile_editor', { user: this.options.user });

      $("#profile-editor_holder").html(t).find("select").each( function()
      {
        longId  = $(this).attr("id");
        shortId = longId.split("_")[1];
        id      = shortId.replace("-", "_");   
        $(this).val(window[id]);
      });
      $("#profile-editor_holder").trigger('create');
    }
  });
});
