import React, {Component} from 'react';
import style from 'components/Form.scss';

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
        disabled: true,
    }

    render(){

        return (
            <div className={style.container}>
                <h2>{this.state.general.title}</h2>

                <div className={style.box}>
                    <h2 className={style.boxTitle}>{this.state.general.heading}</h2>
                    <form action="">
                        <div className={style.formGroup}>
                            <input type="text" placeholder={this.state.general.placeholders[0]} />
                            <input type="password" placeholder={this.state.general.placeholders[1]} />
                        </div>
                        <button className={style.btn} disabled={this.state.enabled}>Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default Form;