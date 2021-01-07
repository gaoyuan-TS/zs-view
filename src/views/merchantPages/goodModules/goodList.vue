<template>
  <div class="goodList">
    <page-content :name="$t('Goods.title')">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <div class="item-input">
              <!-- <div class="input-title">公司名称：</div> -->
              <el-input style="flex:0.8" v-model="param.goodsName" :placeholder="$t('Goods.goodNameInput')" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <!-- <div class="input-title">公司名称：</div> -->
              <el-cascader
                style="flex:0.8"
                :options="thirds"
                :props="{
                  value: 'categoryId',
                  label: 'categoryName',
                  children: 'children'
                }"
                clearable
                ref="cascader"
                v-model="param.categoryId"
            ></el-cascader>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-input">
              <div class="input-title">{{$t('common.date')}}</div>
              <el-date-picker
                style="flex:1; border: none"
                v-model="param.time"
                clearable
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startDate')"
                :end-placeholder="$t('common.endDate')"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="item-input item-button">
              <el-button type="primary" @click="goGoodNew">{{$t('button.new')}}</el-button>
              <!-- <el-button type="primary">搜索</el-button> -->
            </div>
          </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
          <el-col :span="24">
            <div class="list">
              <el-table :data="tableData" style="width: 100%" height="500" stripe>
                <el-table-column :label="$t('Goods.tableGoodName')">
                  <template slot-scope="scope">
                    <span :title="scope.row.goodsName" class="clamp" style="color: #AE1E24;cursor: pointer;">{{scope.row.goodsName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="categoryFullName" :label="$t('Goods.tableGoodType')"></el-table-column>
                <el-table-column prop="nearUpdateTime" :label="$t('Goods.tableGoodDate')"></el-table-column>
                <el-table-column prop="operation" :label="$t('common.Operation')">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="goEditGood(scope.row.goodsId)">{{$t('button.edit')}}</el-button>

                    <el-button type="text" size="small" @click="goAdminSalesSetting(scope.row)">{{$t('Goods.specSetting')}}</el-button>
                    <!-- <el-button
                      type="text"
                      size="small"
                    >{{$t('Goods.freightTemplate')}}</el-button> -->
                    
                    <el-button type="text" size="small" @click="tapChannel(scope.row.goodsId)">销售渠道</el-button>
                    <el-button type="text" size="small" @click="goscenariosList(scope.row.goodsId, scope.row.goodsName)">生产场景</el-button>
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
import pageContent from "../../../components/content";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      param: {
        goodsName: '',
        categoryId: [],
        merchantName: '',
        merchantType: '',
        allianceBusinessId: '',
        time: []
      },
      thirds: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      distrChannels: false,
      channelsFrom: {
        goodsId: '',
        tmall: '',
        jd: '',
        taobao: ''
      }
    }
  },
  watch: {
    param: {
      deep: true,
      handler: function() {
        this.pageNum = 1
        this.pageSize = 10
        this.getGoodList()
      }
    }
  },
  created() {
    this.getThird()
    this.getGoodList()
  },
  methods: {
    // 获取到商品类型
    getThird() {
      this.$get('/back-end/category/getThird').then(res => {
        this.thirds = res.data
      })
    },
    // 获取商品列表
    getGoodList() {
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

      if (this.param.time) {
        _param.startTime = this.param.time[0]
        _param.endTime = this.param.time[1]
      }

      this.$post('/back-end/goods/select', _param).then(res => {
        console.log(res)
        this.tableData = res.data ? res.data.list || [] : []
        this.total = res.code === 200 ? res.data.total : 0
      })
    } ,
    handleSizeChange(val) {
      this.pageSize = val
      this.getGoodList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getGoodList()
    },
    // 新建按钮（跳转到新建商品页面）
    goGoodNew() {
      this.$router.push({
        path: '/merchant/goodNew'
      })
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
    // 点击跳转到商品编辑页面
    goEditGood(goodId) {
      this.$router.push({
        path: '/merchant/goodEdit',
        query: {
          id: goodId
        }
      })
    },
    // 点击跳转到销售规格设置
    goAdminSalesSetting (data) {
      // console.log(data)
      let goodsName = data.goodsName
      let merchantName = data.merchantName
      let goodsId = data.goodsId
      let merchantId = data.merchantId
      this.$router.push(
        {
          path: '/merchant/setSpecifications',
          query: {
            goodsName: goodsName, 
            merchantName: merchantName, 
            goodsId: goodsId, 
            merchantId: merchantId
          }
        }
      )
    },
    // 跳转到生产场景列表页面
    goscenariosList(gId, gName) {
      this.$router.push({
        path: '/merchant/scenariosList',
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
  @zs_color: #ae1e24; //主题颜色
  /deep/.el-input input {
    border: none;
    border-radius: 0 !important;
  }
  /deep/.el-input__inner {
    border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
    padding: 0 !important;
  }
  .goodList {
    .content {
      margin-top: 22px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // height: 7.82rem;
      padding: 20px;
    }
    .page {
      margin-top: 20px;
      text-align: right;
      // height: 0.32rem;
      /deep/.el-pagination {
        height: 100%;
        padding: 0;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>