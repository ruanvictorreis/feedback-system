import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import AlertContainer from 'react-alert';
import { Grid, Message, Button } from 'semantic-ui-react';
import Ladder from './Ladder';
import Stream from './data/Stream';
import Record from './data/Record';
import _ from 'lodash';
import $ from 'jquery';
import 'codemirror/mode/python/python';

class InteractiveHint extends Component {
	constructor(props) {
		super(props)
		this.state = {
			test: '',
			result: 0,
			expected: 0,
			condition: 0,
			register: '',
			assignment: '',
			studentCode: '',
			repairs: [],
			afterEvents: [],
			isLoading: false,
			afterHistory: {},
			beforeEvents: [],
			beforeHistory: {},
		}
		window.interactiveHint = this
	}

	componentDidMount() {
		this.init()
	}

	init(info) {
		if (!this.refs.editor) return false;
		this.cm = this.refs.editor.getCodeMirror();
		window.cm = this.cm

		if (info) {
			this.setState({ register: info.register });
			this.setState({ assignment: info.assignment });
			this.setState({ studentCode: info.templateCode });
			this.setState({ condition: info.condition });
			//this.showCondition(info.condition);
			this.cm.setValue(info.templateCode);
		}
	}

	setRepairs(repairs) {
		this.setState({ repairs: repairs });
	}

	toggleLoader() {
		this.setState({ isLoading: !this.state.isLoading });
	}

	setCurrentCode() {
		this.setState({ studentCode: this.cm.getValue() });
	}

	submitAttempt() {
		if (!this.state.register) {
			return;
		}

		this.toggleLoader();
		this.setCurrentCode();

		var attempt = {
			register: this.state.register,
			studentCode: this.cm.getValue(),
			assignment: this.state.assignment
		};

		this.assertImplementation(attempt);
	}

	assertImplementation(attempt) {
		$.ajax({
			method: 'POST',
			url: 'http://localhost:8081/api/assert/',
			data: attempt
		})
			.then((response) => {
				this.toggleLoader();

				if (response.isCorrect) {
					this.correctSubmission(response);
				} else {
					this.synthesizeFixByClara(response);
				}
			})
	}

	synthesizeFixByClara(attempt) {
		if (attempt.syntaxError) {
			this.syntaxErrorFound(attempt);
			return;
		}

		this.toggleLoader();

		$.ajax({
			method: 'POST',
			url: 'http://localhost:8081/api/clara/',
			data: attempt
		})
			.then((response) => {
				this.toggleLoader();
        console.log(response)
				//if (response.repaired) {
				//	this.requestTracesDivergence(response);
				//} else {
				//	this.claraRepairFail(response);
				//}
			})
	}

	requestTracesDivergence(attempt) {
		var info = {
			studentId: attempt.register,
			date: new Date(),
			before: attempt.studentCode,
			SynthesizedAfter: attempt.codeRepair,
			IsFixed: true,
			failed: attempt.errorMsg.split('\n'),
			register: attempt.register,
			assignment: attempt.assignment
		}

		this.toggleLoader();

		$.ajax({
			method: 'POST',
			url: 'http://localhost:8081/api/tracediff',
			data: info
		})
			.then((response) => {
				this.toggleLoader();
				const data = JSON.parse(response);
				this.startInteractiveHint(data);
			})
	}

	/**
saveLogSubmission(attempt) {
	var submissionLog = {
		Condition: this.state.condition,
		Register: this.state.register,
		Assignment: this.state.assignment,
		FixedCode: [],
		IsCorrect: attempt.PassedTests,
		DateTime: new Date().toLocaleString(),
		HasFix: attempt.FixedCodeList != null && attempt.FixedCodeList.length > 0,
		SubmittedCode: this.state.studentCode,
		LogsInteractionList: window.ladder.getInteractionLogs()
	}

	if (submissionLog.HasFix) {
		submissionLog.FixedCode = attempt.FixedCodeList[0];
	}

	$.ajax({
		method: 'POST',
		url: 'http://tracediff-logs.azurewebsites.net/api/SubmissionLogs/',
		data: submissionLog
	})
		.then((response) => {
			window.ladder.clearInteractionLogs();
		})
}*/

