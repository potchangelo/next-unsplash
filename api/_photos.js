/**
 * API get photos
 * @param {(string|number)} beforeId
 * @returns {Promise} Promise of fetch
 */
async function getPhotos(beforeId) {
  let url = `${process.env.NEXT_PUBLIC_API_HOST}/photos`;
  if (!!beforeId) url += `?beforeId=${beforeId}`;
  const res = await fetch(url);
  return await res.json();
}

/**
 * API get photo
 * @param {string} uid
 * @returns {Promise} Promise of fetch
 */
async function getPhoto(uid) {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/photos/${uid}`;
  const res = await fetch(url);
  return await res.json();
}

/**
 * API get random photo
 * @returns {Promise} Promise of fetch
 */
async function getRandomPhoto() {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/photos/random`;
  const res = await fetch(url);
  return await res.json();
}

export { getPhotos, getPhoto, getRandomPhoto };
