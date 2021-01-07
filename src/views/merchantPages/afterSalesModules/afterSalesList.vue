<template>
  <div class="afterSaleslist">
    <page-content :name="$t('afterSales.title')">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">订单号</div> -->
              <el-input v-model="params.orderNo" :placeholder="$t('order.orderList.orderNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <el-select v-model="params.status" clearable :placeholder="$t('afterSales.processState')" style="width: 280px;">
                <el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">售后订单号</div> -->
              <el-input v-model="params.refundOrderNo" :placeholder="$t('afterSales.salesNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">下单手机号</div> -->
              <el-input v-model="params.salePhone" :placeholder="$t('afterSales.mobilNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list" v-if="tableData.length > 0">
              <div v-for="(item, idx) in tableData" :key="idx" class="afterSalesitem">
                <div class="afterSalesitem-title">
                  <div class="item">
                    {{$t('order.orderList.orderNumber')}}: {{item.orderNo}}
                  </div>
                  <div class="item">
                    {{$t('order.orderList.theOrdertime')}}: {{item.tradeTime}}
                  </div>
                  <div class="item">
                    {{$t('order.orderList.payDate')}}: {{item.payTime}}
                  </div>
                  <div class="item" v-if="item.saleName === null">{{$t('order.orderList.buyerInformation')}}: {{item.salePhone}} </div>
                  <div class="item" v-else>{{$t('order.orderList.buyerInformation')}}: {{item.salePhone}} {{ "("+item.saleName+")"}}</div>
                </div>

                <div class="afterSalesitem-con" v-for="(ogood, ogIdx) in item.goods" :key="ogIdx">
                  <div class="one">
                    <div>
                     {{$t('afterSales.refundNumber')}}:{{item.refundTradeNo}}
                    </div>
                  </div>
                  <div class="two">
                    <div>
                      {{$t('afterSales.processState')}}:{{item.statusStr}}
                    </div>
                    
                  </div>
                  <div class="three">
                    <p v-if="item.refundType===1">{{$t('afterSales.afterSalesType')}}：{{$t('afterSales.refundAndReturn')}}</p>
                    <p v-else-if="item.refundType===2">{{$t('afterSales.afterSalesType')}}：{{$t('afterSales.Exchange')}}</p>
                  </div>
                  <div class="four">
                    <div class="four-left">
                      <img class="img" :src="ogood.skuPictrue">
                    </div>
                    <div class="four-right">
                      <div>{{$t('order.orderList.commoodityId')}}: {{ogood.skuId}}</div>
                      <div>{{$t('order.orderList.commodityName')}}: {{ogood.skuName}}</div>
                      <div style="color: #808080">{{$t('order.orderList.Specifications')}}: {{ogood.skuSpec}}</div>
                    </div>
                  </div>
                  <div class="five">
                    {{$t('afterSales.goodNum')}}：{{ogood.refundGoodCount}}
                  </div>

                  <div class="six">
                    <div>
                        <el-button type="text" @click="getAftersaleDetail(item.refundTradeNo)">{{$t('button.afterSalesDetail')}}</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list nodata" v-else>
              <img src="../../../assets/images/order/nodata.png" alt="" srcset="">
            </div>
          </el-col>
        </el-row>

        <el-row>
          <!-- 分页 -->
          <div class="page" v-if="total > 0">
            <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNum" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
          </div>
        </el-row>
      </div>

      <!-- 售后详情 弹窗 -->
      <el-dialog :visible.sync="afterDetailDialog">
        <div slot="title" style="font-size: 16px">
          {{$t('afterSales.afterSaleDetail')}}
        </div>
        <div class="afterdetail-con">
          <div class="afterdetail-con-item">
            <div class="afterdetail-con-item-title">{{$t('afterSales.afterType')}}：</div>
            <div>{{afterInfo.afterSaleType === 1 ? $t('afterSales.refundAndReturn') : $t('afterSales.Exchange')}}</div>
          </div>
          <div class="afterdetail-con-item">
            <div class="afterdetail-con-item-title">{{$t('afterSales.goodName')}}：</div>
            <div>{{afterInfo.goodsNameList}}</div>
          </div>
          <!-- 申请原因 -->
          <div class="afterdetail-con-item">
            <div class="afterdetail-con-item-title">{{$t('afterSales.applyForReason')}}：</div>
            <div class="afterdetail-con-item-ops">
              <div>{{afterInfo.applyReason}}</div>
              <div v-if="Number(afterInfo.status) === 0" style="margin-left: 20px">
                <el-tooltip placement="top">
                  <div slot="content">
                    <el-image style="width: 100px; height: 100px" :preview-src-list="srcList" :src="item" v-for="item  in imgUrlList" :key="item.index">
                      <div slot="error" class="image-slot" style="line-height:100px">
                        <p>{{$t('afterSales.noScreenshot')}}</p>
                      </div>
                    </el-image>
                  </div>
                  <el-button type="text">{{$t('afterSales.viewScreenshots')}}</el-button>
                </el-tooltip>
              </div>
              <div v-if="Number(afterInfo.status) === 2" style="margin-left: 20px">
                <el-tooltip placement="top">
                  <div slot="content">
                    {{afterInfo.userSite}} {{afterInfo.siteDetail}}
                  </div>
                  <el-button type="text">{{$t('afterSales.viewExchange')}}</el-button>
                </el-tooltip>
              </div>
              <div v-if="Number(afterInfo.status) === 1" style="margin-left: 20px">
                <el-tooltip placement="top">
                  <div slot="content">
                    <viewer>
                      <el-image :src="afterInfo.logisticsPicture" alt="" srcset="">
                        <div slot="error" class="image-slot" style="line-height:100px">
                          <p>{{$t('afterSales.noExpressScreen')}}</p>
                        </div>
                      </el-image>
                    </viewer>
                  </div>
                  <el-button type="text">{{$t('afterSales.viewMailingExpress')}}</el-button>
                </el-tooltip>
              </div>

            </div>
          </div>
          <div class="afterdetail-con-item">
            <div class="afterdetail-con-item-title">{{$t('afterSales.problemDesc')}}：</div>
            <div>{{afterInfo.requestDesc}}</div>
          </div>

          <div class="afterdetail-con-item">
            <div class="afterdetail-con-item-title">{{$t('common.Operation')}}：</div>
            <div>
              <el-radio-group v-model="radio" v-if="afterInfo.status === 0">
                <el-radio :label="false">{{$t('refund.ridioRefuse')}}</el-radio>
                <el-radio :label="true">{{$t('refund.ridioAgree')}}</el-radio>
              </el-radio-group>
              <span v-if="afterInfo.status === 1">{{$t('afterSales.merchantAgreement')}}</span>
              <span v-if="afterInfo.status === 2">{{$t('afterSales.merchantRefusal')}}</span>
              <span v-if="afterInfo.status === 3">{{$t('afterSales.merchantRefunding')}}</span>
              <span v-if="afterInfo.status === 4">{{$t('afterSales.merchantAlready')}}</span>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer" v-if="Number(afterInfo.status)===0">
        <el-button @click="afterDetailDialog = false">{{$t('button.cancel')}}</el-button>
        <el-button type="danger" @click="afterSalesConfir">{{$t('button.determine')}}</el-button>
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
      pageNum: 1,
      pageSize: 10,
      params: {
        orderNo: '', // 订单号
        status: '', // 处理状态
        refundOrderNo: '', // 售后订单号
        salePhone: '' // 下单手机号
      },
      optionsStatus: [
        {
          label: this.$t('afterSales.applying'),
          value: 0
        },
        {
          label: this.$t('afterSales.agreed'),
          value: 1
        },
        {
          label: this.$t('afterSales.rejected'),
          value: 2
        },
        {
          label: this.$t('afterSales.refunding'),
          value: 3
        },
        {
          label: this.$t('afterSales.refundes'),
          value: 4
        }
      ],
      tableData: [],
      total: 0,
      afterDetailDialog: false,
      afterInfo: {},
      imgUrlList: [],
      srcList: [],
      radio: false,
    }
  },
  created() {
    this.getAftersaleList()
  },
  watch: {
    params: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getAftersaleList()
      }
    }
  },
  methods: {
    // 获取售后列表
    getAftersaleList() {
      let _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        refundOrderNo: this.params.refundOrderNo,
        orderNo: this.params.orderNo,
        salePhone: this.params.salePhone
      }

      if(String(this.params.status)) {
        _param.status = this.params.status
      }
      this.$post('/back-end/afterSale/get', _param).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    // 选择条数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getAftersaleList()
    },
    // 选择页数
    handleSizeChange(val) {
      this.pageSize = val
      this.getAftersaleList()
    },
    getAftersaleDetail(afterSaleTradeNo) {
      this.$get('/back-end/afterSale/detail?afterSaleTradeNo=' + afterSaleTradeNo).then(res => {
        this.afterInfo = res.data
        if (res.data.picture) {
          this.imgUrlList = res.data.picture.split(';')
          this.srcList = res.data.picture.split(';')
        }
        this.afterDetailDialog = true
      })
    },
    afterSalesConfir() {
      let status = this.afterInfo.status
      if (status === 0) {
        let _param = {
          check: this.radio,
          refundOrderNo: this.afterInfo.refundOrderNo
        }

        this.$get('/back-end/merchantRefund/consent', _param).then(res => {
          if (res.code === 200) {
            this.$message.success(res.desc)
            this.afterDetailDialog = false
            this.getAftersaleList()
          } else {
            this.$message.error(res.desc)
          }
        })
      }
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
  .afterSaleslist {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
      
      .nodata {
        display: flex;
        justify-content: center;
      }
      .list {
        padding: 10px;
        max-height: 500px;
        overflow: auto;

        .afterSalesitem {
          border: 1px solid #ffc6c6ff;
          margin-top: 30px;
          .afterSalesitem-title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            font-size: 14px;
            background: @zs_color;
            color: #ffffff;
            padding: 0 10px;
            .item {
              width: 25%;
              // line-height: 60px;
              text-align: center;
            }
          }
          .afterSalesitem-con {
            display: flex;
            border-bottom: 1px solid #ffc6c6ff;
            &:last-child {
              border: none;
            }

            .one {
              padding: 0 10px;
              font-size: 14px;
              display: flex;
              border-right: 1px solid #ffc6c6ff;
              width: 20%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .two {
              border-right: 1px solid #ffc6c6ff;
              padding: 0 10px;
              font-size: 14px;
              width: 15%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .three {
              border-right: 1px solid #ffc6c6ff;
              padding: 0 10px;
              font-size: 14px;
              width: 15%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .four {
              padding: 0 10px;
              width: 30%;
              display: flex;
              border-right: 1px solid #ffc6c6ff;

              .four-left {
                img {
                  width: 100px;
                  height: 100px;
                  margin: 10px;
                }
              }
              .four-right {
                flex: 1;
                font-size: 14px;
                div {
                  margin: 14px;
                }
              }
            }

            .five {
              padding: 0 10px;
              width: 10%;
              font-size: 14px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-right: 1px solid #ffc6c6ff;
            }
          }
        }
      }

      .page {
        margin-top: 20px;
        text-align: right;
        height: 0.32rem;
      }
    }

    .afterdetail-con {
      .afterdetail-con-item {
        display: flex;
        margin-top: 20px;
        align-items: center;
        font-size: 16px;

        .afterdetail-con-item-title {
          width: 160px;
          text-align: right;
        }

        .afterdetail-con-item-ops {
          flex: 1;
          display: flex;
          align-items: center;
        }
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>