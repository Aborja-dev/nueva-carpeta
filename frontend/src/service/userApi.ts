export const fetchRegister = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    const res = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });
    return await res.json();
}

export const fetchLogin = async ({ email, password }: { email: string, password: string }): Promise<{
    id: string,
    name: string,
    type: "USER" | "ADMIN" | "ORGANIZER" | "CANDIDATE",
    token: string
}> => {
    const res = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return await res.json();
}