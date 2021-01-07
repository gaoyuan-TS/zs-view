import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

const cn = {
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
        afterSalesDetail: '售后详情', // 售后详情
        export: '导出', // 导出
        edit: '编辑', // 编辑
        withdraw: '撤回', // 撤回
        Record: '记录', // 记录
        Entry: '录入', // 录入
        history: '查看历史', // View history
        SelectFile: '选取文件', // 选取文件
        passed: '通过',  // 通过
        reject: '拒绝',  // 拒绝
        add: '添加',  // 添加
        remove: '删除',  //删除
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
        conTo: '继续', // 继续
        know: '我知道了', // 我知道了
        traceEnter: '此操作将会清除掉您所填写的数据，确认此操作', // 此操作将会清除掉您所填写的数据，确认此操作
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
        empty: '空',  // 空
        date2: '日期'
    }, 
    
    uploadimg: {
        tenM: '上传图片大小不能超过10M', //上传图片大小不能超过10M
        noTip: "不能上传视频！",  // '不能上传视频！'
        format: '上传图片只能是 png,jpg,jpeg 格式!', // 上传图片只能是 png,jpg,jpeg 格式!
        format1: '上传视频只能是 ogg,mp4,webm 格式!', // 上传视频只能是 ogg,mp4,webm 格式!
        videoTenM: '上传视频不能超过 500MB!', // 上传视频不能超过 500MB!
        videoTenM1: '上传视频不能超过 50MB!', // 上传视频不能超过 500MB!
    }, // 上传图片
    menu: {
        menuName: '首页',
        Employees: '员工管理',
        Goods: '商品模块',
        order: '订单',
        afterSales: '售后',
        refund: '退款',
        Trace: '追溯模块',
        agent: '代理商模块',
        agentsList: '代理商列表',
        pending: '待审核代理商',
        topUp: '充值模块',
        merchant:'商家模块',
        retrospect:'retrospect',
        RechargeRecord:'充值记录',
        CertificationRecord:'认证记录',
        labelReservation: '标签预留',  // 标签预留
        labelReview: '标签审核',  // 标签审核
        labelIssuanceDetails: '标签发放明细'  // 标签发放明细
    }, // 菜单
    jurisdiction: {
        Merchants: '商家管理员'
    }, // 角色
    home: {
        merchantHomeTitle: '首页',
        merchantHello: '你好!',
        happyDay: '祝您开心每一天',
        merchantAddress: '商家地址',
        mess_info: '商家资料',
        merchantIntegral: '剩余积分', // 剩余积分
        merchantCommodityNum: '商品数', // 商品数
        merchantTraceNum: '本月追溯额', // 本月 追溯额
        merchantNewsTitle: '最新消息',
        merchantNewsIntegral: '充值积分', // 充值积分
        merchantNewsIntegralNum: '充值的积分数：',  // 充值的积分数
        merchantNewsIntegralAmonut: '充值的金额：', // 充值的金额
        merchantNewCer: '认证申请', // 认证申请
        merchantNewsCerAmount: '认证的金额：', // 认证的金额
        merchantTrace: '追溯', // 追溯
        merchantTraceA: '追溯数量：', // 追溯数量
        merchantNewsDate: '申请时间：', // 消息列表（申请时间）
        merchantNewsStatus1: '已通过', //已通过
        merchantNewsStatus2: '待审核', // 待审核
        merchantNewsStatus3: '已撤回', // 已撤回
        merchantNewsStatus4: '已拒绝', // 已拒绝
        reason: '原因', // 原因
    }, // 商家首页
    merchant: {
        merchantDetails: '详细资料', // Business information
        merchantEdits: '编辑资料', //
        merchantName: '商家名称', // 商家名称
        netWeokType: '入网类型', // 入网类型
        selectNetwork: '请选择入网类型', // 请选择入网类型
        netWeokTypeOps: {
            ServiceType: '服务型', // 服务型
            production: '生产型', // 生产型
        },
        merchantNetypeOps: {
            yes: '是',
            no: '否'
        },
        merchantAccount: '商家账号', // 商家账号
        notAEnterprise: '是否企业', // 是否企业
        selectEnterprise: '请选择是否企业', // 请选择是否企业
        merchantType: '商家类型', // 商家类型
        selectMerchnatType: '请选择商家类型', // 请选择商家类型
        merchantTypeOps: {
            Vendor: '厂商', // 厂商
            farmersMar: '农贸市场', // 农贸市场
            company: '公司', // 公司
            orther: '其他', // 其他
        },
        personal: '个人', // 个人
        merchantWebsiten: '企业官网', // 企业官网
        merchantLocation: '商家所在地', // 商家所在地
        merchantAdree: '详细地址', // 详细地址
        merchantBrand: '企业品牌', // 企业品牌
        noBrandError: '请输入品牌名称', // 请输入品牌名称
        lineBusin: '经营品种', // 经营品种
        merchantDesc: '商家描述', // 商家描述
        merchantContact: '商家联系人', // 商家联系人
        licenseNumber: '商家营业执照编号', // 商家营业执照编号
        merchantRepre: '法人代表', // 法人代表
        merchantContactNum: '联系电话', // 联系电话
        merchantLogo: '企业logo', // 企业logo
        nomerchantLogo: '暂无上传企业logo', // 暂无上传企业logo
        businessLic: '营业执照', // 营业执照
        IDCard: '身份证正面', // 身份证正面
        IDCardReverse: '身份证反面', // 身份证反面
        BusinessLicense: '经营许可证', // 经营许可证
        noBusinessLicense: '暂无上传经营许可证', // 暂无上传经营许可证
        registraTionCert: '商标注册证书', // 商标注册证书
        NOregistraTionCert: '暂无上传商标注册证', // 暂无上传商标注册证
        proLicense: '生产许可证', // 生产许可证
        noproLicense: '暂无上传生产许可证', // 暂无上传生产许可证
        hygieneLicense: '卫生许可证', // 卫生许可证
        nohygieneLicense: '暂无上传卫生许可证', // 暂无上传卫生许可证
        productReport: '产品检验报告', // 产品检验报告
        noproductReport: '暂无上传产品检验报告', // 暂无上传产品检验报告
        openingLicense: '开户许可证', // 开户许可证
        noopeningLicense: '暂无上传开户许可证', // 暂无上传开户许可证
        otherPictures: '其他图片(多张)',  // 其他图片(多张)
        nootherPictures: '暂无上传其他图片', // 暂无上传其他图片
        merchantVideo: '商家视频', // 商家视频
        noMerchantVideo: '暂无视频', // 暂无视频
        newMerchantMessage: {
            merchantNmaeError: '请填写商家名称', // 请填写商家名称
            merchantNetTypeError: '请选择入网类型', // 请选择入网类型
            enterPriseError: '请选择商家是否为企业', // 请选择商家是否为企业
            merchantTypeError: '请选择商家类型', // 请选择商家类型
            locationError: '请选择商家所在的地区', // 请选择商家所在的地区
            merchantDetailSiteError: '请填写商家的详细地址', // 请填写商家的详细地址
            merchantContactError: '请填写商家联系人', // 请填写商家联系人
            lealPersonNameErr: '请填写商家的法人代表', // 请填写商家的法人代表
            contectNumberErr: '请填写商家的联系电话', // 请填写商家的联系电话
            businesslinesErr: '请填写商家的经营品种', // 请填写商家的经营品种
            mechantDescErr: '请填写商家的介绍', // 请填写商家的介绍
            IDImgErr: '请上传真正的且清晰的身份证图片！', // 请上传真正的且清晰的身份证图片！
            papersImgErr: '请上传真正的且清晰的营业执照图片！', // 请上传真正的且清晰的营业执照图片！
            papersNumberErr1: '注意传的身份证的图片要清晰！', // 注意传的身份证的图片要清晰！
            papersNumberErr2: '注意传的营业执照的图片要清晰！', // 注意传的营业执照的图片要清晰！
        }
    }, // 商家
    Employees: {
        title: '员工账号列表', // 员工账号列表
        employeeName: '员工姓名', // 员工姓名
        PhoneNumber: '商家号码', // 商家号码
        realName: '员工姓名', // 员工姓名
        accountName: '账号名称', // 账号名称
        mobile: '手机号码', // 手机号码
        dataTitle: '创建日期', // 创建日期
        Status: '状态', // 状态
        Operation: '操作', // 操作
        ops2: '开通', // 开通
        Status0: '废弃', // 废弃
        Status1: '正常', // 正常
        Status2: '禁止', // 禁止
        forbidTitle: '此操作将禁止账号, 是否继续？', // 此操作将禁止账号, 是否继续?
        normalTitle: '此操作将开通账号, 是否继续?', // 此操作将开通账号, 是否继续?
        forbidTip: '禁止成功', // 禁止成功
        normalTip: '开通成功', // 开通成功
        newDialogTitle: '新建员工账号', // 新建员工账号
        newDialogAccount: '账号名称', // 账号名称
        newDialogEmployee: '员工名称', // 员工名称
        newDialogPhone: '手机号码', // 手机号码
        newAccountNameError: '账号名称不能为空！', // 账号名称不能为空！
        newAccountNameType: '账号名称只能输入大小写字母和数字！', // 账号名称只能输入大小写字母和数字！
        newRealNameError: '员工姓名不能为空！', // 员工姓名不能为空！
        newMobileError: '手机号码不能为空！', // 手机号码不能为空！
        newAccountSuccess: '新建员工账号成功！' // 新建员工账号成功！
    }, // 员工
    Goods: {
        goodList: { 
            goodListTitle: '商品列表',  // 商品列表
            goodNameInput: '商品名称', // 商品名称
            goodTypeInput: '商品类型', // 商品类型
            merchantType: '商家类型', // 商家类型
            merchantName: '商家名称',  // 商家名称
            companyName: '公司名称', // 公司名称
            creationDate: '创建日期',  // 创建日期
            tableGoodDate: '最近商品编辑日期',  // 最近商品编辑日期
            theBeltAndRoad: '一带一路',  // 一带一路
            hits: '上架',  // 上架
            off: '下架' ,  // 下架
            hitTips: '此操作将会【上架】商品到一带一路国际贸易区中', // 此操作将会【上架】商品到一带一路国际贸易区中
            offTips: '此操作将会从一带一路国际贸易区中【下架】'  // 此操作将会从一带一路国际贸易区中【下架】
        },
        setSpec: {
            setSpecTitle: '销售规格设置', // 销售规格设置
            goodName: '商品名字', // 商品名字
            merchantN阿么: "商家名字", // 商家名字
            categorySet: '分类设置/分类显示', // 分类设置/分类显示
            newFirstLevel: '新增一级分类', // 新增一级分类
            modifyClassifi: '修改分类', // 修改分类
            specifiCation: '规格设置/规格显示', // 规格设置/规格显示
            specSetting: '规格设置', // 规格设置
            inStock: '库存', // 库存
            notSet: '未设置', // 未设置
            inventorySett: '库存设置', // 库存设置
            setProductImg: '设置商品图片', // 设置商品图片
            newCategory: '新增分类', // 新增分类
            categoryName: '分类名称', // 分类名称
            inputCategoryName: '请输入分类名称', // 请输入分类名称
            classificationType: '分类类型', // 分类类型
            inputClassificationTip: '分类规格类型不能为空', // 分类规格类型不能为空
            delete: '删除', // 删除
            newClassificationType: '新增分类类型', // 新增分类类型
        },
        title: '商品列表',
        goodNameInput: '商品名称', // 商品名称
        goodTypeInput: '商品类型', // 商品类型
        tableGoodName: '商品名称', // 商品名称
        tableGoodType: '商品类型', // 商品类型
        tableGoodDate: '最近商品编辑日期',
        specSetting: '销售规格设置', // 销售规格设置
        freightTemplate: '运费模板设置', // 运费模板设置
        newGoodTitle: '新建商品',
        editGoodTitle: '编辑商品', // 编辑商品
        newGoodImg: '产品图片',
        newGoodVideo: '产品视频',
        newGoodDetails: '产品详情 ', // 产品详情
        newGoodVideoButton: '选择视频',
        newGoodVideoTip1: '视频只能是 ogg,mp4,webm 格式!(大小不能超过50M)',
        newGoodVideoTip2: '只能上传一段视频，上传错视频，先把该视频删除再上传',
        newGoodNameTip: '请填写商品名称', // 请填写商品名称
        newGoodCategoryIdTip: '请选择分类', // 请选择分类
        newGoodImgsTip: '商品图至少要上传一张', // 商品图至少要上传一张
        newGoodIntroductionTip: '请上传商品详情图', // 请上传商品详情图
        newGoodSuccess: '新建产品成功'
    }, // 商品
    order: {
        orderList: {
            title: '订单列表', // 订单列表
            orderNumber: '订单号', // 订单号
            commodityName: '商品名称', // 商品名称
            Nameofconsignee: '收货人', // 收货人
            ConsigneeTelephone: '收货人电话', // 收货人电话
            trackingNumber: '快递单号', // 快递单号
            orderMobNumer: '下单手机号', // 下单手机号
            orderStatus: '订单状态', // 订单状态
            payDate: '支付日期', // 支付日期
            exportOrderList: '导出订单数据列表', // 导出订单数据列表
            theOrdertime: '下单日期', // 下单日期
            buyerInformation: '买家信息', // 买家信息
            commoodityId: '商品id', // 商品id
            Specifications: '规格', // 规格
            totalPrice: '总价', // 总价
            freight: '运费', // 运费
            receAdress: '收货地址', // 收货地址
            exportOrderTitle: "此操作将下载商家的指定条件下的订单数据列表", // 此操作将下载商家的指定条件下的订单数据列表
            confirmOrderTitle: '你是否确认接单', // 你是否确认接单
            confirmOrderCancel: '已取消接单操作', // 已取消接单操作
            trackingIdTip: '请选择物流公司', // 请选择物流公司
            trackingNoTip: '请填写物流运单号', // 请填写物流运单号
            cancelOrderTitle: '取消订单商品', // 取消订单商品
            refundTitle: '商品退款', // 商品退款
            cancelOrderTip: '请选择要取消的商品', // 请选择要取消的商品
            shipIm: '立即发货', // 立即发货
        },
        orderStatus: {
            pendingOrder: '待接单', // 待接单
            toBeSeli: '待发货', // 待发货
            toBeReceived: '待收货', // 待收货
            transeComplete: '交易完成', // 交易完成
            refundComplete: '退款完成', // 退款完成
            refundIng: '退款中', // 退款中
            refundInReturn: '退款退货中', // 退款退货中
            refundInReturnCompleted: '退款退货完成', // 退款退货完成
        },
        orderDetail: {
            orderDetailTitle: '订单详情', // 订单详情
            orderNumber: '订单号', // 订单号
            orderUser: '下单用户', // 下单用户
            weChantName: '微信昵称', // 微信昵称
            payTime: '支付时间', // 支付时间
            orderStatus: '订单状态', // 订单状态
            cashAmount: '现金金额', // 现金金额
            freight: '运费', // 运费
            orderTime: '下单时间', // 下单时间
            receivingInfo: '收货信息', // 收货信息
            consigneeName: '收货人姓名', // 收货人姓名
            userRemarks: '用户备注', // 用户备注
            consigneePhone: '收货人电话', // 收货人电话
            address: '收货地址', // 收货地址
            packageInfo: '包裹信息', // 包裹信息
            logisticsName: '物流公司名称', // 物流公司名称
            logisticsNumber: '物流快递单号', // 物流快递单号
            logisticsQuery: '物流查询', // 物流查询
            modifyNumber: '修改运单号', // 修改运单号
            proName: '商品名称', // 商品名称
            specifications: '规格', // 规格
            Quantity: '数量', // 数量
            money: '金额', // 金额
            evaluate: '评价', // 评价
            noComments: '用户暂无评价', // 用户暂无评价
            noCommentsOps: '用户暂无评价无法操作', // 用户暂无评价无法操作
            reply: '评论回复', // 评论回复
            Praise: '好评', // 好评
            orderlogMod: '订单物流修改', // 订单物流修改
            chooseLogisiCom: '选择物流公司', // 选择物流公司
            enterLogNumber: '输入物流单号', // 输入物流单号
        }
    }, // 订单
    afterSales: {
        title: '售后列表',
        processState: '处理状态', // 处理状态
        salesNumber: '售后订单号', // 售后订单号
        mobilNumber: '下单手机号', // 下单手机号
        refundNumber: '退款单号', // 退款单号
        afterSalesType: '售后类型', // 售后类型
        refundAndReturn: '退款退货', // 退款退货
        Exchange: '换货', // 换货
        afterSalesDetails: '售后详情', // 售后详情
        goodNum: '数量',
        afterSaleDetail: '售后详情', // 售后详情
        afterType: '售后类型', // 售后类型
        goodName: '产品名称', // 产品名称
        applyForReason: '申请原因', // 申请原因
        noScreenshot: '暂无上传截图', // 暂无上传截图
        viewScreenshots: '查看退换凭证图', //查看退换凭证图
        viewExchange: '查看换货地址', // 查看换货地址,
        noExpressScreen: '暂无上传快递截图', // 暂无上传快递截图
        viewMailingExpress: '查看邮寄快递单截图', //查看邮寄快递单截图
        problemDesc: '问题描述', // 问题描述
        merchantAgreement: '商家同意', // 商家同意
        merchantRefusal: '商家拒绝', // 商家拒绝
        merchantRefunding: '商家退款中', // 商家退款中
        merchantAlready: '商家已退', // 商家已退
        applying: '申请中', // 申请中
        agreed: '已同意', // 已同意
        rejected: '已拒绝', // 已拒绝
        refunding: '退款中', // 退款中
        refundes: '已退款', // 已退款

    }, // 售后
    refund: {
        refundListTitle: '退款列表',
        refundNumber: '退款订单号',
        opsRefund: '操作退款', // 操作退款
        ridioRefuse: '拒绝退款', // 拒绝退款
        ridioAgree: '同意退款', // 同意退款
    }, // 退款
    Trace: {
        traceList: {
            traceListTitle: '追溯列表', // 追溯列表
            merchantName: '商家名称',  // 商家名称
            companyName: '公司名称', // 公司名称
            traceCodeBatch: '追溯码批次号', // 追溯码批次号
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
            editTraceTitle: '编辑追溯', // 编辑追溯
            newDialogNumnber: '申请数量', // 申请数量
            tagType: '标签类型', // 标签类型
            newDialogNumnberTip1: '申请数量为空', // 申请数量为空
            newDialogNumnberTip2: '申请数量只能为正数', // 申请数量只能为正数
            tagTypeTip: '追溯申请类型没有选择！', // 追溯申请类型没有选择！
            newTraceSuccess: '新建追溯信息成功！', // 新建追溯信息成功！
            withdrawConfig: '你真的要撤回吗？', // 你真的要撤回吗？
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
            numCannotBeEmpty: '追溯申请数量不能为空',  //追溯申请数量不能为空
            paperTitle: '当前免费的纸制数量为', // 当前免费的纸制数量为
            certificationConfirm: '请先进行企业认证，才能发起追溯申请',
        },
        traceRecords: {
            searchTraCode: '请输入对应批次号的Sid或内外码', // 请输入对应批次号的Sid或内外码
            traceBatchNum: '追溯批次号', // 追溯批次号
            numberOfTrace: '追溯码数量', // 追溯码数量
            quantityNum: '追溯码剩余数量', // 追溯码剩余数量
            tracePointRecord: '追溯点记录', // 追溯点记录
            quterCode: '外码', // 外码
            innerCode: '内码', // 内码
            informationButton: '查看流通信息', // 查看流通信息
            informationTitle: '流通信息', // 流通信息
            pdoductName: '产品名称', // 产品名称
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
            to: 'to', // 至
            mobilePhone: '手机号码', // 手机号码
            personCharge: '负责人', // 负责人
            tracePointName: '追溯点名称', // 追溯点名称
            startCode: '请输入追溯起始编码', // 请输入追溯起始编码
            endCode: '请输入追溯结束编码', // 请输入追溯结束编码
        },
        traceInformation: {
            traceInformationTitle: '录入追溯信息', // 录入追溯信息
            
            lotNumber: '追溯批次号', // 追溯批次号
            trackingNumber: '追溯码数量', // 追溯码数量
            remainingAmount: '追溯码剩余数量', // 追溯码剩余数量
            numbering: '编号', // 编号
            to: '至', // 至
            commodity: '商品', // 商品
            addLink: '添加生产环节', // 添加生产环节
            add: '添加', // 添加
            delete: '删除', // 删除
            lnkName: '环节名称', // 环节名称
            seleteDate: '选择日期', // 选择日期
            personCharge: '负责人', // 负责人
            productPictures: '上传图片', // 上传图片
            traceInformation: '环节描述', // 环节描述
            linkDialogLinkName: '环节描述', // 环节描述
            linkDialogTime: '日期没有选择！', // 日期没有选择！
            linkDialogMan: "负责人不能为空！", // '负责人不能为空！
            traceNumber: '请输入编号范围', //请输入编号范围
            selectGood: '请选择商品', // 请选择商品
            whetherSave: '保存后不可修改，您还要继续吗？', // 保存后不可修改，您还要继续吗？
            enterGoodTip: '是否保存此次录入的商品信息', //是否保存此次录入的商品信息
            buintegral: '本次追溯需前往充值模块扣除追溯积分', // 本次追溯需前往充值模块扣除追溯积分
            goTopUp: '请前往充值模块完成积分扣除', //请前往充值模块完成积分扣除
            traceEnterSuccess: '录入成功', //录入成功
            promptTip: "初始请从下标'1'开始 依次按顺序录入", // 初始请从下标'1'开始 依次按顺序录入
            viewHisroty: '查看历史记录', // 查看历史记录
            enterHistory: '录入历史记录(已使用的编号)', // 录入历史记录(已使用的编号)
        }
    }, // 追溯
    Agent: {
        agentTitle: '代理商列表', // 代理商列表
        pendingAgent: '待审核代理商', // 待审核代理商
        agentName: '代理商名称', // 代理商名称
        sourceMode: '来源方式', // 来源方式
        indCreate: '自主创建', // 自主创建
        sechatRecom: '微信推荐', // 微信推荐
        contactPerson: '联系人', // 联系人
        phone: '电话', // 电话
        creatDate: '创建日期', // 创建日期
        status: '状态', // 状态
        through: '通过', // 通过
        normal: '正常', // 正常
        Prohibit: '禁止', // 禁止
        pendingStatus: '待审', //待审
        open: '开通', // 开通
        statusConfirmJz: '确认禁止该代理商吗？', // 确认禁止该代理商吗？
        statusConfirmTg: '确认通过该代理商吗？', // 确认通过该代理商吗？
        address: '地址', // 地址
        agencyGood: '代理商品', // 代理商品
        refuse: '拒绝', // 拒绝
        documents: '查看证件', // 查看证件
        certificateInfo: '代理商证件信息', // 代理商证件信息
        certificate: '证件', // 证件
        statusConfirmJJ: '确认拒绝该代理商吗？', // 确认拒绝该代理商吗？
        newAgentDialog: {
            newAgent: '新建代理商', // 新建代理商
            contactPho: '联系电话', // 联系电话
            contactPer: '联系人', // 联系人
            agentName: '代理商名称', // 代理商名称
            agentAlias: '代理商别名', // 代理商别名
            region: '地区', // 地区
            detaAddress: '详细地址', // 详细地址
            agentDesc: '代理商描述', // 代理商描述
            agentBus: '营业执照或证件', //营业执照或证件
            editAgent: '代理商编辑', // 代理商编辑
            agentCpntactNumberTip: '请填写代理商联系电话', // 请填写代理商联系电话
            agentContactTip: '请填写代理商联系人', // 请填写代理商联系人
            agentNameTip: '请填写代理商的名称', // 请填写代理商的名称
            agentAnotherNameTip: '请填写代理商的别名', //请填写代理商的别名
            siteIdTip: '请选择代理商所在的地区', // 请选择代理商所在的地区
            agentDetailSiteTip: '请填写代理商的详细地址', // 请填写代理商的详细地址
            agentDescriptionTip: '请填写该代理商的描述', // 请填写该代理商的描述
        }
    },
    
    topUp: {
        topUpCenter: {
            topUpCenterTitle: '充值中心', // 充值中心
            hello: '您好', // 您好
            integralNum: '您当前账号积分为', // 您当前账号积分为
            labelLimit: '剩余纸质标签额度', // 剩余纸质标签额度
            authentication: '立即认证', //
            rechangeButton: '立即充值', // 立即充值
            consumptionDetails: '追溯积分燃烧消耗明细', // 追溯积分燃烧消耗明细
            integralDetails: '新建/编辑商品消耗积分明细', // 新建/编辑商品消耗积分明细
            traceBatchNum: '追溯批次号', // 追溯批次号
            deductionStatus: '扣减状态', // 扣减状态
            noDeduction: '未扣减', // 未扣减
            deductionAlready: '已扣减', // 已扣减
            deduction: '扣除', // 扣除
            detuctionDate: '扣减积分日期', // 扣减积分日期
            number: '关联商品的追溯码数量', // 关联商品的追溯码数量
            conDetails: '追溯消耗明细', // 追溯消耗明细
            deductionDatail: '添加追溯点扣减记录', // 添加追溯点扣减记录
            productName: '商品名称', // 商品名称
            enterGood: '录入商品', // 录入商品
            editGood: '编辑商品', // 编辑商品
            conPoints: '消费积分', // 消费积分
            deductionConfirm: '确定进行扣除吗？', // 确定进行扣除吗？
            deductionSuccess: '扣除成功', // 扣除成功
            deductionError: '扣除失败', //扣除失败
            catchDeduction: '已取消扣除！', // 已取消扣除！
            authProtocol: '认证协议', // 认证协议
            enterpriseAccess: '企业入网协议', // 企业入网协议
            instructions: '【审慎阅读】您在认证流程中点击同意前，应当认真阅读以下协议。', // 【审慎阅读】您在认证流程中点击同意前，应当认真阅读以下协议。
            note: '备注', // 备注
            note1: '点击即可跳转协议内容页面，完成阅读，阅读完成后才能进行认证', // 点击即可跳转协议内容页面，完成阅读，阅读完成后才能进行认证
            note2: '如您对协议有任何疑问，可向客服咨询，电话：020--31420284', // 如您对协议有任何疑问，可向客服咨询，电话：020--31420284
            know: '我知道了', // 我知道了
            haveRead: '已阅读',
            authProtocolTip: '您没有看完企业入网协议', // 
        },
        common: {
            proName: '商品名称', // 商品名称
            traBatchNum: '追溯批次号', // 追溯批次号
            proAndTraNum: '关联商品的追溯码数量', // 关联商品的追溯码数量
        },
        consumPtionD: {
            traceConsumDetailsTitle: '追溯消耗明细', // 追溯消耗明细
            date: '日期', // 日期
            dayScanCode: '当天扫码次数', // 当天扫码次数
            dayIntegral: '当天消费积分', // 当天消费积分
        },
        deductionRecord: {
            deductionRecordTitle: '添加追溯点扣减记录', // 添加追溯点扣减记录
            addDate: '添加日期', // 添加日期
            serialNum: '编号', // 编号
            nodeName: '节点名称', // 节点名称
            deductionNum: '扣减积分数', // 扣减积分数
        },
        payPage: {
            Certification: '认证', // 认证
            Recharge: '充值', // 充值
            payMethod: '支付方式', // 支付方式
            wechatPay: '微信支付', // 微信支付
            aliPay: '支付宝支付', // 支付宝支付
            immediately: '立即支付', // 立即支付
            transferAcc: '对公转账账号：', // 对公转账账号：
            uploadPaymentVoucher: '上传转账支付凭证', // 上传转账支付凭证
            companyName: '公司名字', // 公司名字：
            taxPayerNumber: '纳税人识别号', // 纳税人识别号
            bankAcc: '银行账号', // 银行账号
            bankName: '开户银行', // 开户银行
            uploadCertificate: '上传凭证', // 上传凭证
            enterConfirmationCode: '输入验证码', // 输入验证码
            integral: '积分', // 积分
            enterRechargingAmout: '输入充值的金额', // 输入充值的金额
            other: '其他', // 其他
            total: '总计', // 总计
            transferUploadSucc: '积分充值转账凭证上传成功！', // 积分充值转账凭证上传成功！
            transferUploadErr: '积分充值凭证上传失败！', // 积分充值凭证上传失败！
            uploadTransImg: '请上传转账凭证图！', // 请上传转账凭证图！
            sum0Tip: '充值的金额不能为0！', // 充值的金额不能为0！
        }
    }, // 充值中心
    login: {
        username:'账户名称',
        title: '中追溯源PasS云平台',
        title2: '为真品保驾护航',
        loginFormTitle: '登录',
        userNameInput: '请输入账号',
        passwordInput: '请输入密码',
        passwordCheck: '记住一周',
        registerButtonText: '去注册 >',
        loginButtonText: '去登录 >',
        tip: '建议使用 Chrome谷歌浏览器，系统运行更稳定',
        loginButton: '登录',
        regisFormTitle: '注册',
        regAccNum: '账号：输入字母、数字、符号',
        regPass: '密码：6-16位，字母数字组成',
        again: '请再次输入密码',
        loginAccNameTip: '账户名不能为空', //账户名不能为空
        loginPassTip: '密码不能为空', // 密码不能为空
        registAccTip: '账号只能输入大小写字母和数字', // 账号只能输入大小写字母和数字
        registPassTip: '密码必须由 6-16位字母、数字、特殊符号线组成', // 密码必须由 6-16位字母、数字、特殊符号线组成
        passNewPassTip: '密码与再次输入的密码不一致', // 密码与再次输入的密码不一致
    }, // 登录
    header: {
        changPass: '修改密码', // 修改密码
        siginOut: '退出登录', //sign out
        password: '请输入原密码',
        newPassword: '请输入新密码',
        againPass: '请再次输入设置的密码'
    }, // 页面中的头部部分
    allianceBusinessList:{
        newDialogTitle: '加盟商新建', // 新建员工账号
        companyName:'公司名称',
        createTime:'创建日期',
        ProcessingStatus:"处理状态",
        operating:'操作',
        location:'所在地',
        normal:'正常',
        edit:'编辑',
        to:'至',
        selectFranchisee:'请输入加盟商名称',
        search:'搜索',
        Prohibit:"禁止",
        Open:'开通',
        enterCompany:'请输入公司名称',
        status:'状态',
        franchisee:'请输入加盟商名称',
        selectLoction:'请选择所在地',
        description:'加盟商描述',
        certificate:'营业执照或证件',
        cancel:'取消',
        confirm:'确定',
        selectAddress:'请选择具体的城市，县，区',
        tips:'状态将被更改, 是否继续?',
        certificateDesc:'请输入加盟商描述',
        upLatecertificate:'请上传入营业执照或证件',
        new:'新建',
        cancel:'取消',
        startDate:'开始日期',
        EndDate:'结束日期',
        tipsTitle:'提示',
        picFormat:'上传图片只能是 png,jpg,jpeg 格式'
    },
    manageHome:{
        traceTotal:"总追溯总量",
        yesterdayTotal:'昨日追溯新增',
        sellerTotal:'总商家数',
        yesterdaySellerTotal:'昨日商家新增',
        goodTotal:'总商品数',
        yesterDayTotal:'昨日商品新增',
        scanCodeTotal:'追溯扫码数量',
        yesterDayscanCodeTotal:'昨日商品新增',
        RetroactiveAmount:'追溯额增量',
        MerchantIncrement:'商家增量',
        CommodityIncrement:'商品增量',
        ThisWeek:'本周',
        ThisMonth:'本月',
        ThisYear:'本年',
        rankingName:'商家追溯额排名'
    },
    Account:{
        AccountList:'账户列表',
        companyName:'公司名称',
        AccountName:'账户名称',
        RoleType:'角色类型',
        Name:'姓名',
        startDate:'开始日期',
        EndDate:'结束日期',
        new:'新建',
        search:'搜索',
        createTime:'创建日期',
        ProcessingStatus:"处理状态",
        operating:'操作',
        Prohibit:"禁止",
        Open:'开通',
        Abandoned:'废弃',
        normal:'正常',
        edit:'编辑',
        to:'至',
        AccountEdit:'账号编辑',
        NewAccount:'新建账号',
        newName:'请输入姓名',
        format:'请输入由大小写字母和数字组成的账号名称',
        selectCompany:'请选择公司',
        selectRoleType:'请选择角色类型',
        department:"部门",
        telephoneNumber:'电话号码',
        UploadAvatar:'上传头像 ',
        selectnumber:'请输入电话号码',
        selectdepartment:'请输入所在的部门',
        newSuccessfully:'创建账号成功',
        editorSuccessfully:'编辑账号成功',
        ManageAccountList:'管理账号列表',
        tips:'此操作将开通账号, 是否继续?',
        tipsTitle:'提示',
        cancel:'取消',
        confirm:'确定',
        openSuccess:'开通成功',
        ProhibitSuccess:'禁止成功',
        tipsProhibit:'此操作将禁止账号, 是否继续'
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
            changeStatusTips: '商家状态将被更改, 是否继续?', // 状态将被更改, 是否继续？
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
    // Trace: {
    //     // 追溯列表
    //     traceList: {
    //         traceListTitle: '追溯列表',  // 追溯列表
    //         traceCodeBatch: '追溯码批次号', // 追溯码批次号
    //         merchantName: '商家名称',  // 商家名称
    //         companyName: '公司名称', // 公司名称
    //         proState: '处理状态', // 处理状态
    //         havePassed: '已通过', // 已通过
    //         toBeauited: '待审核', // 待审核
    //         haveWithdrawn: '已撤回', // 已撤回
    //         haveRejected: '已拒绝', // 已拒绝
    //         applicationType: '申请类型', // 申请类型
    //         paperLabel: '纸质标签', // 纸质标签
    //         electronicLabel: '电子标签', // 电子标签
    //         dateOfApp: '申请日期', // 申请日期
    //         applicationNum: '申请数量', // 申请数量
    //         approvalDate: '审批日期', // 审批日期
    //         newTraceTltle: '新建追溯', // 新建追溯
    //         editTraceTltle: '编辑追溯', // 编辑追溯
    //         newDialogNumnber: '申请数量', // 申请数量
    //         tagType: '标签类型', // 标签类型
    //         newDialogNumnberTip1: '申请数量为空', // 申请数量为空
    //         newDialogNumnberTip2: '申请数量只能为正数', // 申请数量只能为正数
    //         tagTypeTip: '追溯申请类型没有选择', // 追溯申请类型没有选择！
    //         newTraceSuccess: '新建追溯信息成功', // 新建追溯信息成功！
    //         withdrawConfig: '你真的要撤回吗?', // 你真的要撤回吗？
    //         exportConfig: '此操作将下载追溯码文件', // 此操作将下载追溯码文件
    //         freePapelLbelCount: '当前免费的纸质标签数量为',  // 当前免费的纸质标签数量为
    //         retroactiveApplication: '通过追溯申请',   // 通过追溯申请
    //         searchTraCode: '输入码段SID',   // 输入码段SID
    //         coveredCodeSegment: '覆盖码段',   // 覆盖码段
    //         rejectApplication: '拒绝申请',   // 拒绝申请
    //         refusalCause: '拒绝原因',   // 拒绝原因
    //         headquarters: '总部',   // 总部
    //         noTypeSelected: '没有选择申请类型',  // 没有选择申请类型
    //         NoMerchantsSelected: '没有选择商家',  // 没有选择商家
    //         numCanOnlyBePositive: '申请数量只能为正数',  // 申请数量只能为正数
    //         numCannotBeEmpty: '追溯申请数量不能为空'  //追溯申请数量不能为空
    //     },

    //     // 追溯记录
    //     traceRecords: {
    //         traceRecordsTitle: '追溯记录',  // 追溯记录
    //         searchTraCode: '搜索追溯码', // 请输入对应批次号的Sid或内外码
    //         traceBatchNum: '追溯批次号', // 追溯批次号
    //         numberOfTrace: '追溯码数量', // 追溯码数量
    //         quantityNum: '追溯码剩余数量', // 追溯码剩余数量
    //         tracePointRecord: '追溯点记录', // 追溯点记录
    //         quterCode: '外码', // 外码
    //         innerCode: '内码', // 内码
    //         informationButton: '查看流通信息', // 查看流通信息
    //         informationTitle: '流通信息', // 流通信息
    //         pdoductName: 'Product name',
    //         currentNode: '流通节点', // 流通节点
    //         business: '经营商户', // 经营商户
    //         address: '详细地址', // 详细地址
    //         contactNum: '联系电话', // 联系电话
    //         principal: '负责人', // 负责人
    //         CirculationTime: '流通时间', // 流通时间
    //         noCirculation: '暂无流通信息', // 暂无流通信息
    //         numbering: '编号', // 编号
    //         newPoint: '新建追溯点',
    //         newPointDialogTiltle: '新建追溯点', // 新建追溯点
    //         agent: '代理商', // 代理商
    //         other: '其他', // 其他
    //         selectAgent: '选择代理商', // 选择代理商
    //         to: '至', // 至
    //         mobilePhone: '手机号码', // 手机号码
    //         personCharge: '负责人', // 负责人
    //         tracePointName: '追溯点名称', // 追溯点名称
    //         startCode: '请输入追溯起始编码', // 请输入追溯起始编码
    //         endCode: '请输入追溯结束编码', // 请输入追溯结束编码
    //         // 已使用小程序赋码工具对该批次号进行追溯录入，无法使用该后台新增追溯点
    //         errorTips_1: '已使用小程序赋码工具对该批次号进行追溯录入，无法使用该后台新增追溯点',
    //         // 该追溯批次号没有录入追溯！
    //         errorTips_2: '该追溯批次号没有录入追溯！',
    //         pleaseSelectAgent: '请选择或填写代理商！',  // 请选择或填写代理商！
    //         retroactiveStartIsEmpty: '追溯起始编码没有填写',  // 追溯起始编码没有填写
    //         retroactiveEndIsEmpty: '追溯结束编码没有填写',  // 追溯结束编码没有填写
    //         //此操作将要去商家的充值中心扣除积分, 是否继续?
    //         confirmTips: "此操作将要去商家的充值中心扣除积分, 是否继续?"
    //     },

    //     // 追溯录入
    //     traceEnter: {
    //         traceCodeBatch: '追溯码批次', // 追溯码批次
    //         numberOfTrace: '追溯码数量',  // 追溯码数量
    //         remainQuantity: '剩余数量',  // 剩余数量
    //         productionBatch: '生产批次',  // 生产批次
    //         goods: '商品'   // 商品
    //     }
    // },
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