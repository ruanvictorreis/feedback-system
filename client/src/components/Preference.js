import React, { Component } from 'react';
import $ from 'jquery';
import AlertContainer from 'react-alert';
import { Modal, Header, Button, Form, Container } from 'semantic-ui-react';

class Preference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      register: '',
      feedback: '',
      preferenceView: false,
    }

    window.preference = this;
  }

  init(info) {
    this.setState({ register: info.register });
    
    if (info.counter === 3) {
      this.setState({ preferenceView: true });
    } else {
      this.msg.success('Prossiga para o próximo exercício');
    }
  }

  savePreferenceResult() {
    if (!this.state.feedback) {
      this.msg.info('Selecione uma das possíveis respostas para esta pergunta');
      return;
    }

    var preference = {
      Register: this.state.register,
      Feedback: this.state.feedback,
    };

    this.setState({ preferenceView: false });
    this.msg.success('Estudo Finalizado. Obrigado!!');

    $.ajax({
      method: 'POST',
      url: 'http://feedback-logs.azurewebsites.net/api/preference',
      data: preference
    });
  }

  handleChange = (e, { feedback }) => this.setState({ feedback })

  closePreference = () => this.savePreferenceResult();

  render() {
    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    const { feedback } = this.state

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

        <Modal open={this.state.preferenceView}
          style={inlineStyle.modal}
          closeOnEscape={false}
          closeOnRootNodeClick={false}>
          <Header icon='question circle outline' content='Survey' />

          <Modal.Content>
            <Container textAlign='left'>
              <h2>Qual abordagem de feedback você acredita trazer mais benefícios para seu aprendizado de programação?</h2>
            </Container>

            <br />

            <Form>
              <Form.Group grouped>
                <Form.Radio
                  label='Casos de Teste'
                  feedback='Casos de Teste'
                  checked={feedback === 'Casos de Teste'}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='CLARA (correção automática)'
                  feedback='CLARA'
                  checked={feedback === 'CLARA'}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Python Tutor (depuração)'
                  feedback='Python Tutor'
                  checked={feedback === 'Python Tutor'}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content="Enviar" onClick={this.closePreference} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Preference