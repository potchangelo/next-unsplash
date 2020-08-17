async function getPhotos(key, beforeId) {
    let url = 'http://localhost:8080/photos';
    if (!!beforeId) url += `?beforeId=${beforeId}`;
    console.log(url)
    const res = await fetch(url);
    return await res.json();
}

async function getPhoto(key, uid) {
    const url = `http://localhost:8080/photos/${uid}`;
    console.log(url)
    const res = await fetch(url);
    return await res.json();
}

async function getRandomPhoto(key) {
    const url = `http://localhost:8080/photos/random`;
    console.log(url)
    const res = await fetch(url);
    return await res.json();
}

export { getPhotos, getPhoto, getRandomPhoto };