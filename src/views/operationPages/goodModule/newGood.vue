<template>
  <div class="newgood">
      <page-content :name="$t('Goods.newGoodTitle')">
        <div class="content">
          
          <el-row>
            <!-- 选择商家 -->
            <el-col :span="12">
              <div class="item-input">
                <span style="font-size: 14px; color: red">*</span>
                <el-select
                  style="flex: 0.7"
                  v-model="merchantId"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="请输入商家名称的关键词"
                  :remote-method="getMerchantList"
                  :loading="loading">
                  <el-option
                    v-for="item in merchantList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <!-- 商品类型 -->
            <el-col :span="12" v-if="classShow">
              <div class="item-input">
                <span style="font-size: 14px; color: red">*</span>
                <el-cascader
                  style="flex: 0.7"
                  :options="thirds"
                  :props="{
                    value: 'categoryId',
                    label: 'categoryName',
                    children: 'children'
                  }"
                  clearable
                  ref="cascader"
                  v-model="categoryId"
                  @change="onProvincesChange"
                  :placeholder="$t('Goods.goodTypeInput')"
                ></el-cascader>
              </div>
              
            </el-col>
          </el-row>

          <el-row style="margin-top: 30px">
            <!-- 商品名称 -->
            <el-col :span="12">
              <div class="item-input">
                <span style="font-size: 14px; color: red">*</span>
                <el-input style="flex: 0.7" v-model="goodName" :placeholder="$t('Goods.goodNameInput')"></el-input>
              </div>
            </el-col>

            <!-- 品牌下拉 -->
            <el-col :span="12" v-for="(bItem, bidx) in brands" :key="bidx">
              <div class="item-input">
                <el-select style="flex: 0.7" :placeholder="bItem.propertyName" v-model="brandId">
                  <el-option
                    v-for="(vitem, vidx1) in bItem.comboBoxValue"
                    :key="vidx1"
                    :label="vitem.propertyValue"
                    :value="vitem.propertyValueId"
                  ></el-option>
                </el-select>
              </div>
              
            </el-col>

            <!-- 下拉类型的属性 -->
            <el-col :span="12" v-for="(citem, cidx) in comboBoxs" :key="citem.propertyId">
              <div class="item-input">
                <el-select :placeholder="citem.propertyName" style="flex: 0.7" v-model="comboBoxValue[cidx]">
                  <el-option
                    v-for="(vitem, vidx1) in citem.comboBoxValue"
                    :key="vidx1"
                    :label="vitem.propertyValue"
                    :value="vitem.propertyValueId"
                  ></el-option>
                </el-select>
              </div>
                
            </el-col>

            <!-- 文本类型的属性 -->
            <el-col :span="12" v-for="titem in textBoxs" :key="titem.propertyId">
              <div class="item-input">
                <el-input
                style="flex: 0.7"
                  type="text"
                  v-model="titem.propValue"
                  :placeholder="titem.propertyName"
                  :maxlength="titem.fieldLength"
                  show-word-limit
                ></el-input>
              </div>
              
            </el-col>
              
            <el-col :span="12">
              
              <div class="upload-item">
                <div class="upload-item-title">
                  <span style="font-size: 14px; color: red">*</span>
                  {{$t('Goods.newGoodImg')}}：
                </div>
                <el-upload
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

            <el-col :span="12">
              <div class="upload-item">
                <div class="upload-item-title">{{$t('Goods.newGoodVideo')}}：</div>
                <div>
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://zs.cntracechain.com/imageService/image/add"
                    :on-success="handlesuccess"
                    :on-remove="handleremovevideo"
                    :file-list="fileList"
                    :limit="1"
                    :auto-upload="true"
                    :data="upData"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button slot="trigger" size="small" type="primary">{{$t('Goods.newGoodVideoButton')}}</el-button>
                    <div slot="tip" class="el-upload__tip" style="color: rgba(228,16,0,1)">{{$t('Goods.newGoodVideoTip1')}}</div>
                    <div slot="tip" class="el-upload__tip" style="color: rgba(228,16,0,1)">{{$t('Goods.newGoodVideoTip2')}}</div>
                  </el-upload>
                </div>
                
              </div>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
              <div class="upload-item">
                <div class="upload-item-title">
                  <span style="font-size: 14px; color: red">*</span>
                  {{$t('Goods.newGoodDetails')}}：
                </div>
                <quill-editor ref="myQuillEditor" v-model="introduction" :options="editorOption" />
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <!-- <el-col :span="24"> -->
              <div class="confirmBtn">
                <el-button type="primary" @click="insertGood">{{$t('button.Comfirm')}}</el-button>
                <el-button type="danger" @click="$router.go(-1)">{{$t('button.cancel')}}</el-button>
              </div>
            <!-- </el-col> -->
          </el-row>
        </div>
      </page-content>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import pageContent from "../../../components/content";
