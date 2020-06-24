<template>
  <div class="volunteerId">
    <div class="col-12 d-flex justify-content-between">
      <span>
        <img :src="volunteerId.picture" style="height:25px;width:25px;" />
        {{volunteerId.name}}
      </span>

      <form @submit.prevent="submitRating" id="vRatingForm">
        <select v-model="obj.rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
      <button type="submit" form="vRatingForm" class="btn btn-secondary text-primary btn-sm">Submit</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "volunteerId",
  props: ["volunteerId", "requesterJob"],
  data() {
    return {
      obj: {
        recipientId: this.volunteerId.id, //volunteer being rated
        userId: this.$store.state.profile.id, //person who posted job
        jobId: this.requesterJob.id
      }
    };
  },
  computed: {},
  methods: {
    submitRating() {
      this.$store.dispatch("jobVolunteerRating", this.obj);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>