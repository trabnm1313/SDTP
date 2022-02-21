<template>
  <section class="section is-medium">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="columns">
            <div class="column is-half">
              <div class="box has-background-grey-lighter">
                <p class="is-size-4">ไม่รู้จะกินอะไรสินะ งั้น</p>
                <div class="column is-justify-content-center mb-4">
                  <button class="button is-info is-medium" @click="openFilter()">สุ่มเลย!</button>
                </div>
                <div class="column is-justify-content-center my-4">
                  <p class="is-size-4">อะไรนะ!</p>
                  <p class="is-size-4">มีเป้าหมายแล้วหรอ?</p>
                  <button class="button is-success m-2" @click="alert()">ซื้อจากร้าน</button>
                  <button class="button is-danger m-2" @click="alert()">ลองทำเอง</button>
                </div>  
              </div>
            </div>
            <div class="column is-align-self-center ml-6">
              <figure class="image is-1by1">
                  <img alt="cartoon" src="https://freepngimg.com/thumb/my_little_pony/23605-4-rainbow-dash-image.png">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </section>
</template>

<script>
export default {
  name: 'Home',

  methods: {
    openFilter() {
      this.$router.push('/filtermenu')
    },
    alert() {
      alert("ยังไม่พร้อมใช้งาน")
    }
  }
}
</script>