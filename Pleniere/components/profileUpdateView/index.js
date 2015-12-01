'use strict';

app.profileUpdateView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_profileUpdateView
// END_CUSTOM_CODE_profileUpdateView
(function(parent) {
    var profileUpdateViewModel = kendo.observable({
        fields: {},
        submit: function() {},
        cancel: function() {}
    });

    parent.set('profileUpdateViewModel', profileUpdateViewModel);
})(app.profileUpdateView);

// START_CUSTOM_CODE_profileUpdateViewModel
// END_CUSTOM_CODE_profileUpdateViewModel