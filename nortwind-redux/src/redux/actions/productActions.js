
import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
    return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products }
}
export function createProductsSuccess(products) {
    return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: products }
}
export function updateProductsSuccess(products) {
    return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: products }
}
//Create İşlemi
export function saveProductApi(product) {
    return fetch("http://localhost:3000/products/" + (product.id || ""), {
        //Gönderilen product'ın id var ise PUT 
        //id yoksa POST işlemi
        method: product.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(handleResponse)
        .catch(handleError);
}
export function saveProduct(product) {
    //dispatch = api adresi
    return function (dispatch) {
        return saveProductApi(product).then(savedProduct => {
            product.id
                //Gönderilen product'ın id var ise PUT 
                ? dispatch(updateProductsSuccess(savedProduct))
                //id yoksa POST işlemi
                : dispatch(createProductsSuccess(savedProduct))
        }).catch(error => { throw error })
    }
}
export async function handleResponse(response) {
    if (response.ok) {
        return response.json()
    }
    const error = await response.text()
    throw new Error(error)
}
export function handleError(error) {
    throw error;
}
export function getProducts(categoryId) {
    return function (dispatch) {
        let url = " http://localhost:3000/products";
        //categoryId göre ürünleri getir
        if (categoryId) {
            url = url + "?categoryId=" + categoryId
        }
        return fetch(url)
            .then(response => response.json())
            .then(result => dispatch(getProductsSuccess(result)))
    }
}

