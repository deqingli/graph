require.config({
    paths: {
        'data': './data'
        // 'echarts': '../../echarts/dist',
        // 'zrender': '../../zrender/dist',
        // 'dagre': '../../dagre/dist/dagre.js'
    },
    packages: [
        {
            main: 'flowchart',
            location: '../src',
            name: 'flowchart'
        },
        {
            main: 'echarts',
            location: '../../echarts/dist',
            name: 'echarts'
        },
        // {
        //     main: 'zrender',
        //     location: '../../zrender',
        //     name: 'zrender'
        // },
        {
            main: 'dagre',
            location: '../../dagre/dist/',
            name: 'dagre'
        }
    ]

});