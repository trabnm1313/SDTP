
<template>
<section>
    <nav class="navbar is-dark">
        <div class="container">
            <div id="navMenu" class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item">
                    <input class="input is-rounded searchBox" type="text" placeholder="Search">
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <button class="button is-link" @click="filterModal = !filterModal">Filter</button>
                    </div>
                    <div class="navbar-item">
                        <button class="button is-success">Search</button>
                    </div>
                </div>

            </div>
        </div>
    </nav>

    <div id="filterModal" class="modal" :class="{'is-active':filterModal}">
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
                                <input type="checkbox" v-model="rice"> ข้าว
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="noodle"> เส้น
                            </label>
                        </div>
                        <div v-show="rice">
                            <h1>ประเภทการทำ(เมนูข้าว)</h1>
                            <label class="checkbox">
                                <input type="checkbox" v-model="tom"> ต้ม
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="pad"> ผัด
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="kang"> แกง
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="tod"> ทอด
                            </label>
                        </div>
                        <div v-show="noodle">
                            <h1>เส้น(เมนูเส้น)</h1>
                            <label class="checkbox">
                                <input type="checkbox" v-model="raman"> ราเมง
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="udon"> อุด้ง
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="lek"> เส้นเล็ก
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="yai"> เส้นใหญ่
                            </label>
                        </div>
                        
                    </div>
                    <div class="column">
                        <div>
                            <h1>วัตถุดิบหลัก</h1>
                            <label class="checkbox">
                                <input type="checkbox" v-model="moo"> หมู
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="deef"> เนื้อ
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="kai"> ไก่
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="taley"> ทะเล
                            </label>
                        </div>
                        <div>
                            <h1>อื่นๆ</h1>
                            <input class="input" type="text" placeholder="ความต้องการเพิ่มเติม" v-model="more">
                        </div>
                    </div>
                </div>

                
              <!--End Content ... -->
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success" @click="filterModal = !filterModal">Select</button>
            <button class="button" @click="cancel">Cancel</button>
            </footer>
        </div>
    </div>
    </section>
</template>

<script>
export default {
  name: 'Recipe',
  data() {
    return {
      filterModal:false,
      rice:false,
      tom:false,
      pad:false,
      kang:false,
      tod:false,
      noodle:false,
      raman:false,
      udon:false,
      lek:false,
      yai:false,
      moo:false,
      deef:false,
      kai:false,
      taley:false,
      more:null,
    };
  },
  methods: {
    search() {
    },
    cancel(){
        this.filterModal = false,
        this.rice = false,
        this.tom = false,
        this.pad = false,
        this.kang = false,
        this.tod = false,
        this.noodle = false,
        this.raman = false,
        this.udon = false,
        this.lek = false,
        this.yai = false,
        this.moo = false,
        this.deef = false,
        this.kai = false,
        this.taley = false,
        this.more = null
    }
  }
}
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
.searchBox{
    width:40vw;
}
#navMenu {
    padding-left: 200px;
    padding-right: 200px;
}
.checkbox{
    margin:5px
}
</style>