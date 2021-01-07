<template>
  <div class="cargolist">
    <page-content :name="$t('centerCode.reserved.labelReservation')">
      <div class="content">
        <!-- 标签 start-->
        <el-row type="flex" justify="space-between" class="tag-wrap">
          <el-col :span="7" class="tag" v-for="(item,index) in tagData" :key="index" :style="{'background' : item.bgColor}">
            <el-row class="tag-content" type="flex" align="middle">
              <img src="../../../assets/images/codeCenter/tag.png" alt="">
              <div class="desc-wrap">
                <div class="desc">{{item.desc}}</div>
                <div class="count">{{item.count}}</div>
              </div>
            </el-row>
          </el-col>
        </el-row>
        <!-- 标签 end -->


        <!-- 预留筛选 start-->
        <el-row type="flex" class="reserve-wrap" align="middle" style="margin-bottom:20px">
          <el-col :span="7" style="margin-right:36px">
            <div class="item-input">
              <!-- 预留码段开始 -->
              <div class="input-title" style="width:30%">{{$t('centerCode.reserved.reservedCodeSegment')}}</div>
              <el-input v-model="filterParams.startSid" @input="handleInput" :placeholder="$t('centerCode.reserved.startSid')" style="width:70%"></el-input>
            </div>
          </el-col>
          <el-col :span="7" style="margin-right:36px">
            <div class="item-input">
              <!-- 预留码段结束 -->
              <div class="input-title" style="width:30%">{{$t('centerCode.reserved.reservedCodeSegment')}}</div>
              <el-input v-model="filterParams.endSid" @input="handleInput" :placeholder="$t('centerCode.reserved.endSid')" style="width:70%"></el-input>
            </div>
          </el-col>
          <el-col :span="9" style="margin-right:36px">
            <div class="item-input">
              <!-- 预留日期 -->
              <div class="input-title" style="width:20%">{{$t('centerCode.reserved.reservationDate')}}</div>
              <el-date-picker v-model="pickTime" @change="handlePicker" type="datetimerange" :range-separator="$t('common.to')" 
              :start-placeholder="$t('common.startDate')" :end-placeholder="$t('common.endDate')"></el-date-picker>
            </div>
          </el-col>
        </el-row>
        <!-- 预留筛选 end-->

        <!-- 新建 -->
        <div class="item-input btn-wrap">
          <el-button type="primary" @click="dialogVisible = true">{{$t('button.new')}}</el-button>
        </div>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" stripe>
                <!-- 添加预留码段时间 -->
                <el-table-column :label="$t('centerCode.reserved.AddReservedCodeSegmentTime')">
                  <template slot-scope="{row}">
                    {{$common.timeStamp(row.createTime,1)}}
                  </template>
                </el-table-column>
                <!-- 预留数量 -->
                <el-table-column :label="$t('centerCode.reserved.reservedQuantity')" prop="enableCount"></el-table-column>
                <!-- 预留码段 -->
                <el-table-column :label="$t('centerCode.reserved.reservedCodeSegment')">
                  <template slot-scope="{row}">
                    {{row.sidStartIndex}} ---- {{row.sidEndIndex}}
                  </template>
                </el-table-column>
                <!-- 操作人员 -->
                <el-table-column :label="$t('centerCode.reserved.operator')" prop="accountName">
                  <template slot-scope="{row}">
                    {{row.accountName ? row.accountName : $t('common.empty')}}
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
                :page-sizes="[10, 20, 30, 40]" :current-page.sync="pageNum" :page-size.sync="pageSize"
                background layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
            </div>
          </el-col>
        </el-row>
 

        <!-- 新建预留 -->
        <el-dialog :visible.sync="dialogVisible" width="35%" :show-close="false" :close-on-click-modal="false">
          <div class="add-reserve">
            <div class="head">{{$t('button.new')}}</div>
            <div class="add-content" style="margin-top:40px">
              <!-- 预留数量 -->
              <el-input v-model="dialogParams.preCreateCount" :placeholder="$t('centerCode.reserved.reservedQuantity')" style="margin-bottom:40px"></el-input>
              <!-- <el-input v-model="dialogParams.code" placeholder="预留码段"></el-input> -->
            </div>
          </div>
          <div slot="footer" class="dialog-footer btn-wrap" style="text-align:center">
            <el-button type="primary" @click="handleConfirm" :disabled="!dialogParams.preCreateCount.trim()" style="margin-right:50px">{{$t('button.Comfirm')}}</el-button>
            <el-button @click="dialogVisible = false" style="background:#EF4235;color:#fff">{{$t('button.cancel')}}</el-button>
          </div>
        </el-dialog>
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
      tagData: [  // 标签数据
        {desc: this.$t('centerCode.reserved.freePaperLabels'),count: 100234,bgColor: '#E91E63'},  // 空闲纸质标签数
        {desc: this.$t('centerCode.reserved.paperLabelLoss'),count: 100,bgColor: '#00BCD4'},  // 纸质标签损耗数
        {desc: this.$t('centerCode.reserved.usedPaperLabels'),count: 6543,bgColor: '#8BC34A'},  // 已使用纸质标签数
      ],
      tableData: [],
      pickTime: '',
      filterParams: {  // 筛选参数
        startSid: "",  // 开始sid
        endSid: "",  // 结束sid
        startCreateTime: '',// 开始时间
        endCreateTime: ''  // 结束时间
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      timer: null,
      dialogParams: {  // 弹窗参数
        preCreateCount: "" // 预留数量
      },
      dialogVisible: false  // 控制弹窗显现
    }
  },
  created() {
    this.getLossPaperCount()
    this.getTableData()
  },
  methods: {
    initParams(obj) {
      let params = {}
      for(let key in obj) {
        if(obj[key]) {
          params[key] = obj[key]
        }
      }
      return params
    },

    // 获取，损耗纸质标签数，使用数，空闲数
    getLossPaperCount() {
      this.$get('/trace-api/trace/getLossPaperCount').then(res => {
        if(res.code === 200) {
          const { data } = res
          this.$set(this.tagData[0],'count',data.blankCount)
          this.$set(this.tagData[1],'count',data.lossCount)
          this.$set(this.tagData[2],'count',data.useCount)
        }
      })
    },

    initTableData() {
      this.pageNum = 1
      this.getTableData()
    },

    // 获取预留码段 表格信息
    getTableData() {
      let params = this.initParams(this.filterParams)
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      this.$get('/trace-api/trace/getByPageSids',params).then(res => {
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
        this.initTableData()
      },300)
    },

    // 选择日期
    handlePicker(time) {
      if(time) {
        this.filterParams.startCreateTime = time[0].getTime()
        this.filterParams.endCreateTime = time[1].getTime()
      }else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      this.initTableData()
    },

    // 点击确定
    handleConfirm() {
      this.$get('/trace-api/trace/preCreatePaperCode',this.dialogParams).then(res => {
        if(res.code === 200) {
          // 操作成功
          this.$common.success(this.$t('common.operateSuccessfully'))
        } else {
          this.$message.error(res.message)
        }
        this.dialogVisible = false
        this.initTableData()
      })
    },

    // 改变条数
    handleSizeChange(val) {
      this.pageSize = val
      this.initTableData()
    },
    // 改变页数
    handleCurrentChange(val) {
      this.pageNum = val
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

      .tag-wrap {
        margin-bottom: 52px;
        .tag {
          height: 80px;
          // background: #E91E63;
          color: #fff;
          padding: 0 25px;
          .tag-content {
            height: 100%;
            >img {
            width: 54px;
            height: 54px;
            }
            .desc-wrap {
              padding-left: 20px;
              .desc {
                font-size: 14px;
                margin-bottom: 5px;
                letter-spacing: 1px;
              }
              .count {
                font-size: 28px;
              }
            }
          }
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

      .page {
        margin-top: 20px;
        text-align: right;
        height: .32rem;
      }
    }
  }
</style>
<style lang="less" scoped>
/deep/.el-date-editor.el-input__inner {
  border: none;
  border-radius: 0!important;
  border-bottom: 1px solid #DCDFE6;
}
/deep/.el-dialog__body {
  padding: 0 30px 30px;
}
</style>