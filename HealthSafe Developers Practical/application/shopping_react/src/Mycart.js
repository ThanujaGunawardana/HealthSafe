import React, {Component} from 'react';
import {Col, ListGroup, Row} from "react-bootstrap";

class Mycart extends Component {

    constructor() {
        super();
        this.state = {
            myCart:[]
        }
    }

    componentDidMount() {
        console.log(localStorage.getItem('list'))

        if(localStorage.getItem('list')){
            this.setState({
                myCart : JSON.parse(localStorage.getItem('list'))

            })
        }

    }

    getSum = () => {
        console.log(this.state.myCart.length)
        let sum = 0
        for(let i = 0; i <this.state.myCart.length; i++){
            sum = sum + this.state.myCart[i].price
            console.log(sum)
        }
        return sum
    }

    render() {
        return (
            <ListGroup>
            {
                    this.state.myCart.map(val => {
                        return  <ListGroup.Item key={val.id} variant="primary" className='w-50'>
                            <Row>
                                <Col>
                                     Name : <strong>{val.name}</strong>
                                </Col>
                                <Col>
                                    Quantity : <strong>  {val.count} </strong>
                                </Col>
                                <Col>
                                    Total - <strong> {val.price}</strong>
                                </Col>
                            </Row>
                               </ListGroup.Item>
                    })
                }
                <ListGroup.Item><p className='w-50'>Total <strong>{this.getSum()}</strong></p></ListGroup.Item>
            </ListGroup>
        );
    }
}

export default Mycart;
