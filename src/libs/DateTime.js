export function getMonthAndDay () {
  return (timestamp) => {
    const time = new Date(timestamp * 1000)
    return time.getMonth() + 1 + '月' + time.getDate() + '日'
  }
}

export function getWeekday () {
  return (timestamp) => {
    const time = new Date(timestamp * 1000)
    switch (time.getDay()) {
      case 0: return '周日'
      case 1: return '周一'
      case 2: return '周二'
      case 3: return '周三'
      case 4: return '周四'
      case 5: return '周五'
      case 6: return '周六'
    }
  }
}

export function getFullDate () {
  return (timeStamp) => {
    const time = new Date(timeStamp * 1000)
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    return `${year}年${month}月${date}日`
  }
}
