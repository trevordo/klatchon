/**
 * profile view model
 */
'use strict'

app.profileView = (function () {

    var profileModel = kendo.observable({
        firstname: "",
        lastname: "",
        Displayname: "",

    });

    var details = {
        onShow: function (e) {
            
            var everliveApiKey = "koWUnpcxRvIqHF7T";
				var everliveScheme = 'https';

            var el = new Everlive({
					apiKey: everliveApiKey,
					scheme: everliveScheme
				});
            
            el.Users.currentUser()
                .then(function (data) {
                        alert(JSON.stringify(data));
                    },
                    function (error) {
                        alert(JSON.stringify(error));
                    });

            var dataProvider,
                typeName,
                userId,
                vm;


            dataProvider = app.data.defaultProvider;
            typeName = "Users";
            userId =  "";
                
            dataProvider.data(typeName).getById(userId, function (data) {
                var resultItem = data.result;
                profileModel.set("firstname", resultItem.firstname);
                profileModel.set("lastname", resultItem.lastname);
                profileModel.set("DisplayName", resultItem.DisplayName);
               
            }, function (err) {
                alert("There was an error" + err.message);
            });

        }

    };

    return {
        profileModel: profileModel,
        details: details
    };
})();

// START_CUSTOM_CODE_profileView


// END_CUSTOM_CODE_profileView