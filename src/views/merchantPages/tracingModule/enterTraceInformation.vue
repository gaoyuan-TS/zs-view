<template>
  <div class="traceInformation">
    <page-content :name="$t('Trace.traceInformation.traceInformationTitle')">
      <div class="content">
        <!-- 头部信息区域 -->
        <el-row type="flex">
          <el-col :span="6">
            <div class="content-top-item">
              <div style="font-size: 12px">{{$t('Trace.traceInformation.lotNumber')}}</div>
              <div style="font-size: 14px">
                {{traceInfo.traceCodeNumber}}
              </div>
            </div>
            
          </el-col>

          <el-col :span="7">
            <div class="content-top-item">
              <div style="font-size: 12px">{{$t('Trace.traceInformation.trackingNumber')}}</div>
              <div style="font-size: 14px">
                {{traceInfo.traceApplyCount}}
              </div>
            </div>
            
          </el-col>

          <el-col :span="7">
            <div class="content-top-item">
              <div style="font-size: 12px">{{$t('Trace.traceInformation.remainingAmount')}}</div>
              <div style="font-size: 14px">
                {{traceInfo.traceEnableCount}}
              </div>
            </div>
            
          </el-col>
          <el-col :span="3">
            <div class="item-input">
              <el-popover placement="left-start" :title="$t('Trace.traceInformation.enterHistory')" width="480" trigger="click" style="font-size: 14px">
                <div class="historical-con">
                  <div class="historical-con-item" v-for="(hItem, hidx) in historyList" :key="hidx">
                    <div>{{hItem.traceGoodsName}}</div>
                    <div>{{hItem.traceFromNumber}}-{{hItem.traceToNumber}}(sid：{{hItem.fromSid}}-{{hItem.toSid}})</div>
                  </div>
                </div>
                <el-button style="width: 100%" slot="reference">{{$t('Trace.traceInformation.viewHisroty')}}</el-button>
              </el-popover>

              <!-- <el-button type="primary">{{$t('button.history')}}</el-button> -->
            </div>
          </el-col>

        </el-row>

        <el-row type="flex" style="margin-top: 20px">

          <el-col :span="6">
            <div class="content-top-item" style="height: 50px">
              <div style="font-size: 12px">初始sid</div>
              <div style="font-size: 14px">
                {{traceInfo.sidStart}}
              </div>
            </div>
            
          </el-col>

          <el-col :span="6">
            <div class="content-top-item">
              <div style="font-size: 12px">结束sid</div>
              <div style="font-size: 14px">
                {{traceInfo.sidEnd}}
              </div>
            </div>
            
          </el-col>
          
        </el-row>

        <div style="margin-top: 40px;">
          <!-- <div style="color: red; font-size: 14px; margin-bottom: 10px">{{$t('Trace.traceInformation.promptTip')}}</div> -->
          <!-- 新建追溯区域 -->
          <div class="content-information">
            <el-row type="flex" justify="space-between" v-for="(item, idx) in list" :key="idx" style="margin-bottom: 20px">
              <!-- <el-col :span="10">
                <div class="item-input">
                  <div style="font-size: 14px; padding-right: 8px">{{$t('Trace.traceInformation.numbering')}}</div>
                  <el-input v-model="item.traceFromNumber" style="flex: 1"></el-input>
                  <div style="font-size: 14px; width: 60px; text-align: center;">{{$t('Trace.traceInformation.to')}}</div>
                  <el-input v-model="item.traceToNumber" style="flex: 1"></el-input>
                </div>
              </el-col> -->
              <el-col :span="5">
                <div style="font-size: 12px; color: #808080; line-height: 16px;"><span style="color: red">*</span> sid</div>
                <div class="item-input" style="height: 40px">
                  <el-input v-model="item.traceFromNumber" style="flex: 1"></el-input>
                </div>
              </el-col>

              <el-col :span="5">
                <div style="font-size: 12px; color: #808080; line-height: 16px;"><span style="color: red">*</span> sid</div>
                <div class="item-input" style="height: 40px">
                  <el-input v-model="item.traceToNumber" style="flex: 1"></el-input>
                </div>
              </el-col>

              <el-col :span="4">
                <div style="font-size: 12px; color: #808080; line-height: 16px;"><span style="color: red">*</span> 生产批次</div>
                <div class="item-input" style="height: 40px">
                  <el-select
                    style="flex:1"
                    v-model="item.productionBatch"
                    filterable
                    :placeholder="'生产批次'"
                    @change="(val) => {
                      getGoodList(val, idx)
                    }"
                  >
                    <el-option
                      v-for="item1 in productionBatchList"
                      :key="item1.batchId"
                      :label="item1.batchNo"
                      :value="item1.batchNo"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="5">
                <div style="font-size: 12px; color: #808080; line-height: 16px;"><span style="color: red">*</span> 商品</div>
                <div class="item-input" style="height: 40px">
                  <el-select
                    style="flex:1"
                    v-model="item.traceGoodId"
                    filterable
                    :placeholder="$t('Trace.traceInformation.commodity')"
                    @change="changeGoodList(idx)"
                  >
                    <el-option
                      v-for="item1 in optionsGoodList[idx]"
                      :key="item1.goods_id"
                      :label="item1.goods_name"
                      :value="item1.goods_id"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <!-- <el-col :span="4">
                <div class="item-input">
                  <el-button type="text" @click="addLink(idx)">
                    Add production link
                  </el-button>
                </div>
              </el-col> -->
              <el-col :span="3">
                <div class="item-input">
                  <el-button style="flex: 0.8" type="primary" @click="add" v-if="idx === 0">{{$t('Trace.traceInformation.add')}}</el-button>
                  <el-button style="flex: 0.8" type="danger" v-else @click="deleteCase(idx)">{{$t('Trace.traceInformation.delete')}}</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        
        <div class="content-footer">
          <el-button type="primary" @click="saveTracebatch">{{this.$t('button.Comfirm')}}</el-button>
          <el-button type="danger" style="margin-left: 56px" @click="$router.go(-1)">{{this.$t('button.cancel')}}</el-button>
        </div>
      </div>
      
      <!-- 生产环节弹窗 -->
      <el-dialog :visible.sync="processDialog" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">Add production link</div>
        <div class="processDialog-con">
          <div class="processDialog-con-item" v-for="(litem, lindex) in list[proIdx].productionLinks" :key="lindex">
            <div class="processDialog-con-item-left">
              <div class="item">
                <div>
                  <el-input
                    :placeholder="$t('Trace.traceInformation.lnkName')"
                    v-model="productionName[proIdx].proname[lindex]"
                    @change="((val) => {
                      changeLinkName(val, lindex)
                    })"
                    clearable
                    maxlength="20"
                    show-word-limit>
                  </el-input>
                </div>
              </div>
              <div class="item">
                <div>
                  <el-date-picker
                    v-model="time[proIdx].proTime[lindex]"
                    type="datetime"
                    @change="(val) => {
                      changeTIme(val, lindex)
                    }"
                    :placeholder="$t('Trace.traceInformation.seleteDate')"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="12:00:00">
                  </el-date-picker>
                </div>
              </div>
              <div class="item">
                <div>
                  <el-input
                    v-model="productionMan[proIdx].proman[lindex]"
                    :placeholder="$t('Trace.traceInformation.personCharge')"
                    @change="(val) => {
                      changeproductionMan(val, lindex)
                    }"
                    clearable
                    maxlength="20"
                    show-word-limit>
                  </el-input>
                </div>
              </div>
              <div class="item">
                <div class="item-title" style="margin-bottom: 10px;"><span style="color:rgba(241, 0, 0, 1)">*</span>{{$t('Trace.traceInformation.productPictures')}}</div>
                <div>
                  <el-upload
                    action="https://zs.cntracechain.com/imageService/image/addBatch"
                    :data="upData"
                    list-type="picture-card"
                    multiple
                    :file-list="images[proIdx].proImgs[lindex].imges"
                    name="files"
                    :on-success="upimg"
                    :before-upload="(file) => {
                      return beforeImgUpload(file, lindex)
                    }"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="(file) => {
                      return handleRemove(file, lindex)
                    }"
                  >
                    <i class="el-icon-picture"></i>
                  </el-upload>
                </div>
              </div>
              <div class="item">
                <div>
                  <el-input
                    type="textarea"
                    v-model="productionDescripe[proIdx].proDesc[lindex]" :placeholder="$t('Trace.traceInformation.traceInformation')" maxlength="50"
                    show-word-limit>
                  </el-input>
                </div>
              </div>
            </div>
            <div style="flex: 1; margin-left: 35px">
              <!-- <el-button style="flex: 0.8" type="primary">{{$t('Trace.traceInformation.add')}}</el-button> -->
              <el-button type="danger" v-if="lindex === 0" @click="addProductionLinks">{{$t('Trace.traceInformation.add')}}</el-button>
              <el-button type="danger" v-if="lindex !== 0" @click="deleteProductionLinks(lindex)">{{$t('Trace.traceInformation.delete')}}</el-button>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="linkCon">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancelCon">{{this.$t('button.cancel')}}</el-button>
          </div>
        </div>
      </el-dialog>

    </page-content>
  </div>
