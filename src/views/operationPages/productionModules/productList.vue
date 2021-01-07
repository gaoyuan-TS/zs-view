<template>
  <!-- 商品列表 -->
  <div class="productList">
    <page-content name="商品列表">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <el-input v-model="txt" placeholder="场景名称" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <el-select v-model="input" placeholder="商品名称">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="13">
            <div class="item-input">
              <el-button class="item-btn" type="primary" style="width: 130px;
height: 40px;">新建</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width:100%" height="800" stripe>
                <el-table-column prop="productListName" label="商品名称"></el-table-column>
                <el-table-column prop="productListSort" label="商品类型"></el-table-column>
                <el-table-column prop="productListDescribe" label="商家名称"></el-table-column>
                <el-table-column prop="productListType" label="商家类型"></el-table-column>
                <el-table-column prop="handle" label="操作" width="200">
                  <el-button type="text" size="small" @click="scenarios">生产场景</el-button>
                  <el-button type="text" size="small" @click="distribution ">销售渠道</el-button>
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

      <!-- 新建弹窗 -->
      <el-dialog
        :visible.sync="dialogVisibleNew"
        width="25%"
        :modal="false"
        style="margin-top:200px;margin-right:200px"
        :show-close="false"
      >
        <div class="accountList-newdia">
          <span class="accountList-head">销售渠道</span>
          <div class="item">
            <el-input v-model="input1" placeholder="天猫" style="margin-top:33px"></el-input>
          </div>
          <div class="item">
            <el-input v-model="input2" placeholder="京东"></el-input>
          </div>
          <div class="item">
            <el-input v-model="input3" placeholder="淘宝"></el-input>
          </div>
          <div slot="footer" class="accountList-footer" style="margin-top:33px">
            <el-button type="primary" style="width:120px;">确定</el-button>
            <el-button type="danger" style="margin-left: 56px;width:120px" @click="btnclose">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content.vue";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "1"
        },
        {
          value: "选项2",
          label: "2"
        }
      ],
      txt: "",
      input: "",
      input1: "",
      input2: "",
      input3: "",
      pageNum: 1,
      pageSize: 10,
      tableData: [
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListSort: "类型1",
          productListDescribe: "商家1",
          productListType: "商家类型1"
        }
      ],
      total: 1,
      dialogVisibleNew: false
    };
  },
  methods: {
    distribution() {
      this.dialogVisibleNew = true;
    },
    scenarios() {
      this.$router.push({ name: "scenarioList", params: { id: 10 } });
    },
    btnclose() {
      this.dialogVisibleNew = false;
    },
    getList() {
      let _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$common
        .post("/back-end/allianceBusiness/select", _param)
        .then(res => {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    // 选择条数
    handleSizeChange() {},
    // 选择页数
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
.productList {
  .content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    padding: 20px;
    .page {
      margin-top: 20px;
      text-align: right;
      height: 0.32rem;
    }
  }
  .accountList-newdia {
    .accountList-head {
      width: 64px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #333333;
      line-height: 22px;
    }
    .el-input input {
      border: none;
      border-radius: 0;
    }
    /deep/.el-input__inner {
      border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
      padding: 0;
    }
    .item {
      width: 80%;
      margin-top: 12px;
      margin-left: 16px;
    }
    .el-input__inner:focus {
      border-bottom-color: #409eff !important;
      outline: 0;
    }
  }
  .accountList-footer {
    display: flex;
    justify-content: center;
  }
}
</style>