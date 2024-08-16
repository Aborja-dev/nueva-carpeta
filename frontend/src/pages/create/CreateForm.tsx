export const proposalFormDataExample: ProposalFormData = {
    title: 'Creando un buscador de texto con React',
    abstract: 'En este taller, vamos a ver c mo crear un buscador de texto utilizando React. Utilizaremos Context API para manejar el estado de la aplicaci n. Al final, vamos a tener una aplicaci n que pueda buscar texto en una lista de palabras.',
    estimatedDuration: 60,
    streamed: false,
    topics: ['DEVELOPER', 'REACT'],
}
export interface ProposalFormData {
    title: string;
    abstract: string;
    estimatedDuration: number;
    streamed: boolean;
    topics: string[];
}

export const CreateForm = ({onSubmit}: {onSubmit: (values: ProposalFormData) => void}) => {
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const entries = Object.fromEntries(formData.entries())
        const values: ProposalFormData = {
            title: entries.title as string,
            abstract: entries.abstract as string,
            estimatedDuration: Number(entries.estimatedDuration),
            streamed: entries.streamed === 'true',
            topics: [entries.topics as string]
        }
        onSubmit(values)

    }
    return (
        <form onSubmit={submitHandler}>
            <fieldset>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
            </fieldset>
            <fieldset>
                <label htmlFor="abstract">Abstract</label>
                <textarea id="abstract" name="abstract" rows={5}></textarea>
            </fieldset>
            <fieldset>
                <label htmlFor="estimatedDuration">Estimated Duration</label>
                <input type="number" id="estimatedDuration" name="estimatedDuration" />
            </fieldset>
            <fieldset>
                <label htmlFor="streamed">Streamed</label>
                <input type="radio" id="yes-streamed" name="streamed" value="true" />
                <label htmlFor="yes-streamed">Yes</label>
                <input type="radio" id="no-streamed" name="streamed" value="false" />
                <label htmlFor="no-streamed">No</label>
            </fieldset>
            <fieldset>
                <label htmlFor="topics">Topics</label>
                <input type="text" id="topics" name="topics" />
            </fieldset>
            <button>Submit</button>
        </form>
    )
}