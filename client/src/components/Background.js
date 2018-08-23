import React, { Component } from 'react';
import $ from 'jquery';
import { Modal, Header, Grid, Button, Form, Container } from 'semantic-ui-react';

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false,
            register: '',
            semester: null,
            icc: false,
            p1: false,
            p2: false,
            eda: false
        }

        window.background = this;
    }

    init(props) {
        this.setState({ view: true });
        this.setState({ register: props.register });
    }

    save() {
        const background = {
            Register: this.state.register,
            ICC: this.state.icc,
            P1: this.state.p1,
            P2: this.state.p2,
            EDA: this.state.eda
        };

        this.setState({ view: false });

        $.ajax({
            method: 'POST',
            url: 'http://feedback-logs.azurewebsites.net/api/background',
            data: background
        });
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    close = () => this.save();

    render() {
        const inlineStyle = {
            modal: {
                marginTop: '0px !important',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };

        const options = [
            { text: '1° semestre', value: 1 },
            { text: '2° semestre', value: 2 },
            { text: '3° semestre', value: 3 },
            { text: '4° semestre', value: 4 },
            { text: '5° semestre', value: 5 },
            { text: '6° semestre', value: 6 },
            { text: '7° semestre', value: 7 },
            { text: '8° semestre', value: 8 },
            { text: '9° semestre', value: 9 },
            { text: '10° semestre', value: 10 },
            { text: '11° semestre', value: 11 },
            { text: '12° semestre', value: 12 }
        ];

        const { semester, icc, p1, p2, eda } = this.state;

        return (
            <div>
                <Modal open={this.state.view}
                    style={inlineStyle.modal}
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}>

                    <Header icon='user' content='Background' />

                    <Modal.Content>
                        <Form>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Container textAlign='right'>
                                            <h2>1.</h2>
                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column width={15}>
                                        <Container textAlign='left'>
                                            <h2>Qual é o semestre que você está cursando atualmente na universidade?</h2>
                                        </Container>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1} />
                                    <Grid.Column width={14}>
                                        <Form.Select fluid placeholder='semestre'
                                            options={options}
                                            name='semester'
                                            value={semester}
                                            onChange={this.handleChange} />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Container textAlign='right'>
                                            <h2>2.</h2>
                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column width={15}>
                                        <Container textAlign='left'>
                                            <h2>Quais dessas disciplinas você já cursou em sua graduação?</h2>
                                        </Container>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1} />
                                    <Grid.Column width={14}>
                                        <Form.Group grouped>
                                            <Form.Checkbox
                                                label='Introdução a Ciência da Computação'
                                                name='icc'
                                                value={!icc}
                                                checked={icc === true}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Checkbox
                                                label='Programação I'
                                                name='p1'
                                                value={!p1}
                                                checked={p1 === true}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Checkbox
                                                label='Programação II'
                                                name='p2'
                                                value={!p2}
                                                checked={p2 === true}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Checkbox
                                                label='Estrutura de Dados e Algoritmos'
                                                name='eda'
                                                value={!eda}
                                                checked={eda === true}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
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

export default Background