<template>
  <!-- 封面组件 -->
  <div class="father">
    <div class="cover">
    <!-- 当点击封面时，将弹层打开 -->
      <div class="cover-img" v-for='(item,index) in images' :key='index' @click="openFloor(index)">
        <div class="title">点击图标上传图片</div>
        <img :src="item ? item : defaultImg" alt="">
      </div>

      <el-dialog :visible.sync="dialogVisible" title="选择图片" @close='dialogVisible=false'>
        <select-image @selectImg="receiveImg"></select-image>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/images/3669.jpg_wh300.jpg'),
      dialogVisible: false, // 给弹层设置个默认值，为false
      selectIndex: -1
    }
  },
  methods: {
    // 打开弹层
    openFloor (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    receiveImg (url) {
      // alert(url)
      this.$emit('selectImg', url, this.selectIndex)
    }
  }
}
</script>

<style lang='less' scoped>
.father{
display:flex;
  .cover{
    margin-left: 80px;
    margin-bottom: 30px;
    border: 1px solid #ccc;
    .cover-img{
      text-align: center;
      padding: 20px;
      height: 250px;
      float: left;
      .title{
        margin-bottom: 10px;
      }
      img{
        width: 180px;
        height: 180px;
      }
    }
  }
}

</style>
