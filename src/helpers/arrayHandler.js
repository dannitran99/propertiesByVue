import { FILTER_NEWS } from '@/consts/label'

export const removeElFromArr = (arr, el) => {
  const index = arr.indexOf(el)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export const checkArrHasElArr = (arr1, arr2) => {
  return arr1 && arr1.every(el => {
    return arr2.includes(el)
  })
}

export const cloneDeep = (arr) => {
  return JSON.parse(JSON.stringify(arr))
}

export function setNestedProperty(obj, path, value) {
  const keys = path.split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current && typeof current === 'object') {
      const match = key.match(/(\w+)(?:\[(\d+)\])?/)
      if (match) {
        const propName = match[1]
        const index = match[2] ? parseInt(match[2], 10) : undefined
        current = current[propName]
        if (index !== undefined && Array.isArray(current)) {
          current = current[index]
        }
      } else {
        current = current[key]
      }
    } else {
      // Handle invalid paths
      return
    }
  }

  const lastKey = keys[keys.length - 1]
  const match = lastKey.match(/(\w+)(?:\["(\d+)"\])?/)
  if (current && typeof current === 'object') {
    if (match[2] !== undefined) {
      const propName = match[1]
      const index = match[2] ? parseInt(match[2], 10) : undefined
      current = current[propName]
      if (index !== undefined && Array.isArray(current)) {
        current[index] = value
      }
    } else {
      current[lastKey] = value
    }
  }
}

export function handleNewsTypeRequest(first, last) {
  if (last) return last
  const parent = FILTER_NEWS.find(el => el.value === first)
  if (parent.subItem) {
    return parent.subItem.filter(el => el.value).map(el => el.value).join(',')
  } else return parent.value
}

export function handleNewsRoute(input) {
  let subCategory
  const rootCategory = FILTER_NEWS.find(el => {
    if (el.value === input) {
      return el
    }
    subCategory = el.subItem && el.subItem.find(subEl => subEl.value === input)
    if (subCategory) return el
  })
  return {rootCategory, subCategory}
}
