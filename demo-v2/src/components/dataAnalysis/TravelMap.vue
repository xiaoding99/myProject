<template>
    <div class="travel-map">
        <div id="main"></div>
    </div>
</template>
<script>
import geoJson from '@/assets/data.json'
import { travel } from '@/api/api.js'

export default {
    name: 'TravelMap',
    data() {
        return {}
    },
    created() {
        travel().then(res => {
            if (res.data.status === 200) {
                let { points, linesData } = res.data.data;
                this.draw(points, linesData)
            }
        })
    },
    methods: {
        draw(points, linesData) {
            let mychart = this.$echarts.init(document.getElementById('main'));
            // 注册可用的地图，只在 geo 组件或者 map 图表类型中使用。
            this.$echarts.registerMap('china', geoJson);

            let option = {
                backgroundColor: 'rgb(121, 145, 209)',
                //geo:地理坐标系组件
                geo: [{
                    map: 'china',
                    aspectScale: 0.75,//scale 地图的长宽比
                    zoom: 1.1,
                    // 图形样式
                    itemStyle: {
                        // normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式
                        normal: {
                            areaColor: {
                                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0, color: 'red' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'blue' // 100% 处的颜色
                                }],
                                globalCoord: true
                            },
                            shadowColor: 'rgb(58, 115, 192)',
                            shadowOffsetX: 10,
                            shadowOffsetY: 11
                        }
                    },
                    //在地图中对特定的区域配置样式。
                    regions: [{
                        name: '南海诸岛',
                        itemStyle: {
                            opacity: 0
                        }
                    }]
                }],
                series: [
                    { //配置地图相关参数，绘制地图
                        type: 'map',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#1DE9B6'
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: 'rgb(183, 185, 14)'
                                }
                            }
                        },
                        zoom: 1.1,
                        //使用 registerMap 注册的地图名称。
                        map: 'china',
                        itemStyle: {
                            normal: {
                                backgroundColor: 'rgb(147, 235, 248)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: 'rgb(31, 54, 150)' // 0%处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgb(89, 128, 142)' // 100%处的颜色
                                        }
                                    ],
                                    globalCoord: true
                                }
                            },
                            emphasis: {
                                areaColor: 'rgb(46, 229, 206)',
                                borderWidth: 0.1
                            }
                        },
                    },
                    //配置地图中的散点图
                    {
                        type: 'effectScatter', //带有涟漪特效动画的散点（气泡）图
                        coordinateSystem: 'geo', //使用地理坐标系
                        showEffectOn: 'render', //绘制完成后显示特效
                        symbolSize: 10,// 散点大小
                        zlevel: 1,
                        data: points,
                        rippleEffect: { //涟漪特效相关配置
                            period: 15, //动画的周期
                            scale: 4,
                            brushType: 'fill' //波纹的绘制方式
                        }
                    },
                    //配置地图线路动画效果设置
                    // 用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
                    {
                        type: 'lines',
                        zlevel: 2,
                        //线特效的配置
                        effect: {
                            show: true,
                            period: 4, //特效动画的时间
                            symbol: 'arrow',
                            symbolSize: 7,
                            trailLength: 0.4, //特效尾迹的长度。取从 0 到 1 的值，
                        },
                        itemStyle: {
                            normal: {
                                color: '#1DE9B6',
                                width: 1,
                                opacity: 0.1,
                                curveness: 0.3, //高亮样式
                            },
                        },
                        data: linesData
                    }
                ]
            }
            mychart.setOption(option)
        }
    },
    mounted() {


    }
}
</script>
<style lang="scss">
.travel-map {
    width: 100%;

    #main {
        width: 100%;
        height: 600px;
    }
}
</style>