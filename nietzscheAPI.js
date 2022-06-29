export const getTitles = async () => {
  const response = await fetch('http://localhost:1844/api/titles-all')
  const results = await response.json()
  return results
}

export const getTranslators = async (book) => {
  if (book.trim() === '') return []

  const response = await fetch(`http://localhost:1844/api/translations/${book}`)
  const results = await response.json()
  return results
}
