async function getUser(key, username, includedLatestPhotos = true) {
    let url = `http://localhost:8080/users/${username}`;
    if (!!includedLatestPhotos) url += `?latestPhotos=1`;
    const res = await fetch(url);
    return await res.json();
}

async function getUserPhotos(key, username, beforeId) {
    let url = `http://localhost:8080/users/${username}/photos`;
    if (!!beforeId) url += `?beforeId=${beforeId}`;
    const res = await fetch(url);
    return await res.json();
}

async function getRandomUsers() {
    const url = 'http://localhost:8080/users/';
    const res = await fetch(url);
    return await res.json();
}

export { getUser, getUserPhotos, getRandomUsers };