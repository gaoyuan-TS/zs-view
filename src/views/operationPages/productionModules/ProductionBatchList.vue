<template>
<!-- 生产批次 -->
    <div class="productionList">
        <page-content name='生产批次'>
            <div class="content">
                <el-row type="flex" justify="space-between">
                    <el-col :span='4'>
                        <div class="item-input">
                            <el-input v-model="param.input" placeholder="生产批次号" style="flex:1"></el-input>
                        </div>
                    </el-col>
                    <el-col :span='4'>
                        <div class="item-input">
                            <el-select  v-model="param.input1" placeholder="商品名称">
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
                    <el-col :span='4'>
                        <div class="item-input">
                            <el-input v-model="param.input2" placeholder="商家名称" style="flex:1"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="item-input">
                            <el-button class="item-btn" type="primary" style="width: 130px;height: 40px;" @click="productioncreate">新建</el-button>  
                        </div>
                    </el-col>
                </el-row>
                <!-- 列表 -->
            <el-row>
                <el-col :span="24">
               <div class="list">
                   <el-table :data="tableData" style="width:100%" height="800" stripe>
                       <el-table-column prop="productListName" label="生产批次号" width="250px"></el-table-column>
                       <el-table-column prop="productListID" label="商品号" width="150px"></el-table-column>
                       <el-table-column prop="productListSort" label="追溯批次号" width="300px">  </el-table-column>
                       <el-table-column prop="productListDescribe" label="追溯码段(SID范围)">  </el-table-column>
                       <el-table-column prop="productListType" label="生产时间段">  </el-table-column>
                       <el-table-column prop="handle" label="操作" width="200">
                           <el-button type="text" size="small" @click="productionedit">编辑</el-button>
                             </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
            </el-row>
            <!-- 分页 -->
            <el-row>
          <el-col :span="24">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :current-page.sync="pageNum"
                :page-size.sync="pageSize"
                background
                layout="total, sizes, prev, pager, next"
                :total="total"
              ></el-pagination>
            </div>
          </el-col>          
        </el-row>
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
                options:[
                    {
                        value: '选项1',
                        label: '1'
                    },
                      {
                        value: '选项2',
                        label: '2'
                    }
                ],
                param:{
                    input:'',
                    input1:'',
                    input2:''
                },
                pageNum:1,
                pageSize:10,
                tableData:[
                    {
                        productListName:"20200909",
                        productListID:"商品1?",
                        productListSort:"ZS234256620200909",
                        productListDescribe:"2342566202009--2342566202099",
                        productListType:"2019/09/01-2020/09/09"
                    } ,
                    {
                        productListName:"20200909",
                        productListID:"商品1?",
                        productListSort:"ZS234256620200909",
                        productListDescribe:"2342566202009--2342566202099",
                        productListType:"2019/09/01-2020/09/09"
                    } ,
                    {
                        productListName:"20200909",
                        productListID:"商品1?",
                        productListSort:"ZS234256620200909",
                        productListDescribe:"2342566202009--2342566202099",
                        productListType:"2019/09/01-2020/09/09"
                    },
                    {
                        productListName:"20200909",
                        productListID:"商品1?",
                        productListSort:"ZS234256620200909",
                        productListDescribe:"2342566202009--2342566202099",
                        productListType:"2019/09/01-2020/09/09"
                    },
                    {
                        productListName:"20200909",
                        productListID:"商品1?",
                        productListSort:"ZS234256620200909",
                        productListDescribe:"2342566202009--2342566202099",
                        productListType:"2019/09/01-2020/09/09"
                    },
                    {
                        productListName:"20200909",
                        productListID:"商品1?",
                        productListSort:"ZS234256620200909",
                        productListDescribe:"2342566202009--2342566202099",
                        productListType:"暂无"
                    }           
                ],
                total:1,
            }
        },
        methods: {
           productioncreate(){
                this.$router.push({name:'productioncreate',params:{id:10}})
            },
            productionedit(){
                this.$router.push({name:'productionedit',params:{id:10}})
            },
            
   // 选择条数
    handleSizeChange() {

    },
    // 选择页数
    handleCurrentChange() {

    }
        }
    }
</script>

<style lang="less" scoped>
    .productionList {
        .content {
            margin-top: 22px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.2);
            padding: 20px;
            .page {
            margin-top: 20px;
            text-align: right;
            height: .32rem;
             }
        }
    }
</style>