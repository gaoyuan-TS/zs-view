<template>
  <div class="cargolist">
    <page-content name="召回列表">
      <div class="content">
        <!-- 搜索类目 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">公司名称：</div> -->
              <el-input v-model="params.cargoBatch" placeholder="生产批次" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="newDialog = true">新建</el-button>
              <!-- <el-button type="primary">搜索</el-button> -->
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="生产批次号" prop="productionBatchNo"></el-table-column>
                <el-table-column label="商品" prop="goodsName"></el-table-column>
                <el-table-column label="召回数量" prop="recallCount"></el-table-column>
                <el-table-column label="召回原因" prop="cause"></el-table-column>
                <el-table-column label="时间" prop="createTime"></el-table-column>
                <el-table-column label="未处理数量" prop="undisposedCount"></el-table-column>
                <el-table-column label="处理状态" prop="disposeStatusCN"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="scope.row.disposeStatus === 1" @click="deleteRecall(scope.row)">删除</el-button>
                    <el-button type="text" size="small" v-if="scope.row.disposeStatus === 1" @click="detailForEdit(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" v-if="scope.row.disposeStatus === 1 || scope.row.disposeStatus === 3" @click="goDealWith(scope.row)">处理</el-button>
                    <el-button type="text" size="small" v-if="scope.row.disposeStatus === 2|| scope.row.disposeStatus === 3" @click="goRecallDetail(scope.row)">处理详情</el-button>
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

      <!--  新建召回  -->
      <el-dialog :visible.sync="newDialog" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">新建</div>
        <div class="newdialog-con">
          <div class="item">
            <div style="width: 80%">
              <!-- <el-input placeholder="召回批次号" v-model="newDialogFrom.productionBatchNo"></el-input> -->
              <el-select style="width: 100%" @change="getGoodList" v-model="newDialogFrom.productionBatchNo" placeholder="召回批次">
                <el-option
                  v-for="item in batchList"
                  :key="item.batchNo"
                  :label="item.batchNo"
                  :value="item.batchNo"
                ></el-option>
              </el-select>
            </div>
            
          </div>
          <div class="item" style="margin-top: 30px">
            <!-- <el-input placeholder="商品" v-model="newDialogFrom.goodsId"></el-input> -->
            <div style="width: 80%">
              <el-select style="width: 100%" v-model="newDialogFrom.goodsId" placeholder="商品">
                <el-option
                  v-for="item in goodList"
                  :key="item.goods_id"
                  :label="item.goods_name"
                  :value="item.goods_id"
                ></el-option>
              </el-select>
            </div>
            
          </div>
          <div class="item" style="margin-top: 30px">
            <div style="width: 80%">
              <el-input placeholder="召回原因" v-model="newDialogFrom.cause"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <div style="width: 80%">
              <el-input placeholder="召回负责人" v-model="newDialogFrom.principal"></el-input>
            </div>
            
          </div>
          <div class="item" style="margin-top: 30px">
            <div style="width: 80%">
              <el-input placeholder="负责人联系电话" v-model="newDialogFrom.principalPhone"></el-input>
            </div>
            
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="newRecall">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancel(1)">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>


      <!-- 编辑召回 -->
      <el-dialog :visible.sync="editDialo" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">编辑</div>
        <div class="newdialo-con">
          <div class="item">
            <div style="width: 80%">
              <el-input v-model="editDialogFrom.productionBatchNo" disabled></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px">
            <div style="width: 80%">
              <el-input v-model="editDialogFrom.goodsName" disabled></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <div style="width: 80%">
              <el-input v-model="editDialogFrom.cause"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <div style="width: 80%">
              <el-input v-model="editDialogFrom.principal"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <div style="width: 80%">
              <el-input v-model="editDialogFrom.principalPhone"></el-input>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="modifyRecall">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancel(2)">{{this.$t('button.cancel')}}</el-button>
          </div>
          
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
      merchantId: '', // 商家id
      pageNum: 1,
      pageSize: 10,
      total: 1,
      params: {
        cargoBatch: ''
      },
      tableData: [],
      newDialog: false,
      batchList: [],
      goodList: [],
      newDialogFrom: {
        productionBatchNo: '',
        goodsId: '',
        cause: '',
        principal: '',
        principalPhone: ''
      },
      editDialo: false,
      editDialogFrom: {
        recallId: '',
        productionBatchNo: '',
        goodsName: '',
        cause: '',
        principal: '',
        principalPhone: ''
      },
    }
  },
  watch: {
    params: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getRecall()
      }
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }

    this.getRecall()
    this.getBatchList()
  },
  methods: {
    // 获取召回列表
    getRecall() {
      let _params = {
        merchantId: this.merchantId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$post('/trace-api/recall/paging', _params).then(res => {
        this.tableData = res.data.list || []
        this.total = res.data.total || 0
      })
    },
    // 获取生产批次列表
    getBatchList() {
      this.$get('/trace-api/p_batch/batchListByMerchant/' + this.merchantId).then(res => {
        this.batchList = res.data || []
      })
    },
    // 根据生产批次请求
    getGoodList(val) {
      console.log(val)
      this.$get('/trace-api/p_batch/goodsListByBatchNo/' + val).then(res => {
        this.goodList = res.data
      })
    },
    // 改变条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getRecall()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getRecall()
    },
    // 删除功能
    deleteRecall(row) {

      this.$confirm('是否删除该条记录', '提示', {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
      }).then(() => {
        this.$post('/trace-api/recall/delete/' + row.recallId).then(res => {
          if (res.code === 200) {
            this.$message.success(res.data)
            this.getRecall()
          } else {
            this.$message.error(res.data)
          }
        })
      }).catch(() => {

      })
      
    },
    // 前往处理页面
    goDealWith(row) {
      this.$router.push({
        path: '/merchant/dealWith',
        query: {
          id: row.recallId
        }
      })
    },
    // 前往处理详情页面
    goRecallDetail(row) {
      this.$router.push({
        path: '/merchant/recallDetail',
        query: {
          id: row.recallId
        }
      })
    },
    // 点击编辑按钮时的事件
    detailForEdit(row) {
      this.$get('/trace-api/recall/detailForEdit/' + row.recallId).then(res => {
        this.editDialogFrom = {
          recallId: res.data.recallId,
          productionBatchNo: res.data.productionBatchNo,
          goodsName: res.data.goodsName,
          cause: res.data.cause,
          principal: res.data.principal,
          principalPhone: res.data.principalPhone
        }

        this.editDialo = true
      })
    },
    // 编辑召回记录
    modifyRecall() {
      let _params = {
        batchRecallId: this.editDialogFrom.recallId,
        cause: this.editDialogFrom.cause,
        principal: this.editDialogFrom.principal,
        principalPhone: this.editDialogFrom.principalPhone
      }
      this.$post('/trace-api/recall/modify', _params).then(res => {
        if(res.code === 200) {
          this.$message.success(res.data)
          this.editDialo = false
          this.editDialogFrom = {
            recallId: '',
            productionBatchNo: '',
            goodsName: '',
            cause: '',
            principal: '',
            principalPhone: ''
          }
          this.getRecall()
        } else {
          this.$message.error(res.data)
        }
      })
    },
    // 取消按钮的事件
    cancel(type) {
      
      this.$confirm(this.$t('confirm.traceEnter'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        if (type === 1) {
          this.newDialog = false
          this.newDialogFrom = {
            productionBatchNo: '',
            goodsId: '',
            cause: '',
            principal: '',
            principalPhone: ''
          }
        } else {
          this.editDialo = false
          this.editDialogFrom = {
            recallId: '',
            productionBatchNo: '',
            goodsName: '',
            cause: '',
            principal: '',
            principalPhone: ''
          }
        }
        
      })
    },
    /**
     * 新建召回
     * 参数：newDialogFrom
     */
    newRecall() {

      if(!this.newDialogFrom.productionBatchNo) {
        this.$message.error('请选择生产批次')
        return false
      }
      if(!this.newDialogFrom.goodsId) {
        this.$message.error('请选择商品')
        return false
      }
      if (!this.newDialogFrom.cause) {
        this.$message.error('请填写召回的原因')
        return false
      }
      if (!this.newDialogFrom.principal) {
        this.message.error('请填写负责人')
        return false
      }
      if (!this.newDialogFrom.principalPhone) {
        this.$message.error('请填写负责人的类型电话')
        return false
      }
      this.$post('/trace-api/recall/newRecall', this.newDialogFrom).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.newDialog = false

          this.newDialogFrom = {
            productionBatchNo: '',
            goodsId: '',
            cause: '',
            principal: '',
            principalPhone: ''
          }
          this.getRecall()
        } else {
          this.$message.error(res.message)
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
  .cargolist {
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

  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>