<template>
  <div class="">
    <page-content>
        <div class="wealhtHome">
          <div class="wealhtHomeTop">
            <div class="logo">
              <img v-if="info.pictureUrl" :src="info.pictureUrl" alt srcset />
              <!-- <img v-if="!info.pictureUrl" src="../../../assets/common/images/moren.png" alt srcset /> -->
            </div>
            <div class="context" style="font-size: 16px">
              <div class="mess">你好！{{info.accountName || ""}}，祝您开心每一天！</div>
              <div class="mess">
                {{info.description || '暂无'}}
                <span style="margin:0 15px">|</span>
                {{info.departmentName || "无"}}
              </div>
            </div>
            <div class="count">
              <div class="box">
                <span>商家数</span>
                <span style="font-size:24px">{{info.merchantCount || 0}}</span>
              </div>
              <div class="box">
                <span>本月追溯额</span>
                <span style="font-size:20px">{{month || 0}}</span>
              </div>
            </div>
          </div>
          <div class="wealhtHomeBottom">
            <div class="wealhtHomeBottomLeft" v-if="showType">
              <div class="header">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="待审核商家认证申请列表" name="first">
                    <div
                      class="row"
                      v-for="(item,index) in merchantList"
                      :key="index"
                      @click="()=>{
                        $router.push('/index/adminwealthList')
                      }"
                    >
                      <div class="image">
                        <img v-if="item.merchant_logo_url" :src="item.merchant_logo_url" />
                        <!-- <img v-else src="../../../assets/common/images/moren.png"/> -->
                      </div>
                      <div class="context">
                        <div class="zs">
                          {{item.merchant_name}}
                          <span style="margin-left:10px">发起了认证</span>
                          <!-- <span style="margin-left:15px">申请数量：</span>
                          <span class="bluefont">{{item.traceApplyCount || '0'}}</span>-->
                        </div>
                        <div
                          class="zs"
                        >申请时间：{{item.create_time | dateformat('YYYY/MM/DD HH:mm:ss')}}</div>
                      </div>
                      <div class="state">
                        <span>待审核</span>
                        <!-- <span v-if="item.traceCodeNumber">追溯码批次号 {{item.traceCodeNumber}}</span> -->
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="待审核转账积分充值列表" name="second">
                    <div
                      class="row"
                      v-for="(ite,index1) in integralList"
                      :key="index1"
                      @click="()=>{
                  $router.push('/index/adminwealthList')
                }"
                    >
                      <div class="image">
                        <img :src="ite.merchant_logo_url" alt srcset />
                      </div>
                      <div class="context">
                        <div class="zs">
                          {{ite.merchant_name}}
                          <span style="margin-left:10px">发起了充值</span>
                          <!-- <span style="margin-left:15px">申请数量：</span>
                          <span class="bluefont">{{item.traceApplyCount || '0'}}</span>-->
                        </div>
                        <div class="zs">申请时间：{{ite.create_time | dateformat('YYYY/MM/DD HH:mm:ss')}}</div>
                      </div>
                      <div class="state">
                        <span>待审核</span>
                        <!-- <span v-if="item.traceCodeNumber">追溯码批次号 {{item.traceCodeNumber}}</span> -->
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>

            <div class="sellerHomeBottomLeft" v-else>
              <div class="header">最新追溯申请记录</div>
              <div class="row" v-for="(item,index) in NewTraceRecord" :key="index">
                <div class="image">
                  <img :src="item.merchantLogo" alt />
                </div>

                <div class="context">
                  <div class="zs">
                    {{item.merchantName}}发起了追溯
                    <span style="margin-left:15px">申请数量：{{item.traceApplyCount || '0'}}</span>
                    <span class="bluefont"></span>
                  </div>
                  <div class="zs">申请时间：{{item.traceApplyDate | dateformat('YYYY/MM/DD HH:mm:ss')}}</div>
                </div>

                <div class="state">
                  <span>{{item.handleStatus}}</span>
                  <span v-if="item.traceCodeNumber">溯码批次号 {{item.traceCodeNumber}}</span>
                </div>
              </div>
            </div>
            <div class="setting" v-if="showType">
              <div class="setBox">
                <div class="toptitle">标签关联商品/新增追溯点扣除积分比例</div>
                <div class="ratio">
                  <div class="txt">1标签 = </div>
                  <div class="much">
                    <el-input v-model="label"></el-input>
                  </div>
                  <div class="txt">积分</div>
                  <div class="btn">
                    <el-button type="danger" @click="changelabel()">确 定</el-button>
                  </div>
                </div>
              </div>
              <!-- <div class="kong"></div> -->
              <div class="setBox">
                <div class="toptitle">积分金额换算比例：</div>
                <div class="ratio">
                  <div class="txt">1元 = </div>
                  <div class="much">
                    <el-input v-model="integral"></el-input>
                  </div>
                  <div class="txt">积分</div>
                  <div class="btn">
                    <el-button type="danger" @click="changeintegral()">确 定</el-button>
                  </div>
                </div>
              </div>
              <!-- <div class="kong"></div> -->
              <!-- <div class="setBox">
          <div class="toptitle">申请纸质标签超额度扣除积分：</div>
          <div class="ratio">
            <div class="txt">1标签=</div>
            <div class="much">
              <el-input v-model="quota"></el-input>
            </div>
            <div class="txt">积分</div>
            <div class="btn">
              <el-button type="danger" @click="changequota()">确 定</el-button>
            </div>
          </div>
              </div>-->
              <div class="setBox">
                <div class="toptitle">新建/编辑商品扣除积分：</div>
                <div class="ratio">
                  <div class="txt">1次 = </div>
                  <div class="much">
                    <el-input v-model="build"></el-input>
                  </div>
                  <div class="txt">积分</div>
                  <div class="btn">
                    <el-button type="danger" @click="changebuild()">确 定</el-button>
                  </div>
                </div>
              </div>
              <div class="setBox">
                <div class="toptitle">用户扫码扣除积分：</div>
                <div class="ratio">
                  <div class="txt">1次 = </div>
                  <div class="much">
                    <el-input v-model="scan"></el-input>
                  </div>
                  <div class="txt">积分</div>
                  <div class="btn">
                    <el-button type="danger" @click="changescan()">确 定</el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="wealhtHomeBottomRight">
        <div class="header">快速开始/便捷导航</div>

        <div
          v-if="showType"
          class="icon"
          @click="()=>{
            $router.push('/index/adminwealthList')
          }"
        >
          <div class="iconImage">
            <img src="../../../assets/common/images/chongzhi.png" alt srcset />
          </div>
          <span>认证记录审核</span>
        </div>
        <div
          class="icon"
          @click="()=>{
            $router.push('/index/adminwealthrecharge')
          }"
        >
          <div class="iconImage">
            <img src="../../../assets/common/images/chongzhi.png" alt srcset />
          </div>
          <span>充值记录审核</span>
        </div>

            </div>-->
          </div>
        </div>
    </page-content>
  </div>
