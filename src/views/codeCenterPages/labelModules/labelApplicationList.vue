<template>
  <div class="cargolist">
    <page-content name="标签审核">
      <div class="content">
        <!-- 筛选 start-->
        <el-row type="flex" class="filter-wrap" align="middle">
          <el-input v-model="filterParams.name" placeholder="商家名称" style="width:20%;margin-right:25px"></el-input>
          
          <el-select v-model="filterParams.barcode" placeholder="追溯批次" style="width:20%;margin-right:25px">
            <el-option label="选择一" value="选择一"></el-option>
            <el-option label="选择二" value="选择二"></el-option>
          </el-select>
          
          <el-select v-model="filterParams.status" placeholder="处理状态" style="width:20%;margin-right:25px">
            <el-option label="选择一" value="选择一"></el-option>
            <el-option label="选择二" value="选择二"></el-option>
          </el-select>
          
          <el-date-picker v-model="filterParams.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-row>
        <!-- 筛选 end-->

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="申请日期" prop="addTime"></el-table-column>
                <el-table-column label="申请数量" prop="count"></el-table-column>
                <el-table-column label="申请类型" prop="type"></el-table-column>
                <el-table-column label="商家名称" prop="name"></el-table-column>
                <el-table-column label="追溯码批次号">
                  <template slot-scope="{row}">
                    {{!row.barcode ? '暂无' : row.barcode}}
                  </template>
                </el-table-column>
                <el-table-column label="审批时间" prop="approvalTime"></el-table-column>
                <el-table-column label="处理状态" width="100">
                  <template slot-scope="{row}">
                    <span class="circle" :style="{'background': row.status == '已通过' ? '#00FD32' : '#FFBE00'}"></span>
                    {{row.status}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{row}">
                    <div v-if="row.status === '待审核'">
                      <span class="option-item" @click="editDialogVisible=true">编辑</span>
                      <span class="option-item" style="margin:0 10px" @click="adoptDialogVisible=true">通过</span>
                      <span class="option-item" @click="handleReject">拒绝</span>
                    </div>
                    <div v-if="row.status === '已通过'">
                      <span class="option-item">录入</span>
                      <span class="option-item" style="margin:0 10px">记录</span>
                      <span class="option-item" @click="handleExport">导出</span>
                    </div>
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


        <!-- 通过申请 弹窗 -->
        <el-dialog :visible.sync="adoptDialogVisible" width="35%" :show-close="false" :close-on-click-modal="false">
          <div class="dialog-main">
            <div class="head">通过申请<small style="color:#EF4235">（该商家免费额度10000已经用完）</small></div>
            <div class="add-content" style="margin-top:40px">
              <div class="content-item" v-for="(item,index) in adoptDialogParams" :key="index">
                <el-input v-model="item.startSID" placeholder="输入起始码段sid" style="margin-bottom:40px;width:90%"></el-input>
                <el-input v-model="item.endSID" placeholder="输入结束码段sid" style="width:90%"></el-input>
                <div style="font-size:14px;color:#333;margin-top:25px;letter-spacing:1px">实际码数：10000</div>
                <i class="el-icon-circle-plus operate-icon" v-if="index === adoptDialogParams.length-1" @click="handleAdd"></i>
                <i class="el-icon-remove operate-icon" style="color:#EF4235" v-else @click="handleRemove(index)"></i>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer btn-wrap" style="display:flex;justify-content:center;margin-top:40px">
            <el-button type="primary" @click="errorDialogVisible = true" style="margin-right:50px">确 定</el-button>
            <el-button @click="adoptDialogVisible = false" style="background:#EF4235;color:#fff">取 消</el-button>
          </div>
        </el-dialog>

        <!-- 编辑弹窗 -->
         <el-dialog :visible.sync="editDialogVisible" width="35%" :show-close="false" :close-on-click-modal="false">
          <div class="dialog-main">
            <div class="head">编辑<small style="color:#EF4235">（当前免费的纸质标签数量为： 100000 张）</small></div>
            <div class="edit-content" style="margin-top:40px">
              <el-input v-model="edditDialogParams.count" placeholder="申请数量" style="margin-bottom:18px"></el-input>
              <div class="content-item">
                <div class="title">公司名称</div>
                <div class="desc">{{edditDialogParams.company}}</div>
              </div>
              <div class="content-item">
                <div class="title">商家名称</div>
                <div class="desc">{{edditDialogParams.name}}</div>
              </div>
              <div class="content-item">
                <div class="title">标签类型</div>
                <div class="radio-wrap">
                  <div class="circle-item" v-for="(item,index) in ['电子标签','纸质标签']" :key="index" @click="changeTagType(item,index)">
                    <div class="circle">
                      <div class="active" v-show="currentTagType === index"></div>
                    </div>
                    <div class="desc">{{item}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer btn-wrap" style="display:flex;justify-content:center;">
            <el-button type="primary" @click="errorDialogVisible = true" style="margin-right:50px">确 定</el-button>
            <el-button @click="editDialogVisible = false" style="background:#EF4235;color:#fff">取 消</el-button>
          </div>
        </el-dialog>

        <!-- 错误提示 弹窗 -->
         <el-dialog :visible.sync="errorDialogVisible" width="25%" :show-close="false" :close-on-click-modal="false">
         <div class="error-content">
           <div class="title-wrap">
             <i class="el-icon-error" style="font-size:16px;margin-right:18px"></i>
             <span style="font-size:16px;font-weight:bold;">错误提示！</span>
           </div>
           <div class="desc" style="font-size:13px;padding-left:35px">输入的实际码数不能小于客户的标签申请量</div>
         </div>
          <div slot="footer" class="dialog-footer btn-wrap" style="display:flex;justify-content:center;">
            <el-button @click="errorDialogVisible = false" style="background:#EF4235;color:#fff;font-size:13px;letter-spacing:1px">我知道了</el-button>
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

      tableData: [  // 表格数据
        {
          addTime: '2016-09-05 15:00',
          count: '500000',
          type: '纸质标签',
          name: "娃哈哈集团",
          barcode: "2019187878888",
          approvalTime: "2019/09/09 16:40:13",
          status: '已通过'
        },
         {
          addTime: '2016-09-05 15:00',
          count: '500000',
          type: '纸质标签',
          name: "娃哈哈集团",
          barcode: "",
          approvalTime: "2019/09/09 16:40:13",
          status: '待审核'
        },
         {
          addTime: '2016-09-05 15:00',
          count: '500000',
          type: '纸质标签',
          name: "娃哈哈集团",
          barcode: "2019187878888",
          approvalTime: "2019/09/09 16:40:13",
          status: '已通过'
        },
         {
          addTime: '2016-09-05 15:00',
          count: '500000',
          type: '纸质标签',
          name: "娃哈哈集团",
          barcode: "",
          approvalTime: "2019/09/09 16:40:13",
          status: '待审核'
        }
      ],
      filterParams: {  // 筛选参数
        name: "",  // 商家名称
        barcode: "",  // 追溯批次
        status: "",  // 处理状态
        time: ""  // 时间
      },
      adoptDialogVisible: false,  // 控制通过弹窗显现
      errorDialogVisible: false,  // 控制错误弹窗显现
      editDialogVisible: false,  // 控制编辑弹窗显现
      adoptDialogParams: [ // 通过弹窗参数
         {
          startSID: "",  // 起始码段sid
          endSID: "",  //  结束码段sid
          count: 10000
        },
      ],
      edditDialogParams: {
        count: "",  // 申请数量
        company: "总部",  //  公司名称
        name: "建材", // 商家名称,
        tagType: ""  // 标签类型
      },
      currentTagType: 0, // 记录当前的标签类型
      pageNum: 1,
      pageSize: 10,
      total: 1
    }
  },
  methods: {
    // 点击拒绝
    handleReject() {
      this.$confirm('是否确认要拒绝该批次', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('决绝成功')
      }).catch(() => {
        console.log('决绝失败')          
      });
    },

    // 点击导出
    handleExport() {
      this.$confirm('此操作将下载追溯码文件', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        console.log('下载成功')
      }).catch(() => {
        console.log('下载失败')          
      });
    },

    // 点击通过 - 增加
    handleAdd() {
      this.adoptDialogParams.push({
        startSID: "",  // 起始码段sid
        endSID: "",  //  结束码段sid
        count: 10000
      })
    },

    // 点击通过 - 移除
    handleRemove(index) {
      this.adoptDialogParams.splice(index,1)
    },


    // 编辑弹窗 - 选择标签类型
    changeTagType(item,index) {
      this.currentTagType = index
      this.edditDialogParams.tagType = item
    },

    handleSizeChange() {

    },
    // 改变页数
    handleCurrentChange() {

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

      .dialog-main { 
        .head {
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #333333;
          margin: -10px 0 20px;
        }

        .content-item {
          position: relative;
          margin-bottom: 40px;
          .operate-icon {
            top: 20px;
            right: 0;
            position: absolute;
            font-size: 22px;
            color: #2196F3;
            &:hover {
              cursor: pointer;
            }
          }
        }

        .edit-content {
          .content-item {
            margin-bottom: 28px;
            .title {
              font-size: 13px;
              font-weight: normal;
              color: #808080;
              margin-bottom: 10px;
            }
            .desc {
              font-size: 14px;
              color: #333;
            }

            .radio-wrap {
              display: flex;
              .circle-item {
                display: flex;
                align-items: center;
                margin-right: 36px;
                &:hover {
                  cursor: pointer;
                }
                .circle {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 13px;
                  height: 13px;
                  border: 1px solid #979797;
                  border-radius: 100%;
                  margin-right: 10px;
                  .active {
                    display: flex;
                    justify-content: center;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #979797;
                  }
                }
              }
            }
          }
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
/deep/.el-date-editor.el-input__inner {
  border: none;
  border-radius: 0!important;
  border-bottom: 1px solid #DCDFE6;
}
/deep/.el-dialog__body {
  padding: 0 30px 30px;
}
</style>