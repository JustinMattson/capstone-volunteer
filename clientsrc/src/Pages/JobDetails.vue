<template>
  <div class="jobDetails">
    Job Title: {{ job.title }}<br />
    Job Description: {{ job.description }}<br />
    General Location: {{ job.generalLocation }}<br />
    Est. Hours: {{ job.estimatedHours }}<br />
    Start Date: {{ job.startDate }}<br />
    End Date: {{ job.endDate }}<br />
    Requester Id: {{ job.requesterId }}<br />
    Requester Profile Img: {{ profile.picture }} <br />
    Requester Rating: {{ job.requesterRatings }}<br />
    Job Status: {{ job.jobStatus }}<br />
    Job Requester Id: {{ job.requesterId }}<br />
    Job imgUrl: {{ job.imgUrl }} <br />

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
  },
  computed: {
    job() {
      return this.$store.state.activeJob;
    },
    profile() {
      return this.$store.state.profile;
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
