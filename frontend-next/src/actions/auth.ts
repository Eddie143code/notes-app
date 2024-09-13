"use server"
export const signup = async () => {
    const payload = JSON.stringify({
        email: "g@example.com",
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

        const data = await response.json(); // Corrected method name
        console.log(data); // Log the parsed JSON data
        // localStorage.setItem('user', data)
    } catch (error) {
        console.error('Error:', error);
    }
};


export const sigin = async () => {
    const payload = JSON.stringify({

        email: "e@example.com",
        password: "m134"

    })
    const response = fetch('http://localhost:3001/user/me', {
        method: "POST",
        body: payload
    }).then((res: any) => res.JSON())
    console.log(response)
}