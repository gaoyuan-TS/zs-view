<template>
  <div class="merchantDetail">
    <div class="editMerchant">
      <el-button type="primary" @click="goMerchantEdit">{{$t('button.edit')}}</el-button>
    </div>
    <page-content :name="$t('Merchant.merchantDetail.merchantDetailTitle')">
      <div class="main">
        <div class="merchantDetail-item">
          <!-- 商家名称 -->
          <div class="name">{{$t('Merchant.merchantDetail.merchantName')}}：</div>
          <div class="content">{{info.merchantName}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 入网类型 -->
          <div class="name">{{$t('Merchant.merchantDetail.netType')}}：</div>
          <div class="content">{{info.netTypeStr}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商家账号 -->
          <div class="name">{{$t('Merchant.merchantDetail.merchantAccount')}}：</div>
          <div class="content">{{info.merchantAccount}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 是否企业 -->
          <div class="name">{{$t('Merchant.merchantDetail.isEnterprise')}}：</div>
          <div class="content">{{info.enterprise}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商家所在地 -->
          <div class="name">{{$t('Merchant.merchantDetail.merchantLocation')}}：</div>
          <div class="content">{{info.administrativeDivisionFullSite}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商家类型 -->
          <div class="name">{{$t('Merchant.merchantDetail.merchantType')}}：</div>
          <div class="content">{{info.merchantTypeStr}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 详细地址 -->
          <div class="name">{{$t('Merchant.merchantDetail.detailedAddress')}}：</div>
          <div class="content">{{info.merchantDetailSite}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 经营品种 -->
          <div class="name">{{$t('Merchant.merchantDetail.businessItem')}}：</div>
            <div class="content">
              <el-collapse>
                <el-collapse-item name="1">
                  <template slot="title">
                    <div class="desctitle">{{info.businessLines}}</div>
                  </template>
                  <div>{{info.businessLines}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商家描述 -->
          <div class="name">{{$t('Merchant.merchantDetail.merchantDescription')}}：</div>
          <div class="content">
            <el-collapse>
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="desctitle">{{info.merchantDesciption}}</div>
                </template>
                <div>{{info.merchantDesciption}}</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商家联系人 -->
          <div class="name">{{$t('Merchant.merchantDetail.merchantContact')}}：</div>
          <div class="content">{{info.merchantContact}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商家法人代表 -->
          <div class="name">{{$t('Merchant.merchantDetail.merchanteRpresentative')}}：</div>
          <div class="content">{{info.lealPersonName}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 联系电话 -->
          <div class="name">{{$t('Merchant.merchantDetail.contactNumber')}}：</div>
          <div class="content">{{info.contactNumber}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 企业品牌 -->
          <div class="name">{{$t('Merchant.merchantDetail.enterpriseBrand')}}：</div>
          <div class="content brand" v-if="brandList.length > 0">
            <span v-for="(item,index) in brandList" :key="index">{{item.brandName}}</span>
          </div>
          <!-- 暂无添加品牌 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noAddedBrandYet')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 企业网址 -->
          <div class="name">{{$t('Merchant.merchantDetail.website')}}：</div>
          <div class="content" v-if="info.merchantUrl">{{info.merchantUrl}}</div>
          <!-- 暂无填写企业网址 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noEnterpriseWebsite')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 企业logo -->
          <div class="name">{{$t('Merchant.merchantDetail.corporateLogo')}}：</div>
          <div class="content" v-if="merchantLogoUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="merchantLogoUrl || ''" /></viewer>
            </div>
          </div>
          <!-- 暂无上传企业logo -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noCorporateLogoyet')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 销售网址 -->
          <div class="name">{{$t('Merchant.merchantDetail.salesURL')}}：</div>
          <div class="content" v-if="info.salesUrl">{{info.salesUrl}}</div>
          <!-- 暂无填写销售网址 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noSalesURL')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商标注册证书 -->
          <div class="name">{{$t('Merchant.merchantDetail.warenzeichenlizenz')}}：</div>
           <div class="content" v-if="warenzeichenlizenzUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="warenzeichenlizenzUrl" /></viewer>
            </div>
          </div>
          <!-- 暂无上传商标注册证书 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noWarenzeichenlizenz')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 经营许可证 -->
          <div class="name">{{$t('Merchant.merchantDetail.businessCertificate')}}：</div>
           <div class="content" v-if="businessCertificateUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="businessCertificateUrl" /></viewer>
            </div>
          </div>
          <!-- 暂无上传经营许可证 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noOperatepermission')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 生产许可证 -->
          <div class="name">{{$t('Merchant.merchantDetail.productionCertificate')}}：</div>
           <div class="content" v-if="productionLicenceUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="productionLicenceUrl" /></viewer>
            </div>
          </div>
          <!-- 暂无上传生产许可证 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noProductionLicense')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 卫生许可证 -->
          <div class="name">{{$t('Merchant.merchantDetail.hygienicLicense')}}：</div>
           <div class="content" v-if="hygienicLicenseUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="hygienicLicenseUrl" /></viewer>
            </div>
          </div>
          <!-- 暂无上传卫生许可证 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noHygieneLicense')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 产品检验报告 -->
          <div class="name">{{$t('Merchant.merchantDetail.productTestReport')}}：</div>
           <div class="content" v-if="productTestReportUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="productTestReportUrl" /></viewer>
            </div>
          </div>
          <!-- 暂无上传产品检验报告 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noProductTestReport')}}</div>
        </div>
        <!-- <viewer><img width="150" :src="productTestReportUrl" /></viewer> -->
        <div class="merchantDetail-item">
          <!-- 开户许可证 -->
          <div class="name">{{$t('Merchant.merchantDetail.openingPermit')}}：</div>
           <div class="content" v-if="productCertificationUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="productCertificationUrl" /></viewer>
            </div>
          </div>
          <!-- 暂无上传开户许可证 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noOpeningPermit')}}</div>
        </div>
        <div class="merchantDetail-item" v-if="Number(info.merchantType)===1">
          <!-- 身份证/护照 -->
          <div class="name">{{$t('Merchant.merchantDetail.IDCardOrpassport')}}：</div>
            <div class="content sfz">
              <div class="imgbox">
                <viewer><img width="150" :src="sfzImg" /></viewer>
              </div>
              <div class="imgbox fszBbox">
                <viewer><img width="150" :src="sfzBImg" /></viewer>
              </div>
            </div>
        </div>
        <div class="merchantDetail-item" v-if="Number(info.merchantType)!==1">
          <!-- 营业执照 -->
          <div class="name">{{$t('Merchant.merchantDetail.businessLicense')}}：</div>
          <div class="content" v-if="papersUrl">
            <div class="imgbox">
              <viewer><img width="150" :src="papersUrl"/></viewer>
            </div>
          </div>
          <!-- 暂无上传营业执照 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noBusinessLicense')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 商家视频 -->
          <div class="name">{{$t('Merchant.merchantDetail.businessVideo')}}：</div>
          <div class="content" v-if="shortVideoUrl">
            <video-player class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions"></video-player>
          </div>
          <!-- 暂无上传视频 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.noVideo')}}</div>
        </div>
        <div class="merchantDetail-item">
          <!-- 其他图片（多张） -->
          <div class="name">{{$t('Merchant.merchantDetail.OtherPictures')}}：</div>
           <div class="content" v-if="productCertificationUrl">
            <div class="imgboxMove" v-if="merchantImages.length > 0">
              <div class="imgbox"  v-for="(item,index) in merchantImages" :key="index">
                <viewer><img width="150" :src="item.url" /></viewer>
                <!-- <img  :src="item.url" class="avatar"> -->
              </div>
            </div>
          </div>
          <!-- 暂无上传其他图片 -->
          <div class="content" v-else>{{$t('Merchant.merchantDetail.NoOtherPictures')}}</div>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from '../../../components/content.vue'
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '',
      buttonType: false, // 是否为运营权限  
      info: {}, // 详情数据
      papersUrl: '', // 身份证
      brandList: [],  // 企业品牌
      merchantLogoUrl: '', // 企业logo
      productTestReportUrl: '', // 产品检验报告
      hygienicLicenseUrl: '', // 卫生许可证
      businessCertificateUrl: '', // 经营许可证
      productCertificationUrl: '', // 产品认证证书
      productionLicenceUrl: '', // 生产许可证
      warenzeichenlizenzUrl: '', // 商标注册证书
      merchantImages: [], // 更多图片
      shortVideoUrl: '', // 商家视频地址
      sfzImg: '', // 正面身份证的图片
      sfzBImg: '', // 身份证反面的图片
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
            src:
              'https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/8/7/30fc908a-f889-4dd4-bc42-ed38789d1a50.mp4' // url地址
          }
        ],
        // poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: this.$t('Merchant.merchantDetail.unavailableVideo'), // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  async mounted () {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      if (roleJson.role.roleName === 'ROLE_HEADQUARTERS_OPERATE' || roleJson.role.roleName === 'ROLE_FRANCHISEE_OPERATE') {
        this.buttonType = true
      } else {
        this.buttonType = false
      }
    }
    this.merchantId = this.$route.params.id
    await this.getSellerDetail(this.merchantId)
  },
  methods: {
    // 获取商家详情
    getSellerDetail (merchantId) {
      return new Promise((resolve, reject) => {
        this.$get('/back-end/merchant/get?merchantId=' + merchantId).then((res) => {
          this.info = res.data
          console.log(this.info,"info")
          this.brandList = res.data.brandList
          this.papersUrl = this.info.papersUrl
          this.sfzImg = this.info.papersUrl
          this.sfzBImg = this.info.papersBackUrl
          this.merchantLogoUrl = this.info.papersGroup.merchantLogoUrl
          this.productTestReportUrl = this.info.papersGroup.productTestReportUrl
          this.hygienicLicenseUrl = this.info.papersGroup.hygienicLicenseUrl
          this.businessCertificateUrl = this.info.papersGroup.businessCertificateUrl
          this.productCertificationUrl = this.info.papersGroup.productCertificationUrl
          this.productionLicenceUrl = this.info.papersGroup.productionLicenceUrl
          this.warenzeichenlizenzUrl = this.info.papersGroup.warenzeichenlizenzUrl
          this.merchantImages = this.info.merchantImages
          this.shortVideoUrl = this.info.shortVideoUrl
          this.playerOptions.sources[0].src = this.info.shortVideoUrl
          this.salesUrl = this.info.salesUrl
          console.log(this.info)
        })
        resolve(true)
      })
    },
    // 跳转到编辑商家页面
    goMerchantEdit() {
      this.$router.push({
        path: '/manage/merchantEdit',
        query: {
          mId: this.merchantId
        }
      })
    }
  }
}
</script>

<style lang="less">
  .merchantDetail {
    position: relative;
    .main {
      margin-top: 42px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px 20px 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .merchantDetail-item {
        margin-top: 30px;
        display: flex;
        width: 49%;
        color: rgba(51, 51, 51, 1);
        font-size: 14px;
        .name {
          width: 200px;
          text-align: right;
        }
        .item-content {
          .imgbox {
            width: 220px;
            // height: 220px;
            // background:rgba(250,250,250,1);
            // border: 1px dashed rgba(204, 204, 204, 1);
            border-radius: 4px;
            img {
              width: 100%;
              // height: 100%;
            }
          }
        }
      }
    }

    .name {
      width: 13%;
      text-align: right;
    }

    .content {
      flex: 1;
      padding-left: 15px;
      word-wrap: break-word;
      overflow: hidden;
      img {
        width: 250px;
      }
      .imgboxMove {
        width: 320px;
        display: flex;
        flex-wrap: wrap;
      }
      .imgbox {
        width: 220px;
        border: 1px dashed rgba(204, 204, 204, 1);
        border-radius: 4px;
        img {
          width: 100%;
        }
      }
    }

    .sfz {
      display: flex;
      .fszBbox {
        margin-left: 10px;
      }
    }
    
    .brand {
      span {
        margin: 5px;
      }
      span::after {
        content: ']';
      }
      span::before {
        content: '[';
      }
    }

    /deep/ .el-collapse {
      border: none;
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

    .desctitle {
      // width: 100%;
      // // width: 58%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
  }

  .editMerchant {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
  }
</style>