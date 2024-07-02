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
  if (current && typeof current === 'object') {
    current[lastKey] = value
  }
}
