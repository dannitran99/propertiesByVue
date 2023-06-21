export const removeElFromArr = (arr, el) => {
  const index = arr.indexOf(el)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
