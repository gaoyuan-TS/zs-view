<template>
  <div class="agentlist">
    <page-content :name="$t('Agent.agentTitle')">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.agentName" :placeholder="$t('Agent.agentName')" clearable></el-input>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <el-select clearable v-model="params.agentStatus" :placeholder="$t('Agent.status')">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="5">
            <div class="item-input">
              <el-select class="disPlayFlex1" clearable v-model="params.agentPath" :placeholder="$t('Agent.sourceMode')">
                <el-option
                  v-for="item in pathList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="6">
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

        <el-row type="flex" justify="end" style="margin-top: 20px">
          <el-col :span="3">
            <div class="item-input item-button">
              <el-button type="primary" @click="newAgentDialog = true">{{$t('button.new')}}</el-button>
              <!-- <el-button type="primary">搜索</el-button> -->
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column prop="agentName" :label="$t('Agent.agentName')"></el-table-column>

                <el-table-column :label="$t('Agent.sourceMode')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.agentPath === 1">{{$t('Agent.indCreate')}}</span>
                    <span v-if="scope.row.agentPath === 2">{{$t('Agent.sechatRecom')}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="agentContact" :label="$t('Agent.contactPerson')" ></el-table-column>
                <el-table-column prop="agentCpntactNumber" :label="$t('Agent.phone')" ></el-table-column>
                <el-table-column prop="createTime" :label="$t('Agent.creatDate')" ></el-table-column>

                <el-table-column :label="$t('Agent.status')" width="150">
                  <template slot-scope="scope">
                    <span class="circle-green" v-if="scope.row.agentStatus === '1'"></span>
                    <span v-if="scope.row.agentStatus === '1'">{{$t('Agent.normal')}}</span>
                    <span class="circle-red" v-if="scope.row.agentStatus === '0'"></span>
                    <span v-if="scope.row.agentStatus === '0'">{{$t('Agent.Prohibit')}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('common.Operation')" width="150">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.agentStatus === '1'"
                      @click="setAgentStatus(0, scope.row.merchantAgentId)"
                    >{{$t('Agent.Prohibit')}}</el-button>
                    <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.agentStatus === '0'"
                      @click="setAgentStatus(1, scope.row.merchantAgentId)"
                    >{{$t('Agent.open')}}</el-button>
                    <el-button type="text" size="small" @click="getAgentDetail(scope.row.merchantAgentId)">{{$t('button.edit')}}</el-button>
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
                @size-change="handPageSize"
                @current-change="handPageNum"
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

      <!-- 新建代理商  弹窗 -->
      <el-dialog :visible.sync="newAgentDialog" width="40%" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">{{$t('Agent.newAgentDialog.newAgent')}}</div>
        <div class="newAgentDialog-con">
          <div class="item">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.contactPho')" v-model="newAgentParams.agentCpntactNumber" @blur="getaccountMobile"></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.contactPer')" v-model="newAgentParams.agentContact"></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.agentName')" v-model="newAgentParams.agentName"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.agentAlias')" v-model="newAgentParams.agentAnotherName"></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px; display: flex; align-items: center;">
            <div style="flex: 1">
              <el-cascader
                :placeholder="$t('Agent.newAgentDialog.region')"
                v-model="newAgentParams.fourthAdministrationId"
                :options="siteList"
                :props="props"
                style="width: 100%"
              >
              </el-cascader>
            </div>

            <div style="margin-left: 10px"> — </div>
            <div style="margin-left: 10px;  flex: 1">
              <el-input :placeholder="$t('Agent.newAgentDialog.detaAddress')" v-model="newAgentParams.agentDetailSite"></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px;">
            <div>
              <el-input type="textarea" :placeholder="$t('Agent.newAgentDialog.agentDesc')" v-model="newAgentParams.agentDescription" maxlength="100" :show-word-limit="true"></el-input>
            </div>
          </div>

          <div class="upload-item">
            <div class="upload-item-title">{{$t('Agent.newAgentDialog.agentBus')}}：</div>
            <el-upload
              action="https://zs.cntracechain.com/imageService/image/addBatch"
              :data="upData"
              list-type="picture-card"
              multiple
              :file-list="images"
              name="files"
              :on-success="upimg"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="beforeImgUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="newAndEditAgent(1)">{{$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancelDialog(1)">{{$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>

      <!-- 编辑代理商 弹窗 -->
      <el-dialog :visible.sync="editAgentDialog" width="40%" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">{{$t('Agent.newAgentDialog.agentBus')}}</div>
        <div class="newAgentDialog-con">
          <div class="item">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.contactPho')" v-model="newAgentParams.agentCpntactNumber" @blur="getaccountMobile" disabled></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.contactPer')" v-model="newAgentParams.agentContact"></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.agentName')" disabled v-model="newAgentParams.agentName"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 30px">
            <div>
              <el-input :placeholder="$t('Agent.newAgentDialog.agentAlias')" v-model="newAgentParams.agentAnotherName"></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px; display: flex; align-items: center;">
            <div style="flex: 1">
              <el-cascader
                :placeholder="$t('Agent.newAgentDialog.region')"
                v-model="newAgentParams.fourthAdministrationId"
                :options="siteList"
                :props="props"
                style="width: 100%"
              >
              </el-cascader>
            </div>

            <div style="margin-left: 10px"> — </div>
            <div style="margin-left: 10px;  flex: 1">
              <el-input :placeholder="$t('Agent.newAgentDialog.detaAddress')" v-model="newAgentParams.agentDetailSite"></el-input>
            </div>
          </div>

          <div class="item" style="margin-top: 30px;">
            <div>
              <el-input type="textarea" :placeholder="$t('Agent.newAgentDialog.agentDesc')" v-model="newAgentParams.agentDescription" maxlength="100" :show-word-limit="true"></el-input>
            </div>
          </div>

          <div class="upload-item">
            <div class="upload-item-title">{{$t('Agent.newAgentDialog.agentBus')}}：</div>
            <el-upload
              action="https://zs.cntracechain.com/imageService/image/addBatch"
              :data="upData"
              list-type="picture-card"
              multiple
              :file-list="images"
              name="files"
              :on-success="upimg"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="beforeImgUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="newAndEditAgent(2)">{{$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="cancelDialog(2)">{{$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>
    </page-content>
  </div>
</template>

<script>
import pageContent from '../../../components/content'

import exifs from '../../../assets/js/exifs.js'
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '',
      merchantAgentId: '', // 编辑所需要的代理商ID
      pageNum: 1,
      pageSize: 10,
      params: {
        agentName: '',
        agentPath: '',
        agentStatus: '',
        time: ''
      },
      statusList: [
        {
          value: 1,
          label: this.$t('Agent.normal')
        },
        {
          value: 0,
          label: this.$t('Agent.Prohibit')
        }
      ],
      pathList: [
        {
          value: 1,
          label: this.$t('Agent.indCreate')
        },
        {
          value: 2,
          label: this.$t('Agent.sechatRecom')
        }
      ],
      tableData: [],
      total: 0,
      siteList: [],
      newAgentDialog: false, // 新建代理商弹窗 状态
      editAgentDialog: false,
      newAgentParams: {
        agentCpntactNumber: '', // 代理商联系电话
        agentContact: '', // 代理商联系人
        agentName: '', // 代理商名称
        agentAnotherName: '', // 代理商别名
        fourthAdministrationId: [], // 地区
        agentDetailSite: '', // 详细地址
        agentDescription: '', // 代理商详细描述
      },
      upData: {
        imgSystemId: 'agent',
        imgSpecificUniqueValue: 'agentCodeImg'
      }, // 上传图片是所需要的参数
      images: [], // 证件图片
      dialogVisible: false,
      dialogImageUrl: '',
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
    }
  },
  watch: {
    params: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getAgentList()
      }
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    console.log(roleJson)
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getAgentList()
    this.getSiteList()
  },
  methods: {
    // 获取代理商列表
    getAgentList() {
      let _params = {
        agentName: this.params.agentName,
        agentPath: this.params.agentPath,
        agentStatus: this.params.agentStatus
      }
      
      if (this.params.time) {
        _params.start = this.param.time[0]
        _params.end = this.param.time[1]
      }
      this.$post('/agent/merchantAgent/search/page?pageNum=' + this.pageNum +'&pageSize=' + this.pageSize + '&merchantId=' +this.merchantId, _params).then(res => {
        this.tableData = res.data.data || []
        this.total = res.data.num || 0
      })
    },
    handPageSize(val) {
      this.pageSize = val
      this.getAgentList()
    },
    handPageNum(val) {
      this.pageNum = val
      this.getAgentList()
    },
    // 修改代理商状态
    setAgentStatus (type, id) {
      if (type === 1) {
        this.$confirm(this.$t('Agent.statusConfirmJz'), {
          confirmButtonText: this.$t('button.determine'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true
        }).then(() => {
          this.$get('/agent/merchantAgent/status', {
              agentStatus: 1,
              merchantAgentId: id
            })
            .then(res => {
              console.log(res.data)
              this.getAgentList()
            })
        }).catch(() => {
          
        })
      } else if (type === 0) {
        this.$confirm(this.$t('Agent.statusConfirmTg'), {
          confirmButtonText: this.$t('button.determine'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning',
          center: true
        }).then(() => {
          console.log(id)
          this.$get('/agent/merchantAgent/status', {
              agentStatus: 0,
              merchantAgentId: id
            }).then(res => {
              console.log(res.data)
              if (res.code === 20000) {
                this.$message.success(res.message)
                this.getAgentList()
                // _this.getAgentList()
              } else {
                this.$message.error(res.message)
              }
            })
        }).catch(() => {

        })
      }
    },
    // 获取全部地址
    getSiteList () {
      this.$get('/agent/site/data').then((res) => {
        // console.log(res.data)
        this.siteList = res.data
      })
    },
    // 根据代理商手机号码查询代理商信息
    getaccountMobile() {
      this.$get('/agent/merchantAgent/accountMobile', {
        mobile: this.newAgentParams.agentCpntactNumber
      }).then(res => {
        if (res.code === 20000) {
          console.log(res)
          this.newAgentParams.agentContact = res.data.agentContact
          this.newAgentParams.agentName = res.data.agentName
          this.newAgentParams.agentAnotherName = res.data.agentAnotherName
          this.newAgentParams.fourthAdministrationId = res.data.fourthAdministrationId
          this.newAgentParams.agentDetailSite = res.data.agentDetailSite
          this.newAgentParams.agentDescription = res.data.agentDescription

          if (res.data.agentPapersUrl) {
            let _imgs = res.data.agentPapersUrl
            _imgs.forEach((item, idx) => {
              this.images.push({
                name: idx + 1,
                url: item
              })
            });
          }
        }
      })
    },
    /**
     * 新建代理商
     *  上传图片
     */
    upimg(response, file, fileList) {
      var _image = {
        'url': response.data[0].imgUrl
        // "imageIndex": this.imageIndex
      }
      this.images.push(_image)
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].imageIndex = i
      }
    },
    // 上传图片组件：预览图片功能
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传图片组件：删除图片功能
    handleRemove(file, fileList) {
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].url === file.url) {
          this.images.splice(i, 1)
        }
      }
    },
    // 上传图片组件：上传成功前的钩子
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const extension4 = testmsg === 'PNG'
      const extension5 = testmsg === 'JPG'
      const extension6 = testmsg === 'JPEG'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message.error('上传图片只能是 png,jpg,jpeg 格式!')
        return false
      } else {
        return new Promise(resolve => {
          exifs.getOrientation(file).then(orient => {
            console.log(orient, 'Orient')
            if (orient !== '' && orient !== 0 && orient !== 1 && orient !== undefined) {
              // console.log('1111111')
              let reader = new FileReader()
              let img = new Image()
              reader.onload = (e) => {
                // console.log('2222222')
                img.src = e.target.result
                img.onload = function () {
                  // console.log('333333')
                  const data = exifs.rotateImage(orient, img, img.width, img.height)
                  const newFile = exifs.dataURLtoFile(data, file.name)
                  resolve(newFile)
                }
              }
              reader.readAsDataURL(file)
            } else {
              resolve(file)
            }
          })
        })
      }
    },
    /**
     * 新建或编辑代理商
     * type:
     *  为1时: 新建
     *  为2时：编辑
     */
    newAndEditAgent(type) {
      let _params = this.newAgentParams
      if (this.images.length > 0) {
        var _images = []
        this.images.forEach((item, idx) => {
          _images.push(item.url)
        })
        _params.agentPapersUrl = _images
      } else {
        _params.agentPapersUrl = this.images
      }

      if (!_params.agentCpntactNumber) {
        this.$message.error('请填写代理商联系电话')
        return false
      }

      if (!_params.agentContact) {
        this.$message.error('请填写代理商联系人')
        return false
      }

      if (!_params.agentName) {
        this.$message.error('请填写代理商的名称')
        return false
      }

      if (!_params.agentAnotherName) {
        this.$message.error('请填写代理商的别名')
        return false
      }

      if (!_params.fourthAdministrationId) {
        this.$message.error('请选择代理商所在的地区')
        return false
      }

      if (!_params.agentDetailSite) {
        this.$message.error('请填写代理商的详细地址')
        return false
      }

      if (!_params.agentDescription) {
        this.$message.error('请填写该代理商的描述')
        return false
      }

      if(type === 1) {
          this.$post('/agent/merchantAgent/save?merchantId='+this.merchantId, _params).then(res => {
          if (res.code === 20000) {
            this.$message.success(res.message)
            this.newAgentDialog = false
            this.newAgentParams = {
              agentCpntactNumber: '', // 代理商联系电话
              agentContact: '', // 代理商联系人
              agentName: '', // 代理商名称
              agentAnotherName: '', // 代理商别名
              fourthAdministrationId: [], // 地区
              agentDetailSite: '', // 详细地址
              agentDescription: '', // 代理商详细描述
            }
            this.images = []
            this.getAgentList()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.$post('/agent/merchantAgent/update?merchantAgentId=' + this.merchantAgentId, _params).then(res => {
          if (res.code == 20000) {
            this.$message.success(res.message)
            this.editAgentDialog = false
            this.newAgentParams = {
              agentCpntactNumber: '', // 代理商联系电话
              agentContact: '', // 代理商联系人
              agentName: '', // 代理商名称
              agentAnotherName: '', // 代理商别名
              fourthAdministrationId: [], // 地区
              agentDetailSite: '', // 详细地址
              agentDescription: '', // 代理商详细描述
            }
            this.images = []
            this.getAgentList()
          }
        })
      }
      
    },
    // 点击编辑时获取代理商的详情信息
    getAgentDetail(id) {
      this.merchantAgentId = id
      this.$get('/agent/merchantAgent/list/one?merchantAgentId=' + id).then(res => {
        this.newAgentParams.agentCpntactNumber = res.data.agentCpntactNumber
        this.newAgentParams.agentContact = res.data.agentContact
        this.newAgentParams.agentName = res.data.agentName
        this.newAgentParams.agentAnotherName = res.data.agentAnotherName
        this.newAgentParams.fourthAdministrationId = res.data.fourthAdministrationId
        this.newAgentParams.agentDetailSite = res.data.agentDetailSite
        this.newAgentParams.agentDescription = res.data.agentDescription

        if (res.data.agentPapersUrl) {
          let _imgs = res.data.agentPapersUrl
          _imgs.forEach((item, idx) => {
            this.images.push({
              name: idx + 1,
              url: item
            })
          });
        }

        this.editAgentDialog = true
      })
    },
    // 新建弹窗与编辑弹窗上的取消按钮的事件
    cancelDialog(type) {
      this.$confirm(this.$t('confirm.traceEnter'), this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        if (type === 1) {
          this.newAgentDialog = false
        } else {
          this.editAgentDialog = false
        }
        this.newAgentParams = {
          agentCpntactNumber: '', // 代理商联系电话
          agentContact: '', // 代理商联系人
          agentName: '', // 代理商名称
          agentAnotherName: '', // 代理商别名
          fourthAdministrationId: [], // 地区
          agentDetailSite: '', // 详细地址
          agentDescription: '', // 代理商详细描述
        }
        this.images = []

      })
    }
  }
}
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
  .agentlist {
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

  .newAgentDialog-con {
    .upload-item {
      margin-top: 40px;
      .upload-item-title {
        color: rgba(128,128,128,1);
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
</style>