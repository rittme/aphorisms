const loadStorage = () =>
  new Set(JSON.parse(window.localStorage.getItem('bookmarks')));

//let storage = loadStorage();

export const toggleBookmarkItem = item => {
  const storage = loadStorage();
  const has = storage.has(item);
  has ? storage.delete(item) : storage.add(item);
  console.log(item);
  console.log(storage);
  console.log(Array.from(storage));
  window.localStorage.setItem('bookmarks', JSON.stringify(Array.from(storage)));
  return !has;
};

export const isBookmarked = item => {
  const storage = loadStorage();
  return storage.has(item);
};

export const getAllBookmarked = () => {
  const storage = loadStorage();
  return Array.from(storage);
};
