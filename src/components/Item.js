let propTypes = {
    todo:PT.object,
    onDestroy:PT.func,
    onToggle:PT.func,
    itemEditDone:PT.func
}

export default class Item extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            inEdit: false,
            val:''
        };

        this.onEdit = this.onEdit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    onEdit(){
        let {value} = this.props.todo;
        this.setState({
            inEdit:true,
            val:value
        } , ()=>this.refs.editInput.focus()); 
    }

    onBlur(){
        let {todo , itemEditDone} = this.props;

        itemEditDone(todo , this.state.val)

        this.setState({
            inEdit:false
        })
    }


    onEnter(ev){
        if(ev.keyCode === 13) {
            this.onBlur();
        }else if(ev.keyCode === 27){
            let {todo} = this.props;
            this.setState({
                inEdit:false,
                val:todo.value
            })
        }
    }

    inputChange(ev){
        this.setState({
            val:ev.target.value.trim()
        })
    }

    render(){
        
        let {onEdit , onEnter , onBlur , inputChange } = this;

        let {todo , onDestroy , onToggle} = this.props;

        let {inEdit , val} = this.state;

        let itemClassName = '';

        if(inEdit) {
            itemClassName = 'editing'
        }else{
            if(todo.hasCompleted){
                itemClassName = 'completed';
            }else{
                itemClassName = '';
            }
        }

        return(
            <li className={itemClassName}>
                <div className="view">
                    <input 
                        type="checkbox" 
                        className="toggle"
                        checked = {todo.hasCompleted}
                        onChange={ev=>onToggle(todo)}
                    />
                    <label 
                        onDoubleClick={onEdit}
                    >{todo.value}</label>
                    <button className="destroy" onClick={ ev => onDestroy(todo)}></button>
                </div>
                <input 
                    type="text" 
                    className="edit"
                    value={val}
                    onKeyDown={onEnter}
                    onBlur={onBlur}
                    onChange={inputChange}
                    ref="editInput"
                />
            </li>
        );
    }
}
Item.propTypes = propTypes;