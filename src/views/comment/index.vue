<template>
<!-- 评论页面 -->
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>

    <!-- 表格 -->
    <el-table :data='formdata' :stripe='true'>
      <el-table-column label='标题' prop='title' width='550px'></el-table-column>
      <el-table-column label='评论状态' :formatter='formatter' prop='comment_status' align='center'></el-table-column>
      <el-table-column label='总评论数' prop='total_comment_count' align='center'></el-table-column>
      <el-table-column label='粉丝评论数' prop='fans_comment_count' align='center'></el-table-column>
      <!-- 这个el-table-column就是子组件，通过slot-scope去接收保存在obj这个对象里 -->
      <!-- 整个el-table-column就是一个父组件模板 -->
      <!-- 用到的是作用域插槽的知识，但是不需要去子组件去添加属性，因为element-ui已经帮我们做好了 -->
      <el-table-column label='操作' align='center'>
        <template slot-scope="obj">
          <!-- 通过 (作用域插槽)Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
          <el-button type='text'>修改</el-button>
          <!-- 拿到了子组件里的数据，作用于父模板 -->
          <el-button type='text' @click='openOrclose(obj.row)' :style="{color:obj.row.comment_status ? '#409EFF' : '#E6A23C'}">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="this.pagination.total"
      class="page"
      :page-size='pagination.pageSize'
      :current-page='pagination.currentPage'
      @current-change='currentPage'>
    </el-pagination>
  </el-card>
</template>

<script>
import { openOrClose, getComments } from '../../api/articles'
export default {
  data () {
    return {
      formdata: [],
      pagination: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      // 定义一个变量
      loading: false
    }
  },
  methods: {
    async openOrclose (row) {
      // 通过判断来做相应的操作
      // console.log(row.id)
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`此操作将${mess}该文件, 是否继续?`, {
        type: 'warning'
      })
      await openOrClose(row)
      this.getData() // 成功之后重新拉取数据
    },
    currentPage (newPage) {
      this.pagination.currentPage = newPage
      // console.log(this.pagination.currentPage)
      this.getData()
    },
    // 获取评论内容
    async getData (pageSize, currentPage) {
      // console.log(this.pagination.pageSize)
      // console.log(currentPage)

      this.loading = true
      let result = await getComments(this.pagination.pageSize, this.pagination.currentPage)
      // console.log(result.data)
      this.formdata = result.data.results
      // 有了总页数
      this.pagination.total = result.data.total_count
      this.loading = false
    },
    // 因为评论状态是布尔值，所以需要用formatter来格式化内容
    // row代表行数据
    // column代表列信息
    // cellValue为prop='status'的返回值
    formatter (row, column, cellValue, index) {
      // debugger
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>
.page{
  text-align: center;
  margin: 20px 0;
}
</style>
