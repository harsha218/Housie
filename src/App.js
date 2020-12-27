import './App.css';
import { Component } from 'react';
import Board from './Components/Board';
import { Layout, Button, Modal, InputNumber, Tooltip } from 'antd';
import 'antd/dist/antd.css';

const { Sider } = Layout;

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      unselected: [],
      selected: [],
      reset: true,
      autoPlay: false,
      modalVisible: false,
      delay: 4,
    };
  }

  componentDidMount() {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("Welcome to Housie"));
    let unselected = [];
    for (let i = 1; i <= 90; i++) {
      unselected.push(i);
    }
    unselected = shuffle(unselected);
    this.setState({ unselected, reset: true });
  }

  componentDidUpdate() {
    if (this.state.autoPlay === true) {
      setTimeout(() => {
        if (this.state.autoPlay === true) {
          this.handleNext();
        }
      }, this.state.delay * 1000)
    }
  }

  handleNext = () => {
    let { unselected, selected } = this.state;
    let item = unselected.pop();
    selected.push(item);
    this.setState({ selected, unselected, reset: false });
  }

  handleReset = () => {
    let state = this.state;
    state = {
      collapsed: false,
      unselected: [],
      selected: [],
      reset: true,
      autoPlay: false,
      modalVisible: false,
      delay: 4
    };
    this.setState(state);
    this.componentDidMount();
  }

  handleDelay = (e) => {
    this.setState({ delay: e });
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>

        <Layout className="site-layout">
          <Board selected={this.state.selected[this.state.selected.length - 1]} reset={this.state.reset} />
        </Layout>

        <Sider>
          <div className='displayNumber'>{this.state.selected[this.state.selected.length - 1]}</div>

          <Button onClick={this.handleNext} disabled={this.state.unselected.length === 0 || this.state.autoPlay === true} style={{ marginLeft: '25px' }}>Next</Button>

          <Tooltip title='Double Click to change delay'>
            <Button style={{ margin: '10px' }} onDoubleClick={() => {
              if (this.state.autoPlay === true) {
                this.setState({ autoPlay: false });
              } else {
                this.setModalVisible(true);
              }
            }}
              onClick={() => {
                if (this.state.autoPlay === true) {
                  this.setState({ autoPlay: false });
                } else {
                  this.setState({ autoPlay: true });
                }
              }}>{this.state.autoPlay ? 'Stop' : 'Autoplay'}</Button>
          </Tooltip>

          <div className='numberBox'>
            <div key={'-2'}>{this.state.selected[this.state.selected.length - 2]}</div>
            <div key={'-3'}>{this.state.selected[this.state.selected.length - 3]}</div>
            <div key={'-4'}>{this.state.selected[this.state.selected.length - 4]}</div>
            <div key={'-5'}>{this.state.selected[this.state.selected.length - 5]}</div>
            <div key={'-6'}>{this.state.selected[this.state.selected.length - 6]}</div>
          </div>

          <Button onClick={this.handleReset} disabled={this.state.selected.length === 0 || this.state.autoPlay === true} style={{ left: '70px' }}>Reset</Button>

          <Modal
            title="Select Delay"
            style={{ top: 20 }}
            visible={this.state.modalVisible}
            onOk={() => {
              this.setState({ autoPlay: true });
              this.setModalVisible(false);
            }}
            onCancel={() => this.setModalVisible(false)}
          >
            <InputNumber min={4} max={10} value={this.state.delay} onChange={this.handleDelay} />

          </Modal>

        </Sider>

      </Layout>
    );
  }
}

export default App;
