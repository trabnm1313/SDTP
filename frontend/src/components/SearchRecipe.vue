<template>
  <section>
    <nav class="navbar is-dark">
      <div class="container">
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item">
              <input
                class="input is-rounded searchBox"
                type="text"
                placeholder="Search"
                v-model="search"
              />
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <button
                class="button is-link"
                @click="filterModal = !filterModal"
              >
                Filter
              </button>
            </div>
            <div class="navbar-item">
              <button class="button is-success" @click="searchMenu()">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="body">
      <table class="table">
        <thead>
          <tr>
            <th>สูตรอาหาร</th>
            <th>ภาพประกอบ</th>
            <th>จำนวนการดู(ครั้ง)</th>
            <th>วัตถุดิบที่ใช้</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(menu, index) in result" :key="index">
            <a @click="viewDetail(menu.id)"
              ><td>{{ menu.name }}</td></a
            >
            <td><img class="img" :src="menu.imageURL" alt="menuImage" /></td>
            <td>{{ menu.recipe.views }}</td>
            <td>
              {{ menu.recipe.Ingredient[0] }}, {{ menu.recipe.Ingredient[1] }},
              {{ menu.recipe.Ingredient[2] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="filterModal" class="modal" :class="{ 'is-active': filterModal }">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">วัตถุดิบหลัก</p>
          <button class="delete" aria-label="close" @click="cancel()"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="columns">
            <div class="column">
              <div>
                <h1>ประเภทเมนู</h1>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[0].key" /> ข้าว
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[5].key" /> เส้น
                </label>
              </div>
              <div v-show="filter[0].key">
                <h1>ประเภทการทำ(เมนูข้าว)</h1>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[1].key" /> ต้ม
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[2].key" /> ผัด
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[3].key" /> แกง
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[4].key" /> ทอด
                </label>
              </div>
              <div v-show="filter[5].key">
                <h1>เส้น(เมนูเส้น)</h1>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[6].key" /> ราเมง
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[7].key" /> อุด้ง
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[8].key" /> เส้นเล็ก
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[9].key" /> เส้นใหญ่
                </label>
              </div>
            </div>
            <div class="column">
              <div>
                <h1>วัตถุดิบหลัก</h1>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[10].key" /> หมู
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[11].key" /> เนื้อ
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[12].key" /> ไก่
                </label>
                <label class="checkbox">
                  <input type="checkbox" v-model="filter[13].key" /> ทะเล
                </label>
              </div>
              <div>
                <h1>อื่นๆ</h1>
                <input
                  class="input"
                  type="text"
                  placeholder="ความต้องการเพิ่มเติม"
                  v-model="more"
                />
              </div>
            </div>
          </div>

          <!--End Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="filterModal = !filterModal">
            Select
          </button>
          <button class="button is-danger" @click="cancel()">Cancel</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
const axios = require("axios");
const randomData = [
  {
    id: "1",
    calorie: 500,
    description: "ข้าวกะเพรากุ้งไข่ระเบิด",
    imageURL:
      "https://img.wongnai.com/p/800x0/2019/04/02/2dc203b9dafe47fc9c532142419513aa.jpg",
    name: "ข้าวกะเพรากุ้งไข่ระเบิด",
    recipe: {
      Ingredient: ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
      views: 1,
    },
  },
  {
    id: "2",
    calorie: 200,
    description: "ข้าวกะเพรากุ้งไข่ระเบิด",
    imageURL:
      "https://img.wongnai.com/p/1600x0/2017/09/12/172aa09bdd2741368ebb85cad91f3d4e.jpg",
    name: "ข้าวกะเพรากุ้งไข่ระเบิด2",
    recipe: {
      Ingredient: ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
      views: 10,
    },
  },
  {
    id: "3",
    calorie: 404,
    description: "ข้าวกะเพรากุ้งไข่ระเบิด",
    imageURL:
      "https://img.wongnai.com/p/400x0/2018/05/25/12275783e777493092189fdc504534c4.jpg",
    name: "ข้าวกะเพรากุ้งไข่ระเบิด3",
    recipe: {
      Ingredient: ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
      views: 100,
    },
  },
];

export default {
  name: " SearchRecipe",
  data() {
    return {
      filterModal: false,
      search: null,
      filter: [
        { key: false, value: "ข้าว" },
        { key: false, value: "ต้ม" },
        { key: false, value: "ผัด" },
        { key: false, value: "แกง" },
        { key: false, value: "ทอด" },
        { key: false, value: "เส้น" },
        { key: false, value: "ราเมง" },
        { key: false, value: "อูด้ง" },
        { key: false, value: "เส้นเล็ก" },
        { key: false, value: "เส้นใหญ่" },
        { key: false, value: "หมู" },
        { key: false, value: "เนื้อ" },
        { key: false, value: "ไก่" },
        { key: false, value: "ทะเล" },
      ],
      more: null,
      result: [],
      searchStatus: false,
    };
  },
  methods: {
    cancel() {
      for (let data of this.filter) {
        data.key = false;
      }
      this.filterModal = false;
    },
    async searchMenu() {
      let tagsArray = [];
      if (this.search != null || this.search != "") {
        tagsArray.push(this.search);
      }
      for (let data of this.filter) {
        if ((data.key = true)) {
          tagsArray.push(data.value);
        }
      }
      if (this.more != null || this.more != "") {
        tagsArray.push(this.more);
      }
      // let response = await axios.post(
      //   "http://159.223.45.216:3083/searchMenu",
      //   {
      //     tags: tagsArray,
      //   }
      // );
      this.searchStatus = true;
      // this.result = response.data.menu;
      this.result = randomData;
    },
    viewDetail(id) {
      this.$router.push("/DetailRecipe/" + id);
    },
  },
};
</script>
<style scoped>
h1 {
  font-weight: bold;
  font-size: 25px;
}
.icons {
  width: 20px;
  height: 20px;
  color: black;
}
.searchBox {
  width: 40vw;
}
#navMenu {
  padding-left: 200px;
  padding-right: 200px;
}
.checkbox {
  margin: 5px;
}
.body {
  padding-left: 5%;
  padding-right: 5%;
}
.table {
  width: 100%;
}
th {
  width: 25%;
}
</style>