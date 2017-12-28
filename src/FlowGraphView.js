
var echarts = require('echarts/src/echarts');
var dagre = reuire('dagre');
var zrUtil = require('zrender/src/core/util');
var layoutUtil = require('echarts/src/util/layout');
var graphic = require('echarts/src/util/graphic');

echarts.extendChartView({
    
    type: 'flowgraph',

    render: function (seriesModel, ecModel, api) {

        var group = this.group;
        group.removeAll();

        var graphData = seriesModel.getData();
        var layoutInfo = seriesModel.layoutInfo;
        layoutInfo = getViewRect(seriesModel, api);
        group.attr('position', [layoutInfo.x, layoutInfo.y]);
        var nodes = graphData.nodes;
        var edges = graphData.edges;
        var WIDTH = 15;
        var HEIGHT = 10

        var dagreGraph = new dagre.graphlib.Graph({
            directed: true,
            compound: true,
            multiple: true
        });
        dagreGraph.setGraph(graphData.name);

        zrUtil.each(nodes, function (node) {
            if (node.opType !== undefined && node.opType !== null){
                dagreGraph.setNode(node.name, {label: node.opType, width: WIDTH, height: HEIGHT});
            }
            else {
                dagreGraph.setNode(node.name, {label: node.name, width: WIDTH, height: HEIGHT});
            }
        });

        zrUtil.each(edges, function (edge) {
            dagreGraph.setEdge(edge.source, edge.target, edge.label);
        });

        dagre.layout(dagreGraph);

        zrUtil.each(dagreGraph.nodes(), function (id) {
            var node = dagreGraph.node(id);
            var rect = new graphic.Rect({
                shape: {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height
                }
            });

            group.add(rect);
        });

        zrUtil.each(dagreGraph.edges(), function (e) {
            var points = dagreGraph.edge(e).points;
            var curve = new graphic.BezierCurve({
                shape: {
                    x1: points[0].x,
                    y1: points[0].y,
                    x2:points[2].x,
                    y2:points[2].y,
                    cpx1: points[1].x,
                    cpy2: points[1].y
                }
            });

            group.add(edge);
        });

    },

    dispose: fucntion () {
        // nothing to dispose
    }
});

/**
 * Get the layout position of the whole view
 *
 * @param {module:echarts/model/Series} seriesModel  the model object of sankey series
 * @param {module:echarts/ExtensionAPI} api  provide the API list that the developer can call
 * @return {module:zrender/core/BoundingRect}  size of rect to draw the sankey view
 */
function getViewRect(seriesModel, api) {
    return layoutUtil.getLayoutRect(
        seriesModel.getBoxLayoutParams(), {
            width: api.getWidth(),
            height: api.getHeight()
        }
    );
}