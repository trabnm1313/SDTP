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
const mock = {
  id: "1",
  calorie: 500,
  description: "ข้าวกะเพรากุ้งไข่ระเบิด",
  imageURL:
    "https://img.wongnai.com/p/800x0/2019/04/02/2dc203b9dafe47fc9c532142419513aa.jpg",
  name: "ข้าวกะเพรากุ้งไข่ระเบิด",
  recipe: {
    ingredient: ["ไข่ไก่ 3 ฟอง", "ไข่ไก่ 10 ฟอง"],
    steps: [
      "นำมะระมาผ่าแล้วควักไส้ทิ้ง หั่นเป็นชิ้น ๆ แล้วทาด้วยเกลือให้ทั่ว หมักเกลือทิ้งไว้ 20 นาที",
      "เมื่อครบเวลาแล้ว นำไปล้างน้ำเปล่า เกลือจะช่วยลดความขมของมะระ",
      "ต้มน้ำให้เดือด ใส่รากผักชี กระเทียม พริกไทยดำ ตามด้วยเครื่องปรุงทั้งหมด และน่องไก่ ตุ๋นทิ้งไว้เป็นเวลา 30 นาที",
      "เมื่อครบเวลา ใส่มะระ และเห็ดหอมแช่น้ำลงไป ตุ๋นต่ออีก 30 นาที",
      "ลวกถั่วงอก และเส้นบะหมี่ ใส่ลงในชาม ตักไก่ และมะระที่ตุ๋นไว้ ราดจัดเสิร์ฟ โรยหน้าด้วย กระเทียมเจียว และผักชีต้นหอม เป็นอันพร้อมรับประทาน!",
    ],
    views: 1,
  },
};

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
    getData() {
      let id = this.$route.params.id;
      // let response = await axios.get("http://159.223.45.216:3083/database/" + props.id);
      // this.result = response.data.menu;
      this.name = mock.name;
      this.ingredient = mock.recipe.ingredient;
      this.steps = mock.recipe.steps;
      this.imageURL = mock.imageURL;
      this.id = id;
    },
  },
};
</script>
