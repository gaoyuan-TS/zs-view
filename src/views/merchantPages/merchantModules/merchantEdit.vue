<template>
  <div class="merchantedit">
    <page-content :name="$t('merchant.merchantEdits')">
      <div class="content">
        <div class="content-item">
          <!-- 商家名称 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantName')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="merchantNme"></el-input>
            </div>
          </div>
          <!-- 入网类型 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.netWeokType')}}</div>
            <div class="item-input" style="width: 80%">
              <!-- <el-input v-model="merchantNme"></el-input> -->
              <el-select
              style="flex: 1"
                v-model="merchantNetype"
                placeholder="请选择入网类型"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 商家账号 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantAccount')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="merchantAccount" :disabled="true"></el-input>
            </div>
          </div>
          <!-- 是否企业 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.notAEnterprise')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="enterprise" :disabled="true"></el-input>
            </div>
          </div>
          <!-- 商家类型 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantType')}}</div>
            <div class="item-input" style="width: 80%">
              <el-select
                style="flex: 1"
                v-model="merchantTypeId"
                placeholder="请选择商家类型"
                :disabled="true"
              >
                <el-option
                  v-for="item in merchantType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 企业官网、网址 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantWebsiten')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="merchantUrl"></el-input>
            </div>
          </div>
          <!-- 商家所在的地区 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantLocation')}}</div>
            <div class="item-input" style="width: 80%">
              <el-cascader
                style="flex: 1"
                :options="Cascader"
                :props="{
                  label: 'name',
                  value: 'id',
                  childre:'children'
                }"
                ref="cascaderAddr"
                v-model="cityList"
              ></el-cascader>
            </div>
          </div>
          <!-- 详情地址 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantAdree')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="merchantDetailSite" @blur="geoLocation"></el-input>
            </div>
          </div>

          <!-- 企业品牌 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantBrand')}}</div>
            <div style="width: 80%">
              <!-- <el-input v-model="merchantNme"></el-input> -->
              <div style="display: flex">
                <el-input v-model.trim="brand" maxlength="20" show-word-limit></el-input>
                <span
                  class="big"
                  @click="getNewbrand"
                >
                  <i class="el-icon-circle-plus"></i>
                </span>
              </div>
              
              <div
                v-for="(itm,idx) in brandList"
                :key="idx"
                style="display: flex; margin-top: 8px"
              >
                <el-input
                  :disabled="true"
                  v-model="itm.brandName"
                ></el-input>
                <span
                  class="big"
                  @click="getRemovebrand(idx)"
                >
                  <i class="el-icon-remove"></i>
                </span>
              </div>
            </div>
          </div>

          <!-- 商家联系人 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantContact')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="merchantContact"></el-input>
            </div>
          </div>

          <!-- 法人代表 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantRepre')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="lealPersonName"></el-input>
            </div>
          </div>

          <!-- 联系电话 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantContactNum')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="contactNumber"></el-input>
            </div>
          </div>

          <!-- 经营品类 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.lineBusin')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input type="textarea" v-model="businessLines" maxlength="1000" show-word-limit></el-input>
            </div>
          </div>

          <!-- 商家介绍 -->
          <div class="content-item-item">
            <div class="item-title">{{$t('merchant.merchantDesc')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input type="textarea" v-model="merchantDesciption" maxlength="1000" show-word-limit></el-input>
            </div>
          </div>

          <!-- 商家营业执照编号 -->
          <!-- <div class="content-item-item">
            <div class="item-title">{{$t('merchant.licenseNumber')}}</div>
            <div class="item-input" style="width: 80%">
              <el-input v-model="papersNumber"></el-input>
            </div>
          </div> -->
        </div>

        <div class="content-item">
          <!-- 企业logo -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.merchantLogo')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handlelogo"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="logoImg"
                  :src="logoImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          <!-- 营业执照或是身份证、护照 -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.businessLic')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handlesfz"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="sfzImg"
                  :src="sfzImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          <!-- 商标注册证书 -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.registraTionCert')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handlebrandImg"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="brandImg"
                  :src="brandImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          <!-- 经营许可证 -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.BusinessLicense')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handlemanageImg"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="manageImg"
                  :src="manageImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          <!-- 生产许可证 -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.proLicense')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handleproductionImg"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="productionImg"
                  :src="productionImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          <!-- 卫生许可证 -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.hygieneLicense')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handlehygieneImg"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="hygieneImg"
                  :src="hygieneImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          <!-- 产品检验报告 -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.productReport')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handletestImg"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="testImg"
                  :src="testImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          <!-- 开户许可证 -->
          <div class="upload-item">
            <div class="upload-item-title">{{$t('merchant.openingLicense')}}：</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :on-success="handleattestationImg"
                :data="imgData"
                :before-upload="beforeImgUpload"
              >
                <img
                  v-if="attestationImg"
                  :src="attestationImg"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
          </div>

          
        </div>

        <div class="content-item">
          <!-- 其他图片 -->
          <div class="upload-item1">
            <div class="upload-item-title">{{$t('merchant.otherPictures')}}：</div>
            <div>
              <el-upload
                action="https://zs.cntracechain.com/imageService/image/add"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleImgRemove"
                :on-success="handleImgMove"
                :data="imgData"
                :file-list="merchantImages"
                :before-upload="beforeImgUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </div>
          </div>

          <!-- 商家视频 -->
          <div class="upload-item1">
            <div class="upload-item-title">{{$t('merchant.merchantVideo')}}：</div>
            <div>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://zs.cntracechain.com/imageService/image/add"
                :on-remove="handleremove"
                :on-success="handlesuccess"
                :file-list="shortVideolist"
                :auto-upload="true"
                :data="imgData"
                :before-upload="beforeAvatarUpload"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >{{$t('button.SelectFile')}}</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('uploadimg.format1')}}({{$t('uploadimg.videoTenM')}})</div>
              </el-upload>
            </div>
          </div>
        </div>

        <div class="confirmBtn">
          <el-button type="primary" @click="handleUpdata">{{$t('button.Comfirm')}}</el-button>
          <el-button type="danger" @click="$router.go(-1)">{{$t('button.cancel')}}</el-button>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from '../../../components/content'

