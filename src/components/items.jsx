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
        <li className="list-group-item d-flex align-items-center">
            <span><i className="fa fa-dot-circle"></i> {props.description}</span>
            
            <span className="ml-auto">
                <button className="btn btn-primary mx-3" onClick={handleEdit}><i className="fa fa-edit"></i> Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}><i className="fa fa-trash"></i> Delete</button>
            </span>
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