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
    2014:[501,466,561,686,538,407,524,472,522,625,524,547],
    2015:[569,548,662,610,664,573,611,539,432,466,425,438],
    2016:[517,516,525,539,523,488,589,552,525,487,482,476],
    2017:[457,485,507,421,531,495,511,484,503,462,444,433],
    2018:[466,426,531,535,496,494,476,435,420,451,338,318],
    2019:[381,379,402,398,494,365,435,374,355,494,454,393]
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
                'Roubo de veículos': true
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
            title: {text: 'Número mensal de roubos de veículos (2014)',        
                    subtext: 'SSP-BA',
                    sublink: 'http://www.ssp.ba.gov.br/modules/conteudo/conteudo.php?conteudo=102'},
                    
            series: [
                {data: dataMap.dataHOMIC['2014'],
                                       type: 'bar',
                   color:'#62acd1',
                   showBackground: true,
                   backgroundStyle: {
                       color: 'rgba(180, 180, 180, 0.2)'
                   },
                   itemStyle: {
                           borderRadius: 10,
                           borderColor: '#62acd1',
                           borderWidth: 2
                       },
                }
            ]
        },
        {
            title : {text: 'Número mensal de roubos de veículos (2015)'},
            series : [
                {data: dataMap.dataHOMIC['2015']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos de veículos (2016)'},
            series : [
                {data: dataMap.dataHOMIC['2016']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos de veículos (2017)'},
            series : [
                {data: dataMap.dataHOMIC['2017']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos de veículos (2018)'},
            series : [
                {data: dataMap.dataHOMIC['2018']}
            ]
        },
        {
            title : {text: 'Número mensal de roubos de veículos (2019)'},
            series : [
                {data: dataMap.dataHOMIC['2019']}
            ]
        }
    ]
};
