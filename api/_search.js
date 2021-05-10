/**
 * API search photos
 * @param {string} q 
 * @param {(string|number)} beforeId 
 * @returns {Promise} Promise of fetch
 */
async function searchPhotos(q, beforeId) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/search/photos?q=${q}`;
    if (!!beforeId) url += `&beforeId=${beforeId}`;
    const res = await fetch(url);
    return await res.json();
}

/**
 * API search users
 * @param {string} q 
 * @returns {Promise} Promise of fetch
 */
async function searchUsers(q) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/search/users?q=${q}`;
    const res = await fetch(url);
    return await res.json();
}

export { searchPhotos, searchUsers };