import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from 'semantic-ui-react';
import actions from './redux/actions';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Highlight from 'react-highlight';
import AlertContainer from 'react-alert';
import InteractiveHint from './InteractiveHint';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      register: '',
      assignment: '',
      templateCode: '',
      condition: 0,
      isLocked: false,
      isLoading: false,
    }

    window.app = this;
    this.registerInput = this.registerInput.bind(this);
  }

  componentDidMount() {
    const href = window.location.href
    const params = {}
    href.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function ($0, $1, $2, $3) {
        params[$1] = $3;
      }
    )

    if (!params.type) {
      window.location.href = `/?type=factorial`
      return false
    } else {
      this.setState({ assignment: params.type });
    }
  }

  registerInput(event) {
    if (!this.state.isLocked) {
      this.setState({ register: event.target.value });
    }
  }

  toggleLoader() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  startAssignment() {
    if (!this.state.register) {
      return false
    }

    this.toggleLoader();

    var studentRegister = {
      Register: `${this.state.register}`,
      Assignment: `${this.state.assignment}`,
      DateTime: new Date().toLocaleString()
    }

    $.ajax({
      method: 'POST',
      url: 'http://feedback-logs.azurewebsites.net/api/registerlogs',
      data: studentRegister
    })
      .then((response) => {
        if (response.Permission) {
          this.loadAssignmentInfo(response);
        }

        this.toggleLoader();
        this.setState({ isLocked: true });
      })
  }

  loadAssignmentInfo(studentRegister) {
    this.setState({ condition: studentRegister.Condition })

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/assignments/${this.state.assignment}.txt`
    })
      .then((txt) => {
        this.setState({ description: txt })
      })

    $.ajax({
      method: 'GET',
      url: `${window.location.pathname}data/layout/${this.state.assignment}.py`
    })
      .then((txt) => {
        this.setState({ templateCode: txt })
      })

    setTimeout(() => {
      window.interactiveHint.init(this.state)
    }, 1000)
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        <div className="ui two column centered grid" style={{ marginTop: '20px' }}>
          <div id="type-links">
            <a id="factorial" className="ui basic button" href="?type=factorial">factorial</a>
            <a id="sum_of_squares_base" className="ui basic button" href="?type=sum_of_squares_base">sum of squares</a>
          </div>
        </div>

        <div className="ui one column centered grid" style={{ marginTop: '50px', height: '30px' }}>
          <input type="text" style={{ 'textAlign': 'center' }} value={this.state.register} onChange={this.registerInput} />
        </div>

        <div className="ui one column centered grid" style={{ marginTop: '20px' }}>
          <button className="ui basic button" onClick={this.startAssignment.bind(this)}>Iniciar</button>
        </div>

        <div className="ui one column centered grid" style={{ marginTop: '30px' }}>
          <Loader active={isLoading} inline='centered'> Carregando ...</Loader>
        </div>

        <div className="ui two column centered grid">
          <div id="mixed-hint" className="fifteen wide column">
            <div id="problem-description" className="ui message hint-message">
              <Highlight className="python">
                {this.state.description}
              </Highlight>
            </div>
            <div>
              <InteractiveHint />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
