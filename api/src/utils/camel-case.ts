export function camelCase(data: any) {
  const parsedData = data.length ? data : [data]
  const result = parsedData.map((object: any) => {
    const entries = Object.entries(object).map(([key, value]) => {
      let camelCaseKey = ''
      let currentIndex = 0
      let printNextAlphabet = true
      for (const str of key) {
        if (str == '_') {
          const alphabetAfterSnake = currentIndex + 1
          camelCaseKey += String(key[alphabetAfterSnake]).toUpperCase()
          printNextAlphabet = false
        } else if (printNextAlphabet) {
          camelCaseKey += str
        } else if (!printNextAlphabet) {
          printNextAlphabet = true
        }
        currentIndex += 1
      }
      return [camelCaseKey, value]
    })
    return Object.fromEntries(entries)
  })

  return data.length ? result : result[0]
}

export function snakeCase(data: any) {
  const parsedData = data.length ? data : [data]
  const result = parsedData.map((object: any) => {
    const entries = Object.entries(object).map(([key, value]) => {
      let snakeCase = ''
      let currentIndex = 0
      for (const str of key) {
        if (/^[A-Z]$/.test(str)) {
          snakeCase += String(str).toLowerCase().padStart(2, '_')
        } else {
          snakeCase += str
        }
        currentIndex += 1
      }
      return [snakeCase, value]
    })
    return Object.fromEntries(entries)
  })

  return data.length ? result : result[0]
}
