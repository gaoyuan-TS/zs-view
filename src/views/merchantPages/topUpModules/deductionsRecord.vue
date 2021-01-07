<template>
  <div class="tracesumptiondetail">
    <page-content :name="$t('topUp.deductionRecord.deductionRecordTitle')">
      <div class="content">
        <el-row style="font-size: 14px" type="flex" justify="space-between">
          <el-col :span="7">
            <div>{{$t('topUp.common.proName')}}：{{goodsName}}</div>
          </el-col>
          <el-col :span="7">
            <div>{{$t('topUp.common.traBatchNum')}}：{{traceCode}}</div>
          </el-col>
          <el-col :span="7">
            <div>{{$t('topUp.common.proAndTraNum')}}：{{traceBack1}}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column prop="deduct_time" :label="$t('topUp.deductionRecord.addDate')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.deduct_time">{{scope.row.deduct_time | dateformat('YYYY/MM/DD HH:mm:ss')}}</span>
                      <span v-else>------</span>
                    </template>
                </el-table-column>
                <el-table-column prop="scanCount" :label="$t('topUp.deductionRecord.serialNum')">
                    <template slot-scope="scope">
                        <span>{{scope.row.trace_point_from_number}}-{{scope.row.trace_point_to_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="trace_point_name" :label="$t('topUp.deductionRecord.nodeName')"></el-table-column>
                <el-table-column prop="deduct_integral" :label="$t('topUp.deductionRecord.deductionNum')"></el-table-column>
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
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '',
      traceCode: '',
      traceGoodId: '',
      traceBack1: '',
      goodsName: '',
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.traceCode = this.$route.query.traceCode
    this.traceGoodId = this.$route.query.traceGoodId
    this.traceBack1 = this.$route.query.traceBack1
    this.goodsName = decodeURIComponent(this.$route.query.goodsName)

    this.getQueryCodeTraceLog()
  },
  methods: {
    // 获取列表数据
    getQueryCodeTraceLog() {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        traceCode: this.traceCode,
        traceGoodId: this.traceGoodId,
        traceBack1: this.traceBack1
      }

      this.$post('/management_point/integralLog/tracePointDeductList', _params).then(res => {
        this.tableData = res.data.pageInfo.list || []
        this.total = res.data.pageInfo.total || 0
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getQueryCodeTraceLog()
    },
    handleCurrentChange(val) {
      this.pageSize = val
      this.getQueryCodeTraceLog()
    }
  }
}
</script>

<style lang="less" scoped>
  .tracesumptiondetail {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
    }

    .page {
      margin-top: 20px;
      text-align: right;
      height: 0.32rem;
      /deep/.el-pagination {
        height: 100%;
        padding: 0;
      }
    }
  }
</style>