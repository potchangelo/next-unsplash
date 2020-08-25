async function getPhotos(key, beforeId) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/photos`;
    if (!!beforeId) url += `?beforeId=${beforeId}`;
    const res = await fetch(url);
    return await res.json();
}

async function getPhoto(key, uid) {
    const url = `${process.env.NEXT_PUBLIC_API_HOST}/photos/${uid}`;
    const res = await fetch(url);
    return await res.json();
}

async function getRandomPhoto(key) {
    const url = `${process.env.NEXT_PUBLIC_API_HOST}/photos/random`;
    const res = await fetch(url);
    return await res.json();
}

export { getPhotos, getPhoto, getRandomPhoto };