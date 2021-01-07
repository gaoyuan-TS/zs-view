<template>
  <div class="adminSalesSetting">
    <div class="content">
      <el-row>
        <el-col :span="24">
          <div class="title-name">销售规格设置</div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px" type="flex" justify="space-between">
        <el-col :span="11">
          <!-- <div class="grid-content bg-purple">
            商品名称:&nbsp;&nbsp;{{goodsName}}
          </div> -->
          <div class=""  style="display: flex; align-items: center">
            <div class="searchTitle">
              <span class="disPlayWidth">商品名称:</span>
            </div>
            <span :title="goodsName" class="searchContent">{{goodsName}}</span>
          </div>
        </el-col>
        <el-col :span="11">
          <!-- <div class="grid-content bg-purple">
            商家名称:&nbsp;&nbsp;{{merchantName}}
          </div> -->
          <div class="" style="display: flex; align-items: center">
            <div class="searchTitle">
              <span class="disPlayWidth">商家名称:</span>
            </div>
            <span :title="merchantName" class="searchContent">{{merchantName}}</span>
          </div>

        </el-col>

        <!-- <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="success" @click="addNewSort">新增分类</el-button>
          </div>
        </el-col> -->
      </el-row>

      <!-- <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <span class="title-name">分类设置/分类显示</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="success" @click="addNewSort" v-text="addbtnText" v-if="btnDisplay"></el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </el-col>
      </el-row> -->

      <!-- 树结构 分类设置/分类显示 -->
      <el-row>
        <el-col :span="24">
          <table border="1" width="100%" height="100%" cellspacing="0" align="center">
            <thead>
              <tr>
                <th>
                  <div class="ordertitle">
                    <span>分类设置/分类显示</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button style="margin-left: 20px" type="success" @click="addNewSort" v-text="addbtnText" v-if="btnDisplay"></el-button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style="margin-left: 20px;" class="custom-tree-container">
                    <div class="block" style="font-size: 16px; padding: 10px 0">
                      <el-tree :data="data" :props="defaultProps" node-key="id" default-expand-all @node-click="handleNodeClick">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                          <span>{{ node.label }}</span>
                          <span style="margin-left:40px">
                            <el-button icon="el-icon-s-tools" v-if="data.children" type="text" @click="modifyClass(node, data)">
                              修改分类
                            </el-button>
                          </span>
                        </span>
                      </el-tree>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </el-col>
      </el-row>

      <!-- 树结构 规格设置/规格显示 -->
      <el-row>
        <el-col :span="24">

          <table border="1" width="100%" height="100%" cellspacing="0" align="center">
            <thead>
              <tr>
                <th>
                  <div class="ordertitle">
                    <span>规格设置/规格显示</span>
                    <el-button style="margin-left: 20px" type="success" @click="formatDisplay">规格设置</el-button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>

                  <div style="margin-left: 20px;" class="custom-tree-container">
                    <div class="block" style="font-size: 16px; padding: 10px 0">
                      <el-tree :data="data2" :props="defaultProps2" node-key="id" default-expand-all ref="tree" @node-click="handleNodeClick">>
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                          <span>{{ data.specName }}:</span>
                          <span>{{ node.label }}</span>
                          <span style="margin-left:60px" v-if="data.sku !== null && data.sku.stock !== null">库存:{{ data.sku.stock }}</span>
                          <span style="margin-left:60px" v-else-if="data.sku !== null && data.sku.stock == null">库存
                            <el-link type="danger" :underline="false" disabled>(未设置)</el-link>
                          </span>

                          <!-- <span style="margin-left:60px" v-if="data.sku !== null && data.sku.salePrice !== null">销售价:{{ data.sku.salePrice }}</span>
                          <span style="margin-left:60px" v-else-if="data.sku !== null && data.sku.salePrice == null">销售价
                            <el-link type="danger" :underline="false" disabled>(未设置)</el-link>
                          </span>

                          <span style="margin-left:60px" v-if="data.sku !== null && data.sku.costPrice !== null">成本价:{{ data.sku.costPrice }}</span>
                          <span style="margin-left:60px" v-else-if="data.sku !== null && data.sku.costPrice == null">成本价
                            <el-link type="danger" :underline="false" disabled>(未设置)</el-link>
                          </span> -->

                          <span style="margin-left:60px">
                            <el-button style="margin-left:60px" v-if="data.sku !== null" type="text" @click="InventorySet(node, data)">
                              库存设置
                            </el-button>
                            <el-button style="margin-left:60px" v-if="data.sku !== null" type="text" @click="setImg(node, data)">
                              设置商品图片
                            </el-button>

                            <!-- 商家端 没有 价格设置 -->
                            <!-- <el-button style="margin-left:60px" v-if="data.sku !== null" type="text" @click="PriceSet(node, data)">
                              价格设置
                            </el-button> -->
                            <!-- <el-button icon="el-icon-circle-plus-outline" style="margin-left:60px" v-if="data.sku !== null && data.sku.next !== false" type="text" @click="addNewFormat(node,data)">
                              新增规格
                            </el-button> -->

                            <!-- <el-button icon="el-icon-remove-outline" style="margin-left:60px" v-if="data.sku !== null" type="text" @click="removeSku(node, data)">
                              删除
                            </el-button> -->

                          </span>

                        </span>
                      </el-tree>
                    </div>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>

        </el-col>
      </el-row>

      <!-- 新增分类弹框 -->
      <el-dialog center :visible.sync="dialogVisible1" width="35%" :before-close="handleClose">
        <div slot="title" style="font-size: 16px">新增分类</div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
          <!-- <div style="display:flex;flex-wrap:wrap;"> -->

          <div style="width:60%;">
            <el-form-item prop="specName" label="分类名称:" :rules="[
        { required: true, message: '请输入分类名称', trigger: 'blur' },]">
              <el-input v-model="dynamicValidateForm.specName" placeholder="请输入" clearable/>
            </el-form-item>
          </div>

          <!-- <div style="width:60%;">
            <el-form-item prop="specValue" label="分类规格类型:" :rules="[
        { required: true, message: '请输入分类规格类型', trigger: 'blur' },]">
              <el-input v-model="dynamicValidateForm.domains[0].specValue" placeholder="请输入" clearable/>
            </el-form-item>
          </div> -->

          <div style="width:60%;">
            <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'分类类型:'" :key="domain.key" :prop="'domains.' + index + '.specValue'" :rules="{
      required: true, message: '分类规格类型不能为空', trigger: 'blur'
       }">
              <el-input v-model="domain.specValue" placeholder="请输入" clearable></el-input>
              <el-button class="removeDomainBtn" v-if="index !==0" @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button @click="addDomain">新增分类类型</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            <el-button @click="cancelClass('dynamicValidateForm')">取消</el-button>
          </el-form-item>

          <!-- </div> -->
        </el-form>
      </el-dialog>

      <!-- 修改分类弹框 -->
      <el-dialog center :visible.sync="dialogVisible5" width="35%" :before-close="handleClose1">

        <div slot="title" style="font-size: 16px">修改分类</div>

        <el-form :model="dynamicValidateForm1" ref="modifyClassForm" label-width="100px" class="demo-dynamic">

          <div style="width:60%;">
            <el-form-item prop="specValue" label="分类名称:" :rules="[{ required: true, message: '请输入分类名称', trigger: 'blur' },]">
              <el-input v-model="dynamicValidateForm1.specValue" placeholder="请输入" clearable/>
            </el-form-item>
          </div>

          <div style="width:60%;">
            <el-form-item v-for="(item, index) in dynamicValidateForm1.children" :label="'分类类型:'" :key="item.key" :prop="'children.' + index + '.specValue'" :rules="{
      required: true, message: '分类规格类型不能为空', trigger: 'blur'
       }">
              <el-input v-model="item.specValue" placeholder="请输入" clearable></el-input>
              <el-button class="removeDomainBtn" v-if="index !==0" @click.prevent="removeDomain1(item)">删除</el-button>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="modifyForm('modifyClassForm')">修改</el-button>
            <el-button @click="addDomain1">新增分类类型</el-button>
            <!-- <el-button @click="resetForm('dynamicValidateForm1')">重置</el-button> -->
            <el-button @click="cancelClass1('modifyClassForm')">取消</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>

      <!-- 新增规格弹框 -->
      <el-dialog center :visible.sync="dialogVisible" width="30%">

        <div slot="title" style="font-size: 16px">新增规格</div>

        <el-form ref="submitForm" :model="form" label-width="100px" class="demo-ruleForm" :rules="rules2">
          <div style="display:flex;flex-wrap:wrap;">

            <div style="width:100%;">
              <el-form-item label="规格选择：" prop="specId">
                <el-select v-model="form.specId" placeholder="请选择">
                  <el-option v-for="item in options1" :key="item.specId" :label="item.specName" :value="item.specId" />
                </el-select>
              </el-form-item>
            </div>

          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="skuConfir('submitForm')">确 定</el-button>
        </div>

      </el-dialog>

      <!-- 新增下级规格弹框 -->
      <el-dialog center :visible.sync="dialogVisible2" width="30%">

        <div slot="title" style="font-size: 16px">新增下级规格</div>

        <el-form ref="submitForm1" :model="fromdata" label-width="100px" class="demo-ruleForm" :rules="rules">
          <div style="display:flex;flex-wrap:wrap;">

            <div style="width:100%;">
              <el-form-item label="规格选择：" prop="specId">
                <el-select v-model="fromdata.specId" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.specId" :label="item.specName" :value="item.specId" />
                </el-select>
              </el-form-item>
            </div>

          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="skuInsertCancle('submitForm1')">取 消</el-button>
          <el-button type="danger" @click="skuInsertConfir('submitForm1')">确 定</el-button>
        </div>

      </el-dialog>

      <!-- 库存设置弹框 -->
      <el-dialog center :visible.sync="dialogVisible3" width="30%">
        
        <div slot="title" style="font-size: 16px">库存设置</div>

        <el-form ref="submitForm2" :model="fromdata1" label-width="100px" class="demo-ruleForm">
          <div style="display:flex;flex-wrap:wrap;">

            <div style="width:100%;">
              <el-form-item prop="stock" label="库存数量:" :rules="[
               {type: 'number', required: true, message: '请输入库存数量必须为数字值', trigger: 'blur' }]">
                <el-input v-model.number="fromdata1.stock" placeholder="请输入" clearable/>
                <p style="color:#F00000FF;">备注：0即无库存</p>
              </el-form-item>
            </div>

          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="danger" @click="InventorySetConfir('submitForm2')">确 定</el-button>
        </div>

      </el-dialog>

      <!-- 价格设置弹框 -->
      <el-dialog center :visible.sync="dialogVisible4" width="30%">
        
        <div slot="title" style="font-size: 16px">价格设置</div>

        <el-form ref="submitForm3" :model="fromdata2" label-width="100px" class="demo-ruleForm" :rules="rules1">
          <div style="display:flex;flex-wrap:wrap;">

            <div style="width:80%;">
              <el-form-item prop="costPrice" label="成本价:">
                <el-input v-model="fromdata2.costPrice" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="请输入" clearable/>
              </el-form-item>
            </div>

            <div style="width:80%;">
              <el-form-item prop="salePrice" label="销售价:">
                <el-input v-model="fromdata2.salePrice" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="请输入" clearable/>
                <p style="color:#F00000FF;">备注：销售价需大于成本价</p>
              </el-form-item>
            </div>

            <div style="width:80%;">
              <el-form-item prop="consumeCoin" label="消耗积分:">
                <el-input v-model.number="fromdata2.consumeCoin" placeholder="请输入" clearable/>
              </el-form-item>
            </div>

            <div style="width:80%;">
              <el-form-item prop="donateCoin" label="赠送积分:">
                <el-input v-model.number="fromdata2.donateCoin" placeholder="请输入" clearable/>
              </el-form-item>
            </div>

          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible4 = false">取 消</el-button>
          <el-button type="danger" @click="PriceSetConfir('submitForm3')">确 定</el-button>
        </div>

      </el-dialog>

      <!-- 商品图片设置弹框 -->
      <el-dialog center :visible.sync="dialogVisible6" width="30%" :before-close="handleImgClose">
        
        <div slot="title" style="font-size: 16px">图片设置</div>

        <el-form ref="submitForm4" label-width="100px" class="demo-ruleForm">
          <div style="display:flex;flex-wrap:wrap;">

            <div style="width:100%;">
              <el-upload class="upload-demo" action="https://zs.cntracechain.com/imageService/image/add" :limit="1" :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleExceed" :before-upload="beforeIMGUpload" :file-list="fileList" :on-success="handleImg" :data="upData" accept=".jpg,.png,jpeg" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">备注:只能上传jpg/png/jpeg图片文件，且不超过5M</div>
              </el-upload>
            </div>

          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadImgCancle()">取 消</el-button>
          <el-button type="danger" @click="uploadImgConfir('submitForm4')">确 定</el-button>
        </div>

      </el-dialog>

    </div>
  </div>
