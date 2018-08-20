import React, { Component } from 'react';
import $ from 'jquery';
import AlertContainer from 'react-alert';
import { Modal, Header, Button, Form, Container } from 'semantic-ui-react';

class Suggestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      register: '',
      feedback: '',
      suggestionView: false,
    }

    window.suggestion = this;
  }

  init(info) {
    this.setState({ register: info.register });

    if (info.counter === 3) {
      this.setState({ suggestionView: true });
    } else {
      this.msg.success('Prossiga para o próximo exercício');
    }
  }

  saveSuggestionResult() {
    if (!this.state.feedback) {
      this.msg.info('Escreva alguma sugestão para melhorar nosso sistema.');
      return;
    }

    var suggestion = {
      Register: this.state.register,
      Feedback: this.state.feedback,
    };

    this.setState({ suggestionView: false });
    this.msg.success('Estudo Finalizado. Obrigado!!');

    $.ajax({
      method: 'POST',
      url: 'http://feedback-logs.azurewebsites.net/api/suggestion',
      data: suggestion
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  closeSuggestion = () => this.saveSuggestionResult();

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

        <Modal open={this.state.suggestionView}
          style={inlineStyle.modal}
          closeOnEscape={false}
          closeOnRootNodeClick={false}>
          <Header icon='thumbs up outline' content='Sugestões' />

          <Modal.Content>
            <Container textAlign='left'>
              <h3>Deixe suas sugestões!</h3>
              <h4>Quais mudanças você sugere para melhorar os feedback's abordados neste estudo? Que tipo de feedback você gostaria de ter recebido?</h4>
            </Container>

            <br />

            <Form>
              <Form.TextArea placeholder='Digite aqui...'
                name='feedback'
                value={feedback}
                onChange={this.handleChange} />
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content="Enviar" onClick={this.closeSuggestion} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Suggestion