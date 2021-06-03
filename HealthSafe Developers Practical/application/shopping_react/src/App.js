import React, {Component} from 'react';
import {
    Route,
    Link
}  from  'react-router-dom'
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Mycart from "./Mycart";
import Switch from "react-bootstrap/Switch";

class App extends Component {





    render() {

        return (
            <div className='container'>
                <li><Link to="/list">Product List</Link></li>
                <li><Link to="/addProduct">Add Product</Link></li>
                <li><Link to="/cart">My Cart</Link></li>

                <Switch>

                    <Route  path='/addProduct' exact component={AddProduct} />
                    <Route  path='/cart' exact component={Mycart} />
                    <Route  path='/list' exact component={ProductList} />
                </Switch>



            </div>
        );
    }
}

export default App;