import { quillEditor } from 'vue-quill-editor'
import { quillRedefine } from 'vue-quill-editor-upload'
import { toolbarOptions } from '../../../assets/js/quillEditorConfig.js'
import exifs from '../../../assets/js/exifs.js'

function getCascaderObj (val, opt) {
  return val.map(function (value, index, array) {
    for (var itm of opt) {
      if (itm.categoryId === value) {
        opt = itm.children
        return itm.categoryName
      }
    }
    return null
  })
}

export default {
  components: {
    pageContent,
    quillEditor,
    quillRedefine
  },
  data() {
    return {
      merchantId: '', // 商家id
      merchantList: [], // 商家列表
      loading: false,
      classShow: false, // 是否选择了商家
      thirds: [], // 分类列表
      categoryId: '', // 选择的分类id
      labels: [], // 选择的三级分类名称
      goodName: '', // 新建时的商品名称
      brands: [], // 品牌
      textBoxs: [], // 文本类型的属性列表
      comboBoxs: [], // 下拉类型的属性列表
      upData: {
        imgSystemId: 'newGood',
        imgSpecificUniqueValue: 'newGoodId'
      }, // 上传图片时要带的参数
      brandId: '', // 新建时的品牌id
      comboBoxValue: [], // 新建时的下拉属性id集合
      images: [], // 商品图
      shortVideoUrl: '', // 商品视频url
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      editorOption: {}, // 富文本的配置
      introduction: '' // 商品详情图或描述
    }
  },
  watch: {
    merchantId(newV, oldV) {
      if (newV) {
        this.classShow = true
      }
    },
    categoryId(newV, oldV) {
      this.getProperty(this.categoryId[2])
    }
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: { // 图片上传的设置
        action: "https://zs.cntracechain.com/imageService/file/upload",
         res: (res) => {
          //  console.log(res)
          return res.data.url
        },
        name: 'file'  // 图片上传参数名
      },
      // placeholder: '请输入编辑内容',
      toolOptions: toolbarOptions
    })
    this.getThird()
  },
  methods: {
    // 获取商家列表
    getMerchantList (query) {
      if (query !== '') {
        this.$get('/back-end/merchant/getAll', {
          allianceBusinessId: 0,
          merchantName: query
        }).then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              this.merchantList = res.data
            } else {
              this.merchantList = []
              // this.$common.error('当前没有商家数据，请去添加商家！')
            }
          }
        })
      } else {
        this.merchantList = []
      }
    },
    // 获取商品分类的列表
    getThird() {
      this.$get('/back-end/category/getThird').then(res => {
        this.thirds = res.data
      })
    },
    /**
     * 获取分类属性
     * 返回的数据：1、判断 propertyId(为-1时时品牌)
     *            2、判断 enterType（为0时时文本框的，为1时是下拉类型的）
     */
    getProperty(categoryId) {
      this.$get('/back-end/property/get/' + categoryId + '/' + this.merchantId).then(res => {
        console.log(res)
        let _data = res.data
        let _brands = []
        let _comboBoxs = []
        let _textBoxs = []
        _data.forEach(item => {
          if (item.propertyId === -1) {
            _brands.push(item)
          } else {
            if (item.enterType === 0) {
              _textBoxs.push({
                propertyName: item.propertyName,
                  propertyValueId: item.comboBoxValue[0].propertyValueId,
                  propValue: '',
                  fieldLength: item.fieldLength
              })
            } else {
              _comboBoxs.push(item)
            }
          }
        })

        this.brands = _brands
        this.comboBoxs = _comboBoxs
        this.textBoxs = _textBoxs
        // 
      })
    },
    // 获取到三级分类全称
    onProvincesChange (item) {
      // this.labels = this.$refs['cascader'].currentLabels
      // console.log(item, this.$refs['cascader'].currentLabels)
      this.labels = getCascaderObj(this.categoryId, this.thirds)
    },
    // 上传产品图
    upimg(response, file, fileList) {
      let _image = {
        url: response.data[0].imgUrl
      }
      this.images.push(_image)
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].imageIndex = i
      }
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除图片的操作
    handleRemove(file) {
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].url === file.url) {
          this.images.splice(i, 1)
        }
      }
    },
    // 上传图片之前的钩子
    beforeImgUpload (file) {
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
    // 上传视频
    handlesuccess(file) {
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
    // 删除视频
    handleremovevideo() {
      this.shortVideoUrl = ''
    },
    // 限制只能上传视频
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'ogg'
      const extension2 = testmsg === 'mp4'
      const extension3 = testmsg === 'webm'
      const isLt2M = file.size / 1024 / 1024 < 50

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
    // 新建商品
    insertGood() {
      // 文本框的属性值
      let _textValue = []
      this.textBoxs.forEach(item => {
        _textValue.push({
          textBoxValueId: item.propertyValueId,
          textBoxValue: item.propValue
        })
      })

      // 上传的商品图片
      let _goodImgs = []
      this.images.forEach(item => {
        _goodImgs.push({
          imageUrl: item.url,
          imageIndex: item.imageIndex
        })
      })

      // 新建商品时所需要的参数
      let _params = {
        goodsName: this.goodName,
        merchantId: this.merchantId,
        categoryId: this.categoryId[2],
        categoryFullName: this.labels.join('/'),
        introductionInfo: this.introduction,
        brandId: this.brandId ? this.brandId : null,
        comboBoxValue: this.comboBoxValue ? this.comboBoxValue : null,
        textValue: _textValue.length > 0 ? _textValue : null,
        images: _goodImgs,
        videoUrl: this.shortVideoUrl
      }
      let verify =  this.verifyParams(_params)
      
      if (verify) {
        console.log(1111)
        this.$post('/back-end/goods/insert', _params).then(res => {
          if (res.code === 200) {
            this.$message.success(this.$t('Goods.newGoodSuccess'))
            setTimeout(() => {
              this.$router.go(-1)
            }, 500);
          } else {
            this.$message.error(res.desc)
          }
          
        })
      }

    },
    // 验证必填项是否填写了
    verifyParams(_data) {
      if (!_data.goodsName) {
        this.$message.error(this.$t('Goods.newGoodNameTip'))
        return false
      }
      if (!_data.categoryId) {
        this.$message.error(this.$t('Goods.newGoodCategoryIdTip'))
        return false
      }
      if (!_data.images.length > 0) {
        this.$message.error(this.$t('Goods.newGoodImgsTip'))
        return false
      }
      if (!_data.introductionInfo) {
        this.$message.error(this.$t('Goods.newGoodIntroductionTip'))
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色
  /deep/.el-input input {
    border: none;
    border-radius: 0 !important;
  }
  /deep/.el-input__inner {
    border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
    padding: 0 !important;
  }
  .newgood {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
    }
  }

  .upload-item {
    margin-top: 10px;
    .upload-item-title {
      color: rgba(128,128,128,1);
      font-size: 14px;
      margin-bottom: 10px;
    }
  }

  // 富文本框
  /deep/.ql-editor{
    height:400px;
  }

  /deep/.upload-demo {
    .el-upload {
      display: flex;
      align-items: center;
    }
  }
</style>