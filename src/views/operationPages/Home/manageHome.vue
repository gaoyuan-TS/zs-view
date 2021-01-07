<template>
  <div class="manageHome">
    <!-- 数据总量显示 -->
    <div class="manageHome-gross">
      <div class="grosslist">
        <div class="gross">
          <div class="gross-left" style="background:rgba(205,26,87,1)">
            <img src="../../../assets/images/operationHome/retrospect.png" alt />
          </div>
          <div class="gross-right" style="background:rgba(233,30,99,1);">
            <div>
              <div>{{$t('manageHome.traceTotal')}}</div>
              <div class="num">{{traceTotalCount.totalTraceCount || 0}}</div>
            </div>
            <div>
              <div> {{$t('manageHome.yesterdayTotal')}}</div>
              <div class="num num2">{{traceTotalCount.yestTraceCount || 0}}</div>
            </div>
          </div>
        </div>
        <div class="gross">
          <div class="gross-left" style="background:rgba(0,165,186,1)">
            <img src="../../../assets/images/operationHome/商家.png" alt />
          </div>
          <div class="gross-right" style="background:rgba(0,188,212,1);">
            <div>
              <div> {{$t('manageHome.sellerTotal')}}</div>
              <div class="num">{{adminiStratorInfo.merchantCount || 0}}</div>
            </div>
            <div>
              <div>{{$t('manageHome.yesterdaySellerTotal')}}</div>
              <div class="num num2">{{adminiStratorInfo.yesterdayMerchantCount || 0}}</div>
            </div>
          </div>
        </div>
        <div class="gross">
          <div class="gross-left" style="background: rgba(122, 171, 65, 1)">
            <img src="../../../assets/images/operationHome/商品.png" alt />
          </div>
          <div class="gross-right" style="background:rgba(139,195,74,1);">
            <div>
              <div>{{$t('manageHome.goodTotal')}}</div>
              <div class="num">{{adminiStratorInfo.goodsCount || 0}}</div>
            </div>
            <div>
              <div>{{$t('manageHome.yesterDayTotal')}}</div>
              <div class="num num2">{{adminiStratorInfo.yesterdayGoodsCount || 0}}</div>
            </div>
          </div>
        </div>
        <div class="gross">
          <div class="gross-left" style="background: rgba(224, 134, 0, 1)">
            <img src="../../../assets/images/operationHome/扫码.png" alt />
          </div>
          <div class="gross-right" style="background: rgba(255, 152, 0, 1)">
            <div>
              <div>{{$t('manageHome.scanCodeTotal')}}</div>
              <div class="num">{{scanCount.totalScanCount}}</div>
            </div>
            <div>
              <div>{{$t('manageHome.yesterDayscanCodeTotal')}}</div>

              <div class="num num2">{{scanCount.yestScanCount}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 柱状图显示 -->
    <div class="histogram">
      <!-- 选择类别栏 -->
      <div class="histogram-table">
        <div class="histogram-table-left">
          <div
            class="item"
            v-for="(tab, tidx) in tabs"
            :key="tidx"
            :class="activeName === tab.activeName ? 'itemActive' : ''"
            @click="tabSet(tab.activeName)"
          >{{tab.name}}</div>
        </div>
        <div class="histogram-table-right">
          <div class="item" :class="range === 1 ? 'itemActive' : ''" @click="range = 1">{{$t('manageHome.ThisWeek')}}</div>
          <div class="item" style="margin-left: 28px" :class="range === 2 ? 'itemActive' : ''" @click="range = 2">{{$t('manageHome.ThisMonth')}}</div>
          <div class="item" style="margin-left: 28px" :class="range === 3 ? 'itemActive' : ''" @click="range = 3">{{$t('manageHome.ThisYear')}}</div>
        </div>
      </div>
      <div class="treeMap" v-if="activeName === 'second'">
        <div :class="className" class="second"  :id="id" :style="{height:height}" ref="myEchart"></div>
      </div>
      <!-- 商家增量 -->
      <div class="treeMap" v-if="activeName === 'first'">
        <!-- qwee -->
        <div :style="{height: height}" class="first" ref="firstChart"></div>
      </div>
      <!-- 商品增量 -->
      <div class="treeMap" v-if="activeName === 'papery'">
        <!-- weerr -->
        <div :style="{height: height}" class="papery" ref="papery"></div>
      </div>
    </div>

    <!-- 商家追溯排名及商品类别占比 -->
    <div class="manageHome-rankingPro">
      <!-- 商家追溯排名 -->
      <div class="merchantranking">
        <div class="title">{{$t('manageHome.rankingName')}}</div>
        <div class="rankinglist" v-if="rankList.length > 0">
          <div class="rank"   v-for="(item,index) in rankList" :key="index" >
            <div>{{index+1}}、{{item.merchantName}}</div>
            <div>{{item.traceCount}}</div>
          </div>
         
        </div>
      </div>
      <!-- 商品类别占比 -->
      <div class="proportion">
        <div :style="{height:height2}" ref="myEchart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import i18n from '../../../i18n/i18n';
export default {
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    height: {
      type: String,
      default: "300px"
    },
    width2: {
      type: String,
      default: "1200px"
    },
    height2: {
      type: String,
      default: "250px"
    }
  },
  data() {
    return {
      value6: "",
      allianType: true,
      traceTotalCount: "",
      chart: null,
      options: [
        {
          value: 0,
          label: "总部"
        }
      ],
      FirstChart: null,
      PaperyChart: null,
      companyId: "", // 加盟商Id
      pieData: "",
      activeName: "second",
      range: 3, // 选择周月年
      adminiStratorInfo: "",
      tabs: [
        { name: i18n.t('manageHome.RetroactiveAmount'), activeName: "second" },
        { name:i18n.t('manageHome.MerchantIncrement'), activeName: "first" },
        { name: i18n.t('manageHome.CommodityIncrement'), activeName: "papery" }
      ],
      rankList: [
        { name: "工专路一号店", rank: "1", much: "323234" },
        { name: "工专路二号店", rank: "2", much: "323234" },
        { name: "工专路三号店", rank: "3", much: "323234" },
        { name: "工专路四号店", rank: "4", much: "323234" },
        { name: "工专路五号店", rank: "5", much: "323234" },
        { name: "工专路六号店", rank: "6", much: "323234" },
        { name: "工专路七号店", rank: "7", much: "323234" },
        { name: "工专路八号店", rank: "8", much: "323234" }
      ],
      tableData: [
        { name: "工专路一号店", rank: "1", much: "323234", new: "21518" },
        { name: "工专路二号店", rank: "2", much: "323234", new: "21518" },
        { name: "工专路三号店", rank: "3", much: "323234", new: "21518" },
        { name: "工专路四号店", rank: "4", much: "323234", new: "21518" },
        { name: "工专路五号店", rank: "5", much: "323234", new: "21518" },
        { name: "工专路六号店", rank: "6", much: "323234", new: "21518" },
        { name: "工专路七号店", rank: "7", much: "323234", new: "21518" },
        { name: "工专路八号店", rank: "8", much: "323234", new: "21518" }
      ],
      scanCount: "",
      chart1:''
    };
  },
  async created() {
    this.getTraceTotalCountAndYest();
    if (
      this.$localStore.get("roleJson").role.roleName ===
      "ROLE_HEADQUARTERS_ADMIN"
    ) {
      this.allianType = true;
      this.getAllianceBusiness();
    } else {
      this.companyId = this.$localStore.get(
        "roleJson"
      ).allianceBusiness.allianceBusinessId;
      this.allianType = false;
    }
    this.getBusiTraceRank()
    this.getTraceTotalCountAndYest()
    this.getScanCount()
  },
  watch: {
    companyId(newValue, oldValue) {
      this.getTraceTotalCountAndYest();
      this.getAdministratorInfo();
      this.getScanCount();
      this.getZsChartData();
      this.getFirstChart();
      this.getPaperyChart();
      this.getBusiTraceRank();
      this.initChart2();
      // this.getBusiTraceRank()
    },
    range(newValue, oldValue) {
      // this.getFirstChart()
      // this.getPaperyChart()
      this.handle();
      this.getBusiTraceRank();
    },
    activeName(newValue, oldValue) {
      console.log("newValue", newValue);
      if (newValue === "first") {
        this.getFirstChart();
      } else if (newValue === "papery") {
        this.getPaperyChart();
      } else {
        this.getZsChartData();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getZsChartData();
      this.getAdministratorInfo();
      this.initChart2();
    
    });
      window.onresize = () => {
      //  根据窗口大小调整曲线大小
      this.chart.resize();
    };
    
  },
  methods: {
        // 获取追溯扫码数量
    getScanCount () {
      this.$get('/trace-api/trace/getTraceScanCountAndYest', {
        companyId: this.companyId === '' ? null : this.companyId
      }).then(res => {
        if (res.code === 200) {
          this.scanCount = res.data
        }
      })
    },
      handle () {
      if (this.activeName === 'first') {
        this.getFirstChart()
      } else if (this.activeName === 'papery') {
        this.getPaperyChart()
      } else {
        this.getZsChartData()
      }
    },
    // 商家增量图表
    getFirstChart() {
      var _param = {
        allianceBusinessId: this.companyId === "" ? null : this.companyId,
        range: this.range,
        type: 1
      };
      this.$get("/back-end/homePage/getAdministratorIncrementInfo", _param)
        .then(res => {
          if (res.code === 200) {
            this.initFirstChart(res.data);
          } else if (res.code === 401) {
            this.$message.error("请重新登录此账号！");
          }
        });
    },
    initFirstChart(_data) {
      this.chart = echarts.init(this.$refs.firstChart);
      // 把配置和数据放这里
      this.chart.setOption({
        color: ["#00BCD4"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: _data.displayList,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "增加的数量",
            type: "bar",
            barWidth: "60%",
            data: _data.increment
          }
        ]
      });
    },
    initPaperyChart(_data) {
      this.chart = echarts.init(this.$refs.papery);
      
      // 把配置和数据放这里
      this.chart.setOption({
        color: ["#00BCD4"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: _data.displayList,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "增加的数量",
            type: "bar",
            barWidth: "60%",
            data: _data.increment
          }
        ]
      });
    },
    // 商品增量图表
    getPaperyChart() {
      var _param = {
        allianceBusinessId: this.companyId === "" ? null : this.companyId,
        range: this.range,
        type: 0
      };
      this.$get("/back-end/homePage/getAdministratorIncrementInfo", _param)
        .then(res => {
          if (res.code === 200) {
            this.initPaperyChart(res.data);
          } else if (res.code === 401) {
            this.$$message.error("请重新登录此账号！");
          }
        });
    },
    // 获取加盟商列表
    getAllianceBusiness() {
      this.$post("/back-end/allianceBusiness/select", {
          pageNum: 1,
          pageSize: 1000000
        })
        .then(res => {
          if (res.code === 200) {
            var _alliance = res.data.list;
            _alliance.forEach(item => {
              var optItem = {
                value: item.allianceBusinessId,
                label: item.allianceBusinessName
              };
              this.options.push(optItem);
            });
          } else if (res.code === 401) {
            this.$message.error("请重新登录此账号！");
          }
        });
    },
    tabSet(name) {
      console.log(name);
      this.activeName = name;
    },
    // 追溯额增量
    initChart(_data) {
      this.chart = echarts.init(this.$refs.myEchart);
    
      // 把配置和数据放这里
      this.chart.setOption({
        color: ["#00BCD4"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: _data.chartTitleList,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "增加的数量",
            type: "bar",
            barWidth: "60%",
            data: _data.chartDataList
          }
        ]
      });
    },
    // 追溯额商品类别占比
    initChart2() {
      // var _pieData = ''
      this.$get("/trace-api/trace/getPieChart", {
          companyId: this.companyId === "" ? null : this.companyId
        })
        .then(res => {
          console.log(res.data)
          if (res.code === 200) {
            var _data = res.data;
            var leData = [];
            _data.forEach(item => {
              leData.push(item.name);
            });
            this.pieData = res.data;
            this.chart1 = echarts.init(this.$refs.myEchart2);
            // 把配置和数据放这里
            this.chart1.setOption({
              color: [
                "#AE1E24",
                "#FF756B",
                "#F99432",
                "#72B3FF",
                "#818FFC",
                "#5FEF8B",
                "#F9D322",
                "#bda29a",
                "#6e7074",
                "#546570",
                "#c4ccd3"
              ],
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                x: "right",
                data: leData
              },
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: ["30%", "70%"],
                  center: ["50%", "60%"],
                  data: this.pieData,
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,
                        formatter: "{b} : {c} ({d}%)"
                      },
                      labelLine: { show: true }
                    }
                  }
                }
              ]
            });
          }
        });
      // console.log(this.pieData)
    },
    // 商家追溯排名
    getBusiTraceRank() {
      this.$get("/trace-api/trace/getBusiTraceRank", {
        companyId: this.companyId === "" ? null : this.companyId,
        chartType: this.range,
        pageNum: 1,
        pageSize: 1000
      }).then(res => {
        console.log(res)
   
        if (res.code === 200) {
          this.rankList = res.data.list;
          // var _rankList = res.data.data.list
          // for (let i = 0; i < 10; i++) {
          //   this.rankList[i].rank = i+1
          // }
          this.rankList.forEach((item, idx) => {
            item.rank = idx + 1;
          });
        } else {
        }
      });
    },
    // 追溯额增量
    getZsChartData() {
      this.$get("/trace-api/trace/getChartData", {
        companyId: this.companyId === "" ? null : this.companyId,
        chartType: this.range
      }).then(res => {
        if (res.code === 200) {
          this.initChart(res.data);
        }
      });
    },
    // 商家数与商品数
    getAdministratorInfo() {
      var _param = {
        allianceBusinessId: this.companyId === "" ? null : this.companyId
      };
      this.$get("/back-end/homePage/getAdministratorBasicInfo", _param).then(
        res => {
          this.adminiStratorInfo = res.data;
          if (res.code === 200) {
            // this.initFirstChart(res.data.data.merchantIncrement)
          }
        }
      );
    },
    // 获取总追溯码数量
    getTraceTotalCountAndYest() {
      this.$get("/trace-api/trace/getTraceTotalCountAndYest", {
        companyId: this.companyId === "" ? null : this.companyId
      }).then(res => {
        if (res.code === 200) {
          this.traceTotalCount = res.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.manageHome {
  .manageHome-gross {
    .grosslist {
      display: flex;
      justify-content: space-between;

      .gross {
        width: 24%;
        height: 0.8rem;
        display: flex;
        .gross-left {
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          // background: rgba(205, 26, 87, 1);
        }
        .gross-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-weight: 400;
          font-size: 0.14rem;
          color: rgba(255, 255, 255, 1);
          .num {
            font-size: 0.24rem;
            margin-top: 4px;
          }
          .num2 {
            text-align: right;
          }
          // background: rgba(233, 30, 99, 1);
        }
      }
    }
  }
  .histogram {
    padding: 0.1rem 0 0.24rem 0;
    margin-top: 28px;
    height: 5.44rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    .histogram-table {
      padding: 0 0.3rem 0 0.18rem;
      display: flex;
      justify-content: space-between;
      height: 0.6rem;
      align-items: center;
      border-bottom: 1px solid rgba(242, 242, 242, 1);
      .histogram-table-left {
        display: flex;
        font-size: 0.16rem;
        font-weight: 400;
        line-height: 0.32rem;
        .item {
          color: rgba(128, 128, 128, 1);
          margin-left: 0.32rem;
        }
        .itemActive {
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          border-bottom: 2px solid rgba(0, 188, 212, 1);
        }
      }
      .histogram-table-right {
        display: flex;
        font-size: 0.14rem;
        .item {
          color: rgba(128, 128, 128, 1);
        }
        .itemActive {
          color: rgba(0, 188, 212, 1);
          font-weight: bold;
        }
      }
    }
  }
  .manageHome-rankingPro {
    display: flex;
    justify-content: space-between;
    height: 3.76rem;
    margin-top: 0.2rem;
    margin-bottom: 0.1rem;
    // margin-bottom:;
    .merchantranking {
      overflow: hidden;
      width: 49%;
      background: rgba(233, 30, 99, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      // padding: 0 21px;
      .title {
        margin: 0 21px;
        font-size: 16px;
        font-weight: bold;
        line-height: 48px;
        color: rgba(255, 255, 255, 1);
      }
      .rankinglist {
        width: calc(100% + 18px);
        height: calc(100% - 48px);
        overflow: auto;
        margin: 0 21px;
        color: rgba(255, 255, 255, 1);
        .rank {
          padding-right: 50px;

          display: flex;
          justify-content: space-between;
          font-size: 14px;
          line-height: 36px;
        }
      }
    }
    .proportion {
      width: 49%;
      background: rgba(0, 150, 136, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>