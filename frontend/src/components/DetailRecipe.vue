<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-10">
          <div class="columns">
            <div class="column is-8 mt-2">
              <div class="box has-background-grey-lighter">
                <figure class="image is-4by3">
                  <img
                    alt="foodimage"
                    :src="this.imageURL"
                  />
                </figure>
              </div>
              <button class="button is-dark" @click="goRecipe()">
                BACK :)
              </button>
            </div>
            <div class="column is-6 ml-6">
              <h2 class="title is-2">{{ this.name }}</h2>
              <div class="box has-background-grey-lighter">
                <h4 class="title is-4">ส่วนผสม</h4>
                <div class="column is-6">
                  <div class="content is-size-5">
                    <ol type="1">
                      <li v-for="(item, index) in this.ingredient" :key="index">
                        {{ item }}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div class="box has-background-grey-lighter">
                <h4 class="title is-4">วิธีทำ</h4>
                <div class="column">
                  <div style="text-align: left" class="content is-size-5">
                    <ol>
                      <li
                        class="p-2"
                        v-for="(step, index) in this.steps"
                        :key="index"
                      >
                        {{ step }}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const axios = require("axios");

export default {
  name: "DetailRecipe",
  data() {
    return {
      name: "",
      id: "",
      ingredient: [],
      steps: [],
      imageURL: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    goRecipe() {
      this.$router.back();
    },
    async getData() {
      let id = this.$route.params.id;
      let response = await axios.get("http://159.223.45.216:3083/database/" + id);
      this.result = response.data.menu;
      this.name = response.data.menu.name;
      this.ingredient = response.data.menu.recipe.ingredient;
      this.steps = response.data.menu.recipe.steps;
      this.imageURL = response.data.menu.imageURL;
      this.id = id;
    },
  },
};
</script>
