import React, { Component } from 'react'
// eklenenler
import { connect } from "react-redux"
import { Badge, ListGroup, ListGroupItem } from 'reactstrap'
import { bindActionCreators } from 'redux'
import * as categoryActions from "../../redux/actions/categoryActions"
import * as productActions from "../../redux/actions/productActions"

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories()
  }
  //Seçilen kategori fonksiyonu-onclick içinde çağırdık
  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    //categoryId göre ürünleri getir
    this.props.actions.getProducts(category.id);
  }
  render() {
    return (
      <div>
        <h4>
          <Badge  className='form-control' color='info'>
            Kategoriler
          </Badge>
        </h4>
        <ListGroup>
          { // kategorileri getir
            this.props.categories.map(category => (
              <ListGroupItem 
                active={category.id === this.props.currentCategory.id} //seçimi renkli yapma
                onClick={() => this.selectCategory(category)} // butona tıklayınca değiştir
                key={category.id}>
                {category.categoryName}
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    )
  }
}
function mapStateToPros(state) {
  return {
    //seçili kategorileri değiştir
    currentCategory: state.changeCategoryReducer,
    // kategorileri getir
    categories: state.categoryListReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      // kategorileri getir
      getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
      //seçili kategorileri değiştir
      changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch),
      //seçili kategorilere göre ürünleri getir
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
    }
  };
}
//connect-react-redux paketi
export default connect(mapStateToPros, mapDispatchToProps)(CategoryList);


