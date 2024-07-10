import {HISTORY_PROPERTY_ITEM_KEY} from '@/consts/common'

export const handleViewedProperties = (input) => {
  let local = JSON.parse(localStorage.getItem(HISTORY_PROPERTY_ITEM_KEY)) || []
  local = local.filter(item => item.ID !== input.ID)
  local.length === 12 && local.pop()
  local.unshift(input)
  localStorage.setItem(HISTORY_PROPERTY_ITEM_KEY, JSON.stringify(local))
}
