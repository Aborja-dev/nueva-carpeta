import React, { useState } from 'react'
import { ProposalFormData } from '../create/page'

const UpdateForm = ({ onSubmit, proposal }) => {
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const entries = Object.fromEntries(formData.entries())
        const values: Partial<ProposalFormData> = {
            abstract: entries.abstract as string,
            estimatedDuration: Number(entries.estimatedDuration),
            streamed: entries.streamed === 'true'
        }
        onSubmit(proposal.id, values)
    }
    const [streamed, setStreamed] = useState(true)
    return (
        <form onSubmit={submitHandler}>
            <h2 className="font-bold text-2xl">{proposal.title}</h2>
            <fieldset>
                <label htmlFor="abstract">Abstract</label>
                <textarea defaultValue={proposal.abstract} id="abstract" name="abstract" rows={5}></textarea>
            </fieldset>
            <div className="flex gap-4">
                <fieldset>
                    <label htmlFor="estimatedDuration">Estimated Duration</label>
                    <input defaultValue={proposal.estimatedDuration} type="number" id="estimatedDuration" name="estimatedDuration" />
                </fieldset>
            </div>

            <fieldset>
                <label htmlFor="streamed">Streamed</label>
                <input checked={streamed} onChange={() => setStreamed(!streamed)} type="radio" id="yes-streamed" name="streamed" value="true" />
                <label htmlFor="yes-streamed">Yes</label>
                <input checked={!streamed}  onChange={() => setStreamed(!streamed)} type="radio" id="no-streamed" name="streamed" value="false" />
                <label htmlFor="no-streamed">No</label>
            </fieldset>

            <button>Submit</button>
        </form>
    )
}

export default UpdateForm
