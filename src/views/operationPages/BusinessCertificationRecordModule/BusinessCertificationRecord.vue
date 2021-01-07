<template>
  <div class="wealthList">
    <div class="title">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <h2 class="title-name">商家认证记录</h2>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="5">
          <div
            class="grid-content bg-purple"
            style="display:flex;align-items: center;font-size:14px"
          >
            <div class="name" style="width: 100px">商家名称：</div>
            <el-input v-model="params.merchantName" style="flex: 0.8" placeholder="请输入商家名称"></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div
            class="grid-content bg-purple"
            style="display:flex ; align-items: center;font-size:14px"
          >
            <div class="name" style="width: 100px">审核类型：</div>

            <el-select v-model="params.auditStatus" style="flex: 0.8" placeholder="请选择状态" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div
            class="grid-content bg-purple"
            style="display:flex;align-items: center;font-size:14px"
          >
            <div class="name" style="width: 100px">充值方式：</div>

            <el-select v-model="params.payType" style="flex: 0.8" placeholder="请选择充值方式" clearable>
              <el-option
                v-for="item in payList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div
            class="grid-content bg-purple"
            style="display:flex;align-items: center;font-size:14px"
          >
            <div class="name" style="width: 100px">充值日期：</div>
            <el-date-picker
              @change="changeTime"
              style="flex: 0.8"
              v-model="value3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <!-- <el-button type="primary" @click="dialogFormVisible = true">新建</el-button> -->
      <el-row>
        <div class="list">
          <el-table :data="tableData" style="width: 100%;text-align:center" height="500">
            <el-table-column prop="merchant_name" label="商家名称"></el-table-column>
            <el-table-column prop="address" label="所在地"></el-table-column>
            <el-table-column prop="auth_sum" label="充值金额"></el-table-column>
            <el-table-column prop="pay_type" label="充值方式">
              <template slot-scope="scope">
                <span v-if="Number(scope.row.pay_type)===1">转账</span>
                <span v-if="Number(scope.row.pay_type)===2">支付宝</span>
                <span v-if="Number(scope.row.pay_type)===3">微信</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="充值日期">
              <template
                slot-scope="scope"
              >{{ $moment(scope.row.create_time ).format('YYYY/MM/DD HH:mm:ss')}}</template>
            </el-table-column>
            <el-table-column label="充值状态">
              <template slot-scope="scope">
                <div v-if="Number(scope.row.audit_status)===1">
                  <span class="circle-red"></span>待审核
                </div>
                <div v-if="Number(scope.row.audit_status)===2">
                  <span class="circle-green"></span> 通过
                </div>
                <div v-if="Number(scope.row.audit_status)===3">
                  <span class="circle-red"></span>拒绝
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="handle" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="confirmPass(scope.row,'pass')"
                  v-if="Number(scope.row.audit_status) === 1"
                >认证通过</el-button>
                <el-popover
                  placement="left"
                  title="转账凭证图片"
                  width="200"
                  v-if="scope.row.pay_type === 1"
                  trigger="click"
                >
                  <!-- <div>123</div> -->
                  <!-- <el-image :src='scope.row.pay_certify'></el-image> -->
                  <viewer>
                    <img width="150" :src="scope.row.pay_certify" />
                    <!-- <el-image :src='scope.row.pay_certify'></el-image> -->
                  </viewer>
                  <el-button type="text" slot="reference">查看凭证</el-button>
                </el-popover>

                <el-button
                  type="text"
                  size="small"
                  @click="confirmPass(scope.row,'reject')"
                  v-if="Number(scope.row.audit_status) === 1"
                >拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row>
        <div class="page">
          <el-pagination
            v-if="tableData.length>0"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="pageSize"
            :current-page="pageNum"
            background
            layout="total, prev, pager, next"
            :total="pageInfo.total"
          ></el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 拒绝弹窗 -->
    <el-dialog title="拒绝认证" :visible.sync="dialogFormVisible" width="35%">
      <!-- <span class="el-dialog_span">（辅助信息）</span> -->
      <el-form v-model="chaseform">
        <el-form-item label="拒绝原因：">
          <el-input with="80%" type="textarea" :rows="4" placeholder="请输入内容" v-model="auditRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 认证通过弹窗 -->
    <el-dialog title="认证通过" :visible.sync="pass" width="35%">
      <el-form v-model="chaseform" v-if="rowInfo.merchant_type !== 3">
        <el-form-item label="设置默认纸质追溯额：" style="display:flex">
          <el-input v-model="paperLabelUpper" type="Number" style="width:250px" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      pass: false,
      dialogFormedit: false,
      input: "",
      value3: [],
      chaseform: {
        resource: "",
        count: ""
      },
      payList: [
        {
          value: "1",
          label: "转账"
        },
        {
          value: "2",
          label: "支付宝"
        },
        {
          value: "3",
          label: "微信"
        }
      ],

      options: [
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "2",
          label: "通过"
        },
        {
          value: "3",
          label: "拒绝"
        }
      ],
      value: "",
      tableData: [],
      textarea: "",
      pageNum: 1,
      pageSize: 10,
      params: {
        merchantName: "",
        auditStatus: "",
        payType: "",
        startAuthDate: "",
        endAuthDate: ""
      },
      pageInfo: {},
      confirmInfo: {
        merchantAuthId: "",
        auditStatus: "",
        auditRemark: "",
        paperLabelUpper: ""
      },
      paperLabelUpper: "",
      auditRemark: "",
      rowInfo: {},
      currentPage4: 1
    };
  },
  watch: {
    params: {
      handler(newName, oldName) {
        this.getqueryApplyCertifyList();
      },

      deep: true
    }
  },
  created() {
    this.getqueryApplyCertifyList();
  },
  methods: {
    // 认证通过
    confirmPass(row, type) {
      this.rowInfo = row;
      if (type === "reject") {
        this.dialogFormVisible = true;
      } else {
        this.pass = true;
      }
    },
    confirm() {
      let rejectInfo = {
        merchantAuthId: this.rowInfo.merchant_auth_id,
        auditStatus: 2,
        merchantType: this.rowInfo.merchant_type
        // auditRemark: "",
        // paperLabelUpper: this.paperLabelUpper
      };
      if (this.rowInfo.merchant_type !== 3) {
        rejectInfo.paperLabelUpper = this.paperLabelUpper;
      }
      if (
        this.rowInfo.merchant_type !== 3 &&
        !this.paperLabelUpper.replace(/\s+/g, "")
      ) {
        this.$common.error("请输入默认纸质追溯额");
        return false;
      }
      this.$post("/management_point/merchantAuth/authAudit", rejectInfo)
        .then(data => {
          if (Number(data.code) === 100) {
            this.$common.success("认证通过成功");
          } else {
            this.$common.error("认证通过失败");
          }
          this.getqueryApplyCertifyList();
          this.pass = false;
        });
    },
    reject() {
      console.log(this.rowInfo);
      let rejectInfo = {
        merchantAuthId: this.rowInfo.merchant_auth_id,
        auditStatus: 3,
        auditRemark: this.auditRemark
        // paperLabelUpper: ""
      };
      this.$post("/management_point/merchantAuth/authAudit", rejectInfo)
        .then(data => {
          if (Number(data.code) === 100) {
            this.$common.success("拒绝成功");
          } else {
            this.$common.error("拒绝失败");
          }
          this.getqueryApplyCertifyList();
          this.dialogFormVisible = false;
        });
    },
    changeTime(val) {
      if (val) {
        this.params.startAuthDate = `${this.$common.timeStamp(
          +new Date(val[0]),
          1
        )}`;
        this.params.endAuthDate = `${this.$common.timeStamp(
          +new Date(val[1]),
          1
        )}`;
      } else {
        this.params.startAuthDate = "";
        this.params.endAuthDate = "";
      }
    },
    // 获取列表
    getqueryApplyCertifyList() {
      var _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.params.merchantName) {
        _param.merchantName = this.params.merchantName;
      }
      if (this.params.auditStatus) {
        _param.auditStatus = this.params.auditStatus;
      }
      if (this.params.payType) {
        _param.payType = this.params.payType;
      }
      if (this.value3) {
        _param.startTime = this.value3[0];
        _param.endTime = this.value3[1];
      }
      this.$post("/management_point/merchantAuth/queryAuthList", _param)
        .then(res => {
          // console.log("res.data", res.data.data.pageInfo);
          if (Number(res.code) === 100) {
            var _data = res.data.pageInfo.list;
            // _data.forEach(item => {
            //   item.create_time = this.$common.timeStamp(item.create_time, 1)
            // })
            this.pageInfo = res.data.pageInfo;
            this.tableData = _data;
          }
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getqueryApplyCertifyList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getqueryApplyCertifyList();
      // console.log(`当前页: ${val}`);
    },
    handleClick(a) {
      console.log(a);
    },
    change(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色
.title {
  margin-top: 12px;
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
  // min-width: 1250px;
  // overflow: hidden;
  .el-input {
    height: 44px;
  }
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
  // .el-form-item__content {
  //   flex: 1;
  // }
}
</style>
