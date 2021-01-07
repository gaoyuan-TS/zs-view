<template>
  <div class="orderlist">
    <page-content :name="$t('order.orderList.title')">
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
              <!-- <div class="input-title">购买商品</div> -->
              <el-input v-model="params.goodsName" :placeholder="$t('order.orderList.commodityName')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">收货人名称</div> -->
              <el-input v-model="params.receiveName" :placeholder="$t('order.orderList.Nameofconsignee')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">收货人电话</div> -->
              <el-input v-model="params.receivePhone" :placeholder="$t('order.orderList.ConsigneeTelephone')" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">快递单号</div> -->
              <el-input v-model="params.logisticsNumber" :placeholder="$t('order.orderList.trackingNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">下单手机号码</div> -->
              <el-input v-model="params.orderPhone" :placeholder="$t('order.orderList.orderMobNumer')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">订单状态</div> -->
              <el-select v-model="params.status" clearable :placeholder="$t('order.orderList.orderStatus')" style="width: 280px;">
                <el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- <el-input v-model="params.orderNo" :placeholder="$t('order.orderList.orderStatus')" style="flex: 1"></el-input> -->
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <div class="input-title">{{$t('order.orderList.payDate')}}</div>
              <el-date-picker
                style="flex:1; border: none"
                v-model="params.time"
                clearable
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startDate')"
                :end-placeholder="$t('common.endDate')"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>

        <!-- 导出订单列表 -->
        <el-row>
          <el-col :span="24">
            <el-button style="margin-left:20px" type="text" @click="exportOrder">{{$t('order.orderList.exportOrderList')}}</el-button>
          </el-col>
        </el-row>

        <!-- 订单列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list" v-if="orderList.length > 0">
              <div v-for="(order, oIdx) in orderList" :key="oIdx" class="orderitem">
                <div class="ordertitle">
                  <div class="item">
                    {{$t('order.orderList.orderNumber')}}: {{order.orderNo}}
                  </div>
                  <div class="item">
                    {{$t('order.orderList.theOrdertime')}}: {{order.tradeTime}}
                  </div>
                  <div class="item">
                    {{$t('order.orderList.payDate')}}: {{order.payTime}}
                  </div>
                  <div class="item">
                    {{$t('order.orderList.buyerInformation')}}: {{order.buyerPhone}}{{ "("+ order.buyerWXNickName + ")"}}
                  </div>
                </div>

                <div class="ordercon" v-for="(ogood, ogIdx) in order.orderGoodsInfo" :key="ogIdx">
                  <div class="ordercon-one">
                    <div class="ordercon-one-left">
                      <img :src="ogood.goodsPicture" alt="">
                    </div>
                    <div class="ordercon-one-right">
                      <div>{{$t('order.orderList.commoodityId')}}：{{ogood.goodsId}}</div>
                      <div>{{$t('order.orderList.commodityName')}}：{{ogood.goodsName}}</div>
                      <div style="color: #808080">{{$t('order.orderList.Specifications')}}：{{ogood.skuSpec}}</div>
                      <!-- <div>Commodity ID：{{ogood.goodsId}}</div> -->
                    </div>
                  </div>
                  <div class="ordercon-two">
                    {{order.statusStr}}
                  </div>
                  <div class="ordercon-three">
                    <div>
                      <div>{{$t('order.orderList.totalPrice')}}：{{ogood.amount}}</div>
                      <div>{{$t('order.orderList.freight')}}：{{ogood.freight}}</div>
                    </div>
                  </div>
                  <div class="ordercon-four">
                    <div>
                      <div>{{$t('order.orderList.Nameofconsignee')}}：{{order.receiveName}}</div>
                      <div>{{$t('order.orderList.ConsigneeTelephone')}}：{{order.receivePhone}}</div>
                      <div>{{$t('order.orderList.receAdress')}}：{{order.receiveSite}}{{order.receiveSiteDetail}}</div>
                    </div>
                  </div>
                  <div class="ordercon-five">
                    <div>
                      <div v-if="Number(order.status)===1">
                        <el-button type="text" @click="confirmOrder(order.orderNo)">{{$t('button.confirmOrder')}}</el-button>
                      </div>
                      <div v-if="Number(order.status)===1">
                        <el-button type="text" @click="cancelOrder(order.orderNo,1)">{{$t('button.cancelOrder')}}</el-button>
                      </div>
                      <div v-if="Number(order.status)===2">
                        <el-button type="text" @click="cancelOrder(order.orderNo,1)">{{$t('button.refund')}}</el-button>
                      </div>
                      <div v-if="Number(order.status)===2">
                        <el-button type="text" @click="godelivery(order.orderNo)">{{$t('button.delivery')}}</el-button>
                      </div>
                      <div v-if="Number(order.status)===1 || 2 || 3|| 4|| 5|| 6|| 7 || 8">
                        <el-button type="text" @click="goOrderDetail(order.orderNo)">{{$t('button.viewDetail')}}</el-button>
                      </div>
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
        <el-row v-if="total > 0">
          <el-col>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :current-page.sync="pageNum"
                :page-size.sync="pageSize"
                background
                layout="total, sizes, prev, pager, next"
                :total="total"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 取消订单或商品退款弹窗 -->
      <el-dialog :visible.sync="cancelOrderDialog" width="30%" center>
        <div slot="title" style="font-size: 16px">
          {{title}}
        </div>

        <div class="dialog-con">
          <div class="item">
            <el-select placeholder="请选择商品" v-model="fromdata1.goodsIdList" style="width: 280px" multiple>
              <el-option v-for="item in cancelGoodList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>

        <div slot="footer" class="accountList-footer">
          <div>
            <el-button type="primary" @click="cancelConfirm">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancelOrderDialog = false">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>

      <el-dialog :visible.sync="deliveryDialog" width="30%" center>
        <div slot="title" style="font-size: 16px">
          {{$t('order.orderList.shipIm')}}
        </div>

        <div  class="dialog-con">
          <div class="item">
            <el-select v-model="fromdata.trackingId" :placeholder="$t('order.orderDetail.chooseLogisiCom')" filterable style="width: 280px">
              <el-option v-for="item in logisticsList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </div>

          <div class="item" style="margin-top: 18px">
            <el-input v-model.trim="fromdata.trackingNo" :placeholder="$t('order.orderDetail.enterLogNumber')" clearable style="width: 280px"/>
          </div>
        </div>

        <div slot="footer" class="accountList-footer">
          <div>
            <el-button type="primary" @click="ImmediateDelivery">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="deliveryDialog = false">{{this.$t('button.cancel')}}</el-button>
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
      merchantId: '', // 商家id
      pageNum: 1,
      pageSize: 10,
      params: {
        orderNo: '',
        status: null,
        goodsName: '',
        receiveName: '',
        receivePhone: '',
        logisticsNumber: '',
        orderPhone: '',
        time: []
      },
      total: 0,
      // 订单状态释义
      optionsStatus: [
        {
          label: this.$t('order.orderStatus.pendingOrder'),
          value: 1
        },
        {
          label: this.$t('order.orderStatus.toBeSeli'),
          value: 2
        },
        {
          label: this.$t('order.orderStatus.toBeReceived'),
          value: 3
        },
        {
          label: this.$t('order.orderStatus.transeComplete'),
          value: 4
        },
        {
          label: this.$t('order.orderStatus.refundComplete'),
          value: 5
        },
        {
          label: this.$t('order.orderStatus.refundIng'),
          value: 6
        },
        {
          label: this.$t('order.orderStatus.refundInReturn'),
          value: 7
        },
        {
          label: this.$t('order.orderStatus.refundInReturnCompleted'),
          value: 8
        }
      ],
      orderList: [],
      deliveryDialog: false, // 立即发货弹窗的状态
      logisticsList: [], // 物流公司列表
      fromdata: {
        orderNo: '',
        trackingId: '', // 物流公司的id
        trackingNo: '' // 物流单号
      },
      cancelOrderDialog: false, // 取消订单弹窗的状态
      fromdata1: {
        orderNo: '',
        goodsIdList: []
      }, // 取消订单所需的参数
      title: '', // 取消订单弹窗的标题
      cancelGoodList: [] // 要取消订单中的商品列表
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getOrderList()
    this.getLogisticsList()
  },
  watch: {
    params: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getOrderList()
      }
    }
  },
  methods: {
    // 获取订单列表
    getOrderList() {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderNo: this.params.orderNo,
        status: this.params.status || null,
        goodsName: this.params.goodsName,
        receiveName: this.params.receiveName,
        receivePhone: this.params.receivePhone,
        logisticsNumber: this.params.logisticsNumber,
        orderPhone: this.params.orderPhone,
        startPayTime: this.params.time[0] || null,
        endPayTime: this.params.time[1] || null
      }
      this.$post('/back-end/merchantOrder/list', _params).then(res => {
        this.orderList = res.data.list
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.pageNum  = val
      this.getOrderList()
    },
    // 导出订单Excel表格
    exportOrder () {
      this.$confirm(this.$t('order.orderList.exportOrderTitle'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.Comfirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'success'
      }).then(() => {
        //   this.$common
        //   .get("/back-end/merchantOrder/export")
        //   .then(
        //       //成功后刷新列表
        //        window.location.href =
        // 'https://zs.cntracechain.com/back-end/merchantOrder/export?orderNo='
        // +this.paramData.orderNo+'&status='+this.paramData.status+'&goodsName='+this.paramData.goodsName
        // +'&receiveName='+this.paramData.receiveName+'&receivePhone='+this.paramData.receivePhone+'&logisticsNumber='
        // +this.paramData.logisticsNumber+'&orderPhone='+this.paramData.orderPhone+'&startPayTime='+this.paramData.startPayTime
        // +'&endPayTime='+this.paramData.endPayTime+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize
        //   );
        let status = this.params.status ? this.paramData.status : ''
        let startPayTime = ''
        let endPayTime = ''
        if (this.params.time.length > 0) {
          startPayTime = this.params.time[0]
          endPayTime = this.params.time[1]
        }
        

        window.location.href =
          'https://zs.cntracechain.com/back-end/merchantOrder/export?merchantId=' + this.merchantId + '&orderNo=' +
          this.params.orderNo + '&status=' + status + '&goodsName=' + this.params.goodsName +
          '&receiveName=' + this.params.receiveName + '&receivePhone=' + this.params.receivePhone + '&logisticsNumber=' +
          this.params.logisticsNumber + '&orderPhone=' + this.params.orderPhone + '&startPayTime=' + startPayTime +
          '&endPayTime=' + endPayTime
      }).catch(() => {

      })
    },
    // 确认订单
    confirmOrder (obj) {
      this.$confirm(this.$t('order.orderList.confirmOrderTitle'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.Comfirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        this.$get('/back-end/merchantOrder/accept?orderNo=' + obj).then(res => {
          if (Number(res.code) === 200) {
            this.$message({
              type: 'success',
              message: res.desc
            })
            // 成功后刷新列表
            this.getOrderList()
          } else {
            this.$message.error(res.data.desc)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('order.orderList.confirmOrderCancel')
        })
      })
    },
    // 获取支持配送的物流公司
    getLogisticsList() {
      this.$get('/back-end/merchant/company').then(res => {
        if (res.code === 200) {
          this.logisticsList = res.data
        }
      })
    },
    godelivery(orderNo) {
      this.fromdata.orderNo = orderNo 
      this.deliveryDialog = true
    },
    // 立即发货
    ImmediateDelivery() {
      if (!this.fromdata.trackingId) {
        this.$message.error(this.$t('order.orderList.trackingIdTip'))
        return false
      }

      if (!this.fromdata.trackingNo) {
        this.$message.error(this.$t('order.orderList.trackingNoTip'))
        return false
      }
      this.$get('/back-end/merchantOrder/shipments', this.fromdata).then(res => {
        if (res.code === 200) {
          this.$message.success(res.desc)
          this.deliveryDialog = false
          this.fromdata = {
            orderNo: '',
            trackingId: '',
            trackingNo: ''
          }
          this.getOrderList()
        } else {
          this.$message.error(res.desc)
        }
      })
    },
    // 取消订单
    cancelOrder(params, type) {
      this.fromdata1 = {
        orderNo: '',
        goodsIdList: []
      }
      if (type === 1) {
        this.title = this.$t('order.orderList.cancelOrderTitle')
        
      } else if (type === 2) {
        this.title = this.$t('order.orderList.refundTitle')
      }
      this.fromdata1.orderNo = params
      this.$get('/back-end/merchantRefund/allowRefund?orderNo=' + params).then(res => {
        // console.log(res)
        this.cancelGoodList = res.data
      })
      this.cancelOrderDialog = true
    },
    // 取消订单或商品退款
    cancelConfirm() {
      if (!this.fromdata1.goodsIdList.length > 0) {
        this.$message.error(this.$t('order.orderList.cancelOrderTip'))
        return false
      }
      this.$post('/back-end/merchantOrder/cancel', this.fromdata1).then(res => {
        if (res.code === 200) {
          this.cancelOrderDialog = false
          this.fromdata1 = {
            orderNo: '',
            goodsIdList: []
          }
          this.getOrderList()
        } else {
          this.$message.error(res.desc)
        }
      })
    },
    // 跳转到订单详情页
    goOrderDetail(orderNo) {
      this.$router.push(
        {
          path: '/merchant/orderDetail',
          query: {
            id: orderNo
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
  .orderlist {
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
        .orderitem {
          border: 1px solid #ffc6c6ff;
          margin-top: 30px;
        }

        .ordertitle {
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

        .ordercon {
          display: flex;
          border-bottom: 1px solid #ffc6c6ff;
          &:last-child {
            border: none;
          }
          .ordercon-one {
            padding-left: 10px;
            width: 30%;
            display: flex;
            border-right: 1px solid #ffc6c6ff;
            .ordercon-one-left {

            }
            .ordercon-one-right {
              flex: 1;
              font-size: 14px;
              div {
                margin: 14px;
              }
            }
            img {
              width: 100px;
              height: 100px;
              margin: 10px;
            }
          }

          .ordercon-two {
            width: 10%;
            font-size: 14px;
            // text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ffc6c6ff;
          }

          .ordercon-three {
            width: 16%;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ffc6c6ff;
          }
          .ordercon-four {
            padding: 0 10px;
            width: 30%;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ffc6c6ff;
          }

          .ordercon-five {
            width: 14%;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ffc6c6ff;
          }
        }
      }

      .page {
        margin-top: 20px;
        text-align: right;
        height: 0.32rem;
      }
    }
  }

  .list::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    // height: 1px;
  }
  .list::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 6px;
    background-color: @zs_color;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }

  .dialog-con {
    
    .item {
      display: flex;
      // flex-direction: column;
      justify-content: center;
    }
  }
</style>