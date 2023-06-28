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
