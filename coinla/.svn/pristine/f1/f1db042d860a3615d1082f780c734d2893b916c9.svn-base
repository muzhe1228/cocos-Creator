function pie() {
    Highcharts.chart('statPie', {
        credits: {
            enabled: false
        },
        colors: ["#d3758f", "#f3d999", "#a5d8c3", "#564e50", "#c6b38f", "#001751", "#f4e8c8", "#305791", "#8fb2a2", "#e02053"],
        chart: {
            type: 'variablepie',
            margin: [0, 0, 0, 0],
            width: 206,
            height: 206
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            variablepie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            },
            series: {
                states: {
                    hover: {
                        halo: {
                            size: 0
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:#00b785">\u25CF</span>币种: <b> {point.name}</b><br/>' +
            '<span style="color:{point.color}">\u25CF</span>占比: <b>{point.ratio}%</b><br/>'
        },
        series: [{
            minPointSize: '1%',
            innerSize: '20%',
            zMin: 0,
            borderWidth: 0,
            data: [
                {
                    name: '西班牙',
                    y: 505370,
                    z: 92.9
                }, {
                    name: '法国',
                    y: 551500,
                    z: 118.7
                }, {
                    name: '波兰',
                    y: 312685,
                    z: 124.6
                }, {
                    name: '捷克共和国',
                    y: 78867,
                    z: 137.5
                }, {
                    name: '意大利',
                    y: 301340,
                    z: 201.8
                }, {
                    name: '瑞士',
                    y: 41277,
                    z: 214.5
                }, {
                    name: '德国',
                    y: 357022,
                    z: 235.6
                }]
        }]
    });
}