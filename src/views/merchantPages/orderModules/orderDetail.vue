<template>
  <div class="orderdetail">
    <page-content :name="$t('order.orderDetail.orderDetailTitle')">
      <div class="content">
        <div class="orderitem">
          <div class="ordertitle">
            {{$t('order.orderDetail.orderNumber')}}：{{orderData.orderNo}}
          </div>

          <div class="ordercon">
            <div class="ordercon-one ordercon-item">
              <div>
                <div v-if="orderData.buyerWXNickName === null">{{$t('order.orderDetail.orderUser')}}：{{orderData.buyerPhone}}</div>
                <div v-else>{{$t('order.orderDetail.orderUser')}}：{{orderData.buyerPhone}} ({{$t('order.orderDetail.weChantName')}}：{{ orderData.buyerWXNickName }})</div>
                <div>{{$t('order.orderDetail.payTime')}}：{{orderData.payTime}}</div>
              </div>
              
            </div>

            <div class="ordercon-two ordercon-item">
              <div>
                <div>{{$t('order.orderDetail.orderStatus')}}：{{orderData.orderStatusStr}}</div>
              </div>
              
            </div>

            <div class="ordercon-three ordercon-item">
              <div>
                <div>{{$t('order.orderDetail.cashAmount')}}：{{orderData.totalAmount}}&nbsp;&nbsp;({{$t('order.orderDetail.freight')}}：{{orderData.totalFreight}}元)</div>
              </div>
              
            </div>

            <div class="ordercon-four ordercon-item">
              <div>
                <div>{{$t('order.orderDetail.orderTime')}}：{{orderData.tradeTime}}</div>
              </div>
              
            </div>
          </div>
        </div>

        <!-- 收货信息 -->
        <div class="orderitem">
          <div class="ordertitle">
            {{$t('order.orderDetail.receivingInfo')}}
          </div>

          <div class="ordercon">
            <div class="ordercon-one ordercon-item">
              <div>
                <div>{{$t('order.orderDetail.consigneeName')}}：{{orderData.receiveName}}</div>
                <div>{{$t('order.orderDetail.userRemarks')}}：{{orderData.remark}}</div>
              </div>
              
            </div>

            <div class="ordercon-two ordercon-item">
              <div>
                <div>{{$t('order.orderDetail.consigneePhone')}}：{{orderData.receivePhone}}</div>
                <!-- <div>用户备注(User remarks):{{orderData.remark}}</div> -->
              </div>
              
            </div>

            <div class="ordercon-three ordercon-item" style="width: 40%">
              <div>
                <div>{{$t('order.orderDetail.address')}}：{{orderData.receiveSite}}&nbsp;&nbsp;{{orderData.receiveSiteDetail}}</div>
                <!-- <div>用户备注(User remarks):{{orderData.remark}}</div> -->
              </div>
              
            </div>
          </div>
        </div>

        <!-- 包裹信息 -->
        <div class="orderitem">
          <div class="ordertitle">
            {{$t('order.orderDetail.packageInfo')}}
          </div>

          <div class="ordercon">
            <div class="ordercon-one ordercon-item">
              <div>
                <div>{{$t('order.orderDetail.logisticsName')}}：{{orderData.companyName}}</div>
              </div>
              
            </div>

            <div class="ordercon-two ordercon-item" style="width: 40%">
              <div>
                <div>{{$t('order.orderDetail.logisticsNumber')}}：{{orderData.trackingNumber}}</div>
                <!-- <div>用户备注(User remarks):{{orderData.remark}}</div> -->
              </div>
              
            </div>

            <div class="ordercon-three ordercon-item" >
              <div>
                <div>
                  <el-button type="text" @click="getQueryLogis">{{$t('order.orderDetail.logisticsQuery')}}</el-button>
                </div>
                <div>
                  <!-- 修改订单号 -->
                  <el-button v-if="Number(orderData.orderStatus)===3" type="text" @click="tapmodifyLogistic">{{$t('order.orderDetail.modifyNumber')}}</el-button>
                </div>
                
              </div>
              
            </div>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="orderitem">
          <div class="ordertitle">
            <div class="item">{{$t('order.orderDetail.proName')}}</div>
            <div class="item">{{$t('order.orderDetail.specifications')}}</div>
            <div class="item">{{$t('order.orderDetail.Quantity')}}</div>
            <div class="item">{{$t('order.orderDetail.money')}}</div>
            <div class="item">{{$t('order.orderDetail.evaluate')}}</div>
            <div class="item">{{$t('common.Operation')}}</div>
          </div>

          <div class="ordercon" v-for="item in orderData.goodsInfo" :key="item.goodsId">
            <div class="one">
              {{item.goodsName}}
            </div>
            <div class="one">
              {{item.goodsSpec}}
            </div>
            <div class="one">
              {{item.count}}
            </div>
            <div class="one">
              {{item.amount}}
            </div>
            <div class="one" v-if="item.star === null">
              {{$t('order.orderDetail.noComments')}}
            </div>
            <div class="one" v-else>
              {{item.star}}{{$t('order.orderDetail.Praise')}}{{item.content}}
            </div>
            <div class="one" v-if="item.star === null">
              {{$t('order.orderDetail.noCommentsOps')}}
            </div>
            <div class="one" v-else>
              <el-button type="text" @click="comments(item.goodsId)">{{$t('order.orderDetail.reply')}}(Comment reply)</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 物流信息弹窗 -->
      <el-dialog :title="$t('order.orderDetail.logisticsQuery')" center :visible.sync="logisticsDialog">
        <div class="logisticsList-con">
          <step :logisticsList="logisticsList" style="font-size: 14px"></step>
        </div>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="logisticsDialog = false">{{$t('button.cancel')}}</el-button>
          <el-button type="danger" @click="logisticsDialog = false">{{$t('button.Comfirm')}}</el-button>
        </div>
      </el-dialog>

      <!-- 订单物流修改 -->
      <el-dialog :title="$t('order.orderDetail.orderlogMod')" center :visible.sync="modifyLogistic">
        <div>
          <div class="item">
            <el-select v-model="modifyData.trackingId" :placeholder="$t('order.orderDetail.chooseLogisiCom')" filterable style="width: 280px">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </div>

          <div class="item" style="margin-top: 18px">
            <el-input v-model.trim="modifyData.trackingNo" :placeholder="$t('order.orderDetail.enterLogNumber')" clearable style="width: 280px"/>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyLogistic = false">{{$t('button.cancel')}}</el-button>
          <el-button type="danger" @click="logisticsDialog = false">{{$t('button.Comfirm')}}</el-button>
        </div>
      </el-dialog>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content";
