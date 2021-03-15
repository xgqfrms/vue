<template>
  <div class="parent">
    <!-- <div>localName = {{localName}}</div>
    <div>funcLocalName = {{funcLocalName}}</div>
    <div>mannulName = {{mannulName()}}</div> -->
    <Child
      :msg="name"
      :obj="obj"
      :cloneObj="deepCloneObj"
    />
    <hr>
    <section>
      <section>
        parent obj = {{JSON.stringify(obj)}}
      </section>
      <section>
        parent cloneObj = {{JSON.stringify(cloneObj)}}
      </section>
      <section>
        parent deepCloneObj = {{JSON.stringify(deepCloneObj)}}
      </section>
    </section>
  </div>
</template>

<script>
// 
import _ from 'lodash';

import Child from './Child.vue'
// const getLocalName = () => {
//   return window.localStorage.getItem('name');
// }

/* eslint-disable no-unused-vars */

// ... your code here with unused vars...

/* eslint-enable no-unused-vars */

export default {
  name: 'Parent',
  components: {
    Child,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      id: 1,
      name: 'eric',
      obj: {
        uuid: '007',
        year: 2021,
      },
      cloneObj: {
        uuid: 'deep_007',
        year: 2048,
      },
    };
  },
  computed: {
    deepCloneObj() {
      return _.cloneDeep(this.cloneObj);
    },
    // funcLocalName() {
    //   console.log('getLocalName =', getLocalName());
    //   return getLocalName();
    // },
    // localName() {
    //   console.log('localName =', window.localStorage.getItem('name'));
    //   return window.localStorage.getItem('name');
    // },
  },
  // beforeCreate() {
  //   window.localStorage.removeItem('name');
  // },
  mounted() {
    // window.localStorage.setItem('name', 'eric');
    // setTimeout(() => {
    //   window.localStorage.setItem('name', 'xgqfrms');
    // }, 3000);
    window.localStorage.setItem('name', this.name);
    // setTimeout(() => {
    //   this.name = 'xgqfrms';
    //   window.localStorage.setItem('name', this.name);
    // }, 3000);
  },
  unmounted() {
    window.localStorage.removeItem('name');
  },
  // destroyed() {
  //   window.localStorage.removeItem('name');
  // },
  methods: {
    updateName() {
      window.localStorage.setItem('name', 'xgqfrms' + Date.now());
      this.name = 'xgqfrms' + Date.now();
      window.localStorage.setItem('name', this.name);
    },
    // mannulName() {
    //   console.log('mannulName =', window.localStorage.getItem('name'));
    //   return window.localStorage.getItem('name');
    // },
  },
}
</script>

<style scoped>
</style>
