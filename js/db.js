export async function loadServices() {
    const response = await fetch(`db.json?${new Date().getTime()}`);
    return await response.json();
}