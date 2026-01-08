export async function registerAdmin({ userName, password, email, phoneNumber }) {
    return fetch("/auth/registration/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, email, phoneNumber }),
    });
}
