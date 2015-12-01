/**
 * profile view model
 */


app.profileView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

var app = app || {};

app.profile = (function () {
    'use strict'
		var profileViewModel = (function () {
        
        var profileModel = {
            fields: {
                firstname: {
                    field: 'firstname',
                    defaultValue: null
                },
                lastname: {
                    field: 'lastname',
                    defaultValue: null
                },
                DisplayName: {
                    field: 'DisplayName',
                    defaultValue: null
                },
                UserId: {
                    field: 'UserId',
                    defaultValue: null
                }
            },
            
        };

        var DataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Users'
            },
            schema: {
                model: profileModel
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                } : {
                    DisplayName: 'Anonymous',
                };
            }
        };
        
        return {
            Users: DataSourceOptions
        };
            
        var DataSource = new kendo.data.DataSource(DataSourceOptions),
        profileDetailsModel = kendo.observable({
            dataSource: DataSource,
            detailsShow: function(e) {
                var userUId = this.get('user'),
                    dataSource = profileDetailsModel.get('dataSource'),
                    userModel = dataSource.getByUid(userUId);
               
                profileDetailsModel.set('currentItem', userModel);
            },
            currentItem: null
        });
      
        
    }());
    
    return profileViewModel;

}());



// START_CUSTOM_CODE_profileView


// END_CUSTOM_CODE_profileView