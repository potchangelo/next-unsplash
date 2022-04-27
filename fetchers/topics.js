const apiHost = process.env.NEXT_PUBLIC_API_HOST;

async function getTopics() {
  let url = `${apiHost}/topics`;
  const res = await fetch(url);
  return await res.json();
}

/**
 * @param {string} slug
 * @param {boolean} [includedPhotos]
 * @param {(string|number)} [photosBeforeId]
 */
async function getTopic(slug, includedPhotos = false, photosBeforeId) {
  let url = `${apiHost}/topics/${slug}`;

  const params = new URLSearchParams();
  if (includedPhotos) params.set('includedPhotos', '1');
  if (!!photosBeforeId) params.set('photosBeforeId', photosBeforeId);

  const paramsStr = params.toString();
  if (!!paramsStr) url += `?${paramsStr}`;

  const res = await fetch(url);
  return await res.json();
}

export { getTopics, getTopic };
