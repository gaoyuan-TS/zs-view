<template>
  <div>
    <page-content>
      <div class="content">
        <div class="buypoints">
          <div class="title">--{{$t('topUp.payPage.Recharge')}}--</div>
          <!-- 选择充值的金额 -->
          <div class="sum-2">
            <div class="sum-choice">
              <div
                class="sum-item"
                :class="paySum === 100 ? 'sun-item-active' : 'sum-item-bod'"
                @click="selectSum(100.00)"
              >
                <div class="integral">
                  <!-- 10000积分 -->
                  {{integralRatio * 100}} {{$t('topUp.payPage.integral')}}
                </div>
                <div class="sum">￥100.00</div>
              </div>
              <div
                class="sum-item"
                :class="paySum === 300 ? 'sun-item-active' : 'sum-item-bod'"
                @click="selectSum(300.00)"
              >
                <div class="integral">
                  <!-- 30000积分 -->
                  {{integralRatio * 300}} {{$t('topUp.payPage.integral')}}
                </div>
                <div class="sum">￥300.00</div>
              </div>
              <div
                class="sum-item"
                :class="paySum === 500 ? 'sun-item-active' : 'sum-item-bod'"
                @click="selectSum(500.00)"
              >
                <div class="integral">
                  <!-- 50000积分 -->
                  {{integralRatio * 500}} {{$t('topUp.payPage.integral')}}
                </div>
                <div class="sum">￥500.00</div>
              </div>
              <div
                class="sum-item"
                :class="paySum === 1000 ? 'sun-item-active' : 'sum-item-bod'"
                @click="selectSum(1000.00)"
              >
                <div class="integral">
                  <!-- 100000积分 -->
                  {{integralRatio * 1000}} {{$t('topUp.payPage.integral')}}
                </div>
                <div class="sum">￥1000.00</div>
              </div>
              <div
                class="sum-item"
                :class="paySum === '其他' ? 'sun-item-active' : 'sum-item-bod'"
                @click="selectSum('其他')"
              >
                <div class="integral">{{$t('topUp.payPage.other')}}</div>
                <div style="display: flex;align-items: center;">
                  <div style="margin-right: 8px;font-size: 14px;text-align: right;">
                    <div>{{$t('topUp.payPage.enterRechargingAmout')}}</div>
                    <!-- <div style="font-size: 10px">Please enter the recharging amount</div> -->
                  </div>
                  <!-- <div> -->
                  <!-- <input /> -->
                  <el-input
                    type="number"
                    :disabled="paySum === '其他'?false:true"
                    style="width: 120px"
                    :placeholder="$t('topUp.payPage.enterRechargingAmout')"
                    v-model="input"
                    clearable
                  ></el-input>
                  <!-- </div> -->
                </div>
                <div class="sum">￥{{input || 0}}</div>
              </div>
            </div>
          </div>
          <!-- 选择支付方式 -->
          <div class="sum-3">
            <div class="sum-3-left">
              <!-- 英文版去掉微信与支付宝支付 -->
              <div class="sum-3-left-1">
                {{$t('topUp.payPage.payMethod')}}：
                <div class="item" :class="paytype === 1 ? 'active' : ''" @click="paytype = 1">
                  <img src="../../../assets/images/recharge/wechat.jpg" alt srcset />
                  {{$t('topUp.payPage.payMethod')}}
                  <span class="right"></span>
                  <i class="el-icon-check" v-if="paytype === 1"></i>
                </div>
                <div class="item" :class="paytype === 2 ? 'active' : ''" @click="paytype = 2">
                  <img src="../../../assets/images/recharge/pay.jpg" alt srcset />
                  {{$t('topUp.payPage.aliPay')}}
                  <span class="right"></span>
                  <i class="el-icon-check"></i>
                </div>
              </div>
              <div class="text">
                {{$t('topUp.payPage.transferAcc')}}：
                <span
                  class="evidence-cli"
                  @click="authPayCertifyUpload = true"
                >{{$t('topUp.payPage.uploadPaymentVoucher')}}</span>
              </div>
              <div class="text">
                <p>{{$t('topUp.payPage.companyName')}}：广州追溯信息科技有限公司</p>
                <p>{{$t('topUp.payPage.taxPayerNumber')}}：91440101MA59FERL8G</p>
                <p>{{$t('topUp.payPage.bankAcc')}}：3602841509200074289</p>
                <p>{{$t('topUp.payPage.bankName')}}：中国工商银行广州兴华支行</p>
              </div>
            </div>
            <div class="sum-3-right">
              <div class="sum-3-right-sum">
                {{$t('topUp.payPage.total')}}：￥
                <span>{{_sum || 0}}</span>
              </div>
              <div>
                <div class="sum-button" @click="yzmShow = true">{{$t('topUp.payPage.immediately')}}</div>
              </div>
            </div>
          </div>

          <el-dialog max-width="20%" center :visible.sync="authPayCertifyUpload">
            <div slot="title" style="font-size: 16px">{{$t('topUp.payPage.uploadCertificate')}}</div>
            <el-upload
              class="avatar-uploader"
              action="https://zs.cntracechain.com/imageService/image/add"
              :show-file-list="false"
              name="file"
              :data="upData"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" title="点击图片更改" />
              <i v-else class="el-icon-plus avatar-uploader-icon">
                <!-- <div>点击图片更改</div> -->
              </i>
            </el-upload>
            <div class="evidence-button">
              <el-button
                type="primary"
                @click="buttonCerti"
                :disabled="payCertifyFile ? false: true"
              >{{$t('button.determine')}}</el-button>
            </div>
          </el-dialog>

          <!-- 输入验证码的弹窗 -->
          <el-dialog width="40%" center :visible.sync="yzmShow">
            <div slot="title" style="font-size: 16px">{{$t('topUp.payPage.enterConfirmationCode')}}</div>
            <!-- <div class="join_formitem">
              <div class="captcha">
                <input
                  type="text"
                  :placeholder="$t('topUp.payPage.enterConfirmationCode')"
                  class="yanzhengma_input"
                  v-model="picLyanzhengma"
                />
                <input type="button" @click="createCode" class="verification" v-model="checkCode" />
              </div>
            </div> -->

            <div class="yzmshow-con">
              <div class="item-con">
                <div style="flex: 0.8">
                  <el-input :placeholder="$t('topUp.payPage.enterConfirmationCode')" v-model="picLyanzhengma"></el-input>
                </div>
                <div class="code-button" style="flex: 0.2" @click="createCode">{{checkCode}}</div>
              </div>
            </div>
            <div slot="footer">
              <el-button type="primary" @click="verification" :disabled="picLyanzhengma ? false: true">{{$t('button.determine')}}</el-button>
            </div>
            <!-- <div class="evidence-button">
              <el-button
                type="primary"
                @click="verification"
                :disabled="picLyanzhengma ? false: true"
              >{{$t('button.determine')}}</el-button>
            </div> -->
          </el-dialog>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import exifs from "../../../assets/js/exifs.js";
