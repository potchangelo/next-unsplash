async function getUser(key, username, includedPhotos = false, photosBeforeId) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/users/${username}`;

    const params = new URLSearchParams();
    if (!!includedPhotos) params.set('includedPhotos', '1');
    if (!!photosBeforeId) params.set('photosBeforeId', photosBeforeId);

    const paramsStr = params.toString();
    if (!!paramsStr) url += `?${paramsStr}`;

    const res = await fetch(url);
    return await res.json();
}

async function getRandomUsers() {
    const url = `${process.env.NEXT_PUBLIC_API_HOST}/users/`;
    const res = await fetch(url);
    return await res.json();
}

export { getUser, getRandomUsers };