async function searchPhotos(q, beforeId) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/search/photos?q=${q}`;
    if (!!beforeId) url += `&beforeId=${beforeId}`;
    const res = await fetch(url);
    return await res.json();
}

async function searchUsers(q) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/search/users?q=${q}`;
    const res = await fetch(url);
    return await res.json();
}

export { searchPhotos, searchUsers };