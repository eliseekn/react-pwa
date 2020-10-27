import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Items from './items';

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            items: [],
            itemId: '',
            itemDescription: '',
            actionText: 'Add item'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleChange(e) {
        this.setState({ itemDescription: e.target.value })
    }

    handleEdit(itemId, itemDescription) {
        this.setState({
            itemId: itemId,
            itemDescription: itemDescription,
            actionText: 'Update item'
        })
    }

    handleSubmit(e) {
        if (this.state.itemDescription === '') {
            alert('Item description can not be empty')
            return
        }

        if (this.state.actionText === 'Add item') {
            fetch('http://localhost:8080/create', {
                method: 'POST',
                body: JSON.stringify({ description: this.state.itemDescription })
            })
            .then(response => response.json())
            .then(data => 
                this.setState({ 
                    items: data,
                    itemDescription: ''
                })
            )
        } else {
            fetch('http://localhost:8080/update', {
                method: 'PUT',
                body: JSON.stringify({ id: this.state.itemId, description: this.state.itemDescription })
            })
            .then(response => response.json())
            .then(data => 
                this.setState({ 
                    items: data,
                    itemId: '',
                    itemDescription: '',
                    actionText: 'Add item'
                })
            )
        }
    }

    handleDelete(itemId) {
        fetch('http://localhost:8080/delete/' . itemId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => this.setState({ items: data }))
    }

    componentDidMount() {
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(data => this.setState({ items: data }));

        /* this.setState({
            items: [
                {
                    'id' : 1,
                    'description': 'Intégrer les API de Orange Money, MTN Momo et Flooz'
                },

                {
                    'id' : 2,
                    'description': 'Démarrer un projet avec jhipster'
                },
            ]
        }) */
    }

    render() {
        return (
            <div className="container my-5 px-5">
                <h1 className="jumbotron text-center">Todo Items</h1>

                <form className="mt-5 mb-3" onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-10">
                            <input type="text" className="form-control" id="item" placeholder="Item description" value={this.state.itemDescription} onChange={this.handleChange} />
                        </div>
                        
                        <div className="form-group col-md-2">
                            <button className="btn btn-primary btn-block">{this.state.actionText}</button>
                        </div>
                    </div>
                </form>

                <Items
                    items={this.state.items}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete} />
            </div>
        )
    }
}

export default App