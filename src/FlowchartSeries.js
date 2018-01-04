define (function (require) {

    var echarts = require('echarts');
    var createGraphFromNodeEdge = echarts.helper.createGraph;

    echarts.extendSeriesModel({

        type: 'series.flowchart',

        layoutInfo: null,

        /**
         * Init a graph data structure from data in option series
         *
         * @param  {Object} option  the object used to config echarts view
         * @return {module:echarts/data/List} storage initial data
         */
        getInitialData: function(option, ecModel) {
            var data = option.data;
            var nodes = data.node.concat(data.input, data.output) || [];
            var edges = data.edge || [];
            if (nodes && edges) {
                var graph = createGraphFromNodeEdge(nodes, edges, this, true);
                return graph.data;
            }
            // var name = data.name;
            // return {
            //     name: name,
            //     nodes: nodes,
            //     edges: edges
            // };
        },

        getGraph: function () {
            return this.getData().graph;
        },

        getEdgeData: function () {
            return this.getGraph().edgeData;
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
});
