<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt />
    <p>{{ profile.email }}</p>
    <div style="height:100px;width:300px;background-color:#41b883">Primary</div>
    <br />
    <div style="height:100px;width:300px;background-color:#35495e">secondary</div>
    <br />
    <div style="height:100px;width:300px;background-color:#b84841">danger</div>
    <br />
    <div style="height:100px;width:300px;background-color:#76b841">success</div>
    <br />
    <div style="height:100px;width:300px;background-color:#b88341">warning</div>
    <br />
    <div style="height:100px;width:300px;background-color:#41b2b8">info:</div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
