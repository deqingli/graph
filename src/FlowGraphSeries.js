var echarts = require('echarts/lib/echarts');

echarts.extendSeriesModel({
    type: 'series.flowGraph',

    getInitialData: function(option, ecModel) {
        var data = option.data;
        var nodes = data.node.concat(data.input, data.output) || [];
        var edges = data.edge || [];
        return {
            nodes: nodes,
            edges: edges
        };
    },
    
    defaultOption: {
        rankDir: "LR"  
    }
});