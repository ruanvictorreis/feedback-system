import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Loader, Button } from 'semantic-ui-react';
import AlertContainer from 'react-alert';
import { Grid } from 'semantic-ui-react';
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
			isLoading: false,
			studentCode: '',
			afterEvents: [],
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
			this.showCondition(info.condition);
			this.cm.setValue(info.templateCode);
		}
	}

	toggleLoader() {
		this.setState({ isLoading: !this.state.isLoading });
	}

	setCurrentCode() {
		this.setState({ studentCode: this.cm.getValue() });
	}

	submitCode() {
		if (!this.state.register) {
			return
		}

		this.toggleLoader();
		this.setCurrentCode();

		var submission = {
			register: this.state.register,
			studentCode: this.cm.getValue(),
			assignment: this.state.assignment
		};

		this.assertImplementation(submission);
	}

	assertImplementation(submission) {
		$.ajax({
			method: 'POST',
			url: 'http://localhost:8081/api/assert/',
			data: submission
		})
			.then((attempt) => {
				console.log(attempt)
				if (attempt.isCorrect) {
					this.correctSubmission(attempt);
				} else {
					// HERE CALL HINTS
				}
				this.toggleLoader();
			})
	}

	/** 
	synthesizeFixByRefazer(submission) {
		$.ajax({
			method: 'POST',
			url: 'http://refazer-online.azurewebsites.net/api/submissions/',
			data: submission
		})
			.then((attempt) => {
				console.log(attempt)
				if (attempt.PassedTests) {
					this.correctSubmission(attempt)
				} else {
					this.tryInteractiveHint(attempt)
				}
				this.toggleLoader();
				this.saveLogSubmission(attempt);
			})
	}*/

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
	}

	correctSubmission(attempt) {
		this.msg.success('Parabéns! Seu código está correto')
	}

	tryInteractiveHint(attempt) {
		if (attempt.FixedCodeList.length > 0 && attempt.LogsList.length > 0) {
			this.msg.info('Estamos fornecendo algumas dicas para você')
			this.requestTracesDivergence(attempt);
		} else {
			this.msg.error('Não conseguimos fornecer nenhuma dica para você')
		}
	}

	requestTracesDivergence(attempt) {
		var info = {
			studentId: 0,
			date: new Date(),
			before: attempt.SubmittedCode,
			SynthesizedAfter: attempt.FixedCodeList[0],
			IsFixed: true,
			failed: attempt.LogsList,
			register: this.state.register,
			assignment: this.state.assignment
		}

		this.toggleLoader();

		$.ajax({
			method: 'POST',
			url: 'https://tracediff-server.herokuapp.com/api/execute',
			data: info
		})
			.then((response) => {
				const data = JSON.parse(response);
				this.startInteractiveHint(data);
				this.toggleLoader();
			})
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
									<Button primary loading={isLoading} onClick={this.submitCode.bind(this)}>Enviar</Button>
								</div>
							</Grid.Column>

							<Grid.Column width={10}>
								<div className="ui message hint-message">
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

						<Grid.Row>
							<Grid.Column width={16}>
								<div className="ui message hint-message">
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
