function Services() {
    this.getListProduct = function () {
        return axios({
            url: "https://6305b893dde73c0f844a25d3.mockapi.io/QLND",
            method: "GET",
        });
    };
    this.deleteProduct = function (id) {
        return axios({
            url: `https://6305b893dde73c0f844a25d3.mockapi.io/QLND/${id}`,
            method: "DELETE",
        });
    };
    this.addProduct = function (product) {
        return axios({
            url: "https://6305b893dde73c0f844a25d3.mockapi.io/QLND",
            method: "POST",
            data: product,
        });
    };
    this.getProductById = function (id) {
        return axios({
            url: `https://6305b893dde73c0f844a25d3.mockapi.io/QLND/${id}`,
            method: "GET",
        });
    };

    this.updateProduct = function (product) {
        return axios({
            url: `https://6305b893dde73c0f844a25d3.mockapi.io/QLND/${product.id}`,
            method: "PUT",
            data: product,
        });
    };
}