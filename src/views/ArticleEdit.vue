<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="pageInfo"></Header>
    <el-main style="height:90%;overflow:visible;">
      <el-dialog :before-close="closeForm" title="文章基础信息" :visible.sync="dialogVisible">
        <el-form :model="article" ref="articleForm" :rules="rules">
          <el-form-item label="分类" prop="category" label-width="120px">
            <el-select
              v-model="article.category"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签(可自建)"
            >
              <el-option v-for="category in categoryList" :key="category" :value="category"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title" label-width="120px">
            <el-input maxlength="24" show-word-limit v-model="article.title" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="描述" label-width="120px">
            <el-input
              type="textarea"
              maxlength="64"
              show-word-limit
              v-model="article.description"
              placeholder="选填"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="checkForm('articleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <div id="editor">
        <mavon-editor @save="save" v-model="content" style="height: 100%"></mavon-editor>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { createNewArticle, getCategoryList, editCurrArticle } from "../api/api";
export default {
  data() {
    return {
      pageInfo: {
        name: "博客编辑",
        parent: "/home"
      },
      dialogVisible: true,
      categoryList: [],
      createOrEdit: 0,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }]
      },
      article: {
        title: "",
        category: "",
        description: ""
      },
      //content of the article, As a spearate attribute for watch
      content: ""
    };
  },
  watch: {
    //For cache function
    content() {
      console.log(this.content);
    }
  },
  created() {
    if (this.$route.params.article != null) {
      this.article = this.$route.params.article;
      this.content = this.article.content;
      this.createOrEdit = 1;
    }
    getCategoryList().then(resp => {
      if (resp.data.success) {
        this.categoryList = resp.data.data;
      } else {
        this.$message({
          type: "fail",
          message: "保存失败!reason:" + resp.data.errMsg
        });
      }
    });
  },
  methods: {
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    closeForm(done) {
      if (this.article.title !== "" && this.article.category !== "") {
        this.$confirm("你所有输入的信息都不会被保存，确认关闭？")
          .then(() => {
            done();
            this.$router.push(this.pageInfo.parent);
          })
          .catch(() => {});
      } else {
        done();
        this.$router.push(this.pageInfo.parent);
      }
    },
    save() {
      var params = {
        category: this.article.category,
        title: this.article.title,
        content: this.content,
        description: this.article.description
      };
      if (this.createOrEdit == 0) {
        createNewArticle(params).then(resp => {
          if (resp.data.success) {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.$router.push("/articles");
          } else {
            this.$message({
              type: "fail",
              message: "保存失败!reason:" + resp.data.errMsg
            });
          }
        });
      } else {
        editCurrArticle(this.article.bid, params).then(resp => {
          if (resp.data.success) {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.$router.push("/articles");
          } else {
            this.$message({
              type: "fail",
              message: "保存失败!reason:" + resp.data.errMsg
            });
          }
        });
      }
      this.dialogVisible = true;
      console.log("save");
    }
  },
  components: {
    mavonEditor
  }
};
</script>

<style>
#editor {
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>