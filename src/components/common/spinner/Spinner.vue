<template>
  <div id="overlay" v-show="showSpinner">
    <img src="./loader.gif" alt="Loading" /><br/>
  </div>
</template>

<script>

export default {
  name: 'spinner',
  props: ['showSpinner']
}

</script>

<style>
    #overlay {
        background: #ffffff;
        opacity: 0.8;
        color: #666666;
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: 5000;
        top: 0;
        left: 0;
        float: left;
        text-align: center;
        padding-top: 15%;
    }
</style>
