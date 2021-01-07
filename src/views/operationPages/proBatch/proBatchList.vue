<template>
  <div class="proBatchList">
    <page-content name="生产批次列表">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">生产批次号：</div> -->
              <el-input style="flex: 1" placeholder="生产批次号" v-model="param.batchNumber"></el-input>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">商品名称：</div> -->
              <el-select clearable style="flex: 1" v-model="param.productName" placeholder="请选择商品">
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
              <el-input v-model="param.merchantName" placeholder="商家名称"></el-input>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="item-input item-button">
              <el-button type="primary" @click="goProductionBatch">新建</el-button>
              <!-- <el-button type="primary">搜索</el-button> -->
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="生产批次号" prop="batchNo"></el-table-column>
                <el-table-column label="商品名" prop="goodsName"></el-table-column>

                <el-table-column label="追溯信息">
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.sidScope || '----'}}
                    </span>
                  </template>
                </el-table-column>

                <!-- <el-table-column label="追溯批次号" prop="traceCodeNo">
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.traceCodeNo || '----'}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="追溯码段(SID范围)" prop="sidScope">
                  <template slot-scope="scope">
                    <span>
                      <span>
                      {{scope.row.sidScope || '----'}}
                    </span>
                    </span>
                  </template>
                </el-table-column> -->
                <el-table-column label="生产时间段" prop="productionTimeScope">
                  <template slot-scope="scope">
                    <span>
                      <span>
                      {{scope.row.productionTimeScope || '----'}}
                    </span>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="60">
                  <template slot-scope="scope">
                    <el-button type="text" @click="goEditProBatch(scope.row.batchId)">编辑</el-button>
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
      merchantId: '',
      options: [],
      param: {
        batchNo: '',
        goodsName: '',
        merchantName: '',
      },
      pageNum: 1,
      pageSize: 10,
      tableData: [], // 列表数据
      total: 0
    }
  },
  watch: {
    param(newV, oldV) {
      this.pageNum = 1
      this.pageSize = 10
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取生产批次列表
    getList() {
      let _params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }

      if (this.param.batchNo) {
        _params.batchNo = this.param.batchNo
      }
      if (this.param.goodsName) {
        _params.goodsName = this.param.goodsName
      }
      if (this.param.merchantName) {
        _params.merchantName = this.param.merchantName
      }
      this.$post('/trace-api/p_batch/operateForPagingList', _params).then(res => {
        this.tableData = res.data.list || []
        this.total = res.data.total || 0
      })
    },
    // 改变条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
    // 前往新建生产批次
    goProductionBatch() {
      this.$router.push({
        path: '/manage/newProductionBatch'
      })
    },
    // 前往编辑生产批次
    goEditProBatch(bId) {
      this.$router.push({
        path: '/manage/editProductionBatch',
        query: {
          bId: bId
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
  .proBatchList {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
    }
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
</style>