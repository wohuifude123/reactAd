/**

 {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
 }

 */
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            let ad = [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
            console.log(ad)
            return ad
        default:
            return state
    }
}

export default todos
