var dataMap = {};
function dataFormatter(obj) {
    var pList = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    var temp;
    for (var year = 2014; year <= 2019; year++) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
                name: pList[i],
                value: temp[i]
            };
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = sum;
    }
    return obj;
}

dataMap.dataHOMIC = dataFormatter({
    //max : 200,
    2014:[178,149,166,177,120,158,126,150,175,173,162,195],
    2015:[266,223,202,263,226,228,228,157,127,218,219,204],
    2016:[198,212,202,189,249,205,218,275,240,236,188,203],
    2017:[223,206,265,280,303,266,209,198,168,184,153,160],
    2018:[139,171,166,164,167,176,158,167,166,190,190,179],
    2019:[190,129,166,150,164,188,138,161,117,177,194,206]
});

option = {
    baseOption: {
        timeline: {
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 2000,
            // controlStyle: {
            //     position: 'left'
            // },
            data: [
                '2014','2015','2016','2017','2018','2019' 
            ]
        },
        title: {
            subtext: 'texto subscrito'
        },
        tooltip: {
        },
        toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },        
        legend: {
            left: 'right',
            data: ['H'],
            selected: {
                'Roubo à ônibus': true
            }
        },
        calculable : true,
        grid: {
            top: 80,
            bottom: 100,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value.replace('\n', '');
                        }
                    }
                }
            }
        },
        xAxis: [
            {
                'type':'category',
                'axisLabel':{'interval':0},
                'data':[
                       'jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'
                ],
                splitLine: {show: false}
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: ''
            }
        ],
        series: [
            {name: "", type: 'bar'},
        ]
    },
    options: [
        {
            title: {text: 'Número mensal de roubos à ônibus (2014)',        
                    subtext: 'SSP-BA',
                    sublink: 'http://www.ssp.ba.gov.br/modules/conteudo/conteudo.php?conteudo=102'},
                    
            series: [
                {data: dataMap.dataHOMIC['2014'],
                                       type: 'bar',
                   color:'#175676',
                   showBackground: true,
                   backgroundStyle: {
                       color: 'rgba(180, 180, 180, 0.2)'
                   },
                   itemStyle: {
                           borderRadius: 10,
                           borderColor: '#175676',
                           borderWidth: 2
                       },
                }
            ]
        },
        {
            title : {text: 'Número mensal de roubos à ônibus (2015)'},
            series : [
                {data: dataMap.dataHOMIC['2015']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos à ônibus (2016)'},
            series : [
                {data: dataMap.dataHOMIC['2016']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos à ônibus (2017)'},
            series : [
                {data: dataMap.dataHOMIC['2017']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos à ônibus (2018)'},
            series : [
                {data: dataMap.dataHOMIC['2018']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos à ônibus (2019)'},
            series : [
                {data: dataMap.dataHOMIC['2019']}
            ]
        }
    ]
};
