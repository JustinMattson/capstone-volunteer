<template>
  <div class="requesterJobs container">{{requesterJob.title}}</div>
</template>


<script>
export default {
  name: "requesterJob",
  props: ["requesterJob"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
.unbold {
  font-family: "Balsamiq Sans", cursive;
}
.action {
  cursor: pointer;
}
.font-lg {
  font-size: 20pt;
}
</style>