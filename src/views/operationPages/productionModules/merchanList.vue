<template>
  <!-- 商家列表 -->
  <div class="merchanList">
    <page-content name="商家列表">
      <div class="content">
        <el-row type="flex" justify="space-between" :gutter="16">
          <el-col :span="6">
            <div class="item-input">
              <el-input v-model="input1" placeholder="商家名称" style="flex:1"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
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
          <el-col :span="12">
            <div class="item-input">
              <el-button
                class="item-btn"
                type="primary"
                style="width: 130px;
          height: 40px;"
              >新建</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width:100%" height="800" stripe>
                <el-table-column prop="productListName" label="商家名称"></el-table-column>
                <el-table-column prop="productListNumber" label="商家账号"></el-table-column>
                <el-table-column prop="productListDescribe" label="商家类型"></el-table-column>
                <el-table-column prop="createDate" label="创建日期"></el-table-column>
                <el-table-column prop="allianceBusinessStatus" label="状态">
                  <template slot-scope="scope">
                    <!-- {{scope.row.allianceBusinessStatus}} -->
                    <div
                      :class="Number(scope.row.allianceBusinessStatus)===0 ? 'circle-red' : 'circle-green'"
                    ></div>
                    <!-- <span class="circle-green" v-if="Number(scope.row.allianceBusinessStatus)===1"> {{Number(scope.row.allianceBusinessStatus)===0 ? "禁用":'正常'}}</span> -->
                    {{Number(scope.row.allianceBusinessStatus)===0? "禁用":'正常'}}
                  </template>
                </el-table-column>
                <el-table-column prop="CertificationStatus" label="认证状态">
                  <template slot-scope="scope">
                    <!-- {{scope.row.allianceBusinessStatus}} -->
                    <div
                      :class="Number(scope.row.CertificationStatus)===0? 'circle-red' : 'circle-green'"
                    ></div>
                    <!-- <span class="circle-green" v-if="Number(scope.row.allianceBusinessStatus)===1"> {{Number(scope.row.allianceBusinessStatus)===0 ? "禁用":'正常'}}</span> -->
                    {{Number(scope.row.CertificationStatus)===0? "未认证":'已认证'}}
                  </template>
                </el-table-column>
                <el-table-column prop="productListType" label="备注"></el-table-column>
                <el-table-column prop="handle" label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button
                      @click="handlerPass(scope.row)"
                      type="text"
                      size="small"
                      v-if="Number(scope.row.allianceBusinessStatus) === 0"
                    >开通</el-button>
                    <el-button
                      @click="handlerPass(scope.row)"
                      type="text"
                      size="small"
                      v-if="Number(scope.row.allianceBusinessStatus) === 1"
                    >禁止</el-button>
                    <el-button type="text" size="small">详情</el-button>
                    <el-button type="text" size="small">新建商品</el-button>
                    <el-button type="text" size="small">新建追溯</el-button>
                    <el-button type="text" size="small" @click="btnopen">招商信息</el-button>
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

      <!-- 新建弹窗 -->
      <el-dialog
        :visible.sync="dialogVisibleNew"
        :modal="false"
        width="20%"
        :show-close="false"
        style="margin-top:250px;margin-right:100px"
      >
        <div class="accountList">
          <div class="header">
            <span>招商信息展示</span>
          </div>

          <div class="item-txt" style="font-align:center;margin-top:29px">
            <span>是否展示招商信息？</span>
          </div>
          <div slot="footer" class="accountList-footer" style="margin-top:36px">
            <el-button type="primary" style="width:130px;height:40px">是</el-button>
            <el-button
              type="danger"
              style="margin-left:35px;width:130px;height:40px"
              @click="btnclose"
            >否</el-button>
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
      input: "",
      input1: "",
      pageNum: 1,
      pageSize: 10,
      total: 1,
      tableData: [
        {
          productListName: "富硒怀铁耙齿…",
          productListNumber: "sggdsagad123",
          productListDescribe: "类型1",
          createDate: "2019/09/01 13:12",
          allianceBusinessStatus: "1",
          CertificationStatus: "1",
          productListType: "暂无"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListNumber: "sggdsagad123",
          productListDescribe: "类型1",
          createDate: "2019/09/01 13:12",
          allianceBusinessStatus: "0",
          CertificationStatus: "1",
          productListType: "暂无"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListNumber: "sggdsagad123",
          productListDescribe: "类型1",
          createDate: "2019/09/01 13:12",
          allianceBusinessStatus: "0",
          CertificationStatus: "0",
          productListType: "暂无"
        },
        {
          productListName: "富硒怀铁耙齿…",
          productListNumber: "sggdsagad123",
          productListDescribe: "类型1",
          createDate: "2019/09/01 13:12",
          allianceBusinessStatus: "1",
          CertificationStatus: "1",
          productListType: "暂无"
        }
      ],
      dialogVisibleNew: false
    };
  },
  methods: {
    // 获取列表
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
    handleCurrentChange() {},
    btnopen() {
      this.dialogVisibleNew = true;
    },
    btnclose() {
      this.dialogVisibleNew = false;
    }
  }
};
</script>

<style lang="less" scoped>
.merchanList {
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
    .item-input {
      margin-top: 32px;
      .item-btn {
        margin-top: 10px;
        margin-left: 36px;
      }
    }
  }
  .el-dialog__body {
    padding: 0 20px 30px;
  }

  .accountList {
    .header {
      width: 126px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #333333;
      line-height: 22px;
    }
    .item-txt {
      width: 80%;
      text-align: center;
    }
  }
}
</style>