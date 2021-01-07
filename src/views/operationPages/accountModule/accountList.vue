<template>
  <div class="accountList">
    <page-content :name="$t('Account.AccountList')">
      <div class="content">
        <!-- 搜索类目 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="4">
            <div class="item-input">
              <!-- <div class="input-title">公司名称：</div> -->
              <el-input v-model="param.company" :placeholder="$t('Account.companyName')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="item-input">
              <!-- <div class="input-title">账号名称：</div> -->
              <el-input v-model="param.accountName" :placeholder="$t('Account.AccountName')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="item-input">
              <!-- <div class="input-title">角色类型</div> -->
              <el-select clearable style="flex: 1" v-model="param.roleId" :placeholder="$t('Account.RoleType')">
                <el-option
                  v-for="item in optionsArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="item-input">
              <!-- <div class="input-title">姓名：</div> -->
              <el-input v-model="param.realName" :placeholder="$t('Account.Name')" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">创建日期：</div> -->
           <el-date-picker
             style="flex:0.9"
              @change="changeTime"
              v-model="value3"
              type="datetimerange"
              :range-separator="$t('Account.to')"
              :start-placeholder="$t('Account.startDate')"
              :end-placeholder="$t('Account.EndDate')"
            ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="newAccount">{{$t('Account.new')}}</el-button>
              <el-button type="primary" @click="selectAccountList">{{$t('Account.search')}}</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column prop="accountName" :label="$t('Account.AccountName')"></el-table-column>
                <el-table-column  :label="$t('Account.Name')">
                  <template slot-scope="scope">
                    <span>{{scope.row.realName || '---'}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Account.companyName')">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.allianceBusiness"
                    >{{scope.row.allianceBusiness.allianceBusinessName}}</span>
                    <span v-else>总部</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Account.RoleType')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.role.roleName === 'ROLE_BUSINESS'">商家</span>
                    <span v-if="scope.row.role.roleName==='ROLE_SYSTEM_ADMIN'">系统管理员</span>
                    <span v-if="scope.row.role.roleName==='ROLE_HEADQUARTERS_ADMIN'">总部管理员</span>
                    <span v-if="scope.row.role.roleName==='ROLE_HEADQUARTERS_OPERATE'">总部运营</span>
                    <span v-if="scope.row.role.roleName==='ROLE_HEADQUARTERS_FINANCE'">总部财务</span>
                    <span v-if="scope.row.role.roleName==='ROLE_FRANCHISEE_ADMIN'">加盟商管理员</span>
                    <span v-if="scope.row.role.roleName==='ROLE_FRANCHISEE_OPERATE'">加盟商运营</span>
                    <span v-if="scope.row.role.roleName==='ROLE_FRANCHISEE_FINANCE'">加盟商财务</span>
                    <span v-if="scope.row.role.roleName==='ROLE_HEADQUARTERS_CODE'">标码中心</span>
                    <!-- <span v-if="scope.row.role.roleName==='ROLE_FRANCHISEE_FINANCE'">加盟商财务</span> -->
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Account.createTime')">
                  <template slot-scope="scope">
                    <span>{{scope.row.createTime || '---'}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Account.ProcessingStatus')">
                  <template slot-scope="scope">
                    <span class="circle-green" v-if="Number(scope.row.status)===1"></span>
                    <span
                      class="circle-red"
                      v-if="Number(scope.row.status)===0 || Number(scope.row.status)===2"
                    ></span>
                    <span v-if="Number(scope.row.status)===0">{{$t('Account.Abandoned')}}</span>
                    <span v-if="Number(scope.row.status)===1">{{$t('Account.normal')}}</span>
                    <span v-if="Number(scope.row.status)===2">{{$t('Account.Prohibit')}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="handle"  :label="$t('Account.operating')" width="200">
                  <template slot-scope="scope">
                    <el-button @click="pass(scope.row)" type="text" size="small">
                      <span v-if="Number(scope.row.status)===1">{{$t('Account.Prohibit')}}</span>
                      <span v-if="Number(scope.row.status)===2">{{$t('Account.Open')}}</span>
                    </el-button>
                    <el-button type="text" size="small" @click="handleClickEditor(scope.row.id)">{{$t('Account.edit')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <!--  -->
        <el-row v-if="info.total > 0">
          <el-col :span="24">
            <div class="page">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next"
                @current-change="change"
                @size-change="sizeChang"
                :total="Number(info.total)"
                :page-sizes="[10, 20, 30, 40]"
                :current-page.sync="pageNum"
                :page-size.sync="pageSize"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 编辑或新建 -->
      <el-dialog :title="paramId === 0?$t('Account.NewAccount'):$t('Account.AccountEdit')" :visible.sync="dialogVisibleNew" width="600px" :showClose="false" >
        <div class="accountList-newdia">
          <div class="item">
            <div class="item-title">
              {{$t('Account.AccountName')}}
              <span style="color:rgba(241, 0, 0, 1)">*</span>
            </div>
            <div>
              <el-input
                type="text"
                v-model="ParamData.accountName"
                :placeholder="$t('Account.format')"
                maxlength="20"
                show-word-limit
              ></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-title">
              {{$t('Account.Name')}}
              <span style="color:rgba(241, 0, 0, 1)">*</span>
            </div>
            <div>
              <el-input
                type="text"
                v-model="ParamData.realName"
                :placeholder="$t('Account.newName')"
                maxlength="20"
                show-word-limit
              ></el-input>
            </div>
          </div>
          <div class="item" v-if="disabledInput">
            <div class="item-title">
               {{$t('Account.companyName')}}
              <span style="color:rgba(241, 0, 0, 1)">*</span>
            </div>
            <div>
              <el-select
                clearable
                v-model="companyId"
                @change="changeCompanyId"
                :placeholder="$t('Account.selectCompany')"
              >
                <el-option
                  v-for="item in company1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="item-title">
                {{$t('Account.RoleType')}}
              <span style="color:rgba(241, 0, 0, 1)">*</span>
            </div>
            <div>
              <el-select clearable v-model="roleId" :placeholder="$t('Account.selectRoleType')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="item-title">
              {{$t('Account.department')}}
              <span style="color:rgba(241, 0, 0, 1)">*</span>
            </div>
            <div>
              <el-input v-model="ParamData.departmentName" :placeholder="$t('Account.selectdepartment')"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-title">
              {{$t('Account.telephoneNumber')}}
              <span style="color:rgba(241, 0, 0, 1)">*</span>
            </div>
            <div>
              <el-input v-model="ParamData.mobile" @blur="getCheckMobile" :placeholder="$t('Account.selectnumber')"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-title">
              {{$t('Account.UploadAvatar')}}
              <span style="color:rgba(241, 0, 0, 1)">*</span>
            </div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :data="imgData"
                :before-upload="beforeImgUpload"
                :on-success="onSuccess"
                :show-file-list="false"
              >
                <img v-if="ParamData.picUrl" :src="ParamData.picUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="accountList-footer">
          <div>
            <el-button type="danger" @click="addAdminaccountFound">{{paramId === 0? $t('Account.new'):  $t('Account.edit')}}</el-button>
            <el-button type="default" @click="dialogVisibleNew=false">{{$t('Account.cancel')}}</el-button>
          </div>
        </div>
      </el-dialog>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content.vue";
import exifs from "../../../assets/js/exifs.js";
import i18n from '../../../i18n/i18n';
export default {
  components: {
    pageContent
  },
  data() {
    return {
      dialogVisibleNew: false,
      dialogFormVisible: false,
      dialogFormedit: false,
      input: "",
      value3: [],
      pageSize: 10,
      pageNum: 1,
      param: {
        company: "",
        accountName: "",
        roleId: "",
        realName: "",
        startDate: "",
        endDate: ""
        // currentPage: 1,
        // pageSize: 10
      },
      optionsArr: [],
      value: "",
      tableData: [],
      info: {},
      imgData: {
        imgSystemId: "jms",
        imgSpecificUniqueValue: "jmsLogo"
      },
      roleId: "",
      company1: [
        {
          lebal: 0,
          value: "总部"
        },
        {
          lebal: "1",
          value: "加盟商"
        }
      ],
      companyId: "",
      accountType: "",
      options: [],
      paramId: "",
      disabledInput: false,
      ParamData: {
        accountName: "",
        realName: "",
        mobile: "",
        departmentName: "",
        picUrl: "",
        role: { id: "", headquarters: "" },
        allianceBusiness: {
          allianceBusinessId: ""
        }
      }
    };
  },
  created() {
    this.fetchParams();
    this.getAdminaccountList();
    this.getRolesAll();
    if (this.$localStore.get('roleJson').role.roleName === 'ROLE_HEADQUARTERS_ADMIN') {
        this.disabledInput = true
        this.getallianceBusiness()
      } else {
        this.companyId = mystorage.get(
          'roleJson'
        ).allianceBusiness.allianceBusinessName

        this.getRolesOne(1)
        // this.disabledInput = true;
      }
  },
  watch: {
    // param: {
    //   handler: function (val, oldVal) {
    //     this.selectAccountList()
    //   },
    //   deep: true
    // }
  },
  methods: {
    newAccount() {
      this.companyId=''
      this.roleId=''
      this.disabledInput=true
      this.dialogVisibleNew = true;
      this.paramId = 0;
      this.ParamData = {
        accountName: "",
        realName: "",
        mobile: "",
        departmentName: "",
        picUrl: "",
        role: { id: "", headquarters: "" },
        allianceBusiness: {
          allianceBusinessId: ""
        }
      };
    },

    getCheckMobile() {
      this.$get(
          "/back-end/merchant/checkMobile",
          {
            mobile: this.ParamData.mobile
          },
          false
        )
        .then(res => {
          // if ()
          this.mobileShow = res.data;
          if (res.data) {
            this.$common.error("该手机号已被使用了，请修改手机号码!");
          }
          // console.log(res.data)
        });
    },
    changeCompanyId() {
      // "1","ROLE_SYSTEM_ADMIN","系统管理员"
      // "2","ROLE_HEADQUARTERS_ADMIN","总部管理员"
      // "3","ROLE_HEADQUARTERS_OPERATE","总部运营"
      // "4","ROLE_HEADQUARTERS_FINANCE","总部财务"
      // "5","ROLE_FRANCHISEE_ADMIN","加盟商管理员"
      // "6","ROLE_FRANCHISEE_OPERATE","加盟商运营"
      // "7","ROLE_FRANCHISEE_FINANCE","加盟商财务"
      // "8","ROLE_BUSINESS","商家"
      if (
        this.$localStore.get("roleJson").role.roleName === "ROLE_HEADQUARTERS_ADMIN"
      ) {
        this.roleId = "";
        for (const iterator of this.company1) {
          if (iterator.value === this.companyId) {
            if (iterator.value === "总部") {
              this.getRolesId(0);
            } else {
              this.getRolesId(1);
            }
          }
        }
      }
    },
    // 上传图片前的事件
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const extension4 = testmsg === 'PNG'
      const extension5 = testmsg === 'JPG'
      const extension6 = testmsg === 'JPEG'
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message.error("上传图片只能是 png,jpg,jpeg 格式!");
        return false;
      } else {
        return new Promise(resolve => {
          exifs.getOrientation(file).then(orient => {
            console.log(orient, "Orient");
            if (
              orient !== "" &&
              orient !== 0 &&
              orient !== 1 &&
              orient !== undefined
            ) {
              // console.log('1111111')
              let reader = new FileReader();
              let img = new Image();
              reader.onload = e => {
                // console.log('2222222')
                img.src = e.target.result;
                img.onload = function() {
                  // console.log('333333')
                  const data = exifs.rotateImage(
                    orient,
                    img,
                    img.width,
                    img.height
                  );
                  const newFile = exifs.dataURLtoFile(data, file.name);
                  resolve(newFile);
                };
              };
              reader.readAsDataURL(file);
            } else {
              resolve(file);
            }
          });
        });
      }
      // if (!isLt2M) {
      //   this.$message.error('上传图片不能超过 5MB!')
      //   return false
      // }
      // return true
    },
    onSuccess(res) {
      if (res.code === 200) {
        this.ParamData.picUrl = res.data.imgUrl;
      } else {
        this.$common.error(res.data.desc);
      }
    },
    getDetail() {
      this.$get("/accountCenter/account/get/" + this.paramId)
        .then(data => {
          console.log("data",data)
          if (Number(data.statusCode) === 200) {
            let accountInfo = data.data;
            console.log("accountInfo", accountInfo);

            if (
              this.$localStore.get("roleJson").role.roleName ===
              "ROLE_HEADQUARTERS_ADMIN"
            ) {
              this.disabledInput = false;
              if (accountInfo.allianceBusiness) {
                this.ParamData.allianceBusiness.allianceBusinessId =
                  accountInfo.allianceBusiness.allianceBusinessId;
                this.getRolesOne(1);
                for (const iterator of this.company1) {
                  if (
                    iterator.lebel ===
                    this.ParamData.allianceBusiness.allianceBusinessId
                  ) {
                    this.companyId = iterator.value;
                  }
                }
              } else {
                this.companyId = "总部";
                this.ParamData.allianceBusiness.allianceBusinessId = 0;
                this.getRolesOne(0);
              }
            } else {
              this.disabledInput = true;
              this.companyId =
                accountInfo.allianceBusiness.allianceBusinessName;
              this.getRolesOne(1);
            }

            this.ParamData.accountName = accountInfo.accountName;
            this.ParamData.realName = accountInfo.realName;
            this.ParamData.mobile = accountInfo.mobile;
            this.ParamData.departmentName = accountInfo.departmentName;
            this.ParamData.picUrl = accountInfo.picUrl;
            this.ParamData.role.id = accountInfo.role.id;
            this.ParamData.role.headquarters = accountInfo.role.headquarters;
          }
        });
    },
    getallianceBusiness() {
      return new Promise((resolve, reject) => {
        this.$get("/back-end/allianceBusiness/getAll").then(data => {
          console.log(data);
          this.company1 = [
            {
              lebal: 0,
              value: "总部"
            }
          ];

          data.data.map(elment => {
            this.company1.push({
              value: elment.name,
              lebel: elment.id
            });
          });
        });
        resolve(true);
      });
    },
    //获取单条数据
    getRolesId(id) {
      return new Promise((resolve, reject) => {
        this.$get("/accountCenter/account/roleList/" + id).then(data => {
          this.options = [];
          data.data.map(elment => {
            this.options.push({
              value: elment.description,
              lebel: elment.id,
              headquarters: elment.headquarters
            });
          });
        });
        resolve(true);
      });
    },
    getRolesOne(id) {
      return new Promise((resolve, reject) => {
        this.$get("/accountCenter/account/roleList/" + id).then(data => {
          console.log(data);
          this.options = [];
          data.data.map(elment => {
            this.options.push({
              value: elment.description,
              lebel: elment.id,
              headquarters: elment.headquarters
            });
          });
          for (const iterator of this.options) {
            if (iterator.lebel === this.ParamData.role.id) {
              this.roleId = iterator.value;
            }
          }
        });
        resolve(true);
      });
    },
    addAdminaccountFound() {
      for (const iterator of this.company1) {
        if (iterator.value === this.companyId) {
          if (iterator.value === "总部") {
            this.ParamData.allianceBusiness.allianceBusinessId = 0;
          } else {
            this.ParamData.allianceBusiness.allianceBusinessId = iterator.lebel;
          }
        }
      }
      for (const iterator of this.options) {
        if (iterator.value === this.roleId) {
          this.ParamData.role.id = iterator.lebel
          this.ParamData.role.headquarters = iterator.headquarters
        }
      }
      this.ParamData.realName = this.ParamData.realName.replace(/\s*/g, "");
      this.ParamData.accountName = this.ParamData.accountName.replace(
        /\s*/g,
        ""
      );
      if (!this.ParamData.accountName) {
        this.$common.error(i18n.t('Account.AccountName'));
        // return false;
      } else if (!/^[a-zA-Z0-9]{1,20}$/.test(this.ParamData.accountName)) {
        this.$common.error(i18n.t('Account.format'));
      } else if (!this.ParamData.realName) {
        this.$common.error(i18n.t('Account.newName'));
        // return false;
      } else if (!this.ParamData.role.id) {
        this.$common.error(i18n.t('Account.selectRoleType'));
        // return false;
      } else if (!this.ParamData.departmentName) {
        this.$common.error(i18n.t('Account.selectdepartment'));
        // return false;
      } else if (!this.ParamData.mobile) {
        this.$common.error(i18n.t('Account.telephoneNumber'));
        // return false;
        // } else if () {
      } else {
        if (this.paramId) {
          this.ParamData.id = this.paramId;
          this.$post(
              "/accountCenter/account/update/" + this.paramId,
              this.ParamData
            )
            .then(data => {
              if (data.statusCode === 200) {
                this.$common.success(i18n.t('Account.editorSuccessfully'));
                // this.$router.go(-1);
                  this.dialogVisibleNew=false
                  this.getAdminaccountList()
              } else {
                this.$common.error(data.statusMsg);
              }
            });
        } else {
          this.$post("/accountCenter/account/add", this.ParamData)
            .then(data => {
              if (data.statusCode === 200) {
                this.$common.success(i18n.t('Account.newSuccessfully'));
                this.dialogVisibleNew=false
                this.getAdminaccountList()
              } else {
                this.$common.error(data.statusMsg);
              }
            });
        }
      }
      console.log(this.ParamData);
    },
    // 取出参数
    fetchParams() {
      let paramsData = this.$paramData.getItem();
      if (paramsData) {
        if (paramsData.title === i18n.t('Account.ManageAccountList') ) {
          this.param = paramsData.data;
          this.value3 = paramsData.time;
          this.pageNum = paramsData.pages.pageNum;
          this.pageSize = paramsData.pages.pageSize;
        }
      }
    },
    // 切换页码
    change(val) {
      console.log(val);
      this.pageNum = val;
      this.getAdminaccountList();
    },
    sizeChang(val) {
      this.pageSize = val;
      this.getAdminaccountList();
    },
    changeTime(val) {
      console.log( this.$moment(val[0]).format('YYYY-MM-DD HH:mm:ss'))
      if (val) {
        this.param.startDate = this.$moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
        this.param.endDate =this.$moment(val[1  ]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.param.startDate = "";
        this.param.endDate = "";
      }
    },
    // 获取账号列表
    getAdminaccountList() {
      var _param = {
        currentPage: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.param.accountName) {
        _param.accountName = this.param.accountName;
      }
      if (this.param.company) {
        _param.company = this.company;
      }
      if (this.param.realName) {
        _param.realName = this.param.realName;
      }
      if (this.param.roleId) {
        _param.roleId = this.param.roleId;
      }
      if (this.param.startDate) {
        _param.startDate = this.param.startDate;
      }
      if (this.param.endDate) {
        _param.endDate = this.param.endDate;
      }

      this.$post("/accountCenter/account/list", _param).then(data => {
        console.log(data);
        this.info = data.data;
        this.tableData = data.data.list;
      });
    },
    // 搜索账号列表
    selectAccountList() {
      this.pageNum = 1;
      this.pageSize = 10;
      var _param = {
        currentPage: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.param.accountName) {
        _param.accountName = this.param.accountName;
      }
      if (this.param.company) {
        _param.company = this.param.company;
      }
      if (this.param.realName) {
        _param.realName = this.param.realName;
      }
      if (this.param.roleId) {
        _param.roleId = this.param.roleId;
      }
      if (this.param.startDate) {
        _param.startDate = this.param.startDate;
      }
      if (this.param.endDate) {
        _param.endDate = this.param.endDate;
      }
      this.$post("/accountCenter/account/list", _param).then(data => {
        console.log(data)
        this.info = data.data;
        this.tableData = data.data.list;
      });
    },
    pass(row) {
      if (Number(row.status) === 2) {
        this.$confirm(i18n.t('Account.tips'), i18n.t('Account.tipsTitle'), {
          confirmButtonText: i18n.t('Account.confirm'),
          cancelButtonText:i18n.t('Account.cancel'),
          type: "warning"
        }).then(() => {
          this.$get(
              "/accountCenter/account/updateAccountStatus/" + row.id + "/" + 1
            )
            .then(res => {
              if (res.statusCode === 200) {
                this.$message({
                  type: "success",
                  message: i18n.t('Account.openSuccess')
                });
                this.getAdminaccountList();
              }
            });
        });
      } else if (Number(row.status) === 1) {
        this.$confirm(i18n.t('Account.tipsProhibit'), i18n.t('Account.tipsTitle'), {
          confirmButtonText: i18n.t('Account.confirm'),
          cancelButtonText: i18n.t('Account.cancel'),
          type: "warning"
        }).then(() => {
          this.$get(
              "/accountCenter/account/updateAccountStatus/" + row.id + "/" + 2
            )
            .then(res => {
              if (res.statusCode === 200) {
                this.$message({
                  type: "success",
                  message:  i18n.t('Account.ProhibitSuccess')
                });
                this.getAdminaccountList();
              }
            });
        });
      }
    },
    // 获取角色列表
    getRolesAll() {
      // let headquarters = 0
      // if (mystorage.get("roleJson").role.roleName === "ROLE_HEADQUARTERS_ADMIN") {
      //   headquarters=1
      // }
      this.$get("/accountCenter/account/roleList").then(data => {
        console.log(data) 
        this.options = [];
        data.data.map(elment => {
          
          console.log("data",elment)
          this.optionsArr.push({
            value: elment.id,
            label: elment.description
          });
        });
      });
    },
    // 存入参数
    paramsDataStorage() {
      let _paramData = {
        title:i18n.t('Account.ManageAccountList'),
        data: this.param,
        pages: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        time: this.value3
      };
      this.$paramData.setItem(_paramData);
    },
    async handleClickEditor(id) {
      this.dialogVisibleNew = true;
      this.paramId = id;
      // 公司设置权限
      if (
        this.$localStore.get("roleJson").role.roleName ===
        "ROLE_HEADQUARTERS_ADMIN"
      ) {
        this.disabledInput = true;
        this.getallianceBusiness();
      } else {
        this.companyId = this.$localStore.get(
          "roleJson"
        ).allianceBusiness.allianceBusinessName;

        this.getRolesOne(1);
        // this.disabledInput = true;
      }
      if (this.paramId) {
        await this.getDetail();
      }
      this.paramsDataStorage();
      // this.$router.push("/index/AdminaccountFound/" + id);
    },
    handleClick(a) {
      console.log(a);
    }
  }
};
</script>

<style lang="less" scoped>
.accountList {
  .content {
    margin-top: 22px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    // height: 7.82rem;
    padding: 20px;

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
  .accountList-newdia {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-input input {
      border: none;
      border-radius: 0;
    }
    /deep/.el-input__inner {
      border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
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
      .avatar-uploader .el-upload {
        margin-top: 16px;
        margin-left: 15px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .el-input__inner:focus {
      border-bottom-color: #409eff !important;
      outline: 0;
    }
  }
  .accountList-footer {
    margin-top: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.el-input input {
    border: none;
    border-radius: 0 !important;
  }
  /deep/.el-input__inner {
    border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
    padding: 0 !important;
  }
  /deep/ .el-cascader {
    width: 100%;
  }

  /deep/.el-range-editor {
    border: none;
  }
  /deep/.el-select {
    width: 100%;
  }
  /deep/.el-dialog__header {
    padding: 0 30px;
  }
  /deep/.el-dialog__body{
     padding: 10px 20px;
  }
  
}

/deep/.avatar-uploader .el-upload {
  // width: 100%;
  // height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>