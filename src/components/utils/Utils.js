import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import sortBy from 'lodash/fp/sortBy'
import {filter, first, getOr, isEmpty, keys, pick, last, property, findIndex, cond, stubTrue} from "lodash/fp";

const transformTo = data => key => ({ value: data[key], label: key })

export function objectToArray(obj, transform = transformTo) {
    return flow(
        keys,
        map(transform(obj)),
        sortBy(['value'])
    )(obj)
}

export function getWidthByBreakpoint(obj, currentBreakpoint) {
    const list = objectToArray(obj)
    const predicate = index => (index < list.length - 1)
    return flow(
        findIndex(item => item.label === currentBreakpoint),
        index => cond([
            [predicate, _ => list[index + 1].value],
            [stubTrue, _ => 1400]
        ])(index)
    )(list)
}

export function transformToOptions( data, id = 'id', text = 'text'){
   const mapToObject = (id = 'id', text = 'text') => (item) => ({value: item[id], label: item[text]})
   if(Array.isArray(data)){
       return flow(
           map(mapToObject(id,text)),
           sortBy(['value'])
       )(data)
   } else {
      return objectToArray(data)
   }
}

export const hasKeyType = element => {
    if ((element.dataset && !!element.dataset['key'])) {
        return element.dataset['key']
    }
    return false
}


export function closest (el, selector = hasKeyType) {
    if(el) {
        const key = selector(el)
        if (key) {
            return key
        } else if (el.parentElement) {
            return closest(el.parentElement, selector)
        }
    }
    return null
}

export const getCurrentItem = (layout, value) => {
    return(flow(
        filter(item => item.i === value),
        first
    )(layout))
}

export const getBreakpoint = (layouts, obj, currentBreakpoint) => {
    const layout = getOr([], `${currentBreakpoint}`)(layouts)
    if(isEmpty(layout)){
        return flow(
            keys,
            (k) => pick(k)(obj),
            (obj) => objectToArray(obj),
            last,
            property('label'),
            (prop) => getOr([], prop)(layouts)
        )(layouts)
    }
    return layout
}