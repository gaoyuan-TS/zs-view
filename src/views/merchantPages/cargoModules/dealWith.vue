<template>
  <div class="dealwith">
    <page-content name="召回批次处理">
      <div class="content">
        
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <div style="font-size: 14px">召回批次号：{{productionBatchNo}}</div>
            
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">商品：{{goodsName}}</div>
            
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">召回数量：{{recallCount}}</div>
            
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">未处理数量：{{undisposeCount}}</div>
            
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" align="middle" style="margin-top: 26px">
          <el-col :span="16">
            <div style="font-size: 14px">召回原因：{{cause}}</div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <el-button type="primary" @click="addDispose">新建</el-button>
            </div>
            
          </el-col>
        </el-row>
        
        <div style="margin-top: 36px">
          <div class="dealwith-deal" v-for="(disItem, disIdx) in disposeList" :key="disIdx">
            <div class="item">
              <div style="font-size: 14px">处理方式：</div>
              <el-radio-group style="margin-left: 16px" v-model="disItem.disposeType">
                <el-radio label="0">销毁</el-radio>
                <el-radio label="1">继续销售</el-radio>
              </el-radio-group>
              
            </div>

            <el-row style="margin-top: 30px" type="flex" justify="space-between">
              <el-col :span="5">
                <div class="item-input">
                  <el-select style="width: 100%" v-model="disItem.employeId" placeholder="员工">
                    <el-option
                      v-for="item in AccountList"
                      :key="item.accountId"
                      :label="item.realName"
                      :value="item.accountId"
                    ></el-option>
                  </el-select>
                </div>
                
              </el-col>

              <el-col :span="8">
                <div class="item-input">
                  <div class="input-title">{{disItem.disposeType === '0'? '处理日期':'销毁日期'}}</div>
                  <el-date-picker
                    style="border: none; flex: 1"
                    v-model="time[disIdx]"
                    @change="(val) => {
                      changDate(val, disIdx)
                    }"
                    clearable
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    :range-separator="$t('common.to')"
                    :start-placeholder="$t('common.startDate')"
                    :end-placeholder="$t('common.endDate')"
                  ></el-date-picker>
                </div>
                
              </el-col>

              <el-col :span="5">
                <div class="item-input">
                  <el-input :placeholder="disItem.disposeType === '0'? '处理地点':'销毁地点'" v-model="disItem.disposeSite"></el-input>
                </div>
                
              </el-col>
              
              <el-col :span="5">
                <div class="item-input">
                  <el-input :placeholder="disItem.disposeType === '0'? '处理说明':'销毁说明'" v-model="disItem.description"></el-input>
                </div>
              </el-col>
            </el-row>

            <div class="item" style="margin-top: 30px">
              <div style="font-size: 14px">{{disItem.disposeType === '0'? '处理的商品码段':'销毁的商品码段'}}：</div>
              <div class="clicktitle" style="margin-left: 7px" @click="downloadExcel">
                下载excel 表模板
              </div>
              <div style="margin-left: 32px">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="https://zs.cntracechain.com/imageService/image/add"
                  :data="imgData"
                  :before-upload="(file) => {
                    berforeUpload(file, disIdx)
                  }"
                  :on-success="(res, file, fileList) => {
                    handlesuccess(res, file, disIdx, fileList)
                  }"
                  :on-change="traceSidByCsv"
                  :on-preview="handlePreview"
                  :on-remove="(file) => {
                    handleRemove(file, disIdx)
                  }"
                  :file-list="fileList[disIdx]"
                  :auto-upload="true">
                  <div class="clicktitle">上传excel表(格式为csv)</div>
                </el-upload>
              </div>
              <!-- <div style="font-size: 14px; margin-left: 24px" v-if="fileList[disIdx]">
                <span v-for="(fileItem, fileIdx) in fileList[disIdx]" :key="fileIdx">{{fileItem.name}}</span>
              </div> -->
            </div>
            
          </div>

        </div>

        <el-row type="flex" justify="center">
            <!-- <el-col :span="24"> -->
          <div class="confirmBtn">
            <el-button type="primary" @click="dealWithRecall">{{$t('button.Comfirm')}}</el-button>
            <el-button type="danger" @click="$router.go(-1)">{{$t('button.cancel')}}</el-button>
          </div>
          <!-- </el-col> -->
        </el-row>
      </div>

      <el-dialog :visible.sync="noListDialog" :close-on-click-modal='false' :show-close="false">
        <div style="font-size: 16px" slot="title">提示</div>
        <div class="sidlist" style="font-size: 14px" v-if="noExistSidList.length > 0">
          <div>不存在系统中的追溯sid：</div>
          <div class="sidlist-con" style="flex: 1">
            <div v-for="(noItem, noIdx) in noExistSidList" :key="noIdx">
              {{noItem}}
            </div>
          </div>
          
        </div>
        <div class="sidlist" style="font-size: 14px">
          <div>召回已处理过的追溯sid：</div>
          <div class="sidlist-con" style="flex: 1">
            <div v-for="(proItem, proIdx) in processedList" :key="proIdx">
              【{{proItem}}】
            </div>
          </div>
          
        </div>
        <div>去重新上传csv表</div>
        <div slot="footer">
          <div>
            <el-button type="primary" @click="noListDialog = false"> 我知道了</el-button>
          </div>
        </div>
      </el-dialog>
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
      recallId: '', // 召回id
      merchantId: '',
      productionBatchNo: '', // 生产批次号
      goodsName: '', // 商品名称
      recallCount: '', // 召回数量
      undisposeCount: '', // 未处理数量
      cause: '', // 原因
      AccountList: [], // 员工列表
      fileList: [],
      time: [],
      imgData: {
        imgSystemId: 'merchantEdit',
        imgSpecificUniqueValue: 'merchantEditImg'
      },  //   上传图片附带的参数
      disposeList: [
        {
          disposeType: '0',
          employeId: '',
          startTime: '',
          endTime: '',
          disposeSite: '',
          description: '',
          excelFileUrl: '',
          disposeCount: ''
        }
      ], // 处理召回信息的参数
      noExistSidList: [],
      processedList: [],
      noListDialog: false
    }
  },
  created() {
    this.recallId = this.$route.query.id
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getRecallDetail()
    this.getAccountList()
  },
  methods: {
    // 获取召回明细
    getRecallDetail() {
      this.$get('/trace-api/recall/recallDetailForNewDispose/' + this.recallId).then(res => {
        console.log(res)
        this.productionBatchNo = res.data.productionBatchNo
        this.goodsName = res.data.goodsName
        this.recallCount = res.data.recallCount
        this.undisposeCount = res.data.undisposeCount
        this.cause = res.data.cause
      })
    },
    // 获取员工列表
    getAccountList() {
      this.$get('/trace-api/other/optionAccountList/' + this.merchantId).then(res => {
        this.AccountList = res.data || []
      })
    },
    // 增加
    addDispose() {
      this.disposeList.push({
        disposeType: '0',
        employeId: '',
        startTime: '',
        endTime: '',
        disposeSite: '',
        description: '',
        excelFileUrl: '',
        disposeCount: ''
      })
    },
    changDate(val, idx) {
      console.log(val, idx)
      this.disposeList[idx].startTime = val[0]
      this.disposeList[idx].endTime = val[1]
    },
    traceSidByCsv(file) {
      console.log(file)

      // let fd = new FormData()
      // fd.append()
      
    },
    handlePreview() {

    },
    // 删除表
    handleRemove(file, idx) {
      console.log(file, idx)
      this.disposeList[idx].excelFileUrl = ''
      this.fileList.splice(idx, 1)
    },
    // 下载excel表模板
    downloadExcel() {
      window.location.href = 'https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/%E5%95%86%E5%93%81%E5%8F%AC%E5%9B%9E%E8%A1%A8%E6%A8%A1%E6%9D%BF.csv'
    },
    // 上传excel表
    berforeUpload(file, idx) {
      let fd = new FormData()
      fd.append('recallId', this.recallId)
      fd.append('recallType', 0)
      fd.append('tmpFile', file)
      const that = this
      const isType =  new Promise(function (resolve, reject) {
        // let _list = await this.$post('/trace-api/recall/traceSidByCsv', fd)
        that.$post('/trace-api/recall/traceSidByCsv', fd).then(res => {
          if (res.data.noExistSidList.length > 0 || res.data.processedList.length > 0) {

            that.noExistSidList = res.data.noExistSidList
            that.processedList = res.data.processedList
            that.noListDialog = true
            return false
            // reject(false)
          } else {
            // resolve(true)
            that.disposeList[idx].disposeCount = res.data.successCount
            return file
          }
        })
        // if (_list.data.noExistSidList.length > 0 || _list.data.processedList.length > 0) {
        //   // this.$message.error('不存在系统的追溯sid:' + _list.data.failedList)
        //   this.noExistSidList = _list.data.noExistSidList
        //   this.processedList = _list.data.processedList
        //   this.noListDialog = true
        //   reject()
        //   // return false
        // } else {
        //   this.disposeList[idx].disposeCount = _list.data.successCount
        //   resolve(true)
        //   // return true
        // }
      })

      return isType
    },
    handlesuccess(res, file,  idx, fileList) {
      console.log(res)
      console.log(file, fileList)
      let _list = []
      this.disposeList[idx].excelFileUrl = res.data.imgUrl
      _list.push({
        name: file.name,
        url: res.data.imgUrl
      })

      // this.fileList[idx] = _list
      this.$set(this.fileList, idx , _list)
    },
    // 处理操作
    dealWithRecall() {
      let _params = this.disposeList
      
      let _type = true

      // 参数集合  必填项未填时，提示
      _params.forEach(item => {
        if(!item.disposeType) {
          this.$message.error('处理方式未选择')
          return false
        }
        if (!item.employeId) {
          this.$message.error('员工未选择')
          _type = false
          return false
        }

        if(item.disposeType === '0') {
          if (!item.startTime) {
            this.$message.error('日期未选择')
            _type = false
            return false
          }
          if (!item.disposeSite) {
            this.$message.error('处理地点未填写')
            _type = false
            return false
          }
          if (!item.description) {
            this.$message.error('处理说明未填写')
            _type = false
            return false
          }
          if(!item.excelFileUrl) {
            this.$message.error('处理的商品码段表未上传')
            _type = false
            return false
          }
        } else {
          if (!item.startTime) {
            this.$message.error('销毁日期未选择')
            _type = false
            return false
          }
          if (!item.disposeSite) {
            this.$message.error('销毁地点未填写')
            _type = false
            return false
          }
          if (!item.description) {
            this.$message.error('销毁说明未填写')
            _type = false
            return false
          }
          if(!item.excelFileUrl) {
            this.$message.error('销毁的商品码段表未上传')
            _type = false
            return false
          }
        }
      })
      
      if (_type) {
        this.$post('/trace-api/recall/disposeRecallInfo/' + this.recallId, _params).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.$router.go(-1)
          } else {
            this.$message.error(res.message)
          }
        })
      }

      
    }
  }
}
</script>

<style lang="less" scoped>
  .dealwith {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
      min-height: 500px;

      .dealwith-deal {
        border: 1px solid #DDDDDD;
        padding: 25px 14px;
        margin-top: 20px;
        .item {
          display: flex;
          align-items: center;

          .clicktitle {
            color: #2196F3;
            font-size: 14px;
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }

      .dealwith-deal:first-child {
        margin-top: 0;
      }
    }
  }


  /deep/.upload-demo {
    display: flex;
    .el-upload {
      display: flex;
      align-items: center;
    }

    .el-upload-list {
      margin-left: 6px;
    }
  }


  .sidlist {
    display: flex;
    // flex-wrap: wrap;
    .sidlist-con {
      display: flex;
    flex-wrap: wrap;
    }
  }
</style>