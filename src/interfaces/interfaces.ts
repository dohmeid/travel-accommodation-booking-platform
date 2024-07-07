export interface Todo {
    _id: number;
    description: string;
    isComplete: boolean;
}

export interface TodosContextType {
    todosList: Todo[];
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    addNewTodo: (todoData: string) => Promise<void>;
    updateTodo: (todoID: number) => Promise<void>;
    deleteTodo: (todoID: number) => Promise<void>;
    getFilteredTodos: () => Todo[];
}