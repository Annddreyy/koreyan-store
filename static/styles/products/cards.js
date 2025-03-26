class CardElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML =  `
            <a href="product.html">
                <div class="card" data-signature="popular">
                    <img src="static/images/c42cd8d9c37511ef982d9c937dfb0622_1f630198df1511ef9835cc58cf33996e-500x500.png" alt="">
                    <h3 class="card-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit</h3>
                    <span class="card-price">640 руб.</span>
                </div>
            </a>
        `;
    }
};

customElements.define('product-card', CardElement);
