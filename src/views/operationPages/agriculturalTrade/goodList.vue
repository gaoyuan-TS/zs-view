<template>
  <div class="bgoodlist">
    <page-content name="摊主列表-商品查看">
      <div class="content">
        <div class="title-top">
          <div class="title-top1 title">
            <div class="title-top1-item">商家名称：{{merchantName}}</div>
            <div class="title-top1-item">摊位编号：{{stallHolderInfo.stallNo}} </div>
            <div class="title-top1-item">摊主名称：{{stallHolderInfo.stallHolderName}}</div>
          </div>

          <div class="title-top1">
            <div class="title-top1-item" style="line-height: 40px;">录入日期：</div>
            <el-date-picker
              v-model="time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          
        </div>

        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="商品名称" prop="productName"></el-table-column>
                <el-table-column label="追溯批次号" prop="traceabilityBatchNo"></el-table-column>
                <el-table-column label="商品分类" prop="amClassification.classificationName"></el-table-column>
                <el-table-column label="商品数量" prop="productReady"></el-table-column>
                <el-table-column label="剩余数量" prop="productStock"></el-table-column>
                <el-table-column label="录入日期" prop="createTime"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                    >产品追溯详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <el-row v-if="total > 0">
          <el-col :span="24">
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
      merchantStallHolderId: '',
      merchantName: '',
      stallHolderInfo: {},
      time: this.$common.newDate(new Date()),
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0
    }
  },
  watch: {
    time(newValue) {
      this.pageNum = 1
      this.pageSize = 10
      this.getGoodList()
    }
  },
  created() {
    this.merchantStallHolderId = this.$route.query.id
    this.merchantName = this.$route.query.mName
    this.getStallHolderInfo(this.merchantStallHolderId)
    this.getGoodList()
  },
  methods: {
    getStallHolderInfo(stallHolderId) {
      this.$get('/traceability_am/m-stallHolder/editPageData/' + stallHolderId).then(res => {
        this.stallHolderInfo = res.data
      })
    },
    getGoodList() {
      let _params = {
        merchantStallHolderId: this.merchantStallHolderId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.time) {
        _params.createTime = this.time
      }

      this.$get('/traceability_am/goods/list', _params).then(res => {

        if (res.data) {
          let _data = res.data.list
          let _goodList = []
          _data.forEach(element => {
            _goodList.push(element.goodsInfo)
          })

          this.tableData = _goodList
        } else {
          this.tableData = []
        }

        this.total = res.data.total || 0
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getGoodList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getGoodList()
    }
  }
}
</script>

<style lang="less" scoped>
  .bgoodlist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .title-top {
        .title {
          color: rgba(239, 65, 53, 1);
        }
        .title-top1 {
          display: flex;
          .title-top1-item {
            margin-right: 30px;
            font-size: 18px;
            font-size: 14px;
          }
        }
        .title {
          padding: 18px 0;
        }
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
</style>