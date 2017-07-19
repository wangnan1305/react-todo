import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Item from 'components/Item';
import Footer from 'components/Footer';

// require('style/base.css');
// require('style/index.css');
import 'style/base.css';
import 'style/index.css';

var App = React.createClass({
    
})
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todosData: [],
            inputVal: '',
            view: 'all'
        }

        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.itemEditDone = this.itemEditDone.bind(this);
    }

    itemEditDone(todo, value) {
        let { todosData } = this.state;

        todosData.map((elt, i) => {
            if (todo.id === elt.id) {
                elt.value = value;
            }
            return elt;
        });

        this.setState({ todosData })
    }

    changeView(view) {
        this.setState({ view });
    }

    handleKeyDownPost(ev) {
        if (ev.keyCode !== 13) return;

        let { inputVal } = this.state;

        let value = inputVal.trim();

        if (value === '') {
            return;
        }
        let todo = {};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasCompleted = false;

        let { todosData } = this.state;

        todosData.push(todo);

        this.setState({
            todosData,
            inputVal: ''
        });
    }

    inputChange(ev) {
        this.setState({
            inputVal: ev.target.value
        })
    }

    toggleAll(ev) {
        let { checked } = ev.target;

        let { todosData } = this.state;

        todosData = todosData.map(elt => {
            elt.hasCompleted = checked;
            return elt;
        });

        this.setState({ todosData })
    }

    onToggle(todo) {
        let { todosData } = this.state;

        todosData = todosData.map(elt => {

            if (elt.id === todo.id) {
                elt.hasCompleted = !elt.hasCompleted;
            }
            return elt;
        });

        this.setState({ todosData })
    }

    onDestroy(todo) {
        let { todosData } = this.state;

        todosData = todosData.filter((elt) => {
            return elt.id !== todo.id;
        });

        this.setState({ todosData });
    }

    onClearCompleted() {
        let { todosData } = this.state;

        todosData = todosData.filter((elt) => {
            return !elt.hasCompleted;
        });

        this.setState({ todosData });
    }

    render() {

        let { handleKeyDownPost, onDestroy, onClearCompleted, inputChange, onToggle, toggleAll, changeView, itemEditDone } = this;

        let { todosData, inputVal, view } = this.state;

        let leftCount = 0;

        let items = null,
            footer = null,
            itemBox = null;

        items = todosData.filter(elt => {
            if (elt.hasCompleted) {
                leftCount++;
            }
            switch (view) {
                case 'active':
                    return !elt.hasCompleted;
                    break;
                case 'completed':
                    return elt.hasCompleted;
                    break;
                default:
                    return true;
            }
        });


        items = items.map((elt, i) => {
            return (
                <Item
                    {...{
                        onDestroy,
                        todo: elt,
                        onToggle,
                        itemEditDone
                    }}
                    key={i}
                />
            );
        });
        if (todosData.length) {
            itemBox = (
                <section className="main">
                    <input
                        type="checkbox"
                        className="toggle-all"
                        checked={leftCount === todosData.length}
                        onChange={toggleAll}
                    />
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
            );
            footer = (
                <Footer
                    {...{
                        leftCount: todosData.length - leftCount,
                        showClearButton: leftCount > 0,
                        onClearCompleted,
                        changeView,
                        view
                    }}
                />
            );
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        type="text"
                        onKeyDown={handleKeyDownPost}
                        onChange={inputChange}
                        value={inputVal}
                        className="new-todo"
                    />
                </header>
                {itemBox}
                {footer}
            </div>
        );
    }
}

function AAC(props) {
    console.log(props)
    return (
        <div>我的名字是AAC</div>
    )
}

function BBC(props) {
    console.log(props)
    return (
        <div>我的名字是BBC</div>
    )
}

ReactDOM.render(
    <Router>
        <div>
            <p><Link to="/">app</Link></p>
            <p><Link to="aac"></Link></p>
            <p><a href="/bbc">bbc</a></p>
            <Route exact path="/" render={
                ()=>{
                    return (
                        <div>
                            <p>当前这个组件是app</p>
                            <App></App>
                        </div>
                    )
                }
            }
            ></Route>
            <Route path="/aac" component={AAC}></Route>
            <Route path="/bBc" component={BBC}></Route>
        </div>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept()
}