<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        <el-card>
            <div id="main2"></div>
        </el-card>
    </div>
</template>
<script>
import { dataview } from '@/api/api.js'

export default {
    name: 'DataView',
    data() {
        return {}
    },
    mounted() {
        let mychart = this.$echarts.init(document.getElementById('main1'));
        mychart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        })
    },
    created() {
        dataview().then(res => {
            // console.log(res);
            if (res.data.status === 200) {
                let { legend, xAxis, series } = res.data.data;
                this.draw(legend, xAxis, series)
            }
        })
    },
    methods: {
        draw(legend, xAxis, series) {
            let mychart1 = this.$echarts.init(document.getElementById('main2'));
            let option = {
                title: {
                    text: '会话量'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legend
                },
                xAxis: {
                    type: 'category',
                    data: xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series: series
            }
            mychart1.setOption(option)

        }
    }

}
</script>
<style lang="scss">
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 50%;

        #main1,
        #main2 {
            height: 500px;
        }
    }
}
</style>