import React, { Component } from 'react';
import $ from 'jquery';
import AlertContainer from 'react-alert';
import { Modal, Header, Button, Container, Grid, Radio } from 'semantic-ui-react';

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
              <h3>{this.state.survey.assertion}</h3>
            </Container>

            <br />
            <br />
            <Grid centered>
              <Grid.Column width={2}>
                <Container textAlign='center'>
                  <h4>Discordo Fortemente</h4>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
                <Container textAlign='center'>
                  <Radio
                    answer='1'
                    checked={answer === '1'}
                    onChange={this.handleChange}
                  />
                  <p>1</p>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
                <Container textAlign='center'>
                  <Radio
                    answer='2'
                    checked={answer === '2'}
                    onChange={this.handleChange}
                  />
                  <p>2</p>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
                <Container textAlign='center'>
                  <Radio
                    answer='3'
                    checked={answer === '3'}
                    onChange={this.handleChange}
                  />
                  <p>3</p>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
                <Container textAlign='center'>
                  <Radio
                    answer='4'
                    checked={answer === '4'}
                    onChange={this.handleChange}
                  />
                  <p>4</p>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
                <Container textAlign='center'>
                  <Radio
                    answer='5'
                    checked={answer === '5'}
                    onChange={this.handleChange}
                  />
                  <p>5</p>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
                <Container textAlign='center'>
                  <Radio
                    answer='6'
                    checked={answer === '6'}
                    onChange={this.handleChange}
                  />
                  <p>6</p>
                </Container>
              </Grid.Column>

              <Grid.Column width={1}>
                <Container textAlign='center'>
                  <Radio
                    answer='7'
                    checked={answer === '7'}
                    onChange={this.handleChange}
                  />
                  <p>7</p>
                </Container>
              </Grid.Column>

              <Grid.Column width={2}>
                <Container textAlign='center'>
                  <h4>Concordo Fortemente</h4>
                </Container>
              </Grid.Column>
            </Grid>
          </Modal.Content>

          <Modal.Actions>
            <Button color='teal' icon='angle right' labelPosition='right' content="Enviar" onClick={this.closeSurvey} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Survey