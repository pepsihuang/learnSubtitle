<template>
  <div class="demo-link-container">
    <div>
      <p class="demo-title">{{ data.title }}</p>
      <p class="demo-desc">{{ data.desc }}</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "demo-link",
  props: {
    //单一的一个链接的全部内容
    data:{
      title:'',
      desc:'',
      url:''
    }
  },
}
</script>

<style scoped>
.demo-link-container{
  padding: 0.5rem;
  margin: 0.5rem;
  height: 100px;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;

}
.demo-title{
  padding-top: 0rem;
  font-weight: bold;
  font-size: 18px;
}
.demo-desc{
  font-size: 12px;
}
</style>