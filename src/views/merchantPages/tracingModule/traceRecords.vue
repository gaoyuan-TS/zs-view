<template>
  <div class="tracerecords">
    <page-content name="追溯记录">
      <div class="content">
        <el-row>
          <el-col :span="7">
            <el-input v-model="sidOrSubCode" :placeholder="$t('Trace.traceRecords.searchTraCode')"></el-input>
          </el-col>
        </el-row>

        <div class="top">
          <div class="item">
            <div class="item-title" style="font-size: 12px">{{$t('Trace.traceRecords.traceBatchNum')}}</div>
            <div class="item-num" style="font-size: 14px">
              {{chaseObject.traceCodeNumber}}
            </div>
          </div>
          
          <div class="item">
            <div class="item-title" style="font-size: 12px">{{$t('Trace.traceRecords.numberOfTrace')}}</div>
            <div class="item-num" style="font-size: 14px">
              {{chaseObject.traceApplyCount}}
            </div>
          </div>
          <div class="item">
            <div class="item-title" style="font-size: 12px">{{$t('Trace.traceRecords.quantityNum')}}</div>
            <div class="item-num" style="font-size: 14px">
              {{chaseObject.traceEnableCount}}
            </div>
          </div>
            <el-button type="primary" @click="pointRecordsDialo = true">{{$t('Trace.traceRecords.tracePointRecord')}}</el-button>
        </div>

        <!-- 树结构数据展示及流通信息展示 -->
        <div class="subcodedetail">
          <div style="width: 58%">
            <div class="subcodetree">
              <el-tree :data="subcodetree">
                <span class="custom-tree-node" slot-scope="{node, data}">
                  <span style="font-size: 14px">{{data.isLeaf === 'N' ? '【'+$t('Trace.traceRecords.quterCode')+'】' : '【'+$t('Trace.traceRecords.innerCode')+'】'}}{{data.traceSubCodeNumber}}(Sid：{{data.traceSid}})</span>

                  <span v-if="data.isLeaf === 'Y'" class="circulation" @click="getTracePointRecord(data.id, data.traceSubCodeNumber)">
                    {{$t('Trace.traceRecords.informationButton')}}
                  </span>
                </span>
              </el-tree>
            </div>
            
            <div v-if="subNums > 0" class="pages">
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handlePageNum"
                :total="subNums"
              ></el-pagination>
            </div>
          </div>
          <div class="circulate" style="font-size: 14px">
            <div class="circulate-title">{{$t('Trace.traceRecords.informationTitle')}}</div>
            <div class="circulate-con" v-if="nCode">
              <div>【{{$t('Trace.traceRecords.innerCode')}}】{{nCode}}</div>
              <div style="margin-top: 16px">【{{$t('Trace.traceRecords.pdoductName')}}】{{ifGoodName}}</div>
              <div class="circulate-con-information">
                <div class="information-item" v-for="(item, idx) in informations" :key="idx">
                  <div class="information-item-left">
                    <div class="yuan"></div>
                    <div class="xian"></div>
                  </div>

                  <div class="information-item-right">
                    <div class="information-item-1">{{$t('Trace.traceRecords.currentNode')}}{{idx + 1}}</div>
                    <div class="information-item-2">{{$t('Trace.traceRecords.business')}}：{{item.tracePointName}}</div>
                    <div class="information-item-2">{{$t('Trace.traceRecords.address')}}：{{item.detailAddress}}</div>
                    <div class="information-item-2">{{$t('Trace.traceRecords.contactNum')}}：{{item.contactNumber}}</div>
                    <div class="information-item-2">{{$t('Trace.traceRecords.principal')}}：{{item.personInCharge}}</div>
                    <div class="information-item-2">{{$t('Trace.traceRecords.CirculationTime')}}：{{item.tracePointTime}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="zwuifm" v-else>---{{$t('Trace.traceRecords.noCirculation')}}---</div>
          </div>
        </div>
      </div>

      <!-- 追溯点记录 -->
      <el-dialog :visible.sync="pointRecordsDialo">
        <div slot="title" style="font-size: 16px; color:rgba(51,51,51,1)">{{$t('Trace.traceRecords.tracePointRecord')}}</div>
        <div class="pointRecordsDialo-con">
          <div class="item">
            <div>{{$t('Trace.traceRecords.pdoductName')}}：</div>
            <div>
              <el-select v-model="goodId">
                <el-option
                  v-for="item in goodList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="tree-trcedata">
            <el-tree :data="trceData">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.tracePointName }}</span>
                <span>{{$t('Trace.traceRecords.numbering')}}：{{data.tracePointFromNumber}}-{{data.tracePointToNumber}}</span>
                <!-- <span></span> -->
                <span class="circulation" @click="append(data)" style="margin-right: 10px">
                  <!-- <el-button type="danger" size="mini"> -->
                    {{$t('Trace.traceRecords.newPoint')}}
                  <!-- </el-button> -->
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-dialog>
      
      <!-- 新建追溯点 弹窗 -->
      <el-dialog :visible.sync="newTracePointDialog" width="680px">
        <div slot="title" style="font-size: 16px">{{$t('Trace.traceRecords.newPointDialogTiltle')}}</div>
        <div class="newTracePoint-con">
          <div class="newTracePoint-con-title">
            <div>{{newTracePointInfo.tracePointName}}</div>
            <div>{{$t('Trace.traceRecords.numbering')}}：{{newTracePointInfo.tracePointFromNumber}}-{{newTracePointInfo.tracePointToNumber}}</div>
          </div>
          <div class="newTracePoint-con-radio">
            <el-radio-group v-model="sellerType">
              <el-radio :label="0">{{$t('Trace.traceRecords.agent')}}</el-radio>
              <el-radio :label="1">{{$t('Trace.traceRecords.other')}}</el-radio>
            </el-radio-group>
          </div>
          <div>
            <div class="item">
              <el-select v-model="tracePointName" v-if="Number(sellerType) === 0" style="width: 100%" :placeholder="$t('Trace.traceRecords.selectAgent')" @change="changeAgentMobile">
                <el-option
                  v-for="(item,index) in agentList"
                  :key="index"
                  :label="item.agentName"
                  :value="item.agentName">
                </el-option>
              </el-select>
            </div>

            <div class="item" v-if="Number(sellerType) === 1">
              <el-input v-model="agentMobile" :placeholder="$t('Trace.traceRecords.mobilePhone')"></el-input>
            </div>
            <div class="item" v-if="Number(sellerType) === 1">
              <el-input v-model="otherMerchant.personInCharge" :placeholder="$t('Trace.traceRecords.personCharge')"></el-input>
            </div>
            <div class="item" v-if="Number(sellerType) === 1">
              <el-input v-model="otherMerchant.tracePointName" :placeholder="$t('Trace.traceRecords.tracePointName')"></el-input>
            </div>
            

            <div class="item numbering">
              <div>{{$t('Trace.traceRecords.numbering')}}：</div>
              <div class="numbering-right">
                <el-input v-model="insertInfo.tracePointFromNumber" :placeholder="$t('Trace.traceRecords.startCode')"></el-input>
                <div style="margin:0 15px; width: 40px">{{$t('Trace.traceRecords.to')}}</div>
                <el-input v-model="insertInfo.tracePointToNumber" :placeholder="$t('Trace.traceRecords.endCode')"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="newTracePoint();submitSetTimeout()" :disabled ="isDisable">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="newTracePointDialog = false">{{this.$t('button.cancel')}}</el-button>
        </div>
      </el-dialog>
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
      sidOrSubCode: '',
      pageNum: 1,
      chaseObject: {},
      subcodetree: [],
      subNums: 0,
      informations: [],
      ifGoodName: '',
      nCode: '',
      pointRecordsDialo: false, // 展示追溯点记录弹窗的状态
      goodList: [],
      goodId: '',
      trceData: [],
      newTracePointDialog: false, // 新建追溯点弹窗的状态
      newTracePointInfo: {}, // 新建追溯点弹窗上显示的数据
      agentList: [],
      sellerType: 0,
      tracePointName: '',
      agentMobile: '',
      insertInfo: {
        tracePointFromNumber: '',
        tracePointToNumber: '',
        traceStallId: '-1',
        accountId: ''
      }, // 新建追溯点要用的参数
      otherMerchant: {
        tracePointName: '',
        personInCharge: ''
        // contactNumber: ''
      }, // 新建的追溯节点信息
      isDisable:false
    }
  },
  watch: {
    sidOrSubCode (newO, oldN) {
       if (newO) {
        this.getTracePointRecordBySid(newO)
      } else {
        this.pageNum = 1
        this.getSubCodeTree()
      }
    },
    pageNum (newO, oldN) {
      this.getSubCodeTree()
    },
    goodId() {
      this.getTree()
    },
    agentMobile (newV, oldV) {
      if (newV) {
        this.getNodeByMobile(newV)
      }
    }
  },
  created() {
    this.getTraceInfo()
  },
  methods: {
    // 选择代理商的手机号
    changeAgentMobile (val) {
      console.log(val)
      this.agentList.forEach((item) => {
        if (item.agentName === val) {
          this.agentMobile = item.mobile
        }
      })
    },
    // 手机号判断会员是否存在
    getNodeByMobile (mb) {
      this.$get('/trace-api/other/getNodeByMobile', {
        mobile: mb
      }).then(res => {
        console.log(res)
        if (Number(this.sellerType) === 1) {
          if (res.message === '操作成功') {
            this.insertInfo.accountId = res.data.accountId
            this.otherMerchant.tracePointName = res.data.tracePointName
            this.otherMerchant.personInCharge = res.data.personInCharge
            this.otherMerchant.contactNumber = res.data.contactNumber
          } else {
            this.insertInfo.accountId = res.data
            this.otherMerchant.tracePointName = ''
            this.otherMerchant.personInCharge = ''
            this.otherMerchant.contactNumber = ''
          }
        } else if (Number(this.sellerType) === 0) {
          if (res.code === 200) {
            this.insertInfo.accountId = res.data.accountId
          }
        }
      })
    },
    // 请求没有禁止的代理商
    getQuerySearchAsync() {
      var _param = {
        merchantId: this.chaseObject.merchant.merchantId
        // pageNum: 1,
        // pageSize: 100000
      }
      this.$get('/agent/merchantAgent/normal', _param).then(res => {
        this.agentList = res.data || []
      })
    },
    // 获取追溯信息详情
    getTraceInfo() {
      this.$get('/trace-api/trace/'+ this.$route.query.traceId).then(data => {
        this.chaseObject = data.data
        this.getSubCodeTree()
        this.getGoodList()
      })
    },
    // 获取树结构数据
    getSubCodeTree() {
      this.$get('/trace-api/trace/getSuCodeByPage', {
        pageNum: this.pageNum,
        pageSize: 10,
        traceCodeNumber: this.chaseObject.traceCodeNumber
      }).then(res => {
        this.subcodetree = res.data.list
        this.subNums = res.data.total
      })
    },
    handlePageNum(val) {
      this.pageNum = val
    },
    getTracePointRecordBySid(sid) {
      this.$get('/trace-api/trace/searchSubCodeTree', {
        traceCodeNumber: this.chaseObject.traceCodeNumber,
        sidOrSubCode: sid
      }).then(res => {
        if (res.code === 200) {
          this.subcodetree = res.data
          this.subNums = 0
        }
      })
    },
    // 获取流通信息
    getTracePointRecord (sid, code) {
      this.nCode = code
      this.$get('/trace-api/trace/getTracePointRecordBySid', {sid: sid}).then(res => {
        if (res.code === 200) {
          this.ifGoodName = res.data.goodsName
          this.informations = res.data.list
        } else {
          this.informations = []
        }
        // console.log(res.data)
      })
    },
    // 获取商品列表
    getGoodList() {
      this.$get('/trace-api/trace/getGoodsListByTraceCode', {
        traceCodeNumber: this.chaseObject.traceCodeNumber
      }).then(res => {
        this.goodList = res.data
        this.goodId = res.data[0].id
        this.getTree()
      })
    },
    getTree() {
      this.$get('/trace-api/trace/zPointTree', {
        traceCodeNumber: this.chaseObject.traceCodeNumber,
        goodsId: this.goodId,
        stallId: -1
      }).then(res => {
        this.trceData = res.data[0].treeNodes
        this.getQuerySearchAsync()
      })
    },
    // 新建追溯点按钮的事件
    append(data) {
      console.log(data)
      this.agentMobile = ''
      this.newTracePointInfo = data
      this.insertInfo.tracePointToNumber = ''
      this.insertInfo.tracePointFromNumber = ''
      this.newTracePointDialog = true
      this.insertInfo.accountId = ''
      this.otherMerchant.tracePointName = ''
      this.otherMerchant.personInCharge = ''
      this.otherMerchant.contactNumber = ''
      this.tracePointName = ''
    },
    //限制点击提交时间
    submitSetTimeout(){
      this.isDisable=true
      setTimeout(()=>{
          this.isDisable=false   //点击一次时隔两秒后才能再次点击
       },2000)
    },

    // 新建追溯点
    newTracePoint() {
      
      let _params ={
        traceGoodsId: this.newTracePointInfo.traceGoodsId,
        traceParentId: this.newTracePointInfo.tracePointId,
        traceCodeNumber: this.chaseObject.traceCodeNumber,
        tracePointFromNumber: this.insertInfo.tracePointFromNumber,
        tracePointToNumber: this.insertInfo.tracePointToNumber,
        accountId: this.insertInfo.accountId
      }
      if (this.sellerType === 1) {
        _params.otherMerchant = this.otherMerchant
        let _contactNumber
        if (_params.accountId === -1) {
          _contactNumber = this.agentMobile
        }
        _params.otherMerchant['contactNumber'] = _contactNumber
      }
      console.log(_params)
      this.$post('/trace-api/trace/point', _params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message.success(res.message)
          this.newTracePointDialog = false
          this.tracePointName = ''
          this.otherMerchant = {
            tracePointName: '',
            personInCharge: ''
          }
           this.insertInfo = {
             accountId: '',
             tracePointFromNumber: '',
             tracePointToNumber: ''
           }
          this.agentMobile = ''
          this.getTree()
        } else {
          this.$message.error(res.message)
        }
      }
      
      
      )

      
      
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

  /deep/ .custom-tree-node {
    width: 95%;
    display: flex;
    justify-content: space-between !important;
    align-items: center;
  }
  /deep/.el-tree-node__content {
      padding: 5px 0;
      height: 36px;
    }
    .circulation {
      text-decoration: underline;
      color: rgba(33,150,243,1);
      cursor: pointer;
      font-size: 12px;
    }
  .tracerecords {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .top {
        margin-top: 40px;
        padding-bottom: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(216,216,216,1);
        .item {
          .item-title {
            color: rgba(128,128,128,1);
            font-weight: 400;
          }
          .item-num {
            font-weight: 400;
            color: rgba(51,51,51,1);
            margin-top: 10px;
          }
        }
      }

      .subcodedetail {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        height: 542px;
        .subcodetree {
          border: 1px solid rgba(0,0,0,0.15);
          height: 90%;
          overflow: auto;

          &::-webkit-scrollbar {
            width: 6px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: @zs_color;
          }
          
        }

        .pages {
          margin-top: 20px;
          text-align: right;
          height: 40px;
          /deep/.el-pagination {
            height: 100%;
            padding: 0;
          }
        }
        .circulate {
          overflow: auto;
          width: 38%;
          padding: 0 16px;
          padding-bottom: 18px;
          overflow: auto;
          border: 1px solid rgba(0,0,0,0.15);
          .circulate-title {
            padding-left: 4px;
            // width: 72px;
            // height:17px;
            font-size: 18px;
            font-family: MicrosoftYaHei;
            font-weight: 500;
            color: rgba(51,51,51,1);
            line-height: 48px;
          }

          .circulate-con {
            margin-top: 16px;
            .circulate-con-information {
              .information-item {
                margin-top: 26px;
                display: flex;
                .information-item-left {
                  width: 8%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  margin-top: 6px;
                  .yuan {
                    width: 8px;
                    height: 8px;
                    background: rgba(239,66,53,1);
                    border-radius: 50%;
                  }
                  .xian {
                    width: 2px;
                    background: rgba(239,66,53,1);
                    flex: 1;
                  }
                }

                .information-item-right {
                  .information-item-1 {
                    color: rgba(239,66,53,1);
                    font-weight: 500;
                  }

                  .information-item-2 {
                    color: rgba(51,51,51,1);
                    margin-top: 12px;
                  }
                }
              }
            }

            
          }

          .zwuifm {
            text-align: center;
            line-height: 100px;
            font-size: 14px;
          }

          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: @zs_color;
          }
        }
      }
    }
  }

  .pointRecordsDialo-con {
    .item {
      display: flex;
      align-items: center;
    }

    .tree-trcedata {
      margin-top: 20px;
      border: 1px solid rgba(0,0,0,0.15);
      height: 3.9rem;
      overflow: auto;
    }
  }

  .newTracePoint-con {
    .newTracePoint-con-title {
      display: flex;
      justify-content: space-between;
    }
    .newTracePoint-con-radio {
      margin-top: 20px;
    }
    .item {
      margin-top: 14px;
    }
    .numbering {
      display: flex;
      align-items: center;
      .numbering-right {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }
</style>