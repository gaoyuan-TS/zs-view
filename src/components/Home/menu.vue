<template>
  <div class="home-menu">
    <div class="type">
      <img src="../../assets/images/home/typeBackground.png" alt style="width: 240px" />
      <div class="title" v-if="!isCollapse">{{roleName}}</div>
    </div>

    <div class="navlist">
      <el-menu
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        collapse-transition
      >
        <div v-for="(item, index) in navList" :key="index" :class="{itemActive: isCollapse}">
          <el-submenu v-if="item.children" :index="item.path">
            <template slot="title">
              <i :class="item.icon" style="margin-right: 14px"></i>
              <span slot="title" v-if="!isCollapse">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <div v-for="(item1,index1) in item.children"
              :key="index1">
                <el-menu-item :index="item1.path">
                  <!-- <i :class="item.icon" style="margin-right: 20px"></i> -->
                  <span slot="title">{{item1.title}}</span>
                </el-menu-item>
              </div>
              


            </el-menu-item-group>
          </el-submenu>

          <el-menu-item v-else :index="item.path">
            <i :class="item.icon" style="margin-right: 14px"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>

      <!-- <div
        v-for="(item, idx) in navList"
        :key="idx"
        class="navitem"
        :class="name === item.title ? 'navactive' : ''"
        @click="navClick(idx)"
      >{{item.title}}</div> -->
    </div>
  </div>
</template>

<script>
// import navList from '../../assets/js/menuList.js'
import rolesRouter from '../../assets/js/returnRoleRouter'
export default {
  name: "Menu",
  props: ['isCollapse'],
  data() {
    return {
	    navList: [],
      name: "首页",
      defaultActive: '',
      roleName: ''
    }
  },
  created() {
    console.log(this.$route)
    this.defaultActive = this.$route.path

    let res = this.$localStore.get('roleJson')
    if (res) {
      if (res.accountType === 2 && !res['merchant']) {

      } else {
        this.navList = rolesRouter.menuList(res)
        // console.log('  this.navList', this.navList)
        switch (res.role.roleName) {
          case 'ROLE_HEADQUARTERS_ADMIN' || 'ROLE_FRANCHISEE_ADMIN':
            this.roleName = '管理员'
            break
          case 'ROLE_HEADQUARTERS_OPERATE' || 'ROLE_FRANCHISEE_OPERATE':
            this.roleName = '运营人员'
            break
          case 'ROLE_HEADQUARTERS_FINANCE' || 'ROLE_HEADQUARTERS_FINANCE':
            this.roleName = '财务人员'
            break
          case 'ROLE_HEADQUARTERS_CODE':
            this.roleName = '运营-标码中心'
            break
          case 'ROLE_BUSINESS':
            this.roleName = this.$t('common.ROLE_BUSINESS')
            break
          case 'ROLE_BUSINESS_STAFF':
            this.roleName = '商家员工'
            break
          default:
            break
        }
      }
    }
    this.navList.forEach(item => {
      if (item.path === this.$route.path) {
        this.activeName = item.name
      }
    })
  },
  watch: {
    $route(to) {
      console.log(to)
      this.defaultActive = to.path
    }
  },
  methods: {
    navClick(idx) {
      this.name = this.navList[idx].title;
    },
    handleOpen() {

    },
    handleClose() {

    },
  }
};
</script>

<style lang="less" scoped>
.home-menu {
  height: 100%;
  .type {
    position: relative;
    height: 120px;
    img {
      height: 120px;
    }
    .title {
      position: absolute;
      bottom: 21px;
      left: 14px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    // background-size: 100% 100%;
  }

  .navlist {
    height: calc(100% - 120px);
    overflow: auto;
    .navitem {
      line-height: 42px;
      padding-left: 48px;
      color: rgba(51, 51, 51, 1);
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
    }
    .navactive {
      color: rgba(244, 67, 54, 1);
    }
  }
}
/deep/.itemActive .el-icon-arrow-right {
    display: none !important;
  }
</style>