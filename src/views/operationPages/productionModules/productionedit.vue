<template>
<!-- 生产批次编辑模块 -->
    <div class="productioncreate">
           <page-content name='编辑生产批次'>
               <div class="content">
                   <el-row type="flex" justify="space-between">
                     <el-col :span="5">
                         <div class="item-input">
                             <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span></div>
                             <el-input v-model="input" placeholder="生产批次号"></el-input>
                             </div>
                      </el-col>  
                      <el-col :span="5">
                          <div class="item-input">
                 <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span></div>
                    <el-select v-model="input1" placeholder="商品名称">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
                          </div>
                      </el-col>
                      <el-col :span="5">
                          <div class="item-input">
                  <div class="item-title"><span style="color:rgba(241, 0, 0, 1)">*</span></div>
                    <el-select v-model="input2" placeholder="商家名称">
                    <el-option
                      v-for="item in business"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      > </el-option>
                </el-select>
                          </div>
                      </el-col>
                      <!-- 预览按钮 -->
                      <el-col :span="6">
                     <div class="item-input">
                  <el-button class="item-btn" type="primary"  style="width: 130px;
                height: 40px;" >预览</el-button>  
                     </div>
                     </el-col>
                   </el-row>
                   <div class="title">同商品的生产批次号不能重复</div>
                   <!-- 中间线 -->
                   <el-row type="flex" justify="space-between">
                       <el-col :span="24">
                           <div class="central"></div>
                       </el-col>
                   </el-row>

                   <el-row type="flex" justify="space-between" style="margin-top:39px">
                      <el-col :span="5">
            <div class="item-input">
              <!-- <div class="input-title">创建日期：</div> -->
              <el-date-picker
                style="flex: 1"
                v-model="time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>
                       <el-col :span="4" style="margin-left:20px">
                         <div class="item-input">
                             <el-select v-model="input3" placeholder="选择员工">
                    <el-option
                      v-for="item in personnels"
                      :key="item.value"
                      :label="item.label"  
                      :value="item.value">
                      <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
                         </div>
                       </el-col>
                       <el-col :span="6"> </el-col>
                       <el-col :span="6"> </el-col>
                   </el-row>
                   <el-row type="flex" justify="space-between">
                       <el-col :span="5">
                           <div class="item-input">
                               <div class="item-txt" style="width:280px">场景名称: 原材料加工</div>
                           </div>
                       </el-col>
                       <el-col :span="20">
                           <div class="item-input">
                               <div class="item-txt" style="padding-left:100px">场景排序：1</div>
                           </div>
                       </el-col>
        
                   </el-row>

                   <el-row type="flex" justify="space-between" style="margin-top:40px">
                       <el-col :span="10">
                           <div class="item-input">
                               <el-input v-model="input4" placeholder="场景描述" style="flex:1"></el-input>
                           </div>
                       </el-col>
                   </el-row>

                   <el-row>
              <el-col :span="12">
                  <div class="uploadpic">上传多张照片</div>
              </el-col>
              <el-col :span="12">
                  <el-col :span="3">
                  <div class="uploadvid">上传视频</div></el-col>
                  <el-col :span="3">
                     <div class="notes">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
                  </el-col>
              </el-col>
              </el-row> 
                    <!-- 上传图片 -->
               <el-row>
                  <el-col :span="12" class="picture">
                     
                      <el-upload 
                action="#"
                list-type="picture-card"
                :auto-upload="false">
                  <i slot="default" class="el-icon-picture-outline" style="text-align:center; vertical-align: middle; "></i>
                  <div slot="file" slot-scope="{file}">
                             <img
                 class="el-upload-list__item-thumbnail"
                 :src="file.url" alt=""
               >
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
                   @click="handleDownload(file)" >
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
              <img width="50%" :src="dialogImageUrl" alt="">
            </el-dialog>
                  </el-col>
    <!-- 上传视频 -->
                 <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove" style="margin-top:30px">
              <i class="el-icon-video-camera" style="text-align:center; vertical-align: middle; " ></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
   </el-row> 

     <el-row type="flex" justify="space-between" style="margin-top:40px">
         <el-col :span="5">
        <div class="item-input">
          <el-input v-model="input5" placeholder="原材料关联" style="flex:1"></el-input>  
         </div>
         </el-col>
         <el-col :span="5">
        <div class="item-input">
          <el-input v-model="input6" placeholder="数量" style="flex:1"></el-input>  
         </div>
         </el-col>
         <el-col :span="5">
        <div class="item-input">
          <el-input v-model="input7" placeholder="出库单号" style="flex:1"></el-input>  
         </div>
         </el-col>
         <el-col :span="6">
         </el-col>
     </el-row> 

         <el-row type="flex" justify="space-between" style="margin-top:40px">
             <el-col :span="6">
                 <div class="item-txt">原材料名称：枸杞</div>
             </el-col>
             <el-col :span="6">
                 <div class="item-txt">入库时间：2019/09/19</div>
             </el-col>
             <el-col :span="6">
                 <div class="item-txt">库房编号：LIS87666</div>
             </el-col>
             <el-col :span="6">
                 <div class="item-txt">原材料供应商：枸杞批发铺</div>
             </el-col>
         </el-row>

         <el-row type="flex" justify="space-between" style="margin-top:40px">
             <el-col :span="24">
                 <div class="item-txt">货物剩余数量：123kg</div>
             </el-col>
         </el-row>
         <el-button type="primary" class="save">保存</el-button>
    <el-button type="danger" class="cancle" @click="handleAddreturn">取消</el-button>
               </div>
           </page-content>
    </div>
</template>

<script>
import pageContent from '../../../components/content.vue'
    export default {
         components: {
    pageContent
  },
        data() {
            return { 
                time:[],
                options:[
                    {
                        value:1,
                        label:'选项1'
                    },
                     {
                        value:2,
                        label:'选项2'
                    }
                ],
                business:[
                    {
                        value:1,
                        label:'商家名称1'
                    },
                     {
                        value:2,
                        label:'商家名称2'
                    }
                ],
                personnels:[
                   {
                        value:1,
                        label:'员工1'
                    },
                    {
                        value:2,
                        label:'员工2'
                    }
                    ],
                input:'',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                input7:'',
                dialogVisible:false,
                dialogImageUrl:''
            }
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
               handleAddreturn(){
                this.$router.push({name:'productionBatch',params:{id:10}})
            }
                 }
    }
</script>

<style lang="less" scoped>
    .productioncreate {
        .content {
            margin-top: 22px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
            padding: 20px;
            .item-title {
      // padding: 0 15px;
      color: rgba(128, 128, 128, 1);
      font-size: 12px;
      // margin-bottom: 12px;
    }
    .picture {
                margin-top: 30px;
                margin-left: 32px;
            }
            .uploadpic {
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                text-align: left;
                color: #808080;
                line-height: 20px;
                margin-top: 45px;
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
            .save {
                width: 130px;
                height: 40px;
                margin-top: 121px;
                margin-left: 394px;
            }
            .cancle {
                width: 130px;
                height: 40px;
                margin-top: 121px;
                margin-left: 60px;
            }
        }
        .item-txt {
            width: 200px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 20px;
            margin-top: 55px;

        }
        .title {
            width: 156px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #ff0000;
            line-height: 17px;
            margin-left: 5px;
        }
        .central {
            width: 100%;
            height: 1px;
            background: #dddddd;
            margin-top: 42px;
        }
    }
</style>