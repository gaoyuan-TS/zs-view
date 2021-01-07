<template>
  <div class="reclllist">
    <page-content name="串货列表">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">追溯码SID：</div> -->
              <el-input v-model="params.Sid" clearable placeholder="追溯码SID" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">追溯码批次：</div> -->
              <el-input v-model="params.traceCodeNumber" clearable placeholder="追溯码批次" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">商品名称：</div> -->
              <el-input v-model="params.goodsName" clearable placeholder="商品名称" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">商品名称：</div> -->
              <el-input v-model="params.productBatchNo" clearable placeholder="生产批次" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <!-- <el-row type="flex" justify="end">
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary">搜索</el-button>
            </div>
          </el-col>
        </el-row> -->

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="追溯码Sid" prop="traceSid"></el-table-column>
                <el-table-column label="追溯码批次" prop="traceCodeNumber"></el-table-column>
                <el-table-column label="生产批次" prop="productBatchCode"></el-table-column>
                <el-table-column label="商品" prop="traceGoodName"></el-table-column>
                <el-table-column label="代理商" prop="traceNodeName"></el-table-column>
                <el-table-column label="代理商（所在地）" prop="traceAddress"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="goCargoDetailList(scope.row)">查看明细</el-button>
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
      params: {
        Sid: '', // 追溯Sid
        traceCodeNumber: '', // 追溯批次号
        productBatchNo: '', // 生产批次号
        goodsName: '' // 商品名称
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
    this.getReclList()
  },
  methods: {
    // 获取串货列表
    getReclList() {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.params.Sid) {
        _params.Sid = this.params.Sid
      }

      if (this.params.traceCodeNumber) {
        _params.traceCodeNumber = this.params.traceCodeNumber
      }
      if (this.params.goodsName) {
        this.goodsName = this.params.goodsName
      }
      if (this.params.productBatchNo) {
        _params.productBatchNo = this.params.productBatchNo
      }
      this.$get('/trace-api/conflict/getByPage', _params).then(res => {
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
    goCargoDetailList(row) {
      console.log(row)
      this.$router.push({
        path: '/merchant/cargoDetailList',
        query: {
          id: row.id,
          sid: row.traceSid,
          code: row.traceCodeNumber,
          addess: row.traceAddress,
          proCode: row.productBatchCode,
          name: row.traceNodeName,
          goodName: row.traceGoodName
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
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
        height: .32rem;
        /deep/.el-pagination {
          height: 100%;
          padding: 0;
        }
      }
      
    }
  }
</style>