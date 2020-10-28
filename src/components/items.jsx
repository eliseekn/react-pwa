import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'

const Item = (props) => {
    const handleEdit = () => {
        props.handleEdit(props.id, props.description)
    }
    
    const handleDelete = () => {
        props.handleDelete(props.id)
    }

    return (
        <li className="list-group-item d-flex flex-md-row flex-column align-items-md-center">
            <div className="mb-md-0 mb-2"><i className="fas fa-dot-circle"></i> {props.description}</div>
            
            <div className="ml-0 ml-md-auto d-flex">
                <button className="btn btn-primary mr-2" onClick={handleEdit}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger" onClick={handleDelete}><i className="fas fa-trash"></i></button>
            </div>
        </li>
    )
}

class Items extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="list-group">
                {
                    this.props.items.map(item => {
                        return (
                            <Item
                                key={item.id}
                                id={item.id}
                                description={item.description}
                                handleEdit={this.props.handleEdit}
                                handleDelete={this.props.handleDelete} />
                        )
                    })
                }
            </ul>
        )
    }
}

export default Items