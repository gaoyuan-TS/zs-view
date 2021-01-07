<template>
  <!-- 加盟商列表 -->
  <div class="allianceBusinessList">
    <page-content name="加盟商列表">
      <div class="content">
        <!-- 搜索类目 -->
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">{{$t('allianceBusinessList.companyName')}}：</div> -->
              <el-input v-model="param.companyName"  :placeholder="$t('allianceBusinessList.enterCompany')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">状态：</div> -->
              <!-- <el-input placeholder="状态" style="flex: 1"></el-input> -->
       
              <el-select style="flex: 1" v-model="param.status" clearable :placeholder="$t('allianceBusinessList.status')">
                <el-option
                  v-for="item in optionsArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">所在地：</div> -->
              <el-cascader
                :placeholder="$t('allianceBusinessList.selectLoction')"
                @change="changeAdress"
                clearable
                v-model="selectOptions"
                :show-all-levels="true"
                :options="Cascader"
                :props="{
                label: 'name',
                value: 'id',
               childre:'children'
              }"
              ></el-cascader>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">{{$t('common.date2')}}</div>
              <el-date-picker
                style="flex: 1"
                @change="changeDateTime"
                v-model="value3"
                type="datetimerange"
                :range-separator="$t('allianceBusinessList.to')"
                :start-placeholder="$t('allianceBusinessList.startDate')"
                :end-placeholder="$t('allianceBusinessList.EndDate')"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="dialogVisibleNew = true;allianceBusinessId=''">{{$t('button.new')}}</el-button>
              <el-button type="primary" @click="selectList">{{$t('allianceBusinessList.search')}}</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column prop="allianceBusinessName" :label="$t('Account.companyName')"></el-table-column>
                <el-table-column :label="$t('allianceBusinessList.location')">
                  <template slot-scope="scope">
                    <!-- <el-collapse accordion>
                      <el-collapse-item name="1">
                        <template slot="title">
                          <div class="desctitle">{{scope.row.araeName[0]}}</div>
                        </template>
                        <div v-for="(item, idx) in scope.row.araeName" :key="idx">
                          {{item}}
                        </div>
                      </el-collapse-item>
                    </el-collapse>-->
                    <el-popover placement="right" trigger="click">
                      <div class="araeName-con">
                        <div v-for="(item, idx) in scope.row.araeName" :key="idx">{{item}}</div>
                      </div>

                      <el-button type="text" slot="reference">{{scope.row.araeName[0]}}</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column prop="allianceBusinessEnterTime" :label="$t('allianceBusinessList.createTime')"></el-table-column>
                <el-table-column prop="allianceBusinessStatus" :label="$t('allianceBusinessList.ProcessingStatus')">
                  <template slot-scope="scope">
                    <span class="circle-red" v-if="Number(scope.row.allianceBusinessStatus)===0"></span>
                    <span class="circle-green" v-if="Number(scope.row.allianceBusinessStatus)===1"></span>
                    {{scope.row.allianceBusinessStatus===0? $t('allianceBusinessList.Prohibit'):$t('allianceBusinessList.normal')}}
                  </template>
                </el-table-column>
                <el-table-column prop="handle" :label="$t('allianceBusinessList.operating')" width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="handlerPass(scope.row)"
                      type="text"
                      size="small"
                      v-if="Number(scope.row.allianceBusinessStatus) === 0"
                    >{{$t('allianceBusinessList.Open')}}</el-button>
                    <el-button
                      @click="handlerPass(scope.row)"
                      type="text"
                      size="small"
                      v-if="Number(scope.row.allianceBusinessStatus) === 1"
                    >{{$t('allianceBusinessList.Prohibit')}}</el-button>
                    <el-button type="text" size="small" @click="handleEdtor(scope.row)">{{$t('allianceBusinessList.edit')}}</el-button>
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
      <!-- 新建弹窗 -->
      <el-dialog :visible.sync="dialogVisibleNew" :show-close="false" :close-on-click-modal="false">
        <div slot="title" style="font-size: 16px">{{$t('allianceBusinessList.newDialogTitle')}}</div>
        <div>
          <div class="item">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div>
              <el-input
                type="text"
                v-model="allianceBusinessName"
                :placeholder="$t('allianceBusinessList.franchisee')"
                maxlength="20"
                show-word-limit
              ></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 40px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>所在地：</div> -->
            <div>
              <el-cascader
                :options="Cascader"
                collapse-tags
                :props="{
                multiple: true,
                label: 'name',
                value: 'id',
                childre:'children'
              }"
                v-model="cityList"
                @change="handleChange($event)"
              >
                <template slot-scope="{ node, data }">
                  <span>{{data.name}}</span>
                </template>
              </el-cascader>
            </div>
          </div>
            <div class="item" style="margin-top: 40px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商描述：</div> -->
            <div>
              <el-input
                type="textarea"
                :rows="4"
                maxlength="100"
                show-word-limit
                v-model="companyDescription"
                :placeholder="$t('allianceBusinessList.description')"
              ></el-input>
            </div>
          </div>
        </div>
          <div class="item" style="margin-top: 40px">
            <div class="item-title">
              <span style="color:rgba(241, 0, 0, 1)">*</span>{{$t('allianceBusinessList.certificate')}}:
            </div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :data="imgData"
                :on-success="handleSuccess"
                :show-file-list="false"
                :before-upload="beforeImgUpload"
              >
                <img v-if="businessLicenseUrl" :src="businessLicenseUrl" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
              </el-upload>
            </div>
          </div>
        

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button
              type="danger"
              @click="confirm"
            >{{Number(this.allianceBusinessId) === 0? $t('allianceBusinessList.new'): $t('allianceBusinessList.edit')}}</el-button>
            <el-button type="default" @click="dialogVisibleNew=false">{{$t('allianceBusinessList.cancel')}}</el-button>
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
      total: 0, // 返回来的总商品数
      pageNum: 1, // 当前页数
      pageSize: 10, // 当前页的条数
      Cascader: [],
      dialogFormVisible: false,
      dialogFormedit: false,
      input: "",
      value3: [],
      chaseform: {
        resource: "",
        count: ""
      },
      optionsArr: [
        {
          value: "0",
          label: i18n.t('allianceBusinessList.Prohibit')
        },
        {
          value: "1",
          label:i18n.t('allianceBusinessList.normal')
        }
      ],
      value: "",
      tableData: [],
      param: {
        companyName: null,
        status: null,
        administrativeAreasId: null,
        // pageNum: 1,
        // pageSize: 10,
        enterStart: null,
        enterEnd: null
      },
      currentPage4: 1,
      // allianceBusinessId: "1", // 加盟商id
      selectOptions: [],
      allianceBusinessName: "", // 加盟商
      cityList: [], // 存放默认值
      options: {}, // 存放城市数据,
      Cascader: [],
      companyDescription: "",
      businessLicenseUrl: "",
      allianceBusinessId: "",
      //   上传图片附带的参数
      imgData: {
        imgSystemId: "allianceBusiness",
        imgSpecificUniqueValue: "allianceBusinessId"
      },
      dialogVisibleNew: false
    };
  },
  watch: {
    // param: {
    //   deep: true,
    //   handler: function (newV, oldV) {
    //     this.selectList()
    //   }
    // }
  },
  created() {
    this.fetchParams();
    this.getList();
    this.getaddress();
  },
  methods: {
    handleGetDetail() {
      return new Promise((resolve, reject) => {
        this.$get("/back-end/allianceBusiness/get?allianceBusinessId=" + this.allianceBusinessId
        ).then(res => {
          console.log(res);
          // this.Cascader = data.data.data
          this.allianceBusinessName = res.data.allianceBusinessName;
          this.cityList = res.data.siteList;
          this.businessLicenseUrl = res.data.businessLicenseUrl;
          this.companyDescription = res.data.companyDescription;
        });
        resolve(true);
      });
    },
    // 上传图片前的事件
    beforeImgUpload(file) {
      console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const extension4 = testmsg === 'PNG'
      const extension5 = testmsg === 'JPG'
      const extension6 = testmsg === 'JPEG'
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message.error(i18n.t('allianceBusinessList.picFormat'));
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
    // 上传图片
    handleSuccess(res) {
      console.log(res);
      if (Number(res.code) === 200) {
        this.businessLicenseUrl = res.data.imgUrl;
      } else {
        this.$message.error(res.data.desc);
      }
    },
    handleChange(e, data) {
      // console.log(data)
      console.log(this.cityList);
    },
    // 新建或更新
    confirm() {
      this.allianceBusinessName = this.allianceBusinessName.replace(/\s*/g, "");
      if (!this.allianceBusinessName) {
        this.$message.error(i18n.t('allianceBusinessList.selectFranchisee'));
        // return false;
      } else if (!this.cityList.length > 0) {
        this.$message.error(i18n.t('allianceBusinessList.selectLoction'));
        // return false;
      } else if (!this.businessLicenseUrl) {
        this.$message.error(i18n.t('allianceBusinessList.upLatecertificate'));
        // return false;
      } else if (!this.companyDescription) {
        this.$message.error(i18n.t('allianceBusinessList.certificateDesc'));
        // return false;
      } else {
        if (Number(this.allianceBusinessId) === 0) {
          let param = {
            allianceBusinessName: this.allianceBusinessName,
            businessLicenseUrl: this.businessLicenseUrl,
            companyDescription: this.companyDescription,
            cityList: this.cityList
          };
          this.$post("/back-end/allianceBusiness/insert", param)
            .then(res => {
              if (Number(res.code) === 200) {
                this.$message.success(res.data.desc);
                this.selectList()
                 this.dialogVisibleNew=false
                // this.$router.push("/index/AdminfranchseeList");
              } else {
                this.$message.error(res.desc);
              }
            });
        } else {
          let param = {
            allianceBusinessName: this.allianceBusinessName,
            businessLicenseUrl: this.businessLicenseUrl,
            companyDescription: this.companyDescription,
            cityList: this.cityList,
            allianceBusinessId: this.allianceBusinessId
          };
          this.$post("/back-end/allianceBusiness/update", param)
            .then(res => {
              if (Number(res.code) === 200) {
                this.$message.success(res.desc);
                // this.$router.push("/index/AdminfranchseeList");
               this.selectList()
               this.dialogVisibleNew=false
              } else {
                this.$message.error(res.desc);
              }
            });
        }
      }
    },
    // 获取地址联动
    getSiteDetail() {
      return new Promise((resolve, reject) => {
        this.$get("/agent/site/data").then(data => {
          // console.log(data)
          this.Cascader = data.data;
        });
        resolve(true);
      });
    },
    fetchParams() {
      let _paramsData = this.$paramData.getItem();
      if (_paramsData) {
        if (_paramsData.title === "管理加盟商列表") {
          this.pageNum = _paramsData.pages.pageNum;
          this.pageSize = _paramsData.pages.pageSize;
          this.param = _paramsData.data;
          this.selectOptions = _paramsData.time;
        }
      }
    },
    // 跳转编辑页面
   async handleEdtor(row) {
      console.log(row);
      this.dialogVisibleNew = true
      this.paramDataStore();
      this.allianceBusinessId  =row.allianceBusinessId
        await this.getSiteDetail()
        // 获取商品详情
        // this.allianceBusinessId = this.$route.params.allianceBusinessId
        if (Number(this.allianceBusinessId) > 0) {
          this.handleGetDetail()
    }
      // this.$router.push("/index/AdminfranchseeFound/" + row.allianceBusinessId);
    },
    handleAddressFun: function(e, form, thsAreaCode) {
      // thsAreaCode = this.form.areaCode    // 注意1：获取value值
      let thsAreaCode1 = this.$refs["cascaderAddr"].currentLabels; // 注意2： 获取label值
      alert(thsAreaCode1); // 注意3： 最终结果是个一维数组对象
    },
    changeAdress(adressArr) {
      if (adressArr.length === 1) {
        this.$message.error(i18n.t('allianceBusinessList.selectAddress'));
        return false;
      }
      if (adressArr.length === 2) {
        this.$message.error(i18n.t('allianceBusinessList.selectAddress'));
        return false;
      }
      if (adressArr.length === 0) {
        this.param.administrativeAreasId = null;
      } else {
        this.param.administrativeAreasId = adressArr[adressArr.length - 1];
      }
      console.log(adressArr);
    },
    getaddress() {
      this.$get("/agent/site/three").then(data => {
        console.log(data);
        if (data.code === 20000) {
          this.Cascader = data.data;
        } else {
          this.Cascader = [];
        }
      });
    },
    changeDateTime(val) {
      if (val) {
        this.param.enterStart = `${this.$common.timeTamp(
          +new Date(val[0]),
          1
        )}`;
        this.param.enterEnd = `${this.$common.timeTamp(+new Date(val[1]), 1)}`;
      } else {
        this.param.enterStart = "";
        this.param.enterEnd = "";
      }
    },
    handleSizeChange(e) {
      // console.log(e)
      this.param.pageSize = Number(e);
      this.getList();
      // let data = {
      //   // merchantId: this.merchantId,
      //   pageNum: this.pageNum,
      //   pageSize: this.pageSize
      // };
      // return new Promise(resolve => {
      //   this.$common.post("/api/back-end/merchantStall/select", data).then(res => {
      //     this.tableData = res.data.data.list;
      //   });
      //   resolve(true);
      // });
    },
    // 页码
    handleCurrentChange(e) {
      // console.log(e)
      this.param.pageNum = Number(e);
      this.getList();
      // let data = {
      //   merchantId: this.merchantId,
      //   pageNum: this.pageNum,
      //   pageSize: this.pageSize
      // };
      // return new Promise(resolve => {
      //   this.$common.post("/back-end/allianceBusiness/select", data).then(res => {
      //     this.tableData = res.data.data.list;
      //   });
      //   resolve(true);
      // });
    },
    // 开通
    handlerPass(e) {
      this.$confirm(i18n.t('allianceBusinessList.tips'), i18n.t('allianceBusinessList.tipsTitle'), {
        confirmButtonText: i18n.t('allianceBusinessList.confirm'),
          cancelButtonText:i18n.t('allianceBusinessList.cancel'),
        type: "warning"
      }).then(() => {
        this.$get(
            "/back-end/allianceBusiness/switch?allianceBusinessId=" +
              e.allianceBusinessId
          )
          .then(res => {
            // console.log(res)
            this.getList();
          });
      });
    },
    // 撤回
    handleClick(a) {
      this.$confirm(i18n.t('allianceBusinessList.tips'), i18n.t('allianceBusinessList.tipsTitle'), {
      confirmButtonText: i18n.t('allianceBusinessList.confirm'),
      cancelButtonText:i18n.t('allianceBusinessList.cancel'),
        type: "warning"
      }).then(() => {
        this.$get(
            "/back-end/allianceBusiness/switch?allianceBusinessId=" +
              a.allianceBusinessId
          )
          .then(res => {
            // console.log(res)
            this.getList();
          });
      });
    },
    // 获取列表
    getList() {
      // this.param.pageNum = 1
      // this.param.pageSize = 10
      var _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.param.companyName) {
        _param.companyName = this.param.companyName;
      }
      if (this.param.status) {
        _param.status = this.param.status;
      }
      if (this.param.administrativeAreasId) {
        _param.administrativeAreasId = this.param.administrativeAreasId;
      }
      if (this.param.enterStart) {
        _param.enterStart = this.param.enterStart;
      }
      if (this.param.enterEnd) {
        _param.enterEnd = this.param.enterEnd;
      }
      this.$post("/back-end/allianceBusiness/select", _param).then(data => {
        console.log(data);
        this.total = data.data.total;
        this.tableData = [];
        let _data = data.data || {};
        if (_data) {
          this.tableData = _data.list;
        }
      });
    },
    // 搜索列表
    selectList() {
      this.pageNum = 1;
      this.pageSize = 10;
      var _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.param.companyName) {
        _param.companyName = this.param.companyName;
      }
      if (this.param.status) {
        _param.status = this.param.status;
      }
      if (this.param.administrativeAreasId) {
        _param.administrativeAreasId = this.param.administrativeAreasId;
      }
      if (this.param.enterStart) {
        _param.enterStart = this.param.enterStart;
      }
      if (this.param.enterEnd) {
        _param.enterEnd = this.param.enterEnd;
      }
      this.$post("/back-end/allianceBusiness/select", _param).then(data => {
        console.log(data);
        this.total = data.data.total;
        this.tableData = [];
        let _data = data.data || {};
        if (_data) {
          this.tableData = _data.list;
        }
      });
    },
    // 存入参数
    paramDataStore() {
      let _paramData = {
        title: "管理加盟商列表",
        data: this.param,
        pages: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        time: this.selectOptions
      };
      this.$paramData.setItem(_paramData);
    },
    // 跳转到新建代理商页面
    toAdminfranchsee() {
      this.paramDataStore();
      this.$router.push("/index/AdminfranchseeFound/0");
    }
  }
};
</script>

<style lang="less" scoped>
.allianceBusinessList {
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
.accountList-newdia {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  .el-input input {
    border: none;
    border-radius: 0;
  }
  /deep/.el-input__inner {
    border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
    padding: 0;
  }

  .el-cascader {
    width: 100%;
  }
  .item {
    width: 80%;
    margin-top: 12px;
    .item-title {
      // padding: 0 15px;
      color: rgba(128, 128, 128, 1);
      font-size: 12px;
      // margin-bottom: 12px;
    }
    .avatar-uploader .el-upload {
      margin-top: 16px;
      // margin-left: 15px;
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
.avatar-uploader {
  object-fit: contain;
}
.avatar-uploader .el-upload {
  width: 100%;
  height: 100%;
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
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
.accountList-footer {
  margin-top: 18px;
  display: flex;
  justify-content: center;
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
/deep/.el-textarea__inner {
  border: none;
}
/deep/.el-textarea__inner {
  border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
  padding: 0;
}

/deep/.el-range-editor {
  border: none;
}
</style>