  <template>
  <el-container class="fillcontain">
    <el-aside>
      <el-row>
        <el-col style="width:100%" :span="12">
          <el-menu default-active="/home" @open="open" class="el-menu-vertical-demo" router>
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">文章列表</span>
              </template>
              <el-menu-item-group>
                <el-submenu index="categoryList">
                  <template slot="title">分组查看</template>
                  <el-menu-item
                    v-for="category in categoryList"
                    :key="category"
                    :index="'/articles/'+category"
                  >{{category}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="/articles">全部文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/comments">
              <i class="el-icon-s-comment"></i>
              <span slot="title">评论列表</span>
            </el-menu-item>
            <el-menu-item index="/edit">
              <i class="el-icon-edit"></i>
              <span slot="title">新建文章</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <router-view />
    </el-container>
  </el-container>
</template>

<script>
import { getCategoryList } from "../api/api";
export default {
  data() {
    return {
      popoverVisible: false,
      categoryList: []
    };
  },
  methods: {
    open(key) {
      console.log("213");
      if (key === "categoryList") {
        getCategoryList().then(resp => {
          if (resp.data.success) {
            this.categoryList = resp.data.data;
          } else {
            this.$message({
              type: "fail",
              message: "获取分组列表失败!reason:" + resp.data.errMsg
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scrope>
@import "../assets/style/mixin";
.el-header {
  background-color: #eff2f7;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.el-main {
  color: #333;
  line-height: 40px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 1024px;
}
.popover-width {
  widows: 100px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>