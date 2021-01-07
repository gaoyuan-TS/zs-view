<template>
  <div class="retrospectlist">
    <page-content :name="$t('Trace.traceList.traceListTitle')">
      <div class="content">
        <!-- 搜索类目 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <!-- 追溯批次码 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Trace.traceList.traceCodeBatch')}}：</div> -->
              <el-input v-model="paramData.traceCodeNumber" clearable :placeholder="$t('Trace.traceList.traceCodeBatch')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <!-- 商家名称 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Trace.traceList.merchantName')}}：</div> -->
              <el-input v-model="paramData.merchantName" clearable :placeholder="$t('Trace.traceList.merchantName')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <!-- 公司名称 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Trace.traceList.companyName')}}：</div> -->
              <el-input v-model="paramData.traceCompanyName" clearable :placeholder="$t('Trace.traceList.companyName')" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <!-- 处理状态 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Trace.traceList.proState')}}：</div> -->
              <el-select v-model="paramData.traceHandleStatus" clearable style="flex: 1" :placeholder="$t('Trace.traceList.proState')">
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <!-- 申请类型 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Trace.traceList.applicationType')}}：</div> -->
              <el-select v-model="paramData.traceApplyType" clearable style="flex: 1" :placeholder="$t('Trace.traceList.applicationType')">
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
              <!-- <div class="input-title">{{$t('Trace.traceList.dateOfApp')}}：</div> -->
              <el-date-picker
                v-model="dateTime"
                style="flex: 1"
                type="datetimerange"
                :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startDate')"
                :end-placeholder="$t('common.endDate')"
                @change="changeTIme">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" style="margin-top:10px">
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="initChaseList">搜索</el-button>
              <el-button type="primary" @click="openDialogForm(false)">{{$t('button.new')}}</el-button>
            </div>
          </el-col>
         
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height='500'>
                <!-- 申请日期 -->
                <el-table-column :label="$t('Trace.traceList.dateOfApp')">
                  <template slot-scope="scope">
                    <span>{{scope.row.traceApplyDate || "---"}}</span>
                  </template>
                </el-table-column>
                <!-- 申请数量 -->
                <el-table-column prop="traceApplyCount" :label="$t('Trace.traceList.applicationNum')"></el-table-column>
                <!-- 申请类型 -->
                <el-table-column prop="traceApplyType" :label="$t('Trace.traceList.applicationType')">
                  <template slot-scope="scope">
                    <span>{{ Number(scope.row.traceApplyType)===1? $t('Trace.traceList.paperLabel'):$t('Trace.traceList.electronicLabel') }}</span>
                  </template>
                </el-table-column>
                <!-- 公司名称 -->
                <el-table-column prop="companyName" :label="$t('Trace.traceList.companyName')" v-if="roleType"></el-table-column>
                <!-- 追溯码批次 -->
                <el-table-column :label="$t('Trace.traceList.traceCodeBatch')">
                  <template slot-scope="scope">
                    <span>{{scope.row.traceCodeNumber || '----'}}</span>
                  </template>
                </el-table-column>
                <!-- 商家名称 -->
                <el-table-column prop="merchant.merchantName" :label="$t('Trace.traceList.merchantName')"></el-table-column>
                <!-- 审批日期 -->
                <el-table-column :label="$t('Trace.traceList.approvalDate')">
                  <template slot-scope="scope">
                    <span>{{scope.row.traceReviewDate || "---"}}</span>
                  </template>
                </el-table-column>
                <!--  处理状态 -->
                <el-table-column :label="$t('Trace.traceList.proState')" width="100">
                  <template slot-scope="scope">
                    <span
                      class="circle-red"
                      v-if="Number(scope.row.traceHandleStatus)===2||Number(scope.row.traceHandleStatus)===3 || Number(scope.row.traceHandleStatus)===4"
                    ></span>
                    <span class="circle-green" v-if="Number(scope.row.traceHandleStatus)===1"></span>
                    <!-- 已通过 -->
                    <span v-if="scope.row.traceHandleStatus === 1">{{$t('Trace.traceList.havePassed')}}</span>
                    <!-- 待审核 -->
                    <span v-if="scope.row.traceHandleStatus === 2">{{$t('Trace.traceList.toBeauited')}}</span>
                    <!-- 已撤回 -->
                    <span v-if="scope.row.traceHandleStatus === 3">{{$t('Trace.traceList.haveWithdrawn')}}</span>
                    <!-- 已拒绝 -->
                    <span v-if="scope.row.traceHandleStatus === 4">{{$t('Trace.traceList.haveRejected')}}</span>
                    <!-- <span>{{ Number(scope.row.traceHandleStatus)===1? "已通过": Number(scope.row.traceHandleStatus)===2?"待审核":"已撤回" }}</span> -->
                  </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column prop="handle" :label="$t('common.Operation')" width="130">
                  <template slot-scope="scope">
                    <!-- 编辑 -->
                    <el-button @click="openDialogForm(scope.row)" v-if="Number(scope.row.traceHandleStatus) === 2"
                      type="text" size="small">{{$t('button.edit')}}</el-button>
                      <!-- 导出 -->
                    <el-button @click="handleExport(scope.row)" v-if="Number(scope.row.traceHandleStatus) === 1 && Number(scope.row.traceApplyType) === 2"
                      type="text" size="small" >{{$t('button.export')}}</el-button>
                    <!-- 记录 -->
                    <el-button v-if="Number(scope.row.traceHandleStatus) === 1 && Number(scope.row.merchant.merchantType !== 3)"
                      @click="goChaseRecordTrade(scope.row.traceId)" type="text" size="small">{{$t('button.Record')}}</el-button>
                    <!-- 录入 -->
                    <el-button v-if="Number(scope.row.traceHandleStatus)===1 && Number(scope.row.merchant.merchantType !== 3)"
                      @click="toAdminChaseEntering(scope.row.traceId, scope.row.merchant)" type="text" size="small">
                      {{$t('button.Entry')}}
                    </el-button>
                    <!-- 通过 -->
                    <el-button type="text" size="small" @click="onpenAdoptDialog(scope.row)"
                      v-if="Number(scope.row.traceHandleStatus) === 2 && roleType"
                    >{{$t('button.passed')}}</el-button>
                    <!-- 拒绝 -->
                    <el-button
                      v-if="Number(scope.row.traceHandleStatus) === 2 && roleType"
                      type="text" size="small" @click="openRejectDialog(scope.row)">{{$t('button.reject')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <el-row>
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

         <!-- 新建/编辑追溯 -->
        <el-dialog  :visible.sync="dialogForm" :show-close="false" :close-on-click-modal="false">
          <div class="head">{{dialogFormTitle}}<small v-if="dialogFormTitle===$t('Trace.traceList.editTraceTltle')" style="color:#EF4235">（{{$t('Trace.traceList.freePapelLbelCount')}}： {{paperLabelUpper}}）</small></div>
          <div class="retrospect">
            <div class="item" style="margin-bottom:40px">
              <!-- 申请数量 -->
              <div class="item-title">{{$t('Trace.traceList.applicationNum')}}</div>
              <div style="padding-left: 15px">
                <el-input v-model="insertInfo.traceApplyCount" :placeholder="$t('Trace.traceList.applicationNum')" style="width:95%"></el-input>
              </div>
            </div>
            <!-- 公司名称 -->
            <div class="item" style="margin-bottom:40px" v-if="roleType">
              <div class="item-title">{{$t('Trace.traceList.companyName')}}</div>
              <div style="padding-left: 15px">
                <el-select v-model="companyId" style="width:95%" clearable :placeholder="$t('common.pleaseSelect')" 
                @change="changeCompany" :disabled="dialogFormTitle === $t('Trace.traceList.editTraceTltle')">
                  <el-option v-for="item in optionsCompany" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="item" style="margin-bottom:40px">
              <!-- 商家名称 -->
              <div class="item-title">{{$t('Trace.traceList.merchantName')}}</div>
              <div style="padding-left: 15px">
                <el-select v-model="insertInfo.traceBusinessId" filterable clearable remote style="width:95%"
                  reserve-keyword :placeholder="$t('Trace.traceList.merchantName')" :loading="isLoading"
                  :remote-method="getMerchantList" :disabled="dialogFormTitle === $t('Trace.traceList.editTraceTltle')">
                  <el-option v-for="item in merchantList" :key="item.id"
                    :label="item.name" :value="item.id"> </el-option>
                </el-select>
              </div>
            </div>
            <div class="item">
              <!-- 标签类型 -->
              <div class="item-title">{{$t('Trace.traceList.tagType')}}</div>
              <div class="item-radio">
                <el-radio-group v-model="insertInfo.traceApplyType">
                  <!-- 电子标签 -->
                  <el-radio :label="2" style="margin-right:60px">{{$t('Trace.traceList.electronicLabel')}}</el-radio>
                  <!-- 纸质标签 -->
                  <el-radio :label="1">{{$t('Trace.traceList.paperLabel')}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer btn-wrap" style="text-align:center">
            <el-button type="primary" @click="confirm" style="margin-right:50px">{{$t('button.Comfirm')}}</el-button>
            <el-button @click="dialogForm = false" style="background:#EF4235;color:#fff">{{$t('button.cancel')}}</el-button>
          </div>
        </el-dialog>

         <!-- 通过 -->
        <!-- <el-dialog  :visible.sync="adoptDialog" :show-close="false" :close-on-click-modal="false" width="35%">
          <div class="head">{{$t('Trace.traceList.retroactiveApplication')}}</div>
          <div class="retrospect">
            <div class="item" style="margin-bottom:40px">
      
              <div class="item-title">{{$t('Trace.traceList.searchTraCode')}}</div>
              <div style="padding-left: 15px">
                <el-input v-model="sid" style="width:95%" @input="changeCoverageArea"></el-input>
              </div>
            </div>
            <div class="item" style="margin-bottom:40px" v-if="roleType">
              <div class="item-title">{{$t('Trace.traceList.coveredCodeSegment')}}</div>
              <div class="range-data" style="padding-left: 15px">
                <div v-if="rangData.length > 0">
                  <div v-for="(item, ridx) in rangData" :key="ridx">
                    {{item.traceNumStart}} -- {{item.traceNumEnd}} ({{item.traceCount}}个)
                  </div>
                </div>
                <div v-else>{{rangEmpty}}</div> 
              </div>
            </div>
          </div>
          <div class="dialog-footer btn-wrap" style="text-align:center">
            <el-button :disabled="rowData.traceApplyType === 1 ? rangData.length === 0 : false" type="primary" @click="handleClickPass" style="margin-right:50px">{{$t('button.Comfirm')}}</el-button>
            <el-button @click="adoptDialog = false" style="background:#EF4235;color:#fff">{{$t('button.cancel')}}</el-button>
          </div>
        </el-dialog> -->

        <!-- 通过申请 弹窗 -->
        <el-dialog :visible.sync="adoptDialog" width="35%" :show-close="false" :close-on-click-modal="false">
          <div class="dialog-main">
            <div class="head">通过申请<small style="color:#EF4235">（{{$t('Trace.traceList.freePapelLbelCount')}}： {{paperLabelUpper}}）</small></div>
            <div class="add-content" style="margin-top:40px" v-if="rowData.traceApplyType === 1">
              <div class="content-item" v-for="(item,index) in adoptDialogParams" :key="index">
                <el-input v-model="item.startSid" @input="changeCoverageArea(index)" placeholder="输入起始码段sid" style="margin-bottom:40px;width:90%"></el-input>
                <el-input v-model="item.endSid" @input="changeCoverageArea(index)" placeholder="输入结束码段sid" style="width:90%"></el-input>
                <div style="font-size:14px;color:#333;margin-top:25px;letter-spacing:1px">实际码数：{{item.count ? item.count : '暂无'}}</div>
                <i class="el-icon-circle-plus operate-icon" v-if="index === adoptDialogParams.length-1" @click="handleAdd"></i>
                <i class="el-icon-remove operate-icon" style="color:#EF4235" v-else @click="handleRemove(index)"></i>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer btn-wrap" style="display:flex;justify-content:center;margin-top:40px">
            <el-button type="primary" @click="handleClickPass" style="margin-right:50px">确 定</el-button>
            <el-button @click="adoptDialog = false" style="background:#EF4235;color:#fff">取 消</el-button>
          </div>
        </el-dialog>

        <!-- 拒绝 -->
        <el-dialog  :visible.sync="rejectDialog" :show-close="false" :close-on-click-modal="false" width="35%">
          <!-- 拒绝申请 -->
          <div class="head">{{$t('Trace.traceList.rejectApplication')}}</div>
          <div class="retrospect">
            <div class="item" style="margin-bottom:40px">
              <!-- 拒绝原因 -->
              <div class="item-title">{{$t('Trace.traceList.refusalCause')}}</div>
              <div style="padding-left: 15px">
                <el-input v-model="remark" type="textarea" :rows="4" style="width:95%" resize="none"></el-input>
              </div>
            </div>
          </div>
          <div class="dialog-footer btn-wrap" style="text-align:center">
            <el-button type="primary" @click="refuse" style="margin-right:50px">{{$t('button.Comfirm')}}</el-button>
            <el-button @click="rejectDialog = false" style="background:#EF4235;color:#fff">{{$t('button.cancel')}}</el-button>
          </div>
        </el-dialog>
      </div>
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
      roleName: '', // 权限
       // 传参数
      paramData: {
        traceCodeNumber: '',
        traceCompanyName: '',
        traceApplyType: '',
        traceApplyStartDate: '',
        traceApplyEndDate: '',
        traceHandleStatus: '',
        merchantName: '',
        orderBy: ''
      },
      dateTime: '',
      tableData: [],  // 表格数据
      pageNum: 1,
      pageSize: 10,
      total: 0,
      optionsStatus: [  // 处理的状态
        {label: this.$t('Trace.traceList.havePassed'),value: '1'},  // 已通过
        {label: this.$t('Trace.traceList.toBeauited'),value: '2'},  // 待审核
        {label: this.$t('Trace.traceList.haveWithdrawn'),value: '3'},  // 已撤回
        {label: this.$t('Trace.traceList.haveRejected'),value: '4'}  // 已拒绝
      ],
      options: [  // 申请类型
        {label: this.$t('Trace.traceList.paperLabel'),value: 1},  // 纸质标签
        {label: this.$t('Trace.traceList.electronicLabel'),value: 2}   // 电子标签
      ],
      roleType: false,
      dialogForm: false, // 控制弹窗显示
      dialogFormTitle: this.$t('Trace.traceList.newTraceTltle'),   // 新建追溯
      papershow: true,
      timer: null,
      insertInfo: {
        traceApplyCount: '',
        traceApplyType: '',
        traceBusinessId: ''
      },
      companyId: 0, // 选中的加盟商的id
      optionsCompany: [],  // 公司名称
      merchantList: [], // 商家列表
      paperLabelUpper: '', // 免费纸制标签的数量
      isLoading: false,
      adoptDialog: false,  // 控制通过弹窗
      rangData: '', // 覆盖码段
      rangEmpty: '',
      sid: '',
      rowData: '',
      rejectDialog: false,  // 控制拒绝窗口弹出
      remark: '',  // 拒绝原因内容
      adoptDialog: false,  // 控制通过弹窗显现
      adoptDialogParams: [ // 通过弹窗参数
        {
          startSid: "",  // 起始码段sid
          endSid: "",  //  结束码段sid
          count: ''
        }
      ],
      getCodePartParm: {
        id: '',
        startSid: '',
        endSid: ''
      }
    }
  },
  created() {
    this.roleName = this.$localStore.get('roleJson').role.roleName
    if (this.roleName === 'ROLE_HEADQUARTERS_ADMIN' || this.roleName === 'ROLE_HEADQUARTERS_OPERATE' || this.roleName === 'ROLE_HEADQUARTERS_CODE') {
      this.getCommpany()
      this.roleType = true
    }
    if (this.roleName === 'ROLE_FRANCHISEE_ADMIN' || this.roleName === 'ROLE_FRANCHISEE_OPERATE') {
      this.papershow = false
    }
    this.getChaseList()
  },
  watch: {
     /*公司名称变了，商家也会随着变*/
    // companyId (newValue, oldValue) {
    //   this.merchantList = []
    //   this.insertInfo.traceBusinessId = ''
    // },
  },
  methods: {
    // 获取追溯列表
    getChaseList () {
      var _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderBy: 'trace_apply_date desc'
      }
      if (this.paramData.traceCodeNumber) {
        _param.traceCodeNumber = this.paramData.traceCodeNumber
      }
      if (this.paramData.traceCompanyName) {
        _param.traceCompanyName = this.paramData.traceCompanyName
      }
      if (this.paramData.traceApplyStartDate) {
        _param.traceApplyStartDate = this.paramData.traceApplyStartDate
      }
      if (this.paramData.traceApplyEndDate) {
        _param.traceApplyEndDate = this.paramData.traceApplyEndDate
      }
      if (this.paramData.traceHandleStatus) {
        _param.traceHandleStatus = this.paramData.traceHandleStatus
      }
      if (this.paramData.merchantName) {
        _param.merchantName = this.paramData.merchantName
      }
      if (this.paramData.traceApplyType) {
        _param.traceApplyType = this.paramData.traceApplyType
      }
      this.$get('/trace-api/trace/getByPage', _param).then(res => {
        if (res.code === 200) {
          var _data = res.data.list

          _data.forEach(item => {
            item.traceApplyDate = this.$common.timeStamp(item.traceApplyDate, 1)
            if (item.traceReviewDate) {
              item.traceReviewDate = this.$common.timeStamp(item.traceReviewDate, 1)
            }
          })
          this.tableData = _data
          this.total = res.data.total
        }
      })
    },

    // 初始化
    initChaseList() {
      this.pageNum = 1
      this.pageSize = 10
      this.getChaseList()
    },

    // 监听输入事件
    handleInput() {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.initChaseList()
      },300)
    },

    // 选择时间
    changeTIme (val) {
      if (val) {
        this.paramData.traceApplyStartDate = (new Date(val[0])).valueOf()
        this.paramData.traceApplyEndDate = (new Date(val[1])).valueOf()
      } else {
        this.paramData.traceApplyStartDate = ''
        this.paramData.traceApplyEndDate = ''
      }
      console.log(this.paramData)
      this.initChaseList()
    },

    // 点击新建弹出窗口
    openDialogForm(row) {
      if(!row) { // 则是新建
        this.dialogFormTitle = this.$t('Trace.traceList.newTraceTltle')
        for(let key in this.insertInfo) {
          this.insertInfo[key] = ''
        }
        this.companyId = ''
        this.insertInfo.traceApplyType = 2
      }else {  //则是编辑
        console.log(row)
        this.paperLabelUpper = row.merchant.paperLabelUpper
        this.insertInfo.traceId = row.traceId
        this.insertInfo.traceApplyCount = row.traceApplyCount
        this.insertInfo.traceBusinessId = row.merchant.merchantId
        this.insertInfo.traceApplyType = row.traceApplyType
        this.optionsCompany.forEach(item => {
          if (item.name === row.companyName) {
            this.companyId = item.id
          }
        })
        this.dialogFormTitle = this.$t('Trace.traceList.editTraceTltle')
        this.getUpMerchantList(row.merchant.merchantName)
      }
      this.dialogForm = true
    },

    // 获取商家列表
    getMerchantList (query) {
      if (query !== '') {
        var _param = {
          allianceBusinessId: '',
          merchantName: query
        }
        // 如果登录的账号角色为加盟商管理员、加盟商运营需要加盟商id
        if (this.roleName === 'ROLE_FRANCHISEE_ADMIN' || this.roleName === 'ROLE_FRANCHISEE_OPERATE') {
          _param.allianceBusinessId = this.$localStore.get('roleJson').allianceBusiness.allianceBusinessId
        } else {
          _param.allianceBusinessId = this.companyId
        }
        this.isLoading = true
        this.$get('/back-end/merchant/getAll', _param).then(res => {
          if (res.code === 200) {
            this.merchantList = res.data
            this.isLoading = false
          } else {
            this.merchantList = []
            this.isLoading = false
          }
        }).catch(err => {
          this.isLoading = false
        })
      } else {
        this.merchantList = []
      }
    },

    // 获取加盟商列表
    getCommpany () {
      this.optionsCompany = []
      this.$get('/back-end/allianceBusiness/getAll').then(data => {
        this.optionsCompany = data.data
        this.optionsCompany.unshift({ name: this.$t('Trace.traceList.headquarters'), id: 0})
      })
    },

    getUpMerchantList (query) {
      if (query !== '') {
        var _param = {
          allianceBusinessId: this.companyId,
          merchantName: query
        }
        this.$get('/back-end/merchant/getAll', _param).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.merchantList = res.data
          } else {
            this.merchantList = []
          }
        })
      } else {
        this.merchantList = []
      }
    },

    // 改变公司
    changeCompany() {
      this.merchantList = []
      this.insertInfo.traceBusinessId = ''
    },

    // 点击新建 / 编辑 确认
    confirm() {
      let params = {}
      for (let key in this.insertInfo) {
        if(this.insertInfo[key]) {
          params[key] = this.insertInfo[key]
        }
      }
      let requestUrl;
      let methods;
      if (this.insertInfo.traceApplyCount) {
        if ((/^[0-9]*[1-9][0-9]*$/).test(this.insertInfo.traceApplyCount)) {
          if (this.insertInfo.traceBusinessId) {
            if (this.insertInfo.traceApplyType) {
              requestUrl = this.dialogFormTitle === this.$t('Trace.traceList.newTraceTltle') ? '/trace-api/trace/insert' : `/trace-api/trace/${this.insertInfo.traceId}`
              methods = this.dialogFormTitle === this.$t('Trace.traceList.newTraceTltle') ? this.$post : this.$put
              methods(requestUrl, params).then(res => {
                if (res.code === 200) {
                  this.$common.success(this.$t('common.operateSuccessfully'))
                  this.companyId = ''
                  this.dialogForm = false
                  this.getChaseList()
                } else {
                  this.$common.error(this.$t('common.operationFailure'))
                }
              })
            } else {
              // 没有选择申请类型
              this.$common.error(this.$t('Trace.traceList.noTypeSelected'))
            }
          } else {
            // 没有选择商家
            this.$common.error(this.$t('Trace.traceList.NoMerchantsSelected'))
          }
        } else {
          // 申请数量只能为正数
          this.$common.error(this.$t('Trace.traceList.numCanOnlyBePositive'))
        }
      } else {
        // 追溯申请数量不能为空
        this.$common.error(this.$t('Trace.traceList.numCannotBeEmpty'))
      }
    },

    // 打开通过 弹窗
    onpenAdoptDialog(row) {
      // 初始化
      this.rowData = row
      this.paperLabelUpper = row.merchant.paperLabelUpper
      this.adoptDialog = true
      this.adoptDialogParams = [{startSid: "",endSid: "",count: ''}]
    },

    // 获取覆盖码段
    changeCoverageArea(index) {
      clearTimeout(this.timer)
      let currentItem = this.adoptDialogParams[index]
      this.timer = setTimeout(() => {
        if(!currentItem.startSid || !currentItem.endSid) {
          this.$set(this.adoptDialogParams[index],'count','')
          return
        }
        let params = {
          id: this.rowData.traceId,
          startSid: currentItem.startSid,
          endSid: currentItem.endSid
        }
        this.$get('/trace-api/trace/getCodePartBySid', params).then(res => {
          if (res.code === 200) {
            this.$set(this.adoptDialogParams[index],'count',res.data)
          } else {
            this.$set(this.adoptDialogParams[index],'count',res.message)
          }
        })
      },300)
    },

     // 通过确认
    handleClickPass () {
      let requestUrl = `/trace-api/trace/pass/${this.rowData.traceId}`

      // 需要做信息完善校验
      if(this.rowData.traceApplyType === 1) {
        for(let item of this.adoptDialogParams) {
          for(let key in item) {
            if(key !== 'count' && !item[key]) {
              this.$common.warning('请完善码段信息')
              return
            }
          }
        }
      }

      let body = this.adoptDialogParams.map(v => {
        return {
          startSid: v.startSid,
          endSid: v.endSid
        }
      })
      body = this.rowData.traceApplyType === 1 ? body : []

      this.$put(requestUrl,body).then(res => {

        if (Number(res.code) === 200) {
          this.$common.success(res.message)
        } else {
          this.$common.error(res.message)
        }
        this.adoptDialog = false
        this.getChaseList()
      })
    },

    // 打开拒绝弹窗
    openRejectDialog(row) {
      this.rowData = row
      this.rejectDialog = true
      this.remark = ''
    },

    // 点击拒绝
    refuse() {
      this.$put('/trace-api/trace/refuse/' + this.rowData.traceId + '?remark=' + this.remark).then(data => {
        if (Number(data.code) === 200) {
          this.$common.success(data.message)
        } else {
          this.$common.error(data.message)
        }
        this.getChaseList()
        this.rejectDialog = false
      })
    },

    // 导出
    handleExport (row) {
      this.$confirm(this.$t('Trace.traceList.exportConfig'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.Comfirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'success'
      }).then(() => {
        window.location.href = 'https://zs.cntracechain.com/trace-api/trace/point/export?traceCode=' +
        row.traceCodeNumber + '&token=' + this.$localStore.get('roleJson').token
      }).catch(() => {
        console.log('点击了取消')
      })
    },

    // 跳转到追溯记录
    goChaseRecordTrade (id) {
      this.$router.push({ path: '/manage/retrospectRecords/' + id})
    },

    // 跳转到追溯录入页面
    toAdminChaseEntering (id, merchant) {
      this.$router.push({ 
        path: '/manage/retrospectEnter',
        query: {
          traceId: id,
          mid: merchant.merchantId
        }
      })
    },

    // 点击通过 - 增加
    handleAdd() {
      this.adoptDialogParams.push({
        startSid: "",  // 起始码段sid
        endSid: "",  //  结束码段sid
        count: ''
      })
    },

     // 点击通过 - 移除
    handleRemove(index) {
      this.$confirm('确定要删除该项内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.adoptDialogParams.splice(index,1)
      })
    },

    // 选择条数
    handleSizeChange(val) {
      this.pageSize = val
      this.initChaseList()
    },
    // 选择页数
    handleCurrentChange(val) {
      this.pageNum = val 
      this.getChaseList()
    }
  }
}
</script>

<style lang="less" scoped>
  .retrospectlist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .page {
        margin-top: 20px;
        text-align: right;
        height: .42rem;
        /deep/.el-pagination {
          height: 100%;
          padding: 0;
        }
      }

      .head {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #333333;
        margin: -30px 0 34px;
      }

      .dialog-main { 
        .head {
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #333333;
          margin: -10px 0 20px;
        }

        .content-item {
          position: relative;
          margin-bottom: 40px;
          .operate-icon {
            top: 20px;
            right: 0;
            position: absolute;
            font-size: 22px;
            color: #2196F3;
            &:hover {
              cursor: pointer;
            }
          }
        }
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

          .range-data {
            height: 150px;
            width: 95%;
            background-color:#F2F2F2;
            padding: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
</style>