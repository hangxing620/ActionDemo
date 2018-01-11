<template lang="html">
  <div class="detail">
    <div class="title">{{article.title}}</div>
    <div class="author">作者： {{article.author}}</div>
    <div class="body">
      {{article.body}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'article'
    ])
  }
}
</script>

<style lang="css">
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 10px;
  right: 10px;
  overflow: auto;
  background: #fff;
  margin: 0;
  padding: 0;
}
.detail .title {
  padding: 10px 0;
  font-size: 24px;
  font-weight: 700;
}
.detail .author {
  border-bottom: 1px solid #673ab7;
  padding: 10px 0;
}
.detail .body {
  padding-top: 20px;
  text-align: left;
  line-height: 30px;
}
</style>
