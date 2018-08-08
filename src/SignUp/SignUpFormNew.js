import React, {Component} from 'react';
import style from 'components/Form.scss';
import ErrorTag from 'components/Errors';

class Form extends Component {
    // Setup default values and states
    state = {
        general: {
            title: 'Sign Up Form, v2.0',
            heading: 'Sign Up',
            placeholders: [
                'Username',
                'Password'
            ],
        },
        errors: [
            {id:'len', sts:true, msg:'The password should be at least 8 characters long'},
            {id:'lower', sts:true, msg: 'The password should contain at least one lowercase character'},
            {id:'upper', sts:true, msg: 'The password should contain at least one uppercase character'},
            {id:'digit', sts:true, msg: 'The password should contain at least one digit character'},
            {id:'spec', sts:true, msg: 'The password should contain at least one symbol'},
            {id:'min', msg: 'Username minimum length is 3 charaters.'}
        ],
        login: {
            user: '',
            pass: ''
        },
        errorUserMessage: '',
        errorPwdMessage: ''
    }

    handleSubmit = (event) => {
        // Stop automatic submition
        event.preventDefault();

        const errorMessages = [...this.state.errors];
        const indexUsrErr = errorMessages.findIndex(item => {
            return item.id === 'min';
        })    

        // Check for username
        this.state.login.user.length < 3 ? this.setState({errorUserMessage: errorMessages[indexUsrErr].msg}) : this.setState({errorUserMessage:''});

        // Check the password
        this.evalPassword(this.state.login.pass);

    }

    usrChangeHandler = (event) => {
        this.setState({
            login: {
                user: event.target.value
            }
        });
    }

    pwdChangeHandler = (event) => {
        this.setState({
            login: {
                pass: event.target.value
            }
        });
    }

    getErrText = (type) => {
        const errorMessages = [...this.state.errors];
        const indexPwdErr = errorMessages.findIndex(item => {
            return item.id === type;
        });

        return errorMessages[indexPwdErr].msg;
    }

    evalPassword = (value) => {
        // Array of accumulated errors - if any
        const totalErrors = [];
    
        // Check minimum password length
        if (value.length < 8) {
           totalErrors.push(this.getErrText('len'));
        } 

        // Check lower case
        if (!/([a-z])/.test(value)) {
            totalErrors.push(this.getErrText('lower'));
        } 

        // Check upper case
        if (!/([A-Z])/.test(value)) {
            totalErrors.push(this.getErrText('upper'));
        }

        // Check digit
        if (!/([0-9])/.test(value)) {
            totalErrors.push(this.getErrText('digit'));
        } 

        // Check symbol
        if (!/(?=.*?[#?!@$%^&*-+])/.test(value)) {
            totalErrors.push(this.getErrText('spec'));
        }

        this.setState({
            errorPwdMessage: totalErrors
        });
    }

    render(){
        const pwdMessages = [...this.state.errorPwdMessage];

        const pwdErrors = pwdMessages.map((item, index) => {
            return <li key={index}><ErrorTag msg={item} /></li>
        });

        return (
            <div className={style.container}>
                <h2>{this.state.general.title}</h2>

                <div className={style.box}>
                    <h2 className={style.boxTitle}>{this.state.general.heading}</h2>
                    <form action="">
                        <ErrorTag msg={this.state.errorUserMessage}/>
                        <div className={style.formGroup}>
                            <input type="text" placeholder={this.state.general.placeholders[0]} onChange={this.usrChangeHandler}/>
                            <input type="password" placeholder={this.state.general.placeholders[1]} onChange={this.pwdChangeHandler}/>
                        </div>
                        <ul className={style.listErrors}>
                            {pwdErrors}
                        </ul>
                        <button className={style.btn} onClick={this.handleSubmit}>Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default Form;