<template>
  <div class="jobDetails">
    Job Title: {{ job.title }}<br />
    <img :src="job.imgUrl" class="card-img-top p-2" alt="..." /><br />
    Job Description: {{ job.description }}<br />
    General Location: {{ job.generalLocation }}<br />
    Est. Hours: {{ job.estimatedHours }}<br />
    Start Date: {{ job.startDate }}<br />
    End Date: {{ job.endDate }}<br />
    <span>
      <!-- FIXME we need to pull in all profiles and then show 
           where the requesterId = profileId -->
      <img
        :src="profile.picture"
        class="card-img-top p-2 rounded"
        alt="..."
        style="height:75px;width:75px"
      />Requester Id: {{ job.requesterId }}<br /> </span
    ><br />
    Requester Rating: {{ job.requesterRatings }}<br />
    Job Status: {{ job.jobStatus }}<br />
    Job Requester Id: {{ job.requesterId }}<br />

    Comments Body: {{ comments.body }}<br />
    <!-- {{ comments.creator.name }}<br /> -->

    <!-- Need to create a queue Component to display the queues -->
    Queue Volunteer Email: {{ queues.creatorEmail }}<br />
    Queue Volunteer Status: {{ queues.jobApproval }}<br />
  </div>
</template>

<script>
export default {
  name: "jobDetails",
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getJobById", this.$route.params.jobId);
    this.$store.dispatch("getComments", this.$route.params.jobId);
    this.$store.dispatch("getQueuesByJobId", this.$route.params.jobId);
    // I was thinking that this would give us access to all of user profiles for our app, but I am not sure we are storing user profiles...
    this.$store.dispatch("getAllProfiles");
  },
  computed: {
    job() {
      return this.$store.state.activeJob;
    },
    profile() {
      return this.$store.state.profile;
    },
    profiles() {
      return this.$store.state.profiles;
    },
    comments() {
      return this.$store.state.comments;
    },
    queues() {
      return this.$store.state.queues;
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped></style>
