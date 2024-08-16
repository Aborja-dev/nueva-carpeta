export interface ProposalFormData {
    title: string;
    abstract: string;
    estimatedDuration: number;
    streamed: boolean;
    uniqueCode: string;
    topics: string[];
}

export const ProposalForm = () => {
    return (
        <form>
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
        </form>
    )
}