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
      workCondition: 0,
      likert: 0,
      surveyView: false,
    }

    window.survey = this;
  }

  init(info) {
    this.setState({ register: info.register });
    this.setState({ assignment: info.assignment });
    this.setState({ workCondition: info.workCondition });
    this.setState({ surveyView: true });
  }

  saveSurveyResult() {
    if (!this.state.likert) {
      this.msg.info('Selecione uma das possíveis respostas para esta pergunta');
      return;
    }

    var survey = {
      Register: this.state.register,
      Assignment: this.state.assignment,
      Condition: this.state.workCondition,
      Likert: this.state.likert,
    };

    this.setState({ surveyView: false });

    $.ajax({
      method: 'POST',
      url: 'http://feedback-logs.azurewebsites.net/api/survey',
      data: survey
    });

    this.msg.success('Exercício Finalizado');
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
          <Header icon='question circle outline' content='Questionário' />

          <Modal.Content>
            <Container textAlign='center'>
              <h2>Neste exercício, o quanto o Feedback dado lhe ajudou a solucionar o problema proposto?</h2>
            </Container>

            <br />
            <br />

            <Form>
              <Form.Group inline>
                <Container textAlign='center'>
                  <h4>Não me ajudou a solucionar o problema</h4>
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
                  <h4>Foi essencial para solucionar o problema</h4>
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