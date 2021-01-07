<template>
  <div class="topUpcenter">
    <page-content :name="$t('topUp.topUpCenter.topUpCenterTitle')">
      <div class="topUpcenter-top">
        <div class="topUpcenter-top-left">
          <img v-if="merchantDetail.merchant_logo_url" :src="merchantDetail.merchant_logo_url" alt="" srcset="">
          <img v-else src="../../../assets/images/merchantHome/moren.png" alt srcset />
        </div>
        <div class="topUpcenter-top-right">
          <div class="topUpcenter-top-right-1">{{$t('topUp.topUpCenter.hello')}}！</div>
          <div class="topUpcenter-top-right-num">
            <div>
              {{$t('topUp.topUpCenter.integralNum')}}：
              <span style="color: rgba(239,66,53,1)">{{merchantDetail.merchant_coin || 0}}</span>
              
            </div>
            <div style="margin-left: 114px">
              {{$t('topUp.topUpCenter.labelLimit')}}：
              <span style="color: rgba(239,66,53,1)">{{merchantDetail.paper_label_upper}}</span>
            </div>
          </div>
          <div>
            <el-button
              v-if="merchantDetail.certification_to_pay === 0"
              type="danger"
              size="mini"
              @click="rechargePrice = true
              "
            >{{$t('topUp.topUpCenter.authentication')}}</el-button>
            <el-button type="primary" size="mini" style="font-size: 14px" @click="goBuyPoins">{{$t('topUp.topUpCenter.rechangeButton')}}</el-button>
          </div>
        </div>
      </div>

      <div class="topUpcenter-tabs">
        <div class="topUpcenter-tabs-item" :class="activeName === 'first' ? 'active' : ''" @click="tabActive('first')">{{$t('topUp.topUpCenter.consumptionDetails')}}</div>
        <div style="margin: 0 14px">/</div>
        <div class="topUpcenter-tabs-item" :class="activeName === 'second' ? 'active' : ''" @click="tabActive('second')">{{$t('topUp.topUpCenter.integralDetails')}}</div>
      </div>
      <div class="content">
        <!-- 追溯积分燃烧消耗明细 -->
        <div v-if="activeName === 'first'">
          <el-row type="flex" justify="space-between">
            <el-col :span="7">
              <div class="item-input">
                <el-input v-model="firstParams.batchNumbr" :placeholder="$t('topUp.topUpCenter.traceBatchNum')" style="flex: 1"></el-input>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="item-input">
                <el-select v-model="firstParams.deductStatus" :placeholder="$t('topUp.topUpCenter.deductionStatus')" clearable>
                  <el-option
                    v-for="item in firstOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

              </div>
            </el-col>
            <el-col :span="7">
              <div class="item-input">
                <div class="input-title">{{$t('common.date2')}}</div>
                <el-date-picker
                  style="flex:1; border: none"
                  v-model="firstParams.time"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  :start-placeholder="$t('common.startDate')"
                  :end-placeholder="$t('common.endDate')"
                ></el-date-picker>

                <!-- <el-input placeholder="Trace batch number" style="flex: 1"></el-input> -->
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="list">
                <el-table :data="tableData" style="width: 100%" height="500" stripe>
                  <el-table-column prop="trace_code_number" :label="$t('topUp.topUpCenter.traceBatchNum')">
                    <template slot-scope="scope">
                      {{scope.row.trace_code_number}}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('topUp.topUpCenter.number')">
                    <template slot-scope="scope">
                      <span>
                        {{scope.row.trace_back1}}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('topUp.topUpCenter.conPoints')" prop="deduct_integral"></el-table-column>
                  <el-table-column :label="$t('topUp.topUpCenter.deductionStatus')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.deduct_status === 1">{{$t('topUp.topUpCenter.noDeduction')}}</span>
                      <span v-if="scope.row.deduct_status === 2">{{$t('topUp.topUpCenter.deductionAlready')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('topUp.topUpCenter.detuctionDate')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.deduct_time">{{scope.row.deduct_time | dateformat('YYYY/MM/DD HH:mm:ss')}}</span>
                      <span v-else>------</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.Operation')">
                    <template slot-scope="scope">
                      <div>
                        <el-button
                          type="text"
                          size="small"
                          :disabled="scope.row.deduct_status === 1 ? false : true"
                          @click="opeDeduct(scope.row.id)"
                        >{{$t('topUp.topUpCenter.deduction')}}</el-button>
                      </div>
                      
                      <!-- <span v-else>扣除</span> -->
                      <div>
                        <el-button
                          type="text"
                          size="small"
                          @click="goZsConsumeDetail(scope.row)"
                        >{{$t('topUp.topUpCenter.conDetails')}}</el-button>
                      </div>
                      
                      <div>
                        <el-button
                          type="text"
                          size="small"
                          @click="goZsConsumeDetailMerchant(scope.row)"
                        >{{$t('topUp.topUpCenter.deductionDatail')}}</el-button>
                      </div>
                      
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>

          <!-- 分页 -->
          <el-row v-if="firstTotal > 0">
            <el-col :span="24">
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[10, 20, 30, 40]"
                  :current-page.sync="pageNum"
                  :page-size.sync="pageSize"
                  background
                  layout="total, sizes, prev, pager, next"
                  :total="firstTotal"
                ></el-pagination>
              </div>
            </el-col>
            
          </el-row>
        </div>

        <!-- 新建、编辑商品消耗积分明细 -->
        <div v-if="activeName === 'second'">
          <el-row type="flex">
            <el-col :span="7">
              <div class="item-input">
                <!-- <div class="input-title">订单号</div> -->
                <el-input v-model="secondParams.goodName" :placeholder="$t('topUp.topUpCenter.productName')" style="flex: 1"></el-input>
              </div>
            </el-col>
            <el-col :span="7" style="margin-left: 20px">
              <div class="item-input">
                <div class="input-title">{{$t('common.date2')}}</div>
                 <el-date-picker
                  style="flex:1; border: none"
                  v-model="secondParams.goodDate"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :range-separator="$t('common.to')"
                  :start-placeholder="$t('common.startDate')"
                  :end-placeholder="$t('common.endDate')"
                ></el-date-picker>

                <!-- <el-input placeholder="Trace batch number" style="flex: 1"></el-input> -->
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="list">
                <el-table :data="secondTable" style="width: 100%" height="500" stripe>
                  <el-table-column :label="$t('topUp.topUpCenter.productName')">
                    <template slot-scope="scope">
                      <span>
                        {{scope.row.goods_name}}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.Operation')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.function_type === 4">{{$t('topUp.topUpCenter.enterGood')}}</span>
                      <span v-if="scope.row.function_type === 5">{{$t('topUp.topUpCenter.editGood')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="deduct_integral" :label="$t('topUp.topUpCenter.conPoints')"></el-table-column>
                  <el-table-column :label="$t('topUp.topUpCenter.detuctionDate')">
                    <template slot-scope="scope">
                      <span>{{scope.row.deduct_time || '---' | dateformat('YYYY/MM/DD HH:mm:ss')}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>

          <el-row v-if="secondTotal > 0">
            <el-col :span="24">
              <div class="page">
                <el-pagination
                  @size-change="handSecondSize"
                  @current-change="handSecondNum"
                  :page-sizes="[10, 20, 30, 40]"
                  :current-page.sync="secondPageNum"
                  :page-size.sync="secondPageSize"
                  background
                  layout="total, sizes, prev, pager, next"
                  :total="secondTotal"
                ></el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>

      </div>

      <!-- 认证协议 弹窗 -->
      <el-dialog :visible.sync="rechargePrice" width="30%">
        <div slot="title" style="font-size: 16px">{{$t('topUp.topUpCenter.authProtocol')}}</div>
        <div class="protocol">
          <div class>{{$t('topUp.topUpCenter.instructions')}}</div>
          <div class="protocol-fileName">
            <div class="protocol-fileName-item" @click="network = true">{{$t('topUp.topUpCenter.enterpriseAccess')}}</div>
            <!-- <div class="protocol-fileName-item" @click="supply = true">追溯链商城商家供货协议</div> -->
          </div>
          <div class="protocol-remark">
            <p>{{$t('topUp.topUpCenter.note')}}：</p>
            <P>1. {{$t('topUp.topUpCenter.note1')}}</P>
            <p>2. {{$t('topUp.topUpCenter.note2')}}</p>
          </div>
          <div class="protocol-confirm">
            <div class="protocol-confirm-buttom" @click="getApplyAuth">{{$t('topUp.topUpCenter.know')}}</div>
          </div>
        </div>
      </el-dialog>

      <!-- 企业入网协议 -->
      <el-dialog
        class="priceTypeDialog"
        :visible.sync="network"
        width="40%"
        max-width="40%"
      >
        <div slot="title" style="font-size: 16px">{{$t('topUp.topUpCenter.enterpriseAccess')}}</div>
        <div>
          <div class="pro-img">
            <img src="../../../assets/images/pdf/B-01.jpg" alt />
            <div class="read">
              <div class="read-buttom" @click="getRead(1)">{{$t('topUp.topUpCenter.haveRead')}}</div>
            </div>
          </div>
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
      merchantDetail: {}, // 商家详情
      activeName: 'first',
      firstParams: {
        batchNumbr: '',
        deductStatus: '',
        time: []
      },
      firstOptions: [
        {
          value: '1',
          label: '未扣减'
        },
        {
          value: '2',
          label: '已扣减'
        }
      ],
      tableData: [], // 追溯积分燃烧消耗明细列表数据
      pageNum: 1, // 追溯积分燃烧消耗明细列表 页数
      pageSize: 10, // 追溯积分燃烧消耗明细列表 条数
      firstTotal: 0, // 追溯积分燃烧消耗明细列表 总数
      secondParams: {
        goodName: '',
        goodDate: []
      },
      secondPageNum: 1, // 新建/编辑商品消耗积分明细 页数
      secondPageSize: 10, // 新建/编辑商品消耗积分明细 条数
      secondTotal: 1, // 新建/编辑商品消耗积分明细 总数
      secondTable: [],
      rechargePrice: false, // 查看认证协议 弹窗的状态
      network: false, // 显示企业入网协议图片的弹窗
      networkType: false
    }
  },
  watch: {
    firstParams: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getDetailList()
      }
    },
    secondParams: {
      deep: true,
      handler: function() {
        this.secondPageSize = 10
        this.secondPageNum = 1
        this.getDetailList()
      }
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getLoginMerchant()
    this.getDetailList()
  },
  methods: {
    // 获取商户的信息
    getLoginMerchant() {
      this.$get('/management_point/merchant/getLoginMerchant').then(res => {
        this.merchantDetail = res.data
      })
    },
    tabActive(activeName) {
      this.activeName = activeName
      this.getDetailList()
    },
    /**
     * 获取追溯积分燃烧消耗明细列表、新建/编辑商品消耗积分明细
     * this.activeName === 'first'为追溯积分燃烧消耗明细列表
     * this.activeName === 'second'为新建/编辑商品消耗积分明细
     */
    getDetailList() {
      if (this.activeName === 'first') {
        let _param = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          merchantId: this.merchantId
        }
        if (this.firstParams.batchNumbr) {
          _param.traceCode = this.firstParams.batchNumbr
        }
        if (this.firstParams.deductStatus) {
          _param.deductStatus = this.firstParams.deductStatus
        }
        if (this.firstParams.time) {
          _param.startTime = this.firstParams.time[0]
          _param.endTime = this.firstParams.time[1]
        }
        this.$post('/management_point/integralLog/traceDeductList', _param).then(res => {
          this.tableData = res.data.pageInfo.list || []
          this.firstTotal = res.data.pageInfo.total || 0
        })
      } else if (this.activeName === 'second'){
        let _secondParams = {
          merchantId: this.merchantId,
          pageNum: this.secondPageNum,
          pageSize: this.secondPageSize
        }

        if (this.secondParams.goodName) {
          _secondParams.goodsName = this.secondParams.goodName
        }
        if (this.secondParams.goodDate) {
          _secondParams.startTime = this.secondParams.goodDate[0]
          _secondParams.endTime = this.secondParams.goodDate[1]
        }
        this.$post('/management_point/integralLog/goodsDeductList', _secondParams).then(res => {
          this.secondTotal = res.data.pageInfo.total
          this.secondTable = res.data.pageInfo.list
        })
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getDetailList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getDetailList()
    },
    handSecondSize(val) {
      this.secondPageSize = val
      this.getDetailList()
    },
    handSecondNum(val) {
      this.secondPageNum = val
      this.getDetailList()
    },
    // 追溯进行扣减积分
    opeDeduct (id) {
      this.$confirm(this.$t('topUp.topUpCenter.deductionConfirm'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      })
        .then(() => {
          this.$postQs('/management_point/integralLog/traceDeductIntegral', {
              integralLogId: id
            })
            .then(res => {
              if (res.code === 100) {
                this.$message.success(this.$t('topUp.topUpCenter.deductionSuccess'))
                this.getDetailList()
                // this.selectIntengraLog()
              } else {
                this.$message.error(this.$t('topUp.topUpCenter.deductionError'))
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('topUp.topUpCenter.catchDeduction')
          })
        })
    },
    goZsConsumeDetail(row) {
      this.$router.push({
        path: '/merchant/traceConDetails',
        query: {
          traceCode: row.trace_code_number,
          traceGoodId: row.trace_good_id,
          traceBack1: row.trace_back1,
          goodsName: encodeURIComponent(row.goods_name)
        }
      })
    },
    goZsConsumeDetailMerchant(row) {
      this.$router.push({
        path: '/merchant/deductionsRecord',
        query: {
          traceCode: row.trace_code_number,
          traceGoodId: row.trace_good_id,
          traceBack1: row.trace_back1,
          goodsName: encodeURIComponent(row.goods_name)
        }
      })
    },
    // 跳转到充值页面
    goBuyPoins() {
      this.$router.push({
        path: '/merchant/buyPoins',
        query: {
          mid: this.merchantDetail.merchant_id
        }
      })
    },
    /*
      入网协议确定
     */
    getRead (type) {
      if (type === 1) {
        this.networkType = true
        this.network = false
      }
    },
    /*
      认证支付链接
      我知道了的点击事件，及判断有没有阅读两篇协议
     */
    getApplyAuth () {
      this.rechargePrice = false
      if (this.networkType === true) {
        // alert('哪哈')
        this.$router.push({
          path: '/merchant/certificationPay',
          query: {
            mid: this.merchantDetail.merchant_id
          }
        })
      } else {
        if (this.networkType === false) {
          this.$common.error(this.$t('topUp.topUpCenter.authProtocolTip'))
        }
        // if (this.supplyType === false) {
        //   this.$common.error("您没有看完追溯链商城商家供货协议");
        // }
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
  .topUpcenter {
    .topUpcenter-top {
      margin-top: 20px;
      display: flex;
      // align-items: center;
      font-size: 16px;
      
      .topUpcenter-top-left {
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid #cccccc;
        }
      }
      .topUpcenter-top-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 24px;

        .topUpcenter-top-right-1 {
          color: rgba(51,51,51,1);
          font-size: 16px;
          font-weight: 500;
        }
        .topUpcenter-top-right-num {
          display: flex;
        }
        
      }
    }
    .topUpcenter-tabs {
      margin-top: 21px;
      display: flex;
      font-size: 16px;
      color: rgba(33,150,243,1);
      font-weight: 500;
      .topUpcenter-tabs-item {
        text-decoration: underline;
        cursor: pointer;
      }
      .active {
        color: rgba(51,51,51,1);
        text-decoration: none !important;
      }
    }
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
    }

    .page {
      margin-top: 20px;
      text-align: right;
      height: 32px;
      /deep/.el-pagination {
        height: 100%;
        padding: 0;
      }
    }
  }

  .protocol {
    .protocol-fileName {
      color: rgba(9, 138, 236, 1);
      .protocol-fileName-item {
        line-height: 40px;
        margin-left: 15px;
        cursor: pointer;
      }
    }
    .protocol-remark {
      p {
        line-height: 30px;
        font-size: 14px;
      }
    }
    .protocol-confirm {
      height: 50px;
      justify-content: center;
      display: flex;
      align-items: center;
      .protocol-confirm-buttom {
        cursor: pointer;
        width: 98px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: rgba(9, 138, 236, 1);
        color: #fff;
      }
    }
  }

  .pro-img {
    height: 500px;
    overflow: auto;
    img {
      width: 100%;
      // height: 100%;
    }
    .read {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      // line-height: 50px;
      .read-buttom {
        cursor: pointer;
        width: 98px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: rgba(9, 138, 236, 1);
        color: #fff;
      }
    }
  }
</style>