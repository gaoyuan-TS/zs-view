<template>
<!-- 首页头部部分 -->
  <div class="headers">
    <!-- logo图 -->
    <div class="headers-logo">
      <img src="../../assets/images/home/logo.png" alt="">
    </div>
    <div class="headers-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../../assets/images/home/admin.png" alt="" style="margin-right: 8px">
          {{updata.accountName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">{{$t('header.changPass')}}</el-dropdown-item>
          <el-dropdown-item command="b">{{$t('header.siginOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog :visible.sync="passDialogVisible">
      <div slot="title" style="font-size: 16px">
        {{$t('header.changPass')}}
      </div>

      <div>
        <div class="item" style="display: flex">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
          <div style="flex: 0.8">
            <el-input type="password" :placeholder="$t('header.password')" v-model="updata.password"></el-input>
          </div>
        </div>

        <div class="item" style="margin-top: 40px;display: flex">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
          <div style="flex: 0.8">
            <el-input type="password" :placeholder="$t('header.newPassword')" v-model="updata.newPassword"></el-input>
          </div>
        </div>

        <div class="item" style="margin-top: 40px;display: flex">
            <!-- <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span>加盟商名称：</div> -->
          <div style="flex: 0.8">
            <el-input type="password" :placeholder="$t('header.againPass')" v-model="password"></el-input>
          </div>
        </div>
      </div>

      <div slot="footer" class="accountList-footer">
        <div>
          <el-button type="primary" @click="updataPassword">{{this.$t('button.determine')}}</el-button>
          <el-button type="danger" style="margin-left: 56px" @click="passDialogVisible = false">{{this.$t('button.cancel')}}</el-button>
        </div>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'headers',
  data() {
    return{
      updata: {
        accountName: '',
        password: '',
        newPassword: ''
      },
      password: '',
      passDialogVisible: false
    }
  },
  created() {
    let roleJson = this.$localStore.get('roleJson')
    if (roleJson) {
      this.updata.accountName = roleJson.accountName
    }
  },
  methods: {
    handleCommand (val) {
      if (val === 'b') {
        this.$get('/accountCenter/account/logout')
          .then(data => {
            // console.log(Number(data.data.statusCode) === 200)
            // if (Number(data.data.statusCode) === 200) {
              this.$localStore.remove('roleJson')
              this.$router.replace('/login')
            // }
          })
      } else {
        this.passDialogVisible = true
      }
    },
    updataPassword() {
      if(!this.updata.password) {
        this.$message.error('原密码不能为空')
        return false
      }

      if (!this.updata.newPassword) {
        this.$message.error('新密码不能为空')
        return false
      }

      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.updata.newPassword)) {
        this.$message.error('输入的新密码必须由 6-16位字母和数字组成')
        return false
      }

      if (this.password != this.updata.newPassword) {
        this.$message.error('再次输入的密码与输入的新密码不一致')
        return false
      }

      this.$post('/accountCenter/account/updateAccountPassword', this.updata).then(res => {
        if (res.statusCode === 200) {
          this.$message.success('修改密码成功')
          this.$router.replace('/login')
        } else {
          this.$message.error('修改失败')
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
  .headers {
    background:rgba(239,66,53,1);
    box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.43);
    height: 70px;
    display: flex;
    justify-content: space-between;
    // align-items: center; 
    .headers-logo {
      margin-left: 32px;
      display: flex;
      align-items: center; 
      height: 70px;
    }

    .headers-right {
      height: 70px;
      line-height: 70px;
      margin: 0 55px 13px 0;
      cursor: pointer;
      .el-dropdown {
        display: block;
      }
      .el-dropdown-link {
        color: #ffffff;
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }    
  }
</style>