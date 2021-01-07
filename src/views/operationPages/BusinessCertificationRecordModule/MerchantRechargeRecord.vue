<template>
  <div class="wealthList">
    <div class="title">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <h2 class="title-name">商家充值积分记录</h2>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple disPlayFlex">
            <div class="name" style="width: 100px;font-size:14px">
              商家名称：
            </div>
            <!-- <div class="conter" style="flex: 1"> -->
              <el-input v-model="param.merchantName" placeholder="请输入商家名称" class="disPlayFlex1"></el-input>
            <!-- </div> -->
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple disPlayFlex">
            <div class="name" style="width: 100px;font-size:14px">
              审核状态：
            </div>
            <!-- <div class="conter" style="flex: 1"> -->
              <el-select v-model="param.auditStatus" placeholder="请选择审核状态" class="disPlayFlex1">
                <el-option
                  v-for="item in auditStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            <!-- </div> -->

          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple disPlayFlex">
            <div class="name" style="width: 100px;font-size:14px">充值方式：</div>
            <!-- <div class="disPlayFlex1"> -->
              <el-select v-model="param.payType" placeholder="请选择充值方式" class="disPlayFlex1">
                <el-option
                  v-for="item in payTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            <!-- </div> -->

          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple disPlayFlex">
            <div class="name" style="width: 100px;font-size:14px">
              充值日期：
            </div>
            <!-- <div class="conter" style="flex: 1"> -->
              <el-date-picker
                value-format='yyyy-MM-dd HH:mm:ss'
                class="disPlayFlex1"
                v-model="param.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                @change="change"
                end-placeholder="结束日期"
              ></el-date-picker>
            <!-- </div> -->
<!--
            <el-button type="primary" style="margin-left:30px" @click="dialogFormVisible = true">新建</el-button> -->
          </div>
        </el-col>
      </el-row>

        <!-- <el-col :span="5">
          <div class="grid-content bg-purple">

          </div>
        </el-col>-->
      <el-row>
        <div class="list">
          <el-table :data="tableData" style="width: 100%;text-align:center"   height="500">
            <el-table-column prop="merchant_name" label="商家名称"></el-table-column>
            <el-table-column prop="address" label="所在地"></el-table-column>
            <el-table-column prop="pay_sum" label="充值金额"></el-table-column>
            <!-- <el-table-column prop="chaseLot" label="充值类型"></el-table-column> -->
            <el-table-column prop="pay_type" label="支付方式">
              <template slot-scope="scope">
                <span v-if="scope.row.pay_type === 3">微信</span>
                <span v-if="scope.row.pay_type === 2">支付宝</span>
                <span v-if="scope.row.pay_type === 1">转账</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="充值日期">
              <template slot-scope="scope">
                {{$moment(scope.row.create_time ).format('YYYY/MM/DD HH:mm:ss')}}
              </template>
            </el-table-column>
            <el-table-column prop="audit_status" label="审核状态">
              <template slot-scope="scope">
                <span class="circle-red" v-if="scope.row.audit_status === 1 || scope.row.audit_status === 3"></span>
                <span v-if="scope.row.audit_status === 1">待审核</span>
                <span class="circle-green" v-if="scope.row.audit_status === 2"></span>
                <span v-if="scope.row.audit_status === 2">已通过</span>
                <!-- <span class="circle-red"></span> -->
                <span v-if="scope.row.audit_status === 3">拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="handle" label="操作" width="200" v-if="headquarters">
              <template slot-scope="scope">
                <!-- <div v-if="scope.row.audit_status === 1"> -->
                  <!-- <el-button type="text">
                    查看凭证
                  </el-button> -->
                  <el-button type="text" size="small" @click="passTap(scope.row.integral_voucher_id)" v-if="scope.row.audit_status === 1">
                    通过
                  </el-button>
                  <!-- <el-button type="text" size="small" >充值</el-button> -->
                  <el-button type="text" size="small" @click="refuseTap(scope.row.integral_voucher_id)" v-if="scope.row.audit_status === 1">
                    拒绝
                  </el-button>
                <!-- </div> -->
                <!-- <div v-if="scope.row.payType === 1"> -->
                  <!-- <el-button type="text" v-if="scope.row.pay_type === 1">查看凭证</el-button> -->
                  <el-popover
                    placement="left"
                    title="转账凭证图片"
                    width="200"
                    v-if="scope.row.pay_type === 1"
                    trigger="click">
                    <!-- <div>123</div> -->
                    <viewer>
                      <img
                        width="150"
                        :src="scope.row.pay_certify"
                      />
                    <!-- <el-image :src='scope.row.pay_certify'></el-image> -->
                    </viewer>
                    <!-- <el-image :src='scope.row.pay_certify'></el-image> -->
                    <el-button type="text" slot="reference">查看凭证</el-button>
                  </el-popover>
                <!-- </div> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row v-if="total > 0">
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            :current-page="pageNum"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 通过弹窗 -->
    <el-dialog title="提示" :visible.sync="passDialog" width="35%">
      <span class="el-dialog_span">确认通过吗?</span>
      <!-- <el-form v-model="chaseform">
        <el-form-item label="审核说明：">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="passParam.auditRemark" with='80%'></el-input>
        </el-form-item>
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="passDialog = false">取 消</el-button>
        <el-button type="primary" @click="auditPass">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 拒绝弹窗 -->
    <el-dialog title="充值拒绝" :visible.sync="refuseDialog" width="35%">
      <el-form v-model="chaseform">
        <el-form-item label="拒绝原因：">
          <el-input type="textarea" :rows="4" v-model="refuseParam.auditRemark" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refuseDialog = false">取 消</el-button>
        <el-button type="primary" @click="auditRefuse">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import mystorage from '../../../assets/common/js/localstore'
