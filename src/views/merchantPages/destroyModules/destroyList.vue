<template>
  <div class="destroyList">
    <page-content name="销毁列表">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">销毁批次号：</div> -->
              <el-input v-model="param.batchNo" placeholder="销毁批次号" style="flex: 1"></el-input>
            </div>
          </el-col>

          <!-- <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary">新建</el-button>
              <el-button type="primary">搜索</el-button>
            </div>
          </el-col> -->
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="销毁批次号" prop="disposeBatchNo"></el-table-column>
                <el-table-column label="商品" prop="goodsName"></el-table-column>
                <el-table-column label="销毁数量" prop="disposeCount"></el-table-column>
                <el-table-column label="销毁地点" prop="disposeSite"></el-table-column>
                <el-table-column label="销毁人员" prop="employeName"></el-table-column>
                <el-table-column label="销毁时间" prop="createTime"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="dowmnloadExcel(scope.row)">下载excel</el-button>
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
      param: {
        batchNo: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 1,
      tableData: []
    }
  },
  watch: {
    param: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getDestroyList()
      }
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }

    this.getDestroyList()
  },
  methods: {
    // 获取列表
    getDestroyList() {
      let _params = {
        merchantId: this.merchantId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }

      if (this.param.batchNo) {
        _params.batchNo = this.param.batchNo
      }
      this.$post('/trace-api/recall/destroyPaging', _params).then((res) => {
        this.tableData = res.data.list || []
        this.total = res.data.total || 0
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getDestroyList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getDestroyList()
    },
    dowmnloadExcel(row) {
      this.$confirm('此操作将会下载Excel，是否继续', '提示', {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel')
      }).then(() => {
        window.location.href = row.excelFileUrl
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .destroyList {
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
      }
      
    }
  }
</style>