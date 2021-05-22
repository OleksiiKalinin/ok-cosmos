import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Logo from './components/Logo/Logo';
import Modal from './components/Modal/Modal';

function App({isOpenModal}) {
  return (
    <div className="App">
      <Logo />
      <Content />
      <Footer />
      {isOpenModal && <Modal />}
    </div>
  );
}

const mapStateToProps = state => ({
  isOpenModal: state.modal.isOpen
});

export default connect(mapStateToProps)(App);
