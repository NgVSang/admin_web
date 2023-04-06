import { FormComponent } from "@/types/form"

export const groupItem = (arr: FormComponent[], deep: number = 0) => {
  const res: any[] = []
  let isNested = false

  for (let i = 0; i < arr.length; ++i) {
    let j = i + 1
    while (j < arr.length && arr[i].group?.[deep] === arr[j].group?.[deep]) {
      if (!isNested) {
        isNested = arr[i]?.group !== arr[j]?.group
      }
      j++
    }

    if (!isNested || i === j - 1) {
      res.push(arr.slice(i, j))
    } else {
      const _arr = arr.slice(i, j)
      res.push(groupItem(_arr, deep + 1))
    }
    i = j - 1
  }

  return res
}
