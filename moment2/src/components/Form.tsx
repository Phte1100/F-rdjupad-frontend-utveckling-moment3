import { useState } from 'react';
import * as Yup from 'yup';

// Formulärkomponenten tar emot en funktion `refreshTodos` som uppdaterar listan i `Todos.tsx`
const Form = ({ refreshTodos }: { refreshTodos: () => void }) => {  

    interface FormData {
        title: string;
        desc: string;
        status: string;
    }

    // Typ för eventuella valideringsfel
    interface ErrorsData {
        title?: string;
        desc?: string;
        status?: string;
    }

    // State för att lagra formulärdata
    const [formData, setFormData] = useState<FormData>({
        title: '',
        desc: '',
        status: 'not_started' // Standardstatus
    });

    // State för att lagra valideringsfel
    const [errors, setErrors] = useState<ErrorsData>({});

    // Valideringsregler för formuläret med Yup
    const validationSchema = Yup.object({
        title: Yup.string().min(3, 'Minst 3 tecken krävs').required('Titel är obligatorisk'),
        desc: Yup.string().max(200, 'Max 200 tecken').required('Beskrivning är obligatorisk'),
        status: Yup.string().required('Status är obligatorisk')
    });

    // Funktion som hanterar när formuläret skickas in
    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault(); // Förhindra sidomladdning

        try {
            // Validera formuläret enligt Yup-reglerna
            await validationSchema.validate(formData, { abortEarly: false });

            // Skicka data till backend för att spara den nya uppgiften
            const response = await fetch('https://f-rdjupad-frontend-utveckling-moment-2.onrender.com/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Misslyckades att spara Todo');
            }

            console.log('Todo inlagd:', formData);

            // Uppdatera listan i `Todos.tsx` genom att anropa `refreshTodos`
            refreshTodos();

  
            setFormData({
                title: '',
                desc: '',
                status: 'not_started', 
            });

            setErrors({}); 

        } catch (error) {
            // Hantera valideringsfel från Yup
            if (error instanceof Yup.ValidationError) {
                const validationErrors: ErrorsData = {};
                error.inner.forEach(err => {
                    const prop = err.path as keyof ErrorsData;
                    validationErrors[prop] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error("POST-fel:", error);
            }
        }
    };

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Titel:</label>
            <input
                type="text"
                name="title"
                placeholder="Titel"
                value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            />
            {errors.title && <p className="error">{errors.title}</p>}

            <label htmlFor="desc">Beskrivning:</label>
            <input
                type="text"
                name="desc"
                placeholder="Beskrivning"
                value={formData.desc}
                onChange={(event) => setFormData({ ...formData, desc: event.target.value })}
            />
            {errors.desc && <p className="error">{errors.desc}</p>}

            <label htmlFor="status">Status:</label>
            <select
                name="status"
                id="status"
                value={formData.status}
                onChange={(event) => setFormData({ ...formData, status: event.target.value })}
            >
                <option value="not_started">Ej påbörjad</option>
                <option value="in_progress">Pågående</option>
                <option value="completed">Avklarad</option>
            </select>
            {errors.status && <p className="error">{errors.status}</p>}

            <input type="submit" value="Skapa" className="submit"/>
        </form>
    );
};

export default Form;
