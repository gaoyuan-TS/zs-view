<template>
  <div class="header">
    <page-content name="新建生产场景">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <div class="main">商品名称?</div>
          </el-col>
          <el-col :span="24">
            <div class="commodity">xxxxxx商品</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <div class="item-input">
              <el-input v-model="input1" placeholder="场景名称" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <el-input v-model="input2" placeholder="场景排序" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="item-input">
              <el-input v-model="input3" placeholder="场景描述" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="uploadpic">上传多张照片</div>
          </el-col>
          <el-col :span="12">
            <el-col :span="3">
              <div class="uploadvid">上传视频</div>
            </el-col>
            <el-col :span="3">
              <div class="notes">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
            </el-col>
          </el-col>
        </el-row>
        <!-- 上传图片 -->
        <el-row>
          <el-col :span="12" class="picture">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i
                slot="default"
                class="el-icon-picture-outline"
                style="text-align:center; vertical-align: middle; "
              ></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="50%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-col>
          <!-- 上传视频 -->
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            style="margin-top:30px"
          >
            <i class="el-icon-video-camera" style="text-align:center; vertical-align: middle; "></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-row>
        <el-button type="primary" class="save">保存</el-button>
        <el-button type="danger" class="cancle" @click="handleAddreturn">取消</el-button>
      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../components/content.vue";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },

    handleAddreturn() {
      this.$router.push({ name: "scenarioList", params: { id: 10 } });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  .content {
    margin-top: 15px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    padding: 20px;
    .main {
      margin-left: 32px;
      width: 55px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #808080;
      line-height: 17px;
    }
    .commodity {
      margin-top: 41px;
      margin-left: -765px;
      width: 86px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 20px;
    }
    .item-input {
      margin-top: 56px;
      margin-left: 32px;
    }
    .uploadpic {
      width: 84px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #808080;
      line-height: 20px;
      margin-top: 45px;
      margin-left: 32px;
    }
    .uploadvid {
      width: 56px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #808080;
      line-height: 20px;
      margin-top: 45px;
    }
    .notes {
      width: 236px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #e41000;
      line-height: 17px;
      margin-left: -30px;
      margin-top: 45px;
    }
    .picture {
      margin-top: 30px;
      margin-left: 32px;
    }
    .save {
      width: 130px;
      height: 40px;
      margin-top: 444px;
      margin-left: 380px;
    }
    .cancle {
      width: 130px;
      height: 40px;
      margin-top: 444px;
      margin-left: 60px;
    }
  }
}
</style>