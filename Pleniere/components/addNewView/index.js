'use strict';

app.addNewView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_addNewView
// END_CUSTOM_CODE_addNewView
(function(parent) {
    var addNewViewModel = kendo.observable({
        fields: {
            username: '',
            speakername: '',
            title: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('addNewViewModel', addNewViewModel);
})(app.addNewView);

// START_CUSTOM_CODE_addNewViewModel
// END_CUSTOM_CODE_addNewViewModel