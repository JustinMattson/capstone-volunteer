<template>
  <div class="row my-2">
    <div class="col-1">
      <img :src="queue.volunteerPic" class="profile-pic" />
    </div>
    <div class="col-2">{{queue.volunteerName}}</div>
    <div class="col-1">{{queue.volunteerRating}}</div>
    <div class="col-2 offset-3 d-flex justify-content-end">{{queue.jobApproval}}</div>
    <div v-if="isCreator" class="col-3 d-flex justify-content-end">
      <button @click="cancelQueue" class="btn btn-danger smol-button">Cancel</button>
    </div>
    <div v-else class="col-3 d-flex justify-content-end">
      <button
        v-if="isJobCreator && !acceptanceToggle"
        @click="approve"
        class="btn btn-success smol-button mx-1"
      >Approve</button>
      <button
        v-if="isJobCreator && !acceptanceToggle"
        @click="deny"
        class="btn btn-danger smol-button mx-1"
      >Deny</button>
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
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.queue.creatorEmail;
    },
    isJobCreator() {
      return this.$store.state.profile.email == this.queue.jobCreatorEmail;
    },
    acceptanceToggle() {
      return (
        this.queue.jobApproval == "accepted" ||
        this.queue.jobApproval == "rejected"
      );
    }
  },
  methods: {
    cancelQueue() {
      this.$store.dispatch("cancelQueue", this.queue.id);
    },
    approve() {
      this.queue.jobApproval = "accepted";
      this.$store.dispatch("approveDeny", this.queue);
    },
    deny() {
      this.queue.jobApproval = "rejected";
      this.$store.dispatch("approveDeny", this.queue);
    }
  }
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