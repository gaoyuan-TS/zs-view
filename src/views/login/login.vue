<template>
  <div class="login" id="login">
    <!-- 111 -->
    <el-container>
      <el-header height="70px">
        <img src="../../assets/images/login/login_logo.png" alt="">
      </el-header>

      <el-main class="login-content" style="">
        <el-row style="z-index: 2" type="flex" justify="space-between">
          <el-col :span="14">
            <div class="login_menuImg">
              <img src="../../assets/images/login/login_menu.png" alt="" srcset="">
            </div>
          </el-col>

          <el-col :span="10">
            <div class="login-main">
              <div class="login-form">
                <div class="title">
                  {{$t('login.title')}}
                </div>
                <div class="title title2">
                  {{$t('login.title2')}}
                </div>

                <div class="login-form-form">
                  <el-form class="loginForm" ref="registParams">
                    <div v-if="changeFalse">
                      <div class="login-form-form-title">{{$t('login.loginFormTitle')}}</div>
                      <el-form-item>
                        <!-- <span class=""></span> -->
                        <el-input type="username" v-model="loginParams.accountName" autocomplete="off" :placeholder="$t('login.userNameInput')" class="username">
                          <i slot="prefix" class="iconfont icon-user"></i>
                        </el-input>
                      </el-form-item>

                      <el-form-item>
                        <!-- <span class=""></span> -->
                        <el-input type="password" v-model="loginParams.password" autocomplete="off" :placeholder="$t('login.passwordInput')" class="username">
                          <i slot="prefix" class="iconfont icon-mima"></i>
                        </el-input>
                      </el-form-item>

                      <el-form-item>
                        <div class="loginForm-check">
                          <el-checkbox
                            v-model="checked"
                            :label="$t('login.passwordCheck')"
                            name="checked"
                          ></el-checkbox>
                          <span class="register" @click="changeFalse=false">{{$t('login.registerButtonText')}}></span>
                        </div>
                        
                      </el-form-item>
                      <el-form-item>
                        <el-button @click="login">{{$t('login.loginButton')}}</el-button>
                        <div class="hinttitle">
                          <span class="iconfont icon-anzhuoduanliulanqidakai"></span>
                          {{$t('login.tip')}}
                        </div>
                      </el-form-item>
                    </div>

                    <!-- 注册 -->
                    <div v-else>
                      <div class="login-form-form-title">{{$t('login.regisFormTitle')}}</div>
                      <el-form-item>
                        <!-- <span class=""></span> -->
                        <el-input readonly type="username" v-model="registParam.accountName"  onfocus="this.removeAttribute('readonly');" :placeholder="$t('login.regAccNum')" class="username">
                          <i slot="prefix" class="iconfont icon-user"></i>
                        </el-input>
                      </el-form-item>

                      <el-form-item>
                        <!-- <span class=""></span> -->
                        <el-input type="password" v-model="registParam.password" autocomplete="off" :placeholder="$t('login.regPass')" class="username">
                          <i slot="prefix" class="iconfont icon-mima"></i>
                        </el-input>
                      </el-form-item>

                      <el-form-item>
                        <!-- <span class=""></span> -->
                        <el-input type="password" v-model="registParam.confirmPassword" autocomplete="off" :placeholder="$t('login.again')" class="username">
                          <i slot="prefix" class="iconfont icon-mima"></i>
                        </el-input>
                      </el-form-item>

                      <el-form-item>
                        <div class="loginForm-check">
                          <div></div>
                          <span class="register" @click="changeFalse=true">{{$t('login.loginButtonText')}}></span>
                        </div>
                        
                      </el-form-item>

                      <el-form-item>
                        <el-button @click="registEvent">{{$t('login.regisFormTitle')}}</el-button>
                        <div class="hinttitle">
                          <span class="iconfont icon-anzhuoduanliulanqidakai"></span>
                          {{$t('login.tip')}}
                        </div>
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
              </div>
              
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <div class="waveWrapper waveAnimation">
      <div class="waveWrapperInner bgTop">
        <div class="wave waveTop"></div>
      </div>
      <div class="waveWrapperInner bgMiddle">
        <div class="wave waveMiddle"></div>
      </div>
      <div class="waveWrapperInner bgBottom">
        <div class="wave waveBottom"></div>
      </div>
    </div>
    
    <!-- 切换中英文部分 -->
    <!-- <div class="langBox">
      <el-dropdown @command="handleSetLang" trigger="click" class="dropBox"  >
        <div class="lang-active">
        
          <div v-for="(lang, i) in langs" :key="`LangActive${i}`" v-show="lang.key === activeLang">
             <img src="../../assets/images/home/Group.png" alt srcset />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown"  >
          <el-dropdown-item v-for="(lang, i) in langs" :key="`Lang${i}`" :command="lang.key" :class="langType.language === lang.key ? 'dropdowmActive' : ''">
            <span class="text">{{ lang.value }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div> -->
  </div>
</template>

<script>
import rolesRouter from '../../assets/js/returnRoleRouter'
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      loginParams: {
        accountName: '',
        password: ''
      },
      registParam: {
        accountName: '',
        password: '',
        confirmPassword: ''
      },
      checked: false,
      host: 'zs',
      changeFalse: true,
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
  created() {
    if (process.env.NODE_ENV === 'development') {
      this.host = 'zs'
      this.hostShow = true
    } else {
      if (location.host.slice(0, 2) === 'zs') {
        this.hostShow = true
        this.host = 'zs'
      } else {
        this.hostShow = false
        this.host = 'op'
      }
    }
  },
  computed: {
    ...mapGetters({
      activeLang: "language"
    })
  },
  mounted() {
    this.bubbly()
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
    bubbly: function (t) {
      var o = t || {}
      var e = function () {
        return Math.random()
      }
      /* eslint-disable */
      var r = o.canvas || document.createElement("canvas");
      var n = r.width;
      var a = r.height;
      r.parentNode === null &&
        (r.setAttribute(
          "style",
          "position:fixed;z-index:-1;left:0;top:0;width:100%!important;height:100%;"
        ),
        (n = r.width = window.innerWidth),
        (a = r.height = window.innerHeight),
        document.getElementById("login").appendChild(r));
      var i = r.getContext("2d");
      i.shadowColor = o.shadowColor || "#fff";
      i.shadowBlur = o.blur || 4;
      var l = i.createLinearGradient(0, 0, n, a);
      l.addColorStop(0, o.colorStop || "#AE1E24");
      for (
        var h = o.bubbles || Math.floor(0.02 * (n + a)), d = [], c = 0;
        c < h;
        c++
      ) {
        d.push({
          f: (
            o.bubbleFunc ||
            function() {
              return "hsla(0, 0%, 100%, " + 0.1 * e() + ")";
            }
          ).call(),
          x: e() * n,
          y: e() * a,
          r: 4 + (e() * n) / 25,
          a: e() * Math.PI * 2,
          v: 0.1 + 0.5 * e()
        });
      }
      !(function t() {
        if (r.parentNode === null) return cancelAnimationFrame(t);
        !1 !== o.animate && requestAnimationFrame(t);
        i.globalCompositeOperation = "source-over";
        i.fillStyle = l;
        i.fillRect(0, 0, n, a);
        i.globalCompositeOperation = o.compose || "lighter";
        d.forEach(function(t) {
          i.beginPath();
          i.arc(t.x, t.y, t.r, 0, 2 * Math.PI);
          i.fillStyle = t.f;
          i.fill();
          t.x += Math.cos(t.a) * t.v;
          t.y += Math.sin(t.a) * t.v;
          t.x - t.r > n && (t.x = -t.r);
          t.x + t.r < 0 && (t.x = n + t.r);
          t.y - t.r > a && (t.y = -t.r);
          t.y + t.r < 0 && (t.y = a + t.r);
        });
      })();
    },
    checkDatalogin () {
      if (!this.loginParams.accountName) {
        this.$message.error(this.$t('login.loginAccNameTip'))
        return false
      }
      if (!this.loginParams.password) {
        this.$message.error(this.$t('login.loginPassTip'))
        return false
      }
      return true
    },
    // 登录
    login() {
      if (this.checkDatalogin()) {
        let _params = this.loginParams

        this.$login('/accountCenter/account/login/' + this.host, _params).then(res => {
          console.log(res)
          if (res.statusCode === 200) {
            this.$localStore.set('roleJson', res.data)
            this.$message({
              message: '登录成功',
              center: true,
              type: 'success',
              // iconClass: 'activeRedIcon',
              // customClass: 'activeRed',
              duration: 3000
            })

            if(res.data.accountType === 2 && !res.data.merchant) {
              setTimeout(() => {

                this.$router.push({
                  path: '/merchant/merchantNew',
                  query: {
                    name: this.loginParams.accountName
                  }
                })
                // console.log(data)
                // console.log('rolesRouter.returnHomeRouter(res)', rolesRouter.returnHomeRouter(res))
                
              }, 1500)
              
            } else {

              setTimeout(() => {
                this.$router.replace(rolesRouter.returnHomePage(res.data))
              }, 1000);
              
            }
            
          } else {
            this.$message.error(res.statusMsg)
          }
        })
      }

      
    },
    // 注册
    registEvent() {
      if (this.checkDataReg()) {
        let _params = {
          accountName: this.registParam.accountName,
          password: this.registParam.password
        }
        this.$login('/accountCenter/account/signUp', _params).then(res => {
          if (res.statusCode === 200) {
            this.$message.success(res.statusMsg, '请登录此账号')
            this.changeFalse = true
            // this.$router.push({
            //   path: '/merchant/merchantNew',
            //   query: {
            //     name: this.loginParams.accountName
            //   }
            // })
          } else {
            this.$message.error(res.statusMsg)
          }
        })
      }
      
    },
    checkDataReg () {
      if (!this.registParam.accountName) {
        this.$common.error(this.$t('login.loginAccNameTip'))
        return false
      }
      if (!(/^[a-zA-Z0-9]{1,20}$/).test(this.registParam.accountName)) {
        this.$message.error(this.$t('login.registAccTip'))
        return false
      }
      if (!this.registParam.password) {
        this.$message.error(this.$t('login.loginPassTip'))
        return false
      }
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.registParam.password)) {
        this.$message.error(this.$t('login.registPassTip'))
        return false
      }
      if (this.registParam.password !== this.registParam.confirmPassword) {
        this.$message.error(this.$t('login.passNewPassTip'))
        return false
      }
      return true
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/login/iconfont.css";
@zs_color: #ae1e24; //主题颜色
/* 修改 element input样式*/
.el-input input{border:none;border-radius: 0;}
/deep/.el-input__inner{ 
  padding-left: 0 15 !important;
}
  .activeRed {
    background: @zs_color !important;
    color: #fff !important; 
    width: 100px !important;
    display: block !important;
    padding: 8px !important;
    border: #5b863b !important;
  }
  .activeRedIcon {
    display: none !important;
  }
  .login {
    position: relative;
    width: 100%;
    height: calc(100vh);
    .el-container {
      .el-header {
        // height: 70px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        background: #ffffff;
        z-index: 11;
        img {
          margin-left: 1.1rem;
          width: 3rem;
          height: 0.4rem;
        }
      }

      .login-content {
        position: absolute;
        top: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 70px);
      }

      .el-main {
        .login_menuImg {
          // width: 7.96rem;
          // margin-top: 30px;
          // margin: auto;
          padding-left: .5rem;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
            height: 6.1rem;

          }
        }

        .login-main {
          margin-top: 0.6rem;
          width: 100%;
          display: flex;
          justify-content: center;

          .login-form {
            width: 492px;
            .title {
              text-align: right;
              color: rgba(255,255,255,1);
              font-size: 24px;
              font-weight: 300;
              line-height: 33px;
            }

            .title2 {
              text-align: right;
              margin-right: 20px;
            }
            
            .login-form-form {
              margin-top: 26px;
              border-radius: 16px;
              background: #ffffff;
              .login-form-form-title {
                color: rgba(191,13,0,1);
                font-size: 24px;
                font-weight: 500;
                padding: 25px 0 15px 10px;
                border-bottom: 2px solid #ccc;
                margin-bottom: 10px;
              }
              // justify-content: center;
              // flex-direction: column;
              // align-items: center;
              .loginForm {
                width: 454px;
                // height: 422px;
                margin: 0 auto;
                text-align: center;
              }
            }

            .el-input {
              width: 330px;
              height: 52px;
              margin: 0 0.5rem;
              border-radius: 26px;
              border: 1px solid #ccc;
              // font-size: 16px;
              padding: 0 20px;
              line-height: 52px;
              // padding-left: 50px;
              &:focus {
                border: 1px solid #ae1e24;
              }
              &::-webkit-input-placeholder {
                color: #b3b3b3;
              }
              /deep/.el-input__prefix {
                margin-left: 18px;
                i  {
                  font-size: 22px;
                  color: @zs_color;
                }
              }
            }

            .loginForm-check {
              padding: 0 50px;
              display: flex;
              justify-content: space-between;
              /deep/.el-checkbox__label,
              .el-checkbox__input.is-checked + .el-checkbox__label {
                color: #ae1e24;
              }
              /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
              .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                background-color: #ae1e24;
                border-color: #ae1e24;
              }
              /deep/.el-checkbox__inner {
                border-color: #ae1e24;
              }
              .register {
                cursor: pointer;
                // float: right;
                // margin-right: 50px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                text-decoration: underline;
                color: @zs_color;
              }
            }

            .el-button {
              width: 320px;
              height: 52px;
              background-color: rgba(191,13,0,1);
              border-radius: 26px;
              color: #fff;
              font-size: 20px;
              margin: 30px 30px 18px;
            }

            .hinttitle {
              color: rgba(178,178,178,1);
              font-size: 12px;
            }
          }
        }
      }
        
    }
  }
  /deep/.el-input input {
    border: none !important;
    border-radius: 0 !important;
  }
  @keyframes move_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.55);
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1);
  }
}
.hinttitle {
  top: -18px;
  position: relative;
  color: #a7a3a3;
  left: -20px;
  font-size: 12px;
}
.waveWrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  bottom: 0;
}
.waveWrapperInner {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
}
.bgTop {
  z-index: 15;
  opacity: 0.1;
}
.bgMiddle {
  z-index: 10;
  opacity: 0.2;
}
.bgBottom {
  z-index: 5;
  opacity: 0.3;
}
.wave {
  position: absolute;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  transform-origin: center bottom;
}
.waveTop {
  background-size: 50% 200px;
  background-image: url("../../assets/images/login/wave-top.png");
}
.waveAnimation .waveTop {
  animation: move-wave 3s;
  -webkit-animation: move-wave 3s;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.waveMiddle {
  background-size: 50% 240px;
  background-image: url("../../assets/images/login/wave-mid.png");
}
.waveAnimation .waveMiddle {
  animation: move_wave 10s linear infinite;
}
.waveBottom {
  background-size: 50% 360px;
  background-image: url("../../assets/images/login/wave-bot.png");
}
.waveAnimation .waveBottom {
  animation: move_wave 15s linear infinite;
}


.langBox {
  width: 67px;
  height: 67px;
  position: fixed;
  right: 23px;
  top: 35px;
  z-index: 11;
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
</style>