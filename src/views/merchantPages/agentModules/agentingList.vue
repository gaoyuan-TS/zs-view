<template>
  <div class="agentingList">
    <page-content :name="$t('Agent.pendingAgent')">
      <div class="content">
        <el-row>
          <el-col :span="6">
            <div class="item-input">
              <div class="input-title">{{$t('common.date')}}</div>
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

          <el-col :span="6" style="margin-left: 36px">
            <div class="item-input">
              <el-select clearable v-model="params.agentStatus" :placeholder="$t('Agent.status')" style="flex: 1">
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column prop="agentName" :label="$t('Agent.agentName')"></el-table-column>
                <el-table-column prop="agentContact" :label="$t('Agent.contactPerson')"></el-table-column>
                <el-table-column prop="agentCpntactNumber" :label="$t('Agent.phone')"></el-table-column>
                <el-table-column :label="$t('Agent.address')">
                  <template slot-scope="scope">
                    <span>{{scope.row.address}}{{scope.row.agentDetailSite}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" :label="$t('Agent.creatDate')"></el-table-column>
                <el-table-column  :label="$t('Agent.agencyGood')">
                  <template slot-scope="scope">
                    <span>{{scope.row.agentGoods || '---'}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Agent.status')" width="100">
                  <template slot-scope="scope">
                    <span class="circle-green" v-if="scope.row.agentStatus === '1'"></span>
                    <span v-if="scope.row.agentStatus === '1'">{{$t('Agent.through')}}</span>
                    <span class="circle-red" v-if="scope.row.agentStatus === '2' || scope.row.agentStatus === '0' || scope.row.agentStatus === '3'"></span>
                    <span v-if="scope.row.agentStatus === '0'">{{$t('Agent.Prohibit')}}</span>
                    <span v-if="scope.row.agentStatus === '2'">{{$t('Agent.pendingStatus')}}</span>
                    <span v-if="scope.row.agentStatus === '3'">{{$t('Agent.refuse')}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('common.Operation')" width="200">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="getPictrue(scope.row.merchantAgentId)">{{$t('Agent.documents')}}</el-button>
                    <el-button type="text" size="small" v-if="scope.row.agentStatus === '2'" @click="setAgentStatus(1, scope.row.merchantAgentId)">{{$t('Agent.through')}}</el-button>
                    <el-button type="text" size="small" v-if="scope.row.agentStatus === '2'" @click="setAgentStatus(0, scope.row.merchantAgentId)">{{$t('Agent.refuse')}}</el-button>
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
                @size-change="handPageSize"
                @current-change="handPageNum"
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

      <!-- 查看代理商证件弹窗 -->
      <el-dialog :visible.sync="dialogInfo" width="30%" center>
        <div slot="title" style="font-size: 16px">{{$t('Agent.certificateInfo')}}</div>
        <div class="dialogInfo-con">
          <div class="agent-zj agent-zj-name">
            <div class="agent-zj-title">
              {{$t('Agent.agentName')}}：
            </div>
            <div>
              {{agentName}}
            </div>
          </div>

          <div class="agent-zj">
            <div class="agent-zj-title">{{$t('Agent.certificate')}}：</div>
            <div class="agent-imgs">
              <img :src="item" v-for="(item, idx) in agentPaperUrls" :key="idx">
            </div>
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
      merchantId: '',
      params: {
        time: [],
        agentStatus: ''
      },
      statusType: [
        {
          value: '1',
          label: '通过'
        },
        {
          value: '2',
          label: '待审'
        },
        {
          value: '3',
          label: '拒绝'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      dialogInfo: false, // 查看证件弹窗的状态
      agentPaperUrls: [],
      agentName: ''
    }
  },
  watch: {
    params: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getCheckAgentingList()
      }
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }

    this.getCheckAgentingList()
  },
  methods: {
    // 获取待审核代理商列表
    getCheckAgentingList() {
      let _params = {
        agentStatus: this.params.agentStatus
      }
      if (this.params.time) {
        _params.start = this.params.time[0]
        _params.end = this.params.time[1]
      }

      this.$post('/agent/merchantAgent/check/search/page?merchantId=' + this.merchantId + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize, _params).then(res => {
        this.tableData = res.data.data
        this.total = res.data.num
      })
    },
    handPageSize(val) {
      this.pageSize = val
      this.getCheckAgentingList()
    },
    handPageNum(val) {
      this.pageNum = val
      this.getCheckAgentingList()
    },
    // 获取代理商的证件信息
    getPictrue(id) {
      this.$get('/agent/merchantAgent/check/picture?merchantAgentId=' + id).then(res => {
        if (res.code === 20000) {
          this.agentName = res.data.agentName
          this.agentPaperUrls = res.data.agentPapersUrl
          this.dialogInfo = true
        }
      })
    },
    // 拒绝或通过
    setAgentStatus(type, id) {
      if (type === 1) {
        this.$confirm(this.$t('Agent.statusConfirmTg'), {
          confirmButtonText: this.$t('button.determine'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true
        }).then(() => {
          this.$get('agent/merchantAgent/status?agentStatus=1&merchantAgentId=' + id).then(res => {
            if (res.code === 20000) {
              this.$message.success(res.message)
              this.getCheckAgentingList()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {

        })
      } else {
        this.$confirm(this.$t('Agent.statusConfirmJJ'), {
          confirmButtonText: this.$t('button.determine'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true
        }).then(() => {
          this.$get('agent/merchantAgent/status?agentStatus=3&merchantAgentId=' + id).then(res => {
            if (res.code === 20000) {
              this.$message.success(res.message)
              this.getCheckAgentingList()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {

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
  .agentingList {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .page {
        margin-top: 20px;
        text-align: right;
        height: 0.32rem;
      }
    }
  }

  .dialogInfo-con {
    .agent-zj {
      display: flex;
      .agent-zj-title {
        width: 100px;
        text-align: right;
      }

    }
    .agent-zj-name {
      height: 40px;
      div {
        line-height: 40px;
      }
    }
    .agent-imgs {
      img {
        width: 200px;
        // height: 100px;
      }
    }
  }
</style>