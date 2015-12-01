'use strict';

var seminarDataSource;
app.formView = kendo.observable({
    onInit: function () {
        var apiKey = "0rQT7uWDoVJhqkCD";
        var el = new Everlive(apiKey);

        seminarDataSource = new kendo.data.DataSource({
            type: "everlive",
            transport: {
                typeName: "SeminarList"
            }
        });
    },
    onShow: function () {},
    afterShow: function () {},
    submit: function () {
        var model = this.formViewModel.fields;
       if (!model.validateData(model)) {
                    return false;
                }
        
        

        seminarDataSource.add({
            title: model.title,
            speakername: model.speakername,
            startdate: model.startdate,
            enddate: model.enddate,
            hostname: model.hostname,
            building: model.building,
            room: model.room

        });
        seminarDataSource.one("sync", this.cancel);
        seminarDataSource.bind("error", function (err) {
            var code = err.xhr.code;
            if (code === 100023){
               window.plugins.toast.showShortCenter("Seminar already exist");
               
            } else {
               window.plugins.toast.showShortCenter("Seminar Successfully added");
               
            }
        });
        
		this.set("formViewModel.fields", {});        
        seminarDataSource.sync();
       
    },

    error: function (err) {
        alert(err.xhr.message);
        alert(err.xhr.code);
    },

    cancel: function () {
        this.set("formViewModel.fields", {});
       
    },
});

// START_CUSTOM_CODE_formView
// END_CUSTOM_CODE_formView
(function (parent) {
    var formViewModel = kendo.observable({
        fields: {
            room: '',
            building: '',
            hostname: '',
            enddate: '',
            startdate: '',
            speakername: '',
            title: '',
            validateData: function (data) {
                if (!data.title) {
                    window.plugins.toast.showShortCenter("Missing title");
                    return false;
                }
                if (!data.speakername) {
                    window.plugins.toast.showShortCenter("Missing speaker");
                    return false;
                }
                if (!data.startdate) {
                    data.plugins.toast.showShortCenter("Missing start date");
                    return false;
                }
                if (!data.enddate) {
                    window.plugins.toast.showShortCenter("Missing end date");
                    return false;
                }
                if (!data.hostname) {
                    window.plugins.toast.showShortCenter("Missing host");
                    return false;
                }
                if (!data.building) {
                    window.plugins.toast.showShortCenter("Missing building");
                    return false;
                }
                if (!data.room) {
                    window.plugins.toast.showShortCenter("Missing room");
                    return false;
                }


                return true;

            },

        }
    });


    parent.set('formViewModel', formViewModel);
})(app.formView);

// START_CUSTOM_CODE_formViewModel
// END_CUSTOM_CODE_formViewModel