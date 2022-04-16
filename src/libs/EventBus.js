export default class EventBus {
  constructor () {
    this.events = {}
  }

  emit (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data)
      })
    }
  }

  on (eventName, fn) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(fn)
  }

  off (eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1)
          break
        }
      };
    }
  }
}

// // 用法
// import EventBus from 'lib/bus.js'
// const $bus = new EventBus()

// // ② 挂载
// // 1.使用provide提供
// app.provide('$bus', $bus)
// // 2.挂载到this上
// app.config.globalProperties.$bus = $bus

// 在 setup 中使用
// const $bus = inject('$bus')
// $bus.emit('ButtonSetup')

// 在其他中使用
// this.$bus.emit('ButtonCreated')
