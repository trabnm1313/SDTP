<template>
  <div id="main">
    <div id="top-bar" class="box mb-0">
      <div class="level-left">
        <div id="logo" class="columns level-item">
          <h1 class="title">Home</h1>
        </div>
      </div>
    </div>
    <div id="body" class="py-1">
      <div class="level-item">
        <div id="title-page" class="level-item mt-2 mb-3">
          <h1 class="title">Random Food</h1>
        </div>
      </div>
      <div id="list-card" class="columns mb-0">
        <div v-for="(item, index) in items" :key="index" class="column">
          <div id="food-card" class="is-4 p-4">
            <a href="#">
              <img :src="require('../assets/' + item.url)" alt="pic1" />
            </a>
          </div>
        </div>
      </div>
      <div class="level-item">
        <a href="#">
          <div id="random-button" class="level-item mt-2 mb-3">
            <h1 class="title">สุ่มใหม่</h1>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RandomDisplay",
  data() {
    return {
      items: [
        { url: "test1.jpeg" },
        { url: "test2.jpg" },
        { url: "test3.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
img {
  width: 525px;
  height: 525px;
  object-fit: cover;
  border-radius: 20px;
}

#body {
  background-color: #6f6f6f;
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
</style>