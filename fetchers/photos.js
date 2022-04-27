const apiHost = process.env.NEXT_PUBLIC_API_HOST;

/**
 * @param {(string|number)} [beforeId]
 */
async function getPhotos(beforeId) {
  let url = `${apiHost}/photos`;
  if (!!beforeId) url += `?beforeId=${beforeId}`;
  const res = await fetch(url);
  return await res.json();
}

/**
 * @param {string} uid
 */
async function getPhoto(uid) {
  const url = `${apiHost}/photos/${uid}`;
  const res = await fetch(url);
  return await res.json();
}

async function getRandomPhoto() {
  const url = `${apiHost}/photos/random`;
  const res = await fetch(url);
  return await res.json();
}

export { getPhotos, getPhoto, getRandomPhoto };
