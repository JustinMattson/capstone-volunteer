<template>
  <div class="jobDetails container-fluid">
    <div class="row mt-3 border-cstm">
      <div class="col-12 text-center">
        <h1>{{job.title}}</h1>
      </div>
    </div>
    <div class="row mb-3 d-flex justify-content-center bg-primary p-3 border-cstm">
      <div class="col-6 d-flex justify-content-center align-self-center">
        <img :src="job.imgUrl" class="mx-img border border-secondary" />
      </div>
      <div class="col-4 offset-1">
        <div class="row d-flex justify-content-center">
          <div class="col-6 d-flex justify-content-end" v-if="job.creator">
            <img :src="job.creator.picture" class="profile-pic border border-secondary" />
          </div>
          <div class="col-6" v-if="job.creator">
            <div>{{job.creator.name}}</div>
            <div>{{profile.requesterRating}} 5 FIX THIS BEFORE DEPLOY</div>
          </div>
        </div>
        <div class="row my-5 text-center">
          <div class="col-12">
            <p>General Location: {{job.generalLocation}}</p>
            <p>Estimated Hours: {{job.estimatedHours}}</p>
            <p>When: {{when}}</p>
          </div>
        </div>

        <div v-if="!isJobCreator" class="row text-center">
          <div class="col-12 button-bottom">
            <button
              v-if="isSignedUp"
              @click="addToQueue"
              class="btn btn-secondary btn-lg text-primary text-shadow"
            >Apply to Help</button>
            <button
              v-else
              @click="addToQueue"
              class="btn btn-secondary btn-lg text-primary text-shadow"
            >Apply to Help</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center border-cstm py-5">
      <div class="col-8">{{job.description}}</div>
    </div>
    <div
      class="row mb-3 d-flex justify-content-center bg-secondary text-primary text-shadow border-cstm p-3"
    >
      <div class="col-10 text-center">Comments</div>

      <!-- ADD COMMENT MODAL FORM -->
      <div class="col-12">
        <!-- MODAL FORM -->
        <button
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >Add Comment</button>
      </div>
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header bg-primary shadow-sm">
              <h4 class="modal-title text-white">New Comment</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body shadow-sm container text-secondary">
              <!-- add submit method here -->
              <form @submit.prevent="addComment">
                <div class="row justify-content-center">
                  <div class="col text-center">
                    <!-- add v-model -->
                    <h5>Comment:</h5>
                    <textarea
                      class="unbold"
                      placeholder="Comment..."
                      required
                      v-model="newComment.body"
                      style="height:100px;width:100%;"
                    />
                  </div>
                </div>
                <div class="row justify-content-center mt-3">
                  <div class="col text-center">
                    <!-- add v-model -->
                  </div>
                </div>

                <div class="row mt-3 align-items-end">
                  <div class="col text-center">
                    <button type="submit" class="btn btn-secondary btn-lg">Add Comment</button>
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
      <!-- END ADD COMMENT MODAL -->
    </div>
    <div class="row">
      <div class="col-12">
        <!-- CARD TEMPLATE COMMENTS -->
        <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
        <!-- END CARD TEMPLATE COMMENTS -->
      </div>
    </div>
    <div class="row text-center border-cstm pb-3">
      <div class="col-12">Sign Up List</div>
    </div>
    <div class="row">
      <div class="col-12">
        <Queue v-for="queue in queues" :key="queue.id" :queue="queue" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Comment from "@/components/CommentComponent.vue";
import Queue from "@/components/QueueComponent.vue";
export default {
  name: "jobDetails",
  data() {
    return {
      newComment: {}
    };
  },
  onRouterLeave(to, from, next) {
    commit("setActiveJob", {});
    next();
  },
  async mounted() {
    await this.$store.dispatch("getJobById", this.$route.params.jobId);
    this.$store.dispatch("getComments", this.$route.params.jobId);
    this.$store.dispatch("getQueuesByJobId", this.$route.params.jobId);
    // I was thinking that this would give us access to all of user profiles for our app, but I am not sure we are storing user profiles...
    // this.$store.dispatch("getAllProfiles");
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
    isJobCreator() {
      return this.$store.state.profile.id == this.job.creator.id;
    },
    isSignedUp() {
      let data = this.$store.state.queues.find(
        q => q.volunteerEmail == this.$store.state.profile.email
      );
      if (data) {
        return true;
      } else {
        return false;
      }
    },
    when() {
      if (this.job.startDate == this.job.endDate) {
        return moment(String(this.job.startDate)).format("MM/DD/YYYY");
      } else {
        return (
          moment(String(this.job.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.job.endDate)).format("MM/DD/YYYY")
        );
      }
    }
  },
  methods: {
    addToQueue() {
      let obj = {
        volunteerName: this.profile.name,
        volunteerPic: this.profile.picture,
        jobId: this.$route.params.jobId
      };

      this.$store.dispatch("createQueue", obj);
    },
    addComment() {
      this.newComment.jobId = this.$route.params.jobId;
      this.$store.dispatch("addComment", { ...this.newComment });
      this.newComment = {};
      $('#myModal').modal('hide')
    }
  },
  components: {
    Comment,
    Queue
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
.unbold {
  font-family: "Balsamiq Sans", cursive;
}
.mx-img {
  max-width: 40vw;
  border-radius: 10px;
  box-shadow: 4px 4px 5px black;
}
.profile-pic {
  height: 150px;
  width: 150px;
  border-radius: 30px;
  box-shadow: 4px 4px 5px black;
}
.button-bottom {
  position: absolute !important;
  bottom: 0 !important;
}
.text-shadow {
  text-shadow: 2px 2px black;
}
.border-cstm {
  border-bottom: 3px solid black;
}
</style>
