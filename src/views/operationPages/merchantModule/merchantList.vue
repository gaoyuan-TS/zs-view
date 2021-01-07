<template>
  <div class="merchantlist">
    <page-content :name="$t('Merchant.merchantList.merchantListTitle')">
      <div class="content">
        <!-- 搜索类目 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="7" style="margin-right:50px">
            <!-- 商家名称 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Merchant.merchantList.merchantName')}}：</div> -->
              <el-input style="flex: 1" :placeholder="$t('Merchant.merchantList.merchantName')" v-model="listParam.merchantName" clearable></el-input>
            </div> 
          </el-col>
          <el-col :span="7" style="margin-right:50px">
            <!-- 商家账号 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Merchant.merchantList.merchantAccount')}}：</div> -->
              <el-input :placeholder="$t('Merchant.merchantList.merchantAccount')" v-model="listParam.merchantAccount" clearable style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <!-- 商家类型 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Merchant.merchantList.merchantType')}}：</div> -->
              <el-select v-model="listParam.merchantType" style="flex: 1" :placeholder="$t('Merchant.merchantList.merchantType')" clearable>
                <el-option
                  v-for="item in merchantTypes"
                  :key="item.merchantTypeId"
                  :label="item.merchantType"
                  :value="item.merchantTypeId"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <!-- 认证状态 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Merchant.merchantList.certificationStatus')}}：</div> -->
              <el-select v-model="listParam.check" style="flex: 1" :placeholder="$t('Merchant.merchantList.certificationStatus')" clearable>
                <el-option
                  v-for="item in checkList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">{{$t('Merchant.merchantList.creationDate')}}：</div>
              <el-date-picker style="flex: 1" type="datetimerange" v-model="dateTime"
                :range-separator="$t('common.to')" :start-placeholder="$t('common.startDate')" value-format="yyyy-MM-dd HH:mm:ss"
                :end-placeholder="$t('common.endDate')"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="initSellerList">搜索</el-button>
              <el-button type="primary" @click="toAdminsellerNew" v-if="buttonType">{{$t('button.new')}}</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500">
                <!-- 商家名称 -->
                <el-table-column prop="merchantName" :label="$t('Merchant.merchantList.merchantName')"></el-table-column>
                <!-- 商家账号 -->
                <el-table-column prop="merchantAccount" :label="$t('Merchant.merchantList.merchantAccount')"></el-table-column>
                <!-- 商家类型 -->
                <el-table-column prop="merchantType" :label="$t('Merchant.merchantList.merchantType')" width="120"></el-table-column>
                <!-- <el-table-column prop="date" label="招商人员" width="160"></el-table-column> -->
                <!-- 创建日期 -->
                <el-table-column prop="merchantEnterTime" :label="$t('Merchant.merchantList.creationDate')"></el-table-column>
                <!-- 状态 -->
                <el-table-column prop="date" :label="$t('Merchant.merchantList.state')" width="100">
                  <template slot-scope="scope">
                    <span :class=" Number(scope.row.merchantStatus)===1 ? 'circle-red' : 'circle-green'"></span>
                    <span>{{Number(scope.row.merchantStatus)===1 ? $t('button.prohibition') : $t('button.normality')}}</span>
                  </template>
                </el-table-column>
                <!-- 认证状态 -->
                <el-table-column prop="Status" :label="$t('Merchant.merchantList.certificationStatus')" v-if="attestation" width="100">
                  <template slot-scope="scope">
                  <span>{{scope.row.auditStatus}}</span>
                  </template>
                </el-table-column>
                <!-- 备注 -->
                <el-table-column prop="remark" :label="$t('Merchant.merchantList.remark')" v-if="attestation">
                  <template slot-scope="scope">
                    <span :title="scope.row.auditRemark?scope.row.auditRemark:$t('Merchant.merchantList.noRemark')">{{scope.row.auditRemark || $t('Merchant.merchantList.noRemark')}}</span>
                  </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column :label="$t('common.Operation')" width="160">
                  <template slot-scope="scope">
                    <div style="text-align:left">
                      <!-- 禁止 / 开通 -->
                      <span class="option-item" @click="handerPass(scope.row)">
                        {{Number(scope.row.merchantStatus)===0 ? $t('button.forbid') : $t('button.openUp')}}
                      </span>
                      <!-- 详情 -->
                      <span class="option-item" @click="rowClick(scope.row)">{{$t('button.details')}}</span>
                      <!-- 新建商品 -->
                      <span class="option-item" @click="toAdminGoodNew(scope.row.merchantName)" 
                      v-if="scope.row.merchantType != '农贸市场' && buttonType">{{$t('button.newGoods')}}</span>
                      <!-- 编辑摊位 -->
                      <span class="option-item" v-if="scope.row.merchantType === '农贸市场'" @click="toStall(1, scope.row)">{{$t('button.editBooth')}}</span>
                      <!-- 编辑摊主 -->
                      <span class="option-item" v-if="scope.row.merchantType === '农贸市场'" @click="toStall(2, scope.row)">{{$t('button.EditVendor')}}</span>
                      <!-- 新建追溯 -->
                      <span class="option-item" v-if="scope.row.merchantType != '农贸市场'" @click="zsDiao(scope.row.merchantId)">{{$t('button.newTrace')}}</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <el-row v-if="total > 0">
          <el-col>
            <div class="page">
              <el-pagination
                @current-change="currentChange"
                @size-change="sizeChange"
                v-if="tableData.length>0"
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

      <!-- 新建追溯 -->
      <el-dialog  :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false">
        <!-- 新建追溯 -->
        <div class="head">{{$t('Merchant.merchantList.newTraceTltle')}}</div>
        <div class="retrospect">
          <div class="item" style="margin-bottom:40px">
            <!-- 申请数量 -->
            <div class="item-title">{{$t('Merchant.merchantList.applicationNum')}}</div>
            <div style="padding-left: 15px">
              <el-input :placeholder="$t('Merchant.merchantList.applicationNum')" v-model="insertInfo.traceApplyCount"></el-input>
            </div>
          </div>
          <div class="item">
            <!-- 标签类型 -->
            <div class="item-title">{{$t('Merchant.merchantList.tagType')}}</div>
            <div class="item-radio">
              <el-radio-group v-model="insertInfo.traceApplyType">
                <el-radio :label="2" style="margin-right:60px">{{$t('Merchant.merchantList.electronicLabel')}}</el-radio>
                <el-radio :label="1">{{$t('Merchant.merchantList.paperLabel')}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer btn-wrap" style="text-align:center">
          <el-button type="primary" @click="confirm" style="margin-right:50px">{{$t('button.Comfirm')}}</el-button>
          <el-button @click="dialogFormVisible = false" style="background:#EF4235;color:#fff">{{$t('button.cancel')}}</el-button>
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
      tableData: [],  // 表格数据
      merchantTypes: [],  // 商家类型
      checkList: [  // 认证状态
        {value: '0', label: this.$t('Merchant.merchantList.notApply')},  // 未申请
        {value: '1', label: this.$t('Merchant.merchantList.waitConfirm')},  // 待审核
        {value: '2', label: this.$t('Merchant.merchantList.authenticated')},  // 已认证
        {value: '3', label: this.$t('Merchant.merchantList.fail')},  // 未通过
        {value: '-1', label: this.$t('Merchant.merchantList.whole')}    // 全部
      ],
      listParam: {
        merchantName: null,
        merchantAccount: null,
        merchantType: null,
        check: null,
        creatStartTime: null,
        creatEndTime: null
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      timer: null,
      dateTime: '',  // 绑定的创建时间 
      dialogFormVisible: false,
      attestation: true,
      buttonType: false, // 是否为运营权限的
      insertInfo: {  // 新建追溯参数
        traceApplyCount: '',  // 追溯申请数量
        traceApplyType: 2, // 追溯申请类型
        traceBusinessId: ''  // 商家id
      },
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      if (roleJson.role.roleName === 'ROLE_HEADQUARTERS_ADMIN' || roleJson.role.roleName === 'ROLE_HEADQUARTERS_OPERATE') {
        this.attestation = true
      } else {
        this.attestation = false
      }
      if (roleJson.role.roleName === 'ROLE_HEADQUARTERS_OPERATE' || roleJson.role.roleName === 'ROLE_FRANCHISEE_OPERATE') {
        this.buttonType = true
      } else {
        this.buttonType = false
      }
    }
    this.getMerchantType()
    this.getSellerList()
  },
  methods: {
    // 获取商家类型
    getMerchantType () {
      this.$get('/back-end/merchantType/get', {
        type: null
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.merchantTypes = res.data
        }
      })
    },
    // 获取商家列表
    getSellerList () {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.listParam.merchantName) {
        _params.merchantName = this.listParam.merchantName
      }
      if (this.listParam.merchantAccount) {
        _params.merchantAccount = this.listParam.merchantAccount
      }
      if (this.listParam.merchantType) {
        _params.merchantType = this.listParam.merchantType
      }
      if (this.listParam.creatStartTime && this.listParam.creatEndTime) {
        _params.creatStartTime = this.listParam.creatStartTime
        _params.creatEndTime = this.listParam.creatEndTime
      }
      if (this.listParam.check) {
        _params.check = this.listParam.check
      }
      this.$post('/back-end/merchant/getList', _params).then(data => {
        if(data.code === 200) {
          this.total = data.data.total || 0
          this.tableData = data.data.list || []
        }
      })
    },
    initSellerList() {
      this.pageNum = 1
      this.pageSize = 10
      this.getSellerList()
    },

    // 监听输入事件
    handleInput() {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.initSellerList()
      },300)
    },

    // 选择时间
    changeTime(val) {
      console.log(1)
      console.log(val)
       if (val) {
        this.listParam.creatStartTime = (new Date(val[0]) / 1000)
        this.listParam.creatEndTime = (new Date(val[1]) / 1000)
      } else {
        this.listParam.creatStartTime = null
        this.listParam.creatEndTime = null
      }
      this.initSellerList()
    },

    // 点击 禁止 - 开通
    handerPass (row) {
      this.$confirm(this.$t('Merchant.merchantList.changeStatusTips'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.Comfirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        this.$get('/back-end/merchant/switch', {merchantId: row.merchantId}).then(res => {
          if (res.code === 200) {
            this.$common.success(this.$t('common.operateSuccessfully'))
            this.getSellerList()
          }
        })
      }).catch(() => {
        console.log('点击了取消')
      })
    },

    // 改变当前页
    currentChange(val) {
      this.listParam.pageNum = val
      this.getSellerList()
    },

    // 改变页容量
    sizeChange(val) {
      this.listParam.pageSize = val
      this.initSellerList()
    },
    
    // 跳转到详情页面
    rowClick (val) {
      // this.paramsDataStorage()
      this.$router.push('/manage/merchantDetail/' + val.merchantId)
    },

    // 跳转到新建商家页面
    toAdminsellerNew () {
      // this.paramsDataStorage()
      this.$router.push('/manage/merchantNew')
    },

    // 跳转到新建商品页面
    toAdminGoodNew (merchantName) {
      // this.paramsDataStorage()
      // this.$router.push('/index/admingoodNew?mName=' + merchantName)
    },

    // 跳转到摊主或摊位列表
    toStall (type, row) {
      // this.paramsDataStorage()
      if (type === 1) {
        this.$router.push({
          path: '/manage/boothList',
          query: {
            mid: row.merchantId,
            mName: row.merchantName
          }
        })
      } else {
        this.$router.push({
          path: '/manage/stallholderList',
          query: {
            mid: row.merchantId,
            mName: row.merchantName
          }
        })
      }
    },

    // 新建追溯按钮
    zsDiao (bid) {
      this.dialogFormVisible = true
      this.insertInfo.traceBusinessId = bid
      this.insertInfo.traceApplyCount = ''
      this.insertInfo.traceApplyType = 2
    },

    // 新建追溯确定
    confirm () {
      this.insertInfo.traceApplyCount = Number(this.insertInfo.traceApplyCount)
      this.$post('/trace-api/trace/insert', this.insertInfo).then(data => {
        console.log(data)
        if (Number(data.code) === 200) {
          this.$common.success(data.message)
        } else {
          this.$common.error(data.message)
        }
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="less" scope>
  .merchantlist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .option-item {
        font-size: 13px;
        color: #2196F3;
        text-decoration: underline;
        padding-right: 10px;
        &:hover {
          cursor: pointer;
        }
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

    .head {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #333333;
      margin: -30px 0 34px;
    }

    .retrospect {
      // display: flex;
      .el-input input{border:none;border-radius: 0;padding: 0;}
      /deep/.el-input__inner{ 
        border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
      }
      .item {
        margin-top: 12px;
        .item-title {
          padding: 0 15px;
          margin-bottom: 5px;
          color: rgba(128, 128, 128, 1);
          font-size: 14px;
        }
        .item-radio {
          margin-left: 15px;
          margin-top: 26px;
        }
      }
    }
  }
</style>