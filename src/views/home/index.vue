<template>
    <el-container>
      <!-- 设置左侧导航 -->
      <el-aside>
        <layout-aslider></layout-aslider>
      </el-aside>
      <el-container>
        <!-- 设置头部 -->
        <el-header></el-header>
        <!-- 设置中部 -->
        <el-main>
          <!-- 二级容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import layoutAslider from '../../components/home/layout-aslider'
export default {
  components: {
    'layout-aslider': layoutAslider
  }
}
</script>

<style>

</style>
