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
    2014:[1,3,1,4,1,3,3,2,2,4,1,1],
    2015:[2,1,5,3,2,5,4,1,2,5,3,5],
    2016:[7,4,3,1,5,0,1,1,0,0,0,0],
    2017:[0,0,1,1,0,0,2,0,2,3,2,1],
    2018:[0,1,1,0,1,1,0,1,0,4,0,2],
    2019:[0,0,3,2,2,0,0,2,0,1,1,2]
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
                'Lesão Seguida de Morte': true
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
            title: {text: 'Número mensal de lesões seguidas de morte (2014)',        
                    subtext: 'SSP-BA',
                    sublink: 'http://www.ssp.ba.gov.br/modules/conteudo/conteudo.php?conteudo=102'},
                    
            series: [
                {data: dataMap.dataHOMIC['2014'],
                                       type: 'bar',
                   color:'#a094e1',
                   showBackground: true,
                   backgroundStyle: {
                       color: 'rgba(180, 180, 180, 0.2)'
                   },
                   itemStyle: {
                           borderRadius: 10,
                           borderColor: '#a094e1',
                           borderWidth: 2
                       },
                }
            ]
        },
        {
            title : {text: 'Número mensal de lesões seguidas de morte (2015)'},
            series : [
                {data: dataMap.dataHOMIC['2015']}
            ]
        },
        {
            title : {text: 'Número mensal de lesões seguidas de morte (2016)'},
            series : [
                {data: dataMap.dataHOMIC['2016']}
            ]
        },
        {
            title : {text: 'Número mensal de lesões seguidas de morte (2017)'},
            series : [
                {data: dataMap.dataHOMIC['2017']}
            ]
        },
        {
            title : {text: 'Número mensal de lesões seguidas de morte (2018)'},
            series : [
                {data: dataMap.dataHOMIC['2018']}
            ]
        },
        {
            title : {text: 'Número mensal de lesões seguidas de morte (2019)'},
            series : [
                {data: dataMap.dataHOMIC['2019']}
            ]
        }
    ]
};
