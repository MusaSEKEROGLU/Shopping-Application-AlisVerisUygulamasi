import React, { Component } from 'react'
// eklenenler
import { connect } from "react-redux"
import { Badge, Button } from 'reactstrap'
import * as productActions from "../../redux/actions/productActions"
import * as cartActions from "../../redux/actions/cartActions"
import { bindActionCreators } from 'redux'
import { Table } from "reactstrap"
import alertify from 'alertifyjs'
import { Link } from 'react-router-dom'

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  //sepete ürün ekle
  addToCart = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
    alertify.success(product.productName + " - ürünü eklendi")
  }
  render() {
    return (
      <div>
        <h4>
          <Badge className='form-control' color='info'>
            Ürün Listesi
          </Badge>

          <Badge color='success'>
            {
              //Seçilen kategori fonksiyonunun ismini ürünlere getir
              this.props.currentCategory.categoryName
            }
          </Badge>
        </h4>
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Ürün</th>
              <th>Birim fiyat/TL</th>
              <th>Birim Başına Miktar</th>
              <th>Stoktaki Birimler</th>
              <th>Ürün Ekle</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map(product => (
                <tr key={product.id}>
                  <th scope='row'>{product.id}</th>
                  <td><Link to={"/saveproduct/"+product.id}>{product.productName}</Link></td>
                  <td>{product.unitPrice}</td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitsInStock}</td>
                  <td>
                    <Button color='success' onClick={() => this.addToCart(product)}>
                      Sepete Ekle
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    )
  }
}
function mapStateToPros(state) {
  return {
    //seçili kategoriye göre ürünleri getir
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      // productları getir
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  }
}
//connect-react-redux paketi
export default connect(mapStateToPros, mapDispatchToProps)(ProductList);