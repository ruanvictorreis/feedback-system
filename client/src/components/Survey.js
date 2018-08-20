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
      condition: 0,
      likert: 0,
      survey: {},
      close: false,
      surveyView: false,
    }

    window.survey = this;
  }

  init(props) {
    this.setState({ register: props.register });
    this.setState({ assignment: props.assignment });
    this.setState({ condition: props.condition });
    this.setupFirstSurvey();

    setTimeout(() => {
      this.setState({ surveyView: true });
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
        this.setState({ likert: 0 });
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
        this.setState({ likert: 0 });
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
    if (!this.state.likert) {
      this.msg.info('Selecione uma das possíveis respostas para esta pergunta');
      return;
    }

    var survey = {
      Register: this.state.register,
      Assignment: this.state.assignment,
      Condition: this.state.condition,
      Likert: this.state.likert,
    };

    if (this.state.close) {
      this.setState({ surveyView: false });
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

  handleChange = (e, { likert }) => this.setState({ likert })

  closeSurvey = () => this.saveSurveyResult();

  render() {
    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    const { likert } = this.state

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

        <Modal open={this.state.surveyView}
          style={inlineStyle.modal}
          closeOnEscape={false}
          closeOnRootNodeClick={false}>
          <Header icon='question circle outline' content='Survey' />

          <Modal.Content>
            <Container textAlign='center'>
              <h2>{this.state.survey.assertion}</h2>
            </Container>

            <br />
            <br />

            <Form>
              <Form.Group inline>
                <Container textAlign='center'>
                  <h4>Discordo Fortemente</h4>
                </Container>

                <Form.Radio
                  label='1'
                  likert={1}
                  checked={likert === 1}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='2'
                  likert={2}
                  checked={likert === 2}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='3'
                  likert={3}
                  checked={likert === 3}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='4'
                  likert={4}
                  checked={likert === 4}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='5'
                  likert={5}
                  checked={likert === 5}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='6'
                  likert={6}
                  checked={likert === 6}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label='7'
                  likert={7}
                  checked={likert === 7}
                  onChange={this.handleChange}
                />

                <Container textAlign='center'>
                  <h4>Concordo Fortemente</h4>
                </Container>
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