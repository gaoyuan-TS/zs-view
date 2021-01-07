import navList from './menuList'

export default {
    menuList: (rolesJson) => {
        if (rolesJson.role) {
            if (rolesJson.role.roleName === 'ROLE_BUSINESS') {
                if (Number(rolesJson.merchant.merchantType) !== 3) {
                    return navList.merchantMenu
                } else {
                    return navList.agMerchantMenu
                }
            } else if (rolesJson.role.roleName === 'ROLE_BUSINESS_STAFF') {
                if (Number(rolesJson.merchant.merchantType) !== 3) {
                    return navList.merchantStaffMenu
                } else {
                    return navList.agMerchantStaffMenu
                }
            } else {
                switch (rolesJson.role.roleName) {
                    case 'ROLE_HEADQUARTERS_ADMIN':
                      // 总部管理员
                      return navList.manageMenu
                    case 'ROLE_FRANCHISEE_ADMIN':
                      return navList.addmanageUser
                    case 'ROLE_HEADQUARTERS_OPERATE':
                      // 总部运营
                      return navList.HeadquartersOperations
                    case 'ROLE_FRANCHISEE_OPERATE':
                      return navList.addOperations
                    case 'ROLE_HEADQUARTERS_FINANCE' :
                      return navList.money
                    case 'ROLE_FRANCHISEE_FINANCE':
                      return navList.addmoney
                      // 标码中心
                    case 'ROLE_HEADQUARTERS_CODE':
                      return navList.centerCode
                    default:
                      break
                }
            }
        }
    },

    returnHomePage: (rolesJson) => {
        switch (rolesJson.role.roleName) {
            case 'ROLE_HEADQUARTERS_ADMIN':
              return '/manage/manageHome'
              break
            case 'ROLE_FRANCHISEE_ADMIN':
              return '/manage/manageHome'
              break
              //总部运营
            case 'ROLE_HEADQUARTERS_OPERATE' :
              return '/manage/headquartersHome'
              break
            case 'ROLE_FRANCHISEE_OPERATE':
              return '/manage/headquartersHome'
              break
            case 'ROLE_HEADQUARTERS_FINANCE':
              return '/manage/HeadquartersFinance'
              break
            case 'ROLE_FRANCHISEE_FINANCE':
              return '/manage/MerchantRechargeRecord'
              break
            case 'ROLE_BUSINESS':
              // 商家管理员权限
              return '/merchant/merchantHome'
              break
            case 'ROLE_BUSINESS_STAFF':
              return '/merchant/merchantHome'
              break
            case 'ROLE_HEADQUARTERS_CODE':
              return '/codeCenter/labelReserveList'
              break
            default:
              break
        }
    } 
}