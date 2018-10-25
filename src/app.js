// import Vue from 'vue'
// import Vuex from 'vuex'
// import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'

const Vue = require("vue/dist/vue.js");
const Vuex = require("vuex");
const {mapActions,mapGetters} = require("vuex");
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
            driver:[
                {
                    id:1,
                    name:"redis",
                },
                {
                  id:2,
                  name:"ssdb",
                  },
                {
                    id:3,
                    name:"pick",
                },
            ],
            session:[
                {
                    id:1,
                    name:"111",
                    type:"redis",
                    info:{},
                }
            ],
    },
    getters: {
        driver: state => {
          return state.driver;
        },
        session:state=>{
            return state.session;
        }
      },
    mutations:{
        save_new_session (s,payload){
            if(payload.id===null){
                payload.id=s.session.length;
            }else{

            }
            console.log(payload);
            s.session.push(payload);
        }
    },
    actions:{
        save_new_session(ctx){
           var payload={
                id:null,
                name:"111",
                type:"redis",
                info:{},
            }
            ctx.commit("save_new_session",payload)
        }
        }
    })


var app = new Vue({
    el: '#app',
    store,
    // data:{
    //     driver:store.driver,
    //     session:store.session,
    // },
    computed: {
        session(){return store.state.session},
        driver(){return store.state.driver}
    },
    methods:{
        ...mapActions([
           'save_new_session'
          ]),
        //创建
        create_new_session(driver){
          
        },
 
    }
  })