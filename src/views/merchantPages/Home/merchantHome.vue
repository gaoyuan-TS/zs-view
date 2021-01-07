<template>
  <div class="merchanthome">
    <page-content :name="$t('home.merchantHomeTitle')">
      <div>
        <!-- 商家资料：logo 商家名称、商家地址、商家账号 -->
        <div class="merchantDetail">
          <div class="merchant_logo">
            <img v-if="merchnatInfo.merchantLogo" :src="merchnatInfo.merchantLogo" alt="" srcset="">
            <img v-else src="../../../assets/images/merchantHome/moren.png" alt srcset />
          </div>

          <div class="merchant_con">
            <div class="mess">
              {{$t('home.merchantHello')}} {{merchnatInfo.merchantName}}，{{$t('home.happyDay')}}
              <div class="mess_info" @click="goMerchantDetail">
                <img style="width: 20px; height: 20px" src='../../../assets/images/merchantHome/ziliao.png' alt="" srcset="">
                <span>{{$t('home.mess_info')}}</span>
              </div>
            </div>
            <div class="account">{{merchnatInfo.merchantContact}}</div>
            <div class="address">
              <span style="font-size: 16px">{{$t('home.merchantAddress')}}：</span>
              <span style="font-size: 14px">{{merchnatInfo.merchantArea}}</span>
            </div>
          </div>
        </div>

        <!-- 商家的一些数据源： 商品数、积分数、本月的追溯额 -->
        <div class="merchantGrosslist">
          <div class="gross">
            <div class="gross-left">
              <img src="../../../assets/images/merchantHome/jife.png" alt="" srcset="">
            </div>
            <div class="gross-right">
              <div class="gross-right-title">{{$t('home.merchantIntegral')}}</div>
              <div class="gross-right-num">{{merchnatInfo.merchantCoin || 0}}</div>
            </div>
          </div>

          <div class="gross">
            <div class="gross-left" style="background: rgba(0,164,184,1)">
              <img src="../../../assets/images/merchantHome/shangpin.png" alt="" srcset="">
            </div>
            <div class="gross-right" style="background: rgba(0,188,212,1)">
              <div class="gross-right-title">{{$t('home.merchantCommodityNum')}}</div>
              <div class="gross-right-num">{{merchnatInfo.goodsCount || 0}}</div>
            </div>
          </div>

          <div class="gross">
            <div class="gross-left" style="background: rgba(115,174,47,1)">
              <img src="../../../assets/images/merchantHome/zhuisu.png" alt="" srcset="">
            </div>
            <div class="gross-right" style="background: rgba(139,195,74,1)">
              <div class="gross-right-title">{{$t('home.merchantTraceNum')}}</div>
              <div class="gross-right-num">{{MonthTraceNum || 0}}</div>
            </div>
          </div>
        </div>

        <!-- 消息列表展示 -->
        <div class="merchantFailarmys">
          <div class="merchantFailarmys-header">{{$t('home.merchantNewsTitle')}}</div>
          <div class="merchantFailarmys-list" v-if="failarmys.length > 0">
            <div class="merchantFailarmys-list-item" v-for="(item, idx) in failarmys" :key='idx'>
              <div class="merchantFailarmys-list-item-title">
                <!-- Top-up integral -->
                {{item.titleType === 1 ? $t('home.merchantTrace') : item.titleType === 2 ? $t('home.merchantNewsIntegral') : $t('home.merchantNewCer')}}
              </div>
              <div class="merchantFailarmys-list-item-bottom">
                <div class="merchantFailarmys-list-item-bottom-logo">
                  <img :src="merchnatInfo.merchantLogo" alt="" srcset="">
                </div>
                <div class="list-item-bottom-center">
                  <div class="list-item-bottom-center-top" v-if="item.titleType === 2">
                    <div v-if="item.getIntegral" style="margin-right: 30px">{{$t('home.merchantNewsIntegralNum')}}{{item.getIntegral}}</div>
                    <div>{{$t('home.merchantNewsIntegralAmonut')}}{{item.paySum}}</div>
                  </div>
                  <div class="list-item-bottom-center-top" v-if="item.titleType === 3">
                    <div>{{$t('home.merchantNewsCerAmount')}}{{item.authSum}}</div>
                    <!-- <div>{{$t('home.merchantNewsIntegralAmonut')}}：{{item.paySum}}</div> -->
                  </div>
                  <div class="list-item-bottom-center-date">{{$t('home.merchantNewsDate')}}{{item.createTime}}</div>
                  
                </div>
                <div class="list-item-bottom-center-right" style="margin-left: 16px">
                  <div style="color:#05DB00" v-if="item.status==='已通过'">{{$t('home.merchantNewsStatus1')}}</div>
                  <div style="color:red" v-if="item.status==='待审核'">{{$t('home.merchantNewsStatus2')}}</div>
                  <div style="color:red" v-if="item.status==='已撤回'">{{$t('home.merchantNewsStatus3')}}</div>
                  <div style="color:red" v-if="item.status==='已拒绝'">{{$t('home.merchantNewsStatus4')}}</div>
                  <div v-if="item.titleType === 1 && item.number">{{item.number}}</div>
                  <div v-if="item.remark">
                    {{$t('home.reason')}}：{{item.remark}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="merchantFailarmys-list no-data" v-else>
            暂无数据
          </div>
        </div>
      </div>
    </page-content>

    <!-- 右边导航栏 -->
    <div class="rightnav">
      <div class="active">
        Quick start / Convenient navigation
      </div>
      <div class="rightnav-item rightnav-item1">
        Create new trace
      </div>
      <div class="rightnav-item rightnav-item2">
        Create new commodity
      </div>
      <div class="rightnav-item rightnav-item3">
        Integral recharge
      </div>
      <div class="rightnav-item rightnav-item4">
        Create new agent
      </div>
    </div>
    <div></div>
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
      merchnatInfo: {},
      merchantId: '',
      MonthTraceNum: '',
      failarmys: []
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getMerchantDetail()
    this.getMonthTraceNum()
    this.getNewTraceRecord()
  },
  methods: {
    // 获取商家一些资料
    getMerchantDetail() {
      this.$get('/back-end/homePage/getMerchantInfo').then(res => {
        this.merchnatInfo = res.data
        this.getNewQueryCertify()
        this.getMerchantAuth()
      })
    },
    // 获取本月追溯额
    getMonthTraceNum() {
      this.$get('/trace-api/trace/getMonthTrace').then(res => {
        this.MonthTraceNum = res.data
      })
    },
    // 获取追溯记录
    getNewTraceRecord() {
      this.$get('/trace-api/trace/getNewTraceRecord').then(res => {
        let _data = res.data
        console.log(_data)
        _data.forEach(item => {
          this.failarmys.push({
            titleType: 1,
            createTime: this.$moment(item.traceApplyDate).format('YYYY-MM-DD HH:mm:ss'),
            status: item.handleStatus,
            traceApplyCount: item.traceApplyCount,
            remark: item.traceRefuseRemark,
            number: item.traceCodeNumber
          })
        });
        this.failarmys = this.ReverseRankingDate(this.failarmys, 'createTime')
      })
    },
    // 获取积分充值记录
    getNewQueryCertify() {
      this.$get('/management_point/integralVoucher/queryCertifyVoucherByMerchantId', {
        merchantId: this.merchantId
      }).then(res => {
        let _data = res.data
        if (_data) {
          _data.forEach((item) => {
            this.failarmys.push({
              titleType: 2,
              createTime: this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
              status: item.auditStatusCN,
              traceApplyCount: '',
              remark: item.auditRemark,
              number: '',
              paySum: item.paySum,
              getIntegral: item.getIntegral
            })
          })
        } else {
          
        }
        
      })
    },
    // 获取认证记录
    getMerchantAuth() {
      this.$get('/management_point/merchantAuth/queryAuthByMerchantId', {
        merchantId: this.merchantId
      }).then(res => {
        let _data = res.data
        if (_data) {
          _data.forEach((item) => {
            this.failarmys.push({
              titleType: 3,
              createTime: this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
              status: item.auditStatusCN,
              traceApplyCount: '',
              remark: item.auditRemark,
              number: '',
              authSum: item.authSum
            })
          })
        } else {
        }
        
      })
    },
    // 按时间排序
    ReverseRankingDate (data, p) {
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
          // console.log(Date.parse(data[j][p]))
          if (Date.parse(data[j][p]) < Date.parse(data[j + 1][p])) {
            var temp = data[j]
            data[j] = data[j + 1]
            data[j + 1] = temp
          }
        }
      }
      return data
    },
    // 跳转到商家资料页
    goMerchantDetail() {
      this.$router.push('/merchant/merchantDetail')
    }
  }
}
</script>

