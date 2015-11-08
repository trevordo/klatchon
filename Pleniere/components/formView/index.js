'use strict';

app.formView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_formView
// END_CUSTOM_CODE_formView
(function(parent) {
    var formViewModel = kendo.observable({
        fields: {
            date: '',
            username1: '',
            username: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('formViewModel', formViewModel);
})(app.formView);

// START_CUSTOM_CODE_formViewModel
// END_CUSTOM_CODE_formViewModel