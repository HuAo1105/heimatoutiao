<template>
  <el-card>
    <bread-crumb slot='header'>
      <template slot="title">图文数据</template>
    </bread-crumb>
    <el-row>
      <div class="echart" ref='lifeEcharts'></div>
    </el-row>
  </el-card>
</template>

<script>
// 引入echarts
// 使用echarts必须要有一个盒子，一般给一个div，但是这个div必须要有宽度和高度
import echarts from 'echarts'
export default {
  data () {
    return {
      lifeData: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  mounted () {
    // 在mounted中可以获取dom对象
    // this.lifeChart相当于给了vue实例加了一个属性
    this.lifeChart = echarts.init(this.$refs.lifeEcharts) // 1、得到图表的实例
    // 3、在mounted中调用
    this.setLifeOption()
  },
  methods: {
    updateData () {
      this.lifeData = this.lifeData.map(item => {
        return item * (Math.random() + 0.6)
      })
    },
    setLifeOption () {
      // 2、获取实例后通过setOption方法填入数据
      this.lifeChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.lifeData,
          type: 'line'
        }]
      })
    }
  },
  created () {
    setInterval(() => {
      this.updateData()
    }, 1000)
  },
  watch: {
    // 这里需要监听lifeData数据变没变
    // 数据变化了，就要重新setOption
    lifeData (newValue) {
      this.setLifeOption()
    }
  }
}
</script>

<style scoped>
.echart{
  height: 500px;
  width: 500px;
}
</style>
