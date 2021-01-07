<template>
  <div class="certificationlist">
    <page-cotent name="商家认证记录">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <el-input style="flex: 1" v-model="params.merchantName" placeholder="商家名称"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <el-select v-model="params.auditStatus" style="flex: 1" placeholder="审核类型" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <el-select v-model="params.payType" style="flex: 1" placeholder="充值方式" clearable>
                <el-option
                  v-for="item in payList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">充值日期：</div>
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
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="initList">搜索</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
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
                <el-table-column label="审核状态">
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
                      <el-button  style="font-size: 12px" type="text" slot="reference">查看凭证</el-button>
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
          </el-col>
        </el-row>

        <el-row v-if="total > 0">
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
                :total="total"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>


      <!-- 认证拒绝弹窗 -->
      <el-dialog :visible.sync="refuseDiaolog">
        <div slot="title" style="font-size: 16px">拒绝认证</div>
        <div class="refuseDiaolog-con">
          <div class="item">
            <div class="item-title">拒绝原因</div>
            <div style="margin-top: 10px">
              <el-input v-model="auditRemark" type="textarea" :rows="4" style="width:95%" resize="none"></el-input>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="refuse">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="refuseDiaolog = false">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>

      <!-- 认证通过弹窗 -->
      <el-dialog :visible.sync="passDiaolog">
        <div slot="title" style="font-size: 16px">认证通过</div>
        <div class="passDiaolog-con">
          <div class="item">
            <div class="item-title">设置默认纸质追溯额</div>
            <div style="margin-top: 10px">
              <el-input v-model="paperLabelUpper"></el-input>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="through">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="passDiaolog = false">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>
    </page-cotent>
  </div>
</template>

<script>
import pageCotent from '../../../components/content.vue'
export default {
  components: {
    pageCotent
  },
  data() {
    return {
      params: {
        merchantName: '',
        auditStatus: '',
        payType: '',
        time: []
      },
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
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      refuseDiaolog: false, // 拒绝弹窗的状态
      auditRemark: '', // 拒绝原因
      passDiaolog: false,
      paperLabelUpper: '',
      rowInfo: {}
    }
  },
  created() {
    this.getQueryApplyCertifyList()
  },
  methods: {
    // 获取认证记录列表
    getQueryApplyCertifyList() {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }

      if (this.params.merchantName) {
        _params.merchantName = this.params.merchantName
      }
      if (this.params.auditStatus) {
        _params.auditStatus = this.params.auditStatus
      }
      if (this.params.payType) {
        _params.payType = this.params.payType
      }
      if (this.params.time) {
        _params.startTime = this.params.time[0]
        _params.endTime = this.params.time[1]
      }

      this.$post('/management_point/merchantAuth/queryAuthList', _params).then(res => {
        this.tableData = res.data.pageInfo.list || []
        this.total = res.data.pageInfo.total || 0
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getQueryApplyCertifyList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getQueryApplyCertifyList()
    },
    initList() {
      this.pageNum = 1
      this.pageSize = 10
      this.getQueryApplyCertifyList()
    },
    // 列表 拒绝或通过按钮
    confirmPass(row, type) {
      this.rowInfo = row;
      if (type === "reject") {
        this.refuseDiaolog = true;
      } else {
        this.passDiaolog = true;
      }
    },
    // 认证 拒绝
    refuse() {
      let _params = {
        merchantAuthId: this.rowInfo.merchant_auth_id,
        auditStatus: 3,
        auditRemark: this.auditRemark
      }

      this.$post('/management_point/merchantAuth/authAudit', _params).then(res => {
        if (res.code === 100) {
          this.$message.success('拒绝成功')
          this.refuseDiaolog = false
          this.auditRemark = ''
          this.getQueryApplyCertifyList()
        } else {
          this.$message.error('拒绝失败')
        }
      })
    },
    // 认证通过
    through() {
      let _params = {
        merchantAuthId: this.rowInfo.merchant_auth_id,
        auditStatus: 2,
        merchantType: this.rowInfo.merchant_type
      }

      if (this.rowInfo.merchant_type !== 3) {
        _params.paperLabelUpper = this.paperLabelUpper
      }

      if (this.rowInfo.merchant_type !== 3 && !this.paperLabelUpper.replace(/\s+/g, '')) {
        this.$common.error('请输入默认纸质追溯额')
        return false
      }

      this.$post('/management_point/merchantAuth/authAudit', _params).then(res => {
        if (res.code === 100) {
          this.$message.success('认证通过成功')
          this.passDiaolog = false
          this.paperLabelUpper = ''
          this.getQueryApplyCertifyList()
        } else {
          this.$message.error('认证通过失败')
        }
      })
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
  .certificationlist {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

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
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>