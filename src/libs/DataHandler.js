export function formatCities (originData) {
  const newList = []
  for (let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) {
    const characterObj = {
      title: String.fromCharCode(i),
      list: []
    }
    const cities = originData.cts.filter(city => city.py.charAt().toUpperCase() === characterObj.title) // 该字母开头的城市
    characterObj.list = cities.map(city => {
      return {
        name: city.nm,
        id: city.id
      }
    })
    // console.log(characterObj)
    newList.push(characterObj)
  }
  return newList
}
