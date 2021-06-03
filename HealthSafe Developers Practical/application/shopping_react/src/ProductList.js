import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";
import Mycart from "./Mycart";
class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            myCart : [],
            id: null,
            count:''
        }
    }

    componentDidMount() {
        this.getData()
        if(localStorage.getItem('list')){
            this.setState({
                myCart : JSON.parse(localStorage.getItem('list'))
            })
        }

    }

    getData = () => {
        axios.get('http://localhost/test/api').then(res => {
            this.setState({list : res.data})
        })
    }

    delete = (id) => {
        let formData = new FormData()
        formData.append('id', id)
        axios.post('http://localhost/test/api/delete', formData).then(res => {
            this.getData()
        })

    }


    setHidden = (id) => {
        return this.state.myCart.some(item => id === item.id);
    }



    selectCount = (e,id) => {
        this.setState({
            id : id,
            count: e
        })
    }

    addTocart = (id,name, price) => {
        let arr = this.state.myCart
        if(id === this.state.id){
            let obj = {
                id: this.state.id,
                count : this.state.count,
                price : this.state.count * price,
                name: name
            }
            arr.push(obj)
        }
        else {
            let obj = {
                id: id,
                count : 1,
                price : 1 * price,
                name: name
            }
            arr.push(obj)
        }

        this.setState({myCart:arr})
        localStorage.setItem('list', JSON.stringify(arr))

    }

    render() {
        return (
            <div className='row'>
                {
                    this.state.list.map(val => {
                        return <Card key={val.id} className='col-auto w-50 m-3 text-center'>
                            <Card.Header>{val.name}</Card.Header>
                            <Card.Title>Rs. {parseFloat(val.price).toFixed(2)}</Card.Title>
                            <Card.Body> <img src={val.image} style={{width: '100px', height: '100px'}} alt='img'/> </Card.Body>
                            <Card.Footer>
                                <button className='float-left btn-danger' onClick={() => this.delete(val.id)}>Delete</button>
                                {val.stock} available
                                <input hidden={this.setHidden(val.id)} defaultValue={1} type='number' className='w-25 float-right' onClick={(e) => this.selectCount(e.target.value, val.id)}/>
                                <button hidden={this.setHidden(val.id)} className='float-right btn-success' onClick={() => this.addTocart(val.id, val.name,  val.price)}>Add to cart</button>
                            </Card.Footer>
                        </Card>

                    })
                }


            </div>
        );
    }
}

export default ProductList;
