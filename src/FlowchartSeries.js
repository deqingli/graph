
var echarts = require('echarts/lib/echarts');

echarts.extendSeriesModel({

    type: 'series.flowchart',

    layoutInfo: null,

    getInitialData: function(option, ecModel) {
        var data = option.data;
        var nodes = data.node.concat(data.input, data.output) || [];
        var edges = data.edge || [];
        var name = data.name;
        return {
            name: name,
            nodes: nodes,
            edges: edges
        };
    },
    
    defaultOption: {
        zlevel: 0,
        z: 2,

        left: '10%',
        top: '10%',
        rigth: '10%',
        bottom: '10%',

        // direction for rank nodes.
        rankDir: 'LR'  
    }

});