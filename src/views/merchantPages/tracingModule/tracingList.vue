<template>
  <div class="tracinglist">
    <page-content :name="$t('Trace.traceList.traceListTitle')">
      <div class="content">
        <!-- 搜索条件区域 --> 
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">追溯码批次</div> -->
              <el-input v-model="paramData.traceCodeNumber" :placeholder="$t('Trace.traceList.traceCodeBatch')" style="flex: 1" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">处理状态</div> -->
              <el-select
                style="flex:0.8"
                v-model="paramData.traceHandleStatus"
                clearable
                :placeholder="$t('Trace.traceList.proState')"
              >
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">申请类型</div> -->
              <el-select
                style="flex:0.8"
                v-model="paramData.traceApplyType"
               :placeholder="$t('Trace.traceList.applicationType')"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-input">
              <!-- <div class="input-title">申请日期</div> -->
              
              <div class="input-title">{{$t('common.date')}}</div>
              <el-date-picker
                style="flex:1; border: none"
                v-model="time"
                @change="changeTIme"
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

        <!-- 按钮区域 -->
        <el-row type="flex" justify="end" style="margin-top: 20px">
          <el-col :span="3">
            <div class="item-input item-button">
              <el-button type="primary" @click="conrfirmPass">{{$t('button.new')}}</el-button>
              <!-- <el-button type="primary">搜索</el-button> -->
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table style="width: 100%" height="500" stripe :data="tableData">
                <el-table-column :label="$t('Trace.traceList.dateOfApp')">
                  <template slot-scope="scope">
                    <span>{{scope.row.traceApplyDate || '---'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="traceApplyCount" :label="$t('Trace.traceList.applicationNum')"></el-table-column>
                <el-table-column :label="$t('Trace.traceList.applicationType')">
                  <template slot-scope="scope">
                    <span>
                      {{ Number(scope.row.traceApplyType)===1? $t('Trace.traceList.paperLabel') : $t('Trace.traceList.electronicLabel') }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Trace.traceList.traceCodeBatch')">
                  <template slot-scope="scope">
                    <span>{{scope.row.traceCodeNumber || '---'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="traceApplyCount" :label="$t('Trace.traceList.approvalDate')">
                  <template slot-scope="scope">
                    <span>{{scope.row.traceReviewDate || '---'}}</span>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('Trace.traceList.proState')">
                  <template slot-scope="scope">
                    <span
                      class="circle-red"
                      v-if="Number(scope.row.traceHandleStatus)===2||Number(scope.row.traceHandleStatus)===3 || Number(scope.row.traceHandleStatus)===4"
                    ></span>
                    <span class="circle-green" v-if="Number(scope.row.traceHandleStatus)===1"></span>
                    <span v-if="Number(scope.row.traceHandleStatus)===1">{{$t('Trace.traceList.havePassed')}}</span>
                    <span v-if="Number(scope.row.traceHandleStatus)===2">{{$t('Trace.traceList.toBeauited')}}</span>
                    <span v-if="Number(scope.row.traceHandleStatus)===3">{{$t('Trace.traceList.haveWithdrawn')}}</span>
                    <span v-if="Number(scope.row.traceHandleStatus)===4">{{$t('Trace.traceList.haveRejected')}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="handle" :label="$t('common.Operation')" width="200">
                  <template slot-scope="scope">
                    <el-button
                      v-if="Number(scope.row.traceHandleStatus) === 1 && Number(scope.row.traceApplyType) === 2"
                      type="text"
                      size="small"
                      @click="handleExport(scope.row)"
                    >
                      {{$t('button.export')}}
                    </el-button>
                    <el-button
                      v-if="Number(scope.row.traceHandleStatus) === 2"
                      type="text"
                      size="small"
                      @click="editButtonChange(scope.row)"
                    >{{$t('button.edit')}}</el-button>
                    <el-button
                      v-if="Number(scope.row.traceHandleStatus) === 2"
                      type="text"
                      size="small"
                      @click="handleClickBack(scope.row)"
                    >{{$t('button.withdraw')}}</el-button>
                    <el-button
                      v-if="Number(scope.row.traceHandleStatus) === 1"
                      type="text"
                      size="small"
                      @click="goTraceRecords(scope.row.traceId)"
                    >{{$t('button.Record')}}</el-button>
                    <el-button
                      v-if="Number(scope.row.traceHandleStatus)===1"
                      type="text"
                      size="small"
                      @click="goTraceInformation(scope.row.traceId)"
                    >{{$t('button.Entry')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- 分页 -->
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

      <!-- 新建追溯的弹窗 -->
      <el-dialog :visible.sync="dialogFormNew" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">
          {{$t('Trace.traceList.newTraceTltle')}}
          <span style="font-size: 12px">{{$t('Trace.traceList.paperTitle')}}：{{detailInfo.paper_label_upper}}</span>
        </div>
        <div class="dialogFormNew-con">
          <div class="item">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div style="width: 80%">
              <el-input :placeholder="$t('Trace.traceList.newDialogNumnber')" v-model="newFormParams.traceApplyCount"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div style="color: #808080;">{{$t('Trace.traceList.tagType')}}</div>
            <div style="width: 80%; margin-top: 20px">
              <el-radio-group v-model="newFormParams.traceApplyType">
                <el-radio label="2">{{$t('Trace.traceList.electronicLabel')}}</el-radio>
                <el-radio label="1">{{$t('Trace.traceList.paperLabel')}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="insetTrace(1)">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancel(1)">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>

      <!-- 编辑追溯的弹窗 -->
      <el-dialog :visible.sync="dialogFormEdit" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">{{$t('Trace.traceList.editTraceTitle')}}</div>
        <div class="dialogFormNew-con">
          <div class="item">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div style="width: 80%">
              <el-input :placeholder="$t('Trace.traceList.newDialogNumnber')" v-model="editFormParams.traceApplyCount"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div style="color: #808080;">{{$t('Trace.traceList.tagType')}}</div>
            <div style="width: 80%; margin-top: 20px">
              <el-radio-group v-model="editFormParams.traceApplyType">
                <el-radio label="2">{{$t('Trace.traceList.electronicLabel')}}</el-radio>
                <el-radio label="1">{{$t('Trace.traceList.paperLabel')}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="insetTrace(2)">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancel">{{this.$t('button.cancel')}}</el-button>
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
      detailInfo: {},
      pageNum: 1,
      pageSize: 10,
      paramData: {
        traceCodeNumber: '',
        traceHandleStatus: '',
        traceApplyType: '',
        traceApplyStartDate: '',
        traceApplyEndDate: ''
      },
      time: [],
      optionsStatus: [
        {
          label: this.$t('Trace.traceList.havePassed'),
          value: '1'
        },
        {
          label: this.$t('Trace.traceList.toBeauited'),
          value: '2'
        },
        {
          label: this.$t('Trace.traceList.haveWithdrawn'),
          value: '3'
        },
        {
          label: this.$t('Trace.traceList.haveRejected'),
          value: '4'
        }
      ],
      options: [
        {
          label: this.$t('Trace.traceList.paperLabel'),
          value: 1
        },
        {
          label: this.$t('Trace.traceList.electronicLabel'),
          value: 2
        }
      ],
      tableData: [],
      total: 0,
      dialogFormNew: false, // 新建弹窗的状态
      newFormParams: {
        traceApplyCount: '',
        traceApplyType: '1',
        traceBusinessId: ''
      }, // 新建追溯所需要的参数
      dialogFormEdit: false,
      traceId: '',
      editFormParams: {
        traceApplyCount: '',
        traceApplyType: '1',
        traceBusinessId: ''
      }, // 编辑追溯所需要的参数
    }
  },
  watch: {
    paramData: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getChaseList()
      }
    }
  },
  created() {
    this.getMerchantDetail()
    this.getChaseList()
  },
  methods: {
    // 获取该商家的详细信息
    getMerchantDetail() {
      this.$get('/management_point/merchant/getLoginMerchant').then(res => {
        this.detailInfo = res.data
      })
    },
    // 判断该商家是否认证
    conrfirmPass() {
      if (Number(this.detailInfo.certification_to_pay === 0)) {
        this.$confirm(this.$t('Trace.traceList.certificationConfirm'), {
          confirmButtonText: this.$t('confirm.know'),
          type: 'warning'
        }).then(() => {

        }).catch(() => {

        })
      } else {
        this.dialogFormNew = true
      }
    },
    // 时间
    changeTIme (val) {
      if (val) {
        this.paramData.traceApplyStartDate = new Date(val[0]).valueOf()
        this.paramData.traceApplyEndDate = new Date(val[1]).valueOf()
      } else {
        this.paramData.traceApplyStartDate = ''
        this.paramData.traceApplyEndDate = ''
      }
    },
    // 获取追溯列表
    getChaseList() {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderBy: 'trace_apply_date desc'
      }
      if (this.paramData.traceCodeNumber) {
        _params.traceCodeNumber = this.paramData.traceCodeNumber
      }
       if (this.paramData.traceHandleStatus) {
        _params.traceHandleStatus = this.paramData.traceHandleStatus
      }
      if (this.paramData.traceApplyType) {
        _params.traceApplyType = this.paramData.traceApplyType
      }
      if (this.paramData.traceApplyStartDate) {
        _params.traceApplyStartDate = this.paramData.traceApplyStartDate
      }
      if (this.paramData.traceApplyEndDate) {
        _params.traceApplyEndDate = this.paramData.traceApplyEndDate
      }
      
      this.$get('/trace-api/trace/getByPage', _params).then(res => {
        console.log(res.data)
        let _data = res.data.list
        _data.forEach(element => {
          if (element.traceApplyDate) {
            element.traceApplyDate = this.$common.timeStamp(element.traceApplyDate, 1)
          }
          if (element.traceReviewDate) {
            element.traceReviewDate = this.$common.timeStamp(element.traceReviewDate, 1)
          }
          // console.log(this.$common.timeTamp)
        })

        this.tableData = _data
        this.total = res.data.total
      })
    },
    // 选择条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getChaseList()
    },
    // 选择页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getChaseList()
    },
    editButtonChange(row) {
      this.traceId = row.traceId
      this.editFormParams.traceApplyType = String(row.traceApplyType)
      this.editFormParams.traceApplyCount = row.traceApplyCount
      this.dialogFormEdit = true
    },
    // 新建追溯
    insetTrace(type) {
      if (type === 1) {
        this.newFormParams.traceBusinessId = this.$localStore.get('roleJson').merchant.merchantId || ''
        let _params = this.newFormParams
        if (!_params.traceApplyCount) {
          this.$message.error(this.$t('Trace.traceList.newDialogNumnberTip1'))
          return false
        }
        if (!/^[0-9]*[1-9][0-9]*$/.test(_params.traceApplyCount)) {
          this.$message.error(this.$t('Trace.traceList.newDialogNumnberTip2'))
          return false
        }
        if (!_params.traceApplyType) {
          this.$message.error(this.$t('Trace.traceList.tagTypeTip'))
          return false
        }

        this.$post('/trace-api/trace/insert', _params).then(res => {
          if (res.code === 200) {
            this.$message.success(this.$t('Trace.traceList.newTraceSuccess'))
            this.newFormParams = {
              traceApplyCount: '',
              traceApplyType: '',
              traceBusinessId: ''
            }
            this.dialogFormNew = false
            this.getChaseList()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.editFormParams.traceBusinessId = this.$localStore.get('roleJson').merchant.merchantId || ''
        let _params = this.editFormParams
        if (!_params.traceApplyCount) {
          this.$message.error(this.$t('Trace.traceList.newDialogNumnberTip1'))
          return false
        }
        if (!/^[0-9]*[1-9][0-9]*$/.test(_params.traceApplyCount)) {
          this.$message.error(this.$t('Trace.traceList.newDialogNumnberTip2'))
          return false
        }
        if (!_params.traceApplyType) {
          this.$message.error(this.$t('Trace.traceList.tagTypeTip'))
          return false
        }

        this.$put('/trace-api/trace/' + this.traceId, _params).then(res => {
          if (res.code === 200) {
            this.$message.success(this.$t('Trace.traceList.newTraceSuccess'))
            this.editFormParams = {
              traceApplyCount: '',
              traceApplyType: '',
              traceBusinessId: ''
            }
            this.dialogFormEdit = false
            this.getChaseList()
          } else {
            this.$message.error(res.message)
          }
        })
      }
      
    },
    /**
     * 新建追溯 弹窗
     *  取消按钮
     */
    cancel(type) {
      this.$confirm(this.$t('confirm.traceEnter'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        if (type === 1) {
          this.dialogFormNew = false
          this.newFormParams = {
            traceApplyCount: '',
            traceApplyType: '',
            traceBusinessId: ''
          }
        } else {
          this.dialogFormEdit = false
          this.editFormParams = {
            traceApplyCount: '',
            traceApplyType: '',
            traceBusinessId: ''
          }
        }
        
      })
    },
    // 撤回申请
    handleClickBack(row) {
      this.$confirm(this.$t('Trace.traceList.withdrawConfig'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
      }).then(() => {
        this.$put('/trace-api/trace/cancel/' + row.traceId).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.getChaseList()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message.info('已取消操作')
      })
    },
    // 导出
    handleExport (row) {
      this.$confirm(this.$t('Trace.traceList.exportConfig'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel')
      }).then(() => {
        // https://zs.cntracechain.com/
        window.location.href =
          'https://zs.cntracechain.com/trace-api/trace/point/export?traceCode=' +
          row.traceCodeNumber +
          '&token=' +
          this.$localStore.get('roleJson').token
      }).catch(() => {

      })
    },
    // 前往追溯记录页面
    goTraceRecords(id) {
      this.$router.push({
        path: '/merchant/traceRecords',
        query: {
          traceId: id
        }
      })
    },
    // 前往录入追溯信息页面
    goTraceInformation(id) {
      this.$router.push({
        path: '/merchant/traceInformation',
        query: {
          traceId: id
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
  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tracinglist {
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
</style>