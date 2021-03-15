<template>
  <div class="child">
    <h1>{{msg}}</h1>
    <section>
      child obj = {{JSON.stringify(objCopy)}}
    </section>
    <section>
      child cloneObj = {{JSON.stringify(cloneObjCopy)}}
    </section>
    <hr>
    <button @click="updateObj">change obj</button>
    <br>
    <button @click="updateCloneObj">change cloneObj</button>
  </div>
</template>

<script>
const getLocalName = () => {
  return window.localStorage.getItem('name');
}

export default {
  name: 'Child',
  props: {
    // msg: String,
    msg: {
      type: String,
      default: '',
      required: true,
    },
    obj: {
      type: Object,
      default: () => ({}),
    },
    cloneObj: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      domReady: false,
      name: window.localStorage.getItem('name'),
      objCopy: {},
      cloneObjCopy: {},
    };
  },
  computed: {
    funcLocalName() {
      console.log('getLocalName =', getLocalName());
      return getLocalName();
    },
    localName() {
      console.log('localName =', window.localStorage.getItem('name'));
      return window.localStorage.getItem('name');
    },
  },
  mounted() {
    this.domReady = true;
    // init
    this.objCopy = this.obj;
    this.cloneObjCopy = this.cloneObj;
  },
  unmounted() {
    this.domReady = false;
  },
  methods: {
    updateObj() {
      this.objCopy.uuid = '008';
    },
    updateCloneObj() {
      this.cloneObjCopy.uuid = 'deep_008';
    },
    mannulName() {
      console.log('mannulName =', window.localStorage.getItem('name'));
      return window.localStorage.getItem('name');
    },
  },
}
</script>

<style scoped>
</style>
