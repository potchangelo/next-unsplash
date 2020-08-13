export async function getUser(key, username) {
    const url = `http://localhost:8080/users/${username}`;
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