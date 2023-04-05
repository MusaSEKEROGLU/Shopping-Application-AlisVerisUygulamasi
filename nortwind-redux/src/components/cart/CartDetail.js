import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as cartActions from "../../redux/actions/cartActions"
import { Table, Button } from "reactstrap"
import alertify from 'alertifyjs'

class CartDetail extends Component {
  //sepetten ürün sil
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " - ürün silindi")
  }
  render() {
    return (
      <div>
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>Ürün No</th>
              <th>Ürün</th>
              <th>Birim fiyat/TL</th>
              <th>Sipariş Adeti</th>
              <th>Ürünü Sil</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.cart.map(cartItem => (
                <tr key={cartItem.product.id}>
                  <th scope='row'>{cartItem.product.id}</th>
                  <td>{cartItem.product.productName}</td>
                  <td>{cartItem.product.unitPrice}</td>
                  <td>{cartItem.quantity}</td>
                  <td>
                    <Button color='danger' onClick={() => this.removeFromCart(cartItem.product)}>
                      Sil
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
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
