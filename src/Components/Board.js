import '../App.css';
import { Component, Fragment } from 'react';
import { Layout, Tooltip } from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            count: 1
        };
    }

    componentDidMount() {
        let { items } = this.state;
        for (let i = 1; i <= 90; i++) {
            items.push(
                <Fragment key={i}><span key={i} className='item' value={i}>{i}</span></Fragment>
            );
        };

        this.setState({ items });
    }

    componentDidUpdate(prevProps) {
        if (this.props.selected !== prevProps.selected) {
            if (this.props.reset) {
                let items = this.state.items;
                for (let i = 0; i < 90; i++) {
                    items[i] = <Fragment key={i + 1}><span key={i + 1} className='item' value={i + 1}>{i + 1}</span></Fragment>
                };
                this.setState({ items, count: 1 });
            }
            else {
                let { items } = this.state;
                let id = this.props.selected;
                let tooltip = String(this.state.count);
                items[id - 1] = (<Tooltip placement="top" title={tooltip} key={id}>
                    <span key={id} title={this.state.count} className='itemSelected' value={id}>{id}</span>
                </Tooltip>)
                
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(id));
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(id));
                
                this.setState({ items, count: this.state.count + 1 });
            }
        }
    }

    render() {
        return (
            <Content style={{ margin: '16px', alignSelf: 'center' }}>
                <div className="site-layout-background board">
                    {this.state.items}
                </div>
            </Content>
        )
    }
}

export default Board;
