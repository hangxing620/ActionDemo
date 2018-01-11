# vuexDemo

> 使用vuex保存收藏的文章信息

## vuex如何使用


Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态，所以就在state.js使用一个对象作为唯一的数据源


##### vuex 目录，一般拆分下面的文件结构，会更规范点

```
|-- src
    |-- store
        |-- actions.js
        |-- getters.js
        |-- index.js
        |-- mutations.js
        |-- mutations-type.js
        |-- state.js

```

##### 使用常量替代 Mutation 事件类型
```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```


vuex提供了辅助函数，为了一个组件获取多个状态，所以在获取状态的时候，都是使用vuex提供的辅助函数
比如[mapGetters](https://vuex.vuejs.org/zh-cn/getters.html), [mapActions](https://vuex.vuejs.org/zh-cn/actions.html), [mapMutations](https://vuex.vuejs.org/zh-cn/mutations.html)


代码中使用了[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)
```javascript
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapGetters({
    // ...
  })
}
```

## 项目例子讲解


数据源里面的属性有收藏的文章列表和文章对象

```javascript
// state.js

import { loadCollectArticles } from 'common/js/cache'

const state = {
  articles: loadCollectArticles(),
  article: {}
}

export default state

```

其中，收藏的文章列表保存在localStorage里面

```javascript
// cache.js
import storage from 'good-storage'
const COLLECT_KEY = '__collect__'

export function loadCollectArticles() {
  return storage.get(COLLECT_KEY, [])
}

```
