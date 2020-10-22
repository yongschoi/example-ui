<template>
  <div class="home" align="center">
    <h2>{{ now }}</h2>
    <HelloWorld msg="Welcome to example-user" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      now: null
    }
  },
  components: {
    HelloWorld
  }
};
</script>