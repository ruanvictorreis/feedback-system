import React, { Component } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';

class Thanks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: false,
        }

        window.thanks = this;
    }

    show() {
        this.setState({ view: true });
    }

    hide() {
        this.setState({ view: false });
    }

    close = () => this.hide();

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
                    <Modal.Header>Obrigado!</Modal.Header>
                    <Modal.Content image>
                        <Icon name="thumbs up outline" color='blue' size='massive' />
                        <Modal.Description>
                            <Header>Estudo Finalizado!</Header>
                            <p>Encaminhe este estudo para outros colegas de classe ou professores.</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary icon='angle right' labelPosition='right' content="OK" onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            </div>

        );
    }
}

export default Thanks