<template>
  <div>{{ detail.name }}</div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      detail: {
        name: ""
      }
    };
  },
  mounted() {
    this.initDetail();
  },
  methods: {
    initDetail() {
      const { id } = this.$route.query;
      this.$axios.get(`/home/detail/${id}`).then(({ data: res } = response) => {
        this.detail = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>>
