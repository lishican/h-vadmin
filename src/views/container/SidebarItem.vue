<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <router-link v-if="hasOneShowingChildren(item.children) " :to="item.path"
        :key="item.title">
        <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- <i class="el-icon-location"></i> -->
          <span  slot="title">{{item.title}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
           <!-- <i class="el-icon-location"></i> -->
          <span  slot="title">{{item.title}}</span>
        </template>
        <template v-for="child in item.children" >
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              <!-- <i class="el-icon-location"></i> -->
              <span  slot="title">{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      return children ? false : true;
    }
  }
};
</script>
