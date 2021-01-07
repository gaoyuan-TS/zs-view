import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录页面
import login from '../views/login/login.vue'
import Home from '../views/Home.vue'
/**
 * 运营端 op（网址）
 */
// 管理员首页
import manageHome from '../views/operationPages/Home/manageHome.vue'


// 加盟商列表
import allianceBusinessList from '../views/operationPages/allianceBusiness/allianceBusinessList.vue'

// 商品列表
import goodlistManage from '../views/operationPages/goodModule/goodList.vue'
// 新建商品
import manaNewGood from '../views/operationPages/goodModule/newGood.vue'
// 编辑商品
import manaEditGood from '../views/operationPages/goodModule/editGood.vue'
// 商品的生产场景列表
import sceneList from '../views/operationPages/goodModule/scene/sceneList.vue'
// 新建生产场景
import manageNewScene from '../views/operationPages/goodModule/scene/newScenarios.vue'
// 编辑生产场景
import manageEditScene from '../views/operationPages/goodModule/scene/editScenarios.vue'


// 账号列表
import accountList from "../views/operationPages/accountModule/accountList.vue"

// 商家模块
// 商家列表
import merchantList from "../views/operationPages/merchantModule/merchantList.vue"
// 商家详情
import merchantDetail from "../views/operationPages/merchantModule/merchantDetail"
// 新建商家
import manaMerchantNew from '../views/operationPages/merchantModule/merchantNew.vue'
// 编辑商家
import manaMerchantEdit from '../views/operationPages/merchantModule/merchantEdit.vue'
// 摊位列表
import manaBoothList from '../views/operationPages/agriculturalTrade/boothList.vue'
// 摊主列表
import manaStallholderList from '../views/operationPages/agriculturalTrade/stallholderList.vue'
// 查看商品
import manaStallGoodList from '../views/operationPages/agriculturalTrade/goodList.vue'

// 追溯列表
import retrospectList from "../views/operationPages/retrospectModule/retrospectList.vue"
// 追溯列表-录入追溯信息
import retrospectEnter from "../views/operationPages/retrospectModule/retrospectEnter.vue"
// 追溯列表-记录
import retrospectRecords from "../views/operationPages/retrospectModule/retrospectRecords"

// 生产批次
//生产批次列表
import manageProBatch from '../views/operationPages/proBatch/proBatchList.vue'
// 新建生产批次
import manaNewProbatch from '../views/operationPages/proBatch/newProductionBatch.vue'
// 编辑生产批次
import manaEditProbatch from '../views/operationPages/proBatch/editProductionBatch.vue'


// 分类模块
// 分类
import classify from '../views/operationPages/classify/classify.vue'


/**
 * 商家端 zs(网址)
 */
// 商家首页
import merchantHome from '../views/merchantPages/Home/merchantHome.vue'
// 商家资料页
import merMerchantDetail from '../views/merchantPages/merchantModules/merchantDetail.vue'
// 商家编辑页面
import merMerchantEdit from '../views/merchantPages/merchantModules/merchantEdit.vue'
// 完善商家资料页
import merMerchantNew from '../views/merchantPages/merchantModules/merchantNew.vue' 

// 员工模块
import employeelist from '../views/merchantPages/employeeModules/employeeList.vue'

// 原材料模块
// 原材料列表
import materialList from '../views/merchantPages/materialModules/materialList.vue'
// 新增原材料
import newMaterial from '../views/merchantPages/materialModules/newMaterial.vue'

// 商品模块
// 商品列表
import goodList from '../views/merchantPages/goodModules/goodList.vue'
// 新建商品
import goodNew from '../views/merchantPages/goodModules/newGood.vue'
// 编辑商品
import goodEdit from '../views/merchantPages/goodModules/editGood.vue'
// 设置规格
import setSpecifications from '../views/merchantPages/goodModules/setSpecifications.vue'
// 商品的生产场景列表页面
import scenariosList from '../views/merchantPages/goodModules/scenariosModules/scenariosList.vue'
// 新建生产场景
import newScenarios from '../views/merchantPages/goodModules/scenariosModules/newScenarios.vue'
// 编辑生产场景
import editScenarios from '../views/merchantPages/goodModules/scenariosModules/editScenarios.vue'