	correctSubmission(attempt) {
		this.msg.success('Parabéns! Seu código está correto');
		//this.saveLogSubmission(attempt);
	}

	syntaxErrorFound(attempt) {
		this.msg.error('Seu código possui um ou mais erros de sintaxe');
		//this.saveLogSubmission(attempt);
	}

	claraRepairFail(attempt) {
		this.msg.error('CLARA: Solução muito distante do esperado');
		//this.saveLogSubmission(attempt);
	}


	startInteractiveHint(data) {
		var item = data[0]

		let stream = new Stream()
		stream.generate(item.beforeTraces, item.beforeCode, 'before')
		stream.generate(item.afterTraces, item.afterCode, 'after')
		stream.check()

		let record = new Record()
		record.generate(stream.beforeTraces, 'before')
		record.generate(stream.afterTraces, 'after')
		record.check()

		let state = Object.assign(item, {
			id: item.studentId,
			beforeTraces: stream.beforeTraces,
			afterTraces: stream.afterTraces,
			traces: stream.traces,
			currentCode: item.beforeCode,
			step: 0,
			stop: false,
			beforeHistory: record.beforeHistory,
			afterHistory: record.afterHistory,
			beforeTicks: record.beforeTicks,
			afterTicks: record.afterTicks,
			commonKeys: record.commonKeys,
			focusKeys: record.focusKeys,
			beforeEvents: record.beforeEvents,
			afterEvents: record.afterEvents,
		})

		this.setState(state);
		window.ladder.init()
	}

	showCondition(mode) {
		switch (mode) {
			case 1:
				$('.ladder').show()
				break
			case 2:
				$('.ladder').hide()
				break
			case 3:
				$('.ladder').hide()
				break
			case 4:
				$('.ladder').hide()
				break
		}
	}

	render() {
		var options = {
			mode: 'python',
			lineNumbers: true
		};

		const { isLoading } = this.state;

		return (
			<div>

				<div className="loader-wrapper">
					<AlertContainer ref={a => this.msg = a}
						{...{
							offset: 14,
							position: 'bottom left',
							theme: 'light',
							time: 10000,
							transition: 'scale'
						}
						}
					/>
				</div>

				<div>
					<Grid>
						<Grid.Row stretched>
							<Grid.Column width={6}>
								<div className="ui message hint-message">
									<CodeMirror
										value={this.state.studentCode}
										ref="editor"
										options={options} />
									<br />
									<Button primary loading={isLoading} onClick={this.submitAttempt.bind(this)}>Enviar</Button>
								</div>
							</Grid.Column>

							<Grid.Column width={10}>
								<div className="ui message hint-message">
									{/**<h3>TraceDiff</h3>*/}
									<Ladder
										beforeHistory={this.state.beforeHistory}
										afterHistory={this.state.afterHistory}
										beforeEvents={this.state.beforeEvents}
										afterEvents={this.state.afterEvents}
										beforeTraces={this.state.beforeTraces}
										afterTraces={this.state.afterTraces}
										beforeAst={this.state.beforeAst}
										afterAst={this.state.afterAst}
										currentCode={this.state.currentCode}
										beforeCode={this.state.beforeCode}
										before={this.state.before}
										focusKeys={this.state.focusKeys}
										test={this.state.test}
										expected={this.state.expected}
										result={this.state.result} />
								</div>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row stretched>
							<Grid.Column width={6}>
								<Message>
									{/**<Message.Header>Clara</Message.Header>*/}
									<Message.List items={this.state.repairs} />
								</Message>
							</Grid.Column>
							<Grid.Column width={10}>
								<div className="ui message hint-message">
									{/**<h3>Python Tutor</h3>*/}
									<div id="viz" style={{ marginTop: '50px', display: this.state.condition == 3 ? 'none' : 'block' }} />
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		)
	}
}

export default InteractiveHint
