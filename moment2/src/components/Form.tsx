import { useState } from 'react';
import * as Yup from 'yup';

const Form = () => {

    interface FormData {
        title: string;
        desc: string;
        status: string;
    }

    interface ErrorsData {
        title?: string;
        desc?: string;
        status?: string;
    }

    // State för formulärdata
    const [formData, setFormData] = useState<FormData>({
        title: '',
        desc: '',
        status: 'not_started'
    });

    const statusArr = ['not_started', 'in_progress', 'completed'];

    // Valideringsschema
    const validationSchema = Yup.object({
        title: Yup.string().min(3, 'Minst 3 tecken krävs').required('Titel är obligatorisk'),
        desc: Yup.string().max(200, 'Max 200 tecken').required('Beskrivning är obligatorisk'),
        status: Yup.string().required('Status är obligatoriskt')
    });

    // State för felmeddelanden
    const [errors, setErrors] = useState<ErrorsData>({});

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            await validationSchema.validate(formData, { abortEarly: false });
    
            // Skicka POST-anrop till backend
            const response = await fetch('https://f-rdjupad-frontend-utveckling-moment-2.onrender.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Misslyckades att spara Todo');
            }
    
            console.log('Todo inlagd', formData);
    
            // Återställ formuläret efter lyckad POST
            setFormData({
                title: '',
                desc: '',
                status: 'not_started',
            });
    
            setErrors({});
        } catch (error) {
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

    const statusOptions = [
        { value: "not_started", label: "Ej påbörjad" },
        { value: "in_progress", label: "Pågående" },
        { value: "completed", label: "Avklarad" }
    ];
    

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
                {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label} {/* ✅ Visar svenska namn i dropdown */}
                    </option>
                ))}
            </select>
            {errors.status && <p className="error">{errors.status}</p>}

            <input type="submit" value="Skapa" className="submit"/>
        </form>
    );
};

export default Form;