import exifs from '../../../assets/js/exifs.js'
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '', // 商家id
      options: [
        {
          value: '5',
          label: this.$t('merchant.netWeokTypeOps.ServiceType')
        },
        {
          value: '6',
          label: this.$t('merchant.netWeokTypeOps.production')
        }
      ],
      merchantNetypeOps: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        }
      ],
      merchantType: [
        {
          value: '2',
          label: this.$t('merchant.merchantTypeOps.Vendor')
        },
        {
          value: '3',
          label: this.$t('merchant.merchantTypeOps.farmersMar')
        },
        {
          value: '4',
          label: this.$t('merchant.merchantTypeOps.company')
        },
        {
          value: '5',
          label: this.$t('merchant.merchantTypeOps.orther')
        }
      ],
      Cascader: [], // 地区集合
      
      merchantNme: '', // 商家名称
      merchantAccount: '', // 账号名称
      merchantNetype: '',
      enterprise: '', // 是否企业
      merchantTypeId: '', // 商家类型
      man: '个人',
      merchantUrl: '', // 企业网址、官网
      cityList: [], // 商家所在地区
      merchantDetailSite: '', // 详细地址
      brandList:[], // 品牌名集合
      brand: '', // 输入的品牌名
      merchantContact: '', // 商家联系人
      lealPersonName: '', // 法人代表
      contactNumber: '', // 商家联系电话
      businessLines: '', // 经营品种
      merchantDesciption: '', // 商家介绍
      imgData: {
        imgSystemId: 'merchantEdit',
        imgSpecificUniqueValue: 'merchantEditImg'
      },  //   上传图片附带的参数
      logoImg: '', // 企业logo图片
      papersUrl: '', // 营业执照图片
      sfzImg: '', // 身份证的图片
      papersBackUrl: '', // 身份证反面图片
      papersNumber: '', // 营业执照号码
      brandImg: '', // 商标注册证书图片
      manageImg: '', // 经营许可证
      productionImg: '', // 生产许可证
      hygieneImg: '', // 卫生许可证
      testImg: '', // 产品检验报告
      attestationImg: '', // 开户许可证
      merchantImages: [], // 其他图片
      dialogVisible: false,
      dialogImageUrl: '',
      shortVideoUrl: '',
      fileList: [],
      addressSite: '', // 地区名字
      discernSite: '', // 新建所需要参数：识别地址
      siteAbscissa: '', // 经度
      siteOrdinate: '', // 纬度
      shortVideolist: [],
      papersGroupId: ''
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getSiteData()
    this.getMerchantDetail()
  },
  methods: {
    // 获取地区列表
    getSiteData() {
      this.$get('/agent/site/data').then(res => {
        this.Cascader = res.data || []
      })
    },
    /**
     * 根据地区与详细地址获取经纬度
     */
    geoLocation() {
      let adress = this.addressSite
      let _type
      if (this.addressSite) {
        adress = adress + this.merchantDetailSite

        this.$common.getLal(adress, (res) => {
          console.log(res)
          this.discernSite = adress
          this.siteAbscissa = res.detail.location.lng
          this.siteOrdinate = res.detail.location.lat
          _type = true
        })
        // this.$common.getNoUrl('https://restapi.amap.com/v3/geocode/geo', {
        //   address: adress,
        //   key: '3c68a0e41d392b7c5ba4a77a2fd9bbe9'
        // }).then(res => {
        //   this.discernSite = res.data.geocodes[0].formatted_address
        //   this.location = res.data.geocodes[0].location.split(',')
        // })
      } else {
        this.$message.error('请选择商家所在地的地区或是填写正确的详细地址')
        _type = false
      }

      return _type
    },
    // 新增企业品牌
    getNewbrand () {
      if (!this.brand) {
        this.$message.error(this.$t('merchant.noBrandError'))
      } else {
        let brand = this.brand
        this.brandList.push({ brandName: brand, brandId: null, merchantId: this.merchantId })
      // // console.log(this.brandList)
      }
    },
    // 删除企业品牌
    getRemovebrand (idx) {
      console.log('删除品牌')
      this.brandList.splice(idx, 1)
    },
    // 获取商家详细信息
    getMerchantDetail() {
      this.$get('/back-end/merchant/get?merchantId=' + this.merchantId).then(res => {
        this.merchantNme = res.data.merchantName
        this.merchantNetype = String(res.data.netType) 
        this.merchantAccount = res.data.merchantAccount
        this.enterprise = res.data.enterprise
        this.merchantTypeId = String(res.data.merchantType)
        this.merchantUrl = res.data.merchantUrl
        this.cityList = res.data.areaIdList
        this.merchantDetailSite = res.data.merchantDetailSite
        this.addressSite = res.data.administrativeDivisionFullSite
        this.brandList = res.data.brandList
        this.merchantContact = res.data.merchantContact
        this.lealPersonName = res.data.lealPersonName
        this.contactNumber = res.data.contactNumber
        this.businessLines = res.data.businessLines
        this.merchantDesciption = res.data.merchantDesciption

        this.sfzImg = res.data.papersUrl
        
        // 商家图片
        this.logoImg = res.data.papersGroup.merchantLogoUrl
        this.papersNumber = res.data.papersNumber
        this.brandImg = res.data.papersGroup.warenzeichenlizenzUrl
        this.manageImg = res.data.papersGroup.businessCertificateUrl
        this.productionImg = res.data.papersGroup.productionLicenceUrl
        this.hygieneImg = res.data.papersGroup.hygienicLicenseUrl
        this.testImg = res.data.papersGroup.productTestReportUrl
        this.attestationImg = res.data.papersGroup.productCertificationUrl
        this.merchantImages = res.data.merchantImages

        // 商家所在的经纬度
        this.siteAbscissa = res.data.siteAbscissa
        this.siteOrdinate = res.data.siteOrdinate
        this.discernSite = res.data.discernSite

        this.shortVideolist.push({ name: res.data.shortVideoUrl, url: res.data.shortVideoUrl })

        this.shortVideoUrl = res.data.shortVideoUrl

        this.papersGroupId = res.data.papersGroup.papersGroupId
      })
    },
    // 上传商家logo图片
    handlelogo(res) {
      if(res.code === 200) {
        this.logoImg = res.data.imgUrl
      }
    },
    // 上传身份证图片或营业执照图片
    handlesfz (res, file) {
      // this.sfzImg = URL.createObjectURL(file.raw)
      if (Number(res.code) === 200) {
        // console.log(res)
        this.papersUrl = res.data.imgUrl
        this.sfzImg = res.data.imgUrl
        if (this.merchantTypeId === 1) {
          this.$post('/baseService/ocr/IDCardOCR', {
            ImageUrl: this.papersUrl,
            CardSide: 'FRONT'
          }, false).then(res => {
            if (res.statusCode === 200) {
              this.papersNumber = res.data.idNum
            } else {
              this.$message.error(this.$t('merchant.newMerchantMessage.IDImgErr'))
              this.papersNumber = ''

            }
          })
        } else {
          this.$post('/baseService/ocr/BizLicenseOCR', {
            ImageUrl: res.data.imgUrl
          }, false).then(res => {
            console.log(res.data.regNum)
            if (res.statusCode === 200) {
              this.papersNumber = res.data.regNum
            } else {
              this.$message.error(this.$t('merchant.newMerchantMessage.papersImgErr'))
              this.papersNumber = ''
            }
          })
        }
        // console.log(this.papersUrl)
      } else {
        this.$message.error(res.desc)
      }
    },
    // 上传商标注册证书
    handlebrandImg (res, file) {
      // this.brandImg = URL.createObjectURL(file.raw)
      if (Number(res.code) === 200) {
        // console.log(res)
        this.brandImg = res.data.imgUrl
        this.papersGroup.warenzeichenlizenzUrl = res.data.imgUrl
        // console.log(this.papersGroup.warenzeichenlizenzUrl)
      } else {
        this.$message.error(res.data.desc)
      }
    },
    // 上传经营许可证
    handlemanageImg (res, file) {
      // this.manageImg = URL.createObjectURL(file.raw)
      if (Number(res.code) === 200) {
        // console.log(res)
        this.manageImg = res.data.imgUrl
        this.papersGroup.businessCertificateUrl = res.data.imgUrl
        // console.log(this.papersGroup.businessCertificateUrl)
      } else {
        this.$message.error(res.data.desc)
      }
    },
    // 上传生产许可证
    handleproductionImg (res, file) {
      // this.productionImg = URL.createObjectURL(file.raw)
      if (Number(res.code) === 200) {
        // console.log(res)
        this.productionImg = res.data.imgUrl
        this.papersGroup.productionLicenceUrl = res.data.imgUrl
        // console.log(this.papersGroup.productionLicenceUrl)
      } else {
        this.$message.error(res.data.desc)
      }
    },
    // 上传卫生许可证
    handlehygieneImg (res, file) {
      // this.hygieneImg = URL.createObjectURL(file.raw)
      if (Number(res.code) === 200) {
        // console.log(res)
        this.hygieneImg = res.data.imgUrl
        this.papersGroup.hygienicLicenseUrl = res.data.imgUrl
        // console.log(this.papersGroup.hygienicLicenseUrl)
      } else {
        this.$message.error(res.data.desc)
      }
    },
    // 上传产品检验报告
    handletestImg (res, file) {
      // this.testImg = URL.createObjectURL(file.raw)
      if (Number(res.code) === 200) {
        this.testImg = res.data.imgUrl
        // console.log(res)
        this.papersGroup.productTestReportUrl = res.data.imgUrl
        // console.log(this.papersGroup.productTestReportUrl)
      } else {
        this.$message.error(res.data.desc)
      }
    },
    // 上传开户许可证
    handleattestationImg (res, file) {
      // this.attestationImg = URL.createObjectURL(file.raw)
      if (Number(res.code) === 200) {
        // console.log(res)
        this.attestationImg = res.data.imgUrl
        this.papersGroup.productCertificationUrl = res.data.imgUrl
        // console.log(this.papersGroup.productCertificationUrl)
      } else {
        this.$message.error(res.data.desc)
      }
    },
    // 上传其他的图片
    handleImgMove (file) {
      console.log(file)
      let obj = {}
      obj.url = file.data.imgUrl
      this.merchantImages.push(obj)
      for (var i = 0; i < this.merchantImages.length; i++) {
        this.merchantImages[i].merchantImageIndex = i
      }
      console.log(this.merchantImages)
      // console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除其他图片组的图片
    handleImgRemove (file) {
      console.log(file)
      let ImgUrl = file.url
      console.log(ImgUrl)
      for (var i = 0; i < this.merchantImages.length; i++) {
        if (this.merchantImages[i].url === ImgUrl) {
          // console.log(1)
          this.merchantImages.splice(i, 1)
        }
      }
      // console.log(this.merchantImages)
    },
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const extension4 = testmsg === 'PNG'
      const extension5 = testmsg === 'JPG'
      const extension6 = testmsg === 'JPEG'
      // const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message.error(this.$t('uploadimg.format'))
        return false
      } else {
        return new Promise(resolve => {
          exifs.getOrientation(file).then(orient => {
            console.log(orient, 'Orient')
            if (orient !== '' && orient !== 1 && orient !== undefined && orient !== 0) {
              // console.log('1111111')
              let reader = new FileReader()
              let img = new Image()
              reader.onload = (e) => {
                // console.log('2222222')
                img.src = e.target.result
                img.onload = function () {
                  // console.log('333333')
                  const data = exifs.rotateImage(orient, img, img.width, img.height)
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
    // 参数视频
    handleremove() {
      this.shortVideoUrl = ''
    },
    handlesuccess (file) {
      // console.log(file)
      if (Number(file.code) === 200) {
        this.shortVideoUrl = file.data.imgUrl
        this.$message({
          message: file.message,
          type: 'success'
        })
      } else {
        this.$message.error(file.data.desc)
      }
    },
    // 上传视频前的钩子
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'ogg'
      const extension2 = testmsg === 'mp4'
      const extension3 = testmsg === 'webm'
      const isLt2M = file.size / 1024 / 1024 < 500

      if (!extension && !extension2 && !extension3) {
        this.$message.error(this.$t('uploadimg.format1'))
        return false
      }
      if (!isLt2M) {
        this.$message.error(this.$t('uploadimg.videoTenM'))
        return false
      }
      return true
    },
    /**
     * 编辑商家资料
     */
    handleUpdata() {
      if( !this.merchantNme) {
        this.$message.error(this.$t('merchant.newMerchantMessage.merchantNmaeError'))
        return false
      }
      if (!this.merchantNetype) {
        this.$message.error(this.$t('merchant.newMerchantMessage.merchantNetTypeError'))
        return false
      }
      if (!this.enterprise) {
        this.$message.error(this.$t('merchant.newMerchantMessage.enterPriseError'))
        return false
      }
      if (!this.merchantType) {
        this.$message.error(this.$t('merchant.newMerchantMessage.merchantTypeError'))
        return false
      }
      if (!this.cityList.length > 0) {
        this.$message.error(this.$t('merchant.newMerchantMessage.locationError'))
        return false
      }

      if (!this.merchantDetailSite) {
        this.$message.error(this.$t('merchant.newMerchantMessage.merchantDetailSiteError'))
        return false
      }
      if (!this.merchantContact) {
        this.$message.error(this.$t('merchant.newMerchantMessage.merchantContactError'))
        return false
      }
      if (!this.lealPersonName) {
        this.$message.error(this.$t('merchant.newMerchantMessage.lealPersonNameErr'))
        return false
      }

      if (!this.contactNumber) {
        this.$message.error(this.$t('merchant.newMerchantMessage.contectNumberErr'))
        return false
      }

      if (!this.businessLines) {
        this.$message.error(this.$t('merchant.newMerchantMessage.businesslinesErr'))
        return false
      }

      if (!this.merchantDesciption) {
        this.$message.error(this.$t('merchant.newMerchantMessage.mechantDescErr'))
        return false
      }

      if (!this.papersNumber) {
        if (this.merchantTypeId === 1) {
          this.$message.error(this.$t('merchant.newMerchantMessage.papersNumberErr1'))
          return false
        } else {
          this.$message.error(this.$t('merchant.newMerchantMessage.papersNumberErr2'))
          return false
        }
      }
      // this.geoLocation()
      // console.log(_location)

      setTimeout(() => {
        let _params = {
          merchantId: this.merchantId,
          merchantName: this.merchantNme,
          merchantAccount: this.merchantAccount,
          netType: this.merchantNetype,
          areaIdList: this.cityList,
          merchantType: Number(this.merchantTypeId),
          merchantDetailSite: this.merchantDetailSite,
          businessLines: this.businessLines,
          merchantDesciption: this.merchantDesciption,
          lealPersonName: this.lealPersonName,
          contactNumber: this.contactNumber,
          merchantContact: this.merchantContact,
          merchantUrl: this.merchantUrl,
          brandList: this.brandList,
          merchantImages: this.merchantImages,
          shortVideoUrl: this.shortVideoUrl,
          papersNumber: this.papersNumber,
          papersUrl: this.papersUrl,
          papersBackUrl: this.papersBackUrl,
          papersGroup: {
            merchantId: this.merchantId,
            papersGroupId: this.papersGroupId,
            merchantLogoUrl: this.logoImg,
            productTestReportUrl: this.testImg,
            hygienicLicenseUrl: this.hygieneImg,
            businessCertificateUrl: this.manageImg,
            productCertificationUrl: this.attestationImg,
            productionLicenceUrl: this.productionImg,
            warenzeichenlizenzUrl: this.brandImg
          },
          discernSite: this.discernSite,
          siteAbscissa: this.siteAbscissa,
          siteOrdinate: this.siteOrdinate
        }

        console.log(_params)
        this.$post('/back-end/merchant/update', _params).then(res => {
          console.log(res.code)
          if (res.code === 200) {
            this.$message.success(res.desc)
            this.$router.push('/merchant/merchantHome')
          } else {
            this.$message.error(res.desc)
          }
          
        })
      }, 500);
      
      // if (_location) {
        
      // }

      
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.el-input input {
    border: none;
    border-radius: 0 !important;
  }
  /deep/.el-input__inner {
    border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
    padding: 0 0 0 6px !important;
  }
  .merchantedit {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .content-item {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 30px;
        border-bottom: 1px solid rgba(216,216,216,1);
        
        .content-item-item {
          margin-top: 20px;
          width: 32%;
          .item-title {
            font-size: 12px;
            color: rgba(128,128,128,1);
            font-weight: 400;
            margin-bottom: 10px;
          }
          .big {
            box-sizing: border-box;
            display: inline-block;
            margin-left: 10px;
            height: 40px;
            font-size: 20px;
            color: #ae1e24;
          }
        }
        .upload-item {
          width: 32%;
          margin-top: 20px;
          display: flex;
          .upload-item-title {
            width: 120px;
            color: rgba(128,128,128,1);
            font-size: 14px;
            margin-bottom: 10px;
          }
        }

        .upload-item1 {
          width: 100%;
          margin-top: 20px;
          display: flex;
          .upload-item-title {
            width: 120px;
            color: rgba(128,128,128,1);
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
      }

      .content-item:last-child {
        border: none;
      }
    }

    .confirmBtn {
      text-align: center;
    }
  }

  /deep/.avatar-uploader .el-upload {
    width: 100%;
    height: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    // height: 100%;
    height: 178px;
    display: block;
  }

  /deep/.upload-demo {
    .el-upload {
      display: flex;
      align-items: center;
    }
  }
</style>