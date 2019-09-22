<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 图片上传 -->
    <el-upload class="upload-img" :http-request='uploadImg' :show-file-list='false' action="">
      <el-button type='primary' size='small'>点击上传</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click='changeTab'>
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for='item in list' :key='item.id' class="item">
            <img :src="item.url" alt="" class="item-img">
            <div class="operate">
              <i :style="{color: item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page='pagination.currentPage'
          :page-size='pagination.pageSize'
          class="page"
          @current-change='current'>
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="select">
        <div class="img-list">
          <el-card v-for='item in list' :key='item.id' class="item">
            <img :src="item.url" alt="" class="item-img">
          </el-card>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page='pagination.currentPage'
          :page-size='pagination.pageSize'
          class="page"
          @current-change='current'>
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      loading: false
    }
  },
  methods: {
    uploadImg (params) {
      console.log(params)
      // 由于得上传文件，所以要使用new FormData
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getData()
      })
    },
    current (newPage) {
      // console.log(newPage)
      this.pagination.currentPage = newPage
      this.getData()
    },
    changeTab () {
      this.pagination.currentPage = 1
      this.getData()
    },
    getData () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: { page: this.pagination.currentPage, per_page: this.pagination.pageSize, collect: this.activeName === 'select' }
      }).then(result => {
        // debugger
        // console.log(result)
        this.list = result.data.results
        // console.log(this.list)
        this.pagination.total = result.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang='less' scoped>
.img-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: 6px;
  padding: 0;
  .item{
    margin: 30px;
    width: 190px;
    height: 220px;
    .item-img{
      width: 150px;
      height: 150px;
    }
    .operate{
      font-size: 20px;
      height: 30px;
      margin-top: 5px;
      line-height: 30px;
      .el-icon-star-on{
        margin-left: 20px;
      }
      .el-icon-delete-solid{
        margin-left: 60px;
      }
    }
  }
}
.page{
  text-align: center;
}
.upload-img{
  position: absolute;
  right: 40px;
  margin-top: -8px;
}
</style>
