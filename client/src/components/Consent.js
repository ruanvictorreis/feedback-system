import React, { Component } from 'react';
import $ from 'jquery';
import AlertContainer from 'react-alert';
import { Modal, Segment, Form, Icon, Message, Container } from 'semantic-ui-react';

class Consent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      register: '',
      view: false,
      agreement: false,
      paragraph_1: '',
      paragraph_2: '',
      paragraph_3: '',
      paragraph_4: '',
      paragraph_5: '',
      paragraph_6: '',
      paragraph_7: '',
      paragraph_8: '',
    }

    window.consent = this;
  }

  init(studentRegister) {
    this.setState({ view: true });
    this.setState({ register: studentRegister });
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-1.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_1: txt })
      });

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-2.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_2: txt })
      });

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-3.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_3: txt })
      });

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-4.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_4: txt })
      });

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-5.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_5: txt })
      });

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-6.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_6: txt })
      });

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-7.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_7: txt })
      });

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/agreement/paragraph-8.txt`
    })
      .then((txt) => {
        this.setState({ paragraph_8: txt })
      });
  }

  isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  save() {
    if (!this.isValidEmail(this.state.email)) {
      this.msg.info('Forneça um e-mail válido');
      return;
    }

    if (!this.state.agreement) {
      this.msg.info('Marque o checkbox para aceitar os termos desta pesquisa');
      return;
    }

    var agreement = {
      Name: this.state.name,
      Email: this.state.email,
      Register: this.state.register,
      Acceptance: this.state.agreement,
    };

    this.setState({ view: false });

    $.ajax({
      method: 'POST',
      url: 'http://feedback-logs.azurewebsites.net/api/agreement',
      data: agreement
    });
  }

  toggleCheckBox() {
    this.setState({ agreement: !this.state.agreement })
  }

  handleSubmit = () => {
    const { name, email } = this.state
    this.setState({ name: name, email: email })
    this.save();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    const { name, email } = this.state

    return (
      <div>
        <AlertContainer ref={a => this.msg = a}
          {...{
            offset: 12,
            position: 'bottom left',
            theme: 'light',
            time: 10000,
            transition: 'scale'
          }
          } />

        <Modal
          open={this.state.view}
          style={inlineStyle.modal}
          closeOnEscape={false}
          closeOnRootNodeClick={false}
          size='large'>

          <Modal.Header>
            <Container textAlign='center'>TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO</Container>
          </Modal.Header>

          <Modal.Content>
            <Message>
              <Container textAlign='justified'>
                <p> {this.state.paragraph_1} </p>
                <p> {this.state.paragraph_2} </p>
                <p> {this.state.paragraph_3} </p>
                <p> {this.state.paragraph_4} </p>
                <p> {this.state.paragraph_5} </p>
                <p> {this.state.paragraph_6} </p>
                <p> {this.state.paragraph_7} </p>
              </Container>
            </Message>

            <Segment>
              <Form unstackable size='big' onSubmit={this.handleSubmit}>

                <Form.Group widths={2}>
                  <Form.Input required label='Nome' placeholder='Nome'
                    name='name' value={name}
                    onChange={this.handleChange} />

                  <Form.Input required label='E-mail' placeholder='E-mail'
                    iconPosition='left'
                    name='email'
                    value={email}
                    onChange={this.handleChange}>
                    <Icon name='at' />
                    <input />
                  </Form.Input>
                </Form.Group>

                <Form.Checkbox checked={this.state.agreement}
                  label={this.state.paragraph_8}
                  onChange={this.toggleCheckBox.bind(this)} />
                <Form.Button positive content='Enviar' />

              </Form>
            </Segment>

          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default Consent