</template>
<script>
let id = 1000
export default {
  data () {
    // var validatePrice = (rules1, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入销售价"));
    //   } else if (value > this.fromdata2.costPrice) {
    //     callback(new Error("销售价需大于成本价!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      goodsName: this.$route.query.goodsName, // 商品名称
      merchantName: this.$route.query.merchantName, // 商家名称
      goodsId: this.$route.query.goodsId, // 商品id
      merchantId: this.$route.query.merchantId, // 商家id
      dialogVisible: false, // 新增一级规格弹框
      dialogVisible1: false, // 新增分类弹框
      dialogVisible2: false, // 新增下级规格弹框
      dialogVisible3: false, // 库存设置弹框
      dialogVisible4: false, // 价格设置弹框
      dialogVisible5: false, // 修改分类弹框
      dialogVisible6: false, // 设置图片弹框
      fileList: [], // 设置图片
      upData: {
        imgSystemId: 'ryy',
        imgSpecificUniqueValue: 'fddd'
      }, // 上传图片时要带的参数
      // 新增分类表单验证对象
      dynamicValidateForm: {
        domains: [
          {
            specValue: ''
          }
        ],
        specName: ''
      },
      // 修改分类表单回显数据对象
      dynamicValidateForm1: {},
      data: [], // 分类列表
      defaultProps: {
        children: 'children',
        label: 'specValue'
      },
      title: '', // 标题
      fatherId: null,
      addbtnText: '新增一级分类',
      btnDisplay: true,
      data2: [], // 规格列表
      defaultProps2: {
        children: 'children',
        label: 'specValue'
      },
      // 新增一级规格表单验证对象
      form: {
        specId: null // number 分类id
      },
      // 获取一级分类列表数据
      options1: [],
      // specId: null,
      rules2: {
        specId: [{ required: true, trigger: 'change', message: '请选择规格' }]
      },
      // 新增规格表单验证对象
      fromdata: {
        specId: null, // number 分类id
        skuId: null
      },
      // 获取下级分类列表数据
      options: [],
      // 新增规格验证规则
      rules: {
        specId: [{ required: true, trigger: 'change', message: '请选择规格' }]
      },
      specIdList: [], // 选择所有数据（含选中节点以及他父节点）数组
      // 库存设置表单验证对象
      fromdata1: {
        skuId: null, // number  sku id
        stock: null // number sku 库存数量
      },
      // 图片设置表单验证对象
      fromdata3: {
        skuId: null, // number  sku id
        skuPicture: '' // String sku 图片
      },

      // 价格设置表单验证对象
      fromdata2: {
        skuId: null,
        costPrice: null,
        salePrice: null,
        consumeCoin: null,
        donateCoin: null
      },
      rules1: {
        costPrice: [
          {
            regexp: '/[^d.]/g',
            required: true,
            message: '请输入成本价必须为数字值',
            trigger: 'blur'
          }
        ],
        salePrice: [
          {
            // type: "number",
            // validator: validatePrice,
            regexp: '/[^d.]/g',
            required: true,
            message: '请输入销售价必须为数字值',
            trigger: 'blur'
          }
        ],
        consumeCoin: [
          {
            type: 'number',
            required: true,
            message: '请输入消耗积分必须为数字值',
            trigger: 'blur'
          }
        ],
        donateCoin: [
          {
            type: 'number',
            required: true,
            message: '请输入赠送积分必须为数字值',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    // 分类规格列表
    addSortShow () {
      this.$get(
          '/zs-goods/specValue/list?merchantId=' +
            this.merchantId +
            '&goodsId=' +
            this.goodsId
        )
        .then(res => {
          if (Number(res.code) === 200) {
            //  console.log(res.data.data)
            // 数组对象里面key名替换方法  specName修改前的键名   specValue为修改后的键名
            this.data = JSON.parse(
              JSON.stringify(res.data).replace(/specName/g, 'specValue')
            )
            if (res.data[res.data.length - 1]) {
              this.fatherId = res.data[res.data.length - 1].specId
            }

            if (res.data.length === 1) {
              this.addbtnText = '新增二级分类'
            } else if (res.data.length === 2) {
              this.addbtnText = '新增三级分类'
            } else if (res.data.length === 3) {
              this.addbtnText = '新增四级分类'
            } else if (res.data.length === 4) {
              this.addbtnText = '新增五级分类'
            } else if (res.data.length === 5) {
              this.btnDisplay = false
            }
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 点击新增分类
    addNewSort () {
      this.dialogVisible1 = true
    },
    // 点击新增分类提交按钮
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.dynamicValidateForm.domains)
          let arr = this.dynamicValidateForm.domains
          let newArr = arr.map((item, index, arr) => {
            // console.log(item.specValue)
            let arr1 = item.specValue
            return arr1
          })
          // console.log(newArr)
          let _param = {
            merchantId: this.merchantId,
            specName: this.dynamicValidateForm.specName,
            specValue: newArr,
            goodsId: this.goodsId,
            fatherId: this.fatherId
          }
          // 商家新增商品规格分类
          this.$post('/zs-goods/goodsSpec/insert', _param).then(res => {
            if (Number(res.code) === 200) {
              this.$message({
                type: 'success',
                message: '新增分类成功'
              })
              this.resetForm('dynamicValidateForm')
              this.dialogVisible1 = false
              this.dynamicValidateForm.domains.splice(
                1,
                this.dynamicValidateForm.domains.length - 1
              )
              this.addSortShow()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击新增分类取消按钮 清空表单
    cancelClass (formName) {
      this.resetForm('dynamicValidateForm')
      this.dialogVisible1 = false
      this.dynamicValidateForm.domains.splice(
        1,
        this.dynamicValidateForm.domains.length - 1
      )
    },
    // 点击修改分类取消按钮 清空表单
    cancelClass1 (formName) {
      this.addSortShow()
      this.dialogVisible5 = false
    },

    // 关闭前的回调，点击x后关闭 清空表单
    handleClose1 () {
      this.cancelClass1()
    },
    // 修改分类
    modifyClass (node, data) {
      this.dialogVisible5 = true
      this.dynamicValidateForm1 = data
      //  console.log(node)
      //  console.log(data)
    },
    // 修改分类弹框修改按钮
    modifyForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.dynamicValidateForm1.children);
          let specValueListArr = this.dynamicValidateForm1.children.map(
            (item, index, arr) => {
              item = item.specValue
              return item
            }
          )
          let _param = {
            specId: this.dynamicValidateForm1.specId,
            specName: this.dynamicValidateForm1.specValue,
            specValueList: specValueListArr,
            goodsId: this.goodsId
          }
          // 商家修改分类规格内容
          this.$post('/zs-goods/goodsSpec/update', _param).then(res => {
            if (Number(res.code) === 200) {
              this.$message({
                type: 'success',
                message: '修改分类成功'
              })
              this.resetForm('modifyClassForm')
              this.dialogVisible5 = false
              this.addSortShow()
              this.getSpecList()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭前的回调，点击x后关闭 清空表单
    handleClose () {
      this.cancelClass()
    },
    // 获取商品sku规格详情列表
    getSpecList () {
      this.$get('/zs-goods/sku/list/spec?goodsId=' + this.goodsId)
        .then(res => {
          if (Number(res.code) === 200) {
            // console.log("数据"+res.data.data.list);
            this.data2 = res.data
            // console.log(res.data.data);
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 规格设置弹框显示
    formatDisplay () {
      this.dialogVisible = true
      // 获取下拉分类列表
      this.$get(
          '/zs-goods/goodsSpec/list?merchantId=' +
            this.merchantId +
            '&goodsId=' +
            this.goodsId
        )
        .then(res => {
          if (Number(res.code) === 200) {
            // console.log(res.data.data)
            this.options1 = res.data
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 一级规格弹框确认按钮 一级商品规格设置-----生成sku
    skuConfir (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = {
            goodsId: this.goodsId,
            goodsName: this.goodsName,
            merchantId: this.merchantId,
            specId: this.form.specId
          }
          this.$post('/zs-goods/sku/insert', param).then(res => {
            if (Number(res.code) === 200) {
              this.$message({
                type: 'success',
                message: '新增规格成功'
              })
              this.resetForm('submitForm')
              this.dialogVisible = false
              this.getSpecList()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增规格
    addNewFormat (params1, params2) {
      // this.fromdata.specId = params2.specId;
      this.fromdata.skuId = params2.sku.skuId
      this.dialogVisible2 = true
      // console.log(params1);
      // console.log(params2);
      // let specIdList = [];
      // specIdList.push(params1.data.specId)
      //  console.log(this.specIdList);
      // console.log(params1.data.specId)
      // this.specIdList.push(params1.data.specId)
      // 对数结构进行深度遍历
      // console.log(params2.specId)
      // function deepTraversal(params1) {

      if (params1 != null) {
        this.specIdList.push(params1.data.specId)

        if (params1.parent != null) {
          let parents = params1.parent
          if (parents.data.specId) {
            this.specIdList.push(parents.data.specId)
          }
          if (parents.parent != null) {
            let parents1 = parents.parent
            if (parents1.data.specId) {
              this.specIdList.push(parents1.data.specId)
            }
            if (parents1.parent != null) {
              let parents2 = parents1.parent
              if (parents2.data.specId) {
                this.specIdList.push(parents2.data.specId)
              }
              if (parents2.parent != null) {
                let parents3 = parents2.parent
                if (parents3.data.specId) {
                  this.specIdList.push(parents3.data.specId)
                }
              }
            }
          }

          // console.log(parents.length)
          //  for(let i=0;i<parents.length;i++){
          //    deepTraversal(parents[i]);
          //  }
          // for (var i in parents) {
          // //循环遍历树
          //    if (parents[i].parent) {
          //   //如果遍历树结构还有下一级-做操作
          //    deepTraversal(parents[i]);
          //    } else {
          //   //如果没有下一级做相应操作
          //    return;
          //   }
          // }
        }
      }

      //   return  this.pecIdList;
      // }
      // console.log(this.specIdList);
      // this.specIdList.push(params1.parent.data.specId)
      // console.log(deepTraversal(params1));
      // this.specIdList = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      // console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))

      let _param = {
        goodsId: this.goodsId,
        merchantId: this.merchantId,
        list: this.specIdList
      }
      // 获取下级分类列表
      this.$post('/zs-goods/sku/specList', _param).then(res => {
        if (Number(res.code) === 200) {
          // console.log(res.data.data)
          this.options = res.data
          this.specIdList = []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 新增规格弹框确认按钮
    skuInsertConfir (formName) {
      // console.log(this.specId)
      // console.log(this.fromdata.skuId)
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _param = {
            goodsId: this.goodsId,
            goodsName: this.goodsName,
            merchantId: this.merchantId,
            specId: this.fromdata.specId,
            skuId: this.fromdata.skuId
          }
          this.$post('/zs-goods/sku/insert/next', _param).then(res => {
            if (Number(res.code) === 200) {
              this.$message({
                type: 'success',
                message: '新增规格成功'
              })
              this.resetForm('submitForm1')
              this.dialogVisible2 = false
              this.getSpecList()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增规格弹框取消按钮
    skuInsertCancle (formName) {
      this.resetForm('submitForm1')
      this.dialogVisible2 = false
    },
    // 删除单条sku信息
    removeSku (params1, params2) {
      // console.log(params2)
      let skuId = params2.sku.skuId
      this.$confirm('你是否确认删除该条规格?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$get('/zs-goods/sku/delete?skuId=' + skuId).then(res => {
            if (Number(res.code) === 200) {
              // console.log(res.data.data)
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getSpecList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击库存设置按钮
    InventorySet (params1, params2) {
      this.dialogVisible3 = true
      this.fromdata1.skuId = params2.sku.skuId
    },
    // 点击库存设置确认按钮
    InventorySetConfir (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _param = {
            skuId: this.fromdata1.skuId,
            stock: this.fromdata1.stock
          }
          this.$post('/zs-goods/sku/update/stock', _param).then(res => {
            if (Number(res.code) === 200) {
              this.$message({
                type: 'success',
                message: '库存设置成功'
              })
              this.resetForm('submitForm2')
              this.getSpecList()
              this.dialogVisible3 = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 设置商品图片
    setImg (params1, params2) {
      this.dialogVisible6 = true
      this.fromdata3.skuId = params2.sku.skuId
    },
    // 设置商品图片确认按钮
    uploadImgConfir (formName) {
      let _param = {
        skuId: this.fromdata3.skuId,
        skuPicture: this.fromdata3.skuPicture
      }
      if (_param.skuPicture) {
        //  console.log( _param.skuPicture)
        this.$post('/zs-goods/sku/update/picture', _param).then(res => {
          if (Number(res.code) === 200) {
            this.$message({
              type: 'success',
              message: '图片设置成功'
            })
            this.dialogVisible6 = false
            this.fileList = [] // 设置商品图片成功后清空数组
            // this.resetForm("submitForm4");
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        console.log(_param.skuPicture)
        this.$message.error('图片地址为空，还未上传图片！')
      }
    },
    // 设置商品图片取消按钮
    uploadImgCancle () {
      this.dialogVisible6 = false
      this.fileList = [] // 取消按钮清空上传数组
    },
    // 关闭前的回调，点击x后关闭 清空上传
    handleImgClose () {
      this.uploadImgCancle()
    },
    // 点击价格设置按钮
    PriceSet (params1, params2) {
      this.dialogVisible4 = true
      this.fromdata2.skuId = params2.sku.skuId
    },
    // 点击价格设置确认按钮
    PriceSetConfir (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _param = {
            skuId: this.fromdata2.skuId,
            costPrice: this.fromdata2.costPrice,
            salePrice: this.fromdata2.salePrice,
            consumeCoin: this.fromdata2.consumeCoin,
            donateCoin: this.fromdata2.donateCoin
          }
          this.$post('/zs-goods/sku/update/price', _param).then(res => {
            if (Number(res.code) === 200) {
              this.$message({
                type: 'success',
                message: '价格设置成功'
              })
              this.resetForm('submitForm3')
              this.getSpecList()
              this.dialogVisible4 = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 商品图片上传相关
    handleRemove (file, fileList) {
      // console.log(file, fileList);
      // console.log(666)
      this.fromdata3.skuPicture = ''
    },
    handlePreview (file) {
      console.log(file)
    },
    // 商品图片设置提示限制1个上传
    handleExceed (files, fileList) {
      this.$message.error('最多只能上传1张图片！')
    },
    // 上传图片成功后的钩子
    handleImg (res, file) {
      if (Number(res.code) === 200) {
        console.log(this.fileList)
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.fromdata3.skuPicture = res.data.imgUrl
      } else {
        this.$message.error(res.desc)
      }
    },
    // 限制商品图片上传格式和大小
    beforeIMGUpload (file) {
      var testIMG = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'jpeg'
      const extension4 = testmsg === 'PNG'
      const extension5 = testmsg === 'JPG'
      const extension6 = testmsg === 'JPEG'
      const isLt3M = file.size / 1024 / 1024 < 5

      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message.error('上传图片文件只能是jpg,png,jpeg格式!')
        return false
      }
      if (!isLt3M) {
        this.$message.error('上传图片文件不能超过 5MB!')
        return false
      }
      return true
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        specValue: '',
        key: Date.now()
      })
    },
    removeDomain1 (item) {
      var index = this.dynamicValidateForm1.children.indexOf(item)
      this.$confirm('删除分类会导致原有规格需要重新设置，是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (index !== -1) {
            this.dynamicValidateForm1.children.splice(index, 1)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    addDomain1 () {
      this.$confirm('新增分类会导致原有规格需要重新设置，是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dynamicValidateForm1.children.push({
            specValue: '',
            key: Date.now()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  },
  created () {
    this.addSortShow()
    this.getSpecList()
  }
}
</script>
<style lang="less" scoped>
@zs_color: #ef4235; //主题颜色
table {
  border: solid #ffc6c6ff;
  border-width: 1px 0px 0px 1px;
  td {
    border: solid #ffc6c6ff;
    border-width: 0px 1px 1px 0px;
    padding-left: 10px;
    height: 60px;
  }
  margin-top: 50px;
  // text-align: center;
  .ordertitle {
    background: @zs_color;
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #fff;
    text-align: left;
    text-indent: 80px;
    font-size: 16px;
  }
  tbody {
    color: #333333 !important;
  }
}

.bg-purple {
  line-height: 50px;
}
.title {
  margin-top: 12px;
}
.title-name {
  font-size: 28px;
  font-family: MicrosoftYaHeiLight;
  font-weight: 300;
  color: @zs_color;
  text-align: left;
}
.content {
  //   min-height: 2077px;
  margin-top: 28px;
  padding: 15px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 15px;
  // .list {
  //   margin-top: 15px;
  //   border: 1px solid rgba(204, 204, 204, 1);
  //   margin-top: 10px;
  // }
  .page {
    margin-top: 20px;
    text-align: right;
  }
}
.preconter {
  // position: relative;
  // top: 92px;
  // left: 0;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  // align-items: center;
  // padding-top: 94px;
  width: 242px;
}

.swiper-container {
  // margin: 0 16px;
  // height: 150px !important;
  width: calc(100% - 2px);
}
.swiper-slide {
  // width: calc(100% - 40px);
  height: 240px;
  width: 240px;
  // max-height: 534px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    // margin: 0 10px;
  }
}
.pretitle {
  // margin-right: auto;
  // margin-left: auto;
  background: #ae1e24;
  color: #fff;
  font-weight: 500;
  width: calc(100% - 40px);
  // padding-left: 10px;
  padding: 0 20px;
  line-height: 40px;
}

.con {
  position: relative;
  // height: 500px;
  width: 280px;
  // overflow: hidden;
  margin: 0 auto;
  
}
.pre-con1 {
  position: relative;
  // width: 294px;
  // margin-right: auto;
  // margin-left: auto;
  margin: 0 16px;
  text-align: center;
  border-bottom: 1px dotted rgba(179, 179, 179, 1);
  padding: 12px 0;
  .pre-con-title {
    font-weight: 500;
    color: rgba(174, 30, 36, 1);
    font-size: 14px;
  }
  .pre-con-con {
    font-size: 10px;
    font-weight: 400;
    line-height: 26px;
    color: rgba(51, 51, 51, 1);
  }
  .pre-parameter {
    margin: 12px 0;
    display: flex;
    justify-content: space-around;
  }
  .parameter {
    width: 20%;

    font-size: 12px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .parameter1 {
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    font-size: 10px;
  }
  .pre-Zs-box {
    position: relative;
  }
  .pre-con-node {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pre-con-node-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      .nodeimg {
        width: 28px;
        height: 28px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .jiedian {
        font-size: 12px;
        color: #ae1e24;
      }
    }
    .pre-con-node-center {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .gou {
        z-index: 111;
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .dian {
        z-index: 111;
        width: 5px;
        height: 5px;
        margin-top: 7px;
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
    }
  }
  .xian {
    position: absolute;
    width: 1px;
    // height: 92%;
    height: 38px;
    left: 72px;
    top: 18px;
    background-color: #666;
  }
}
.pre-con2 {
  position: relative;
  margin: 0 16px;
  // width: 294px;
  // margin-right: auto;
  // margin-left: auto;
  border-bottom: 1px dotted rgba(179, 179, 179, 1);
  padding: 12px 0;
  .pre-con-title {
    text-align: center;
    font-weight: 500;
    color: rgba(174, 30, 36, 1);
    font-size: 14px;
  }
}
.item {
  padding: 0 5px 5px 0;
  font-size: 8px;
  display: flex;
  .left {
    text-align: right;
    color: grey;
    flex: 0.7;
  }
  .right {
    flex: 1;
    text-align: left;
  }
}
.pre-con2-con {
  display: flex;
  // width: 340px;
  margin-right: auto;
  margin-left: auto;
  padding: 12px 0;
  .pre-con2-con-logo {
    width: 60px;
    height: 60px;
    border: 1px solid rgba(179, 179, 179, 1);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pre-con2-con-cen {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .copo {
      font-weight: 500;
      color: #333333;
      font-size: 12px;
    }
    .copo2 {
      font-size: 12px;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
    }
  }
}
.spread {
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 16px;
  height: 16px;
  img {
    width: 100%;
    height: 100%;
  }
}
.chat-title {
  display: block;
  // max-width: 100%;
  max-width: 106px;
  margin-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-bubble {
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  margin-left: 16px;
  font-size: 10px;
  flex: 1;
  // max-width: 112px;
  position: relative;
  font-size: 10px;
  line-height: 44px;
  word-break: break-all;
  background: #fff;
  border: 1px solid #ae1e24;
  border-radius: 5px;
  max-width: 180px;
}

// .chat-bubble-left {}
.chat-bubble-left:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  top: 10px;
  border: 10px solid;
  border-color: transparent #ae1e24 transparent transparent;
}
.chat-bubble-left:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: -16px;
  top: 12px;
  border: 8px solid;
  border-color: transparent #ffffff transparent transparent;
}
</style>
<style lang="less" scoped>
@zs_color: #ef4235; //主题颜色
.adminSalesSetting {
  // min-width: 1250px;
  // overflow: hidden;
  .searchTitle {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: @zs_color;
    border-radius: 8px 0px 0px 8px;
    font-size: 14px;
  }
  .searchContent {
    width: 350px;
    height: 38px;
    line-height: 38px;
    border-radius: 0px 8px 8px 0px;
    font-size: 14px;
    border: 1px solid rgba(204, 204, 204, 1);
    text-indent: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .el-button--text {
    color: #eb611bff;
  }
  .el-table thead {
    color: @zs_color;
    font-weight: 500;
    tr {
      th {
        text-align: center;
        background: rgba(242, 242, 242, 1);
      }
    }
  }
  .el-table .cell {
    text-align: center;
  }
  .el-pagination__jump {
    .el-input {
      width: 50px;
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: @zs_color;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #000;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: @zs_color;
  }
  .el-button--primary {
    background: @zs_color;
    border: @zs_color;
  }
}
// .custom-tree-node {
//     flex: 1;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     font-size: 14px;
//     padding-right: 8px;
// }
</style>
<style lang="less" scoped>
@zs_color: #ef4235; //主题颜色
.adminSalesSetting {
  .el-tree-node__expand-icon {
    color: @zs_color!important;
  }
  .el-tree-node__content:hover {
    background-color: #eae0e3 !important;
  }
  /deep/.el-tree-node__content {
    height: 50px !important;
  }
  // .demo-form .demo-dynamic .el-input {
  //   position: relative;
  //   top: -40px;
  //   left: 260px;
  // }
  .demo-dynamic {
    position: relative;
    .removeDomainBtn {
      position: absolute;
      left: 300px;
      top: 2px;
    }
  }
}
</style>
