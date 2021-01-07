<template>
  <div class="refundlist">
    <page-content :name="$t('refund.refundListTitle')">
      <div class="content">
        <!-- 搜索条件区域 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">订单号</div> -->
              <el-input v-model="paramData.orderNo" :placeholder="$t('order.orderList.orderNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <el-select v-model="paramData.status" clearable :placeholder="$t('afterSales.processState')" style="width: 280px;">
                <el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">退款订单号</div> -->
              <el-input v-model="paramData.refundOrderNo" :placeholder="$t('refund.refundNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">下单手机号</div> -->
              <el-input v-model="paramData.salePhone" :placeholder="$t('afterSales.mobilNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <!-- 列表内容 -->
        <el-row>
          <el-col :span="24">
            <div class="list" v-if="tableData.length > 0">
              <div class="refunditem" v-for="(item, idx) in tableData" :key="idx">
                <div class="refunditem-title">
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

                <div class="refunditem-con" v-for="(ogood, ogIdx) in item.goods" :key="ogIdx">
                  <div class="refunditem-con-one refunditem-con-item">
                    <div>{{$t('afterSales.refundNumber')}}:{{item.refundTradeNo}}</div>
                  </div>

                  <div class="refunditem-con-two refunditem-con-item">
                    <div>
                      {{$t('afterSales.processState')}}:{{item.statusStr}}
                    </div>
                  </div>

                  <div class="refunditem-con-three refunditem-con-item">
                    <div class="refunditem-con-three-left">
                      <img class="img" :src="ogood.skuPictrue">
                    </div>
                    <div class="refunditem-con-three-right">
                      <div>{{$t('order.orderList.commoodityId')}}: {{ogood.skuId}}</div>
                      <div>{{$t('order.orderList.commodityName')}}: {{ogood.skuName}}</div>
                      <div style="color: #808080">{{$t('order.orderList.Specifications')}}: {{ogood.skuSpec}}</div>
                    </div>
                  </div>

                  <div class="refunditem-con-four refunditem-con-item">
                    <div v-if="item.refundStatus == 0">
                      <el-button type="text" @click="opRefundChange(item.refundTradeNo)">{{$t('refund.opsRefund')}}</el-button>
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

        <!-- 分页 -->
        <el-row>
          <div class="page" v-if="total > 0">
            <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNum" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
          </div>
        </el-row>
      </div>

      <!-- 操作退款的弹窗 -->
      <el-dialog :visible.sync="opsRefundDialog" center>
        <div slot="title" style="font-size: 16px">
          {{$t('refund.opsRefund')}}
        </div>

        <div  class="dialog-con">
          <div class="item">
            <el-radio-group v-model="radio">
              <el-radio :label="false">{{$t('refund.ridioRefuse')}}</el-radio>
              <el-radio :label="true">{{$t('refund.ridioAgree')}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="opsRefundConfir">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="opsRefundDialog = false">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>
    </page-content>
  </div>
</template>

<script>
import pageContent from '../../../components/content'
export default {
  components: {
    pageContent
  },
  data() {
    return {
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
      pageNum: 1,
      pageSize: 10,
      paramData: {
        refundOrderNo: '', // string：退款订单号
        status: null, // number：处理状态
        orderNo: '', // string：订单号
        salePhone: '' // string：下单用户手机
      },
      tableData: [],
      total: 0,
      refundOrderNo: '',
      opsRefundDialog: false,
      radio: false
    }
  },
  created() {
    this.getRefundList()
  },
  watch: {
    paramData: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getRefundList()
      }
    }
  },
  methods: {
    // 获取退款列表
    getRefundList() {
      let _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        refundOrderNo: this.paramData.refundOrderNo,
        status: this.paramData.status || null,
        orderNo: this.paramData.orderNo,
        salePhone: this.paramData.salePhone
      }
      this.$post('/back-end/merchantRefund/list', _param).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    // 选择条数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getRefundList()
    },
    // 选择页数
    handleSizeChange(val) {
      this.pageSize = val
      this.getRefundList()
    },
    // t退款按钮事件
    opRefundChange(refundOrderNo) {
      this.refundOrderNo = refundOrderNo
    },
    // 退款操作
    opsRefundConfir() {
      let _params = {
        refundOrderNo: this.refundOrderNo,
        check: this.radio
      }
      this.$post('/back-end/merchantRefund/consent', _params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.desc)
          this.opsRefundDialog = false
          this.getRefundList()
        } else {
          this.$message.error(res.desc)
        }
      })
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
  .refundlist {
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

        .refunditem {
          border: 1px solid #ffc6c6ff;
          margin-top: 30px;
          .refunditem-title {
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

          .refunditem-con {
            display: flex;
            border-bottom: 1px solid #ffc6c6ff;

            .refunditem-con-item {
              padding: 0 10px;
              font-size: 14px;
              display: flex;
              border-right: 1px solid #ffc6c6ff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .refunditem-con-one {
              width: 30%;
            }

            .refunditem-con-two {
              width: 20%;
            }

            .refunditem-con-three {
              width: 40%;

              .refunditem-con-three-left {
                img {
                  width: 100px;
                  height: 100px;
                  margin: 10px;
                }
              }
              .refunditem-con-three-right {
                flex: 1;
                font-size: 14px;
                div {
                  margin: 14px;
                }
              }
            }

            .refunditem-con-four {
              width: 10%;
            }
          }
        }
      }

      .page {
        margin-top: 20px;
        text-align: right;
        height: 0.32rem;
        /deep/.el-pagination {
          height: 100%;
          padding: 0;
        }
      }
    }

    .dialog-con {
    
      .item {
        display: flex;
        // flex-direction: column;
        justify-content: center;
      }
    }
    .dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>