<template>
  <div class="bac">
    <!-- <div class="bacimg"></div> -->
      <div :style='hourStyle' class="hour"></div>
      <div :style='minuteStyle' class="minute"></div>
      <div :style="secondStyle" class="second"></div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      hour: 12,
      minute: 60,
      second: 60
    }
  },
  methods: {
    updateTime () {
      let currentTime = new Date()
      this.hour = currentTime.getHours() // 获取当前小时
      this.minute = currentTime.getMinutes() // 获取当前分钟
      this.second = currentTime.getSeconds() // 获取当前秒
    }
  },
  computed: {
    // 时针一格是30deg
    // 分针一格是6deg
    // 秒针一格是6deg
    hourStyle () {
      // 因为获取的hour是24小时制
      let hour = this.hour - 12 ? this.hour - 12 : this.hour
      let deg = hour * 30 + (this.minute / 60) * 30
      return { transform: `rotate(${deg}deg)` }
    },
    minuteStyle () {
      let deg = this.minute * 6
      return { transform: `rotate(${deg}deg)` }
    },
    secondStyle () {
      let deg = this.second * 6
      return { transform: `rotate(${deg}deg)` }
    }
  },
  created () {
    setInterval(() => {
      this.updateTime()
    }, 1000)
  }
}
</script>

<style lang='less' scoped>
/* .bacimg{
  background-image: url('../../assets/images/timg (14).jpg');
  height: 100vh;
  background-size: cover;
} */
.bac{
  display: flex;
  justify-content: center;
  left: 30%;
  top:15%;
  width: 400px;
  height: 400px;
  background-size:cover;
  background-image: url('../../assets/images/back.png');
  position: relative;
  // transform: translate(100px, 100px);
  .hour,.minute,.second {
    position: absolute;
    bottom:200px;
    transform-origin: 100% 100%; // 改变旋转点
  }
  .hour{
    width: 10px;
    height: 80px;
    background-image: url('../../assets/images/hou.png')
  }
  .minute{
    width: 8px;
    height: 100px;
    background-image: url('../../assets/images/min.png')
  }
  .second{
    width: 6px;
    height: 120px;
    background-image: url('../../assets/images/sec.png')
  }
}

</style>
