<template>
  <div class="reclllist">
    <page-content name="串货明细列表">
      <div class="content">
        
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div style="font-size: 14px">追溯码SID：{{traceSid}}</div>
          </el-col>
          <el-col :span="6">
            <div style="font-size: 14px">追溯批次：{{traceCodeNumber}}</div>
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">生产批次： {{productBatchCode}}</div>
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">商品：{{traceGoodName}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 27px" type="flex" justify="space-between">
          <el-col :span="5">
            <div style="font-size: 14px">代理商：{{traceNodeName}}</div>
          </el-col>
          <el-col :span="18">
            <div style="font-size: 14px">代理商所在地：{{traceAddress}}</div>
          </el-col>
        </el-row>

        <el-row type="flex" style="margin-top: 40px">
          <el-col :span="5">
            <div class="item-input">
              <el-input v-model="params.address" clearable placeholder="串货地点" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="7" style="margin-left: 36px">
            <div class="item-input">
              <div class="input-title">串货日期</div>
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

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="串货日期" prop="conflictDate">
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.conflictDate | dateformat('YYYY/MM/DD HH:mm:ss')}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="串货地点" prop="conflictAddress"></el-table-column>
                <el-table-column label="IP地址" prop="conflictIp"></el-table-column>
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
      id: '',
      traceSid: '',
      traceCodeNumber: '',
      productBatchCode: '',
      traceGoodName: '',
      traceNodeName: '',
      traceAddress: '',
      params: {
        address: '', // 地址
        time: []
      },
      pageNum: 1,
      pageSize: 10,
      total: 1,
      tableData: []
    }
  },
  watch: {
    params: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getReclList()
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.traceSid = this.$route.query.sid
    this.traceCodeNumber = this.$route.query.code
    this.traceGoodName = this.$route.query.goodName
    this.traceNodeName = this.$route.query.name
    this.traceAddress = this.$route.query.addess
    this.productBatchCode = this.$route.query.proCode
    this.getReclList()
  },
  methods: {
    // 获取串货列表
    getReclList() {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.params.address) {
        _params.address = this.params.address
      }

      if (this.params.time) {
        _params.startTime = this.params.time[0]
        _params.endTime = this.params.time[1]
      }
      this.$get('/trace-api/conflict/getByPageDetail/' + this.id, _params).then(res => {
        this.tableData = res.data.list || []
        this.total = res.data.total
      })
    },
    // 改变条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getReclList()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getReclList()
    },
    // 前往串货明细列表页面
    // go
  }
}
</script>

<style lang="less" scoped>
  .reclllist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
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