<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="8" v-for="o in lists" :key="o._id" style="margin: 20px 0">
        <el-card :body-style="{ padding: '0px' }" style="border:1px solid #ddd;">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>{{ o.name }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ o._id }}</time>
              <el-button type="text" class="button" @click="deletePic(o._id)">删除</el-button>
            </div>
          </div>
          <div>
            <el-button @click="toDetail(o._id)">详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
      currentDate: new Date()
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.$axios.get("/home/list").then(({ data: res } = response) => {
        this.lists = res.data;
      });
    },
    deletePic(id) {
      this.$axios
        .delete(`/home/delete/${id}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      // .then(({ data: res } = response) => {
      //   console.log(res)
      // })
    },
    toDetail(id) {
      this.$router.push({ name: "detail", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 300px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
