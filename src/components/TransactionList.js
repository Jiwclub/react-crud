import React, { Component } from 'react'
import TransactionForm from './TransactionForm'
import { connect } from 'react-redux'
import * as actions from '../actions/transactionActions'
import { bindActionCreators } from "redux"

class TransactionList extends Component {
    state = {
        currentIndex: -1,
        list: this.returnList()
    }

    returnList() {
        if (localStorage.getItem('transactions') == null)
            localStorage.setItem('transactions', JSON.stringify([]))
        return JSON.parse(localStorage.getItem('transactions'))
    }

    onAddOrEdit = (data) => {
        let list = this.returnList()
        if (this.state.currentIndex === -1)
            list.push(data)
        else
            list[this.state.currentIndex] = data
        localStorage.setItem('transactions', JSON.stringify(list))
        this.setState({ list, currentIndex: -1 })
    }

    handleEdit = index => {
        this.props.updateTransactionIndex(index)
        // this.setState({
        //     currentIndex: index
        // })
    }

    handleDelete = index => {
        // this.props.deleteTransaction(index)

        this.props.deleteTransaction(index)


        // let list = this.returnList()
        // list.splice(index, 1)
        // localStorage.setItem('transactions', JSON.stringify(list))
        // this.setState({ list, currentIndex: -1 })

    }

    render() {
        return (
            <div>
                <TransactionForm
                    onAddOrEdit={this.onAddOrEdit}
                    currentIndex={this.state.currentIndex}
                    list={this.state.list}
                />
                <hr />
                <table>
                    <tbody>
                        {this.props.list.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.gender}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.nationality}</td>
                                <td><button onClick={() => this.handleEdit(index)}>Edit</button></td>
                                <td><button onClick={() => this.handleDelete(index)}>Delete</button></td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateTransactionIndex: actions.updateIndex,
        deleteTransaction: actions.Delete
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)