// 生产批次模块
// 生产批次列表
import productionBatchList from '../views/merchantPages/proBatch/proBatchList.vue'
// 新建生产批次
import newProBatch from '../views/merchantPages/proBatch/newProductionBatch.vue'
import editProBatch from '../views/merchantPages/proBatch/editProductionBatch.vue'

// 订单模块
// 订单列表
import orderList from '../views/merchantPages/orderModules/orderList.vue'
import orderDetail from '../views/merchantPages/orderModules/orderDetail.vue'

// 售后模块
// 售后列表
import afterSalesList from '../views/merchantPages/afterSalesModules/afterSalesList.vue'

// 退款模块
// 退款列表
import refundList from '../views/merchantPages/refundModules/refundList.vue'

// 追溯模块
// 追溯列表
import traceList from '../views/merchantPages/tracingModule/tracingList.vue'
// 追溯记录
import traceRecords from '../views/merchantPages/tracingModule/traceRecords.vue'
// 录入追溯信息
import traceInformation from '../views/merchantPages/tracingModule/enterTraceInformation.vue'

// 代理商模块
// 代理商列表
import agentList from '../views/merchantPages/agentModules/agentList.vue'
// 待审核代理商列表
import agentingList from '../views/merchantPages/agentModules/agentingList.vue'

// 充值模块
// 充值中心
import topUpCenter from '../views/merchantPages/topUpModules/topUpCenter.vue'
// 积分充值页面
import buyPoins from '../views/merchantPages/topUpModules/buyPoins.vue'
// 认证支付页面
import certificationPay from '../views/merchantPages/topUpModules/certificationPay.vue'

// 显示支付二维码页
import aliPay from '../views/merchantPages/topUpModules/aliPay.vue'
// 显示支付二维码的页面(微信支付)
import suCode from '../views/merchantPages/topUpModules/sunCode.vue'
// 添加追溯点扣减记录
import deductionsRecord from '../views/merchantPages/topUpModules/deductionsRecord.vue'
// 追溯消耗明细
import traceConDetails from '../views/merchantPages/topUpModules/traceConsumptionDetail.vue'

// 召回模块
// 召回列表
import cargoList from '../views/merchantPages/cargoModules/cargoList'
// 处理召回
import dealWith from '../views/merchantPages/cargoModules/dealWith.vue'
// 处理详情
import recallDetail from '../views/merchantPages/cargoModules/recallDetail.vue'

// 串货模块
// 串货列表
import recllList from '../views/merchantPages/recallModules/recllList'
// 串货明细列表
import cargoDetailList from '../views/merchantPages/recallModules/cargoDetailList'

// 销毁模块
// 销毁列表
import destroyList from '../views/merchantPages/destroyModules/destroyList'

// 投诉模块
// 投诉列表
import complainList from '../views/merchantPages/complainModiles/complainList'


// 农贸商家
// 摊位列表
import boothList from '../views/merchantPages/agriculturalTrade/boothList.vue'
// 摊主列表
import stallholderList from '../views/merchantPages/agriculturalTrade/stallholderList.vue'
// 查看商品列表
import stallGoodList from '../views/merchantPages/agriculturalTrade/goodList.vue'



// 运营端 ----- 标码中心角色
// 标签预留
import labelReserveList from '../views/codeCenterPages/labelModules/labelReserveList'
// 标签审核
import labelApplicationList from '../views/codeCenterPages/labelModules/labelApplicationList'
// 标签发放明细
import labelDistributeList from '../views/codeCenterPages/labelModules/labelDistributeList'


