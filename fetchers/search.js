const apiHost = process.env.NEXT_PUBLIC_API_HOST;

/**
 * @param {string} q
 * @param {(string|number)} [beforeId]
 */
async function searchPhotos(q, beforeId) {
  let url = `${apiHost}/search/photos?q=${q}`;
  if (!!beforeId) url += `&beforeId=${beforeId}`;
  const res = await fetch(url);
  return await res.json();
}

/**
 * @param {string} q
 */
async function searchUsers(q) {
  let url = `${apiHost}/search/users?q=${q}`;
  const res = await fetch(url);
  return await res.json();
}

export { searchPhotos, searchUsers };
