export const getInLocal = key => {
    try {
      const data = localStorage.getItem(key)
      return JSON.parse(data || {})
    } catch (err) {
      return {}
    }
  }
  
  export const setInLocal = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (err) {
      return false
    }
  }