export default {
  data () {
    return {
      passDialog: false,
      refuseDialog: false,
      pass: false,
      dialogFormedit: false,
      auditStatusList: [
        {value: 1, label: '待审核'},
        {value: 2, label: '通过'},
        {value: 3, label: '拒绝'}
      ], // 审核状态
      payTypeList: [
        {value: 1, label: '转账'},
        {value: 2, label: '支付宝'},
        {value: 3, label: '微信'}
      ], // 商家充值方式
      param: {
        merchantName: '',
        auditStatus: '',
        payType: '',
        time: []
      },
      pageNum: 1,
      pageSize: 10,
      passParam: {
        integralVoucherId: '',
        auditRemark: ''
      }, // 通过所需要的参数
      refuseParam: {
        integralVoucherId: '',
        auditRemark: ''
      }, // 拒绝所需要的参数
      textarea: '',
      chaseform: '',
      input: '',
      options: [],
      value: '',
      tableData: [],
      total: 0,
      currentPage4: 1,
      headquarters: true
    }
  },
  watch: {
    param: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.selectQueryApplyCertifyList()
      }
    },
    pageNum (newValue, oldValue) {
      this.selectQueryApplyCertifyList()
    },
    pageSize (newValue, oldValue) {
      this.selectQueryApplyCertifyList()
    }
  },
  created () {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson.role.roleName === 'ROLE_HEADQUARTERS_FINANCE') {
      this.headquarters = true
    } else {
      this.headquarters = false
    }
    this.getqueryApplyCertifyList()
  },
  methods: {
    // 获取商家充值积分记录
    getqueryApplyCertifyList () {
      this.$post('/management_point/integralVoucher/queryVoucherList', {
        pageNum: 1,
        pageSize: 10
      }).then((res) => {
        console.log(res.data)
        if (res.code === 100) {
          var _data = res.data.pageInfo.list
          // if (_data) {
          //   _data.forEach(item => {
          //     item.create_time = this.$common.timeStamp(item.create_time, 1)
          //   })
          // }
          this.tableData = _data
          this.total = res.data.pageInfo.total
        }
      })
    },
    passTap (id) {
      this.passDialog = true
      this.passParam.integralVoucherId = id
    },
    refuseTap (id) {
      this.refuseDialog = true
      this.refuseParam.integralVoucherId = id
    },
    // 充值记录审核通过
    auditPass () {
      var _param = {
        integralVoucherId: this.passParam.integralVoucherId,
        auditStatus: 2
      }
      // console.log(_param)
      this.$post('/management_point/integralVoucher/voucherAudit', _param).then(res => {
        console.log(res.data.data)
        this.passDialog = false
        this.selectQueryApplyCertifyList()
      })
    },
    // 充值记录审核拒绝
    auditRefuse () {
      var _param = {
        integralVoucherId: this.refuseParam.integralVoucherId,
        auditStatus: 3,
        auditRemark: this.refuseParam.auditRemark
      }
      if (_param.auditRemark) {
        console.log(_param)
        this.$post('/management_point/integralVoucher/voucherAudit', _param).then(res => {
          if (res.code === 100) {
            this.$common.success('拒绝成功')
          } else {
            this.$common.error(res.data.desc)
          }
          console.log(res.data)
          this.selectQueryApplyCertifyList()
          this.refuseDialog = false
        })
      } else {
        this.$common.error('拒绝原因没有填！')
      }
    },
    // 搜索商家充值积分记录
    selectQueryApplyCertifyList () {
      var _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.param.merchantName) {
        _param.merchantName = this.param.merchantName
      }
      if (this.param.auditStatus) {
        _param.auditStatus = this.param.auditStatus
      }
      if (this.param.payType) {
        _param.payType = this.param.payType
      }
      if (this.param.time) {
        _param.startTime = this.param.time[0]
        _param.endTime = this.param.time[1]
      }
      this.$post('/management_point/integralVoucher/queryVoucherList', _param).then(res => {
        // console.log(res.data)
        if (res.code === 100) {
          var _data = res.data.pageInfo.list
          // if (_data) {
          //   _data.forEach(item => {
          //     item.create_time = this.$common.timeStamp(item.create_time, 1)
          //   })
          // }
          this.tableData = _data
          this.total = res.data.pageInfo.total
        }
      })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageNum = val
    },
    handleClick (a) {
      console.log(a)
    },
    change (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色
.title {
  margin-top: 12px;
}
.name {
  margin-left: 10px;
}
.title-name {
  font-size: 28px;
  font-family: MicrosoftYaHeiLight;
  font-weight: 300;
  color: @zs_color;
  text-align: left;
}
.content {
  //   min-height: 2077px;
//   margin-top: 41px;
  padding: 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 15px;
  .list {
    margin-top: 25px;
    border: 1px solid rgba(204, 204, 204, 1);
  }
  .page {
    margin-top: 20px;
    text-align: right;
  }
}
.circle-red {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: @zs_color;
  margin: 1px;
}
.circle-green {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #58eb00;
  margin: 1px;
}
</style>
<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色
.wealthList {
      /deep/ .el-table td,
  .el-table .has-gutter,
  .el-table th {
    text-align: center;
  }
    /deep/ 
  .el-table th.is-leaf {
    border-bottom: 1px solid #ebeef5;
    text-align: center;
  }
    .disPlayFlex{
        display: flex;
        align-items: center;
    }
  // min-width: 1250px;
  // overflow: hidden;
  // .el-input {
  //   width: 200px;
  //   height: 44px;
  // }
  .el-table thead {
    color: @zs_color;
    font-weight: 500;
    tr {
      th {
        text-align: center;
        background: rgba(242, 242, 242, 1);
      }
    }
  }
  .el-table .cell {
    text-align: center;
  }
  .el-pagination__jump {
    .el-input {
      width: 50px;
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: @zs_color;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #000;
  }
  // 新建追溯
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: @zs_color;
  }
  .el-dialog {
    width: 400px;
    .el-dialog__body {
      padding: 0px 20px;
    }
  }
  .el-dialog_span {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    i {
      font-style: normal;
    }
  }
  .el-form {
    margin-top: 20px;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: @zs_color;
    background: @zs_color;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #000;
  }
  .el-button--primary {
    color: #fff;
    background-color: @zs_color;
    border-color: @zs_color;
  }
  .el-textarea {
      width: 80%;
  }
}
.el-popover {
    max-height: 400px;
    overflow: auto;
  }
</style>
