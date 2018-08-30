import React, { Component } from 'react';
import $ from 'jquery';
import AlertContainer from 'react-alert';
import { Modal, Header, Button, Form, Container } from 'semantic-ui-react';

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      register: '',
      assignment: '',
      answer: '',
      condition: 0,
      survey: {},
      close: false,
      view: false,
    }

    window.survey = this;
  }

  init(props) {
    this.setState({ register: props.register });
    this.setState({ assignment: props.assignment });
    this.setState({ condition: props.condition });
    this.setupFirstSurvey();

    setTimeout(() => {
      this.setState({ view: true });
    }, 500);
  }

  setupFirstSurvey() {
    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/survey/assertion-1.txt`
    })
      .then((txt) => {
        const condition = this.state.condition;
        const tool = this.getTool(condition);
        const assertion = txt.replace('{0}', tool);
        const survey = {
          assertion: assertion,
          type: 'learningSurvey'
        };

        this.setState({ survey: survey });
        this.setState({ answer: '' });
        this.setState({ close: false });
      });
  }

  setupSecondSurvey() {
    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/survey/assertion-2.txt`
    })
      .then((txt) => {
        const condition = this.state.condition;
        const tool = this.getTool(condition);
        const assertion = txt.replace('{0}', tool);
        const survey = {
          assertion: assertion,
          type: 'fixingSurvey'
        };

        this.setState({ survey: survey });
        this.setState({ answer: '' });
        this.setState({ close: true });
      });
  }

  getTool(condition) {
    switch (condition) {
      case 1:
        return 'Teste';
      case 2:
        return 'CLARA';
      case 3:
        return 'Python Tutor';
      default:
        return 'Feedback';
    }
  }

  saveSurveyResult() {
    if (!this.state.answer) {
      this.msg.info('Selecione uma das possíveis respostas para esta pergunta');
      return;
    }

    var survey = {
      Register: this.state.register,
      Assignment: this.state.assignment,
      Condition: this.state.condition,
      Answer: this.state.answer,
    };

    if (this.state.close) {
      this.setState({ view: false });
      window.feedback.startSuggestion();
      this.setupFirstSurvey();
    } else {
      this.setupSecondSurvey();
    }

    $.ajax({
      method: 'POST',
      url: `http://feedback-logs.azurewebsites.net/api/${this.state.survey.type}`,
      data: survey
    });
  }

  handleChange = (e, { answer }) => this.setState({ answer })

  closeSurvey = () => this.saveSurveyResult();

  render() {
    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    const { answer } = this.state

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

        <Modal open={this.state.view}
          style={inlineStyle.modal}
          closeOnEscape={false}
          closeOnRootNodeClick={false}>
          <Header icon='question circle outline' content='Survey' />

          <Modal.Content>
            <Container textAlign='center'>
              <h2>{this.state.survey.assertion}</h2>
            </Container>

            <br />

            <Form>
              <Form.Group grouped>
                <Form.Radio
                  label='Sim'
                  answer='SIM'
                  checked={answer === 'SIM'}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Não'
                  answer='NÃO'
                  checked={answer === 'NÃO'}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='Não se aplica (marque esta opção caso nenhum feedback tenha sido utilizado)'
                  answer='NÃO SE APLICA'
                  checked={answer === 'NÃO SE APLICA'}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content="Enviar" onClick={this.closeSurvey} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Survey