import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { subscribe } from './store/actions/subscription'

class App extends Component {

  state = {
    email: '',
    formVisibility: false
  };

  changeEmail = (event) => {
    this.setState({ email: event.target.value});
  };

  toggleForm = () => {
    this.setState(prevState => ({ formVisibility: !prevState.formVisibility }))
  };

  submitForm = (e) => {
    e.preventDefault();
    const { onSubscribe } = this.props;
    const { email } = this.state;

    onSubscribe(email);
  };

  render() {
    const { email, formVisibility } = this.state;
    const { success } = this.props;

    return (
      <div className="App">
        <div className="form-wrapper">
          {success
            ? <span data-testid="success-msg" className="success-msg">Спасибо за подписку</span>
            : !formVisibility
              ? (<div>
                  <button className='btn_primary subscribe-btn' onClick={this.toggleForm} data-testid="subscribe">Подписаться на рассылку</button>
                </div>)
              : (<form data-testid="subscribe-form" className='subscribe-form'>
                  <input data-testid="subscribe-input" type="email" placeholder="Введите e-mail" value={email} onChange={this.changeEmail}/>
                  <button data-testid="subscribe-submit" className='btn_primary' onClick={this.submitForm}>Отправить</button>
                  <button className='btn_default' onClick={this.toggleForm}>Отмена</button>
                </form>)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  const { success } = state.subscription;

  return { success };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubscribe: (email) => dispatch(subscribe(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
