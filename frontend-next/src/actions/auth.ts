"use server"
export const signup = async ({email, password}: any) => {
    const payload = JSON.stringify({
        email: email,
        password: password
    });

    try {
        const response = await fetch('http://localhost:3001/user/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};