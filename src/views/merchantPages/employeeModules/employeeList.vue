<template>
  <div class="employeelist">
    <page-content :name="$t('Employees.title')">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">公司名称：</div> -->
              <el-input v-model="subParam.realName" :placeholder="$t('Employees.employeeName')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">公司名称：</div> -->
              <el-input v-model="subParam.mobile" :placeholder="$t('Employees.PhoneNumber')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="dialogVisibleNew = true">{{$t('button.new')}}</el-button>
              <!-- <el-button type="primary">搜索</el-button> -->
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column prop="realName" :label="$t('Employees.realName')"></el-table-column>
                <el-table-column prop="accountName" :label="$t('Employees.accountName')"></el-table-column>
                <el-table-column prop="mobile" :label="$t('Employees.mobile')"></el-table-column>
                <el-table-column prop="createTime" :label="$t('Employees.dataTitle')"></el-table-column>
                <el-table-column prop="status" :label="$t('Employees.Status')">
                  <template slot-scope="scope">
                    <span class="circle-green" v-if="scope.row.status === 1"></span>
                  <span class="circle-red" v-if="scope.row.status === 2 || scope.row.status === 0 || scope.row.status === 3"></span>
                    <span style="margin-left: 4px" v-if="Number(scope.row.status)===0">{{$t('Employees.Status0')}}</span>
                    <span style="margin-left: 4px" v-if="Number(scope.row.status)===1">{{$t('Employees.Status1')}}</span>
                    <span style="margin-left: 4px" v-if="Number(scope.row.status)===2">{{$t('Employees.Status2')}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="operation" :label="$t('Employees.Operation')">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      slot="reference"
                      @click="pass(scope.row)"
                    >{{scope.row.status === 1 ? $t('Employees.Status2') : $t('Employees.ops2')}}</el-button>
                    <!-- <el-button
                    type="text"
                    size="small"
                    slot="reference"
                    @click="clickcompile"
                    >编辑</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- 分页 -->
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
      <el-dialog :visible.sync="dialogVisibleNew" :show-close="false" :close-on-click-modal='false'>
        <div slot="title" style="font-size: 16px">
          {{$t('Employees.newDialogTitle')}}
        </div>
        <div>
          <div class="item">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div>
              <el-input :placeholder="$t('Employees.newDialogAccount')" v-model="newParams.accountName"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 40px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div>
              <el-input :placeholder="$t('Employees.newDialogEmployee')" v-model="newParams.realName"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 40px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div>
              <el-input :placeholder="$t('Employees.newDialogPhone')" v-model="newParams.mobile"></el-input>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="insetAccout">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="dialogVisibleNew = false">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      subParam: {
        realName: '',
        mobile: ''
      },
      total: 0,
      tableData: [],
      dialogVisibleNew: false,
      newParams: {
        accountName: '',
        realName: '',
        mobile: '',
        role: {
          id: 9,
          headquarters: 2
        }
      }
    };
  },
  watch: {
    subParam: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.getStaffList()
      }
    }
  },
  created() {
    this.getStaffList()
  },
  methods: {
    // 获取员工列表
    getStaffList() {
      var _param = {
        mobile: this.subParam.mobile,
        realName: this.subParam.realName,
        currentPage: this.pageNum,
        pageSize: this.pageSize
      }
      this.$post('/accountCenter/account/subMerchantList', _param).then(res => {
        if (res.statusCode === 200) {
          this.total = res.data.total
          this.tableData = res.data.list
        } else {
          this.total = 0
          this.tableData = []
        }
      })
    },
    // 选择条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getStaffList() 
    },
    // 选择页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getStaffList()
    },
    // 改变账号状态
    pass(row) {
      if (Number(row.status) === 2) {
        this.$confirm(this.$t('Employees.normalTitle'), this.$t('confirm.tip'), {
          confirmButtonText: this.$t('button.determine'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          this.$get(
            '/accountCenter/account/updateAccountStatus/' + row.id + '/' + 1
          ).then(res => {
            if (res.statusCode === 200) {
              this.$message({
                type: 'success',
                message: this.$t('Employees.normalTip')
              })
              this.getStaffList()
            }
          })
        })
      } else if (Number(row.status) === 1) {
        this.$confirm(this.$t('Employees.forbidTitle'), this.$t('confirm.tip'), {
          confirmButtonText: this.$t('button.determine'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          this.$get('/accountCenter/account/updateAccountStatus/' + row.id + '/' + 2).then(res => {
            if (res.statusCode === 200) {
              this.$message({
                type: 'success',
                message: this.$t('Employees.forbidTip')
              })
              this.getStaffList()
            }
          })
        })
      }
    },
    // 新建员工账号
    insetAccout() {
      let _params = this.newParams
      if (!_params.accountName) {
        // 账号名称不能为空！
        this.$message.error(this.$t('Employees.newAccountNameError'))
        return false
      }
      if (!(/^[a-zA-Z0-9]{1,20}$/).test(_params.accountName)) {
        // this.$message.error('账号名称只能输入大小写字母和数字！')
        this.$message.error(this.$t('Employees.newAccountNameType'))
        return false
      }

      if (!_params.realName) {
        // this.$message.error('员工姓名不能为空！')
        this.$message.error(this.$t('Employees.newRealNameError'))
        return false
      }
      if (!_params.mobile) {
        // this.$message.error('手机号码不能为空！')
        this.$message.error(this.$t('Employees.newMobileError'))
        return false
      }

      this.$post('/accountCenter/account/add', _params).then(res => {
        if (res.statusCode === 200) {
          this.$message.success(this.$t('Employees.newAccountSuccess'))
          this.dialogVisibleNew = false
          this.getStaffList()
          this.newParams = {
            accountName: '',
            realName: '',
            mobile: '',
            role: {
              id: 9,
              headquarters: 2
            }
          }
        } else {
          this.$message.error(res.statusMsg)
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色
/deep/.el-input input {
  border: none;
  border-radius: 0 !important;
}
/deep/.el-input__inner {
  border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
  padding: 0 !important;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.employeelist {
  .content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    // height: 7.82rem;
    padding: 20px;

    .page {
      margin-top: 20px;
      text-align: right;
      height: 0.32rem;
    }
  }
}
.circle-green {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #58eb00;
  margin: 1px;
}
.circle-red {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: @zs_color;
  margin: 1px;
}
</style>