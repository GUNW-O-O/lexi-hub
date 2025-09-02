export interface FlashcardItem {
  word : string,
  meaning : string
}

interface MongoWord {
  word : string,
  meaning : string,
  _id : string
}
export interface MongoFlashcard {
  author : string,
  createdAt : string,
  type : string,
  flashcards:MongoWord[],
  title: string,
  _id : string
}