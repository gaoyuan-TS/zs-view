<template>
  <div>
    <page-content>
      <div class="content">
        <div class="authBuy">
        <div class="title">---{{$t('topUp.payPage.Certification')}}---</div>
        <div class="con">
          <div class="con-left">
            <!-- <div class="sum-3-left-1" style="font-size: 16px">
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
            </div> -->
            <!-- <div class="con-button">
              <div class="sum-button" @click="yzmShow = true">{{$t('topUp.payPage.immediately')}}</div>
            </div> -->
            <div class="text">
              {{$t('topUp.payPage.transferAcc')}}：
              <span class="evidence-cli" @click="authPayCertifyUpload = true">{{$t('topUp.payPage.uploadPaymentVoucher')}}</span>
            </div>
            <div class="text">
              <p>{{$t('topUp.payPage.companyName')}}：广州追溯信息科技有限公司</p>
              <p>{{$t('topUp.payPage.taxPayerNumber')}}：91440101MA59FERL8G</p>
              <p>{{$t('topUp.payPage.bankAcc')}}：3602841509200074289</p>
              <p>{{$t('topUp.payPage.bankName')}}：中国工商银行广州兴华支行</p>
            </div>
          </div>
        </div>
        <!-- 上传转账凭证图 -->
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
        
        <!-- 输入验证码 弹窗 -->
        <el-dialog width="40%" center :visible.sync="yzmShow">
          <div slot="title" style="font-size: 16px">{{$t('topUp.payPage.enterConfirmationCode')}}</div>
          <div class="join_formitem">
            <!-- <label class="enquiry">验证码  <span>:</span></label> -->
            <div class="captcha">
              <input
                type="text"
                :placeholder="$t('topUp.payPage.enterConfirmationCode')"
                class="yanzhengma_input"
                v-model="picLyanzhengma"
              />
              <input type="button" @click="createCode" class="verification" v-model="checkCode" />
            </div>
          </div>
          <div class="evidence-button">
            <el-button
              type="primary"
              @click="verification"
              :disabled="picLyanzhengma ? false: true"
            >{{$t('button.determine')}}</el-button>
          </div>
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
  components: {
    pageContent,
  },
  data () {
    return {
      input: '',
      paySum: 100,
      paytype: 1,
      mid: '',
      authPayCertifyUpload: false,
      imageUrl: '',
      payCertifyFile: '',
      upData: {
        imgSystemId: 'payCertifyId',
        imgSpecificUniqueValue: 'payCertifyValue'
      },
      yzmShow: false,
      checkCode: '',
      picLyanzhengma: ''
    }
  },
  created () {
    this.mid = this.$route.query.mid
    this.createCode()
  },
  methods: {
    // 生成随机验证码
    createCode () {
      // 先清空验证码的输入
      this.code = ''
      this.checkCode = ''
      this.picLyanzhengma = ''
      // 验证码的长度
      var codeLength = 4
      // 随机数
      var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (var i = 0; i < codeLength; i++) {
        // 取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36)
        // 根据索引取得随机数加到code上
        this.code += random[index]
      }
      // 把code值赋给验证码
      this.checkCode = this.code
    },
    // 图片上传之前的钩子
    beforeAvatarUpload (file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const isLt2M = file.size / 1024 / 1024 < 30

      if (!extension && !extension2 && !extension3) {
        this.$message.error(this.$t('uploadimg.format'))
        return false
      } else {
        return new Promise(resolve => {
          exifs.getOrientation(file).then(orient => {
            console.log(orient, 'Orient')
            if (orient !== '' && orient !== 1 && orient !== undefined) {
              // console.log('1111111')
              let reader = new FileReader()
              let img = new Image()
              reader.onload = e => {
                // console.log('2222222')
                img.src = e.target.result
                img.onload = function () {
                  // console.log('333333')
                  const data = exifs.rotateImage(
                    orient,
                    img,
                    img.width,
                    img.height
                  )
                  const newFile = exifs.dataURLtoFile(data, file.name)
                  resolve(newFile)
                }
              }
              reader.readAsDataURL(file)
            } else {
              resolve(file)
            }
          })
        })
      }
    },
    verification () {
      if (this.picLyanzhengma.toUpperCase() === this.checkCode.toUpperCase()) {
        this.toSumCode()
        this.yzmShow = false
        this.createCode()
      } else {
        this.$message.error('输入的验证码不对！')
        this.createCode()
      }
    },
    // 凭证图上传
    handleAvatarSuccess (res, file) {
      if (Number(res.code === 200)) {
        this.imageUrl = res.data.imgUrl
        this.payCertifyFile = res.data.imgUrl
      } else {
        this.$message.error(res.data.desc)
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
      // // console.log('res:---', res)
      // this.payCertifyFile = res.data.imgUrl
    },
    // 上传支付凭证
    buttonCerti () {
      // this.$confirm('确定已转账吗？', '提示', {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      this.$post('/management_point/merchantAuth/addAuthCertify', {
        merchantId: this.mid,
        payCertify: this.payCertifyFile
      }).then(res => {
        if (res.code === 100) {
          this.$message.success(this.$t('topUp.payPage.transferUploadSucc'))
          this.authPayCertifyUpload = false
          this.payCertifyFile = ''
        } else {
          this.$message.error(res.msg)
        }
      })
      // })
    },
    // 立即支付
    toSumCode () {
      if (this.paytype === 1) {
        this.$post('/management_point/merchantAuth/applyAuth', {
          merchantId: this.mid,
          payType: 3
        }).then(res => {
          if (res.code === 100) {
            window.localStorage.setItem('Auth', JSON.stringify({
              payUrl: res.data.payUrl,
              vid: res.data.merchantAuthId,
              mid: this.mid
            }))
            // this.$router.push({
            //   path: '/index/sumCode',
            //   query: {
            //     type: 1
            //   }
            // })
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        // this.$router.push({
        //   path: '/index/aliPay',
        //   query: {
        //     type: 1,
        //     // sum: _sum,
        //     mid: this.mid
        //   }
        // })
        // window.open(routeUrl.href, '_blank')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    height: 7.82rem;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.authBuy {
  width: 70%;
  // margin: auto;
  border:1px solid rgba(204,204,204,1);
  display: flex;
  // align-items: center;
  flex-direction: column;
  .title {
    padding: 20px 0 18px 0;
    color: rgba(51,51,51,1);
    font-weight:600;
    text-align: center;
  }
  .con {
    padding-top: 15px;
    border-top: 1px solid #ccc;
    width: 80%;
    align-self: center;
    display: flex;
    // flex-direction: column;
    align-items:  center;
    .con-left {
      margin-right: 30px;
      flex: 1;
      .con-button {
        margin-top: 16px;
        display: flex;
        flex-direction: row-reverse;
      }
      .sum-button {
        cursor: pointer;
        color: rgba(255,255,255,1);
        background: #E20009;
        width: 140px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
      }
    }
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
      font-size: 14px;
      margin: 20px 0;
      span {
        text-decoration: underline;
        color: #005aee;
        cursor: pointer;
      }
    }
    .con-right {
      margin-left: 10px;
      .sum-3-right-sum {
        margin-bottom: 30px;
        font-size: 12px;
        span {
          color: #E20009;
          font-size: 16px;
        }
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
.yanzhengma_input{
  font-family: 'Exo 2', sans-serif;
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
.verification{
  border-radius: 12px;
  width:100px;
  letter-spacing:5px;
  margin-left: 50px;
  height: 40px;
  transform: translate(-15px,0);
}
.captcha{
  height: 50px;
  text-align: justify;
}
</style>