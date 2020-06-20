<template>
  <div class="row my-2">
    <div class="col-1">
      <img :src="queue.volunteerPic" class="profile-pic" />
    </div>
    <div class="col-2">{{queue.volunteerName}}</div>
    <div class="col-1">{{queue.volunteerRating}}</div>
    <div class="col-2 offset-3 d-flex justify-content-end">{{queue.jobApproval}}</div>
    <div class="col-3 d-flex justify-content-end">
      <button class="btn btn-success smol-button">Approve</button>
      <button class="btn btn-danger smol-button">Deny</button>
    </div>
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
  border-radius: 15px;
  box-shadow: 4px 4px 5px black;
}
.smol-button {
  height: 60%;
}
</style>