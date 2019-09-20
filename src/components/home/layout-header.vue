<template>
  <el-row type='flex' justify='space-between' class="layout-header" align='middle'>
    <el-col :span='6'>
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传值播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span='4'>
      <!-- 这个src这样写是一个字符串 -->
      <!-- <img class="user-img" src="formdata.photo" alt=""> -->
      <!-- src里边的路径经过vue转化成base64；
      如果没有formdata.photo 的时候，userImg只是一个本地路径，需要加一个require将本地路径边为base64 -->
      <img class="user-img" :src="formdata.photo ? formdata.photo : userImg" alt="">
      <!-- 在整个下拉选项注册一个点击事件 -->
      <el-dropdown trigger="click" @command='handleCommand'>
      <span class="el-dropdown-link">
        {{formdata.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <!-- 具名插槽 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='userMsg'>个人信息</el-dropdown-item>
        <el-dropdown-item command='gitAddress'>git地址</el-dropdown-item>
        <el-dropdown-item command='logOut'>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      formdata: {},
      userImg: require('../../assets/images/avatar.jpg')
    }
  },
  methods: {
    handleCommand (command) {
      // this.$message(command)
      if (command === 'userMsg') {
        // 跳转到账户信息
        // console.log(command) // 为字符串
        this.$router.push('/home/account')
      } else if (command === 'gitAddress') {
        // 跳转到自己的git账号
        window.location.href = 'https://github.com/HuAo1105/heimatoutiao'
      } else {
        // 退出到登陆页面并且删除token
        window.localStorage.clear()
        this.$router.push('/login')
      }
    },
    loadData () {
      let token = window.localStorage.getItem('user-token')
      // console.log(token)
      this.$axios({
        url: '/user/profile',
        // 请求方式为get
        // 请求参数
        // Bearer后边的空格不能少
        headers: { Authorization: `Bearer ${token}` }
      }).then(result => {
        // console.log(result)
        // 请求到了数据，然后将值赋到上边去
        this.formdata = result.data
      })
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style lang='less'>
.layout-header{
  height: 50px;
  background-color: #fff;
  .el-icon-s-unfold{
    font-size: 24px;
    vertical-align: middle;
    margin-right: 4px;
    margin-left: 10px;
  }
  .title{
    display: inline-block;
    line-height: 60px;
    font-size: 16px;
  }
  .user-img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 6px;
  }
}
</style>
