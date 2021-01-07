<template>
  <div class="goodlist">
    <page-content :name="$t('Goods.goodList.goodListTitle')">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="7" style="margin-right:50px">
            <!-- 商品名称 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Goods.goodList.goodNameInput')}}：</div> -->
              <el-input clearable v-model="param.goodsName" :placeholder="$t('Goods.goodList.goodNameInput')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7" style="margin-right:50px">
             <!-- 商品类型 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Goods.goodList.goodTypeInput')}}：</div> -->
              <!-- <el-input placeholder="商品类型" style="flex: 1"></el-input> -->
              <el-cascader
                style="flex: 1"
                :placeholder="$t('Goods.goodList.goodTypeInput')"
                :options="thirds"
                clearable
                ref="cascader"
                v-model="param.categoryId"
              ></el-cascader>
            </div>
          </el-col>
          <el-col :span="7">
            <!-- 商家名称 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Goods.goodList.merchantName')}}：</div> -->
              <el-input clearable v-model="param.merchantName" :placeholder="$t('Goods.goodList.merchantName')" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="7" v-if="addBooler">
            <!-- 公司名称 -->
            <div class="item-input">
              <!-- <div class="input-title">{{$t('Goods.goodList.companyName')}}：</div> -->
              <el-input clearable v-model="param.companyName" :placeholder="$t('Goods.goodList.companyName')" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="7"> 
            <!-- 创建日期 -->
            <div class="item-input">
              <div class="input-title">{{$t('Goods.goodList.creationDate')}}：</div>
              <el-date-picker style="flex: 1" v-model="param.time" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" :range-separator="$t('common.to')" :start-placeholder="$t('common.startDate')" :end-placeholder="$t('common.endDate')">
              </el-date-picker>
            </div>
          </el-col>
          <!-- 新建 -->
          <el-col :span="7">
            <div class="item-input item-button">
              <el-button type="primary" @click="initGoodList">搜索</el-button>
              <el-button type="primary" @click="toAdminGoodNew" v-if="!addBooler">{{$t('button.new')}}</el-button>
            </div>
          </el-col>

          
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <!-- 商品名称 -->
                <el-table-column :label="$t('Goods.goodList.goodNameInput')">
                  <template slot-scope="{row}">
                    <span :title="row.goodsName" class="clamp" style="color: #AE1E24;cursor: pointer;" @click="goGoodDetail(row.goodsId)">{{row.goodsName}}</span>
                  </template>
                </el-table-column>
                <!-- 商品类型 -->
                <el-table-column prop="categoryFullName" :label="$t('Goods.goodList.goodTypeInput')"></el-table-column>
                <!-- 公司名称 -->
                <el-table-column :label="$t('Goods.goodList.companyName')" v-if="addBooler">
                  <template slot-scope="{row}">
                    <span>{{row.allianceBusinessName || '---'}}</span>
                  </template>
                </el-table-column>
                <!-- 商家名称 -->
                <el-table-column prop="merchantName" :label="$t('Goods.goodList.merchantName')"></el-table-column>
                <!-- 商家类型 -->
                <el-table-column prop="merchantType" :label="$t('Goods.goodList.merchantType')" width="100"></el-table-column>
                <!-- 最近商品编辑日期 -->
                <el-table-column prop="nearUpdateTime" :label="$t('Goods.goodList.tableGoodDate')"></el-table-column>
                <!-- 操作 -->
                <el-table-column prop="operation" :label="$t('common.Operation')">
                  <template slot-scope="{row}">
                    <!-- <div class="option-item" @click="setOborSale(row)">
                      <div>{{$t('Goods.goodList.theBeltAndRoad')}}</div>
                      <div>{{row.internationalSales ? $t('Goods.goodList.off') : $t('Goods.goodList.hits')}}</div>
                    </div> -->
                    <el-button type="text" size="small" @click="setOborSale(row)" v-if="!addBooler">
                      {{$t('Goods.goodList.theBeltAndRoad')}}{{row.internationalSales ? $t('Goods.goodList.off') : $t('Goods.goodList.hits')}}
                    </el-button>
                    <el-button type="text" size="small" @click="goEditGood(row)">{{$t('button.edit')}}</el-button>
                    <el-button type="text" size="small" @click="goScenelist(row.goodsId, row.goodsName)">生产场景</el-button>
                    <el-button type="text" size="small" @click="tapChannel(row.goodsId)">销售渠道</el-button>
                    <!-- @click="setOborSale(scope.row)" -->
                    <!-- <el-button type="text" size="small" slot="reference" @click="setOborSale(row)">
                      {{$t('Goods.goodList.theBeltAndRoad')}}
                      {{row.internationalSales ? $t('Goods.goodList.off') : $t('Goods.goodList.hits')}}
                    </el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <!-- <el-row> -->
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
        <!-- </el-row> -->
      </div>
      <el-dialog :visible.sync="distrChannels">
        <div slot="title" style="font-size: 16px">销售渠道</div>
        <div class="distrChannels-con">
          <div class="item">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div>
              <el-input placeholder="天猫" v-model="channelsFrom.tmall"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 40px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div>
              <el-input placeholder="京东" v-model="channelsFrom.jd"></el-input>
            </div>
          </div>
          <div class="item" style="margin-top: 40px">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
            <div>
              <el-input placeholder="淘宝" v-model="channelsFrom.taobao"></el-input>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <div>
            <el-button type="primary" @click="sellChannel">{{this.$t('button.Comfirm')}}</el-button>
            <el-button type="danger" style="margin-left: 56px" @click="distrChannels = false">{{this.$t('button.cancel')}}</el-button>
          </div>
          
        </div>
      </el-dialog>
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
      addBooler: false, // 判断是否为运营人员
      tableData: [],  // 表格数据
      merchantTypes: [], // 商家类型列表
      thirds: [], // 商品类型列表
      param: {
        goodsName: '',  // 	商品名称
        categoryId: [],  //三级分类ID
        merchantName: '',  // 商家名称
        companyName: '',  // 公司名称 (仅总部管理员角色时生效)
        time: []  // 时间
      },
      timer: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      distrChannels: false, // 销售渠道弹窗的状态
      channelsFrom: {
        goodsId: '',
        tmall: '',
        jd: '',
        taobao: ''
      }
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      if (roleJson.role.roleName === 'ROLE_HEADQUARTERS_ADMIN' || roleJson.role.roleName === 'ROLE_FRANCHISEE_ADMIN') {
        this.addBooler = true
      } else {
        this.addBooler = false
      }
    }
    this.goodList()
    this.getThird()
  },
  methods: {
    // 获取到商品列表
    goodList () {
      let _param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.param.goodsName) {
        _param.goodsName = this.param.goodsName
      }
      if (this.param.categoryId) {
        _param.categoryId = this.param.categoryId[2]
      }
      if (this.param.merchantName) {
        _param.merchantName = this.param.merchantName
      }
       if (this.param.companyName) {
        _param.companyName = this.param.companyName
      }
      if (this.param.categoryId) {
        _param.categoryId = this.param.categoryId[2]
      }
      if (this.param.time) {
        _param.startTime = this.param.time[0]
        _param.endTime = this.param.time[1]
      }
      if (this.param.allianceBusinessId) {
        _param.companyName = this.param.allianceBusinessId
      }
      this.$post('/back-end/goods/select', _param).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },

    initGoodList() {
      this.pageNum = 1
      this.pageSize = 10
      this.goodList()
    },

    // 获取商品类型
    getThird () {
      this.$get('/back-end/category/getThird').then(res => {
        var _data = res.data
        var _thirds = []
        for (var i = 0; i < _data.length; i++) {
          _thirds.push({
            value: _data[i].categoryId,
            label: _data[i].categoryName,
            children: []
          })
          if (_data[i].children.length > 0) {
            for (var j = 0; j < _data[i].children.length; j++) {
              var _children = {
                value: _data[i].children[j].categoryId,
                label: _data[i].children[j].categoryName
              }
              if (_data[i].children[j].children.length > 0) {
                var sons = _data[i].children[j].children
                _children.children = []
                for (var k = 0; k < sons.length; k++) {
                  var _sons = {
                    value: sons[k].categoryId,
                    label: sons[k].categoryName
                  }
                  _children.children.push(_sons)
                }
              }
              _thirds[i].children.push(_children)
            }
          }
        }
        this.thirds = _thirds
      })
    },

    // 监听输入事件
    handleInput() {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.initGoodList()
      },300)
    },
    // 点击销售渠道按钮
    tapChannel(gid) {
      this.$get('/trace-api/material/goodsSellChannelForEditPage/' + gid).then(res => {
        if (res.data) {
          this.channelsFrom = {
            goodsId: res.data.goodsId,
            tmall: res.data.tmall,
            jd: res.data.jd,
            taobao: res.data.taobao
          }
        } else {
          this.channelsFrom = {
            goodsId: gid,
            tmall: '',
            jd: '',
            taobao: ''
          }
        }
        this.distrChannels = true
      })
    },
    // 设置销售渠道
    sellChannel() {
      let _param = this.channelsFrom

      this.$post('/trace-api/material/newOrModifyGoodsSellChannel', _param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.distrChannels = false
          this.channelsFrom = {
            goodsId: '',
            tmall: '',
            jd: '',
            taobao: ''
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 点击新建跳转到新建商品模块
    toAdminGoodNew() {
      console.log('跳转到新建商品模块')
      this.$router.push({
        path: '/manage/newGood'
      })
    },

    // 点击表格商品名称跳转到详情页
    goGoodDetail (goodsId) {
      console.log(goodsId)
      // this.$router.push({
      //   path: '/index/adminGoodDetail',
      //   query: {
      //     id: goodsId
      //   }
      // })
    },
    // 前往编辑商品页面
    goEditGood(row) {
      this.$router.push({
        path: '/manage/editGood',
        query: {
          id: row.goodsId
        }
      })
    },
    // 点击一带一路
    setOborSale(row) {
      let title = row.internationalSales ? this.$t('Goods.goodList.offTips') : this.$t('Goods.goodList.hitTips')
      this.$confirm(title, this.$t('confirm.tip'), {
        confirmButtonText: this.$t('button.Comfirm'),
        cancelButtonText: this.$t('button.cancel')
      }).then(() => {
        this.$get('/back-end/goods/oborSale', {
          goodsId: row.goodsId
        }).then(res => {
          if (res.code === 200) {
            this.$common.success(res.desc)
            this.goodList()
          }
        })
      })
    },

    // 改变页容量
    handleSizeChange(val) {
      this.pageSize = val
      this.initGoodList()
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.pageNum = val 
      this.goodList()
    },
    // 前往生产场景列表页面
    goScenelist(gId, gName) {
      this.$router.push({
        path: '/manage/goodList/sceneList',
        query: {
          goodsId: gId,
          goodName: gName
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.el-input input {
    border: none;
    border-radius: 0 !important;
  }
  /deep/.el-input__inner {
    border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
    padding: 0 !important;
  }
  .goodlist {
    .content {
      margin-top: 22px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;

      .option-item {
        font-size: 13px;
        color: #2196F3; 
        text-align: center;
        &:hover {
          cursor: pointer;
        }
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
  }
</style>