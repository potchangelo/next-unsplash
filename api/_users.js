export async function getUser(key, username, includedLatestPhotos = true) {
    let url = `http://localhost:8080/users/${username}`;
    if (!!includedLatestPhotos) url += `?latestPhotos=1`;
    console.log(url);
    const res = await fetch(url);
    return await res.json();
}

export async function getUserPhotos(key, username, beforeId) {
    let url = `http://localhost:8080/users/${username}/photos`;
    if (!!beforeId) url += `?beforeId=${beforeId}`;
    console.log(url);
    const res = await fetch(url);
    return await res.json();
}

export async function getRandomUsers() {
    const url = 'http://localhost:8080/users/';
    console.log(url);
    const res = await fetch(url);
    return await res.json();
}