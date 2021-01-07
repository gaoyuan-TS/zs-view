import enLocale from 'element-ui/lib/locale/lang/en'

const en = {
    ...enLocale,
    button: {
        new: 'new',
        determine: 'determine',
        cancel: 'cancel',
        Comfirm: 'Comfirm',
        viewDetail: 'View details', // 查看详情
        delivery: 'Immediate delivery', // 立即发货
        refund: 'Commodity refund', // 商品退款
        cancelOrder: 'Cancel order', // 取消订单
        confirmOrder: 'Confirm order', // 确认订单
        afterSalesDetail: 'After sale details', // 售后详情
        export: 'export', // 导出
        edit: 'edit', // 编辑
        withdraw: 'withdraw', // 撤回
        Record: 'Record', // 记录
        Entry: 'Entry', // 录入
        history: 'View history',
        SelectFile: 'Select file', // 选取文件
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
    }, // 按钮
    confirm: {
        conTo: 'Continue to', // 继续
        know: 'I know the', // 我知道了
        tip: 'prompt', // 提示
        traceEnter: 'This action will clear the data you filled in and confirm the action', // 此操作将会清除掉您所填写的数据，确认此操作
    },
    common: {
        ROLE_BUSINESS: 'Merchants',
        date: 'Edit date', // 编辑日期
        date2: 'date',
        startDate: 'Start date', // 开始日期
        endDate: 'End date', // 结束日期
        to: 'to', // 至
        Operation: 'Operation', // 操作
        pleaseSelect: 'please select',  // 请选择
        operateSuccessfully: 'Operate successfully',  // 操作成功
        operationFailure: 'Operation failure', // 操作失败
        empty: 'none'  // 空
    },
    uploadimg: {
        tenM: 'Upload image size should not exceed 10M', //上传图片大小不能超过10M
        noTip: "Can't upload video!",  // '不能上传视频！'
        format: 'Upload pictures can only be in png, jpg, jpeg format!', // 上传图片只能是 png,jpg,jpeg 格式!
        format1: 'Upload video can only be in ogg, mp4, webm format!', // 上传视频只能是 ogg,mp4,webm 格式!
        videoTenM: 'Upload video cannot exceed 500MB!', // 上传视频不能超过 500MB!
        videoTenM1: 'Upload video cannot exceed 50MB!', // 上传视频不能超过 500MB!
    }, // 上传图片
    menu: {
        menuName: 'Home page',
        Employees: 'Employees',
        Goods: 'Goods',
        order: 'The order',
        afterSales: 'After-sales',
        refund: 'A refund',
        Trace: 'Trace',
        agent: 'The agent',
        agentsList: 'agentsList',
        pending: 'Check pending',
        topUp: 'Top-up',
        merchant:'merchant',
        retrospect:'retrospect',
        RechargeRecord:'充值记录',
        CertificationRecord:'认证记录',
        labelReservation: 'Label reservation',  // 标签预留
        labelReview: 'Label review',  // 标签审核
        labelIssuanceDetails: 'Label issuance details'  // 标签发放明细
    },
    jurisdiction: {
        Merchants: 'Merchants'
    }, // 角色
    merchant: {
        merchantDetails: 'Business information', // Business information
        merchantEdits: 'Merchant editor', //
        merchantName: 'Name of merchant', // 商家名称
        netWeokType: 'Access Network type', // 入网类型
        selectNetwork: 'Please select the network type', // 请选择入网类型
        netWeokTypeOps: {
            ServiceType: 'Service type', // 服务型
            production: 'Production', // 生产型
        },
        merchantNetypeOps: {
            yes: 'yes',
            no: 'no'
        },
        merchantAccount: 'Merchant account', // 商家账号
        notAEnterprise: 'Whether or not a enterprise', // 是否企业
        selectEnterprise: 'Please choose whether it is a business', // 请选择是否企业
        merchantType: 'Merchant type', // 商家类型
        selectMerchnatType: 'Please select a business type', // 请选择商家类型
        merchantTypeOps: {
            Vendor: 'Vendor', // 厂商
            farmersMar: 'Farmers market', // 农贸市场
            company: 'the company', // 公司
            orther: 'orther', // 其他
        },
        personal: 'personal', // 个人
        merchantWebsiten: 'Enterprise website', // 企业官网
        merchantLocation: 'Location of merchant', // 商家所在地
        merchantAdree: 'Detailed address', // 详细地址
        merchantBrand: 'Enterprise brand', // 企业品牌
        noBrandError: 'Please enter the brand name', // 请输入品牌名称
        lineBusin: 'line of business', // 经营品种
        merchantDesc: 'Merchant description', // 商家描述
        merchantContact: 'Merchant contact', // 商家联系人
        licenseNumber: 'Business license number', // 商家营业执照编号
        merchantRepre: 'Business legal representative', // 法人代表
        merchantContactNum: 'Contact number', // 联系电话
        merchantLogo: 'Enterprise logo', // 企业logo
        nomerchantLogo: 'No corporate logo uploaded', // 暂无上传企业logo
        businessLic: 'Business license', // 营业执照
        IDCard: 'Front of ID card', // 身份证正面
        IDCardReverse: 'ID card reverse', // 身份证反面
        BusinessLicense: 'business license', // 经营许可证
        noBusinessLicense: 'No uploading business license', // 暂无上传经营许可证
        registraTionCert: 'trademark registration certificate', // 商标注册证书
        NOregistraTionCert: 'No trademark registration certificate has been uploaded yet', // 暂无上传商标注册证
        proLicense: 'Production license', // 生产许可证
        noproLicense: 'No uploading production license', // 暂无上传生产许可证
        hygieneLicense: 'Hygiene license', // 卫生许可证
        nohygieneLicense: 'No health license uploaded', // 暂无上传卫生许可证
        productReport: 'Product inspection report', // 产品检验报告
        noproductReport: 'No product inspection report uploaded yet', // 暂无上传产品检验报告
        openingLicense: 'account opening license', // 开户许可证
        noopeningLicense: 'No uploading license', // 暂无上传开户许可证
        otherPictures: 'Other pictures (multiple)',  // 其他图片(多张)
        nootherPictures: 'No other pictures uploaded', // 暂无上传其他图片
        merchantVideo: 'merchant videos', // 商家视频
        noMerchantVideo: 'No videos uploaded', // 暂无视频
        newMerchantMessage: {
            merchantNmaeError: 'Please fill in the name of the merchant', // 请填写商家名称
            merchantNetTypeError: 'Please select the network type', // 请选择入网类型
            enterPriseError: 'Please select whether the business is an enterprise', // 请选择商家是否为企业
            merchantTypeError: 'Please select the merchant type', // 请选择商家类型
            locationError: 'Please select the location of the merchant', // 请选择商家所在的地区
            merchantDetailSiteError: 'Please fill in the detailed address of the merchant', // 请填写商家的详细地址
            merchantContactError: 'Please fill in the merchant contact', // 请填写商家联系人
            lealPersonNameErr: 'Please fill in the legal representative of the merchant', // 请填写商家的法人代表
            contectNumberErr: 'Please fill in the contact number of the merchant', // 请填写商家的联系电话
            businesslinesErr: 'Please fill in the type of business', // 请填写商家的经营品种
            mechantDescErr: 'Please fill in the description of the merchant', // 请填写商家的介绍
            IDImgErr: 'Please upload real and clear ID picture!', // 请上传真正的且清晰的身份证图片！
            papersImgErr: 'Please upload real and clear business license picture!', // 请上传真正的且清晰的营业执照图片！
            papersNumberErr1: 'Pay attention to pass the picture of the ID card to be clear!', // 注意传的身份证的图片要清晰！
            papersNumberErr2: 'Pay attention to the picture of the business license to be clear!', // 注意传的营业执照的图片要清晰！
        }
    }, // 商家
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
    //管理员首页
    manageHome:{
        traceTotal:"Total retrospective total",
        yesterdayTotal:'Retroactively added yesterday',
        sellerTotal:'Total number of businesses',
        yesterdaySellerTotal:'Merchants added yesterday',
        goodTotal:'Total number of products',
        yesterDayTotal:'New products added yesterday',
        scanCodeTotal:'Retrospective scan code quantity',
        yesterDayscanCodeTotal:'New products added yesterday',
        RetroactiveAmount:'Retroactive amount increment',
        MerchantIncrement:'Merchant increment',
        CommodityIncrement:'Commodity increment',
        ThisWeek:'This week',
        ThisMonth:'This month',
        ThisYear:'This year',
        rankingName:'Merchants’ retroactive amount ranking'
    },
    // 加盟商模块
    allianceBusinessList:{
        companyName:'company name',
        createTime:'Creation date',
        ProcessingStatus:'Processing status',
        operating:"operating",
        location:'address',
        normal:"normal",
        edit:"edit",
        to:'to',
        search:'search',
        Prohibit:"Prohibit",
        Open:"Open",
        enterCompany:'Please enter company name',
        status:'status',
        selectLoction:'Please select address',
        newDialogTitle: 'New franchisee',
        franchisee:'Please enter the name of the franchisee',
        description:'Franchisee description',
        certificate:'Business license or certificate',
        tips:'The status will be changed, do you want to continue?',
        new:'new',
        selectAddress:'Please select a specific city, county, district',
        confirm:'confirm',
        edit:"edit",
        cancel:'cancel',
        tipsTitle:'prompt',
        certificateDesc:'Please enter the franchisee description',
        upLatecertificate:'Please upload the incoming business license or certificate',
        selectFranchisee:'Please enter the name of the franchisee',
        picFormat:'Upload pictures can only be in png, jpg, jpeg format'
    },
    //账号管理
    Account:{
        AccountList:'Account list',
        companyName:'company name',
        AccountName:'Account Name',
        RoleType:'Role type',
        Name:'name',
        startDate:'start date',
        EndDate:'End date',
        new:'new',
        search:'search',
        createTime:'Creation date',
        ProcessingStatus:'Processing status',
        operating:"operating",
        Prohibit:"Prohibit",
        Open:"Open",
        Abandoned:"Abandoned",
        normal:"normal",
        edit:"edit",
        to:'to',
        AccountEdit:'Account edit',
        NewAccount:'New Account',
        newName:'Please fill in your name',
        format:'Account name consisting of uppercase and lowercase letters and numbers',
        selectCompany:'Please select a company',
        selectRoleType:'Please select the role type',
        department:"department",
        telephoneNumber:'telephone number',
        UploadAvatar:'Upload avatar',
        selectnumber:'Please enter your phone number',
        selectdepartment:'Please enter the department',
        editorSuccessfully:'Edit account successfully',
        newSuccessfully:'Successful account creation',
        ManageAccountList:'Manage account list',
        tips:'This operation will open an account, do you want to continue?',
        tipsTitle:'prompt',
        cancel:'cancel',
        confirm:'confirm',
        openSuccess:'Successfully opened',
        tipsProhibit:'This operation will Prohibit an account, do you want to continue?',
        ProhibitSuccess:'Prohibit success',
    },
    Goods: {
        goodList: { 
            goodListTitle: 'Commodity list',  // 商品列表
            goodNameInput: 'Commodity name', // 商品名称
            goodTypeInput: 'Commodity type', // 商品类型
            merchantType: 'merchant type', // 商家类型
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
        setSpec: {
            setSpecTitle: 'Sales specification settings', // 销售规格设置
            goodName: 'product name', // 商品名字
            merchantN阿么: "the shop's name", // 商家名字
            categorySet: 'Category setting/category display', // 分类设置/分类显示
            newFirstLevel: 'New first level classification', // 新增一级分类
            modifyClassifi: 'Modify classification', // 修改分类
            specifiCation: 'Specification setting/specification display', // 规格设置/规格显示
            specSetting: 'Specification setting', // 规格设置
            inStock: 'in stock', // 库存
            notSet: 'in stock', // 未设置
            inventorySett: 'Inventory settings', // 库存设置
            setProductImg: 'Set product image', // 设置商品图片
            newCategory: 'New category', // 新增分类
            categoryName: 'Category Name', // 分类名称
            inputCategoryName: 'Please enter a category name', // 请输入分类名称
            classificationType: 'Classification type', // 分类类型
            inputClassificationTip: 'Classification specification type cannot be empty', // 分类规格类型不能为空
            delete: 'delete', // 删除
            newClassificationType: 'New classification type', // 新增分类类型
        },
        title: 'List of commodities',
        goodNameInput: 'Commodity name', // 商品名称
        goodTypeInput: 'Commodity type', // 商品类型
        tableGoodName: 'Commodity name', // 商品名称
        tableGoodType: 'Commodity type', // 商品类型
        tableGoodDate: 'Last Commodity edit date',
        specSetting: 'Sales specification setting', // 销售规格设置
        freightTemplate: 'Freight template set', // 运费模板设置
        newGoodTitle: 'New good',
        editGoodTitle: 'Edit good', // 编辑商品
        newGoodImg: 'Product pictures',
        newGoodVideo: 'Product videos',
        newGoodDetails: 'product details ', // 产品详情
        newGoodVideoButton: 'Select video',
        newGoodVideoTip1: 'Video can only be Ogg, MP4, WebM format! (size cannot exceed 50M) ',
        newGoodVideoTip2: 'Only one video can be uploaded.If the wrong video is uploaded, delete the video first before uploading it',
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
    }, // 商品
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
            cancelOrderTip: 'Please select the item to cancel', // 请选择要取消的商品
            shipIm: 'Ship immediately', // 立即发货
        },
        orderStatus: {
            pendingOrder: 'Pending order', // 待接单
            toBeSeli: 'to be delivered', // 待发货
            toBeReceived: 'To be received', // 待收货
            transeComplete: 'Transaction complete', // 交易完成
            refundComplete: 'Refund complete', // 退款完成
            refundIng: 'Refunding', // 退款中
            refundInReturn: 'Refund in return', // 退款退货中
            refundInReturnCompleted: 'Refund return completed', // 退款退货完成
        },
        orderDetail: {
            orderDetailTitle: 'The order details', // 订单详情
            orderNumber: 'order number', // 订单号
            orderUser: 'Order user', // 下单用户
            weChantName: 'WeChat nickname', // 微信昵称
            payTime: 'Payment time', // 支付时间
            orderStatus: 'Order status', // 订单状态
            cashAmount: 'Cash amount', // 现金金额
            freight: 'freight', // 运费
            orderTime: 'time of placing the order', // 下单时间
            receivingInfo: 'Receiving information', // 收货信息
            consigneeName: 'Consignee name', // 收货人姓名
            userRemarks: 'User remarks', // 用户备注
            consigneePhone: 'Consignee Phone', // 收货人电话
            address: 'Shipping address', // 收货地址
            packageInfo: 'Package information', // 包裹信息
            logisticsName: 'Logistics company name', // 物流公司名称
            logisticsNumber: 'Logistics express waybill number', // 物流快递单号
            logisticsQuery: 'Logistics query', // 物流查询
            modifyNumber: 'Modify the waybill number', // 修改运单号
            proName: 'product name', // 商品名称
            specifications: 'Specifications', // 规格
            Quantity: 'Quantity', // 数量
            money: 'Amount of money', // 金额
            evaluate: 'evaluate', // 评价
            noComments: 'No comments from users', // 用户暂无评价
            noCommentsOps: 'User has no comments yet and cannot operate', // 用户暂无评价无法操作
            reply: 'Comment reply', // 评论回复
            Praise: 'Praise', // 好评
            orderlogMod: 'Order logistics modification', // 订单物流修改
            chooseLogisiCom: 'Choose a logistics company', // 选择物流公司
            enterLogNumber: 'Enter the logistics number', // 输入物流单号
        }
    }, // 订单
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
        goodName: 'Name of commodity', // 产品名称
        applyForReason: 'Reason for application', // 申请原因
        noScreenshot: 'No screenshot uploaded yet', // 暂无上传截图
        viewScreenshots: 'View screenshots', //查看退换凭证图
        viewExchange: 'View exchange address', // 查看换货地址,
        noExpressScreen: 'No upload of express screenshot', // 暂无上传快递截图
        viewMailingExpress: 'View the screenshot of the mailing express', //查看邮寄快递单截图
        problemDesc: 'Problem description', // 问题描述
        merchantAgreement: 'Merchant agreement', // 商家同意
        merchantRefusal: 'Merchant refusal', // 商家拒绝
        merchantRefunding: 'merchant is refunding', // 商家退款中
        merchantAlready: 'merchant returned already', // 商家已退
        applying: 'in applying', // 申请中
        agreed: 'Agreed', // 已同意
        rejected: 'Rejected', // 已拒绝
        refunding: 'Refunding', // 退款中
        refundes: 'Refunded', // 已退款

    }, // 售后
    refund: {
        refundListTitle: 'The refund list',
        refundNumber: 'Refund Order number',
        opsRefund: 'Operate refund', // 操作退款
        ridioRefuse: 'Refuse refund', // 拒绝退款
        ridioAgree: 'Agree to refund', // 同意退款
    }, // 退款
    Trace: {
        traceList: {

            traceListTitle: 'Trace list',
            merchantName: 'Merchant name',  // 商家名称
            companyName: 'Company name', // 公司名称
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
            editTraceTitle: 'Edit Trace', // 编辑追溯
            newDialogNumnber: 'Number of applications', // 申请数量
            tagType: 'Tag type', // 标签类型
            newDialogNumnberTip1: 'Application quantity is empty', // 申请数量为空
            newDialogNumnberTip2: 'Application quantity can only be positive number', // 申请数量只能为正数
            tagTypeTip: 'Trace application type not selected', // 追溯申请类型没有选择！
            newTraceSuccess: 'New retrospective success', // 新建追溯信息成功！
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
            numCannotBeEmpty: 'The number of traceability applications cannot be empty',  //追溯申请数量不能为空
            paperTitle: 'The current quantity of free paper is', // 当前免费的纸制数量为
            certificationConfirm: 'Please conduct enterprise certification before initiating trace application', // 请先进行企业认证，才能发起追溯申请
        },
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
        traceInformation: {
            traceInformationTitle: 'Enter trace information', // 录入追溯信息
            lotNumber: 'Traceability Lot Number', // 追溯批次号
            trackingNumber: 'Number of tracking codes', // 追溯码数量
            remainingAmount: 'The remaining amount', // 追溯码剩余数量
            numbering: 'Numbering', // 编号
            to: 'to', // 至
            commodity: 'commodity', // 商品
            addLink: 'Add production link', // 添加生产环节
            add: 'add', // 添加
            delete: 'delete', // 删除
            lnkName: 'Link name', // 环节名称
            seleteDate: 'Please select a date', // 选择日期
            personCharge: 'Person in charge', // 负责人
            productPictures: 'Product pictures', // 上传图片
            traceInformation: 'Link description', // 环节描述
            linkDialogLinkName: 'Link name cannot be empty!', // 环节名称不能为空！
            linkDialogTime: 'No date is selected!', // 日期没有选择！
            linkDialogMan: "The person in charge can't be empty!", // '负责人不能为空！
            traceNumber: 'Please enter the number range', //请输入编号范围
            selectGood: 'Please select the product', // 请选择商品
            whetherSave: 'It cannot be modified after saving. Do you want to continue?', // 保存后不可修改，您还要继续吗？
            enterGoodTip: 'Whether to save the product information entered this time', //是否保存此次录入的商品信息
            buintegral: 'This time, we need to go to the recharge module to deduct the traceability credits', // 本次追溯需前往充值模块扣除追溯积分
            goTopUp: 'Please go to the recharge module to complete the deduction', //请前往充值模块完成积分扣除
            traceEnterSuccess: 'School success', //录入成功
            promprTip: "Initially, please start from the subscript '1' and enter sequentially in sequence", 
            viewHisroty: 'View history',
            enterHisroty: 'View history(number used)',
            addProLink: 'Add production link', // 添加生产环节
        }
    },
    topUp: {
        topUpCenter: {
            topUpCenterTitle: 'Top-up center', // 充值中心
            hello: 'hello', // 您好
            integralNum: 'Your current account integral are', // 您当前账号积分为
            labelLimit: 'Remaining paper label limit', // 剩余纸质标签额度
            authentication: 'Immediate authentication', // 立即认证
            rechangeButton: 'Immediate rechange', // 立即充值
            consumptionDetails: 'Trace integral burning consumption details', // 追溯积分燃烧消耗明细
            integralDetails: 'Create new/ edit commodity consumption integral details', // 新建/编辑商品消耗积分明细
            traceBatchNum: 'Trace batch number', // 追溯批次号
            deductionStatus: 'Deduction state', // 扣减状态
            noDeduction: 'No deduction', // 未扣减
            deductionAlready: 'Deducted alread', // 已扣减
            deduction: 'deduction', // 扣除
            detuctionDate: 'Integral deduction date', // 扣减积分日期
            number: 'number', // 关联商品的追溯码数量
            conDetails: 'Trace consumption details', // 追溯消耗明细
            deductionDatail: 'Add trace point deduction record', // 添加追溯点扣减记录
            productName: 'product name', // 商品名称
            enterGood: 'Enter commodity', // 录入商品
            editGood: 'Edit commodity', // 编辑商品
            conPoints: 'Consumption Points', // 消费积分
            deductionConfirm: 'Are you sure about the deduction?', // 确定进行扣除吗？
            deductionSuccess: 'Deduction of success', // 扣除成功
            deductionError: 'Deducted from the failure', //扣除失败
            catchDeduction: 'Cancellation of deduction!', // 已取消扣除！
            authProtocol: 'Authentication protocol', // 认证协议
            enterpriseAccess: 'Enterprise access protocol', // 企业入网协议
            instructions: 'Before you click Consent in the authentication process, you should read the following agreement carefully.', // 【审慎阅读】您在认证流程中点击同意前，应当认真阅读以下协议。
            note: 'note', // 备注
            note1: 'Click to jump to the page of the content of the agreement and finish reading. Authentication can only be carried out after reading', // 点击即可跳转协议内容页面，完成阅读，阅读完成后才能进行认证
            note2: 'If you have any questions about the agreement, you can consult the customer service at 020--31420284', // 如您对协议有任何疑问，可向客服咨询，电话：020--31420284
            know: 'I know the', // 我知道了
            haveRead: 'I have read', // 已阅读
            authProtocolTip: 'You did not read through the enterprise access protocol', // 您没有看完企业入网协议
        },
        common: {
            proName: 'product name', // 商品名称
            traBatchNum: 'Traceable batch number', // 追溯批次号
            proAndTraNum: 'Number of tracking codes for related products', // 关联商品的追溯码数量
        },
        consumPtionD: {
            traceConsumDetailsTitle: 'Trace consumption details', // 追溯消耗明细
            date: 'date', // 日期
            dayScanCode: 'Code scanning times of the day', // 当天扫码次数
            dayIntegral: 'Consumption integral of the day', // 当天消费积分
        },
        deductionRecord: {
            deductionRecordTitle: 'Add trace point deduction record', // 添加追溯点扣减记录
            addDate: 'Add the date', // 添加日期
            serialNum: 'Serial number', // 编号
            nodeName: 'nodeName', // 节点名称
            deductionNum: 'number of deduction integral', // 扣减积分数
        },
        payPage: {
            Certification: 'Certification', // 认证
            Recharge: 'Recharge', // 充值
            payMethod: 'payment method', // 支付方式
            wechatPay: 'WeChat Pay', // 微信支付
            aliPay: 'Alipay', // 支付宝支付
            immediately: 'pay immediately', // 立即支付
            transferAcc: 'Account for public transfer:', // 对公转账账号：
            uploadPaymentVoucher: 'Upload transfer payment voucher', // 上传转账支付凭证
            companyName: 'company name', // 公司名字：
            taxPayerNumber: 'Taxpayer Identification Number', // 纳税人识别号
            bankAcc: 'Bank Account', // 银行账号
            bankName: 'Bank name', // 开户银行
            uploadCertificate: 'upload certificate', // 上传凭证
            enterConfirmationCode: 'Enter confirmation code', // 输入验证码
            integral: 'integral', // 积分
            enterRechargingAmout: 'Enter the top-up amount', // 输入充值的金额
            other: 'other', // 其他
            total: 'total', // 总计
            transferUploadSucc: 'The recharge transfer voucher for points is uploaded successfully!', // 积分充值转账凭证上传成功！
            transferUploadErr: 'Failed to upload points recharge certificate!', // 积分充值凭证上传失败！
            uploadTransImg: 'Please upload the transfer voucher picture!', // 请上传转账凭证图！
            sum0Tip: 'The amount of recharge cannot be 0!', // 充值的金额不能为0！
        }
    }, // 充值中心


    login: {
        username:'账户名称',
        title: 'ZHONGZHUISUYUAN PaaS Cloud platform', 
        title2: 'Escort the genuine article',
        loginFormTitle: 'Login',
        userNameInput: 'lease enter your account',
        passwordInput: 'Please enter your password',
        passwordCheck: 'Remember a week',
        registerButtonText: 'Go to register >',
        loginButtonText: 'Log in with an existing account>',
        tip: 'It is recommended to use Chrome to make the system run more stable',
        loginButton: 'Login',
        regisFormTitle: 'register',
        regAccNum: 'Account number: input letters, numbers, symbols',
        regPass: 'Password: 6-16 digits, composed of alphanumerics',
        again: 'Please enter the password again',
        loginAccNameTip: 'Account name cannot be empty', //账户名不能为空
        loginPassTip: 'password can not be blank', // 密码不能为空
        registAccTip: 'Account can only enter uppercase and lowercase letters and numbers', // 账号只能输入大小写字母和数字
        registPassTip: 'The password must consist of 6-16 letters, numbers, and special symbols', // 密码必须由 6-16位字母、数字、特殊符号线组成
        passNewPassTip: 'The password does not match the password entered again', // 密码与再次输入的密码不一致
    }, // 登录
    header: {
        changPass: 'change Password', // 修改密码
        siginOut: 'sign out', //sign out退出登录
        password: 'The original password',
        newPassword: 'The new password',
        againPass: 'Enter the password again'
    }, // 页面中的头部部分
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