import step from '../../../components/step'
export default {
  components: {
    pageContent,
    step
  },
  data() {
    return {
      orderNo: this.$route.query.id,
      orderData: {},
      options: [], // 物流公司列表
      logisticsDialog: false,
      logisticsList: [],
      modifyLogistic: false, // 修改物流弹窗的状态
      modifyData: {
        orderNo: '',
        trackingId: [],
        trackingNo: ''
      }, // 修改物流信息所需要的的参数
    }
  },
  created() {
    this.getOrderDetail()
    this.getLogisticsList()
  },
  methods: {
    // 获取订单详情数据
    getOrderDetail() {
      this.$get('/back-end/merchantOrder/detail', {
        orderNo: this.orderNo
      }).then(res => {
        this.orderData = res.data
        this.modifyData.orderNo = res.data.orderNo
        this.modifyData.trackingNo = res.data.trackingNumber
        this.modifyData.trackingId = res.data.trackingId
      })
    },
    // 获取物流公司列表
    getLogisticsList() {
      this.$get('/back-end/merchant/company').then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    // 查询物流信息
    getQueryLogis() {
      this.$get('/back-end/merchantOrder/logistics', {
        orderNo: this.orderNo
      }).then(res => {
        if (res.code === 200) {
          this.logisticsList = res.data
          this.logisticsDialog = true
        } else {
          this.$message.error(res.desc)
        }
        
      })
    },
    // 
    tapmodifyLogistic() {
      this.modifyLogistic = true 
    }
  }
}
</script>

<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色
  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .orderdetail {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .orderitem {
        border: 1px solid #ffc6c6ff;
        margin-top: 30px;

        .ordertitle {
          display: flex;
          // justify-content: center;
          align-items: center;
          height: 60px;
          font-size: 14px;
          background: @zs_color;
          color: #ffffff;
          padding-left: 20px;
          .item {
            flex: 1;
            text-align: center;
          }
        }
        
        .ordercon {
          display: flex;

          .ordercon-item {
            padding: 0 10px;
            font-size: 14px;
            // text-align: center;
            display: flex;
            // justify-content: center;
            align-items: center;
          }
          .ordercon-one {
            width: 40%;
            border-right: 1px solid #ffc6c6ff;
            line-height: 40px;
          }

          .ordercon-two {
            width: 20%;
            border-right: 1px solid #ffc6c6ff;
          }

          .ordercon-three {
            width: 20%;
            border-right: 1px solid #ffc6c6ff;
          }

          .ordercon-four {
            width: 20%;
            border-right: 1px solid #ffc6c6ff;
          }

          .one {
            flex: 1;
            text-align: center;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ffc6c6ff;
            &:last-child {
              border: none;
            }
          }
        }
      }
    }
  }

  .logisticsList-con {
    max-height: 5rem;
    overflow: auto;
  }
</style>