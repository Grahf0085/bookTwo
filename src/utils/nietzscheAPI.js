export const fetchTitles = async () => {
  const response = await fetch('http://localhost:1844/api/titles-all')
  const results = await response.json()
  return results
}

export const fetchTranslators = async (book) => {
  if (book.trim() === '') return []

  const response = await fetch(`http://localhost:1844/api/translations/${book}`)
  const results = await response.json()
  return results
}

export const fetchBookInfo = async (book) => {
  if (book.trim() === '') return []

  const response = await fetch(`http://localhost:1844/api/book-info/${book}`)
  const results = await response.json()
  return [results]
}

export const fetchBookChapters = async (book) => {
  if (book.trim() === '') return []

  const response = await fetch(`http://localhost:1844/api/chapter-info/${book}`)
  const results = await response.json()
  return results
}

export const fetchChapterParagraphs = async (bookAndChapter) => {
  const book = bookAndChapter[0]
  const chapter = bookAndChapter[1]

  if (book.trim() === '') return []

  const response = await fetch(
    `http://localhost:1844/api/paragraphs-info/${book}/${chapter}`
  )
  const results = await response.json()
  return results
}
