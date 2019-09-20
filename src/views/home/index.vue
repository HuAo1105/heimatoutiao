<template>
    <el-container>
      <!-- 设置左侧导航 -->
      <el-aside  style="width:200px;background-color:#323745">
        <layout-aslider></layout-aslider>
      </el-aside>
      <el-container style="background-color:#f2f3f5">
        <!-- 设置头部组件 -->
        <el-header style="padding:0">
          <layout-header></layout-header>
        </el-header>
        <!-- 设置中部 -->
        <el-main style="padding:0">
          <!-- 二级容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
// 引入导航组件
// import layoutAslider from '../../components/home/layout-aslider'
// // 引入头部组件
// import layoutHeader from '../../components/home/layout-header'
export default {
}
</script>

<style>

</style>
