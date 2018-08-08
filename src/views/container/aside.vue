<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
        <!-- :collapse="isCollapse" -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.fullPath"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="menus"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import store from "store";
import authMenus from "../../auth";
import SidebarItem from "./SidebarItem";
store.set("userRole", ["admin"]);
console.log(store.get("userRole"));
console.log(authMenus);
export default {
  data() {
    return {};
  },
  components: { SidebarItem },
  computed: {
    menus() {
      let auth = store.get("userRole");
      if (!auth) {
        return [];
      }
      let tm = [];
      for (let role of auth) {
        tm.push(...authMenus[role].items);
      }
      console.log(tm);
      return tm;
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      console.log("children");
      console.log(children);
      return children && children.length > 1 ? false : true;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


