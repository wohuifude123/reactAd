let nextTodoId = 0
/**
 * addTodo(input.value)
 * @param text
 * @returns {{type: string, id: number, text: *}}
 * 作用：action 创建函数
 */
export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}


