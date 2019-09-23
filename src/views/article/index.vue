<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 放入表单 -->
    <el-form class="formall" v-loading='loading'>
      <!-- 文章状态 -->
      <!-- {{radio}} -->
      <el-form-item label='文章状态：'>
        <el-radio-group v-model="formData.radio" @change='changeCondition'>
          <el-radio :label='5'>全部</el-radio>
          <el-radio :label='0'>草稿</el-radio>
          <el-radio :label='1'>待审核</el-radio>
          <el-radio :label='2'>审核通过</el-radio>
          <el-radio :label='3'>审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道列表 -->
      <!-- {{value}} -->
      <el-form-item label='频道列表：'>
        <el-select v-model="formData.channels_id" @change='changeCondition'>
          <el-option v-for='(item, index) in channels' :key='index' :label='item.name' :value='item.id'>{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <!-- 选择时间 -->
      <!-- {{date}}时间为数组 -->
      <!-- {{formData.date}} -->
      <el-form-item label='选择时间：'>
        <el-date-picker
          @change='changeCondition'
          v-model="formData.date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format='yyyy-MM-dd'>
        </el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 内容 -->
    <div class="text">共找到55080条符合条件的内容</div>
    <!-- 大盒子 -->
    <div class="msgList" v-for='(item,index) in list' :key='index'>
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
        <div class="message">
          <span>{{item.title}}</span>
          <el-tag class="tag" :type='item.status | tranType'>{{item.status | tranStatus}}</el-tag>
          <span>{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span>
          <i class="el-icon-edit">修改</i>
        </span>
        <span @click="delArticle(item.id)" style="cursor:pointer">
          <i class="el-icon-delete">删除</i>
        </span>

      </div>
    </div>
    <el-row type='flex' justify='center' style="padding:20px 0">
      <el-pagination
        background
        @current-change='currentPage'
        :current-page='page.currentPage'
        :page-size='page.pageSize'
        layout="prev, pager, next"
        :total="page.total">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        // 文章状态
        radio: 5,
        // 频道id
        channels_id: null,
        // 日期返回的是一盒数组
        date: []
      },
      // 分页
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      list: [],
      defaultImg: require('../../assets/images/avatar.jpg'),
      channels: [],
      loading: false
    }
  },
  methods: {
    currentPage (newPage) {
      this.page.currentPage = newPage
      this.allCondition()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.allCondition()
    },
    // 所有的条件
    allCondition () {
      let params = {
        // 如果radio等于5的话，就证明状态栏是要选的，所以判断一下
        status: this.formData.radio === 5 ? null : this.formData.radio,
        channel_id: this.formData.channels_id,
        // 时间为数组 所以用长度判断 ，如果有的话 就选上，要是不选时间就填null
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getAticels(params)
    },
    // 删除文章
    delArticle (id) {
      this.$confirm('您确定要删除吗？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.getAticels()
        })
      })
    },
    // 获取文章列表
    getAticels (params) {
      this.loading = true
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        // console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // console.log(result)
        this.channels = result.data.channels
      })
    }
  },
  // 因为状态那返回的是数字，所以定义一个过滤器
  filters: {
    // 过滤器传过来的第一个参数，为value
    tranStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    tranType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return ''
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getAticels()
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.formall{
  margin-left: 30px;
}
.text{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px dashed #ccc;
}
.msgList{
  display: flex;
  justify-content: space-between;
  height: 200px;
  padding: 25px 0;
  border-bottom: 1px solid #f2f3f5;
  .left{
    display: flex;
    img{
      width: 150px;
      height: 150px;
    }
    .message{
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      height: 150px;
      span{
        display: inline-block;
        height: 60px;
        line-height: 60px;
      }
      .tag{
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .right{
    .el-icon-edit{
      margin-right: 10px;
    }
  }
}

</style>
