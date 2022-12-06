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

export const fetchBookInfo = async (bookAndTranslator) => {
  if (bookAndTranslator[0].trim() === '') return []
  const title = bookAndTranslator[0]
  const translator = bookAndTranslator[1]
  const response = await fetch(
    `http://localhost:1844/api/book-info/${title}/${translator}`
  )
  const results = await response.json()
  return [results]
}

export const fetchBookChapters = async (bookAndTranslator) => {
  const title = bookAndTranslator[0]
  const translator = bookAndTranslator[1]
  const response = await fetch(
    `http://localhost:1844/api/chapter-info/${title}/${translator}`
  )
  const results = await response.json()
  return results
}

export const fetchChapterParagraphs = async (bookAndTranslatorAndChapter) => {
  if (bookAndTranslatorAndChapter[0].trim() === '') return []
  const title = bookAndTranslatorAndChapter[0]
  const translator = bookAndTranslatorAndChapter[1]
  const chapter = bookAndTranslatorAndChapter[2]
  const response = await fetch(
    `http://localhost:1844/api/paragraphs-info/${title}/${translator}/${chapter}`
  )
  const results = await response.json()
  return results
}

export const fetchFootnotes = async (
  bookAndTranslatorAndChapterAndParagraph
) => {
  if (bookAndTranslatorAndChapterAndParagraph[0].trim() === '') return []
  const title = bookAndTranslatorAndChapterAndParagraph[0]
  const translator = bookAndTranslatorAndChapterAndParagraph[1]
  const chapter = bookAndTranslatorAndChapterAndParagraph[2]
  const paragraph = bookAndTranslatorAndChapterAndParagraph[3]
  const response = await fetch(
    `http://localhost:1844/api/footnotes/${title}/${translator}/${chapter}/${paragraph}`
  )
  const results = await response.json()
  return results
}
