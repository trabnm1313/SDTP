<template>
  <div class="container is-widescreen">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-one-quarter">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">เลือกเมนู</p>
          </header>
          <div class="card-content">
            <div class="content is-left">
              <div class="form-check ">
                <input class="form-check-input" type="radio" value="เส้น" v-model="menu">
                &nbsp;
                <label class="form-check-label" for="one">เมนูเส้น</label>
                <br>
                <input class="form-check-input" type="radio" value="ข้าว" v-model="menu">
                &nbsp;
                <label class="form-check-label" for="two">เมนูข้าว</label>
                <br>
                <input class="form-check-input" type="radio" value="อะไรก็ได้" v-model="menu">
                &nbsp;
                <label class="form-check-label" for="three">เมนูทั้งหมด</label>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <button class="button is-success card-footer-item " :disabled="!menu" @click="methodModal = !methodModal">Next</button>
            <button class="button is-light card-footer-item" @click="this.$router.back()">Back</button>
          </footer>
        </div>
      </div>
      <div class="column"></div>
    </div>

    <!-- ModalMethod -->
    <div class="modal" :class="{'is-active':methodModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">วิธีการปรุงอาหาร</p>
            <button class="delete" aria-label="close" @click="methodModal = !methodModal"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
              <div class="form-check ">
                <input class="form-check-input" type="radio" value="ต้ม" v-model="method">
                &nbsp;
                <label class="form-check-label" for="one">ต้ม</label>
                <br>
                <input class="form-check-input" type="radio" value="ผัด" v-model="method">
                &nbsp;
                <label class="form-check-label" for="two">ผัด</label>
                <br>
                <input class="form-check-input" type="radio" value="แกง" v-model="method">
                &nbsp;
                <label class="form-check-label" for="three">แกง</label>
                <br>
                <input class="form-check-input" type="radio" value="ทอด" v-model="method">
                &nbsp;
                <label class="form-check-label" for="three">ทอด</label>
                <br>
                <input class="form-check-input" type="radio" value="อะไรก็ได้" v-model="method">
                &nbsp;
                <label class="form-check-label" for="three">อะไรก็ได้</label>
              </div>
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success" :disabled="!method" @click="optionMenu">Next</button>
            <button class="button" @click="methodModal = !methodModal">Cancel</button>
            </footer>
        </div>
    </div>
    
    <!-- ModalNoodle -->
    <div class="modal" :class="{'is-active':noodleModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">เส้น</p>
            <button class="delete" aria-label="close" @click="noodleModal = !noodleModal"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
              <div class="form-check ">
                <input class="form-check-input" type="radio" value="ก๋วยเตี๋ยว" v-model="noodle">
                &nbsp;
                <label class="form-check-label" for="one">ก๋วยเตี๋ยว</label>
                <br>
                <input class="form-check-input" type="radio" value="ราเมงและอุด้ง" v-model="noodle">
                &nbsp;
                <label class="form-check-label" for="two">ราเมงและอุด้ง</label>
                <br>
                <input class="form-check-input" type="radio" value="พาสต้า" v-model="noodle">
                &nbsp;
                <label class="form-check-label" for="three">พาสต้า</label>
                <br>
                <input class="form-check-input" type="radio" value="ขนมจีน" v-model="noodle">
                &nbsp;
                <label class="form-check-label" for="three">ขนมจีน</label>
                <br>
                <input class="form-check-input" type="radio" value="อะไรก็ได้" v-model="noodle">
                &nbsp;
                <label class="form-check-label" for="three">อะไรก็ได้!</label>
              </div>
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success" :disabled="!noodle" @click="noodleModal = !noodleModal,ingredientModal = !ingredientModal">Next</button>
            <button class="button" @click="noodleModal = !noodleModal">Cancel</button>
            </footer>
        </div>
    </div>

    <!-- ModalIngredient -->
    <div class="modal" :class="{'is-active':ingredientModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">วัตถุดิบหลัก</p>
            <button class="delete" aria-label="close" @click="ingredientModal = !ingredientModal"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
              <div class="form-check ">
                <input class="form-check-input" type="radio" value="หมู" v-model="ingredient">
                &nbsp;
                <label class="form-check-label" for="one">หมู</label>
                <br>
                <input class="form-check-input" type="radio" value="ไก่" v-model="ingredient">
                &nbsp;
                <label class="form-check-label" for="two">ไก่</label>
                <br>
                <input class="form-check-input" type="radio" value="เนื้อ" v-model="ingredient">
                &nbsp;
                <label class="form-check-label" for="three">เนื้อ</label>
                <br>
                <input class="form-check-input" type="radio" value="ทะเล" v-model="ingredient">
                &nbsp;
                <label class="form-check-label" for="three">ทะเล</label>
                <br>
                <input class="form-check-input" type="radio" value="อะไรก็ได้" v-model="ingredient">
                &nbsp;
                <label class="form-check-label" for="three">อะไรก็ได้!</label>
              </div>
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success" :disabled="!ingredientModal" @click="randomMenu">Random Now!</button>
            <button class="button" @click="ingredientModal = !ingredientModal">Cancel</button>
            </footer>
        </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'FilterMenu',
  props:[],
  data() {
    return {
      menu:null,
      methodModal:false,
      method:null,
      noodleModal:false,
      noodle:null,
      ingredientModal:false,
      ingredient:null,
      ans:{}
    };
  },
  methods:{
    optionMenu(){
      if(this.menu === "ข้าว"){
        this.methodModal = false;
        this.ingredientModal = true;
      }
      else{
        this.methodModal = false;
        this.noodleModal = true;
      }
    },
    randomMenu() {
      let userWant = this.menu + "&" + this.method + "&" + this.noodle + "&" + this.ingredient
      
      this.$router.push('/randomdisplay/' + userWant)
    }
  }
}
</script>

<style>
.container {
  color: #2c3e50;
}

.card {
  width: 30vw;
  align-self: center;
  margin-top: 15vw;
}

</style>
