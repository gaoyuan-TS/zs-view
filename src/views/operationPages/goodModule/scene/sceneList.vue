<template>
  <div class="scenarioList">
    <page-content :name="goodsName + '生产场景'">
      <div class="content">
        <!-- 场景名称 -->
        <el-row type="flex">
          <el-col :span="7">
            <div class="item-input">
              <el-input v-model="name" placeholder="场景名称" style="flex: 0.8" clearable></el-input>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="item-input item-button">
              <el-button
                class="item-btn"
                type="primary"
                @click="goNewScenarios"
              >新建</el-button>
            </div>
            
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width:100%" height="500" stripe>
                <el-table-column prop="name" label="场景名称"></el-table-column>
                <el-table-column prop="sceneSort" label="场景排序"></el-table-column>
                <el-table-column prop="description" label="场景描述"></el-table-column>
                <el-table-column prop="handle" label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="goEdit(scope.row.sceneId)">编辑</el-button>
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
import pageContent from "../../../../components/content.vue";
export default {
  components: {
    pageContent,
  },
  data() {
    return {
      goodsId: '',
      goodsName: '',
      name: '', // 场景名称
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
    };
  },
  watch: {
    name(newV, oldV) {
      this.pageNum = 1
      this.pageSize = 10
      this.getList()
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    this.goodsName = this.$route.query.goodName
    this.getList()
  },
  methods: {
    getList() {
      let _param = {
        goodsId: this.goodsId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if (this.name) {
        _param.name = this.name
      }
      this.$post('/trace-api/p_scene/pagingList', _param).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    // 选择条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    // 选择页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
    // 前往新建新建场景页面
    goNewScenarios() {
      this.$router.push({
        path: '/manage/goodList/newScene',
        query: {
          goodsId: this.goodsId,
          goodsName: this.goodsName
        }
      })
    },
    // 前往编辑商品页面
    goEdit(sid) {
      this.$router.push({
        path: '/manage/goodList/editScene',
        query: {
          goodsId: this.goodsId,
          goodsName: this.goodsName,
          sceneId: sid
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.scenarioList {
  .title {
    width: 148px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #333333;
    line-height: 22px;
  }
  .content {
    margin-top: 40px;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    .item-input {
      .item-btn {
        margin-left: 36px;
      }
    }
    .page {
      margin-top: 20px;
      text-align: right;
      /deep/.el-pagination {
        height: 100%;
        padding: 0;
      }
    }
    .list {
      margin-top: 42px;
    }
  }
}
</style>