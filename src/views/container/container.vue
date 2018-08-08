<template>
  <el-container>
    <el-aside style="width:200px;">
      <Aside style="width:200px;"/>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>h 系统</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import Aside from "./aside";
export default {
  components: {
    Aside
  }
};
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: rgb(48, 65, 86);
  text-align: center;
  line-height: 200px;
  width: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  position: relative;
  height: 100%;
}
</style>