import pageContent from "../../../components/content";
export default {
  data() {
    return {
      input: "",
      paySum: 100,
      paytype: 1,
      mid: "",
      authPayCertifyUpload: false,
      imageUrl: "",
      payCertifyFile: "",
      upData: {
        imgSystemId: "payCertifyId",
        imgSpecificUniqueValue: "payCertifyValue",
      },
      checkCode: "",
      picLyanzhengma: "",
      yzmShow: false,
      integralRatio: "",
    };
  },
  components: {
    pageContent,
  },
  created() {
    this.mid = this.$route.query.mid;
    this.getintegralDetail();
    this.createCode();
  },
  computed: {
    _sum() {
      return this.paySum === "其他" ? this.input : this.paySum;
    },
  },
  methods: {
    // 获取充值积分的比例
    getintegralDetail() {
      this.$get(
        "/management_point/integralDeductRatio/queryConversionRatio"
      ).then((res) => {
        if (Number(res.code === 100)) {
          let _data = res.data;
          _data.forEach((item) => {
            if (item.integralDeductRatioDesciption === "积分金额换算比例") {
              this.integralRatio = item.integralRatio;
            }
          });
        }
      });
    },
    // 生成随机验证码
    createCode() {
      // 先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      this.picLyanzhengma = "";
      // 验证码的长度
      var codeLength = 4;
      // 随机数
      var random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      for (var i = 0; i < codeLength; i++) {
        // 取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36);
        // 根据索引取得随机数加到code上
        this.code += random[index];
      }
      // 把code值赋给验证码
      this.checkCode = this.code;
    },
    verification() {
      if (this.picLyanzhengma.toUpperCase() === this.checkCode.toUpperCase()) {
        this.toSumCode();
        this.yzmShow = false;
        this.createCode();
      } else {
        this.$message.error("输入的验证码不对！");
        this.createCode();
      }
    },
    selectSum(n) {
      this.paySum = n;
    },
    // 图片上传之前的钩子
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "png";
      const extension2 = testmsg === "jpg";
      const extension3 = testmsg === "jpeg";
      const isLt2M = file.size / 1024 / 1024 < 30;

      if (!extension && !extension2 && !extension3) {
        this.$message.error(this.$t('uploadimg.format'));
        return false;
      } else {
        return new Promise((resolve) => {
          exifs.getOrientation(file).then((orient) => {
            console.log(orient, "Orient");
            if (orient !== "" && orient !== 1 && orient !== undefined) {
              // console.log('1111111')
              let reader = new FileReader();
              let img = new Image();
              reader.onload = (e) => {
                // console.log('2222222')
                img.src = e.target.result;
                img.onload = function () {
                  // console.log('333333')
                  const data = exifs.rotateImage(
                    orient,
                    img,
                    img.width,
                    img.height
                  );
                  const newFile = exifs.dataURLtoFile(data, file.name);
                  resolve(newFile);
                };
              };
              reader.readAsDataURL(file);
            } else {
              resolve(file);
            }
          });
        });
      }
    },
    // 凭证图上传
    handleAvatarSuccess(res, file) {
      if (Number(res.code === 200)) {
        this.imageUrl = res.data.imgUrl;
        this.payCertifyFile = res.data.imgUrl;
      } else {
        this.$common.error(res.data.desc);
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
      // // console.log('res:---', res)
      // this.payCertifyFile = res.data.imgUrl
    },
    buttonCerti() {
      let _sum = "";
      if (this.paySum === "其他") {
        _sum = this.input;
      } else {
        _sum = this.paySum;
      }
      if (_sum !== 0) {
        this.$confirm("确定是充值￥" + _sum + "金额的转账支付凭证吗?", this.$t('confirm.tip'), {
          confirmButtonText: this.$t('button.determine'),
          cancelButtonText: this.$t('button.cancel'),
          type: "warning",
        })
          .then(() => {
            // console.log(this.paySum)
            if (this.payCertifyFile) {
              this.$post(
                "/management_point/integralVoucher/addVoucherCertify",
                {
                  merchantId: this.mid,
                  payCertify: this.payCertifyFile,
                  paySum: _sum,
                }
              ).then((res) => {
                if (res.code === 100) {
                  this.$message.success(this.$t('topUp.payPage.transferUploadSucc'));
                  this.authPayCertifyUpload = false;
                  this.payCertifyFile = "";
                } else {
                  this.$message.error(this.$t('topUp.payPage.transferUploadErr'));
                }
              });
            } else {
              this.$message.error(this.$t('topUp.payPage.uploadTransImg'));
            }
            // this.$common.success('上传成功！')
          })
          .catch(() => {});
      } else {
        this.$message.error(this.$t('topUp.payPage.sum0Tip'));
      }
    },
    // 跳转到显示二维码的页面
    toSumCode() {
      let _sum = "";
      if (this.paySum === "其他") {
        _sum = this.input;
      } else {
        _sum = this.paySum;
      }
      if (_sum === 0) {
        this.$message.error(this.$t('topUp.payPage.sum0Tip'));
      } else {
        if (this.paytype === 1) {
          this.$post("/management_point/integralVoucher/voucher", {
            merchantId: this.mid,
            payType: 3,
            paySum: _sum,
          }).then((res) => {
            if (res.code === 100) {
              window.localStorage.setItem(
                "Auth",
                JSON.stringify({
                  payUrl: res.data.payUrl,
                  vid: res.data.integralVoucherId,
                  sum: _sum,
                  mid: this.mid,
                })
              );
              this.$router.push({
                path: "/merchant/suCode",
                query: {
                  type: 2,
                },
              });
              // this.merchantAuthId = res.data.data.merchantAuthId
              // this.setqrcode(res.data.data.payUrl)
            }
          });
        } else {
          this.$router.push({
            path: "/merchant/alipay",
            query: {
              type: 2,
              sum: _sum,
              mid: this.mid,
            },
          });
          // window.open(routeUrl.href, '_blank')
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
// /deep/
// .el-input__inner {
//   height: 30px !important;
//   line-height: 30px !important;
// }
.content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    // height: 7.82rem;
    padding: 20px;
}

.buypoints {
  width: 70%;
  margin: auto;
  border: 1px solid rgba(204, 204, 204, 1);
  display: flex;
  // align-items: center;
  flex-direction: column;
  .title {
    padding: 30px 0 10px 0;
    color: rgba(51, 51, 51, 1);
    font-weight: 600;
    text-align: center;
  }
  .sum-2 {
    padding: 12px 0 30px 0;
    align-self: center;
  }
  .sum-choice {
    width: 500px;
    .sum-item {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sum {
        color: #e20009;
        font-size: 14px;
      }
      .integral {
        color: #333333;
        font-size: 14px;
      }
    }
    .sum-item-bod:first-child {
      border-top: 1px solid #cccccc;
    }
    .sum-item-bod {
      border-bottom: 1px solid #cccccc;
      border-left: 1px solid #cccccc;
      border-right: 1px solid #cccccc;
    }
    .sun-item-active {
      border: 1px solid rgba(226, 0, 9, 1);
    }
  }
  .sum-3 {
    font-size: 14px;
    background: #fefcef;
    padding: 12px 15px 0 12px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    .sum-3-left {
      .sum-3-left-1 {
        .item {
          cursor: pointer;
          margin: 0 15px;
          img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
          }
          vertical-align: middle;
          display: inline-block;
          position: relative;
          padding: 0 10px;
          height: 34px;
          width: 120px;
          font-size: 12px;
          line-height: 34px;
          border: 1px solid #ccc;
          overflow: hidden;
          border-radius: 5px;
          // text-align: center;
          &.active {
            border: 1px solid #ae1e24;
            color: #ae1e24;
            .right {
              width: 25px;
              height: 40px;
              background: #ae1e24;
              display: inline-block;
              position: absolute;
              right: -13px;
              top: -18px;
              transform: rotateZ(-45deg);
            }
            i {
              position: absolute;
              top: 0;
              right: 0;
              font-size: 12px;
              color: #fff;
              //   background: red;
            }
          }
        }
      }
      .text {
        margin: 20px 0;
        span {
          text-decoration: underline;
          color: #005aee;
          cursor: pointer;
        }
      }
    }
    .sum-3-right {
      .sum-3-right-sum {
        margin-bottom: 30px;
        font-size: 12px;
        span {
          color: #e20009;
          font-size: 16px;
        }
      }
      .sum-button {
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
        background: #e20009;
        width: 140px;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
.el-upload--text {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  text-align: center;
}
// }
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  // height: 178px;
  display: block;
  object-fit: contain;
}
.evidence-button {
  padding: 18px 0;
  text-align: center;
  .el-button--primary {
    background: #ae1e24;
    border: #ae1e24;
    width: 140px;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: #ae1e24;
  }
}

.yzmshow-con {
  .item-con {
    display: flex;
    align-items: center;
    .code-button {
      margin-left: 6px;
      line-height: 40px;
      text-align: center;
      letter-spacing: 5px;
      border-radius: 8px;
      background: rgba(239, 239, 239, 1);
      color: red;
      cursor: pointer;
    }
  }
}

.yanzhengma_input {
  font-family: "Exo 2", sans-serif;
  border: 1px solid #fff;
  // color: #fff;
  outline: none;
  border-radius: 12px;
  letter-spacing: 1px;
  font-size: 17px;
  font-weight: normal;
  background-color: rgba(82, 56, 76, 0.15);
  padding: 5px 0 5px 10px;
  margin-left: 30px;
  height: 30px;
  // margin-top: 25px;
  border: 1px solid #e6e6e6;
}
.verification {
  border-radius: 12px;
  width: 100px;
  letter-spacing: 5px;
  margin-left: 50px;
  height: 40px;
  transform: translate(-15px, 0);
}
.captcha {
  height: 50px;
  text-align: justify;
}
</style>
