<template>
  <el-card>
    <el-tabs>
      <el-tab-pane label='素材库'>
        <el-row type='flex' justify='center' class="big-box">
          <div class="unique-box" v-for='(item,index) in list' :key='index'>
            <img :src="item ? item.url : defaultImg" alt="" @click='transImg(item)'>
          </div>
        </el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page='page.currentPage'
          :page-size='page.pageSize'
          @current-change='changePage'
          class="page">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label='上传图片'>
        <el-upload
          class="avatar-uploader"
          action=''
          :show-file-list="false"
          :http-request='uploadImg'>
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-button type='primary' style="margin-left:40px" @click='uploadImg'>点击上传</el-button> -->
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/images/avatar.jpg'),
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 12
      }
    }
  },
  methods: {
    // 切换当前页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getImage()
    },
    // 获取素材
    getImage () {
      this.$axios({
        url: '/user/images',
        params: { page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        // debugger
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    // 上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        // alert('上传成功')
        this.$message({ message: '上传成功', type: 'success' })
      })
    },
    // 点击图片传给父组件
    transImg (item) {
      this.$emit('selectImg', item.url)
    }
  },
  created () {
    this.getImage()
  }
}
</script>

<style lang='less' scoped>
.page{
  text-align: center;
  margin: 10px 0;
}
.big-box{
  flex-wrap: wrap;
  justify-content: space-around;
  // background-color: pink;
  text-align: center;
  .unique-box{
    width: 130px;
    height: 130px;
    margin-right: 20px;
    margin-bottom: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