<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色

  .merchanthome {
    .merchantDetail {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .merchant_logo {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #cccccc;
        }
      }
      .merchant_con {
        margin-left: 24px;
        .mess {
          line-height: 22px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(51,51,51,1);
          .mess_info {
            margin-left: 30px;
            display: inline-block;
            color: rgba(239,66,53,1);
            text-decoration: underline;
            cursor: pointer;
            // line-height: 22px;
            img {
              vertical-align: middle;
            }
            // span {
            //   line-height: 20px;
            //   display: inline-block;
            // }
          }
        }
        .account {
          margin-top: 5px;
          line-height: 20px;
          color: rgba(51,51,51,1);
          font-size: 14px;
          font-weight: 500;
        }
        .address {
          margin-top: 5px;
          line-height: 22px;
          font-size: 16px;
          color: rgba(51,51,51,1);
          font-weight: 500;
        }
      }
    }

    .merchantGrosslist {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .gross {
        display: flex;
        align-items: center;
        width: 3.4rem;
        height: 0.8rem;
        .gross-left {
          width: 0.8rem;
          height: 0.8rem;
          background: rgba(205,11,77,1);
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.6rem;
            height: 0.6rem;
          }
        }
        .gross-right {
          flex: 1;
          background: rgba(233,30,99,1);
          color: rgba(255,255,255,1);
          height: 0.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 0.14rem;
          .gross-right-title {
            font-size: 0.16rem;
          }
          .gross-right-num {
            font-size: 0.28rem;
          }
        }
      }
    }

    .merchantFailarmys {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px 32px;
      .merchantFailarmys-header {
        color: rgba(51,51,51,1);
        font-size: 16px;
        font-weight: 500;
      }

      .merchantFailarmys-list {
        margin-top: 16px;
        border: 1px solid #dddddd;
        max-height: 500px;
        min-height: 300px;
        overflow: auto;
        .merchantFailarmys-list-item {
          padding: 14px 50px 32px 24px;
          border-bottom: 1px solid #dddddd;
          &:last-child {
            border: none;
          }
          .merchantFailarmys-list-item-title {
            color: rgba(239,66,53,1);
            font-size: 16px;
            font-weight: 500;
          }

          .merchantFailarmys-list-item-bottom {
            margin-top: 16px;
            display: flex;
            // justify-content: space-between;
            // align-items: center;
            // height: 60px;
            .merchantFailarmys-list-item-bottom-logo {
              
              display: flex;
              align-items: center;
              img {
                width: 60px;
              height: 60px;
                border-radius: 50%;
              }
            }

            .list-item-bottom-center {
              display: flex;
              flex-direction: column;
              // justify-content: space-around;
              margin-left: 18px;
              .list-item-bottom-center-top {
                font-size: 14px;
                color: rgba(51,51,51,1);
                display: flex;
                margin-top: 16px;
              }
              .list-item-bottom-center-date {
                margin-top: 16px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(133,133,133,1);
              }
              
            }

            .list-item-bottom-center-right {
              font-size: 14px;
              flex: 1;
              text-align: right;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
          }
        }
      }

      .no-data {
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }


    .rightnav {
      position: fixed;
      right: 0;
      top: 297px;
      width: 105px;
      background: rgba(255,255,255,1);
      box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.2); 

      .active {
        background: rgba(239,66,53,1);
        color: #ffffff !important;
        font-size: 14px;
        padding: 10px 6px 10px 10px;
        // margin: ;
      }

      .rightnav-item {
        font-size: 14px;
        font-weight: 500;
        // text-align: center;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        margin: 0 10px 0 15px;
        padding: 16px 0 12px;
        color: rgba(239,66,53,1);
        border-bottom: 1px solid rgba(216,216,216,1);
        &:last-child {
          border: none;
        }
        // div {
          
        // }
      }
      .rightnav-item1 {
        color: rgba(233,30,99,1);
      }
      .rightnav-item2 {
        color: rgba(0,188,212,1);
      }
      .rightnav-item3 {
        color: rgba(139,195,74,1);
      }
      .rightnav-item4 {
        color: rgba(245,166,35,1);
      }
    }
  }
  .merchantFailarmys-list::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    // height: 1px;
  }
  .merchantFailarmys-list::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 6px;
    background-color: @zs_color;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
</style>