<template>
  <div class="newmaterial">
    <page-content name="新增原材料">
      <div class="content">
        <div style="font-size: 14px">原材料信息</div>

        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="name" placeholder="原材料名称" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="attributeName" placeholder="属性名称" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="attributeDetails" placeholder="属性明细" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="item-input item-button">
              <el-button type="primary" class="save" @click="newAttribute">添加</el-button>
            </div>
            
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" style="margin-top: 18px">
          <el-col :span="6">
            <div class="uploadtitle" style="font-size: 14px"><span style="color: red; font-size: 16px; margin-right: 6px">*</span>上传多张照片</div>
            <div>
              <el-upload
                style="margin-top:10px"
                action="https://zs.cntracechain.com/imageService/image/addBatch"
                :data="upData"
                list-type="picture-card"
                multiple
                :file-list="images"
                name="files"
                :on-success="upimg"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeImgUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
          </el-col>

          <el-col :span="17">
            <div class="attribute-con">
              <div class="attribute-con-title">已添加属性</div>
              <div class="attribute-con-con">
                <div v-for="(attItem, attIdx) in attributeList" :key="attIdx">
                  <!-- 属性1：xxxxxxx -->
                  {{attItem.attributeName}}：{{attItem.attributeValue}}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 原材料来源信息 -->
        <el-row style="margin-top: 40px">
          <el-col :span="24">
            <div style="font-size: 14px">原材料来源信息</div>
            
          </el-col>

          
        </el-row>

        <el-row style="margin-top: 12px" type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="materialSource" placeholder="原材料供应商" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="mobile" placeholder="联系电话" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="address" placeholder="地址" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="principal" placeholder="经手人" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <!-- 入库信息 -->
        
        <el-row type="flex" align="middle" style="margin-top: 40px">
          <el-col :span="3" style="font-size: 14px">
            入库信息
            <!-- <div ></div> -->
          </el-col>
          <el-col :span="4">
            <div class="item-input item-button">
              <el-button type="primary" @click="addWare">新增</el-button>
            </div>
          </el-col>
        </el-row>
        <div v-for="(wareItem, wareIdx) in warehouseList" :key="wareIdx" class="incomingInfo">
          <el-row style="margin-top: 12px" type="flex" justify="space-between">
            <el-col :span="5">
              <div class="item-input">
                <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
                <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="wareItem.stock" placeholder="原材料数量" style="flex: 1"></el-input>
                <span style="font-size: 16px">{{wareItem.units}}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item-input">
                <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
                <el-input v-model="wareItem.warehouseOrder" placeholder="入库单号" style="flex: 1"></el-input>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item-input">
                <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
                <el-input v-model="wareItem.warehouseName" placeholder="存放库房" style="flex: 1"></el-input>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item-input">
                <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
                <el-input v-model="wareItem.warehouseNumber" placeholder="库房编号" style="flex: 1"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="uploadtitle" style="font-size: 14px"><span style="color: red; font-size: 16px; margin-right: 6px">*</span>原材料抽样报告<span style="font-size: 12px; color: #EF4235; margin-left: 10px">支持扩展名：jpeg .png .jpg,大小不超过10m</span></div>
              <div style="margin-top: 10px">
                <el-upload
                  class="avatar-uploader"
                  action="https://zs.cntracechain.com/imageService/image/add"
                  :show-file-list="false"
                  :on-success="(res) => {
                    upReportUrl(res, wareIdx)
                  }"
                  :data="upData"
                  :before-upload="beforeImgUpload"
                >
                  <img
                    v-if="wareItem.reportUrl"
                    :src="wareItem.reportUrl"
                    class="avatar"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <el-row type="flex" justify="center">
          <div class="confirmBtn">
            <el-button type="primary" @click="insertMaterial">{{$t('button.Comfirm')}}</el-button>
            <el-button type="danger" @click="$router.go(-1)">{{$t('button.cancel')}}</el-button>
          </div>
        </el-row>
      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content"

