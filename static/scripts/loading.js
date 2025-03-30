function setLoading() {
    const loading = document.querySelector('.loading');
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => loading.remove(), 1000));
}

export default setLoading;
