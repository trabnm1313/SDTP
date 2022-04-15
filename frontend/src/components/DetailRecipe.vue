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
                    src="https://food.grab.com/static/page-home/TH-new-3.jpg"
                  />
                </figure>
                
              </div>
              <button class="button is-dark"  @click="goRecipe()">
                BACK :)
              </button>
            </div>
            <div class="column is-6 ml-6">
                <h2 class="title is-2">ชื่อเมนู</h2>
                <div class="box has-background-grey-lighter">
                    <h4 class="title is-4">ส่วนผสม</h4>
                    <div class="column is-6">
                        <div class="content">
                            <ol type="1">
                                <li>เพิ่มส่วนผสมตรงนี้</li>
                            </ol>
                        </div> 
                    </div>
                </div>
                <div class="box has-background-grey-lighter">
                    <h4 class="title is-4">วิธีทำ</h4>
                    <div class="column is-6">
                        <div class="content">
                            <ol type="1">
                                <li>เพิ่มวิธีทำตรงนี้</li>
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
export default {
  name: "DetailRecipe",
  methods: {
    goRecipe(){
      this.$router.push('/SearchRecipe')
    },
  }
};
</script>