</template>

<script>
import pageContent from '../../../components/content.vue'

import exifs from '../../../assets/js/exifs.js'
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '', // 商家id
      traceId: this.$route.query.traceId,
      optionsGoodList: [], // 商品列表
      productionBatchList: [
        {batchId: 1, batchNo: 'SC00001'}
      ],
      traceInfo: {}, //追溯信息详情
      historyList: [], // 历史记录列表
      nextSid: '', // 初始Sid
      subParam: {
        mobile: ''
      },
      traceGoodId: '',
      list: [
        {
          traceCodeNumber: '',
          traceFromNumber: '',
          traceGoodId: '',
          traceStallId: -1,
          traceToNumber: '',
          productionBatch: '',
          // productionLinks: [
          //   {
          //     productionName: '',
          //     productionTime: '',
          //     productionMan: '',
          //     productionDescripe: '',
          //     productionPicList: []
          //   }
          // ]
        }
      ],
      proIdx: 0,
      proShow: false,
      processDialog: false,
      upData: {
        imgSystemId: 'newGood',
        imgSpecificUniqueValue: 'newGoodId'
      }, // 上传图片时要带的参数
      images: [],
      time: [{
        proTime: []
      }], // 生产环节的时间
      productionName: [{
        proname: []
      }], // 生产环节的环节名称
      productionMan: [{
        proman: []
      }], // 生产环节的负责人
      productionDescripe: [{
        proDesc: []
      }], // 生产环节的环节描述
      images: [
        {
          proImgs: [
            {imges: []}
          ]
        }
      ], // 生产环节的图片
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getTraceInfo()
    this.getProductList()
    this.getGoodList()
  },
  methods: {
    // 获取追溯记录历史
    gethistory() {
      this.$get('/trace-api/trace/getTraceRecordByPage?traceCodeNumber=' + this.traceInfo.traceCodeNumber + '&pageSize=1000000').then(res => {
        this.historyList = res.data.list || []
      })
    },
    // 获取商家的生产批次列表
    getProductList () {
      this.$get('/trace-api/p_batch/batchListByMerchant/' + this.merchantId).then(res => {
        this.productionBatchList = res.data || []
      })
    },
    // 根据选择的选择的生产批次获取商家的商品列表
    getGoodList(val, idx) {
      this.$get('/trace-api/p_batch/goodsListByBatchNo/' + val).then(res => {
        if (res.data.length > 0) {
          let goodList = res.data

          // this.optionsGoodList[idx] = goodList

          this.$set(this.optionsGoodList, idx, goodList)
          // goodList.forEach(element => {

          //   this.optionsGoodList.push({
          //     label: element.goods_name,
          //     value: element.goods_id
          //   })
          // })
        } else {
          this.optionsGoodList = []
        }
        
      })
    },
    // 获取追溯信息
    getTraceInfo() {
      this.$get('/trace-api/trace/'+this.traceId).then(res => {
        this.traceInfo = res.data
        // this.getNexSid(res.data.traceCodeNumber)
        this.gethistory()
      })
    },
    // 获取初始Sid
    getNexSid(traceCodeNumber) {
      this.$get('/trace-api/trace/getNextSidByCodeNumber', {
        traceCodeNumber: traceCodeNumber
      }).then(res => {
        this.list[0].traceFromNumber = res.data
      })
    },
    // 选择商品时的事件
    changeGoodList (index) {
      // this.list[index]["traceGoodId"] = val;
      this.list[index]['traceCodeNumber'] = this.traceInfo.traceCodeNumber
      // console.log(this.list)
    },
    add() {
      this.list.push({
        traceCodeNumber: '',
        traceFromNumber: '',
        traceGoodId: '',
        traceStallId: '',
        traceToNumber: ''
      })
    },
    // 点击添加生产环节
    addLink (idx) {
      let idxs = 'pros' + idx
      console.log(idxs)
      this.proIdx = idx
      this.proShow = true
      // this.productionName.push({
      //   proname: []
      // })
      if (idx !== 0) {
        if (idx !== this.productionName.length - 1) {
          // this.productionName.pro1 = []
          this.productionName.push({
            proname: []
          })
          this.productionMan.push({
            proman: []
          })
          this.time.push({
            proTime: []
          })
          this.productionDescripe.push({
            proDesc: []
          })
          this.list[idx]['productionLinks'] = [
            {
              productionName: '',
              productionTime: '',
              productionMan: '',
              productionDescripe: '',
              productionPicList: []
            }
          ]
          this.images.push({
            proImgs: [
              {imges: []}
            ]
          })
        }
      }
      this.processDialog = true
    },
     // 生产环节输入环节名称
    changeLinkName (val, idx) {
      this.list[this.proIdx].productionLinks[idx].productionName = val
    },
     // 生产环节选择时间
    changeTIme (val, idx) {
      if (val) {
        this.list[this.proIdx].productionLinks[idx].productionTime = new Date(val).valueOf()
      }
    },
    // 生产环节输入负责人
    changeproductionMan (val, idx) {
      this.list[this.proIdx].productionLinks[idx].productionMan = val
    },
    // 生产环节选择时间
    changeTIme (val, idx) {
      if (val) {
        this.list[this.proIdx].productionLinks[idx].productionTime = new Date(val).valueOf()
      }
    },
    // 生产环节输入环节描述
    changeproductionDescripe (val, idx) {
      this.list[this.proIdx].productionLinks[idx].productionDescripe = val
    },
    // 增加生产环节按钮事件
    addProductionLinks () {
      let _list = this.list[this.proIdx]
      let _proImages = this.images[this.proIdx]
      _proImages.proImgs.push({
        imges: []
      })
      _list.productionLinks.push({
        productionName: '',
        productionTime: '',
        productionMan: '',
        productionDescripe: '',
        productionPicList: []
      })
      // this.$set(this.list, this.proIdx, _list)
      // this.list[this.proIdx] = _list
      this.list.splice(this.proIdx, 1, _list)
      this.images.splice(this.proIdx, 1, _proImages)
    },
    // 删除一个生产环节
    deleteProductionLinks (lidx) {
      let _list = this.list[this.proIdx]
      let _proImages = this.images[this.proIdx]
      this.productionName[this.proIdx].proname.splice(lidx, 1)
      this.time[this.proIdx].proTime.splice(lidx, 1)
      this.productionMan[this.proIdx].proman.splice(lidx, 1)
      this.images[this.proIdx].proImgs.splice(lidx, 1)
      this.productionDescripe[this.proIdx].proDesc.splice(lidx, 1)
      _proImages.proImgs.splice(lidx, 1)
      _list.productionLinks.splice(lidx, 1)
      this.$set(this.list, this.proIdx, _list)
      this.$set(this.images, this.proIdx, _proImages)
      // this.list[this.proIdx].productionLinks.splice(lidx, 1)
    },
    deleteCase(idx) {
      this.list.splice(idx, 1)
    },
    upimg(response) {
      var _image = {
        url: response.data[0].imgUrl
        // imageIndex: this.imageIndex
      }
      this.images[this.proIdx].proImgs[this.litemIdx].imges.push(_image)
      this.list[this.proIdx].productionLinks[this.litemIdx].productionPicList.push(response.data[0].imgUrl)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, idx) {
      let _image = this.images[this.proIdx].proImgs[idx].imges
      // console.log(_image)
      for (let l = 0; l < _image.length; l++) {
        if (_image[l].url === file.url) {
          this.images[this.proIdx].proImgs[idx].imges.splice(l, 1)
        }
      }
      this.list[this.proIdx].productionLinks[this.litemIdx].productionPicList.splice(idx, 1)
      let _images = this.list[this.proIdx].productionLinks[idx].productionPicList
      // console.log(_images)
      // console.log(file)
      for (let i = 0; i < _images.length; i++) {
        if (_images[i] === file.url) {
          this.list[this.proIdx].productionLinks[idx].productionPicList.splice(i, 1)
        }
      }
    },
    beforeImgUpload(file, data){
      this.litemIdx = data
      console.log(data)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'mp3'
      const extension2 = testmsg === 'mp4'
      const extension3 = testmsg === 'avi'
      const isLt2M = (file.size / 1024 / 1024 <= 10)
      if (!isLt2M) {
        // extension && !extension2 && !extension3
        // this.$message.error('上传图片只能是 png,jpg,jpeg 格式!')
        this.$message.error(this.$t('uploadimg.tenM'))
        return false
      } else if (extension || extension2 || extension3) {
        this.$message.error(this.$t('uploadimg.noTip'))
        return false
      } else {
        return new Promise(resolve => {
          exifs.getOrientation(file).then(orient => {
            // console.log(orient, 'Orient')
            if (orient !== '' && orient !== 0 && orient !== 1 && orient !== undefined) {
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
    // 生产环节弹窗  点击取消时的事件
    cancelCon () {
      this.$confirm(this.$t('confirm.traceEnter'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        // console.log('点击确认')
        this.processDialog = false
        if (this.proIdx !== 0) {
          this.$delete(this.list[this.proIdx], 'productionLinks')
          // this.$delete(this.productionName[this.proIdx], )
          this.productionName.splice(this.proIdx, 1)
          this.time.splice(this.proIdx, 1)
          this.productionMan.splice(this.proIdx, 1)
          this.productionDescripe.splice(this.proIdx, 1)
          this.images.splice(this.proIdx, 1)
        } else {
          this.list[this.proIdx].productionLinks = [
            {
              productionName: '',
              productionTime: '',
              productionMan: '',
              productionDescripe: '',
              productionPicList: []
            }
          ]
          this.productionName[this.proIdx].proname = []
          this.time[this.proIdx].proTime = []
          this.productionMan[this.proIdx].proman = []
          this.productionDescripe[this.proIdx].proDesc = []
          this.images[this.proIdx].proImgs[0].imges = []
        }
      }).catch(action => {
        console.log('点击取消')
      })
    },
    // 生产环节弹窗的确定按钮事件
    linkCon () {
      let _productionLinks = this.list[this.proIdx].productionLinks
      let _dialogShow = false
      _productionLinks.forEach(item => {
        if (!item.productionName) {
          _dialogShow = false
          this.$common.error(this.$t('Trace.traceInformation.linkDialogLinkName'))
          return false
        } else if (!item.productionTime) {
          _dialogShow = false
          this.$common.error(this.$t('Trace.traceInformation.linkDialogTime'))
          return false
        } else if (!item.productionMan) {
          _dialogShow = false
          this.$common.error(this.$t('Trace.traceInformation.linkDialogMan'))
          return false
        } else {
          _dialogShow = true
        }

        // else {
        //   this.dialogVisible = false
        //   this.productionName = []
        //   this.productionMan = []
        //   this.productionDescripe = []
        //   this.time = []
        // }
      })
      if (_dialogShow) {
        this.processDialog = false
      }
    },
    // 录入追溯信息
    saveTracebatch() {
      let listArr = this.list
      console.log(listArr)
      for(const iterator of listArr) {
        if(!iterator.traceToNumber || !iterator.traceFromNumber) {
          this.$message.error(this.$t('Trace.traceInformation.traceNumber'))
          return false
        }
        if (!iterator.traceGoodId) {
          this.$message.error(this.$t('Trace.traceInformation.selectGood'))
          return false
        }
      }

      if (this.proShow === false) {
        this.$delete(this.list[0], 'productionLinks')
      }
      this.$confirm(
        this.$t('Trace.traceInformation.whetherSave'),
        this.$t('Trace.traceInformation.enterGoodTip'),
        {
          confirmButtonText: this.$t('confirm.conTo'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }
      ).then(() => {
        setTimeout(() => {
          this.$confirm(
            this.$t('Trace.traceInformation.buintegral'),
            this.$t('Trace.traceInformation.goTopUp'),
            {
              confirmButtonText: this.$t('button.Comfirm'),
              cancelButtonText: this.$t('button.cancel'),
              type: 'warning'
            }
          ).then(() => {
            console.log(this.list)
            this.$post('/trace-api/trace/record/batch', this.list).then(res => {
              if (res.code === 200) {
                this.$message.success(this.$t('Trace.traceInformation.traceEnterSuccess'))
                this.$router.go(-1)
              } else {
                this.$message.error(res.message)
              }
            })
          })
        })
      })
      
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
  /deep/.el-upload--picture-card {
    background: rgba(247,247,247,1) !important;
  }
  .traceInformation {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
      .content-top-item {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .content-information {
        // height: 6.25rem;
        min-height: 4.25rem;
        border: 1px solid #dddddd;
        padding: 16px 24px;
      }
      .content-footer {
        text-align: center;
      }
    }

    .processDialog-con {
      .processDialog-con-item {
        display: flex;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        .processDialog-con-item-left {
          padding: 30px 30px;
          width: 70%;
          background: rgba(247,247,247,1);
          .item {
            margin-top: 20px;
            &:first-child {
              margin-top: 0;
            }

            /deep/.el-input__inner {
              border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
              padding: 0 !important;
              background: rgba(247,247,247,1) !important;
            }
          }
        }
      }
    }
  }

  .historical-con {
    max-height: 300px;
    overflow: auto;
    .historical-con-item {
      display: flex;
      margin-top: 10px;
      div {
        flex: 1;
      }
    }
  }
</style>