<template>
  <div class="newScenarios">
    <page-content name="编辑生产场景">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <div class="main">商品名称?</div>
            <div class="commodity">{{goodsName}}</div>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="name" placeholder="场景名称" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="item-input">
              <span style="color: red; font-size: 16px; margin-right: 6px">*</span>
              <el-input v-model="sceneSort" placeholder="场景排序" style="flex: 1"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item-input">
              <el-input v-model="description" placeholder="场景描述" style="flex: 1"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px">
          <el-col :span="12">
            <div class="uploadpic">上传多张照片</div>
            <div>
              <el-upload
                style="margin-top:10px"
                action="https://zs.cntracechain.com/imageService/image/addBatch"
                :data="upData"
                list-type="picture-card"
                multiple
                :file-list="images"
                name="files"
                :on-success="upimg"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeImgUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="uploadpic"><span>上传视频</span><span class="notes">支持扩展名：.mp4</span></div>
            <div>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://zs.cntracechain.com/imageService/image/add"
                :on-success="handlesuccess"
                :on-remove="handleremovevideo"
                :file-list="fileList"
                :limit="1"
                :auto-upload="true"
                :data="upData"
                :before-upload="beforeAvatarUpload"
              >
                <el-button slot="trigger" size="small" type="primary">{{$t('Goods.newGoodVideoButton')}}</el-button>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 4.4rem" type="flex" justify='center'>
          <el-col :span="6">
            <el-button type="primary" class="save" @click="newScene">保存</el-button>
            <el-button type="danger" class="cancle" @click="handleAddreturn">取消</el-button>
          </el-col>
          
        </el-row>
        
      </div>
    </page-content>
  </div>
</template>

<script>
import pageContent from "../../../../components/content.vue";
export default {
  components: {
    pageContent
  },
  data() {
    return {
      goodsId: '',
      goodsName: '',
      sceneId: '',
      name: "", // 场景名称
      sceneSort: "", // 场景排序
      description: "", // 场景描述
      images: [], // 图片
      fileList: [],
      delImageIds: [],
      shortVideoUrl: '', // 视频
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      upData: {
        imgSystemId: 'newGood',
        imgSpecificUniqueValue: 'newGoodId'
      }, // 上传图片时要带的参数
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    this.goodsName = this.$route.query.goodsName
    this.sceneId = this.$route.query.sceneId
    this.getScenariosDetail()
  },
  methods: {
    //  根据id查询场景详细
    getScenariosDetail(id) {
      this.$get('/trace-api/p_scene/detailById/' + this.sceneId).then(res => {
        console.log(res)
        this.name = res.data.name
        this.description = res.data.description
        this.sceneSort = res.data.sceneSort
        this.shortVideoUrl = res.data.videoUrl

        if (res.data.sceneImages) {
          res.data.sceneImages.forEach(item => {
            this.images.push({
              name: item.sceneImageId,
              url: item.imageUrl
            })
          })
          
        }
        if (res.data.videoUrl) {
          this.fileList.push({
            name: res.data.videoUrl
          })
        } else {
          this.fileList = []
        }
      })
    },
    // 上传图片
    upimg(response, file, fileList) {
      let _image = {
        url: response.data[0].imgUrl
      }
      this.images.push(_image)
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].imageIndex = i
      }
    },
    // 删除图片
    handleRemove(file) {
      console.log(file)
      this.delImageIds.push(file.name)
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].url === file.url) {
          this.images.splice(i, 1)
        }
      }
    },
    // 上传图片前的钩子
    beforeImgUpload() {
      
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传视频
    handlesuccess(file) {
      if (Number(file.code) === 200) {
        this.shortVideoUrl = file.data.imgUrl
        this.$message({
          message: file.message,
          type: 'success'
        })
      } else {
        this.$message.error(file.data.desc)
      }
    },
    // 删除视频
    handleremovevideo() {
      this.shortVideoUrl = ''
    },
    // 限制只能上传视频
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'ogg'
      const extension2 = testmsg === 'mp4'
      const extension3 = testmsg === 'webm'
      const isLt2M = file.size / 1024 / 1024 < 50

      if (!extension && !extension2 && !extension3) {
        this.$message.error(this.$t('uploadimg.format1'))
        return false
      }
      if (!isLt2M) {
        this.$message.error(this.$t('uploadimg.videoTenM'))
        return false
      }
      return true
    },
    handleAddreturn() {
      this.$router.go(-1)
    },
    // 新建场景
    newScene() {
      let _params = {
        sceneId: this.sceneId,
        name: this.name,
        description: this.description,
        sceneSort: Number(this.sceneSort),
        videoUrl: this.shortVideoUrl,
        delImageIds: this.delImageIds
      }

      if (this.images) {
        let _imgs = []
        this.images.forEach(item => {
          _imgs.push(item.url)
        })

        _params.imageUrls = _imgs
      }

      if (!_params.name) {
        this.$message.error('请输入场景名称')
      }
      if (!_params.description) {
        this.Vue.config.optionMergeStrategies.error('请输入场景排序（为数字）')
      }
      this.$post('/trace-api/p_scene/modify', _params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$router.go(-1)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
};
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

.newScenarios {
  .content {
    margin-top: 15px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
    padding: 20px;
    // min-height: 500px;
    .main {
      width: 55px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #808080;
    }
    .commodity {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #333333;
      margin-bottom: 10px;
    }
    .uploadpic {
      font-size: 14px;
      font-weight: 400;
      color: #808080;
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
      margin-left: 8px;
      font-size: 12px;
      font-weight: 400;
      color: #e41000;
    }
    .picture {
      margin-top: 30px;
      margin-left: 32px;
    }
  }
}
</style>