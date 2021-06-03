import React, {Component} from 'react';

class AddProduct extends Component {

    constructor() {
        super();
        this.state = {
            pname: '',
            stock: '',
            price:'',
            imageFile: null,
            image:''

        }

        this.ChangeEventFn =  this.ChangeEventFn.bind(this);
        this.addFile =  this.addFile.bind(this);
    }

    ChangeEventFn = (event) => {
        this.setState({
                [event.target.name]: event.target.value,
            }
        )

    }

    addFile = (e) => {
        this.setState({
            imageFile: e.target.files[0],
            image: 'http://localhost/test/uploads/' + e.target.files[0].name,
        }, () => console.log(this.state.image))
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {pname, price, stock,imageFile, image} = this.state

        let formData = new FormData()
        formData.append('name', pname)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('imageFile', imageFile)
        formData.append('image', image)

        fetch('http://localhost/test/api/insert', {
            method: 'post',
            body:formData
        }).then( res => this.props.history.push('/list')

        ).catch( err => this.props.history.push('/list'))

    }

    render() {
        const {ChangeEventFn, addFile, onSubmit} = this
        return (
            <div>
                <h2>Add Product</h2>
                <form onSubmit={onSubmit} className='m-5'>
                    <div className='m-2'>
                        <label className='m-1'>Product Name</label>
                        <input type='text' name='pname' onChange={ChangeEventFn}/>
                    </div>

                    <div  className='m-2'>
                        <label className='m-1'>Price</label>
                        <input type='text' name='price' onChange={ChangeEventFn}/>
                    </div>

                    <div  className='m-2'>
                        <label className='m-1'>Stock</label>
                        <input type='text' name='stock' onChange={ChangeEventFn}/>
                    </div>

                    <div  className='m-2'>
                        <label className='m-1'>Image</label>
                        <input type='file' name='imageFile' onChange={addFile}/>
                    </div>

                    <div  className='m-2'>
                        <input className='btn-success' type='submit' />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;
