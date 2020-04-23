export const setLocalStorage = (key, value) => {
  if (!window.localStorage) {
    return null
  }

  try {
    if (typeof value === 'object') {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      console.error('객체 타입의 데이터만 저장이 가능합니다.')
    }
  } catch (e) {
    alert('데이터 저장에 실패하였습니다.')
  }
}

export const getLocalStorage = (key) => {
  if (!window.localStorage) {
    return null
  }

  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (e) {
    alert('데이터 불러오기에 실패하였습니다.')
  }
  return null
}
