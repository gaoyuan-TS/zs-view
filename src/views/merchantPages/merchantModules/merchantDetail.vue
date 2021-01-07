<template>
  <div class="merchantdetail">
    <div class="editMerchant">
      <el-button type="primary" @click="goMerchantEdit">{{$t('button.edit')}}</el-button>
    </div>
    <page-content :name="$t('merchant.merchantDetails')">
      <div class="content">
        
        <div class="content-item">
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantName')}}：</div>
            <div class="merchantdetail-item-con">{{info.merchantName}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.netWeokType')}}：</div>
            <div class="merchantdetail-item-con">{{info.netTypeStr}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantAccount')}}：</div>
            <div class="merchantdetail-item-con">{{info.merchantAccount}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.notAEnterprise')}}：</div>
            <div class="merchantdetail-item-con">{{info.enterprise}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantType')}}：</div>
            <div class="merchantdetail-item-con">{{info.merchantTypeStr}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantWebsiten')}}：</div>
            <div class="merchantdetail-item-con">{{info.merchantUrl || '暂无填写企业网址(No business website)'}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantLocation')}}：</div>
            <div class="merchantdetail-item-con">{{info.administrativeDivisionFullSite}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantAdree')}}：</div>
            <div class="merchantdetail-item-con">{{info.merchantDetailSite}}</div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantBrand')}}：</div>
            <div class="merchantdetail-item-con" v-if="info.brandList.length > 0">
              <span v-for="(braItem, braIdx) in info.brandList" :key="braIdx">
                {{braItem.brandName}}
              </span>
            </div>
            <div class="merchantdetail-item-con" v-else>
              暂无添加品牌(No brand added yet)
            </div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.lineBusin')}}：</div>
            <div class="merchantdetail-item-con">
              <el-collapse v-model="activeNames1">
                <el-collapse-item name="1">
                  <template slot="title">
                    <div class="desctitle">{{info.businessLines}}</div>
                  </template>
                  <div>{{info.businessLines}}</div>
                </el-collapse-item>
            </el-collapse>
            </div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantDesc')}}：</div>
            <div class="merchantdetail-item-con">
              <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                  <template slot="title">
                    <div class="desctitle">{{info.merchantDesciption}}</div>
                  </template>
                  <div>{{info.merchantDesciption}}</div>
                </el-collapse-item>
            </el-collapse>
            </div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantContact')}}：</div>
            <div class="merchantdetail-item-con">
              {{info.merchantContact}}
            </div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantRepre')}}：</div>
            <div class="merchantdetail-item-con">
              {{info.lealPersonName}}
            </div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantContactNum')}}：</div>
            <div class="merchantdetail-item-con">
              {{info.contactNumber}}
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.merchantLogo')}}：</div>
            <div class="merchantdetail-item-con" v-if="merchantLogo">
              <viewer>
                <img :src="merchantLogo" alt="" />
              </viewer>
              
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
            <div v-else>{{$t('merchant.nomerchantLogo')}}</div>
          </div>

          <div class="merchantdetail-item" v-if="info.merchantTypeStr === '个人'">
            <div class="merchantdetail-item-name" style="flex: 1">ID / Passport：</div>
            <div class="merchantdetail-item-con">
              <viewer>
                <img :src="papersUrl" alt="" />
              </viewer>
              <viewer>
                <img :src="sfzBImg" alt="" />
              </viewer>
              
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
          </div>
          <div class="merchantdetail-item" v-else>
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.businessLic')}}：</div>
            <div class="merchantdetail-item-con">
              <viewer>
                <img :src="papersUrl" alt="" />
              </viewer>
              
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
          </div>
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.registraTionCert')}}：</div>
            <div class="merchantdetail-item-con" v-if="warenzeichenlizenzUrl">
              <viewer>
                <img :src="warenzeichenlizenzUrl" alt="" />
              </viewer>
              
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
            <div v-else>{{$t('merchant.NOregistraTionCert')}}</div>
          </div>
          <!-- 经营许可证 -->
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.BusinessLicense')}}：</div>
            <div class="merchantdetail-item-con" v-if="businessCertificateUrl">
              <viewer>
                <img :src="businessCertificateUrl" alt="" />
              </viewer>
              
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
            <div v-else>{{$t('merchant.noBusinessLicense')}}</div>
          </div>
          <!-- 生产许可证 -->
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.proLicense')}}：</div>
            <div class="merchantdetail-item-con" v-if="productionLicenceUrl">
              <viewer>
                <img :src="productionLicenceUrl" alt="" />
              </viewer>
              
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
            <div v-else>{{$t('merchant.noproLicense')}}</div>
          </div>
          <!-- 卫生许可证 -->
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.hygieneLicense')}}：</div>
            <div class="merchantdetail-item-con" v-if="hygienicLicenseUrl">
              <viewer>
                <img :src="hygienicLicenseUrl" alt="" />
              </viewer>
              
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
            <div v-else>{{$t('merchant.nohygieneLicense')}}</div>
          </div>
          <!-- 产品检验报告 -->
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.productReport')}}：</div>
            <div class="merchantdetail-item-con" v-if="productTestReportUrl">
              <viewer>
                <img :src="productTestReportUrl" alt="" />
              </viewer>
              
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
            <div v-else>{{$t('merchant.noproductReport')}}</div>
          </div>
          <!-- 开户许可证 -->
          <div class="merchantdetail-item">
            <div class="merchantdetail-item-name" style="flex: 1">{{$t('merchant.openingLicense')}}：</div>
            <div class="merchantdetail-item-con" v-if="productCertificationUrl">
              <viewer>
                <img :src="productCertificationUrl" alt="" />
              </viewer>
              
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
            <div v-else>{{$t('merchant.noopeningLicense')}}</div>
          </div>

          
        </div>

        <div class="">
          <!-- 其他图片 -->
          <div class="merchantdetail-item1">
            <div class="merchantdetail-item-name">{{$t('merchant.otherPictures')}}：</div>
            <div class="merchantdetail-item-con">
              <!-- <img :src="productCertificationUrl" alt=""> -->
              <div v-if="info.merchantImages.length > 0" class="merchantImagesList">
                <div v-for="(merImg, imgIdx) in info.merchantImages" :key="imgIdx" class="merchantImagesItem">
                  <viewer>
                    <img :src="merImg.url" alt="" />
                  </viewer>
                  
                </div>
              </div>
              <div v-else>{{$t('merchant.nootherPictures')}}</div>
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>
          </div>

          <!-- 视频 -->
          <div class="merchantdetail-item1">
            <div class="merchantdetail-item-name">{{$t('merchant.merchantVideo')}}：</div>
            <div class="merchantdetail-item-con" v-if="info.shortVideoUrl">
              <video :src="info.shortVideoUrl" controls style="width: 450px"></video>
              <!-- <img :src="papersBackUrl" alt=""> -->
              <!-- <el-image :src="merchantLogo" fit='contain'></el-image> -->
            </div>

            <div v-else>{{$t('merchant.noMerchantVideo')}}</div>
          </div>
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
      merchantId: '',
      info: {
        brandList: [],
        merchantImages: []
      },
      activeNames1: [],
      activeNames: [],
      merchantLogo: '', // 商家的logo
      papersUrl: '',
      sfzBImg: '',
      warenzeichenlizenzUrl: '', // 商标注册证书
      businessCertificateUrl: '', // 经营许可证
      productionLicenceUrl: '', // 生产许可证
      hygienicLicenseUrl: '', // 卫生许可证
      productTestReportUrl: '', // 产品检验报告
      productCertificationUrl: '', // 开户许可证
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: 'https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/8/7/30fc908a-f889-4dd4-bc42-ed38789d1a50.mp4' // url地址
          }
        ],
        // poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getMechantDetail()
  },
  methods: {
    // 获取商家资料
    getMechantDetail() {
      this.$get('/back-end/merchant/get', {
        merchantId: this.merchantId
      }).then(res => {
        this.info = res.data
        this.merchantLogo = res.data.papersGroup.merchantLogoUrl
        this.papersUrl = this.info.papersUrl
        this.sfzBImg = this.info.papersBackUrl
        this.warenzeichenlizenzUrl = res.data.papersGroup.warenzeichenlizenzUrl
        this.businessCertificateUrl = this.info.papersGroup.businessCertificateUrl
        this.productionLicenceUrl = this.info.papersGroup.productionLicenceUrl
        this.hygienicLicenseUrl = this.info.papersGroup.hygienicLicenseUrl
        this.productTestReportUrl = this.info.papersGroup.productTestReportUrl
        this.productCertificationUrl = this.info.papersGroup.productCertificationUrl

        this.playerOptions.sources[0].src = this.info.shortVideoUrl
      })
    },
    // 前往编辑页面
    goMerchantEdit() {
      this.$router.push({
        path: '/merchant/merMerchantEdit'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .merchantdetail {
    position: relative;
    .content {
      margin-top: 42px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
      
      .content-item {
        padding-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;

        border-bottom: 1px solid rgba(216,216,216,1);
        &:last-child {
          border: none;
        }
      }
      // justify-content: space-between;
      .merchantdetail-item {
        margin-top: 30px;
        width: 32%;
        // overflow: hidden;
        font-size: 14px;
        display: flex;
        .merchantdetail-item-name {
          color: rgba(0,0,0,0.85);
          // flex: 1;
          // width: 40%;
        }
        .merchantdetail-item-con {
          color: rgba(0,0,0,0.65);
          // flex: 1;
          width: 60%;
          span::after {
            content: ']';
          }
          span::before {
            content: '[';
          }

          .desctitle {
            display: block;
            // width: 58%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            width: 120px;
            height: 120px;
            border: 1px solid #d9d9d9;
          }

          .merchantImagesList {
            display: flex;
            .merchantImagesItem {
              margin-left: 20px;
              &:first-child {
                margin: 0;
              }
            }
          }
        }
      }

      .merchantdetail-item1 {
        margin-top: 30px;
        // width: 32%;
        // overflow: hidden;
        font-size: 14px;
        display: flex;
        .merchantdetail-item-name {
          color: rgba(0,0,0,0.85);
          // flex: 1;
          // width: 40%;
        }
        .merchantdetail-item-con {
          color: rgba(0,0,0,0.65);
          // flex: 1;
          // width: 60%;
          span::after {
            content: ']';
          }
          span::before {
            content: '[';
          }

          .desctitle {
            display: block;
            // width: 58%;
            overflow: hidden;
            text-overflow: ellipsis;
            
            white-space: nowrap;
          }

          img {
            width: 120px;
            height: 120px;
            border: 1px solid #d9d9d9;
          }

          .merchantImagesList {
            display: flex;
            flex-wrap: wrap;
            .merchantImagesItem {
              margin-left: 20px;
              &:first-child {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
  /deep/
  .el-collapse {
    border: none;
    // width: 100%;
    .el-collapse-item__header {
      border: none;
      line-height: 21px;
      font-size: 16px;
      height: auto;
    }
    .el-collapse-item__wrap {
      border: none;
    }
    .el-collapse-item__content {
      font-size: 16px;
      margin-top: 8px;
    }
  }

  .editMerchant {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
  }
</style>