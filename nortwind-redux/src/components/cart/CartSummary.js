import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, NavItem, NavLink, Badge
} from 'reactstrap';
import * as cartActions from "../../redux/actions/cartActions"
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs'

class CartSummary extends Component {
    removeFromCart(product) {
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " - ürün silindi")
    }
    renderEmptyCart() {
        return (
            <NavItem>
                <NavLink>Sepetiniz Boş!</NavLink>
            </NavItem>
        );
    }
    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Sepetiniz:
                </DropdownToggle>
                <DropdownMenu end >
                    {
                        this.props.cart.map(cartItem => (
                            <DropdownItem
                                key={cartItem.product.id}>
                                <Badge color='danger' onClick={() =>
                                    this.removeFromCart(cartItem.product)}>
                                    Sil
                                </Badge>
                                {cartItem.product.productName}
                                <Badge
                                    color='success'>
                                    {cartItem.quantity}
                                </Badge>
                            </DropdownItem>
                        ))
                    }
                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to={"/cart"}>
                            Sepete Git
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
    render() {
        return (
            <div>
                {this.props.cart.length > 0 ?
                    this.renderSummary() : this.renderEmptyCart()
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
