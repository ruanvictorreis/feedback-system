import React, { Component } from 'react';
import Highlight from 'react-highlight';
import $ from 'jquery';
import { Modal, Header, Segment, Grid, Button } from 'semantic-ui-react';

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      register: '',
      assignment: '',
      host: '',
      condition: 0,
      view: false,
      quizOptionOne: false,
      quizOptionTwo: false,
      quizOptionThree: false,
      quizOptionFour: false,
      quizItems: [],
    }

    window.quiz = this;
  }

  init(props) {
    this.setState({ register: props.register });
    this.setState({ assignment: props.assignment });
    this.setState({ condition: props.condition });
    this.setState({ host: props.host });

    const body = {
      register: props.register,
      assignment: props.assignment
    };

    $.ajax({
      method: 'POST',
      url: `http://${props.host}:8081/api/quiz`,
      data: body
    })
      .then((response) => {
        this.setState({ quizItems: response.items });
        this.setState({ view: true });
        window.congrats.hide();
      });
  }

  saveQuizResult() {
    const studentChoices = [
      this.state.quizOptionOne,
      this.state.quizOptionTwo,
      this.state.quizOptionThree,
      this.state.quizOptionFour
    ];

    var quizScore = 0;
    const items = this.state.quizItems;

    for (var i = 0; i < items.length; i++) {
      items[i].answer = studentChoices[i];

      if (items[i].answer === items[i].isCorrect) {
        quizScore = quizScore + 1;
      }
    }

    var quiz = {
      Register: this.state.register,
      Assignment: this.state.assignment,
      Score: quizScore,
      Condition: this.state.condition,
      ItemOne: JSON.stringify(items[0]),
      ItemTwo: JSON.stringify(items[1]),
      ItemThree: JSON.stringify(items[2]),
      ItemFour: JSON.stringify(items[3]),
    };

    $.ajax({
      method: 'POST',
      url: 'http://feedback-logs.azurewebsites.net/api/quiz',
      data: quiz
    });

    this.setState({ view: false });
    window.feedback.startSurvey();
  }

  toggleQuizOptionOne() {
    this.setState({ quizOptionOne: !this.state.quizOptionOne });
  }

  toggleQuizOptionTwo() {
    this.setState({ quizOptionTwo: !this.state.quizOptionTwo });
  }

  toggleQuizOptionThree() {
    this.setState({ quizOptionThree: !this.state.quizOptionThree });
  }

  toggleQuizOptionFour() {
    this.setState({ quizOptionFour: !this.state.quizOptionFour });
  }

  closeQuiz = () => this.saveQuizResult();

  render() {

    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    return (
      <div>
        <Modal
          open={this.state.view}
          style={inlineStyle.modal}
          closeOnEscape={false}
          closeOnRootNodeClick={false}>
          <Header icon='cubes' content='Quiz' />
          <Modal.Content>
            <Modal.Description>
              {/** <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/29znC7ak-b4">&gt;&gt; Instruções &lt;&lt;</a>*/}
              <h3>Selecione outras soluções que também sejam corretas para este problema</h3>
              <p>ATENÇÃO: Podem existir mais de uma (ou nenhuma) solução correta!</p>
              <br />
            </Modal.Description>

            <Grid>
              <Grid.Row stretched>
                <Grid.Column width={8}>
                  <Segment raised>
                    <Button circular toggle icon='checkmark' size="mini" floated="right"
                      active={this.state.quizOptionOne} onClick={this.toggleQuizOptionOne.bind(this)} />
                    <Highlight className="python">
                      {this.state.view ? this.state.quizItems[0].code : ''}
                    </Highlight>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment raised>
                    <Button circular toggle icon='checkmark' size="mini" floated="right"
                      active={this.state.quizOptionTwo} onClick={this.toggleQuizOptionTwo.bind(this)} />
                    <Highlight className="python">
                      {this.state.view ? this.state.quizItems[1].code : ''}
                    </Highlight>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row stretched>
                <Grid.Column width={8}>
                  <Segment raised>
                    <Button circular toggle icon='checkmark' size="mini" floated="right"
                      active={this.state.quizOptionThree} onClick={this.toggleQuizOptionThree.bind(this)} />
                    <Highlight className="python">
                      {this.state.view ? this.state.quizItems[2].code : ''}
                    </Highlight>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Segment raised>
                    <Button circular toggle icon='checkmark' size="mini" floated="right"
                      active={this.state.quizOptionFour} onClick={this.toggleQuizOptionFour.bind(this)} />
                    <Highlight className="python">
                      {this.state.view ? this.state.quizItems[3].code : ''}
                    </Highlight>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>

          <Modal.Actions>
            <Button positive icon='angle right' labelPosition='right' content="Enviar" onClick={this.closeQuiz} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Quiz