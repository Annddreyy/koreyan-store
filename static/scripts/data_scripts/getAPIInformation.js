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
