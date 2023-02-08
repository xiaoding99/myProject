<template>
    <div class="map-view">
        <div id="main"></div>
    </div>
</template>
<script>
import geoJson from '@/assets/data.json'

export default {
    name: 'MapView',
    data() {
        return {}
    },
    mounted() {
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
            series: [{
                //配置地图相关参数，绘制地图
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
            }]
        }
        mychart.setOption(option)

    }
}
</script>
<style lang="scss">
.map-view {
    width: 100%;

    #main {
        width: 100%;
        height: 600px;
    }
}
</style>