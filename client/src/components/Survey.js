import React, { Component } from 'react';
import { Modal, Header, Button, Form, Container } from 'semantic-ui-react';

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      surveyView: false,
      likert: 0,
    }

    window.survey = this;
  }

  init() {
    this.setState({ surveyView: true });
  }

  handleChange = (e, { likert }) => this.setState({ likert })

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
            <Button positive icon='checkmark' labelPosition='right' content="Enviar" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Survey