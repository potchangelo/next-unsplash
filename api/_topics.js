/**
 * API get topics
 * @returns {Promise} Promise of fetch
 */
async function getTopics() {
  let url = `${process.env.NEXT_PUBLIC_API_HOST}/topics`;
  const res = await fetch(url);
  return await res.json();
}

/**
 * API get topic
 * @param {string} slug
 * @param {boolean} includedPhotos
 * @param {(string|number)} photosBeforeId
 * @returns {Promise} Promise of fetch
 */
async function getTopic(slug, includedPhotos = false, photosBeforeId) {
  let url = `${process.env.NEXT_PUBLIC_API_HOST}/topics/${slug}`;

  const params = new URLSearchParams();
  if (includedPhotos) params.set('includedPhotos', '1');
  if (!!photosBeforeId) params.set('photosBeforeId', photosBeforeId);

  const paramsStr = params.toString();
  if (!!paramsStr) url += `?${paramsStr}`;

  const res = await fetch(url);
  return await res.json();
}

export { getTopics, getTopic };
