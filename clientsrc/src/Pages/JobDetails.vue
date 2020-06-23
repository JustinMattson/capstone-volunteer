<template>
  <div class="jobDetails container-fluid">
    <!-- TOP ROW -->
    <div class="row mb-3 d-flex justify-content-center bg-primary border-cstm">
      <div class="col-12 col-md-6 d-flex justify-content-center align-self-center">
        <img :src="job.imgUrl" class="mx-img border border-secondary m-3" />
      </div>
      <div class="col-12 col-md-6 justify-content-center align-self-center mt-3" v-if="!editForm">
        <div class="d-flex justify-content-between">
          <span class="font-lg">{{job.title}}</span>
          <span>
            <i
              class="far fa-edit text-secondary action"
              v-show="job.creatorEmail == profile.email"
              @click="toggleEditForm"
            ></i>
          </span>
        </div>
        <div class="text-secondary d-flex justify-content-between" v-if="job.creator">
          <span class="unbold">
            <img class="rounded-lg" :src="job.creator.picture" style="height:25px;width:25px" />
            {{job.creator.name}} {{profile.requesterRating}} 5 FIX THIS BEFORE DEPLOY
          </span>
        </div>
        <h5 class="mt-3">{{job.description}}</h5>
        <div>
          <div class="unbold">General Location: {{job.generalLocation}}</div>
          <div class="unbold">Estimated Hours: {{job.estimatedHours}}</div>
          <p>When: {{when}}</p>
        </div>
      </div>

      <!-- Edit Job -->
      <div class="col-12 col-md-6 justify-content-center align-self-center mt-3" v-else>
        <form class="form" @submit.prevent="editJob">
          <div class="d-flex justify-content-between">
            <span class="font-lg">
              <input type="text" v-model="job.title" style="width:100%;" />
            </span>
            <span class="d-flex align-self-center">
              <button type="submit" class="btn btn-outline-secondary ml-3">
                <i
                  type="submit"
                  class="far fa-save text-warning action shadow fa-2x text-shadow"
                  v-show="job.creatorEmail == profile.email"
                ></i>
              </button>
            </span>
          </div>
          <div class="text-secondary d-flex justify-content-between mt-2" v-if="job.creator">
            <span class="unbold">
              <img class="rounded-lg" :src="job.creator.picture" style="height:25px;width:25px" />
              {{job.creator.name}} {{profile.requesterRating}} 5 FIX THIS BEFORE DEPLOY
            </span>
          </div>
          <h5 class="mt-3">
            <textarea v-model="job.description" style="width:100%;height:100px;" />
          </h5>
          <div class="unbold">
            <input type="text" v-model="job.generalLocation" style="width:100%;" />
            <input class="unbold" v-model="job.estimatedHours" style="width:100%;" />
            <div class="unbold">
              <input type="date" v-model="job.startDate" /> Start Date
            </div>
            <div class="unbold">
              <input type="date" v-model="job.endDate" />
              End Date
            </div>
          </div>
        </form>
      </div>
      <!-- END Edit Job -->

      <div class="col-12 d-flex justify-content-center m-3">
        <div v-if="!isJobCreator && $auth.isAuthenticated" class="row text-center">
          <div>
            <button
              v-if="!isSignedUp"
              @click="addToQueue"
              class="btn btn-secondary btn-lg text-primary text-shadow"
            >Apply to Help</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row mb-3 d-flex justify-content-center bg-secondary text-primary text-shadow border-cstm p-3"
    >
      <div class="col-10 text-center">
        <h3>Ask a Question or Leave a Comment:</h3>
      </div>
      <!-- ADD COMMENT MODAL FORM -->
      <div class="col-12 d-flex justify-content-center">
        <!-- MODAL FORM -->
        <button
          v-if="$auth.isAuthenticated"
          type="button"
          class="btn btn-info btn-sm"
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
            <div class="modal-body shadow-sm container text-primary">
              <!-- add submit method here -->
              <form @submit.prevent="addComment">
                <div class="row justify-content-center">
                  <div class="col text-center">
                    <!-- add v-model -->
                    <h5>Ask a Question or Leave a Comment:</h5>
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

    <!-- ADD COMMENT MODAL FORM -->
    <div class="col-12 d-flex justify-content-center">
      <!-- MODAL FORM -->
      <button
        v-if="$auth.isAuthenticated && comments.length >= 5"
        type="button"
        class="btn btn-info btn-sm mb-3"
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
          <div class="modal-body shadow-sm container text-primary">
            <!-- add submit method here -->
            <form @submit.prevent="addComment">
              <div class="row justify-content-center">
                <div class="col text-center">
                  <!-- add v-model -->
                  <h5>Ask a Question or Leave a Comment:</h5>
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
      newComment: {},
      editForm: false
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
        q => q.creatorEmail == this.$store.state.profile.email
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
        jobId: this.$route.params.jobId,
        jobCreatorEmail: this.job.creatorEmail
      };

      this.$store.dispatch("createQueue", obj);
    },
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    editJob() {
      this.job.startDate = moment(this.job.startDate).format("MM-DD-YYYY");
      this.job.endDate = moment(this.job.endDate).format("MM-DD-YYYY");
      this.$store.dispatch("editJob", this.job);
      this.editForm = false;
    },
    addComment() {
      this.newComment.jobId = this.$route.params.jobId;
      this.$store.dispatch("addComment", { ...this.newComment });
      this.newComment = {};
      $("#myModal").modal("hide");
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
.action {
  cursor: pointer;
}
.font-lg {
  font-size: 20pt;
}
img {
  border-radius: 13px;
}
.mx-img {
  max-width: 45vw;
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
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
