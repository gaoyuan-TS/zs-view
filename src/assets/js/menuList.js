import i18n from '../../i18n/i18n'
let menuList = {
    // 商家管理员菜单列表
    merchantMenu: [
        {
            path: '/merchant/merchantHome',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy',
        },
        {
            path: '/merchant/agentList',
            title: i18n.t('menu.agent'),
            icon: 'iconfont icon-dailishangguanli',
            children: [
                {
                    path: '/merchant/agentList',
                    title: i18n.t('menu.agentsList'),
                    icon: 'iconfont icon-dailishangguanli'
                },
                {
                    path: '/merchant/agentingList',
                    title: i18n.t('menu.pending'),
                    icon: 'iconfont icon-daishenhe'
                }
            ]
        }, // 代理商
        {
            path: '/merchant/employeelist',
            title: i18n.t('menu.Employees'),
            icon: ' iconfont icon-yuangongguanli'
        }, // 员工
        {
            path: '/merchant/goodlist',
            title: i18n.t('menu.Goods'),
            icon: 'iconfont icon-shangpin'
        },
        {
            path: '/merchant/proBatchList',
            title: '生产批次',
            icon: 'iconfont icon-shengchanpiciguanli'
        },
        {
            path: '/merchant/traceList',
            title: i18n.t('menu.Trace'),
            icon: 'iconfont icon-findback',
            children: [
                {
                    path: '/merchant/traceList',
                    title: '追溯',
                    icon: 'iconfont icon-findback'
                },
                {
                    path: '/merchant/materialList',
                    title: '原材料',
                    icon: ' iconfont icon-yuangongguanli'
                },
                {
                    path: '/merchant/recllList',
                    title: '串货',
                    icon: 'iconfont icon-findback'
                },
                {
                    path: '/merchant/cargoList',
                    title: '召回',
                    icon: 'iconfont icon-findback'
                },
                {
                    path: '/merchant/destroyList',
                    title: '销毁',
                    icon: 'iconfont icon-findback'
                },
            ] 
        }, // 追溯模块
        {
            path: '/merchant/rechargeCenter',
            title: i18n.t('menu.topUp'),
            icon: 'iconfont icon-chongzhi'
        }, // 充值
        {
            path: '/merchant/orderList',
            title: '追溯商城',
            icon: 'iconfont icon-huabanfuben',
            children: [
                {
                    path: '/merchant/orderList',
                    title: i18n.t('menu.order'),
                    icon: 'iconfont icon-huabanfuben'
                },
                {
                    path: '/merchant/afterSalesList',
                    title: i18n.t('menu.afterSales'),
                    icon: 'iconfont icon-shouhou-'
                },
                {
                    path: '/merchant/refundList',
                    title: i18n.t('menu.refund'),
                    icon: 'iconfont icon-tuikuan'
                },
            ]
        },
        
        
    ],
    //商家子账号
    merchantStaffMenu: [
        {
            path: '/merchant/merchantHome',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy',
        },
        {
            path: '/merchant/goodlist',
            title: i18n.t('menu.Goods'),
            icon: 'iconfont icon-shangpin'
        },
        // {
        //     path: '/merchant/orderList',
        //     title: i18n.t('menu.order'),
        //     icon: 'iconfont icon-huabanfuben'
        // },
        {
            path: '/merchant/traceList',
            title: i18n.t('menu.Trace'),
            icon: 'iconfont icon-findback'
        },
        {
            path: '/merchant/agentList',
            title: i18n.t('menu.agent'),
            icon: 'iconfont icon-dailishangguanli',
            children: [
                {
                    path: '/merchant/agentList',
                    title: i18n.t('menu.agentsList'),
                    icon: 'iconfont icon-dailishangguanli'
                },
                {
                    path: '/merchant/agentingList',
                    title: i18n.t('menu.pending'),
                    icon: 'iconfont icon-daishenhe'
                }
            ]
        },
    ],
    // 农贸商家管理员
    agMerchantMenu: [
        {
            path: '/merchant/merchantHome',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy',
        },
        {
            path: '/merchant/employeelist',
            title: i18n.t('menu.Employees'),
            icon: ' iconfont icon-yuangongguanli'
        },
        {
            path: '/merchant/boothList',
            title: '摊位模块',
            icon: 'iconfont icon-linshitanwei-'
        },
        {
            path: '/merchant/stallholderList',
            title: '摊主模块',
            icon: 'iconfont icon-linshitanwei-'
        },
        {
            path: '/merchant/rechargeCenter',
            title: i18n.t('menu.topUp'),
            icon: 'iconfont icon-chongzhi'
        }
    ],
    // agMerchantStaffMenu: [],
    // 总部管理员权限菜单列表
    manageMenu: [
        {
            path: '/manage/manageHome',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/allianceBusinessList',
            title: '加盟商模块',
            icon: 'iconfont icon-league',
        },
        {
            path: '/manage/accountList',
            title: '账号模块',
            icon: 'iconfont icon-zhanghao'
        },
        {
            path: '/manage/merchantList',
            title: '商家模块',
            icon: 'iconfont icon-shangjia'
        },
        {
            path: '/manage/goodlist',
            title: '商品模块',
            icon: 'iconfont icon-shangpin'
        },
        {
            path: '/manage/proBatchList',
            title: '生产批次',
            icon: 'iconfont icon-shengchanpiciguanli'
        },
        {
            path: '/manage/retrospectList',
            title: '追溯模块',
            icon: 'iconfont icon-findback'
        },
        
    ],




    //总部管理员
    manageUser:[],




    //加盟商管理员
    addmanageUser: [
        {
            path: '/manage/manageHome',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/accountList',
            title: '账号模块',
            icon: 'iconfont icon-zhanghao'
        },
        {
            path: '/manage/merchantList',
            title: '商家模块',
            icon: 'iconfont icon-shangjia'
        },
        {
            path: '/manage/goodlist',
            title: '商品模块',
            icon: 'iconfont icon-shangpin'
        },
        {
            path: '/manage/retrospectList',
            title: '追溯模块',
            icon: 'iconfont icon-findback'
        }
    ],




    //总部运营
    HeadquartersOperations: [
        {
            path: '/manage/headquartersHome',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/merchantList',
            title: i18n.t('menu.merchant'),
            icon: 'iconfont icon-shangjia'
        },
        {
            path: '/manage/goodList',
            title: i18n.t('menu.Goods'),
            icon: 'iconfont icon-shangpin'
        },
        {
            path: '/merchant/classify',
            title: '分类模块',
            icon: 'iconfont icon-shangpinfenlei'
        },
        {
            path: '/manage/proBatchList',
            title: '生产批次',
            icon: 'iconfont icon-shengchanpiciguanli'
        },
        {
            path: '/manage/retrospectList',
            title: i18n.t('menu.Trace'),
            icon: 'iconfont icon-findback'
        }
    ],
    // 加盟商运营
    addOperations: [
        {
            path: '/manage/headquartersHome',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/merchantList',
            title: i18n.t('menu.merchant'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/retrospectList',
            title: i18n.t('menu.retrospect'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/goodList',
            title: i18n.t('menu.retrospect'),
            icon: 'iconfont icon-yemian-copy'
        }

    ],


    //总部财务
    money: [
        {
            path: '/manage/HeadquartersFinance',
            title: i18n.t('menu.menuName'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/BusinessCertificationRecord',
            title: i18n.t('menu.CertificationRecord'),
            icon: 'iconfont icon-yemian-copy'
        },
        {
            path: '/manage/MerchantRechargeRecord',
            title: i18n.t('menu.RechargeRecord'),
            icon: 'iconfont icon-yemian-copy'
        },
    ],
    //加盟商财务
    addmoney: [
        {
            path: '/manage/MerchantRechargeRecord',
            title: i18n.t('menu.RechargeRecord'),
            icon: 'iconfont icon-yemian-copy'
        }
    ],

    // 标码中心
    centerCode: [
        {
            path: '/codeCenter/labelReserveList',
            title: i18n.t('menu.labelReservation')  // 标签预留
        },
        {
            path: '/manage/retrospectList',
            title: i18n.t('menu.labelReview')  // 标签审核
        },  
        {
            path: '/codeCenter/labelDistributeList',
            title: i18n.t('menu.labelIssuanceDetails')  // 标签发放明细
        }
    ]
}

export default menuList