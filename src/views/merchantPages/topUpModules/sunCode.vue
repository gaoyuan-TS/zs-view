<template>
  <div>
    <page-content>
      <div class="content">
        <div class="suncode">
          <div class="title" v-if="authType === 1">-认证支付-</div>
          <div class="title" v-if="authType === 2">-积分充值-</div>
          <div class="con">
            <div class="con-1" v-if="authType === 2">
              <div class="con-1-title">实付金额</div>
              <div class="con-1-sum">￥{{sum}}</div>
            </div>
            <div class="con-2">请在5分钟内完成支付，否则可能导致购买失败</div>
            <div class="con-sum">
              <div id="sumCode"></div>
              <div class="con-status" v-if="msg === 'true'">
                <div class="con-status-title">
                  <img src="../../../assets/images/codeCenter/paytrue.png" alt="">
                  <!-- <p>已完成支付</p>
                  <p>稍后会自动跳转页面</p> -->
                </div>
              </div>
            </div>

            <div  class="con-3" v-if="msg === 'false'">
              <div>
                请使用微信扫描
              </div>
              <div>
                二维码以完成支付
              </div>
            </div>
            <div  class="con-3" v-else>
              <div>已完成支付</div>
              <div>稍后会自动跳转页面</div>
            </div>
          </div>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content"
import QRCode from 'qrcodejs2'
export default {
  components: {
    pageContent
  },
  data() {
    return {
      authType: '',
      mid: '',
      sum: '',
      voucherRatio: '',
      weChatPayUrl: '',
      merchantAuthId: '',
      websocket: null,
      dataText: '',
      timeId: '',
      msg: 'false'
    }
  },
  watch: {
    msg (newV, oldV) {
      if (newV === 'true') {
        clearInterval(this.timeId)
        setTimeout(() => {
          this.$router.push({
            path: '/merchant/rechargeCenter'
          })
        }, 4000)
        
        // alert(this.msg)
      }
    }
  },
  created() {
    this.authType = Number(this.$route.query.type)
    let auth = JSON.parse(window.localStorage.getItem('Auth'))
    console.log(auth)
    // if (auth) {
    this.mid = auth.mid
    if (this.authType === 2) {
      this.sum = auth.sum
    }
    this.vid = auth.vid
    // }
    setTimeout(() => {
      this.setqrcode(auth.payUrl)
    }, 300)

    this.timeId = setInterval(this.getPayStatus, 4000)
  },
  methods: {
    getPayStatus () {
      // console.log('22222')
      if (this.authType === 2) {
        this.$get('/management_point/integralVoucher/queryVoucherPayStatus', {
          voucherId: this.vid
        }).then(res => {
          // console.log(res)
          if (res.code === 100) {
            this.msg = res.data
          }
        })
      } else {
        this.$get('/management_point/merchantAuth/queryAuthPayStatus', {
          authId: this.vid
        }).then(res => {
          if (res.code === 100) {
            this.msg = res.data
          }
        })
      }
    },
    setqrcode (text) {
      let qrcode = new QRCode('sumCode', {
        width: 200,
        height: 200,
        text: text
        // colorDark: '#ccc',
        // colorLight: 'yellow'
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timeId)
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    padding: 20px;
    min-height: 500px;

    .suncode {
      .title {
        font-size: 16px;
        padding: 30px 0 10px 0;
        color: rgba(51,51,51,1);
        font-weight:600;
        text-align: center;
      }

      .con {
        display: flex;
        flex-direction: column;
        align-items:  center;

        .con-1 {
          display: flex;
          line-height: 40px;
          .con-1-title {
            font-size: 14px;
          }
          .con-1-sum {
            margin-left: 18px;
            color: #AE1E24;
            font-size: 18px;
            font-weight: bold;
          }
        }

        .con-2 {
          margin-top: 10px;
          margin-bottom: 20px;
          font-size: 12px;
          color: #333333;
        }

        .con-sum {
          padding: 6px;
          border:1px solid rgba(174,30,36,1);
          position: relative;
        }

        .con-status {
          position: absolute;
          background: rgba(204, 204, 204, 0.8);
          // fill-opacity: .2;
          top: 0;
          left: 0;
          width: 212px;
          height: 212px;
          // width: 100%;
          // height: 100%;
          .con-status-title {
            // margin: auto;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // width: 120px;
            // height: 60px;
            border-radius: 9px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 222;
            transform: translate(-50%, -50%);
            // background: #ffff;
            img {
              width: 68px;
              height: 72px;
            }
          }
        }
        .con-3 {
          margin-top: 22px;
          font-size: 14px;
          text-align:  center;
        }
      }
    }
  }
</style>