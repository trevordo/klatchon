'use strict';

app.pleniereListView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_pleniereListView
// END_CUSTOM_CODE_pleniereListView
(function(parent) {
    var dataProvider = app.data.defaultProvider,
        flattenLocationProperties = function(dataItem) {
            var propName, propValue,
                isLocation = function(value) {
                    return propValue && typeof propValue === 'object' &&
                        propValue.longitude && propValue.latitude;
                };

            for (propName in dataItem) {
                if (dataItem.hasOwnProperty(propName)) {
                    propValue = dataItem[propName];
                    if (isLocation(propValue)) {
                        dataItem[propName] =
                            kendo.format('Latitude: {0}, Longitude: {1}',
                                propValue.latitude, propValue.longitude);
                    }
                }
            }
        },
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'SeminarList',
                dataProvider: dataProvider
            },

            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    flattenLocationProperties(dataItem);
                }
            },
            schema: {
                model: {
                    fields: {
                        'title': {
                            field: 'title',
                            defaultValue: ''
                        },
                        'speakername': {
                            field: 'speakername',
                            defaultValue: ''
                        },
                    }
                }
            },
            serverFiltering: true,
            filter: { field: 'startdate', operator: 'gte', value: new Date() },
            //filter: { field: 'interestsid', operator: 'contains', value: 'Pharmacy' },
            serverSorting: true,
            sort: { field: 'startdate', dir: 'asc' },
            serverPaging: true,
            pageSize: 50
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        pleniereListViewModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/pleniereListView/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = pleniereListViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                if (!itemModel.title) {
                    itemModel.title = String.fromCharCode(160);
                }
                pleniereListViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('pleniereListViewModel', pleniereListViewModel);
})(app.pleniereListView);

// START_CUSTOM_CODE_pleniereListViewModel
// END_CUSTOM_CODE_pleniereListViewModel