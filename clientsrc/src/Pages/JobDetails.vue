<template>
  <div class="jobDetails container-fluid">
    <!-- TOP ROW -->
    <div class="row py-2 bg-secondary text-white text-center darkness shadow-lg">
      <div class="col">
        <h1>{{ job.title }}</h1>
      </div>
    </div>
    <div class="row d-flex justify-content-center bg-light border-cstm">
      <div class="col-12 col-md-6 d-flex justify-content-center align-self-center">
        <img :src="job.imgUrl" class="mx-img border border-secondary m-3" />
      </div>
      <div class="col-12 col-md-6 justify-content-center align-self-center mt-3" v-if="!editForm">
        <span class="text-center"></span>
        <span class="row text-center pb-3">
          <div class="col">
            <h1 class="d-flex justify-content-between">
              <span>Posted By:</span>
              <span>
                <i
                  class="far fa-edit text-secondary action"
                  v-show="job.creatorEmail == profile.email"
                  @click="toggleEditForm"
                ></i>
              </span>
            </h1>
          </div>
        </span>
        <div class="row text-secondary bg-white py-3 shadow-lg mx-1" v-if="job.creator">
          <div class="col-4 text-center">
            <img class="rounded-circle" :src="job.creator.picture" style="height:7em;width:7em" />
          </div>
          <div class="col-8 d-flex flex-column justify-content-center">
            <h2 style="font-size:2.5vw">&nbsp;{{ job.creator.name }}</h2>
            <span v-show="requestorRating != 'No Ratings'">
              {{requestorRating}}/5
              <small v-if="numRatings > 1">({{numRatings}} ratings)</small>
              <small v-else>({{numRatings}} rating)</small>
            </span>
            <!-- <h3 v-show="requestorRating != 'No Ratings'">
              Requestor Rating: &nbsp;{{ requestorRating }}/5
              <br />
              <small>({{numRatings}} ratings)</small>
            </h3>-->
          </div>
        </div>
        <div class="row py-3 mx-1">
          <div class="col bg-white shadow-lg">
            <h4>Description:</h4>
            <h5 class="py-2">{{ job.description }}</h5>
            <div></div>
            <div class="col">
              <h5 class="unbold">General Location: {{ job.generalLocation }}</h5>
              <h5 class="unbold">Estimated Hours: {{ job.estimatedHours }}</h5>
              <h5 class="unbold">When: {{ when }}</h5>
              <h5 class="unbold">Status: {{ job.jobStatus }}</h5>
            </div>
          </div>
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
            <span class>
              <img class="rounded-lg" :src="job.creator.picture" style="height:35px;width:35px" />
              {{ job.creator.name }}
              <span v-show="requestorRating != 'No Ratings'">
                {{requestorRating}}/5
                <small v-if="numRatings > 1">({{numRatings}} ratings)</small>
                <small v-else>({{numRatings}} rating)</small>
              </span>
            </span>
          </div>
          <h5 class="mt-3">
            <textarea v-model="job.description" style="width:100%;height:100px;" />
          </h5>
          <div class>
            Image Url:
            <input type="text" v-model="job.imgUrl" style="width:100%;" />
            Location:
            <input
              type="text"
              v-model="job.generalLocation"
              style="width:100%;"
            />
            Hours:
            <input
              class="unbold"
              v-model="job.estimatedHours"
              style="width:100%;"
            />
            <p />
            <div class="unbold">
              <input type="date" v-model="job.startDate" /> Start Date
            </div>
            <div class="unbold">
              <input type="date" v-model="job.endDate" /> End Date
            </div>
            <br />
            <!-- dropdown -->
            <select v-model="job.jobStatus">
              <!-- <option disabled value="Job Status">Job Status:</option> -->
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <span class>&nbsp;Job Status</span>

            <!-- End Dropdown -->
          </div>
        </form>
      </div>
      <!-- END Edit Job -->

      <div class="col-12 d-flex justify-content-center m-3">
        <div
          v-if="
            !isJobCreator && $auth.isAuthenticated && job.jobStatus == 'pending'
          "
          class="row text-center"
        >
          <div>
            <button
              v-if="!isSignedUp"
              @click="addToQueue"
              class="btn btn-primary btn-lg text-secondary shadow-lg"
            >
              <h3>Apply to Help</h3>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row d-flex justify-content-center bg-secondary text-primary text-shadow border-cstm p-3"
    >
      <div class="col-10 text-center" v-if="$auth.isAuthenticated">
        <h2 class="text-white darkness">Ask a Question or Leave a Comment:</h2>
      </div>
      <!-- ADD COMMENT MODAL FORM -->
      <div class="col-12 d-flex justify-content-center">
        <!-- MODAL FORM -->
        <button
          v-if="$auth.isAuthenticated"
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          <h5 class="text-secondary">Add Comment</h5>
        </button>
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
                    <h5 class="shadow-none text-dark">Ask a Question or Leave a Comment:</h5>
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
        <comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :comments="comments"
        />
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

    <div class="row text-center bg-primary border-cstm py-3">
      <div class="col-12 text-secondary" v-if="$auth.isAuthenticated">
        <h1>Sign Up List</h1>
      </div>
    </div>
    <div class="row bg-light py-3 rounded-lg">
      <div class="col-12">
        <Queue v-for="queue in queues" :key="queue.id" :queue="queue" :queues="queues" />
      </div>
    </div>

    <footer class="row sticky-bottom bg-primary d-flex justify-content-between mt-5">
      <div class="col-4 text-center">
        Xander Rutledge
        <br />
        <a href="https://www.linkedin.com/in/alexander-rutledge/" target="_blank">
          <i class="fa fa-linkedin-square text-dark p-1"></i>
          <a href="https://github.com/XanderRutledge" target="_blank">
            <i class="fa fa-github text-dark p-1"></i>
          </a>
        </a>
      </div>
      <div class="col-4 text-center">
        Kevin Lane
        <br />
        <a href="https://www.linkedin.com/in/kevin-lane-2422b51b0/" target="_blank">
          <i class="fa fa-linkedin-square text-dark p-1"></i>
        </a>
        <a href="https://github.com/Kevinclane" target="_blank">
          <i class="fa fa-github text-dark p-1"></i>
        </a>
      </div>
      <!-- Justin -->
      <div class="col-4 text-center">
        <div>
          Justin Mattson
          <br />
          <a href="https://www.facebook.com/justin.mattson.9" target="_blank">
            <i class="fa fa-facebook-official text-dark" aria-hidden="true"></i>
          </a>&nbsp;
          <a href="https://www.linkedin.com/in/justin-mattson" target="_blank">
            <i class="fa fa-linkedin-square text-dark" aria-hidden="true"></i>
          </a>&nbsp;
          <a href="https://justinmattson.github.io/" target="_blank">
            <i class="fa fa-github text-dark p-1" aria-hidden="true"></i>
          </a>&nbsp;
          <a href="mailto:justin.mattson@outlook.com" class="text-dark">
            <i class="fa fa-envelope-o text-dark" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <!-- Justin -->
    </footer>
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
      editForm: false,
      jobStatuses: ["pending", "completed", "cancelled"],
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
    await this.$store.dispatch("initializeSocket");
    this.$store.dispatch("joinRoom", this.$route.params.jobId);
  },
  beforedestry() {
    this.$store.dispatch("leaveRoom", this.$route.params.jobId);
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
      if (this.job.creator) {
        return this.$store.state.profile.id == this.job.creator.id;
      }
      return false;
    },
    isSignedUp() {
      let data = this.$store.state.queues.find(
        (q) => q.creatorEmail == this.$store.state.profile.email
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
    },
    requestorRating() {
      if (this.job) {
        //this.job.jobCreatorRating = specific to this job
        let rateArr = this.job.jobCreatorRatings;
        let length = rateArr.length;
        let x = 0;
        let i = 0;
        while (i < length) {
          x += +rateArr[i];
          i++;
        }
        if (length == 0) {
          return "No Ratings";
        } else return x.toFixed(1) / length;
      }
    },
    numRatings() {
      // Total ratings of requestor for this job
      return this.job.jobCreatorRatings.length;
    },
  },
  methods: {
    addToQueue() {
      let obj = {
        volunteerName: this.profile.name,
        volunteerPic: this.profile.picture,
        jobId: this.job.id,
        jobCreatorEmail: this.job.creatorEmail,
        volunteerId: this.profile.id,
      };
      this.$store.dispatch("createQueue", obj);
    },
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    editJob() {
      this.job.startDate = moment(this.job.startDate).format("MM-DD-YYYY");
      this.job.endDate = moment(this.job.endDate).format("MM-DD-YYYY");
      if (this.job.jobStatus == "cancelled") {
        swal({
          title: "Are you sure?",
          text:
            "Click 'Ok' to confirm you wish to cancel this request.  This action cannot be undone.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            this.job.jobStatus = "cancelled";
            let data = this.$store.dispatch("editJob", this.job);
            swal("Poof! Your help request has been cancelled!", {
              icon: "success",
            });
            this.editForm = false;
          } else {
            swal("Close cancelled");
          }
          return;
        });
      }
      this.$store.dispatch("editJob", this.job);
      this.editForm = false;
    },
    addComment() {
      this.newComment.jobId = this.$route.params.jobId;
      this.$store.dispatch("addComment", { ...this.newComment });
      this.newComment = {};
      $("#myModal").modal("hide");
    },
  },
  components: {
    Comment,
    Queue,
  },
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
.darkness {
  text-shadow: 4px 4px black !important;
}
.shadow-none {
  text-shadow: none;
}
</style>
