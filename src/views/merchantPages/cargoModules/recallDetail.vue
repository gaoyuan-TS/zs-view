<template>
  <div class="recalldetail">
    <page-content name="处理详情">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <div style="font-size: 14px">召回批次号：{{productionBatchNo}}</div>
            
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">商品：{{goodsName}}</div>
            
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">召回数量：{{recallCount}}</div>
            
          </el-col>
          <el-col :span="5">
            <div style="font-size: 14px">未处理数量：{{undisposeCount}}</div>
            
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" align="middle" style="margin-top: 26px">
          <el-col :span="16">
            <div style="font-size: 14px">召回原因：{{cause}}</div>
          </el-col>

          <!-- <el-col :span="5">
            <div class="item-input">
              <el-button type="primary" @click="addDispose">新建</el-button>
            </div>
            
          </el-col> -->
        </el-row>

        <div class="dealwith-deal" v-for="(item, idx) in ddvList" :key="idx">
          <el-row>
            <el-col :span="24" style="font-size: 14px">
              <div class="item-input">
                处理方式：{{item.disposeTypeCN}}
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="5" style="font-size: 14px">
              <div class="item-input">
               {{item.disposeType === 0 ? ' 销毁数量' : '处理数量'}}：{{item.disposeTypeCN}}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item-input" style="font-size: 14px">
                {{item.disposeType === 0 ? '销毁人员' : '处理人员'}}：{{item.employeName}}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item-input" style="font-size: 14px">
                {{item.disposeType === 0 ? '销毁日期' : '处理日期'}}：{{item.disposeTimeScope}}
              </div>
            </el-col>
            <el-col :span="7">
              <div class="item-input" style="font-size: 14px">
                {{item.disposeType === 0 ? '销毁地点' : '处理地点'}}：{{item.disposeSite}}
              </div>
            </el-col>
          </el-row>
          <el-row v-if="item.disposeType === 1">
            <el-col :span="24">
              处理说明： {{item.description}}
            </el-col>
          </el-row>
          <div class="item" style="margin-top: 30px">
            <div style="font-size: 14px">{{item.disposeType === 0 ? '销毁的批次追溯码段' : '处理的批次追溯码段'}}：</div>
            <div class="clicktitle" style="margin-left: 7px" @click="dowmnloadExcel(item.excelFileUrl)">
              下载excel表
            </div>
          </div>
        </div>
        
        
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
      recallId: '',
      productionBatchNo: '', // 生产批次号
      goodsName: '', // 商品名称
      recallCount: '', // 召回数量
      undisposeCount: '', // 未处理数量
      cause: '', // 原因
      ddvList: []
    }
  },
  created() {
    this.recallId = this.$route.query.id
    this.getDisposeDetail()
  },
  methods: {
    // 获取处理的结果详情
    getDisposeDetail() {
      this.$get('/trace-api/recall/disposeDetail/' + this.recallId).then(res => {
        this.productionBatchNo = res.data.productionBatchNo
        this.goodsName = res.data.goodsName
        this.recallCount = res.data.recallCount
        this.undisposeCount = res.data.undisposeCount
        this.cause = res.data.cause

        this.ddvList = res.data.ddvList || []
      })
    },
    dowmnloadExcel(excelFileUrl) {
      this.$confirm('此操作将会下载Excel，是否继续', '提示', {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel')
      }).then(() => {
        window.location.href = excelFileUrl
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .recalldetail {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
      min-height: 500px;


      .dealwith-deal {
        border: 1px solid #DDDDDD;
        padding: 25px 14px;
        margin-top: 20px;
        .item {
          display: flex;
          align-items: center;

          .clicktitle {
            color: #2196F3;
            font-size: 14px;
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
      
    }
  }
</style>