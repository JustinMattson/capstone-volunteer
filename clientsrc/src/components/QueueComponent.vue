<template>
  <div class="row">
    <div class="col-3">
      <img :src="queue.volunteerPic" class="profile-pic" />
    </div>
    <div class="col-3">{{queue.volunteerName}}</div>
    <div class="col-3">{{queue.volunteerRating}}</div>
    <div class="col-3">{{queue.jobApproval}}</div>
  </div>
</template>

<script>
export default {
  name: "Queue",
  props: ["queue"],
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style scoped>
.profile-pic {
  height: 75px;
  width: 75px;
}
</style>