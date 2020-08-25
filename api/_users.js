async function getUser(key, username, includedLatestPhotos = true) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/users/${username}`;
    if (!!includedLatestPhotos) url += `?latestPhotos=1`;
    const res = await fetch(url);
    return await res.json();
}

async function getUserPhotos(key, username, beforeId) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/users/${username}/photos`;
    if (!!beforeId) url += `?beforeId=${beforeId}`;
    const res = await fetch(url);
    return await res.json();
}

async function getRandomUsers() {
    const url = `${process.env.NEXT_PUBLIC_API_HOST}/users/`;
    const res = await fetch(url);
    return await res.json();
}

export { getUser, getUserPhotos, getRandomUsers };