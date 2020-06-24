<template>
  <div class="volunteerJob row text-center justify-content-center border-top border-secondary py-3">
    <div class="col-md-4">
      <router-link :to="{ name: 'job', params: { jobId: volunteerJob.id } }">
        <h3>{{volunteerJob.title}}</h3>
      </router-link>
    </div>

    <div class="col-md-4 d-flex justify-content-center align-items-center">
      <h5>Rate Opportunity Poster:</h5>
    </div>
    <div class="col-md-2 d-flex justify-content-center align-items-center">
      <form v-if="!reviewCompleted" @submit.prevent="submitRating" id="form1">
        <select v-model="obj.rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
    </div>
    <div class="col-md-2 mt-md-0 mt-3">
      <button
        v-if="!reviewCompleted"
        type="submit"
        form="form1"
        class="btn btn-secondary text-primary btn-lg"
      >Submit</button>
      <div v-if="reviewCompleted">Thanks for the feedback!</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "volunteerJob",
  props: ["volunteerJob"],
  data() {
    return {
      obj: {},
      reviewCompleted: false
    };
  },
  methods: {
    submitRating() {
      this.obj.creatorId = this.volunteerJob.creator.id;
      this.$store.dispatch("jobPosterRating", this.obj);
      this.volunteerJob.completedReviews.push(this.$store.state.profile.id);
    }
  }
};
</script>
<style scoped>
</style>