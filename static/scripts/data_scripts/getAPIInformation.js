const baseAPIUrl = 'https://koreyan-store-api-andrey2211.amvera.io/api/v1';

export async function getProducts() {
    const response = await fetch(`${baseAPIUrl}/products`);
    if (response.ok) {
        return await response.json();
    }
}

export async function getProduct(id) {
    const response = await fetch(`${baseAPIUrl}/products/${id}`);
    if (response.ok) {
        return await response.json();
    }
}

export async function getUsersData() {
    const response = await fetch(`${baseAPIUrl}/users`);
    if (response.ok) {
        return await response.json();
    }
}

export async function getUserData(id) {
    const response = await fetch(`${baseAPIUrl}/users/${id}`);
    if (response.ok) {
        return await response.json();
    }
}

export async function registration(email, password) {
    let response = await fetch(`${baseAPIUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: email,
            password: password
        })
    });
    if (response.ok) {
        return await response.json();
    }
}

export async function addProduct(title, shortDescription, year, 
    description, price, amount, producer,
    mainImage, productTypeId
) {
    let response = await fetch(`${baseAPIUrl}/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            'short-description': shortDescription,
            year,
            description,
            price,
            amount, 
            producer,
            'main-image': mainImage,
            'mini-image': mainImage,
            'product_type': productTypeId
        })
    });
    if (response.ok) {
        console.log( 'ok' );
    };
};
