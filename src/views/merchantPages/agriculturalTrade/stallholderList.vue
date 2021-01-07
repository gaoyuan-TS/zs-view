<template>
  <div class="stallholderlist">
    <page-content name="摊主列表">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.stallNo" placeholder="摊位编号" clearable></el-input>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.stallHolderName" placeholder="摊主姓名" clearable></el-input>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.stallHolderNo" placeholder="联系电话" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7">
            <div class="item-input">
              <el-input style="flex:0.8" v-model="params.categoryName" placeholder="经营品类" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="7">
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
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="newDiaolog = true">{{$t('button.new')}}</el-button>
              <el-button type="primary" @click="selectStallHolderList">搜索</el-button>
            </div>
          </el-col>
        </el-row>
        

        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column label="摊主姓名" prop="stallHolderName"></el-table-column>
                <el-table-column label="关联摊位" prop="stallNo"></el-table-column>
                <el-table-column label="联系电话" prop="stallHolderNo"></el-table-column>
                <el-table-column label="经营品类" prop="categoryName"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="editStallH(scope.row)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="payCode(scope.row)"
                    >支付设置</el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="goManaStallGoodList(scope.row)"
                    >商品详情</el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="unbindStallHolder(scope.row)"
                    >解除绑定</el-button>
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


      <!-- 新建摊主 -->
      <el-dialog :visible.sync="newDiaolog" width="600px" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">新建摊主</div>
        <div class="newdiaoloh-con">
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>上传头像</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :data="imgData"
                :on-success="handerHeaderPor"
                :before-upload="beforeImgUpload"
              >
                <img v-if="newDiaologFrom.stallHolderPortrait" :src="newDiaologFrom.stallHolderPortrait" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>摊主姓名：</div>
            <div>
              <el-input v-model="newDiaologFrom.stallHolderName" placeholder="摊主姓名"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>联系电话：</div>
            <div>
              <el-input v-model="newDiaologFrom.stallHolderNo" placeholder="联系电话"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>关联摊位：</div>
            <div>
              <el-select v-model="newDiaologFrom.stallId" placeholder="请选择摊位">
                <el-option
                  v-for="item in Stalls"
                  :key="item.stallId"
                  :label="item.stallNo"
                  :value="item.stallId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>经营品类</div>
            <div>
              <el-autocomplete
                v-model="newDiaologFrom.categoryName"
                :fetch-suggestions="querySearch"
                @select="(item) => {
                  handleSelect(item, '0')
                }"
                :trigger-on-focus="false"
                class="disPlayFlex1"
                placeholder="请输入摊主经营的品类">
                <template slot-scope="{item}">
                  <div class="name">
                    {{item.categoryName}}
                  </div>
                </template>
              </el-autocomplete>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>摊主营业执照</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :data="imgData"
                :on-success='handlerSuccess'
                :before-upload='beforeImgUpload'
                >
                <img v-if="newDiaologFrom.businessLicense" :src="newDiaologFrom.businessLicense" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div slot="footer" class="add-footer">
          <div>
            <el-button type="primary" @click="newStallHold">确 定</el-button>
            <el-button @click="cancel(1)">取 消</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 编辑摊主 -->
      <el-dialog :visible.sync="editDiaolog" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">编辑摊主</div>
        <div class="editDiaolog-con">
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>上传头像</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :data="imgData"
                :on-success="handerHeaderPor"
                :before-upload="beforeImgUpload"
              >
                <img v-if="editDiaologFrom.stallHolderPortrait" :src="editDiaologFrom.stallHolderPortrait" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>

          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>摊主姓名：</div>
            <div>
              <el-input v-model="editDiaologFrom.stallHolderName" placeholder="摊主姓名"></el-input>
            </div>
          </div>

          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>联系电话：</div>
            <div>
              <el-input v-model="editDiaologFrom.stallHolderNo" placeholder="联系电话"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:red">*</span>已关联摊位编号：</div>
            <div>
              <el-input v-model="editDiaologFrom.stallNo" :disabled="true" class="disPlayFlex1"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>重新关联摊位：</div>
            <div>
              <el-select v-model="editDiaologFrom.stallId" placeholder="请选择摊位">
                <el-option
                  v-for="item in Stalls"
                  :key="item.stallId"
                  :label="item.stallNo"
                  :value="item.stallId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="item-title">经营品类</div>
            <div>
              <el-autocomplete
                v-model="editDiaologFrom.categoryName"
                :fetch-suggestions="querySearch"
                @select="(item) => {
                  handleSelect(item, '1')
                }"
                :trigger-on-focus="false"
                class="disPlayFlex1"
                placeholder="请输入摊主经营的品类">
                <template slot-scope="{item}">
                  <div class="name">
                    {{item.categoryName}}
                  </div>
                </template>
              </el-autocomplete>
            </div>
          </div>
          <div class="item">
            <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>摊主营业执照</div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="https://zs.cntracechain.com/imageService/image/add"
                :show-file-list="false"
                :data="imgData"
                :on-success='handlerSuccess'
                :before-upload='beforeImgUpload'
                >
                <img v-if="editDiaologFrom.businessLicense" :src="editDiaologFrom.businessLicense" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>

        </div>
        <div slot="footer" class="add-footer">
          <div>
            <el-button type="primary">确 定</el-button>
            <el-button @click="cancel(2)">取 消</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 支付设置 -->
      <el-dialog :visible.sync="payCodeDiaolog" :close-on-click-modal='false' :show-close="false">
        <div slot="title" style="font-size: 16px">绑定</div>
        <div class="payCodeDiaolog-con">
          <el-row>
            <el-col :span="12">
              <div class="item">
                <div class="item-title">上传支付宝收钱码</div>
                <div>
                  <el-upload
                    class="avatar-uploader"
                    action="https://zs.cntracechain.com/imageService/image/add"
                    :show-file-list="false"
                    :data='imgData'
                    :on-success='aliPayCode'
                    :before-upload='beforeImgUpload'
                    >
                    <img v-if="qrCode.alipayPaymentCode" :src="qrCode.alipayPaymentCode" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="item">
                <div class="item-title">上传微信收钱码：</div>
                <div>
                  <el-upload
                    class="avatar-uploader"
                    action="https://zs.cntracechain.com/imageService/image/add"
                    :show-file-list="false"
                    :data="imgData"
                    :on-success='wevhatPayCode'
                    :before-upload='beforeImgUpload'
                    >
                    <img v-if="qrCode.wechatPaymentCode" :src="qrCode.wechatPaymentCode" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="add-footer">
          <div>
            <el-button type="primary" @click="updateMoneyQRCode">确 定</el-button>
            <el-button @click="payCodeDiaolog = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </page-content>
  </div>
