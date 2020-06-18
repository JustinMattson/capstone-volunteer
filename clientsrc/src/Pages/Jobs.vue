<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Request Some Help</h1>
 <button
            type="button"
            class="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#myModal"
          >New Request</button>
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">New Request</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <!-- add submit method here -->
                  <form @submit.prevent=""> 
                    <div>
                      <!-- add v-model -->
                      <input type="text" placeholder="title" required />
                    </div>
                    <div>
                      <!-- add v-model -->
                      <textarea
                        class="m-3"
                        rows="3"
                        cols="50"
                        type="text"
                        placeholder="description"
                        required
                      />
                    </div>

                    <button type="submit">Add Request</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
         



      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>