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
    2014:[114,119,131,177,107,97,80,95,97,91,100,113],
    2015:[115,95,125,98,117,86,118,103,97,109,109,118],
    2016:[125,114,116,97,117,92,99,90,107,118,103,111],
    2017:[131,102,121,102,111,96,112,115,111,108,112,125],
    2018:[106,86,89,108,99,105,85,78,97,91,80,98],
    2019:[85,71,81,92,86,68,74,76,76,115,71,92]
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
                'Homicídios': true
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
            title: {text: 'Número mensal de homicídios (2014)',        
                    subtext: 'SSP-BA',
                    sublink: 'http://www.ssp.ba.gov.br/modules/conteudo/conteudo.php?conteudo=102'},
                    
            series: [
                {data: dataMap.dataHOMIC['2014'],
                                       type: 'bar',
                   color:'#fe4641',
                   showBackground: true,
                   backgroundStyle: {
                       color: 'rgba(180, 180, 180, 0.2)'
                   },
                   itemStyle: {
                           borderRadius: 10,
                           borderColor: '#fe4641',
                           borderWidth: 2
                       },
                }
            ]
        },
        {
            title : {text: 'Número mensal de homicídios (2015)'},
            series : [
                {data: dataMap.dataHOMIC['2015']}
            ]
        },
        {
            title : {text: 'Número mensal de homicídios (2016)'},
            series : [
                {data: dataMap.dataHOMIC['2016']}
            ]
        },
        {
            title : {text: 'Número mensal de homicídios (2017)'},
            series : [
                {data: dataMap.dataHOMIC['2017']}
            ]
        },
        {
            title : {text: 'Número mensal de homicídios (2018)'},
            series : [
                {data: dataMap.dataHOMIC['2018']}
            ]
        },
        {
            title : {text: 'Número mensal de homicídios (2019)'},
            series : [
                {data: dataMap.dataHOMIC['2019']}
            ]
        }
    ]
};
