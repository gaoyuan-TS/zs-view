<template>
  <div class="materiallist">
    <page-content name='原材料列表'>
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.materialName" placeholder="原材料名称" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.materialSource" placeholder="原材料来源" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.batchNumber" placeholder="入库批次号" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">{{$t('common.date2')}}：</div>
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

        <el-row type="flex" justify="end">
          <el-col :span="3">
            <div class="item-input item-button">
              <el-button type="primary" @click="goNewMaterial">{{$t('button.new')}}</el-button>
              <!-- <el-button type="primary">搜索</el-button> -->
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column prop="materialName" label="原材料名称"></el-table-column>
                <el-table-column prop="createTime" label="入库时间"></el-table-column>
                <el-table-column prop="materialSource" label="原材料供应商"></el-table-column>
                <el-table-column prop="warehouseName" label="存放库房"></el-table-column>
                <el-table-column prop="quantity" label="原材料数量"></el-table-column>
                <el-table-column prop="residueQuantity" label="剩余数量"></el-table-column>
                <el-table-column prop="batchNumber" label="入库批次号"></el-table-column>
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
import pageContent from "../../../components/content";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '',
      pageNum: 1,
      pageSize: 10,
      params: {
        materialName: '',
        materialSource: '',
        batchNumber: '',
        time: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }

    this.getMaterialList()
  },
  watch: {
    params: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getMaterialList()
      }
      
    }
  },
  methods: {
    // 获取原材料列表
    getMaterialList() {
      let _params = {
        merchantId: this.merchantId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.params.materialName) {
        _params.materialName = this.params.materialName
      }
      if (this.params.materialSource) {
        _params.materialSource = this.params.materialSource
      }
      if (this.params.batchNumber) {
        _params.batchNumber = this.params.batchNumber
      }

      if (this.params.time) {
        _params.startDate = this.params.time[0]
        _params.endtDate = this.params.time[1]
      }
      this.$post('/material-admin/material/traceList', _params).then(res => {
        this.tableData = res.data.rows || []
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    // 前往新增原材料页面
    goNewMaterial() {
      this.$router.push({
        path: '/merchant/newMaterial',
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
  .materiallist {
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
      // height: 0.32rem;
      /deep/.el-pagination {
        height: 100%;
        padding: 0;
      }
    }
  }
</style>