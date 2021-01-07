import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

export default {
    ...zhLocale,
    button: {
        new: '新建',  // 新建
        determine: '确定',  // 确定
        cancel: '取 消',  // 取消
        Comfirm: '确 定',  // 确定
        viewDetail: '查看详情', // 查看详情
        delivery: '立即发货', // 立即发货
        refund: '商品退款', // 商品退款
        cancelOrder: '取消订单', // 取消订单
        confirmOrder: '确认订单', // 确认订单
        export: '导出', // 导出
        edit: '编辑', // 编辑
        withdraw: '撤回', // 撤回
        Record: '记录', // 记录
        Entry: '录入', // 录入
        passed: '通过',  // 通过
        reject: '拒绝',  // 拒绝
        add: '添 加',  // 添加
        remove: '删 除',  //删除
        prohibition: '禁止', // 禁止 n词
        normality: '正常',  // 正常 n词
        forbid: '禁止',  // 禁止 v词
        openUp: '开通',   // 开通  v词
        details: '详情',  // 详情
        newGoods: '新建商品', // 新建商品
        newTrace: '新建追溯', //  新建追溯
        editBooth:'编辑摊位',   // 编辑摊位
        EditVendor: '编辑摊主',   //编辑摊主
    },
    confirm: {
        tip: '提示', // 提示
    },
    common: {
        ROLE_BUSINESS: '商家',
        date: '编辑日期', // 编辑日期
        startDate: '开始日期', // 开始日期
        endDate: '结束日期', // 结束日期
        to: '至', // 至
        Operation: '操作', // 操作
        pleaseSelect: '请选择',  // 请选择
        operateSuccessfully: '操作成功',  // 操作成功
        operationFailure: '操作失败', // 操作失败
        empty: '空'  // 空
    }, 
    menu: {
        menuName: '主页',
        Employees: 'Employees',
        Goods: '商品模块',
        order: 'The order',
        afterSales: 'After-sales',
        refund: 'A refund',
        Trace: '追溯模块',
        pending: 'Check pending',
        topUp: 'Top-up',
        merchant:'商家模块',
        RechargeRecord:'充值记录',
        CertificationRecord:'认证记录',
        labelReservation: '标签预留',  // 标签预留
        labelReview: '标签审核',  // 标签审核
        labelIssuanceDetails: '标签发放明细'  // 标签发放明细
    },
    login: {
        username:'username'
    },
    home: {

    },
    Goods: {
        goodList: { 
            goodListTitle: '商品列表',  // 商品列表
            goodNameInput: '商品名称', // 商品名称
            goodTypeInput: '商品类型', // 商品类型
            merchantName: '商家名称',  // 商家名称
            companyName: '公司名称', // 公司名称
            creationDate: '创建日期',  // 创建日期
            tableGoodDate: '最近商品编辑日期',  // 最近商品编辑日期
            theBeltAndRoad: '一带一路',  // 一带一路
            hits: '上架',  // 上架
            off: '下架' ,  // 下架
            hitTips: '此操作将会【上架】商品到一带一路国际贸易区中', // 此操作将会【上架】商品到一带一路国际贸易区中
            offTips: '此操作将会从一带一路国际贸易区中【下架】'  // 此操作将会从一带一路国际贸易区中【下架】
        }
    },
    Merchant: {
        // 商家列表
        merchantList: { 
            merchantListTitle: '商家列表',  // 商家列表
            merchantName: '商家名称',  // 商家名称
            merchantAccount: '商家账号', // 商家账号
            merchantType: '商家类型',  // 商家类型
            certificationStatus: '认证状态', // 认证状态
            creationDate: '创建日期',  // 创建日期
            state: '状态',  // 状态
            remark: '备注',  // 备注
            noRemark: '暂无备注',  // 暂无备注
            newTraceTltle: '新建追溯', // 新建追溯
            applicationNum: '申请数量', // 申请数量
            tagType: '标签类型', // 标签类型
            paperLabel: '纸质标签', // 纸质标签
            electronicLabel: '电子标签', // 电子标签
            notApply: '未申请',  // 未申请
            waitConfirm: '待审核',   //待审核
            authenticated: '已认证',  // 已认证
            fail: '未通过',   // 未通过
            whole: '全部',  // 全部
            changeStatusTips: 'S状态将被更改, 是否继续?', // 状态将被更改, 是否继续？
        },

        // 商家资料
        merchantDetail: {
            merchantDetailTitle: '商家资料',  // 商家资料
            merchantName: '商家名称',  // 商家名称
            netType: '入网类型',  // 入网类型
            merchantAccount: '商家账号', // 商家账号
            isEnterprise: '是否企业', // 是否企业
            merchantLocation: '商家所在地',  // 商家所在地
            merchantType: '商家类型',  // 商家类型
            detailedAddress: '详细地址',  // 详细地址 
            businessItem: '经营品种', // 经营品种
            merchantDescription: '商家描述', // 商家描述
            merchantContact: '商家联系人', // 商家联系人
            merchanteRpresentative: '商家法人代表', // 商家法人代表
            contactNumber: '联系电话',  // 联系电话
            enterpriseBrand: '企业品牌',  // 企业品牌
            noAddedBrandYet: '暂无添加品牌',  // 暂无添加品牌
            website: '企业网址',  // 企业网址
            noEnterpriseWebsite: '暂无填写企业网址',  // 暂无填写企业网址
            corporateLogo: '企业logo', // 企业logo
            noCorporateLogoyet: '暂无上传企业logo',  // 暂无上传企业logo
            salesURL: '销售网址',  // 销售网址
            noSalesURL: '暂无填写销售网址',  // 暂无填写销售网址
            warenzeichenlizenz: '商标注册证书',  //  商标注册证书
            noWarenzeichenlizenz: '暂无上传商标注册证书', // 暂无上传商标注册证书
            businessCertificate: '经营许可证',  // 经营许可证
            noOperatepermission: '暂无上传经营许可证',  // 暂无上传经营许可证
            productionCertificate: '生产许可证',  // 生产许可证
            noProductionLicense: '暂无上传生产许可证', // 暂无上传生产许可证
            hygienicLicense: '卫生许可证',  //  卫生许可证
            noHygieneLicense: '暂无上传卫生许可证', // 暂无上传卫生许可证
            productTestReport: '产品检验报告',  // 产品检验报告
            noProductTestReport: '暂无上传产品检验报告', // 暂无上传产品检验报告
            openingPermit: '开户许可证', // 开户许可证
            noOpeningPermit: '暂无上传开户许可证',  //  暂无上传开户许可证
            IDCardOrpassport: '身份证/护照',  // 身份证/护照
            businessLicense: '营业执照',  // 营业执照
            noBusinessLicense: '暂无上传营业执照',  // 暂无上传营业执照
            businessVideo: '商家视频',  // 商家视频
            noVideo: '暂无上传视频', // 暂无上传视频
            OtherPictures: '其他图片（多张）',  // 其他图片（多张）
            NoOtherPictures: '暂无上传其他图片',  // 暂无上传其他图片
            unavailableVideo: '此视频暂无法播放，请稍后再试'  // 此视频暂无法播放，请稍后再试
        }
    },
    Trace: {
        // 追溯列表
        traceList: {
            traceListTitle: '追溯列表',  // 追溯列表
            traceCodeBatch: '追溯码批次号', // 追溯码批次号
            merchantName: '商家名称',  // 商家名称
            companyName: '公司名称', // 公司名称
            proState: '处理状态', // 处理状态
            havePassed: '已通过', // 已通过
            toBeauited: '待审核', // 待审核
            haveWithdrawn: '已撤回', // 已撤回
            haveRejected: '已拒绝', // 已拒绝
            applicationType: '申请类型', // 申请类型
            paperLabel: '纸质标签', // 纸质标签
            electronicLabel: '电子标签', // 电子标签
            dateOfApp: '申请日期', // 申请日期
            applicationNum: '申请数量', // 申请数量
            approvalDate: '审批日期', // 审批日期
            newTraceTltle: '新建追溯', // 新建追溯
            editTraceTltle: '编辑追溯', // 编辑追溯
            newDialogNumnber: '申请数量', // 申请数量
            tagType: '标签类型', // 标签类型
            newDialogNumnberTip1: '申请数量为空', // 申请数量为空
            newDialogNumnberTip2: '申请数量只能为正数', // 申请数量只能为正数
            tagTypeTip: '追溯申请类型没有选择', // 追溯申请类型没有选择！
            newTraceSuccess: '新建追溯信息成功', // 新建追溯信息成功！
            withdrawConfig: '你真的要撤回吗?', // 你真的要撤回吗？
            exportConfig: '此操作将下载追溯码文件', // 此操作将下载追溯码文件
            freePapelLbelCount: '当前免费的纸质标签数量为',  // 当前免费的纸质标签数量为
            retroactiveApplication: '通过追溯申请',   // 通过追溯申请
            searchTraCode: '输入码段SID',   // 输入码段SID
            coveredCodeSegment: '覆盖码段',   // 覆盖码段
            rejectApplication: '拒绝申请',   // 拒绝申请
            refusalCause: '拒绝原因',   // 拒绝原因
            headquarters: '总部',   // 总部
            noTypeSelected: '没有选择申请类型',  // 没有选择申请类型
            NoMerchantsSelected: '没有选择商家',  // 没有选择商家
            numCanOnlyBePositive: '申请数量只能为正数',  // 申请数量只能为正数
            numCannotBeEmpty: '追溯申请数量不能为空'  //追溯申请数量不能为空
        },

        // 追溯记录
        traceRecords: {
            traceRecordsTitle: '追溯记录',  // 追溯记录
            searchTraCode: '搜索追溯码', // 请输入对应批次号的Sid或内外码
            traceBatchNum: '追溯批次号', // 追溯批次号
            numberOfTrace: '追溯码数量', // 追溯码数量
            quantityNum: '追溯码剩余数量', // 追溯码剩余数量
            tracePointRecord: '追溯点记录', // 追溯点记录
            quterCode: '外码', // 外码
            innerCode: '内码', // 内码
            informationButton: '查看流通信息', // 查看流通信息
            informationTitle: '流通信息', // 流通信息
            pdoductName: 'Product name',
            currentNode: '流通节点', // 流通节点
            business: '经营商户', // 经营商户
            address: '详细地址', // 详细地址
            contactNum: '联系电话', // 联系电话
            principal: '负责人', // 负责人
            CirculationTime: '流通时间', // 流通时间
            noCirculation: '暂无流通信息', // 暂无流通信息
            numbering: '编号', // 编号
            newPoint: '新建追溯点',
            newPointDialogTiltle: '新建追溯点', // 新建追溯点
            agent: '代理商', // 代理商
            other: '其他', // 其他
            selectAgent: '选择代理商', // 选择代理商
            to: '至', // 至
            mobilePhone: '手机号码', // 手机号码
            personCharge: '负责人', // 负责人
            tracePointName: '追溯点名称', // 追溯点名称
            startCode: '请输入追溯起始编码', // 请输入追溯起始编码
            endCode: '请输入追溯结束编码', // 请输入追溯结束编码
            // 已使用小程序赋码工具对该批次号进行追溯录入，无法使用该后台新增追溯点
            errorTips_1: '已使用小程序赋码工具对该批次号进行追溯录入，无法使用该后台新增追溯点',
            // 该追溯批次号没有录入追溯！
            errorTips_2: '该追溯批次号没有录入追溯！',
            pleaseSelectAgent: '请选择或填写代理商！',  // 请选择或填写代理商！
            retroactiveStartIsEmpty: '追溯起始编码没有填写',  // 追溯起始编码没有填写
            retroactiveEndIsEmpty: '追溯结束编码没有填写',  // 追溯结束编码没有填写
            //此操作将要去商家的充值中心扣除积分, 是否继续?
            confirmTips: "此操作将要去商家的充值中心扣除积分, 是否继续?"
        },

        // 追溯录入
        traceEnter: {
            traceCodeBatch: '追溯码批次', // 追溯码批次
            numberOfTrace: '追溯码数量',  // 追溯码数量
            remainQuantity: '剩余数量',  // 剩余数量
            productionBatch: '生产批次',  // 生产批次
            goods: '商品'   // 商品
        }
    },
    Account:{
        AccountList:'账户列表'
    },

     // 标码中心
     centerCode: {
        reserved: {
            labelReservation: '标签预留',  //标签预留
            freePaperLabels: '空闲纸质标签数',  // 空闲纸质标签数
            paperLabelLoss: '纸质标签损耗数', //纸质标签损耗数
            usedPaperLabels: '已使用纸质标签数',  // 已使用纸质标签数
            reservedCodeSegment: '预留码段',  // 预留码段
            reservationDate: '预留日期',  // 预留日期
            startSid: '开始sid',  // 开始sid
            endSid: '结束sid',  // 结束sid
            AddReservedCodeSegmentTime: '添加预留码段时间',  //添加预留码段时间
            reservedQuantity: '预留数量',  // 预留数量
            operator: '操作人员'  // 操作人员
        },

        // 标签发放明细
        distribut: {
            labelIssuanceDetails: '标签发放明细',  // 标签发放明细
            merchantName: '商家名称',  // 商家名称
            company: '公司', // 公司
            paperLabelQuota: '纸质标签额度',  // 纸质标签额度
            remainingAmount: '剩余额度', // 剩余额度
            paperLabelsUsed: '已使用的纸质标签数',  // 已使用的纸质标签数
            electronicTagsUsed: '已使用的电子标签数', // 已使用的电子标签数
            headquarters: '总部'   // 总部
        }
    }
}

export default cn