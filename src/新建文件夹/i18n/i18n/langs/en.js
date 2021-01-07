import enLocale from 'element-ui/lib/locale/lang/en'

const en = {
    ...enLocale,
    button: {
        new: 'new',  // 新建
        determine: 'determine',
        cancel: 'cancel',  // 取消
        Comfirm: 'Comfirm',  // 确定
        viewDetail: 'View details', // 查看详情
        delivery: 'Immediate delivery', // 立即发货
        refund: 'Commodity refund', // 商品退款
        cancelOrder: 'Cancel order', // 取消订单
        confirmOrder: 'Confirm order', // 确认订单
        export: 'export', // 导出
        edit: 'edit', // 编辑
        withdraw: 'withdraw', // 撤回
        Record: 'record', // 记录
        Entry: 'entry', // 录入
        passed: 'passed',  // 通过
        reject: 'reject',  // 拒绝
        add: 'add',  // 添加
        remove: 'remove',  //删除
        prohibition: 'prohibition', // 禁止 n词
        normality: 'normality',  // 正常 n词
        forbid: 'forbid',  // 禁止 v词
        openUp: 'Open up',   // 开通  v词
        details: 'details',  // 详情
        newGoods: 'New goods', // 新建商品
        newTrace: 'New Trace', //  新建追溯
        editBooth:'Edit Booth',   // 编辑摊位
        EditVendor: 'Edit vendor',   //编辑摊主
    },
    confirm: {
        tip: 'prompt', // 提示
    },
    common: {
        ROLE_BUSINESS: 'Merchants',
        date: 'Edit date', // 编辑日期
        startDate: 'Start date', // 开始日期
        endDate: 'End date', // 结束日期
        to: 'to', // 至
        Operation: 'Operation', // 操作
        pleaseSelect: 'please select',  // 请选择
        operateSuccessfully: 'Operate successfully',  // 操作成功
        operationFailure: 'Operation failure', // 操作失败
        empty: 'none'  // 空
    },
    menu: {
        menuName: 'Home page',
        Employees: 'Employees',
        Goods: 'Goods',
        order: 'The order',
        afterSales: 'After-sales',
        refund: 'A refund',
        Trace: 'Trace',
        pending: 'Check pending',
        topUp: 'Top-up',
        merchant:'Merchant',
        RechargeRecord:'充值记录',
        CertificationRecord:'认证记录',
        labelReservation: 'Label reservation',  // 标签预留
        labelReview: 'Label review',  // 标签审核
        labelIssuanceDetails: 'Label issuance details'  // 标签发放明细
    },
    jurisdiction: {
        Merchants: 'Merchants'
    },
    Employees: {
        title: 'Employee list', // 员工账号列表
        employeeName: 'Employee name', // 员工姓名
        PhoneNumber: 'Phone number', // 商家号码
        realName: 'Name of worker', // 员工姓名
        accountName: 'Account name', // 账号名称
        mobile: 'Mobile phone number', // 手机号码
        dataTitle: 'Creaction date', // 创建日期
        Status: 'Status', // 状态
        Operation: 'Operation', // 操作
        ops2: 'open up', // 开通
        Status0: 'abandon', // 废弃
        Status1: 'normal', // 正常
        Status2: 'forbid', // 禁止
        forbidTitle: 'This operation will disable the account. Do you want to continue?', // 此操作将禁止账号, 是否继续?
        normalTitle: 'This operation will open the account. Do you want to continue?', // 此操作将开通账号, 是否继续?
        forbidTip: 'Ban on success', // 禁止成功
        normalTip: 'Opened successfully', // 开通成功
        newDialogTitle: 'Create new employee', // 新建员工账号
        newDialogAccount: 'Account name', // 账号名称
        newDialogEmployee: 'Employee name', // 员工名称
        newDialogPhone: 'Phone number', // 手机号码
        newAccountNameError: 'The account name cannot be empty!', // 账号名称不能为空！
        newAccountNameType: 'Enter only upper and lower case letters and Numbers for account name!', // 账号名称只能输入大小写字母和数字！
        newRealNameError: 'Employee name cannot be empty!', // 员工姓名不能为空！
        newMobileError: 'The mobile phone number cannot be empty!', // 手机号码不能为空！
        newAccountSuccess: 'New employee account successfully!' // 新建员工账号成功！
    },
    Account:{
        AccountList:'Account list'
    },
    Goods: {
        goodList: { 
            goodListTitle: 'Commodity list',  // 商品列表
            goodNameInput: 'Commodity name', // 商品名称
            goodTypeInput: 'Commodity type', // 商品类型
            merchantName: 'Merchant name',  // 商家名称
            companyName: 'Company name', // 公司名称
            creationDate: 'Creation date',  // 创建日期
            tableGoodDate: 'Last Commodity edit date',  // 最近商品编辑日期
            theBeltAndRoad: 'One Belt And One Road',  // 一带一路
            hits: 'hits the shelves',  // 上架
            off: 'off the shelves' ,  // 下架
            hitTips: 'This operation will list the goods to One Belt And One Road international trade zone', // 此操作将会【上架】商品到一带一路国际贸易区中
            offTips: 'This operation will be removed from the One Belt And One Road international trade area'  // 此操作将会从一带一路国际贸易区中【下架】
        },
        specSetting: 'Sales specification setting', // 销售规格设置
        freightTemplate: 'Freight template set', // 运费模板设置
        newGoodTitle: 'New good',
        newGoodImg: 'Product pictures',
        newGoodVideo: 'Product videos',
        newGoodVideoButton: 'Select video',
        newGoodVideoTip1: 'Video can only be Ogg, MP4, WebM format! (size cannot exceed 50M) Only one video can be uploaded.',
        newGoodVideoTip2: 'If the wrong video is uploaded, delete the video first before uploading it',
        newGoodNameTip: 'Please fill in the name of the item', // 请填写商品名称
        newGoodCategoryIdTip: 'Please select category', // 请选择分类
        newGoodImgsTip: 'At least one product map should be uploaded', // 商品图至少要上传一张
        newGoodIntroductionTip: 'Please upload the product details drawing', // 请上传商品详情图
        newGoodSuccess: 'New product successful'
    },
    Merchant: {
        // 商家列表
        merchantList: { 
            merchantListTitle: 'Merchant list',  // 商家列表
            merchantName: 'Merchant name',  // 商家名称
            merchantAccount: 'Merchant account', // 商家账号
            merchantType: 'Merchant type',  // 商家类型
            certificationStatus: 'Certification status', // 认证状态
            creationDate: 'Creation date',  // 创建日期
            state: 'state',  // 状态
            remark: 'remark',  // 备注
            noRemark: 'No remark',  // 暂无备注
            newTraceTltle: 'New trace', // 新建追溯
            applicationNum: 'Number of applications', // 申请数量
            tagType: 'Tag type', // 标签类型
            paperLabel: 'Paper label', // 纸质标签
            electronicLabel: 'electronic label', // 电子标签
            notApply: 'Not apply',  // 未申请
            waitConfirm: 'Wait confirm',   //待审核
            authenticated: 'Authenticated',  // 已认证
            fail: 'Fail',   // 未通过
            whole: 'Whole',  // 全部
            changeStatusTips: 'Status will be changed, whether to continue?', // 状态将被更改, 是否继续？
        },

        // 商家资料
        merchantDetail: {
            merchantDetailTitle: 'Merchant profile',  // 商家资料
            merchantName: 'Merchant name',  // 商家名称
            netType: 'Net type',  // 入网类型
            merchantAccount: 'Merchant account', // 商家账号
            isEnterprise: 'Whether the enterprise', // 是否企业
            merchantLocation: 'Merchant location',  // 商家所在地
            merchantType: 'Merchant type',  // 商家类型
            detailedAddress: 'Detailed address',  // 详细地址 
            businessItem: 'Business item', // 经营品种
            merchantDescription: 'Merchant description', // 商家描述
            merchantContact: 'Merchant contact', // 商家联系人
            merchanteRpresentative: 'Legal representative of merchant', // 商家法人代表
            contactNumber: 'Contact number',  // 联系电话
            enterpriseBrand: 'enterprise brand',  // 企业品牌
            noAddedBrandYet: 'No added brand yet',  // 暂无添加品牌
            website: 'Website',  // 企业网址
            noEnterpriseWebsite: 'There is no enterprise website',  // 暂无填写企业网址
            corporateLogo: 'Corporate logo', // 企业logo
            noCorporateLogoyet: 'No corporate logo uploaded yet',  // 暂无上传企业logo
            salesURL: 'Sales URL',  // 销售网址
            noSalesURL: 'There is no sales website',  // 暂无填写销售网址
            warenzeichenlizenz: 'Warenzeichenlizenz',  //  商标注册证书
            noWarenzeichenlizenz: 'No upload trademark registration certificate', // 暂无上传商标注册证书
            businessCertificate: 'Business certificate',  // 经营许可证
            noOperatepermission: 'No upload business certificate',  // 暂无上传经营许可证
            productionCertificate: 'Production certificate',  // 生产许可证
            noProductionLicense: 'No upload production license', // 暂无上传生产许可证
            hygienicLicense: 'Hygienic license',  //  卫生许可证
            noHygieneLicense: 'No upload hygiene license', // 暂无上传卫生许可证
            productTestReport: 'Product test report',  // 产品检验报告
            noProductTestReport: 'No upload product test report', // 暂无上传产品检验报告
            openingPermit: 'Opening permit', // 开户许可证
            noOpeningPermit: 'No upload account opening permit',  //  暂无上传开户许可证
            IDCardOrpassport: 'ID card/passport',  // 身份证/护照
            businessLicense: 'Business license',  // 营业执照
            noBusinessLicense: 'No upload business license',  // 暂无上传营业执照
            businessVideo: 'Business video',  // 商家视频
            noVideo: 'No upload video', // 暂无上传视频
            OtherPictures: 'Other pictures (multiple)',  // 其他图片（多张）
            NoOtherPictures: 'No other pictures uploaded',  // 暂无上传其他图片
            unavailableVideo: 'This video is temporarily unavailable, please try again late',  // 此视频暂无法播放，请稍后再试
        }
    },
    order: {
        orderList: {
            title: 'Order list', // 订单列表
            orderNumber: 'Order number', // 订单号
            commodityName: 'Commodity name', // 商品名称
            Nameofconsignee: 'Name of consignee', // 收货人
            ConsigneeTelephone: 'Consignee telephone', // 收货人电话
            trackingNumber: 'Express tracking number', // 快递单号
            orderMobNumer: 'Order mobile number', // 下单手机号
            orderStatus: 'Order status', // 订单状态
            payDate: 'Payment time', // 支付日期
            exportOrderList: 'Export order data list', // 导出订单数据列表
            theOrdertime: 'time of placing the order', // 下单日期
            buyerInformation: 'Buyer information', // 买家信息
            commoodityId: 'Commodity ID', // 商品id
            Specifications: 'Specifications', // 规格
            totalPrice: 'Total price', // 总价

            freight: 'Freight', // 运费
            receAdress: 'Receiving address', // 收货地址
            exportOrderTitle: "This action downloads the list of order data under the merchant's specified conditions", // 此操作将下载商家的指定条件下的订单数据列表
            confirmOrderTitle: 'Are you sure to accept the order', // 你是否确认接单
            confirmOrderCancel: 'Order receiving operation has been cancelled', // 已取消接单操作
            trackingIdTip: 'Please select a logistics company', // 请选择物流公司
            trackingNoTip: 'Please fill in the tracking number', // 请填写物流运单号
            cancelOrderTitle: 'Cancellation of order', // 取消订单商品
            refundTitle: 'Commodity refund', // 商品退款
            cancelOrderTip: 'Please select the item to cancel' // 请选择要取消的商品
        },
        orderDetail: {

        }
    },
    afterSales: {
        title: 'After the list',
        processState: 'Processing state', // 处理状态
        salesNumber: 'After sales order number', // 售后订单号
        mobilNumber: 'Order mobile number', // 下单手机号
        refundNumber: 'Refund order number', // 退款单号
        afterSalesType: 'After sales type', // 售后类型
        refundAndReturn: 'refund and return', // 退款退货
        Exchange: 'Exchange', // 换货
        afterSalesDetails: 'After sale details', // 售后详情
        goodNum: 'Quantity',
        afterSaleDetail: 'After sale details', // 售后详情
        afterType: 'After type', // 售后类型
        
    },
    refund: {
        refundListTitle: 'The refund list',
        refundNumber: 'Refund Order number',
        opsRefund: 'Operate refund', // 操作退款
        ridioRefuse: 'Refuse refund', // 拒绝退款
        ridioAgree: 'Agree to refund', // 同意退款
    },
    Trace: {
        // 追溯列表
        traceList: {
            traceListTitle: 'Trace list',  // 追溯列表
            traceCodeBatch: 'Trace code batch', // 追溯码批次号
            merchantName: 'Merchant name',  // 商家名称
            companyName: 'Company name', // 公司名称
            proState: 'Processing state', // 处理状态
            havePassed: 'Have passed', // 已通过
            toBeauited: 'To be audited', // 待审核
            haveWithdrawn: 'Have withdrawn', // 已撤回
            haveRejected: 'Have rejected', // 已拒绝
            applicationType: 'Application type', // 申请类型
            paperLabel: 'Paper label', // 纸质标签
            electronicLabel: 'electronic label', // 电子标签
            dateOfApp: 'Date of application', // 申请日期
            applicationNum: 'Number of applications', // 申请数量
            approvalDate: 'Date of approval', // 审批日期
            newTraceTltle: 'New trace', // 新建追溯
            editTraceTltle: 'edit trace', // 编辑追溯
            newDialogNumnber: 'Number of applications', // 申请数量
            tagType: 'Tag type', // 标签类型
            newDialogNumnberTip1: 'Application quantity is empty', // 申请数量为空
            newDialogNumnberTip2: 'Application quantity can only be positive number', // 申请数量只能为正数
            tagTypeTip: 'Trace application type not selected', // 追溯申请类型没有选择！
            newTraceSuccess: 'Create new trace information succeeded!', // 新建追溯信息成功！
            withdrawConfig: 'Do you really want to withdraw?', // 你真的要撤回吗？
            exportConfig: 'This operation will download the trace code file', // 此操作将下载追溯码文件
            freePapelLbelCount: 'The current quantity of free paper is',  // 当前免费的纸质标签数量为
            retroactiveApplication: 'Retroactive application',   // 通过追溯申请
            searchTraCode: 'Search Tracking Code',   // 输入码段SID
            coveredCodeSegment: 'Covered code segment',   // 覆盖码段
            rejectApplication: 'Reject application',   // 拒绝申请
            refusalCause: 'Refusal cause',   // 拒绝原因
            headquarters: 'headquarters',   // 总部
            noTypeSelected: 'No choice of application type',  // 没有选择申请类型
            NoMerchantsSelected: 'No choice of merchants',  // 没有选择商家
            numCanOnlyBePositive: 'The number of applications can only be positive',  // 申请数量只能为正数
            numCannotBeEmpty: 'The number of traceability applications cannot be empty'  //追溯申请数量不能为空
        },

        // 追溯记录 
        traceRecords: {
            traceRecordsTitle: 'Trace records',  // 追溯记录
            searchTraCode: 'Search Tracking Code', // 请输入对应批次号的Sid或内外码
            traceBatchNum: 'Traceable batch number', // 追溯批次号
            numberOfTrace: 'Number of trace codes', // 追溯码数量
            quantityNum: 'Tracking Code Remaining Quantity', // 追溯码剩余数量
            tracePointRecord: 'Trace point record', // 追溯点记录
            quterCode: 'Outer code', // 外码
            innerCode: 'Inner code', // 内码
            informationButton: 'View circulation trace information', // 查看流通信息
            informationTitle: 'Circulation information', // 流通信息
            pdoductName: 'Product name',
            currentNode: 'Current node', // 流通节点
            business: 'Business merchants', // 经营商户
            address: 'Address', // 详细地址
            contactNum: 'contact number', // 联系电话
            principal: 'principal', // 负责人
            CirculationTime: 'Circulation time', // 流通时间
            noCirculation: 'No circulation information', // 暂无流通信息
            numbering: 'Numbering', // 编号
            newPoint: 'New traceback point',
            newPointDialogTiltle: 'New trace point', // 新建追溯点
            agent: 'Agent', // 代理商
            other: 'Other', // 其他
            selectAgent: 'Select agent', // 选择代理商
            to: 'to', // 至
            mobilePhone: 'mobile phone number', // 手机号码
            personCharge: 'Person in charge', // 负责人
            tracePointName: 'Name of trace point', // 追溯点名称
            startCode: 'Start coding', // 请输入追溯起始编码
            endCode: 'The end of the coding', // 请输入追溯结束编码
            // 已使用小程序赋码工具对该批次号进行追溯录入，无法使用该后台新增追溯点
            errorTips_1: 'The batch number has been retroactively entered using the small program coding tool, and the new traceability point cannot be added in the background',
            // 该追溯批次号没有录入追溯！
            errorTips_2: 'The retrospective batch number is not entered in retrospective!',
            pleaseSelectAgent: 'Please select or fill in an agent!',  // 请选择或填写代理商！
            retroactiveStartIsEmpty: 'The retroactive start code is not filled in',  // 追溯起始编码没有填写
            retroactiveEndIsEmpty: 'The retroactive end code is not filled in',  // 追溯结束编码没有填写
            //此操作将要去商家的充值中心扣除积分, 是否继续?
            confirmTips: "This operation will go to the merchant's recharge center to deduct points, do you want to continue?"
        },
        
        // 追溯录入
        traceEnter: {
            traceCodeBatch: 'Trace code batch', // 追溯码批次
            numberOfTrace: 'Number of trace codes',  // 追溯码数量
            remainQuantity: 'Remaining qty',  // 剩余数量
            productionBatch: 'Production batch',  // 生产批次
            goods: 'Goods'   // 商品
        }
    },
    login: {
        username:'账户名称',
        loginFormTitle: 'Login',
        userNameInput: 'lease enter your account',
        passwordInput: 'Please enter your password',
        passwordCheck: 'Remember a week',
        registerButtonText: 'Go to register >',
        tip: 'It is recommended to use Chrome to make the system run more stable',
        loginButton: 'Login'
    },
    header: {
        password: 'The original password',
        newPassword: 'The new password',
        againPass: 'Enter the password again'
    },
    home: {
        merchantHomeTitle: 'Home page',
        merchantHello: 'Hello!',
        happyDay: 'Wish you happy every day!',
        merchantAddress: 'Merchant address',
        mess_info: 'Merchant information',
        merchantIntegral: 'Residual integral', // 剩余积分
        merchantCommodityNum: 'Commodity number', // 商品数
        merchantTraceNum: 'Trace amount of this month', // 本月 追溯额
        merchantNewsTitle: 'Latest news',
        merchantNewsIntegral: 'Top-up integral', // 充值积分
        merchantNewsIntegralNum: 'Recharging integral：',  // 充值的积分数
        merchantNewsIntegralAmonut: 'Recharging amount：', // 充值的金额
        merchantNewCer: 'Certification application', // 认证申请
        merchantNewsCerAmount: 'Certification amount：', // 认证的金额
        merchantTrace: 'A trace', // 追溯
        merchantTraceA: 'Number of applications：', // 追溯数量
        merchantNewsDate: 'To apply for time：', // 消息列表（申请时间）
        merchantNewsStatus1: 'Have passed', //已通过
        merchantNewsStatus2: 'To audit', // 待审核
        merchantNewsStatus3: 'Has withdrawn', // 已撤回
        merchantNewsStatus4: 'Has refused to' // 已拒绝
    },

    // 标码中心
    centerCode: {
        // 标签预留
        reserved: {
            labelReservation: 'Label reservation',  //标签预留
            freePaperLabels: 'Number of free paper labels',  // 空闲纸质标签数
            paperLabelLoss: 'Paper label loss', //纸质标签损耗数
            usedPaperLabels: 'Number of used paper labels',  // 已使用纸质标签数
            reservedCodeSegment: 'Reserved code segment',  // 预留码段
            startSid: 'Start sid',  // 开始sid
            endSid: 'End sid',  // 结束sid
            reservationDate: 'Reservation date',  // 预留日期
            AddReservedCodeSegmentTime: 'Add reserved code segment time',  //添加预留码段时间
            reservedQuantity: 'Reserved quantity',  // 预留数量
            operator: 'Operator'  // 操作人员
        },


        // 标签发放明细
        distribut: {
            labelIssuanceDetails: 'Label issuance details',  // 标签发放明细
            merchantName: 'Merchant name',  // 商家名称
            company: 'Company', // 公司
            paperLabelQuota: 'Paper label quota',  // 纸质标签额度
            remainingAmount: 'Remaining amount', // 剩余额度
            paperLabelsUsed: 'Number of paper labels used',  // 已使用的纸质标签数
            electronicTagsUsed: 'Number of electronic tags used', // 已使用的电子标签数
            headquarters: 'headquarters',   // 总部
        }
    }
}

export default en