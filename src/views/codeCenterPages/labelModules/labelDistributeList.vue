<template>
  <div class="cargolist">
    <!-- 标签发放明细 -->
    <page-content :name="$t('centerCode.distribut.labelIssuanceDetails')">
      <div class="content">
        <!-- 筛选 start-->
        <el-row type="flex" class="filter-wrap" align="middle">
          <el-col :span="7" style="margin-right:66px">
            <div class="item-input">
              <!-- 商家名称 -->
              <div class="input-title" style="width:25%;text-align:left">{{$t('centerCode.distribut.merchantName')}}: </div>
              <el-input v-model="filterParams.merchantName" @input="handleInput" :placeholder="$t('centerCode.distribut.merchantName')"></el-input>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="item-input">
              <!-- 公司 -->
              <div class="input-title" style="width:20%;text-align:left">{{$t('centerCode.distribut.company')}}: </div>
              <el-select v-model="filterParams.allianceId" @change="handleChange" clearable :placeholder="$t('centerCode.distribut.company')" style="width:100%;">
                <el-option :label="item.name" :value="item.id" v-for="item in optionsCompany" :key="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <!-- 筛选 end-->

        <!-- 列表 -->
        <el-row style="margin-top:40px">
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <!-- 商家名称 -->
                <el-table-column :label="$t('centerCode.distribut.merchantName')" prop="merchantName"></el-table-column>
                <!-- 公司 -->
                <el-table-column :label="$t('centerCode.distribut.company')" prop="companyName"></el-table-column>
                <!-- 纸质标签额度 -->
                <el-table-column :label="$t('centerCode.distribut.paperLabelQuota')">
                  <template slot-scope="{row}">
                    <!-- {{row.freeCount ? row.freeCount : $t('common.empty')}} -->
                    {{row.freeCount || 0}}
                  </template>
                </el-table-column>
                <!-- 剩余额度 -->
                <el-table-column :label="$t('centerCode.distribut.remainingAmount')" prop="enabledCount"></el-table-column>
                <!-- 已使用的纸质标签数 -->
                <el-table-column :label="$t('centerCode.distribut.paperLabelsUsed')">
                  <template slot-scope="{row}">
                    <span>
                      {{row.usedPaperCount || 0}}
                    </span>
                  </template>
                </el-table-column>
                <!-- 已使用的电子标签数 -->
                <el-table-column :label="$t('centerCode.distribut.electronicTagsUsed')">
                  <template slot-scope="{row}">
                    <!-- {{row.usedElectrCount ? row.usedElectrCount : $t('common.empty')}} -->
                    {{row.usedElectrCount || 0}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <el-row>
          <el-col :span="24">
            <div class="page">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]" :current-page.sync="filterParams.pageNum" :page-size.sync="filterParams.pageSize"
                background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
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
      optionsCompany: [], // 公司数据
      tableData: [],  // 表格数据
      filterParams: {  // 筛选参数
        merchantName: "",  // 商家名称
        allianceId: "",  // 代理商id
        pageNum: 1,
        pageSize: 10
      },
      timer: null,
      total: 1
    }
  },
  created() {
    this.getCommpany()
    this.getTableData()
  },
  methods: {
    // 获取公司数据
    getCommpany () {
      this.$get('/back-end/allianceBusiness/getAll').then(res => {
        this.optionsCompany = res.data
        this.optionsCompany.unshift({ name: this.$t('centerCode.distribut.headquarters'), id: 0})
      })
    },

    // 获取表格数据
    getTableData() {
      this.$get('/trace-api/trace/labelDistributionDetails',this.filterParams).then(res => {
        if(res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },

    // 监听输入
    handleInput() {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.filterParams.pageNum = 1
        this.getTableData()
      },300)
    },

    // 选择公司
    handleChange(val) {
      this.filterParams.allianceId = val
      this.filterParams.pageNum = 1
      this.getTableData()
    },

    // 改变条数
    handleSizeChange(val) {
      this.filterParams.pageSize = val 
      this.filterParams.pageNum = 1
      this.getTableData()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.filterParams.pageNum = val 
      this.getTableData()
    },
  }
}
</script>

<style lang="less" scope>
  .cargolist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 32px;

      // 圆圈
      .circle {
        display: inline-block;
        margin-right: 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .option-item {
        font-size: 14px;
        color: #2196F3;
        text-decoration: underline;
        &:hover {
          cursor: pointer;
        }
      }

      .add-reserve { 
        .head {
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #333333;
          margin: -10px 0 20px;
        }
      }

      .error-content {
        .title-wrap {
          margin-bottom: 20px;
          color: #000;
        }
      }

      .page {
        margin-top: 20px;
        text-align: right;
        height: .32rem;
      }
    }
  }
</style>
<style lang="less" scoped>
</style>