</template>
<script>
import pageContent from "../../../components/content";
// import mystorage from '../../../assets/common/js/localstore'
export default {
  components: {
    pageContent,
  },
  data() {
    return {
      showType: true,
      // moren: 'this.src="' + require('../../../assets/common/images/moren.png') + '"', // 默认图片
      roleJson: {}, // 用户登录信息
      merchantId: "", // 用户ID
      month: "", // 本月追溯额
      info: {},
      integralList: [], // 待审核转账积分充值列表
      merchantList: [], // 待审核商家认证申请列表
      NewTraceRecord: [], // 最新追溯申请记录
      merchantType: "",
      activeName: "first",
      label: "", // 标签
      labelId: "", // 标签ID

      integral: "", // 积分
      integralId: "", // 积分ID

      quota: "", // 超额
      quotaId: "", // 超额ID

      build: "", // 新建
      buildId: "", // 新建ID

      scan: "", // 扫码
      scanId: "", // 扫码ID
    };
  },
  async created() {
    // this.roleJson = mystorage.get('roleJson')
    this.roleJson = this.$localStore.get("roleJson");
    if (this.roleJson.role.roleName === "ROLE_HEADQUARTERS_FINANCE") {
      this.showType = true;
      await this.getmerchantList();
      await this.getintegralDetail();
    } else {
      this.showType = false;
      this.getNewTraceRecord();
    }
    // this.merchantType = this.roleJson.merchant.merchantType
    // console.log(this.roleJson)
    // this.merchantId = Number(this.roleJson.id)
    // this.getpanduan()
    await this.getSellerMonth();
    await this.getintegralList();

    await this.getSellerHome();
  },
  //
  methods: {
    // 加盟商财务需要最新追溯申请记录
    getNewTraceRecord() {
      this.$get("/trace-api/trace/getNewTraceRecord").then((data) => {
        // console.log(data)
        this.NewTraceRecord = data.data;
      });
    },
    // 财务首页待审核积分充值
    getintegralList() {
      this.$get("/management_point/integralVoucher/homeAuditVoucherList", {
        pageNum: 1,
        pageSize: 10000000,
      }).then((data) => {
        if (data.code === 100) {
          this.integralList = data.data.list || [];
        } else {
          this.integralList = [];
        }
        // console.log(data)
      });
    },
    // 财务首页待审核认证
    getmerchantList() {
      this.$get("/management_point/merchantAuth/homeAuditAuthList", {
        pageNum: 1,
        pageSize: 1000000,
      }).then((data) => {
        // console.log(data)
        if (data.code === 100) {
          this.merchantList = data.data.list || [];
        } else {
          this.merchantList = [];
        }

        // console.log(this.merchantList)
      });
    },
    // 登录的信息
    getSellerHome() {
      this.$get("/back-end/homePage/getFinanceInfo").then((res) => {
        // console.log(res)
        this.info = res.data;
      });
    },
    //   获取本月追溯额
    getSellerMonth() {
      return new Promise((resolve, reject) => {
        this.$get("/trace-api/trace/getMonthTrace").then((res) => {
          // this.$common.get('/back-end/merchant/get?merchantId=30').then((res) => {
          //   console.log(res)
          this.month = res.data;
        });
        resolve(true);
      });
    },
    // 查询所有换算比例
    getintegralDetail() {
      this.$get(
        "/management_point/integralDeductRatio/queryConversionRatio"
      ).then((res) => {
        // console.log(res)
        if (Number(res.code) === 100) {
          let arr = res.data;
          // console.log(arr)
          this.label = arr[1].integralRatio;
          this.labelId = arr[1].integralDeductRatioId;

          this.integral = arr[0].integralRatio;
          this.integralId = arr[0].integralDeductRatioId;

          this.quota = arr[2].integralRatio;
          this.quotaId = arr[2].integralDeductRatioId;

          this.build = arr[3].integralRatio;
          this.buildId = arr[3].integralDeductRatioId;

          this.scan = arr[4].integralRatio;
          this.scanId = arr[4].integralDeductRatioId;
        } else {
          // this.$message.error(res.data.desc)
        }
      });
    },
    // 修改标签
    changelabel() {
      this.$confirm("此操作将影响到积分, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$get(
          "/management_point/integralDeductRatio/modifyConversionRatio?integralDeductRatioId=" +
            this.labelId +
            "&integralRatio=" +
            this.label
        ).then((res) => {
          if (Number(res.code) === 100) {
            this.$message({
              message: "更改成功",
              type: "success",
            });
          } else {
            this.$message.error("修改失败");
          }
        });
      });
    },
    // 修改积分
    changeintegral() {
      this.$confirm("此操作将影响到积分, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$get(
          "/management_point/integralDeductRatio/modifyConversionRatio?integralDeductRatioId=" +
            this.integralId +
            "&integralRatio=" +
            this.integral
        ).then((res) => {
          // console.log(res)
          if (Number(res.code) === 100) {
            this.$message({
              message: "更改成功",
              type: "success",
            });
          } else {
            this.$message.error("修改失败");
          }
        });
      });
    },
    // 修改超额
    changequota() {
      this.$confirm("此操作将影响到积分, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$get(
          "/management_point/integralDeductRatio/modifyConversionRatio?integralDeductRatioId=" +
            this.quotaId +
            "&integralRatio=" +
            this.quota
        ).then((res) => {
          // console.log(res)
          if (Number(res.code) === 100) {
            this.$message({
              message: "更改成功",
              type: "success",
            });
          } else {
            this.$message.error("修改失败");
          }
        });
      });
    },
    // 修改新建
    changebuild() {
      this.$confirm("此操作将影响到积分, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {});

      this.$get(
        "/management_point/integralDeductRatio/modifyConversionRatio?integralDeductRatioId=" +
          this.buildId +
          "&integralRatio=" +
          this.build
      ).then((res) => {
        // console.log(res)
        if (Number(res.code) === 100) {
          this.$message({
            message: "更改成功",
            type: "success",
          });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 修改扫码
    changescan() {
      this.$confirm("此操作将影响到积分, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$get(
          "/management_point/integralDeductRatio/modifyConversionRatio?integralDeductRatioId=" +
            this.scanId +
            "&integralRatio=" +
            this.scan
        ).then((res) => {
          // console.log(res)
          if (Number(res.code) === 100) {
            this.$message({
              message: "更改成功",
              type: "success",
            });
          } else {
            this.$message.error("修改失败");
          }
        });
      });
    },
  },
};
</script>
<style lang="less">
.wealhtHome {
  // padding-right: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  .wealhtHomeTop {
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    padding: 30px;
    align-items: center;
    .logo {
      text-align: center;
      width: 80px;
      height: 80px;
      border: 1px dotted #ccc;
      // position: relative;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        // margin: 10px 0;
      }
    }
    .context {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80px;
      margin-left: 40px;
      .mess {
        height: 30px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .shopName {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        text-decoration: underline;
        color: rgba(0, 74, 241, 1);
        cursor: pointer;
        margin: 0 15px;
      }
      .finish {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(241, 0, 0, 1);
      }
      .mess:last-child {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .count {
      float: right;
      display: flex;
      height: 80px;
      font-size: 18px;
      .box {
        display: flex;
        flex-direction: column;
        height: 80px;
        justify-content: space-between;
        // width: 100px;
        text-align: center;
        border-right: 1px solid #ccc;
        padding: 0 20px;
        .top {
          font-size: 16px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        .bottom {
          font-size: 24px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .box:last-child {
        border-right: none;
      }
    }
  }
  .wealhtHomeBottom {
    display: flex;
    width: 100%;
    // padding-right: 360px;
    margin-top: 40px;
    justify-content: space-between;

    .setting {
      flex: 4;
      display: flex;
      margin: 0 24px;
      height: 804px;
      flex-direction: column;
      .setBox {
        height: 20%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        // height: 128px;
        padding: 20px 4% 2% 4%;
        border-radius: 10px;
        .toptitle {
          font-size: 18px;
          font-weight: bold;
        }
        .ratio {
          display: flex;
          justify-content: left;
          align-items: center;
          position: relative;
          .txt {
            margin: 15px 2%;
            font-size: 18px;
          }
          .much {
            width: 30%;
            font-size: 16px;
          }
          .btn {
            position: absolute;
            right: 0;
            font-size: 16px;
          }
        }
      }
    }
    .wealhtHomeBottomLeft {
      height: 795px;
      overflow-y: scroll;
      flex: 7;
      box-sizing: border-box;
      padding: 0 30px;
      border: 1px solid #ccc;
      border-radius: 5px;
      .header {
        // border-bottom: 1px solid #ccc;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(174, 30, 36, 1);
        padding: 30px;
      }

      .el-tab-pane {
        .row {
          display: flex;
          padding: 40px 50px;
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
          }
          .zs {
            .bluefont {
              color: blue;
            }
          }
          .state {
            display: flex;
            flex-direction: column;
            text-align: right;
            justify-content: center;
            span {
              color: #f1000a;
              font-size: 18px;
            }
          }
        }
      }
      .el-tab-pane:last-child {
        border-bottom: 0px;
      }
    }
    .sellerHomeBottomLeft {
      margin-right: 32px;
      flex: 7;
      border: 1px solid #ccc;
      border-radius: 5px;
      height: 795px;
      overflow-y: scroll;
      .header {
        border-bottom: 1px solid #ccc;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(174, 30, 36, 1);
        //   margin: 15px 15px;
        margin: 15px;
        padding: 15px;
      }
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
    }
    .wealhtHomeBottomRight {
      flex: 2;
      border: 1px solid #ccc;
      border-radius: 5px;
      flex-direction: column;
      align-items: center;
      display: flex;
      .header {
        display: block;
        font-size: 14px;
        padding: 25px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(174, 30, 36, 1);
      }
      .icon {
        margin: 17px 0;
        display: flex;
        flex-direction: column;
        text-align: center;
        img {
        }
      }
    }
  }

  .el-tabs__item {
    font-size: 18px;
  }
  .el-tabs__item:hover {
    color: #ae1e24;
    // font-size: 20px;
  }
  .el-tabs__item.is-active {
    color: #ae1e24;
    // font-size: 20px;
  }
  .el-tabs__active-bar {
    background-color: #ae1e24;
  }
}
</style>
