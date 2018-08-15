import React, { Component } from 'react';
import Tree from '../data/Tree';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import _ from 'lodash';
import $ from 'jquery';
import 'rc-slider/assets/index.css';

class TraceDiff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      level: 0,
      max: 0,
      marks: {},
      beforeEvents: [],
      afterEvents: [],
      clicked: false,
      events: [],
      currentLine: null,
      diffIndex: null,
      focusKeys: [],
    }
    window.traceDiff = this
  }

  componentDidMount() {
    setTimeout(() => {
      this.init()
    }, 1500);
  }

  init() {
    this.generate('before')
    this.generate('after')
  }

  onChange(value) {
    if (value > this.state.max) return false
    this.setState({ level: value }, () => {
      this.init()
    })
  }

  onClick(index, line, event) {
    this.onChange(this.state.level + 1)
    return false
  }

  onClose() {
    let popup = $('.popup')
    if (popup.hasClass('visible')) {
      popup.removeClass('visible')
      popup.addClass('hidden')
    }
    window.cm.removeLineClass(this.state.currentLine - 1, '', 'current-line')
  }


  onMouseOver(event, index) {
    let line = event.line
    $(`.history-line.line-${index}`).addClass('hover')

    let popup = $('.popup')
    if (!popup.hasClass('visible')) {
      window.cm.addLineClass(line - 1, '', 'current-line')
    }
  }

  onMouseOut(event, index) {
    let line = event.line
    $(`.history-line.line-${index}`).removeClass('hover')

    let popup = $('.popup')
    if (!popup.hasClass('visible')) {
      window.cm.removeLineClass(line - 1, '', 'current-line')
    }
  }

  generate(type) {
    let events, asts, key
    if (type === 'before') {
      events = this.props.beforeEvents
      asts = this.props.beforeAst
      key = 'beforeEvents'
    } else {
      events = this.props.afterEvents
      asts = this.props.afterAst
      key = 'afterEvents'
    }

    const isEqual = (before, after) => {
      let bool = true
      if (!before || !after) return false
      for (let key of ['value', 'key', 'type', 'history']) {
        if (!_.isEqual(before[key], after[key])) bool = false
      }
      return bool
    }

    let focusKeys = _.union(Object.keys(this.props.beforeHistory), Object.keys(this.props.afterHistory)).map((key) => {
      if (isEqual(this.props.beforeHistory[key], this.props.afterHistory[key]) && this.props.beforeHistory[key].type !== 'call') return false
      return key
    }).filter(key => key)

    let indent = 0
    events = events.map((event) => {
      if (!focusKeys.includes(event.key)) return false
      if (window.type !== 'repeated' && event.builtin) return false
      // if (event.type === 'call' && event.children.length === 0) return false

      let trimmedEvents = events.slice(0, event.id)
      let history = {}
      for (let e of trimmedEvents) {
        history[e.key] = e
      }

      let ast = asts[event.line - 1]
      let tree = new Tree()

      try {
        tree.history = history
        tree.analyze(ast)
        event.updates = tree.updates

        if (event.type !== tree.type && event.value !== '') {
          event.updates = [event.value]
        }

        return event
      } catch (err) {
        event.updates = []
        return event
      }

    }).filter(event => event)

    let max = this.state.max
    events = events.map((event) => {
      let updates = _.uniq(event.updates).reverse()
      let value = updates[this.state.level]
      if (value === undefined) value = _.last(updates)
      if (value === undefined) value = event.value

      max = Math.max(max, updates.length - 1)

      switch (event.type) {
        case 'call':
          event.call = // event.children[0]
            event.html = [
              { className: 'normal', text: 'call ' },
              { className: 'keyword', text: event.key },
            ]
          indent++
          event.indent = indent
          break
        case 'return':
          event.html = [
            { className: 'keyword', text: event.key },
            { className: 'normal', text: ' returns ' },
            { className: 'number', text: value },
          ]
          event.indent = indent
          indent--
          break
        default:
          event.html = [
            { className: 'keyword', text: event.key },
            { className: 'normal', text: ' = ' },
            { className: 'number', text: value },
          ]
          event.indent = indent
          break
      }
      return event
    })

    let state = {}
    let marks = {}
    if (max > 3) max = 3
    marks[0] = 'concrete'
    marks[max] = 'abstract'
    state['max'] = max
    state['marks'] = marks
    state['focusKeys'] = focusKeys
    state[key] = events
    this.setState(state, () => {

      let diffIndex
      if (this.state.beforeEvents.length === 0
        || this.state.afterEvents.length === 0) return
      for (let i = 0; i < this.state.beforeEvents.length; i++) {
        let be = this.state.beforeEvents[i]
        let ae = this.state.afterEvents[i]
        if (be.key !== ae.key || be.value !== ae.value) {
          diffIndex = i
          break
        }
      }
      this.setState({ diffIndex: diffIndex })
    })
  }


  renderEvent(event, index) {
    let className = 'history-line'
    className += ` line-${index} `
    if (this.state.diffIndex === index) className += ' diff-line'
    return (
      <div className={className} data-index={index} key={index}>
        <p style={{ paddingLeft: `${10 * event.indent}px`, cursor: 'pointer' }}
          onMouseOver={this.onMouseOver.bind(this, event, index)}
          onMouseOut={this.onMouseOut.bind(this, event, index)}>
          <span>
            {index < this.state.diffIndex ? <i className="fa fa-check fa-fw"></i> : <i className="fa fa-fw fa-angle-right"></i>}
            &nbsp;
          </span>
          {event.html.map((html, index) => {
            return <span key={index} className={`hljs-${html.className}`}>{html.text}</span>
          })}
        </p>
      </div>
    )
  }

  render() {
    return (
      <div id='ladder'>
        <div className="ui two column grid">
          <div className="eight wide column">
            <div id="result-ladder" className="ladder">
              <h6>Obtido</h6>
              <pre><code className="hljs">
                {this.state.beforeEvents.map((event, index) => {
                  return this.renderEvent(event, index)
                })}
              </code></pre>
            </div>
          </div>
          <div className="eight wide column">
            <div id="expected-ladder" className="ladder">
              <h6>Esperado</h6>
              <pre><code className="hljs">
                {this.state.afterEvents.map((event, index) => {
                  return this.renderEvent(event, index)
                })}
              </code></pre>
            </div>
          </div>

          <div id="control-ladder" className="ladder" style={{ width: '84%' }}>
            <Slider
              dots
              min={0}
              max={this.state.max}
              marks={this.state.marks}
              value={this.state.level}
              handle={handle}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TraceDiff


const Handle = Slider.Handle;
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      overlay=""
      visible={dragging}
      placement="bottom"
      key={index}>
      <Handle {...restProps} />
    </Tooltip>
  );
};
