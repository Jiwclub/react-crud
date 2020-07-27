import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/transactionActions'
import { bindActionCreators } from "redux"

import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "react-datepicker/dist/react-datepicker.css";

import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

class TransactionForm extends Component {
    state = {
        ...this.returnStateObject()
    }


    returnStateObject() {
        if (this.props.currentIndex === -1) {
            return {
                prefix: '',
                firstname: '',
                lastname: '',
                startDate: new Date(),
                nationality: '',
                citizen: '',
                gender: '',
                phonenumber: '',
                salary: '',
                passport: '',
            }
        } else {
            return this.props.list[this.props.currentIndex]
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list.length != this.props.list.length) {
            this.setState({ ...this.returnStateObject() })
        }
    }


    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    handleChangeSelect = e => {
        this.setState({ nationality: e.target.value })
    }
    handleChangePrefex = e => {
        this.setState({ prefix: e.target.value })
    }
    handleGender = e => {
        this.setState({ gender: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.props.currentIndex == -1)
            this.props.insertTransaction(this.state)
        else
            this.props.updateTransaction(this.state)
        // this.props.onAddOrEdit(this.state)
    }




    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-container">
                        <div>
                            <label>TiHe</label>
                            <select value={this.state.prefix} onChange={this.handleChangePrefex}>
                                <option name="prefix" value="mr">Mr.</option>
                                <option name=" prefix" value="miss">miss</option>
                            </select>
                        </div>
                        <div>
                            <label>Fist Name</label>
                            <input
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div>
                            <label>List Name</label>
                            <input
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Birthday</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                dateFormat="MM/dd/yyyy"
                                isClearable
                                showYearDropdown
                            />
                        </div>
                        <div>
                            <label>nationality</label>
                            <select
                                value={this.state.nationality}
                                onChange={this.handleChangeSelect}
                            >
                                <option value="thai" name="nationality">thai</option>
                                <option value="loa" name="nationality">loa</option>
                            </select>
                        </div>
                        <div>
                            <label>citizen id</label>
                            <input
                                name="citizen"
                                value={this.state.citizen}
                                onChange={this.handleInputChange}
                            ></input>
                        </div>

                        <div value={this.state.gender} onChange={this.handleGender}>
                            <input type="radio" value="Male" name="gender" /> Male
                    <input type="radio" value="Female" name="gender" /> Female
                    <input type="radio" value="Other" name="gender" /> Other
                </div>

                        <div>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={this.state.phonenumber}
                                onChange={phonenumber => this.setState({ phonenumber })}
                            />
                        </div>
                        <div>
                            <label>Pass port No.</label>
                            <input
                                name="passport"
                                value={this.state.passport}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Expected Salary:</label>
                            <input

                                name="salary"
                                value={this.state.salary}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button type="submit" className="button primary">
                            Submit
            </button>

                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction: actions.insert,
        updateTransaction: actions.update
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm)