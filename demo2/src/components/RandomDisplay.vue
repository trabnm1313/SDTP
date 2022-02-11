<template>
  <div id="main" class="hero-body">
    <div id="top-bar" class="box mb-0">
      <div class="level-left">
        <a href="#">
          <div id="logo" class="columns level-item">
            <h1 class="title">Home</h1>
          </div>
        </a>
      </div>
    </div>
    <div id="body" class="py-1">
      <div class="level-item">
        <div id="title-page" class="level-item mt-2 mb-3">
          <h1 class="title">Random Food</h1>
        </div>
      </div>
      <div id="list-card" class="columns mb-0">
        <div
          v-for="(item, index) in result"
          :key="index"
          class="column"
          style="margin: 20px"
        >
          <div id="food-card" class="is-4 p-4" :key="index">
            <a @click="setToggleOn(index)">
              <img id="card-pic" :src="item.imageURL" alt="pic1" />
            </a>
          </div>
        </div>
      </div>
      <div class="level-item">
        <a @click="getData()">
          <div id="random-button" class="level-item mt-2 mb-3">
            <h1 class="title">สุ่มใหม่</h1>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="toggle === true" class="modal" :class="{ 'is-active': toggle }">
    <div class="modal-background" @click="setToggleOff()"></div>
    <div class="modal-card">
      <section
        style="border-radius: 40px 40px 0px 0px"
        class="level-item modal-card-body"
      >
        <div id="modal-head" class="p-3">
          <h1 class="title">{{ result[selected].name }}</h1>
        </div>
      </section>
      <section class="level-item modal-card-body pb-0">
        <div class="columns mb-0">
          <div id="modal-picture-clover" class="p-4">
            <img id="modal-pic" :src="result[selected].imageURL" alt="pic1" />
          </div>
        </div>
      </section>
      <section class="level-item modal-card-body pb-0">
        <div id="modal-desciption" class="p-3">
          <p id="food-desciption" class="ml-6" style="font-size: 20px; text-align: left">
            <b>ส่วนประกอบ</b>: {{ result[selected].recipe.Ingredient[0] }}
            {{ result[selected].recipe.Ingredient[1] }} {{ result[selected].recipe.Ingredient[2] }}
          </p>
          <p class="ml-6" style="font-size: 20px; text-align: left">
            <b>แคลอรี่</b>: {{ result[selected].calorie }} กิโลแคล
          </p>
          <p
            id="food-desciption"
            class="ml-6"
            style="text-align: left; font-size: 20px"
          >
            <b>รายละเอียด</b>: {{ result[selected].description }}
          </p>
        </div>
      </section>
      <section
        style="border-radius: 0px 0px 40px 40px"
        class="level-item modal-card-footer"
      >
        <div id="modal-button-layout" class="level-item m-2">
          <a>
            <div id="button" class="button level-item">วิธีทำ</div>
          </a>
        </div>
        <div id="modal-button-layout" class="level-item">
          <a>
            <div id="button" class="button level-item">สั่งซื้อ</div>
          </a>
        </div>
      </section>
    </div>
  </div>
  <!-- Modal -->
</template>


<script>
const axios = require("axios");

export default {
  name: "RandomDisplay",
  data() {
    return {
      selected: 0,
      toggle: false,
      result: [],
      items: [
        {
          url: "test1.jpeg",
          ingre: ["ingre1", "ingre2", "ingre3"],
          calories: 500,
          des: "ของกินที่อร่อยมากๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ",
        },
        {
          url: "test2.jpg",
          ingre: ["ingre1", "ingre2"],
          calories: 1000,
          des: "ของกินที่อร่อยมากๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ",
        },
        {
          url: "test3.jpg",
          ingre: ["ingre1"],
          calories: 400,
          des: "ของกินที่อร่อยมากๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ",
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let response = await axios.post("http://localhost:8080/randomMenu", {
        tags: ["เส้น"],
      });
      this.result = response.data.menu;
    },
    setToggleOn(index) {
      this.selected = index;
      this.toggle = true;
    },
    setToggleOff() {
      this.toggle = false;
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
}

section {
  background-color: #6f6f6f;
}

#body {
  height: 100%;
  background-color: #6f6f6f;
}

#card-pic {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 20px;
}

.box {
  border-radius: 0px;
  box-shadow: none;
  background-color: #d0d0d0;
}

#title-page {
  background-color: white;
  height: 100px;
  width: 976px;
  border-radius: 50px;
}

#logo {
  background-color: #acacac;
  height: 120px;
  width: 190px;
}

#food-card {
  background-color: white;
  border-radius: 20px;
}

#random-button {
  background-color: white;
  height: 100px;
  width: 567px;
  border-radius: 50px;
}

#modal-head {
  background-color: white;
  width: 70%;
  border-radius: 40px;
}

#modal-picture-clover {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
}

#modal-pic {
  width: 500px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
}

#modal-desciption {
  background-color: white;
  width: 555px;
  border-radius: 40px;
}

#food-desciption {
  width: 30ch;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#modal-button-layout {
  width: 50%;
  height: 100px;
}

#button {
  background-color: white;
  width: 250px;
  border-radius: 40px;
  font-size: 2rem;
}
</style>