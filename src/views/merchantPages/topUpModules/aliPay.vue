<template>
  <div>
    <page-content>
      <div class="content">
       
        <div v-html="weChatPayUrl"></div>
        <div style="font-size: 20px;">
          请静等几秒钟
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      voucherRatio: '',
      weChatPayUrl: '',
      authType: '',
      authShow: true,
      mid: '',
      sum: ''
    }
  },
  watch: {
    authShow (newV, oldV) {
      if (newV === false) {
        setTimeout(() => {
          this.$router.push({
            path: '/merchant/rechargeCenter'
          })
        }, 1000)
      }
    }
  },
  created() {
    this.mid = this.$route.query.mid
    this.sum = this.$route.query.sum
    this.authType = String(this.$route.query.type)
    this.getSumCode()
  },
  methods: {
    getSumCode () {
      if (this.authType === '2') {
        this.$post('/management_point/integralVoucher/voucher', {
          merchantId: this.mid,
          payType: 2,
          paySum: this.sum,
          auditRemark: 'https://zs.cntracechain.com/#/index/rechargeList'
        }).then(res => {
          if (res.code === 100) {
            this.voucherRatio = res.data.voucherRatio
            this.weChatPayUrl = res.data.payUrl
            this.$nextTick(() => {
              document.forms[0].submit()
            })
          }
        })
      } else {
        this.$post('/management_point/merchantAuth/applyAuth', {
          merchantId: this.mid,
          payType: 2,
          auditRemark: 'https://zs.cntracechain.com/#/index/rechargeList'
        }).then(res => {
          if (res.code === 100) {
            this.voucherRatio = res.data.voucherRatio
            this.weChatPayUrl = res.data.payUrl
            this.$nextTick(() => {
              document.forms[0].submit()
            })
          } else if (res.data === null) {
            this.authShow = false
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    padding: 20px;
    min-height: 300px;
  }
</style>