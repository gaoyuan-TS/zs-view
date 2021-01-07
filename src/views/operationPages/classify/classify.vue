<template>
  <div>
    <page-content name="分类模块">
      <div class="classify">
        <div style="display: flex">
          <div class="Onestair" @click="OneVisible = true">
            <div class="iconfont icon-jiajian jia"></div>
            <div class="onetitle">添加一级分类</div>
          </div>
          <div class="Onestair1" @click="handleditor">
            <span v-if="!editor">编辑</span>
            <span v-if="editor">取消编辑</span>
          </div>
        </div>
        
        <div class="content">
          <div class="left">
            <div class="OneList">
              <div class="stairbox" v-for="(item,first) in FirstList" :key="first">
                <div class="top">
                  <span class="OnestairName">
                    {{item.categorySuperName || '无数据'}}
                    <i
                      class="iconfont icon-jian jian"
                      v-if="editor"
                      @click.stop="DelstairOne(item.categorySuperId)"
                    ></i>
                  </span>
                  <span class="PushTwostair" @click="openSecond(item)">
                    <i class="iconfont icon-jiajian jia"></i>(添加二级分类)
                  </span>
                </div>
                <div class="Detailed">
                  <div
                    class="stair"
                    :class="thirdName === Fitem.categorySonName ? 'red': ''"
                    v-for="(Fitem,st) in item.sons"
                    :key="st"
                    @click="getSecond(Fitem.categorySonId,Fitem.categorySonName)"
                  >
                    {{Fitem.categorySonName}}
                    <i
                      class="iconfont icon-jian jian"
                      v-if="editor"
                      @click.stop="DelstairOne(Fitem.categorySonId)"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="Twostair">
              <div class="leftName">
                {{thirdName || '请选择二级分类'}}
                <i class="iconfont icon-you"></i>
                <span>|</span>
              </div>
              <div class="Twolist">
                <div
                  class="stair"
                  :class="ThreeName === Titem.categorySonName ? 'red' : ''"
                  v-for="(Titem,three) in ThreeList.sons"
                  :key="three"
                  @click="GetthreeDetaill(Titem.categorySonId,Titem.categorySonName)"
                >
                  {{Titem.categorySonName}}
                  <i
                    class="iconfont icon-jian jian"
                    v-if="editor"
                    @click.stop="Delstair(Titem.categorySonId)"
                  ></i>
                </div>
                <span class="PushThreestair" @click="openThree()">
                  <i class="iconfont icon-jiajian jian"></i>(添加三级分类)
                </span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="title">三级分类新增/编辑</div>
            <div class="box">
              <div class="left">
                <div class="Name">
                  <div class="stair">分类名称：</div>
                  <el-input v-model="ThreeName" placeholder="请输入内容" :disabled="true"></el-input>
                </div>
                <div class="Name">
                  <div class="stair">选择分类：</div>

                  <el-select
                    v-model="equative"
                    placeholder="请选择"
                    @change="getThisthreeInfo()"
                    v-if="judge"
                  >
                    <el-option
                      v-for="item in kind"
                      :key="item.categorySonId"
                      :label="item.categorySonName"
                      :value="item.categorySonId"
                    ></el-option>
                  </el-select>
                  <!-- 禁用状态 -->
                  <el-select v-if="!judge" v-model="value3" disabled placeholder="该分类已有字段不能替换">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="right-stair">
                <span v-show="!copy" @click="NewVisible = true">新增字段></span>
              </div>
            </div>
            <div class="editor">
              <div class="editor-list">
                <div class="editor-list-item" v-if="includeBrand">
                  <span class="stairName">品牌</span>
                  <span class="stairInfo">读取商家品牌字段</span>
                  <div class="Btnbox">
                    <!-- <span class="editorBtn">修改名称</span> -->
                    <span class="DelBtn" v-if="copy" @click="DelincludeBrand">删除字段</span>
                  </div>
                </div>
                <div class="editor-list-item" v-for="(pro,perty) in property" :key="perty">
                  <div class="stairName">{{pro.propertyName}}</div>
                  <div class="stairInfo" v-if="Number(pro.enterType) ===1">下拉框</div>
                  <div class="stairInfo" v-if="Number(pro.enterType) ===0">输入框</div>
                  <div class="Btnbox">
                    <div
                      class="editorBtn"
                      v-if="!copy"
                      @click="openAlter(pro.propertyId,pro.propertyName)"
                    >修改名称</div>
                    <div class="DelBtn" v-if="copy" @click="DeleteField(perty)">删除字段</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="Btn" @click="handlerRead">确 认</div>
          </div>
        </div>

        <!-- 一级分类弹窗 -->
        <el-dialog title="添加一级分类" :visible.sync="OneVisible" width="30%">
          <div class="addbox">
            <div class="add">分类名称：</div>
            <el-input v-model="first" placeholder="请输入内容"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="OneVisible = false">取 消</el-button>
            <el-button type="primary" @click="Addfirst">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 二级分类弹窗 -->
        <el-dialog title="添加二级分类" :visible.sync="TwoVisible" width="30%">
          <div class="addbox">
            <div class="add">分类名称：</div>
            <el-input v-model="second" placeholder="请输入内容"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="TwoVisible = false">取 消</el-button>
            <el-button type="primary" @click="Addsecond()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 三级分类弹窗 -->
        <el-dialog title="添加三级分类" :visible.sync="ThreeVisible" width="30%">
          <div class="addbox">
            <div class="add">分类名称：</div>
            <el-input v-model="three" placeholder="请输入内容"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ThreeVisible = false">取 消</el-button>
            <el-button type="primary" @click="Addthree()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 修改字段弹窗 -->
        <el-dialog title="修改分类" :visible.sync="alterVisible" width="30%">
          <div class="addbox">
            <div class="add">分类名称：</div>
            <el-input v-model="alterfield" placeholder="请输入内容"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="alterVisible = false">取 消</el-button>
            <el-button type="primary" @click="alter()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 新增字段弹窗 -->
        <el-dialog title="新增字段" :visible.sync="NewVisible" width="30%">
          <div class="addbox">
            <div class="add">字段名称：</div>
            <el-input v-model="fieldname" placeholder="请输入内容"></el-input>
          </div>
          <div class="addbox">
            <div class="add">录入形式：</div>
            <el-select v-model="Newshape" placeholder="请选择" @change="empty()">
              <el-option
                v-for="item in shape"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="addbox" v-if="Newshape ===0">
            <div class="add">字段长度：</div>
            <el-select v-model="Newlength" placeholder="请选择">
              <el-option
                v-for="item in length"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="items" v-if="Newshape ===1">
            <div class="addboxMore" v-if="Number(radio) ===1">
              <div class="tip">品牌字段自动读取商家品牌</div>
            </div>

            <div class="addbox" v-if="Number(radio) === 2" v-for="(item,i) of items" :key="i">
              <div class="add">选项{{i+1}}：</div>
              <el-input v-model="items[i]" placeholder="请输入内容"></el-input>
            </div>
            <div class="Btnbox" v-if="Number(Newshape) ===1">
              <el-button type="success" round @click="handleradd">新增选项</el-button>
              <el-button type="info" round @click="handlerDel">删除选项</el-button>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="emptyProperty()">取 消</el-button>
            <el-button type="primary" @click="Addproperty()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </page-content>
  </div>
