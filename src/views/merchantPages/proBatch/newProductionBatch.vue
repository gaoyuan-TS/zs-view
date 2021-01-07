<template>
  <!-- 生产批次新建模块 -->
  <div class="productioncreate">
    <page-content name="新建生产批次">
      <div class="content">
        <el-row type="flex" justify="space-between" style="padding: 0 20px">
          <el-col :span="5">
            <div class="item-input">
              <div class="item-title">
                <span style="color:rgba(241, 0, 0, 1)">*</span>
              </div>
              <el-input v-model="batchNo" placeholder="生产批次号"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <div class="item-title">
                <span style="color:rgba(241, 0, 0, 1)">*</span>
              </div>
              <el-select v-model="goodsId" placeholder="商品名称" @change="getScenarioList">
                <el-option
                  v-for="item in goodList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <!-- <el-col :span="5">
            <div class="item-input">
              <div class="item-title">
                <span style="color:rgba(241, 0, 0, 1)">*</span>
              </div>
              <el-select v-model="input2" placeholder="商家名称">
                <el-option
                  v-for="item in business"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col> -->
          <!-- 预览按钮 -->
          <el-col :span="6">
            <div class="item-input">
              <!-- <el-button
                class="item-btn"
                type="primary"
                style="width: 130px;
                height: 40px;"
              >预览</el-button> -->
            </div>
          </el-col>
        </el-row>
        <div class="title" style="padding: 0 20px">同商品的生产批次号不能重复</div>
        
        

        <div v-for="(sceItem, sceIdx) in scenarioList" :key="sceIdx" style="">

          <!-- 中间线 -->
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <div class="central"></div>
            </el-col>
          </el-row>

          <div class="title" style="margin-top: 20px;padding: 0 15px">填写日期和员工的场景方可在扫码页面显示</div>

          <el-row style="margin-top: 12px; padding: 0 20px">
            <el-col :span="6">
              <div class="item-input">
                <div class="input-title">日期</div>
                <el-date-picker
                  style="flex: 1"
                  v-model="sceItem.time"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
              
            </el-col>

            <el-col :span="6" style="margin-left:20px; padding: 0 20px">
              <div class="item-input">
                <el-select v-model="sceItem.employeId" placeholder="选择员工">
                  <el-option
                    v-for="item in personnels"
                    :key="item.accountId"
                    :label="item.realName"
                    :value="item.accountId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <!-- 场景信息 -->
          <el-row style="margin-top: 25px; color: #333333;font-weight: 500;padding: 0 20px">
            <el-col :span="6">
              <div class="item-input" style="font-size: 16px">
                场景名称：{{sceItem.name}}
              </div>
            </el-col>
            <el-col :span="6" style="margin-left:20px">
              <div class="item-input" style="font-size: 16px">
                场景排序：{{sceItem.sceneSort}}
              </div>
            </el-col>
          </el-row>
          <el-row style="padding: 0 20px">
            <el-col :span="12">
              <div class="item-input">
                <el-input v-model="sceItem.description" placeholder="场景描述" style="flex:1"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top: 40px;padding: 0 20px">
            <el-col :span="12">
              <div class="uploadpic">上传多张照片</div>
              <div>
                <el-upload
                  style="margin-top:10px"
                  action="https://zs.cntracechain.com/imageService/image/addBatch"
                  :data="upData"
                  list-type="picture-card"
                  multiple
                  :file-list="sceItem.imgList"
                  name="files"
                  :on-success="(res) => {
                    upimg(res, sceIdx)
                  }"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file) => {
                    handleRemove(file, sceIdx)
                  }"
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
              <div class="uploadpic">
                <span>上传视频</span><span class="notes">支持扩展名：.mp4</span>
              </div>
              <div>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="https://zs.cntracechain.com/imageService/image/add"
                  :on-success="(file) => {
                    handlesuccess(file, sceIdx)
                  }"
                  :on-remove="() => {
                    handleremovevideo(sceIdx)
                  }"
                  :file-list="sceItem.videoUrlList"
                  :limit="1"
                  :auto-upload="true"
                  :data="upData"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-button slot="trigger" size="small" type="primary">{{$t('Goods.newGoodVideoButton')}}</el-button>
                </el-upload>
              </div>
            </el-col>
          </el-row>

          <div v-for="(maItem, maIdx) in sceItem.materialList" :key="maIdx" style="padding: 0 20px">
            <el-row type="flex" justify="end">
              <el-col :span="2">
                <el-button type="primary" @click="addMaterial(sceIdx)" v-if="maIdx === 0">添加</el-button>
                <el-button type="danger" v-else @click="deleteMaterial(sceIdx, maIdx)">删除</el-button>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <div class="item-input">
                  <el-select v-model="maItem.materialInId" placeholder="选择原材料" @change="(val) => {
                      getMaterialDetail(val, sceIdx, maIdx)
                    }">
                    <el-option
                      v-for="item in materialList"
                      :key="item.id"
                      :label="item.materialName"
                      :value="item.id"
                    >
                      <span>{{item.materialName}}({{item.inStorageBatchNo}})</span>
                      
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-input">
                  <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="maItem.outStorageCount" placeholder="数量" style="flex:1"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-input">
                  <el-input v-model="maItem.outOrderNo" placeholder="出库单号" style="flex:1"></el-input>
                </div>
              </el-col>
            </el-row>

            <div v-if="maItem.inStorageBatchNo">
              <div v-for="(mrItem, mrIdx) in materialList" :key="mrIdx">
                <el-row style="margin-top: 30px" v-if="mrItem.inStorageBatchNo == maItem.inStorageBatchNo">
                  <el-col :span="6">
                    <div class="item-input" style="font-size: 16px">
                      原材料名称：{{mrItem.materialName}}
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item-input" style="font-size: 16px">
                      入库时间：{{mrItem.createTime}}
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item-input" style="font-size: 16px">
                      库房编号：{{mrItem.warehouseNumber}}
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item-input" style="font-size: 16px">
                      原材料供应商：{{mrItem.supplier}}
                    </div>
                  </el-col>
                </el-row>

                <el-row v-if="mrItem.inStorageBatchNo == maItem.inStorageBatchNo">
                  <el-col>
                    <div class="item-input" style="font-size: 16px">
                      货物剩余数量：{{mrItem.residueStock}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              
            </div>
          </div>
        </div>
        

        <el-row type="flex" justify="center">
          <!-- <el-col :span="24"> -->
            <div class="confirmBtn">
              <el-button type="primary" @click="insertProductBatch">{{$t('button.Comfirm')}}</el-button>
              <el-button type="danger" @click="$router.go(-1)">{{$t('button.cancel')}}</el-button>
            </div>
          <!-- </el-col> -->
        </el-row>

      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content.vue"

import exifs from '../../../assets/js/exifs.js'
export default {
  components: {
    pageContent,
  },
  data() {
    return {
      merchantId: '', // 商家id
      goodList: [], // 商品列表
      personnels: [], // 员工列表
      materialList: [], // 原材料列表
      scenarioList: [], // 场景列表
      time: [],
      upData: {
        imgSystemId: 'newProBatch',
        imgSpecificUniqueValue: 'newProBatchId'
      }, // 上传图片时要带的参数
      fileList: [],
      images: [],
      batchNo: "", // 生产批次号
      goodsId: "", // 商品id
      dialogVisible: false,
      dialogImageUrl: "",
      materialDetail: []
    };
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }

    this.getGoodList()
    this.getAccountList()
    this.getMaterialList()
  },
  methods: {
    // 获取商品列表
    getGoodList() {
      this.$get('/back-end/goods/getAll', {
        merchantId: this.merchantId
      }).then(res => {
        this.goodList = res.data || []
      })
    },
    // 获取员工列表
    getAccountList() {
      this.$get('/trace-api/other/optionAccountList/' + this.merchantId).then(res => {
        this.personnels = res.data || []
      })
    },
    // 获取原材料入库列表
    getMaterialList() {
      this.$get('/trace-api/material/listByMerchant/' + this.merchantId).then(res => {
        
        this.materialList = res.data || []

      })
    },
    // 添加可选择的原材料
    addMaterial(idx) {
      this.scenarioList[idx].materialList.push({
        inStorageBatchNo: '',
        materialInId: '',
        outOrderNo: '',
        outStorageCount: '',
        unit: 'Kg'
      })
    },
    // 删除
    deleteMaterial(idx, mIdx) {
      this.$confirm('此操作将会删除该部分数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.scenarioList[idx].materialList.splice(mIdx, 1)
      }).catch(() => {
        
      })
      
    },
    // 根据选择的商品不同而获取场景列表
    getScenarioList(val) {
      console.log(val)
      this.$get('/trace-api/p_batch/loadSceneForNewBatch/' + val).then(res => {
        console.log(res.data)
        this.scenarioList = res.data
        let _sceList = []
        if (res.data) {
          res.data.forEach(item => {
            let _img = []
            if (item.sceneImages) {
              item.sceneImages.forEach((imgItem, imgIdx) => {
                _img.push({
                  name: imgIdx,
                  url: imgItem.imageUrl
                })
              })
            }
            
            let _videoList = []
            if (item.videoUrl) {
              _videoList.push({
                name: item.videoUrl,
                url: item.videoUrl
              })
            }

            _sceList.push({
              sceneId: item.sceneId,
              name: item.name, // 场景名称
              sceneSort: item.sceneSort,
              time: [],
              employeId: '', // 员工id
              description: item.description,
              videoUrlList: _videoList, // 视频列表
              videoUrl: item.videoUrl,
              imgList: _img,
              delImageIds: [],
              imageUrls: [],
              materialList: [{
                materialInId: '', // 原材料入库id
                inStorageBatchNo: '', // 入库批次号
                outStorageCount: '', // 出库数量
                outOrderNo: '', // 出库单号
                unit: 'Kg' // 材料单位
              }]
            })
          })

          this.scenarioList = _sceList
        } else {
          this.scenarioList = []
        }
      })
    },
    // 选择原材料是获取原材料详细信息
    getMaterialDetail(val, sIdx, mIdx) {
      // console.log(val, sIdx, mIdx)
      this.materialList.forEach(item => {
        if (item.id === val) {
          this.scenarioList[sIdx].materialList[mIdx].inStorageBatchNo = item.inStorageBatchNo
          this.scenarioList[sIdx].materialList[mIdx].unit = item.unit

          this.materialDetail[sIdx] = {
            name: item.materialName,
            createTime: item.createTime,
            warehouseNumber: item.warehouseNumber,
            residueStock: item.residueStock,
            supplier: item.supplier,
            unit: item.unit
          }
        }
      })
    },
    // 上传图片
    upimg(res, idx) {
      console.log(res, idx)
      // this.scenarioList[idx].imageUrls.push(res.data[0].imgUrl)
      let  _image = {
        url: res.data[0].imgUrl
      }
      this.scenarioList[idx].imgList.push(_image)
      for (let i = 0; i < this.scenarioList[idx].imgList.length; i++) {
        this.scenarioList[idx].imgList[i].name = i
        
      }
    },
    // 上传图片前的钩子
    beforeImgUpload(file, data) {
      this.litemIdx = data
      console.log(data)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'mp3'
      const extension2 = testmsg === 'mp4'
      const extension3 = testmsg === 'avi'
      const isLt2M = (file.size / 1024 / 1024 <= 20)
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
    // 删除图片
    handleRemove(file, idx) {
      // console.log(file, idx);
      this.scenarioList[idx].imgList.forEach((item, imgidx) => {
        if (item.name === file.name) {
          this.scenarioList[idx].imgList.splice(imgidx, 1)
          // this.scenarioList[idx].delImageIds.push(file.name)
        }
      })
      // this.scenarioList[idx].imageUrls.forEach((addImg, addIdx) => {
      //   if (addImg === file.response.data[0].imgUrl) {
      //     this.scenarioList[idx].imageUrls.splice(addIdx, 1)
      //   }
      // })
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传视频
    handlesuccess(file, idx) {
      this.scenarioList[idx].videoUrl = file.data.imgUrl
    },
    // 删除视频
    handleremovevideo(idx) {
      this.scenarioList[idx].videoUrl = ''
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
    // 新建生产批次
    insertProductBatch() {
      let _params = {
        merchantId: this.merchantId,
        goodsId: this.goodsId,
        batchNo: this.batchNo,
      }
      let _sceneList = []
      if (this.scenarioList) {
        this.scenarioList.forEach(item => {
          let _materList = []
          item.materialList.forEach(maItem => {
            if (maItem.inStorageBatchNo && maItem.materialInId && maItem.outOrderNo && maItem.outStorageCount) {
              _materList.push(maItem)
            }
          })

          // 场景图片
          let _imgs = []
          if (item.imgList) {
            item.imgList.forEach(imgItem => {
              _imgs.push(imgItem.url)
            })
          }
          

          _sceneList.push({
            sceneId: item.sceneId,
            employeId: item.employeId,
            startTime: item.time[0],
            endTime: item.time[1],
            description: item.description,
            videoUrl: item.videoUrl,
            // delImageIds: item.delImageIds,
            imageUrls: _imgs,
            materialList: _materList
          })
        })
        _params.sceneList = _sceneList
      }
      
      if (!_params.batchNo) {
        this.$message.error('请输入生产批次号')
        return false
      }
      if (!_params.goodsId) {
        this.$message.error('请选择商品')
      }
      this.$post('/trace-api/p_batch/newBatch', _params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$router.go(-1)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleAddreturn() {
      this.$router.push({ name: "productionBatch", params: { id: 10 } });
    },
  },
};
</script>

<style lang="less" scoped>
.productioncreate {
  .content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    padding: 20px 0;
    .item-title {
      // padding: 0 15px;
      color: rgba(128, 128, 128, 1);
      font-size: 12px;
      // margin-bottom: 12px;
    }
    .picture {
      margin-top: 30px;
      margin-left: 32px;
    }
    .uploadpic {
      font-size: 14px;
      font-weight: 400;
      color: #808080;
      
    }
    .uploadvid {
      width: 56px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #808080;
      line-height: 20px;
      margin-top: 45px;
    }
    .notes {
      margin-left: 8px;
      font-size: 12px;
      font-weight: 400;
      color: #e41000;
    }
    .save {
      width: 130px;
      height: 40px;
      margin-top: 121px;
      margin-left: 394px;
    }
    .cancle {
      width: 130px;
      height: 40px;
      margin-top: 121px;
      margin-left: 60px;
    }
  }
  .item-txt {
    width: 200px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #333333;
    line-height: 20px;
    margin-top: 55px;
  }
  .title {
    // width: 156px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #ff0000;
    line-height: 17px;
    margin-left: 5px;
  }
  .central {
    width: 100%;
    height: 1px;
    background: #dddddd;
    margin-top: 24px;
  }
}
</style>