</template>

<script>
import pageContent from '../../../components/content.vue'

import exifs from "../../../assets/js/exifs.js";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      merchantId: '',
      merchantName: '',
      pageNum: 1,
      pageSize: 10,
      params: {
        stallNo: '', // 摊位编号
        stallHolderName: '', // 摊主姓名
        stallHolderNo: '', // 联系电话
        categoryName: '', // 经营品类
        time: [], // 日期
      },
      tableData: [],
      total: 0,
      Stalls: [], // 未绑定的摊位列表
      restaurants: [],
      newDiaolog: false, // 新建 弹窗的状态
      newDiaologFrom: {
        stallHolderPortrait: '',
        stallHolderName: '',
        stallHolderNo: '',
        stallId: '',
        categoryName: '',
        businessLicense: ''
      },
      editDiaolog: false, // 编辑 弹窗的状态
      editDiaologFrom: {
        stallNo: '',
        stallHolderId: '', // 摊主id
        stallHolderPortrait: '', // 摊主头像
        stallHolderName: '', // 摊主名称
        stallHolderNo: '', // 联系电话
        stallId: '', // 摊位ID
        categoryName: '', // 经营品类
        businessLicense: '' // 营业执照
      },
      payCodeDiaolog: false,
      qrCode: {
        stallHolderId: '',
        alipayPaymentCode: '',
        wechatPaymentCode: ''
      },
      imgData: {
        imgSystemId: 'stallholder',
        imgSpecificUniqueValue: 'item'
      },
    }
  },
  created() {

    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.merchantId = roleJson.merchant.merchantId
    }
    this.getStallHolderList()
    this.getStallList()
  },
  methods: {
    // 获取未绑定的摊位列表
    getStallList() {
      this.$get('/traceability_am/m-stall/stallsByUnbound/' + this.merchantId).then(res => {
        this.Stalls = res.data
      })
    },
    // 获取摊主列表
    getStallHolderList() {
      let _params = {
        merchantId: this.merchantId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }

      if (this.params.stallNo) {
        _params.stallNo = this.params.stallNo
      }

      if (this.params.stallHolderName) {
        _params.stallHolderName = this.params.stallHolderName
      }

      if (this.params.stallHolderNo) {
        _params.stallHolderNo = this.params.stallHolderNo
      }

      if (this.params.categoryName) {
        _params.categoryName = this.categoryName
      }

      if (this.params.time) {
        _params.startTime = this.params.time[0]
        _params.endTime = this.params.time[1]
      }

      this.$post('/traceability_am/m-stallHolder/serch/list', _params).then(res => {
        this.tableData = res.data.stallHolderListVos.list
        this.total = res.data.stallHolderListVos.total
      })
    },
    querySearch (queryString, cb) {
      this.$get('/traceability_am/a-category/categorysByName', {
        categoryName: queryString
      }).then(res => {
        if (res.code === 200) {
          this.restaurants = res.data
          let restaurants = this.restaurants
          // let results = this.createFilter(queryString, restaurants)
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
          // 调用 callback 返回建议列表的数据
          cb(results)
        } else {
          this.restaurants = []
        }
      })
    },
    handleSelect (item, idx) {
      console.log(item);
      // this.nParams.categoryName = item.categoryName
      if (String(idx)  === '0') {
        this.newDiaologFrom.categoryName = item.categoryName
      } else {
        this.editDiaologFrom.categoryName = item.categoryName
      }
    },
    createFilter (queryString, data) {
      return (restaurant) => {
        return (restaurant.categoryName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getStallHolderList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getStallHolderList()
    },
    selectStallHolderList() {
      this.pageNum = 1
      this.pageSize = 10
      this.getStallHolderList()
    },
    // 编辑按钮的事件
    editStallH(row) {
      this.editDiaologFrom.stallHolderId = row.stallHolderId
      this.$get('/traceability_am/m-stallHolder/editPageData/' + row.stallHolderId).then(res => {
        if (res.code === 200) {
          this.editDiaologFrom.stallHolderPortrait = res.data.stallHolderPortrait
          this.editDiaologFrom.stallHolderName = res.data.stallHolderName
          this.editDiaologFrom.categoryName = res.data.categoryName
          this.editDiaologFrom.stallNo = res.data.stallNo
          this.editDiaologFrom.stallHolderNo = res.data.stallHolderNo
          this.editDiaologFrom.businessLicense = res.data.businessLicense
          this.editDiaologFrom.stallId = res.data.stallId
        }

        this.editDiaolog = true
      })
    },
    // 上传头像图片成功的函数
    handerHeaderPor (res) {
      this.newDiaologFrom.stallHolderPortrait = res.data.imgUrl
      console.log(res)
    },
    // 上传营业执照图片成功的函数
    handlerSuccess (res, file) {
      // console.log(1)
      this.newDiaologFrom.businessLicense = res.data.imgUrl
      this.cardOCR(res.data.imgUrl)
    },
    // 校验营业执照是否为真
    cardOCR (imgUrl) {
      this.$post('/baseService/ocr/BizLicenseOCR', {
        ImageUrl: imgUrl
      }).then(res => {
        if (res.statusCode === 200) {
          // this.ocrDisabled = false
          if (this.dialogFormVisible) {
            this.newDiaologFrom.businessLicense = imgUrl
          } else if (this.editStallH) {
            this.editDiaologFrom.businessLicense = imgUrl
          }
        } else {
          this.$message.error('请重新上传真正的且清晰的营业执照图片！')
        }
      })
    },
    // 上传图片之前的钩子函数
    beforeImgUpload (file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const extension4 = testmsg === 'PNG'
      const extension5 = testmsg === 'JPG'
      const extension6 = testmsg === 'JPEG'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message.error('上传图片只能是 png,jpg,jpeg 格式!')
        return false
      } else {
        return new Promise(resolve => {
          exifs.getOrientation(file).then(orient => {
            console.log(orient)
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
    // 新建摊主
    newStallHold() {
      let _param = this.newDiaologFrom

      _param.merchantId = this.merchantId
      if (!_param.stallHolderPortrait) {
        this.$message.error('请上传头像')
        return false
      }
      if (!_param.stallHolderName) {
        this.$message.error('请填写摊主的姓名')
        return false
      }
      if (!_param.stallHolderNo) {
        this.$message.error('请填写摊主的联系电话')
        return false
      }
      if (!/^[0-9]*$/.test(_params.stallHolderNo)) {
        this.$message.error('摊主的联系电话格式错误')
        return false
      }
      if (!_param.stallId) {
        this.$message.error('请选择摊位')
        return false
      }
      if (!_param.categoryName) {
        this.$message.error('请填写经营品类')
        return false
      }
      if (!_param.businessLicense) {
        this.$message.error('请上传摊主的营业执照')
        return false
      }

      this.$post('/traceability_am/m-stallHolder/create', _param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.newDiaologFrom = {
            stallHolderPortrait: '',
            stallHolderName: '',
            stallHolderNo: '',
            stallId: '',
            categoryName: '',
            businessLicense: ''
          }

          this.newDiaolog = false
          this.getStallHolderList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击 取消按钮的事件
    cancel(type) {
      this.$confirm('当前操作会清除你所填写的数据', this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.determine'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then(() => {
        if (type === 1) {
          this.newDiaolog = false
          this.newDiaologFrom = {
            stallHolderPortrait: '',
            stallHolderName: '',
            stallHolderNo: '',
            stallId: '',
            categoryName: '',
            businessLicense: ''
          }
        } else {
          this.editDiaolog = false
          this.editDiaologFrom = {
            stallNo: '',
            stallHolderId: '', // 摊主id
            stallHolderPortrait: '', // 摊主头像
            stallHolderName: '', // 摊主名称
            stallHolderNo: '', // 联系电话
            stallId: '', // 摊位ID
            categoryName: '', // 经营品类
            businessLicense: '' // 营业执照
          }
        }
        
      }).catch(() => {
        console.log('点击取消')
      })
    },
    // 编辑摊主资料
    editStallhold() {
      let _params = this.editDiaologFrom

      if (!_param.stallHolderPortrait) {
        this.$message.error('请上传头像')
        return false
      }
      if (!_param.stallHolderName) {
        this.$message.error('请填写摊主的姓名')
        return false
      }
      if (!_param.stallHolderNo) {
        this.$message.error('请填写摊主的联系电话')
        return false
      }
      if (!/^[0-9]*$/.test(_params.stallHolderNo)) {
        this.$message.error('摊主的联系电话格式错误')
        return false
      }
      if (!_param.stallId) {
        this.$message.error('请选择摊位')
        return false
      }
      if (!_param.categoryName) {
        this.$message.error('请填写经营品类')
        return false
      }
      if (!_param.businessLicense) {
        this.$message.error('请上传摊主的营业执照')
        return false
      }

      this.$post('/traceability_am/m-stallHolder/edit', _params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.editDiaolog = false
          this.editDiaologFrom = {
            stallNo: '',
            stallHolderId: '', // 摊主id
            stallHolderPortrait: '', // 摊主头像
            stallHolderName: '', // 摊主名称
            stallHolderNo: '', // 联系电话
            stallId: '', // 摊位ID
            categoryName: '', // 经营品类
            businessLicense: '' // 营业执照
          }
          this.getStallHolderList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 解除绑定
    unbindStallHolder(row) {
      this.$confirm('此操作会将摊主与摊位解除绑定，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.$get('/traceability_am/m-stallHolder/unbindStallHolder', {
          stallHolderId: row.stallHolderId
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          
        })
      }).catch(() => {
        console.log('点击取消')
      })
    },
    // 请求这个摊主是否设置收钱码
    payCode (row) {
      this.qrCode.stallHolderId = row.stallHolderId
      this.$get('/traceability_am/m-stallHolder/stallHolderQRCode/' + row.stallHolderId).then(res => {
        if (res.code === 200) {
          this.qrCode.alipayPaymentCode = res.data.alipayPaymentCode
          this.qrCode.wechatPaymentCode = res.data.wechatPaymentCode
        }
      })
      this.payCodeDiaolog = true
    },
    // 上传支付宝收钱码图片
    aliPayCode(res) {
      this.qrCode.alipayPaymentCode = res.data.imgUrl
    },
    // 上传微信收钱码图片
    wevhatPayCode(res) {
      this.qrCode.wechatPaymentCode = res.data.imgUrl
    },
    // 绑定摊主收钱码
    updateMoneyQRCode () {
      if (!this.qrCode.alipayPaymentCode) {
        this.$message.error('请上传支付宝收钱码')
      } else if (!this.qrCode.wechatPaymentCode) {
        this.$message.error('请上传微信收钱码')
      } else {
        this.$post('/traceability_am/m-stallHolder/updateMoneyQRCode', this.qrCode).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.payCodeDiaolog = false
            this.qrCode = {
              stallHolderId: '',
              alipayPaymentCode: '',
              wechatPaymentCode: ''
            }
          } else {
            this.$message.error(res.message)
            this.payCodeDiaolog = false
            this.qrCode = {
              stallHolderId: '',
              alipayPaymentCode: '',
              wechatPaymentCode: ''
            }
          }
        })
      }
    },
    // 跳转到商品列表
    goManaStallGoodList(row) {
      this.$router.push({
        path: '/merchant/stallholderList/stallGoodList',
        query: {
          id: row.stallHolderId,
          mId: this.merchantId,
          mName: this.merchantName
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.el-input__inner {
    border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
    padding: 0 !important;
  }
  .stallholderlist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
    }

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

  .item {
    width: 100%;
    margin-top: 12px;
    .item-title {
      padding:  8px 0;
      color: rgba(128, 128, 128, 1);
      font-size: 12px;
      // margin-bottom: 12px;
    }
  }

  /deep/.el-select {
    width: 100%;
  }
  /deep/.el-autocomplete {
    width: 100%;
  }

  /deep/.avatar-uploader .el-upload {
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

  .add-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>