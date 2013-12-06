Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        Ext.create('Rally.data.lookback.SnapshotStore', {
                fetch    : ['Name','_UnformattedID','c_CustomDropDown','_TypeHierarchy'],
                filters  : [{
                    property : '__At',
                    value    : 'current'
                },
                {
                    property : '_TypeHierarchy',
                    operator: 'in',
                    value    : ['HierarchicalRequirement','Defect']
                },
               {
                    property : '_ProjectHierarchy',
                    value    :   14020168984 //P //14020264660 //P1
                },
                {
                property : 'c_CustomDropDown',
                operator : 'exists',
                value : true
                }
                ],
                hydrate:['_TypeHierarchy'],
                listeners: {
                    load: this._onDataLoaded,
                    scope: this
                }
                }).load({
                    params : {
                        compress : true,
                        removeUnauthorizedSnapshots : true
                    }
                });          
    },
     _onDataLoaded: function(store, data){
                console.log('count',store.getCount());
                console.log('data',data);
                
                var records = [];
                    Ext.Array.each(data, function(record) {
                        records.push({
                            Name: record.get('Name'),
                            ID: record.get('_UnformattedID'),
                            CustomDropDown: record.get('c_CustomDropDown'),
                            Type: _.last(record.get('_TypeHierarchy')),
                        });
                    });
            
                    this.add({
                        xtype: 'rallygrid',
                        itemId: 'grid',
                        store: Ext.create('Rally.data.custom.Store', {
                            data: records,
                            pageSize: 5
                        }),
                        columnCfgs: [
                            {
                                text: 'ID', dataIndex: 'ID'
                            },
                            {
                                text: 'Name', dataIndex: 'Name'
                            },
                            {
                                text: 'Custom DropDown', dataIndex: 'CustomDropDown'
                            },
                            {
                                text: 'Work Item Type', dataIndex: 'Type', flex: 1
                            }
                        ]
                    });
     }
});