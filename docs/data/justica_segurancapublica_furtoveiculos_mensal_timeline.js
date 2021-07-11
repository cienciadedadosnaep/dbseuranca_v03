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
    2014:[138,168,161,151,145,142,130,125,187,144,127,134],
    2015:[179,134,134,152,134,138,148,121,161,130,149,137],
    2016:[171,148,110,154,140,143,137,97,126,132,155,129],
    2017:[142,114,149,127,154,141,140,135,86,130,136,111],
    2018:[121,122,108,118,109,114,116,130,105,123,117,118],
    2019:[128,104,121,125,88,95,133,93,84,72,90,92]});

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
                'furto de veículos': true
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
            title: {text: 'Número mensal de furtos de veículos (2014)',        
                    subtext: 'SSP-BA',
                    sublink: 'http://www.ssp.ba.gov.br/modules/conteudo/conteudo.php?conteudo=102'},
                    
            series: [
                {data: dataMap.dataHOMIC['2014'],
                                       type: 'bar',
                   color:'#20cfef',
                   showBackground: true,
                   backgroundStyle: {
                       color: 'rgba(180, 180, 180, 0.2)'
                   },
                   itemStyle: {
                           borderRadius: 10,
                           borderColor: '#20cfef',
                           borderWidth: 2
                       },
                }
            ]
        },
        {
            title : {text: 'Número mensal de furtos de veículos (2015)'},
            series : [
                {data: dataMap.dataHOMIC['2015']}
            ]
        },
        {
            title : {text: 'Número mensal de furtos de veículos (2016)'},
            series : [
                {data: dataMap.dataHOMIC['2016']}
            ]
        },
        {
            title : {text: 'Número mensal de furtos de veículos (2017)'},
            series : [
                {data: dataMap.dataHOMIC['2017']}
            ]
        },
        {
            title : {text: 'Número mensal de furtos de veículos (2018)'},
            series : [
                {data: dataMap.dataHOMIC['2018']}
            ]
        },
        {
            title : {text: 'Número mensal de furtos de veículos (2019)'},
            series : [
                {data: dataMap.dataHOMIC['2019']}
            ]
        }
    ]
};