</template>
<script>
import pageContent from "../../../components/content.vue";

export default {
  components: {
    pageContent,
  },
  data() {
    return {
      input: "",
      first: "",
      second: "",
      three: "",
      fieldname: "", // 字段名称
      inpu5: "",
      inpu6: "",
      radio: "2",
      brand: false, // 品牌判断
      // 一级分类弹窗
      OneVisible: false,
      // 一级分类列表
      FirstList: [],
      // 二级分类弹窗
      TwoVisible: false,
      secondRow: {},
      // 保存二级分类的名称和ID
      thirdName: "",
      thirdId: "",
      // 三级分类弹窗
      ThreeList: {},
      ThreeVisible: false,
      ThreeName: "", // 三级分类名称
      ThreeId: "",
      ThreeInfo: {}, // 存储三级分类信息
      // 新增字段弹窗
      NewVisible: false,
      // 修改字段名称弹窗
      alterVisible: false,
      alterfield: "",
      alterId: "",
      // 录入形式
      shape: [
        {
          value: 0,
          label: "输入框",
        },
        {
          value: 1,
          label: "下拉框",
        },
      ],
      Newshape: 0,
      // 字段长度
      length: [
        {
          value: 10,
          label: "字段长度10字符",
        },
        {
          value: 20,
          label: "字段长度20字符",
        },
        {
          value: 30,
          label: "字段长度30字符",
        },
        {
          value: 100,
          label: "字段长度100字符",
        },
      ],
      Newlength: 10,
      // 选择同级三级分类
      kind: [],
      property: [], // 分类已存在的字段
      equative: "", // 同级分类id
      includeBrand: false,
      judge: false, // 判断是否已有字段
      copy: false, // 判断是否为复制同级字段
      // 下拉框选项数组
      items: ["", ""],
      options: [],
      value3: "",
      // 点击编辑
      editor: false,
    };
  },
  watch: {
    fieldname(val) {
      // console.log(val)
      if (val === "品牌") {
        // console.log(1)
        this.brand = true;
        this.Newshape = 1;
        this.radio = "1";
      } else {
        this.radio = "2";
        this.brand = false;
      }
    },
  },
  async created() {
    this.getFirst();
  },
  methods: {
    // 获取一级分类
    getFirst() {
      this.$get("/back-end/category/getFirst").then((res) => {
        // console.log(res)
        if (Number(res.code) === 200) {
          this.FirstList = res.data || [];
          console.log(this.FirstList);
        }
      });
    },
    // 添加一级分类
    Addfirst() {
      if (!this.first) {
        this.$message.error("分类名称不能为空");
      } else {
        if (this.first.length > 52) {
          this.$message.error("分类名称不能超过52个字");
        } else {
          this.OneVisible = false;
          let params = {
            categoryName: this.first,
            categorySuperId: null,
          };
          // console.log(this.first)
          this.$post("/back-end/category/insertCategory", params).then(
            (res) => {
              // console.log(res)
              if (Number(res.code) === 200) {
                this.$message({
                  message: res.desc,
                  type: "success",
                });
                this.first = "";
                this.getFirst();
              } else {
                this.$message.error(res.desc);
              }
            }
          );
        }
      }
    },
    // 点击打开二级添加弹窗
    openSecond(row) {
      this.TwoVisible = true;
      this.secondRow = row;
      // console.log(row)
    },
    // 添加二级分类
    Addsecond() {
      if (!this.second) {
        this.$message.error("分类名称不能为空");
      } else {
        if (this.second.length > 52) {
          this.$message.error("分类名称不能超过52个字");
        } else {
          this.TwoVisible = false;
          let params = {
            categoryName: this.second,
            categorySuperId: this.secondRow.categorySuperId,
          };
          this.$post("/back-end/category/insertCategory", params).then(
            (res) => {
              if (Number(res.code) === 200) {
                // console.log(1)
                this.$message({
                  message: res.desc,
                  type: "success",
                });
                this.second = "";
                this.getFirst();
              } else {
                this.$message.error(res.desc);
              }
            }
          );
        }
      }
    },
    // 点击打开二级添加弹窗
    threeSecond(row) {
      this.TwoVisible = true;
      this.secondRow = row;
      // console.log(row)
    },
    // 点击获取三级分类列表
    getSecond(id, name) {
      // 清空数据
      this.equative = "";
      this.property = [];
      this.kind = [];
      this.ThreeId = "";
      this.ThreeName = "";
      this.$get("/back-end/category/getThirdList?categorySecondId=" + id).then(
        (res) => {
          console.log(res);
          // 保存二级分类的名称和ID
          this.thirdName = name;
          this.thirdId = id;
          if (Number(res.code) === 200) {
            this.ThreeList = res.data || {};
            this.ThreeInfo = res.data || {};
            // console.log(this.ThreeInfo)
            // console.log(this.ThreeList)
          } else {
            this.$message.error(res.desc);
          }
        }
      );
    },
    // 点击打开三级添加弹窗
    openThree() {
      this.ThreeVisible = true;
    },
    // 添加三级分类
    Addthree() {
      if (!this.three) {
        this.$message.error("分类名称不能为空");
      } else {
        if (this.three.length > 52) {
          this.$message.error("分类名称不能超过52个字");
        } else {
          this.ThreeVisible = false;
          let params = {
            categoryName: this.three,
            categorySuperId: this.ThreeInfo.categorySuperId,
          };
          this.$post("/back-end/category/insertCategory", params).then(
            (res) => {
              if (Number(res.code) === 200) {
                // console.log(1)
                this.$message({
                  message: res.desc,
                  type: "success",
                });
                this.second = "";
                this.getSecond(this.thirdId, this.thirdName);
              } else {
                this.$message.error(res.desc);
              }
            }
          );
        }
      }
    },
    // 点击获取三级分类详情
    GetthreeDetaill(id, name) {
      // 清空数据
      this.copy = false;
      this.equative = "";
      this.property = [];
      this.kind = [];

      this.ThreeId = id;
      this.ThreeName = name;
      this.$get(
        "/back-end/category/getThirdCategoryDetail?categoryThirdId=" + id
      ).then((res) => {
        console.log(res);
        if (Number(res.code) === 200) {
          this.kind = res.data.kind;
          this.property = res.data.property;
          if (this.property.length > 0) {
            this.judge = false;
          } else {
            this.judge = true;
          }
          this.includeBrand = res.data.includeBrand;
        }
      });
    },
    // 点击新增字段、
    Addproperty() {
      if (this.fieldname.length > 52) {
        this.$message.error("字段名称不能超过52个字符");
      } else {
        let params = {
          categoryId: Number(this.ThreeId),
          propertyName: this.fieldname,
          enterType: Number(this.Newshape),
          fieldLength: Number(this.Newlength),
          comboBoxValueList: this.items,
        };
        this.$post("/back-end/category/insertCategoryProperty", params).then(
          (res) => {
            if (Number(res.code) === 200) {
              this.$message({
                message: res.desc,
                type: "success",
              });
              this.NewVisible = false;
              this.GetthreeDetaill(this.ThreeId, this.ThreeName);
              this.emptyProperty();
            } else {
              this.$message.error(res.desc);
            }
          }
        );
      }
    },
    // 判断是否为输入框
    empty() {
      if (this.Newshape === 0) {
        this.radio = "1";
        this.Newshape = 0;
      } else {
        this.radio = "2";
      }
    },
    // 清空新增字段的输入框
    emptyProperty() {
      this.NewVisible = false;
      this.fieldname = "";
      this.items = ["", ""];
    },
    // 获取选中同级分类的详情
    getThisthreeInfo() {
      this.copy = true;
      // console.log(this.equative)
      this.$get(
        "/back-end/category/getThirdCategoryDetail?categoryThirdId=" +
          this.equative
      ).then((res) => {
        if (Number(res.code) === 200) {
          this.$message({
            message: "获取成功",
            type: "success",
          });
          this.kind = res.data.kind;
          this.property = res.data.property;
          this.includeBrand = res.data.includeBrand;
        }
      });
    },
    // 删除拷贝的数组
    DeleteField(id) {
      for (var i = 0; this.property.length > i; i++) {
        if (i === id) {
          this.property.splice(i, 1);
        }
      }
    },
    // 修改名称
    openAlter(id, name) {
      this.alterVisible = true;
      this.alterfield = name;
      this.alterId = id;
    },
    alter() {
      if (!this.alterfield) {
        this.$message.error("分类名称不能为空");
      } else {
        if (this.alterfield.length > 52) {
          this.$message.error("字段名称不能超过52个字符");
        } else {
          let params = {
            propertyName: this.alterfield,
            propertyId: Number(this.alterId),
            categoryId: Number(this.ThreeId),
          };
          this.$post("/back-end/category/updateCategoryProperty", params).then(
            (res) => {
              if (Number(res.code) === 200) {
                this.$message({
                  message: res.desc,
                  type: "success",
                });
                this.GetthreeDetaill(this.ThreeId, this.ThreeName);
                this.alterVisible = false;
              } else {
                this.$message.error(res.desc);
              }
            }
          );
        }
      }
    },
    handleradd() {
      this.items.push("");
      console.log(this.items);
    },
    handlerDel() {
      if (this.items.length > 2) {
        this.items.pop();
      } else {
        this.$message.error("下拉框最少要有两个选择");
      }
    },
    DelincludeBrand() {
      this.includeBrand = false;
    },
    // 确认拉取同类样式
    handlerRead() {
      console.log(this.includeBrand);
      let params = {
        categoryId: Number(this.ThreeId),
        targetCategoryId: Number(this.equative),
        property: this.property,
        includeBrand: this.includeBrand,
      };
      this.$post("/back-end/category/categoryCopyProperty", params).then(
        (res) => {
          if (Number(res.code) === 200) {
            this.$message({
              message: res.desc,
              type: "success",
            });
            this.GetthreeDetaill(this.ThreeId, this.ThreeName);
          } else {
            this.$message.error(res.desc);
          }
        }
      );
    },
    // 点击编辑
    handleditor() {
      this.editor = !this.editor;
    },
    // 删除一二级分类
    DelstairOne(id) {
      // console.log(id)
      this.$get("/back-end/category/deleteCategory?categoryId=" + id).then(
        (res) => {
          if (Number(res.code) === 200) {
            this.$message({
              message: res.desc,
              type: "success",
            });
            this.getFirst();
          } else {
            this.$message.error(res.desc);
          }
        }
      );
    },
    // 删除三级分类
    Delstair(id) {
      // console.log(id)
      this.$get("/back-end/category/deleteCategory?categoryId=" + id).then(
        (res) => {
          if (Number(res.code) === 200) {
            this.$message({
              message: res.desc,
              type: "success",
            });
            this.getSecond(this.thirdId, this.thirdName);
          } else {
            this.$message.error(res.desc);
          }
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
@zs_color: #ae1e24; //主题颜色
.jian {
  margin-left: 10px;
  cursor: pointer;
}
.title {
  margin-top: 12px;
}
.activeRow {
  background: #ae1e24;
}
.title-name {
  font-size: 28px;
  font-family: MicrosoftYaHeiLight;
  font-weight: 300;
  color: @zs_color;
  text-align: left;
}
.Onestair {
  cursor: pointer;
  margin-top: 10px;
  border-radius: 10px;
  width: 160px;
  height: 46px;
  background: rgba(174, 30, 36, 1);
  text-align: center;
  color: #fff;
  line-height: 46px;
  display: flex;
  justify-content: center;
  .jia {
    font-size: 18px;
    margin-right: 5px;
  }
  div {
    line-height: 46px;
    font-size: 16px;
  }
}
.Onestair1 {
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 50px;
  width: 100px;
  height: 46px;
  background: rgba(174, 30, 36, 1);
  text-align: center;
  color: #fff;
  line-height: 46px;
  font-size: 16px;
  .jia {
    font-size: 20px;
    margin-right: 5px;
  }
}

.classify {
  margin-top: 22px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.content {
  min-height: 500px;
  padding-bottom: 30px;
  // background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-around;
  .left {
    display: flex;
    flex: 7;
    .OneList {
      border-radius: 10px 0 0 10px;
      margin-top: 30px;
      width: 370px;
      min-width: 370px;
      height: 764px;
      overflow-y: auto;
      // background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(179, 179, 179, 1);
      .stairbox {
        margin-top: 10px;
        .top {
          display: flex;
          padding: 15px 10px;
          justify-content: space-between;
          .jia {
            // background-color: @zs_color;
            // color: #fff;
            font-size: 20px;
            margin-right: 5px;
          }
          .OnestairName {
            font-size: 18px;
            font-weight: bold;
            color: rgba(174, 30, 36, 1);
          }
          .PushTwostair {
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            color: rgba(174, 30, 36, 1);
          }
        }
        .Detailed {
          display: flex;
          flex-wrap: wrap;
          .stair {
            cursor: pointer;
            position: relative;
            // padding: 10px 0px;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .red {
            background: #efd2d3;
            color: #ae1e24;
          }
          // .stair:active {
          //   background: #AE1E24;
          // }
          .stair:after {
            position: absolute;
            right: 0;
            content: "|";
          }
          .stair:nth-child(3n):after {
            content: "";
          }
        }
      }
    }
    // 滚动条样式
    .OneList::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .OneList::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 6px;
      background-color: @zs_color;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }
    // .OneList::-webkit-scrollbar-track {
    //   /*滚动条里面轨道*/
    //   box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    //   background: #ededed;
    //   border-radius: 10px;
    // }

    .Twostair {
      border-radius: 0 10px 10px 0;
      margin-top: 30px;
      height: 764px;
      width: 100%;
      display: flex;
      border-right: 1px solid rgba(179, 179, 179, 1);
      border-bottom: 1px solid rgba(179, 179, 179, 1);
      border-top: 1px solid rgba(179, 179, 179, 1);
      font-size: 16px;
      .leftName {
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 40px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        span {
          position: absolute;
          right: 0;
          // margin-left: 10px;
          font-weight: 300;
        }
      }
      .Twolist {
        display: flex;
        height: 150px;
        padding-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
        // width: 500px;
        align-items: flex-start;
        flex-wrap: wrap;
        .stair {
          padding: 10px 10px;
          height: 20px;
          cursor: pointer;
          color: #808080;
        }
        .red {
          color: #ae1e24;
        }
        .PushThreestair {
          cursor: pointer;
          padding: 11px 10px;
          // margin-left: 20px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(174, 30, 36, 1);
          .jian {
            margin-right: 5px;
            font-size: 20px;
          }
        }
      }
    }
  }
  .right {
    border-radius: 10px;
    flex: 3;
    box-sizing: border-box;
    padding: 20px;
    margin-left: 45px;
    // width:600px;
    height: 796px;
    background: rgba(174, 30, 36, 1);
    .title {
      font-size: 18px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .box {
      display: flex;
      height: 100px;
      padding-left: 30px;
      .left {
        flex: 8;
        display: flex;
        flex-direction: column;
        .Name {
          display: flex;
          height: 50px;
          line-height: 50px;
          .el-select {
            width: 100%;
          }
          .stair {
            width: 100px;
            min-width: 90px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .right-stair {
        box-sizing: border-box;
        padding-top: 15px;
        text-align: center;
        flex: 4;
        height: 100%;
        font-size: 14px;
        // font-weight: bold;
        text-decoration: underline;
        color: rgba(255, 255, 255, 1);
        span {
          cursor: pointer;
        }
      }
    }
    .editor {
      margin-top: 20px;
      overflow-y: scroll;
      width: 100%;
      height: 517px;
      background: rgba(255, 255, 255, 1);
      // font-size: 14px;
      .editor-list {
        box-sizing: border-box;

        width: 100%;
        padding: 10px;
        .editor-list-item {
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          padding: 15px;
          width: 100%;
          .stairName {
            display: block;
            max-width: 114px;
            min-width: 114px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            // text-align: right;
          }
          .stairInfo {
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .Btnbox {
            .editorBtn {
              font-size: 14px;
              font-weight: 400;
              text-decoration: underline;
              color: rgba(0, 134, 248, 1);
              cursor: pointer;
            }
            .DelBtn {
              cursor: pointer;
              font-size: 14px;
              font-weight: 400;
              text-decoration: underline;
              color: @zs_color;
            }
          }
        }
      }
    }
    .editor::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .editor::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: @zs_color;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }
    .editor::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ededed;
      border-radius: 10px;
    }
    .Btn {
      margin: 15px auto;
      width: 120px;
      height: 45px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      font-size: 20px;
      text-align: center;
      line-height: 45px;
    }
  }
}
.box {
  margin-top: 30px;
  .el-row {
    margin: 15px 0;
  }
}
.xing {
  color: red;
}
.footer {
  margin-top: 50px;
}
.red {
  color: @zs_color;
}
</style>
<style lang="less" >
@zs_color: #ae1e24; //主题颜色

.classify {
  // min-width: 1250px;
  // overflow: hidden;
  .el-button--primary {
    color: #fff;
    background-color: @zs_color;
    border-color: @zs_color;
  }
  .active {
    background: #eaa6a9;
    border-radius: 5px;
    padding: 2px 0;
  }
  .bg-purple {
    height: 44px;
    line-height: 44px;
    text-align: center;
    .el-button--danger {
      background-color: @zs_color;
    }
    .el-button--danger:hover {
      background-color: #ce1920;
    }
  }
  .el-dialog {
    width: 400px;
    .el-dialog__title {
      font-size: 18px;
      font-weight: 400;
      color: rgba(174, 30, 36, 1);
    }
    .addbox {
      display: flex;
      height: 40px;
      padding: 10px 10px;
      .add {
        min-width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .el-select {
        width: 60%;
        .el-input {
          width: 100%;
        }
      }
      .el-input {
        width: 60%;
      }
    }
  }
  .items {
    .addboxMore {
      display: flex;
      height: 16px;
      padding: 15px 10px;
      justify-content: center;
      .tip {
        font-size: 18px;
        color: @zs_color;
      }
    }
    .Btnbox {
      margin-top: 15px;
      text-align: center;
      .addBtn {
        // margin-top: -30px;
        padding-right: 30px;
        text-align: right;
        font-size: 14px;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
      }
    }
    .addbox {
      display: flex;
      height: 40px;
      padding: 10px 10px;
      .add {
        min-width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .el-select {
        width: 60%;
        .el-input {
          width: 100%;
        }
      }
      .el-input {
        width: 60%;
      }
    }
  }
  .el-dialog__wrapper {
    .el-dialog {
    }
  }
}
</style>
