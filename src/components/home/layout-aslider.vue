<template>
  <div class="layout-aslider">
    <div class="title">
      <img src="../../assets/images/logo_admin.png" alt="">
    </div>
    <!-- 这个router表示是否使用vue-router模式
    index相当于view-link里边的to属性-->
    <!-- 值为布尔值 -->
    <el-menu
        :router='true'
        background-color="#353b4e"
        text-color="#adafb5"
        active-text-color="#ffd04b"
        class="menu"
        style="border-right:0">
        <!-- 首页 -->
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/publish">发布文章</el-menu-item>
            <el-menu-item index="/home/articles">内容列表</el-menu-item>
            <el-menu-item index="/home/comment">评论列表</el-menu-item>
            <el-menu-item index="/home/material">素材管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/home/fans">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/gradata">图文数据</el-menu-item>
            <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
            <el-menu-item index="/home/fanpic">粉丝画像</el-menu-item>
            <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/home/account" >
          <i class="el-icon-user"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='less' scoped>
.layout-aslider {
  // background-color: #323745;
  height: 100vh;
  width: 200px;
  padding-right: 0;
  .title {
    text-align: center;
    padding: 15px 0;
    img {
      height: 30px;
    }
  }
}

</style>
