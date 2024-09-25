"use server"
export const signup = async () => {
    const payload = JSON.stringify({
        email: "z@example.com",
        password: "m134"
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