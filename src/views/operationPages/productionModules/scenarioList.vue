<template>
  <div class="scenarioList">
    <page-content name="xxxxxxx商品生产场景">
      <div class="content">
        <!-- 场景名称 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <el-input v-model="input" placeholder="场景名称" style="flex: 1"></el-input>
              <el-button
                class="item-btn"
                type="primary"
                @click="handleAddGood"
                style="width: 130px; height: 40px;"
              >新建</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width:100%" height="500" stripe>
                <el-table-column prop="scenairoListName" label="场景名称" width="450"></el-table-column>
                <el-table-column prop="scenairoListSort" label="场景排序"></el-table-column>
                <el-table-column prop="scenairoListDescribe" label="场景描述" width="700"></el-table-column>
                <el-table-column prop="handle" label="操作" width="200">
                  <el-button type="text" size="small" @click="handleAddGood">编辑</el-button>
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
import pageContent from "../../../components/content.vue";
export default {
  components: {
    pageContent,
  },
  data() {
    return {
      input: "",
      pageNum: 1,
      pageSize: 10,
      tableData: [
        {
          scenairoListName: "场景名称1",
          scenairoListSort: 1,
          scenairoListDescribe:
            "电批螺丝刀飞奔入舞,生产,流水线快如闪电,工人辛苦辛苦,回家后披星带月…?",
        },
        {
          scenairoListName: "场景名称2",
          scenairoListSort: 2,
          scenairoListDescribe:
            "电批螺丝刀飞奔入舞,生产,流水线快如闪电,工人辛苦辛苦,回家后披星带月…?",
        },
        {
          scenairoListName: "场景名称1",
          scenairoListSort: 1,
          scenairoListDescribe:
            "电批螺丝刀飞奔入舞,生产,流水线快如闪电,工人辛苦辛苦,回家后披星带月…?",
        },
        {
          scenairoListName: "场景名称2",
          scenairoListSort: 2,
          scenairoListDescribe:
            "电批螺丝刀飞奔入舞,生产,流水线快如闪电,工人辛苦辛苦,回家后披星带月…?",
        },
        {
          scenairoListName: "场景名称1",
          scenairoListSort: 1,
          scenairoListDescribe:
            "电批螺丝刀飞奔入舞,生产,流水线快如闪电,工人辛苦辛苦,回家后披星带月…?",
        },
        {
          scenairoListName: "场景名称2",
          scenairoListSort: 2,
          scenairoListDescribe: "电批螺丝刀飞奔入舞,生产,流水线快如闪电,工人辛苦辛苦,回家后披星带月…?",
        },
      ],
      total: 1,
    };
  },
  methods: {
    // 取消按钮
    handleAddGood() {
      this.$router.push({ name: "create", params: { id: 10 } });
    },
    getList() {
      let _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$common
        .post("/back-end/allianceBusiness/select", _param)
        .then((res) => {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    // 选择条数
    handleSizeChange() {},
    // 选择页数
    handleCurrentChange() {},
    // 上传图片前的事件
    beforeImgUpload(file) {
      console.log(file);
    },
    // 上传图片成功是的事件
    onSuccess(res) {
      if (res.code == 200) {
        this.paramsNew.imgUrl = res.data.imgUrl;
      } else {
        this.$common.error(res.data.desc);
      }
    },
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
      margin-top: 32px;
      .item-btn {
        margin-top: 10px;
        margin-left: 36px;
      }
    }
    .page {
      margin-top: 20px;
      text-align: right;
      height: 0.32rem;
    }
    .list {
      margin-top: 42px;
    }
  }
}
</style>