import exifs from '../../../assets/js/exifs.js'
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '', // 商家id
      name: '',
      attributeName: '', // 属性名称
      attributeDetails: '', // 属性明细
      attributeList: [], // 属性列表
      images: [], // 材料图片
      materialSource: '', // 原材料来源
      mobile: '', // 联系电话
      address: '', // 地址
      principal: '', // 经手人
      productionImg: '',
      warehouseList: [
        {
          stock: '', // 库存/原材料数量
          units: 'kg', // 质量单位
          warehouseOrder: '', // 入库单号
          warehouseName: '', // 库房名称
          warehouseNumber: '', // 库房编号
          reportUrl: '' // 抽检报告
        }
      ],
      dialogVisible: false,
      dialogImageUrl: '',
      upData: {
        imgSystemId: 'newGood',
        imgSpecificUniqueValue: 'newGoodId'
      }, // 上传图片时要带的参数
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
  },
  methods: {
    // 上传原材料的多张图片
    upimg(response, file, fileList) {
      let _image = {
        url: response.data[0].imgUrl
      }
      this.images.push(_image)
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].imageIndex = i
      }
    },
    // 删除图片
    handleRemove(file) {
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].url === file.url) {
          this.images.splice(i, 1)
        }
      }
    },
    // 上传图片前的钩子
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const extension4 = testmsg === 'PNG'
      const extension5 = testmsg === 'JPG'
      const extension6 = testmsg === 'JPEG'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message.error(this.$t('uploadimg.format'))
        return false
      } else {
        return new Promise(resolve => {
          exifs.getOrientation(file).then(orient => {
            // console.log(orient, 'Orient')
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加属性
    newAttribute() {
      if (!this.attributeName) {
        this.$message.error('请输入属性名称')
        return false
      }

      if (!this.attributeDetails) {
        this.$message.error('请输入属性明细')
        return false
      }

      this.attributeList.push({
        attributeName: this.attributeName,
        attributeValue: this.attributeDetails
      })

      this.attributeName = ''
      this.attributeDetails = ''
    },
    // 新增入库信息
    addWare() {
      this.warehouseList.push({
        stock: '', // 库存
        units: 'kg',
        warehouseOrder: '', // 入库单号
        warehouseName: '', // 库房名称
        warehouseNumber: '', // 库房编号
        reportUrl: ''
      })
    },
    // 上传抽检报告
    upReportUrl(response, idx) {
      console.log(response)
      this.warehouseList[idx].reportUrl = response.data.imgUrl
    },
    // 新增原材料
    insertMaterial() {
      let _imgs = []
      if (this.images) {
        this.images.forEach(item => {
          _imgs.push({
            imageUrl: item.url
          })
        })
      } else {
        this.$message.error('请至少上传一张材料的图片')
        return false
      }
      
      let _params = {
        merchantId: this.merchantId,
        materialName: this.name,
        attributesList: this.attributeList,
        imageList: _imgs,
        materialSource: this.materialSource,
        mobile: this.mobile,
        address: this.address,
        principal: this.principal,
        warehouseList: this.warehouseList
      }

      if (!_params.materialName) {
        this.$message.error('请输入原材料名称')
        return false
      }
      if (!_params.attributesList.length > 0) {
        this.$message.error('请去添加属性')
        return false
      }

      if (!_params.materialSource) {
        this.$message.error('请输入原材料来源')
        return false
      }
      if (!_params.mobile) {
        this.$message.error('请输入联系电话')
        return false
      }
      if (!_params.address) {
        this.$message.error('请输入地址')
        return false
      }
      if (!_params.principal) {
        this.$message.error('请输入经手人')
        return false
      }
      let _type = true
      _params.warehouseList.forEach(item => {
        if (!item.stock) {
          this.$message.error('请输入库存数量')
          _type = false
          return false
        }
        if (!item.warehouseOrder) {
          this.$message.error('请输入入库单号')
          _type = false
          return false
        }
        if (!item.warehouseName) {
          this.$message.error('请输入库房名称')
          _type = false
          return false
        }
        if (!item.warehouseNumber) {
          this.$message.error('请输入库房的编号')
          _type = false
          return false
        }
        if (!item.reportUrl) {
          this.$message.error('请上传抽检报告')
          _type = false
          return false 
        }
      })

      if (_type) {
        this.$post('/material-admin/material/insert', _params).then(res => {
          if (res.statusCode === 200) {
            this.$message.success(res.statusMsg)
            this.$router.go(-1)
          } else {
            this.$message.error(res.statusMsg)
          }
        })
      }
      
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
    padding: 0 !important;
  }
  .newmaterial {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .uploadtitle {
        margin-top: 40px;
        font-size: 14px;
        color: #808080;
      }


      .attribute-con {
        height: 218px;
        background: #F8F8F8;
        padding: 0 20px;
        .attribute-con-title {
          padding: 15px 0;
          font-size: 14px;
          color: #333333;
        }

        .attribute-con-con {
          height: calc(100% - 54px);
          overflow: auto;
          margin-left: 15px;
          color: #808080;
          font-size: 14px;
          // margin-bottom: 15px;
        }
      }

      .incomingInfo {
        &:last-child {
          border-bottom: 0;
        }
        border-bottom: 1px solid #DDDDDD;
      }

      
    }
    // .incomingInfo:last-child {
      
    // }
    .page {
      margin-top: 20px;
      text-align: right;
      // height: 0.32rem;
      /deep/.el-pagination {
        height: 100%;
        padding: 0;
      }
    }
  }

  /deep/.avatar-uploader .el-upload {
    // width: 100%;
    // height: 100%;
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
</style>