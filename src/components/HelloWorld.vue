<template>
  <div class="hello">
    <div class="total">
      <span class="collect" @click="deleteArticles">删除所有收藏的文章</span>
    </div>
    <ul class="news">
      <li class="item" @click="selectArticle(item)" v-for="item in news" :key="item.id">
        <div class="title"><span class="id">{{item.id}}</span>&nbsp;{{item.title}}</div>
        <div class="other">
          <span class="author">作者：{{item.author}}</span>
          <span class="collect" @click.stop="collect(item)">收藏</span>
        </div>
      </li>
    </ul>
    <p class="collected">收藏的文章</p>
    <ul class="news">
      <li class="item" @click="selectArticle(item)" v-for="item in articles" :key="item.id">
        <div class="title"><span class="id">{{item.id}}</span>&nbsp;{{item.title}}</div>
        <div class="other">
          <span class="author">作者：{{item.author}}</span>
        </div>
      </li>
    </ul>
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask :text="toastText" :position="position"></toast>
  </div>
</template>

<script>
import { getPosts } from 'api/post'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Toast } from 'vux'

export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters([
      'articles'
    ])
  },
  data () {
    return {
      news: [],
      toastText: '',
      showPositionValue: false,
      position: 'middle'
    }
  },
  created() {
    this._getNews()
  },
  methods: {
    selectArticle(item) {
      this.setArticle(item)
      this.$router.push({
        path: '/detail'
      })
    },
    _getNews() {
      getPosts().then((data) => {
        this.news = data
      })
    },
    collect(artice) {
      const beforeLen = this.articles.length
      this.saveArticle(artice)
      .then(() => {
        if (beforeLen === this.articles.length) {
          this.showPositionValue = true
          this.toastText = '已收藏过该文章'
        }
      })
    },
    ...mapActions([
      'saveArticle',
      'deleteArticles'
    ]),
    ...mapMutations({
      setArticle: 'SET_ARTICLE'
    })
  },
  components: {
    Toast
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.news .item {
  display: block;
  padding-bottom: 10px;
  border-bottom: 1px solid #673ab7;
}
.item .title {
  text-align: left;
  padding: 10px 0
}
.item .other {
  text-align: left;
  position: relative;
}
.item .other span {
  display: inline-block;
}
.item .collect {
  position: absolute;
  right: 0;
  background: #673ab7;
  color: #fff;
  padding: 4px 10px;
}
.total {
  text-align: left;
}
.total .collect {
  background: #673ab7;
  color: #fff;
  padding: 4px 10px;
}
</style>
