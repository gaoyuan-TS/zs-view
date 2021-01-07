<template>
  <div id="home">
    <!-- <div class="langBox">
      <el-dropdown @command="handleSetLang" trigger="click" class="dropBox"  >
        <div class="lang-active">
        
          <div v-for="(lang, i) in langs" :key="`LangActive${i}`" v-show="lang.key === activeLang">
             <img src="../assets/images/home/Group.png" alt srcset />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown"  >
          <el-dropdown-item v-for="(lang, i) in langs" :key="`Lang${i}`" :command="lang.key" :class="langType.language === lang.key ? 'dropdowmActive' : ''">
            <span class="text">{{ lang.value }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div> -->
    <el-container>
      <el-header height="70px">
        <headers></headers>
      </el-header>
      <el-container :style="{'height': height + 'px'}">
        <el-aside :class="{'widthClass' : !isCollapse}" width="64px" v-if="menuShaow">
          <Menu :isCollapse='isCollapse'></Menu>
          
        </el-aside>
        <el-main style="background: rgb(233,233,233)" class="home-content">
          <div class="open" v-if="menuShaow">
            <i class="el-icon-s-fold" v-if="!isCollapse" @click="open"></i>
            <i class="el-icon-s-unfold" v-else @click="open"></i>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headers from "@/components/Home/header.vue";
import Menu from "@/components/Home/menu.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Lang",
  components: {
    headers,
    Menu
  },
  data() {
    return {
      height: '',
      isCollapse: false,
      menuShaow: true,
      langs: [
        {
          key: "zh-CN",
          value: "中文"
        },
        {
          key: "en-US",
          value: "EngLish"
        }
      ],
      langType: this.$store.state.language
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 70
    let roleJson = this.$localStore.get('roleJson')
    console.log(roleJson)
    if (roleJson) {
      console.log(roleJson.merchant)
      if (roleJson.accountType === 2 && !roleJson['merchant']) {
        this.menuShaow = false
      }
    }
      
  },
  computed: {
    ...mapGetters({
      activeLang: "language"
    })
  },
  methods: {
    ...mapMutations(["setLanguage"]),
    handleSetLang(lang) {
      // 设置i18n.locale 组件库会按照上面的配置使用对应的文案文件
      this.$i18n.locale = lang;
      // console.log("lang",lang)
      // 提交mutations
      this.setLanguage(lang);
      location.reload()
    }, 
    open() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scope>
@import url("../assets/style/font/iconFont.css");
#home {
  height: 100%;
  position: relative;
  .el-header {
    height: 70px;
    width: 100%;
    padding: 0;
  }
  .home-content {
    overflow: auto;
  }
  .open {
    font-size: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .widthClass {
    width: 240px !important;
  }
  .langBox {
    width: 67px;
    height: 67px;
    position: absolute;
    right: 23px;
    top: 70px;
    z-index: 3;
    img {
      width: 100%;
      height: 100%;
    }
    .dropBox{
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
.dropdowmActive {
  background: #ecf5ff;
  color: #409EFF !important;
}
</style>