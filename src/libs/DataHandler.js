// https://i.maoyan.com/api/dianying/cities.json
export function formatMaoyanCities (originData) {
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
    newList.push(characterObj)
  }
  return newList
}

// https://m.maizuo.com/gateway?k=6882711
export function formatMaizuoCities (originData) {
  const newList = []
  for (let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) {
    const characterObj = {
      title: String.fromCharCode(i),
      list: []
    }
    const cities = originData.data.cities.filter(city => city.pinyin.charAt().toUpperCase() === characterObj.title) // 该字母开头的城市
    // console.log(cities)
    characterObj.list = cities.map(city => {
      return {
        name: city.name,
        id: city.cityId
      }
    })
    newList.push(characterObj)
  }
  return newList
}

export function getMaizuoHotCities (originData) {
  return originData.data.cities.filter(city => city.isHot === 1)
}

export function getDistricts (cinemaList) {
  const newList = []
  // const districtIdList = [...new Set(cinemaList.map(cinema => cinema.districtId))]
  cinemaList.sort((prev, next) => {
    return prev.districtId - next.districtId
  })
  for (let index = 0; index < cinemaList.length; index++) {
    const element = cinemaList[index]
    if (newList.length === 0 || newList[newList.length - 1].districtId !== element.districtId) {
      newList.push(element)
    }
  }
  return newList.map(c => {
    return {
      districtId: c.districtId,
      districtName: c.districtName
    }
  })
  // return districtIdList
}
