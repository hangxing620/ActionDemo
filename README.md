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

##### 启动一个REST的api

使用[json-server](https://github.com/typicode/json-server)，启动一个REST的api

```
$ npm install -g json-server
```

开始Json Server

```
$ json-server --watch db.json
```



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

这是vuex的Store的相关配置，其中的[strict](https://vuex.vuejs.org/zh-cn/strict.html)是严格模式

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

而插件createLogger是日志插件用于调试，主要是mutaions的操作调试
![](https://github.com/hangxing620/ActionDemo/blob/master/images/demo1.png)
```javascript
// index.js
// 判断当前环境是开发环境还是生产环境
...
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```
