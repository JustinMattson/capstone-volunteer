<template>
  <div class="volunteerJob container">
    <div class="row">
        <div class="col-4">
           <router-link :to="{ name: 'job', params: { jobId: volunteerJob.id } }">
            {{volunteerJob.title}}
            </router-link>
            </div>
        <div class="col-4">
            Rate Opportunity Poster:
        </div>
<div class="col-4">
    <form @submit.prevent="submitRating">
      <select v-model="jobCreatorRating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
     <button type="submit" class="btn btn-primary text-secondary btn-lg">Submit</button>
    </form>
</div>
    </div>

    </div>
</template>
<script>


export default {
   name: "volunteerJob",
   props: ["volunteerJob"],
   data(){
    return {
        jobCreatorRating: {}
   }
   },
   methods(){

   }
}
</script>
<style scoped>

</style>