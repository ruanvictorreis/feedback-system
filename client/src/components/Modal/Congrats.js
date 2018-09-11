import React, { Component } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';

class Congrats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: false,
        }

        window.congrats = this;
    }

    show() {
        this.setState({ view: true });
    }

    hide() {
        this.setState({ view: false });
    }

    startQuiz() {
        window.feedback.startQuiz();
    }

    close = () => this.startQuiz();

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
                    size='small'
                    open={this.state.view}
                    style={inlineStyle.modal}
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}>
                    <Modal.Header>Parabéns!</Modal.Header>
                    <Modal.Content image>
                        <Icon name="checkmark" color='green' size='massive' />
                        <Modal.Description>
                            <Header>Seu código está correto!</Header>
                            <p>Em seguida, você será redirecionado para um Quiz sobre este problema de programação.</p>
                            <br />
                            <p> Clique em 'Iniciar Quiz' para continuar. </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='angle right' labelPosition='right' content="Iniciar Quiz" onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            </div>

        );
    }
}

export default Congrats