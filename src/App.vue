<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: none;

  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  margin: 0;
  padding: 0;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
}
::-webkit-scrollbar {
  width: 1px;
}
::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.item-input {
  display: flex;
  align-items: center;
  height: 50px;
}
.item-button {
  justify-content: flex-end;
}
.input-title {
  color: rgba(128, 128, 128, 1);
  font-size: 14px;
  /* width: 100px; */
  margin-right: 6px;
  text-align: right;
}
.circle-red {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #ae1e24;
  margin: 1px;
  margin-right: 6px;
}
.circle-green {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #58eb00;
  margin: 1px;
  margin-right: 6px;
}
.list {
  margin-top: 25px;
  border: 1px solid rgba(204, 204, 204, 1);
}
.el-message__icon {
  font-size: 16px;
}

/* 修改element按钮样式 */
.btn-wrap {
  .el-button {
    width: 120px;
    height: 30px;
    padding: 0!important;
    line-height: normal!important;
    border-radius: 2px!important;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.2); 
    font-size: 13px;
  }
}

/* 修改 element input样式*/
.el-input input{border:none;border-radius: 0;}
.el-input__inner{ 
  border-bottom: 1px solid rgba(204, 204, 204, 1) !important;
  padding: 0;
}
.el-input__inner:focus {
  border-bottom-color: #409EFF !important;
  outline: 0;
}

/* 修改element table样式 */
.el-table thead {
  color: #333!important;
}
.el-table__row {
  color: #808080!important;
}

// 修改日期样式
.el-date-editor.el-input__inner {
  border: none;
  border-radius: 0!important;
  border-bottom: 1px solid #DCDFE6;
}
</style>