// 总部运营模块开始
// 总部运营首页
import headquartersHome from '../views/operationPages/Home/headquartersHome.vue'

// 总部财务
// 认证记录
import BusinessCertificationRecord from '../views/financePages/pages/CertificationList'
import MerchantRechargeRecord from '../views/financePages/pages/rechargeList.vue'

//  总部财务模块开始
// 总部财务
import HeadquartersFinance from '../views/operationPages/Home/HeadquartersFinance.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/merchant/employeelist',
    children: [
      {
        path: '/merchant/merchantNew',
        name: 'merMerchantNew',
        component: merMerchantNew,
        meta: { title: '完善商家资料'}
      },
      {
        path: '/merchant/merchantHome',
        name: 'merchantHome',
        component: merchantHome,
        meta: { title: '商家首页'}
      },
      {
        path: '/merchant/merchantDetail',
        name: 'merchantDetail',
        component: merMerchantDetail,
        meta: { title: '商家资料'}
      },
      {
        path: '/merchant/merMerchantEdit',
        name: 'merMerchantEdit',
        component: merMerchantEdit
      },
      {
        path: '/merchant/employeelist',
        name: 'employeelist',
        component: employeelist,
        meta: { title: '员工列表'}
      },
      {
        path: '/merchant/materialList',
        name: 'materialList',
        component: materialList,
        meta: { title: '原材料列表' }
      },
      {
        path: '/merchant/newMaterial',
        name: 'newMaterial',
        component: newMaterial,
        meta: { title: '新增原材料' }
      },
      {
        path: '/merchant/goodlist',
        name: 'goodList',
        component: goodList,
        meta: { title: '商品列表'}
      },
      {
        path: '/merchant/goodNew',
        name: 'goodNew',
        component: goodNew,
        meta: { title: '商品新建'}
      },
      {
        path: '/merchant/goodEdit',
        name: 'goodEdit',
        component: goodEdit,
        metaL: { title: '编辑商品'}
      },
      {
        path: '/merchant/setSpecifications',
        name: 'setSpecifications',
        component: setSpecifications,
        meta: { title: '设置商品规格'}
      },
      {
        path: '/merchant/proBatchList',
        name: 'productionBatchList',
        component: productionBatchList,
        meta: { title: '生产批次列表' }
      },
      {
        path: '/merchant/newProductionBatch',
        name: 'newProBatch',
        component: newProBatch,
        meta: { title: '新建生产批次' }
      },
      {
        path: '/merchant/editProductionBatch',
        name: 'editProBatch',
        component: editProBatch,
        meta: { title: '编辑生产批次'}
      },
      {
        path: '/merchant/scenariosList',
        name: 'scenariosList',
        component: scenariosList,
        meta: { title: '生产场景' }
      },
      {
        path: '/merchant/newScenarios',
        name: 'newScenarios',
        component: newScenarios,
        meta: { title: '新建生产场景' }
      },
      {
        path: '/merchant/editScenarios',
        name: 'editScenarios',
        component: editScenarios,
        meta: { title: '编辑生产场景' }
      },
      {
        path: '/merchant/orderList',
        name: 'orderList',
        component: orderList,
        meta: { title: '订单列表'}
      },
      {
        path: '/merchant/orderDetail',
        name: 'orderDetail',
        component: orderDetail,
        meta: { title: '订单详情'}
      },
      {
        path: '/merchant/afterSalesList',
        name: 'afterSalesList',
        component: afterSalesList,
        meta: { title: '售后列表'}
      },
      {
        path: '/merchant/refundList',
        name: 'refundList',
        component: refundList,
        meta: { title: '退款列表'}

      },
      {
        path: '/merchant/traceList',
        name: 'traceList',
        component: traceList,
        meta: { title: '追溯列表'}
      },
      {
        path: '/merchant/traceRecords',
        name: 'traceRecords',
        component: traceRecords,
        meta: { title: '追溯记录' }
      },
      {
        path: '/merchant/traceInformation',
        name: 'traceInformation',
        component: traceInformation,
        meta: { title: '录入追溯信息'}
      },
      {
        path: '/merchant/agentList',
        name: 'agentList',
        component: agentList,
        meta: { title: '代理商列表'}
      },
      {
        path: '/merchant/agentingList',
        name: 'agentingList',
        component: agentingList,
        meta: { title: '待审核代理商'}
      },
      {
        path: '/merchant/rechargeCenter',
        name: 'topUpCenter',
        component: topUpCenter,
        meta: { title: '充值中心页面'}
      },
      {
        path: '/merchant/certificationPay',
        name: 'certificationPay',
        component: certificationPay,
        meta: { title: '认证支付' }
      },
      {
        path: '/merchant/buyPoins',
        name: 'buyPoins',
        component: buyPoins,
        meta: { title: '积分充值'}
      },
      {
        path: '/merchant/alipay',
        name: 'aliPay',
        component: aliPay
      },
      {
        path: '/merchant/suCode',
        name: 'suCode',
        component: suCode
      },
      {
        path: '/merchant/traceConDetails',
        name: 'traceConDetails',
        component: traceConDetails,
        meta: { title: '追溯消耗明细'}
      },
      {
        path: '/merchant/deductionsRecord',
        name: 'deductionsRecord',
        component: deductionsRecord,
        meta: { title: '添加追溯点扣减记录'}
      },
      {
        path: '/merchant/cargoList',
        name: 'cargoList',
        component: cargoList,
        meta: { title: '召回列表' }
      },
      {
        path: '/merchant/dealWith',
        name: 'dealWith',
        component: dealWith,
        meta: { title: '召回批次处理' }
      },
      {
        path: '/merchant/recallDetail',
        name: 'recallDetail',
        component: recallDetail,
        meta: { title: '处理详情' }
      },
      {
        path: '/merchant/recllList',
        name: 'recllList',
        component: recllList,
        meta: { title: '串货列表' }
      },
      {
        path: '/merchant/cargoDetailList',
        name: 'cargoDetailList',
        component: cargoDetailList,
        meta: { title: '串货明细列表' }
      },
      {
        path: '/merchant/destroyList',
        name: 'destroyList',
        component: destroyList,
        meta: { title: '销毁列表' }
      },
      {
        path: '/merchant/complainList',
        name: 'complainList',
        component: complainList,
        meta: { title: '投诉列表' }
      },
      {
        path: '/merchant/boothList',
        name: 'boothList',
        component: boothList,
        meta: { title: '摊位列表' }
      },
      {
        path: '/merchant/stallholderList',
        name: 'stallholderList',
        component: stallholderList,
        meta: { title: '摊主列表' }
      },
      {
        path: '/merchant/stallholderList/stallGoodList',
        name: 'stallGoodList',
        component: stallGoodList,
        meta: { title: '摊主列表-商品列表'}
      },
      {
        path: '/manage/manageHome',
        name: 'manageHome',
        component: manageHome
      },
      {
        path: '/manage/allianceBusinessList',
        name: 'allianceBusinessList',
        component: allianceBusinessList
      },
      {
        path: '/manage/goodlist',
        name: 'goodlistManage',
        component: goodlistManage
      },
      {
        path: 'manage/newGood',
        name: 'manaNewGood',
        component: manaNewGood,
        meta: { title: 'op端新建商品'}
      },
      {
        path: 'manage/editGood',
        name: 'manaEditGood',
        component: manaEditGood,
        meta: { title: 'op端编辑商品'}
      },
      {
        path: '/manage/goodList/sceneList',
        name: 'sceneList',
        component: sceneList,
        meta: { title: 'op端生产场景列表'}
      },
      {
        path: '/manage/goodList/newScene',
        name: 'manageNewScene',
        component: manageNewScene,
        meta: { title: 'op端新建生产场景'}
      },
      {
        path: '/manage/goodList/editScene',
        name: 'manageEditScene',
        component: manageEditScene,
        meta: { title: 'op端编辑生产场景'}
      },
      {
        path: '/merchant/classify',
        name: 'classify',
        component: classify,
        meta: { title: 'op端分类'}
      },
      {
        path: '/manage/accountList',
        name: 'accountList',
        component: accountList
      },
      {
        path: '/manage/merchantlist',
        name: 'merchantl=List',
        component: merchantList
      },
      {
        path: '/manage/merchantNew',
        name: 'manaMerchantNew',
        component: manaMerchantNew,
        meta: {title: 'op端商家新建'} 
      },
      {
        path: '/manage/merchantEdit',
        name: 'manaMerchantEdit',
        component: manaMerchantEdit,
        meta: { title: 'op端商家编辑'}
      },
      {
        path: '/manage/merchantDetail/:id',
        name: 'merchantDetail',
        component: merchantDetail
      },
      {
        path: '/manage/boothList',
        name: 'manaBoothList',
        component: manaBoothList,
        meta: { title: '摊位列表'}
      },
      {
        path: '/manage/stallholderList',
        name: 'manaStallholderList',
        component: manaStallholderList,
        meta: { title: '摊主列表'}
      },
      {
        path: '/manage/stallholderList/goodlist',
        name: 'manaStallGoodList',
        component: manaStallGoodList,
        meta: { title: '摊主所有的商品'}
      },
      {
        path: '/manage/retrospectList',
        name: 'retrospectList',
        component: retrospectList
      },
      {
        path: '/manage/retrospectEnter',
        name: 'retrospectEnter',
        component: retrospectEnter
      },
      {
        path: '/manage/retrospectRecords/:id',
        name: 'retrospectRecords',
        component: retrospectRecords
      },
      {
        path: '/manage/proBatchList',
        name: 'manageProBatch',
        component: manageProBatch,
        meta: {title: 'op端生产批次'}
      },
      {
        path: '/manage/newProductionBatch',
        name: 'manaNewProbatch',
        component: manaNewProbatch,
        meta: {title: 'op端新建生产批次'}
      },
      {
        path: '/manage/editProductionBatch',
        name: 'manaEditProbatch',
        component: manaEditProbatch,
        meta: {title: 'op端编辑生产批次'}
      },
      {
        path: '/codeCenter/labelReserveList',
        name: 'labelReserveList',
        component: labelReserveList
      },
      {
        path: '/codeCenter/labelApplicationList',
        name: 'labelApplicationList',
        component: labelApplicationList
      },
      {
        path: '/codeCenter/labelDistributeList',
        name: 'labelDistributeList',
        component: labelDistributeList
      },
      //总部运营模块
      //总部运营首页
      {
        path: '/manage/headquartersHome',
        name: 'proBatchList',
        component: headquartersHome
      },
       {
        path: '/manage/retrospectList',
        name: 'retrospectList',
        component: retrospectList
      },
      {
        path: '/manage/merchantList',
        name: 'merchantList',
        component: merchantList
      },
      {
        path: '/manage/goodList',
        name: 'goodList',
        component: goodlistManage
      },


      //总部财务
      {
        path: '/manage/HeadquartersFinance',
        name: 'HeadquartersFinance',
        component: HeadquartersFinance
      },
      {
        path: '/manage/BusinessCertificationRecord',
        name: 'BusinessCertificationRecord',
        component: BusinessCertificationRecord
      },

      {
        path: '/manage/MerchantRechargeRecord',
        name: 'MerchantRechargeRecord',
        component: MerchantRechargeRecord
      },
       //总部运营商家模块
       {
        path: '/manage/retrospectList',
        name: 'retrospectList',
        component: retrospectList
      }

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router