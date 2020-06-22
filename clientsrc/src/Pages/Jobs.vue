<template>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col-12">
        <h1>Request Some Help</h1>
        <!-- MODAL FORM -->
        <button
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >New Request</button>
      </div>
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header bg-primary shadow-sm">
              <h4 class="modal-title text-white">New Request</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body shadow-sm container text-secondary">
              <!-- add submit method here -->
              <form @submit.prevent="addJob">
                <div class="row justify-content-center">
                  <div class="col text-center">
                    <!-- add v-model -->
                    <h5>Title:</h5>
                    <input type="text" placeholder="Title" required v-model="newJob.title" />
                  </div>
                  <div class="col text-center">
                    <h5>Location:</h5>
                    <input type="text" placeholder="City" required v-model="newJob.generalLocation" />
                  </div>
                </div>
                <div class="row justify-content-center mt-3">
                  <div class="col text-center">
                    <!-- add v-model -->
                    <h5>Description:</h5>
                    <textarea
                      class="m-3"
                      rows="3"
                      type="text"
                      placeholder="Describe what you need help with..."
                      required
                      v-model="newJob.description"
                      style="width:90%;"
                    />
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col text-center">
                    <h5>Image (optional):</h5>
                    <input type="text" placeholder="Image Link" v-model="newJob.imgUrl" />
                  </div>
                </div>

                <div class="row justify-content-center mt-3">
                  <div class="col text-center">
                    <h5>Start Date:</h5>
                    <input type="date" placeholder="start date" required v-model="newJob.startDate" />
                  </div>
                  <div class="col text-center">
                    <h5>End Date:</h5>
                    <input type="date" placeholder="end date" required v-model="newJob.endDate" />
                  </div>
                </div>
                <div class="row mt-3 align-items-end">
                  <div class="col">
                    <h5>Estimated Hours:</h5>
                    <input type="number" placeholder="0" required v-model="newJob.estimatedHours" />
                  </div>
                  <div class="col text-center">
                    <button type="submit" class="btn btn-secondary btn-lg">Add Request</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer bg-primary shadow-sm">
              <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <!-- END MODAL FORM -->
    </div>
    <div class="row">
      <div class="col-12 list-container px-0">
        <div id="jobs" class="card-columns p-2" style="column-gap: 0.7rem;">
          <!-- CARD TEMPLATE API -->
          <job v-for="job in jobs" :key="job.id" :job="job" />
          <!-- END CARD TEMPLATE -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Job from "@/components/JobComponent.vue";
import moment from "moment";
export default {
  name: "jobs",
  data() {
    return {
      newJob: {}
    };
  },
  async mounted() {
    await this.$store.dispatch("getAllJobs");
  },
  methods: {
    toggleSort() {
      if (this.sort == "desc") {
        this.sort = "asc";
      } else {
        this.sort = "desc";
      }
    },
    addJob() {
      this.newJob.requesterId = this.profile.id;
      this.$store.dispatch("addJob", { ...this.newJob });
      this.newJob = {};
      this.jobForm = false; // REVIEW what is this line doing?
    },
    jobSortAsc() {
      function compare(a, b) {
        if (a.updatedAt < b.updatedAt) return -1;
        if (a.updatedAt > b.updatedAt) return 1;
        return 0;
      }
      return this.jobs.sort(compare);
    },
    jobSortDesc() {
      function compare(a, b) {
        if (a.updatedAt < b.updatedAt) return 1;
        if (a.updatedAt > b.updatedAt) return -1;
        return 0;
      }
      return this.jobs.sort(compare);
    }
  },
  computed: {
    jobs() {
      return this.$store.state.jobs;
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  components: {
    Job
  }
};
</script>
