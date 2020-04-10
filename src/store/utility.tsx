export const updateObject = (oldObj: any, updateObj: any) => {
  return {
    ...oldObj,
    ...updateObj
  }
}