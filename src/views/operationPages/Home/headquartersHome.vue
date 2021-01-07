<template>
  <div class="operatehome">
    <page-content :name="$t('home.merchantHomeTitle')">
      <div class="">
        <!-- 商家资料：logo 商家名称、商家地址、商家账号 -->
        <div class="operatehome-top">
          <div class="top-logo">
            <img v-if="info.pictureUrl" :src="info.pictureUrl" alt srcset />
            <img v-else src="../../../assets/images/merchantHome/moren.png" alt srcset />
            <!-- <img src="" alt=""> -->
          </div>

          <div class="top-con">
            <div class="mess">你好！{{info.accountName || ""}}，祝您开心每一天！</div>
            <div class="mess" style="margin-top: 20px">
              {{info.description || '暂无'}}
              <span style="margin:0 15px">|</span>
              {{info.departmentName || "无"}}
            </div>
          </div>
        </div>

        <!-- 商家的一些数据源： 商品数、积分数、本月的追溯额 -->
        <div class="merchantGrosslist">
          <div class="gross">
            <div class="gross-left">
              <img src="../../../assets/images/operationHome/商家.png" alt="" srcset="">
            </div>
            <div class="gross-right">
              <div class="gross-right-title">商家数</div>
              <div class="gross-right-num">{{info.merchantCount || 0}}</div>
            </div>
          </div>
          <div class="gross">
            <div class="gross-left" style="background: rgba(0,164,184,1)">
              <img src="../../../assets/images/merchantHome/zhuisu.png" alt="" srcset="">
            </div>
            <div class="gross-right" style="background: rgba(0,188,212,1)">
              <div class="gross-right-title">本月追溯额</div>
              <div class="gross-right-num">{{month || 0}}</div>
            </div>
          </div>
        </div>

        <!-- 消息列表展示 -->
        <div class="merchantFailarmys">
          <div class="merchantFailarmys-header">待审核的追溯申请</div>
          <div class="merchantFailarmys-list" v-if="failarmys.length > 0">
            <div class="row" v-for="(item, idx) in failarmys" :key="idx">
              <div class="image">
                <img :src="item.merchantLogo" alt="">
              </div>
              <div class="context">
                <div class="zs">
                  {{item.merchantName}}发起了追溯
                  <span style="margin-left:15px">申请数量：</span>
                  <span>{{item.traceApplyCount || 0}}</span>
                </div>

                <div>申请时间：{{$common.timeStamp(item.traceApplyDate,true)}}</div>
                
              </div>

              <div class="state">
                <span>{{item.handleStatus}}</span>
                <span v-if="item.traceCodeNumber">追溯码批次号 {{item.traceCodeNumber}}</span>
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
    <!-- <div class="rightnav">
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
    </div> -->
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
      info: {}, // 账号信息
      month: 0,
      failarmys: []
    }
  },
  created() {
    this.getAccountInfo()
    this.getSellerMonth()
    this.getNewTraceRecord()
  },
  methods: {
    // 获取账号信息
    getAccountInfo() {
      this.$get('/back-end/homePage/getOperationInfo').then(res => {
        this.info = res.data
      })
    },
    // 获取本月所有商家的追溯额
    getSellerMonth() {
      this.$get('/trace-api/trace/getMonthTrace').then(res => {
        this.month = res.data
      })
    },
    // 获取待审核的追溯列表
    getNewTraceRecord () {
      this.$get('/trace-api/trace/getNewTraceRecord').then(data => {
        // console.log(data)
        this.failarmys = data.data
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .operatehome {
    .operatehome-top {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .top-logo {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #cccccc;
        }
      }
      .top-con {
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .mess {
          line-height: 22px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(51,51,51,1);
        }
      }
    }

    .merchantGrosslist {
      display: flex;
      margin-top: 30px;
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

        .row {
          display: flex;
          padding: 20px;
          border-bottom: 1px solid #ccc;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);

          .image {
            width: 60px;
            height: 60px;
            border: 1px dotted #ccc;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .context {
            flex: 2;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            padding-left: 25px;
            .zs {
                .bluefont {
                    color: blue;
                }
            }
          }

          .state {
            display: flex;
            flex-direction: column;
            text-align: right;
          }
        }

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
  }
</style>