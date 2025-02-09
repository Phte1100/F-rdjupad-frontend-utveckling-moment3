import { useEffect, useState } from "react";
import Form from "./Form";

interface Todo {
    _id: string;
    title: string;
    desc: string;
    status: string;
}

interface TodosProps {
    todos: Todo[];
    setTodos: (updateFunction: (prevTodos: Todo[]) => Todo[]) => void;
}

const Todos = ({ todos, setTodos }: TodosProps) => {
    const [loading, setLoading] = useState<boolean>(true);  
    const getTodos = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://f-rdjupad-frontend-utveckling-moment-2.onrender.com/todos');
            if (!response.ok) {
                throw new Error('Något gick fel vid hämtning');
            }
            const data = await response.json();
            setTodos(() => data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false); // Sluta ladda oavsett om hämtningen lyckas eller misslyckas
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    // Funktion för att uppdatera listan
    const refreshTodos = () => {
        getTodos();
    };

    const deleteTodo = async (id: string) => {
        try {
            const response = await fetch(`https://f-rdjupad-frontend-utveckling-moment-2.onrender.com/todos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Misslyckades att ta bort todo");
            }

            console.log("Todo raderad:", id);
            refreshTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const updateTodo = async (id: string, newStatus: string) => {
        try {
            const updatedTodo = todos.find(todo => todo._id === id);
            if (!updatedTodo) {
                console.error("Todo not found");
                return;
            }
    
            // Skicka hela objektet
            const response = await fetch(`https://f-rdjupad-frontend-utveckling-moment-2.onrender.com/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: updatedTodo.title,
                    desc: updatedTodo.desc,
                    status: newStatus, // Uppdaterar status
                }),
            });
    
            if (!response.ok) {
                throw new Error('Misslyckades att uppdatera Todo');
            }
    
            // Uppdatera listan direkt
            refreshTodos();
        } catch (error) {
            console.error("PUT-fel:", error);
        }
    };
    
    const notStarted = todos.filter(todo => todo.status === "not_started");
    const inProgress = todos.filter(todo => todo.status === "in_progress");
    const completed = todos.filter(todo => todo.status === "completed");

    const getStatusClass = (status: string) => {
        switch (status) {
            case "not_started": return "todo-not-started";
            case "in_progress": return "todo-in-progress";
            case "completed": return "todo-completed";
            default: return "";
        }
    };

    return (
        <section>
            <h2>Att göra</h2>
            {/* Skickar `refreshTodos` till `Form.tsx` */}
            <Form refreshTodos={refreshTodos} />
            {loading && <p className="loading">Hämtar data...</p>}
            <section className="todo-container">
                <div className="todo-columns">
                    {/* Ej påbörjad */}
                    <div className="todo-column">
                        <h3>Ej påbörjad:</h3>
                        {notStarted.map(todo => (
                            <div key={todo._id} className={`todo-item ${getStatusClass(todo.status)}`}>
                                <h4>{todo.title}</h4>
                                <p>{todo.desc}</p>
                                <label htmlFor="status">Ändra status:</label>
                                <select defaultValue={todo.status} onChange={(e) => updateTodo(todo._id, e.target.value)}>
                                    <option value="not_started">Ej påbörjad</option>
                                    <option value="in_progress">Pågående</option>
                                    <option value="completed">Avklarad</option>
                                </select>
                                <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Radera</button>
                            </div>
                        ))}
                    </div>

                    {/* Pågående */}
                    <div className="todo-column">
                        <h3>Pågående:</h3>
                        {inProgress.map(todo => (
                            <div key={todo._id} className={`todo-item ${getStatusClass(todo.status)}`}>
                                <h4>{todo.title}</h4>
                                <p>{todo.desc}</p>
                                <label htmlFor="status">Ändra status:</label>
                                <select defaultValue={todo.status} onChange={(e) => updateTodo(todo._id, e.target.value)}>
                                    <option value="not_started">Ej påbörjad</option>
                                    <option value="in_progress">Pågående</option>
                                    <option value="completed">Avklarad</option>
                                </select>
                                <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Radera</button>
                            </div>
                        ))}
                    </div>

                    {/* Avklarad */}
                    <div className="todo-column">
                        <h3>Avklarad:</h3>
                        {completed.map(todo => (
                            <div key={todo._id} className={`todo-item ${getStatusClass(todo.status)}`}>
                                <h4>{todo.title}</h4>
                                <p>{todo.desc}</p>
                                <label htmlFor="status">Ändra status:</label>
                                <select defaultValue={todo.status} onChange={(e) => updateTodo(todo._id, e.target.value)}>
                                    <option value="not_started">Ej påbörjad</option>
                                    <option value="in_progress">Pågående</option>
                                    <option value="completed">Avklarad</option>
                                </select>
                                <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Radera</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Todos;
