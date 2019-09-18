<template>
  <div class="layout-aslider">
    <div class="title">
      <img src="../../assets/images/logo_admin.png" alt="">
    </div>
  <el-menu
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b">
      <!-- 首页 -->
      <el-menu-item index="4">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-2">评论列表</el-menu-item>
          <el-menu-item index="1-2">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">图文数据</el-menu-item>
          <el-menu-item index="1-2">粉丝概况</el-menu-item>
          <el-menu-item index="1-2">粉丝画像</el-menu-item>
          <el-menu-item index="1-2">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
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
.layout-aslider{
  background-color: #323745;
  height: 100vh;
  width: 200px;
  .title{
    text-align: center;
    padding: 15px 0;
  }
  img{
    height: 30px;
  }
}
</style>
