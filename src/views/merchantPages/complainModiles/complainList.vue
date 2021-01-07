<template>
  <div class="complainList">
    <page-content name="投诉模块/投诉列表">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">追随码SID：</div>
              <el-input v-model="param.sid" placeholder="追随码SID" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">处理状态：</div>
              <el-select clearable style="flex: 1" v-model="param.processStatus" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">生产批次：</div>
              <el-input v-model="param.proBatch" placeholder="生产批次" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">商品名称：</div>
              <el-input v-model="param.proName" placeholder="商品名称" style="flex: 1"></el-input>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">创建日期：</div>
              <el-date-picker
                style="flex: 1"
                v-model="param.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="item-input item-button">
              <!-- <el-button type="primary" @click="dialogVisibleNew = true">新建</el-button> -->
              <el-button type="primary">搜索</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="商品名称"></el-table-column>
                <el-table-column label="生产批次号"></el-table-column>
                <el-table-column label="追溯码Sid"></el-table-column>
                <el-table-column label="创建时间"></el-table-column>
                <el-table-column label="处理状态"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">投诉详情</el-button>
                    <el-button type="text" size="small">回复</el-button>
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
        sid: '',
        processStatus: '',
        proBatch: '',
        proName: '',
        time: []
      },
      options: [],
      tableData: [],
      total: 1,
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    // 改变条数
    handleSizeChange() {

    },
    // 改变页数
    handleCurrentChange() {

    },
  }
}
</script>

<style lang="less" scope>
  .complainList {
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