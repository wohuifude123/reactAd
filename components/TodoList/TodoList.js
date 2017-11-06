import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'



const TodoListShow = (todos) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} />
        ))}
    </ul>
)


class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
        this.todos = [
            {
                id: 'c1',
                value: '加鲁鲁',
                adhere: '粘贴'
            },
            {
                id: 'c2',
                value: '无敌钻石手',
                adhere: '行为'
            },
            {
                id: 'c3',
                value: '仙女',
                adhere: '人生'
            }
        ];
        this.todos.map(todo => (
            console.log(todo)
        ))
    }

    render() {

        return (
            TodoListShow(this.todos)
        )
    }
}



export default TodoList;
