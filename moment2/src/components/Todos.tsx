import { useState, useEffect } from "react";

interface Todo {
    id: number;
    title: string;
    desc: string;
    status: string;
}

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getTodos = async () => {
        try {
            const response = await fetch('https://f-rdjupad-frontend-utveckling-moment-2.onrender.com/todos');
            if (!response.ok) {
                throw new Error('Något gick fel vid hämtning');
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            setError("Kunde inte hämta todos");
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const deleteTodo = async (id: number) => {
        try {
            const response = await fetch(`https://f-rdjupad-frontend-utveckling-moment-2.onrender.com/todos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Misslyckades att ta bort todo");
            }

            // 🔄 Uppdatera listan genom att filtrera bort den raderade todo
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== Number(id)));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // Filtrera todos efter status
    const notStarted = todos.filter(todo => todo.status === "not_started");
    const inProgress = todos.filter(todo => todo.status === "in_progress");
    const completed = todos.filter(todo => todo.status === "completed");

    // Funktion för att bestämma CSS-klass
    const getStatusClass = (status: string) => {
        switch (status) {
            case "not_started":
                return "todo-not-started";
            case "in_progress":
                return "todo-in-progress";
            case "completed":
                return "todo-completed";
            default:
                return "";
        }
    };

    return (
        <section>
            <h2>Att göra</h2>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Hämtar data...</p>}

            <section className="todo-container">
                <div className="todo-columns">
                    
                    {/* Ej påbörjad */}
                    <div className="todo-column">
                        <h3>Ej påbörjad:</h3>
                        {notStarted.map(todo => (
                            <div key={todo.id} className={`todo-item ${getStatusClass(todo.status)}`}>
                                <h4>{todo.title}</h4>
                                <p>{todo.desc}</p>
                                <button type="submit" className="delete-btn" onClick={() => deleteTodo(todo.id)}>Radera</button>
                            </div>
                        ))}
                    </div>

                    {/* Pågående */}
                    <div className="todo-column">
                        <h3>Pågående:</h3>
                        {inProgress.map(todo => (
                            <div key={todo.id} className={`todo-item ${getStatusClass(todo.status)}`}>
                                <h4>{todo.title}</h4>
                                <p>{todo.desc}</p>
                                <button type="submit" className="delete-btn" onClick={() => deleteTodo(todo.id)}>Radera</button>
                            </div>
                        ))}
                    </div>

                    {/* Avklarad */}
                    <div className="todo-column">
                        <h3>Avklarad:</h3>
                        {completed.map(todo => (
                            <div key={todo.id} className={`todo-item ${getStatusClass(todo.status)}`}>
                                <h4>{todo.title}</h4>
                                <p>{todo.desc}</p>
                                <button type="submit" className="delete-btn" onClick={() => deleteTodo(todo.id)}>Radera</button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </section>
    );
};

export default Todos;