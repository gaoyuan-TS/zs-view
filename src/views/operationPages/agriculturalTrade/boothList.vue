<template>
  <div class="boothlist">
    <page-content name="摊位列表">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.stallNo" placeholder="摊位编号" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.assertNo" placeholder="设备编号" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">{{$t('common.date')}}</div>
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
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="newDiaolog = true">{{$t('button.new')}}</el-button>
              <el-button type="primary" @click="selectBoothList">搜索</el-button>
            </div>
          </el-col>
        </el-row>

        <div style="font-size: 16px">市场名称：{{merchantName}}</div>
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="摊位编号" prop="stallNo"></el-table-column>
                <el-table-column label="设备编号" prop="assertNo"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="摊位状态" prop="statusCN"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="compileOps(scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            
          </el-col>
        </el-row>
        <el-row>
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

      <!-- 新建摊位 -->
      <el-dialog :visible.sync="newDiaolog" width="382px" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">新建摊位</div>
        <div class="newdiaolog-con">
          <div class="item">
            <div>
              <el-input v-model="newDiaologFrom.stallNo" placeholder="摊位编号"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <div>
              <el-select placeholder="设备编号" v-model="newDiaologFrom.assertNo">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div slot="footer" class="add-footer">
          <div>
            <el-button type="primary" @click="newBooth">确 定</el-button>
            <el-button @click="newDiaolog = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 编辑摊位 -->
      <el-dialog :visible.sync="editDiaolog" width="382px">
        <div slot="title" style="font-size: 16px">编辑摊位</div>
        <div class="editdiaolog">
          <div class="item">
            <div class="item-title">摊位编号</div>
            <div>{{editDiaologFrom.stallNo}}</div>
          </div>

          <div class="item">
            <div>
              <el-select placeholder="设备编号" v-model="editDiaologFrom.assertNo">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div slot="footer" class="add-footer">
          <div>
            <el-button type="primary" @click="editBooth">确 定</el-button>
            <el-button @click="newDiaolog = false">取 消</el-button>
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
      merchantId: '',
      merchantName: '',
      pageNum: 1,
      pageSize: 10,
      params: {
        stallNo: '',
        assertNo: '',
        time: []
      },
      tableData: [],
      total: 0,
      options: [],
      newDiaolog: false,
      newDiaologFrom: {
        stallNo: '',
        assertNo: ''
      },
      editDiaolog: false,
      editDiaologFrom: {
        stallNo: '',
        stallId: '',
        assertNo: ''
      }
    }
  },
  created() {
    this.merchantId = this.$route.query.mid
    this.merchantName = this.$route.query.mName
    this.getFacilityNumList()
    this.getBoothList()
  },
  methods: {
    // 获取设备编号列表
    getFacilityNumList() {
      this.$get('/traceability_am/ae-scale/unboundScale/' + this.merchantId).then(res => {
        let _datalist = []
        res.data.forEach(item => {
          _datalist.push({
            value: item,
            label: item
          })
        })

        this.options = _datalist
      })
    },
    // 获取摊位列表
    getBoothList() {
      let _params = {
        merchantId: this.merchantId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }

      if (!this.params.stallNo) {
        _params.stallNo = this.params.stallNo
      }
      if (!this.params.assertNo) {
        _params.assertNo = this.params.assertNo
      }
      if (!this.params.time) {
        _params.startTime = this.params.time[0]
        _params.endTime = this.params.time[1]
      }

      this.$post('/traceability_am/m-stall/serch/list', _params).then(res => {
        this.tableData = res.data.stallListVos.list || []
        this.total = res.data.stallListVos.total || 0
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getBoothList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getBoothList()
    },
    // 搜索
    selectBoothList() {
      this.pageNum = 1
      this.pageSize = 10
      this.getBoothList()
    },
    // 新建摊主
    newBooth() {
      let _params = this.newDiaologFrom
      
      if (!(/^[a-zA-Z0-9-]{1,20}$/).test(_params.stallNo)) {
        this.$message.error('摊位编号只能输入数字字母和符号-')
        return false
      }
      if (!_params.stallNo) {
        this.$message.error('没有选择设备')
        return false
      }

      this.$post('/traceability_am/m-stall/createStall', _params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.newDiaolog = false
          this.newDiaologFrom = {
            stallNo: '',
            assertNo: ''
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 编辑按钮的事件
    compileOps(row) {
      this.editDiaologFrom.stallNo = row.stallNo
      this.editDiaologFrom.stallId = row.stallId
      this.editDiaologFrom.assertNo = row.assertNo
      this.getFacilityNumList()
      this.editDiaolog = true
    },
    // 编辑摊主
    editBooth() {
      let _params = {
        merchantId: this.merchantId,
        assertNo: this.editDiaologFrom.assertNo,
        stallId: this.editDiaologFrom.stallId
      }

      this.$post('/traceability_am/m-stall/editStall', _params).then(res => {
        if (res.code === 200) {
          this.$message.success('编辑成功')
          this.editDiaolog = false
          this.editDiaologFrom = {
            stallNo: '',
            stallId: '',
            assertNo: ''
          }
          this.getBoothList()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.el-select {
    width: 100%;
  }
  .boothlist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      padding: 20px;
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

  .add-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item {
    width: 100%;
    margin-top: 12px;
    .item-title {
      padding:  8px 0;
      color: rgba(128, 128, 128, 1);
      font-size: 12px;
      // margin-bottom: 12px;
    }
  }
</style>