async function getTopics(key) {
    let url = `${process.env.NEXT_PUBLIC_API_HOST}/topics`;
    const res = await fetch(url);
    return await res.json();
}

async function getTopic(key, uid) {
    const url = `${process.env.NEXT_PUBLIC_API_HOST}/topics/${uid}`;
    const res = await fetch(url);
    return await res.json();
}

export { getTopics, getTopic };