import { Link, useLoaderData } from 'react-router-dom'
import { Proposal } from '../../types/types'
import { CandidateRequest } from '../../services/api_gateway'

const DashboardPage = () => {
    const { proposalsList } = useLoaderData() as { proposalsList: Proposal[] }
    const deleteHandler = async(id: number) => {
        const confirm = window.confirm('Are you sure you want to delete this proposal?')
        if (confirm) {
            return await CandidateRequest.deleteOne(id)
        } else {
            return
        }
        
    }
    return (
        <>
            <div className='mx-auto w-5/6'>
                <h1 className='text-3xl text-center py-4'>Dashboard</h1>
                <button>
                    <Link to={'/create'}>Crear propuesta</Link>
                </button>
                <table>
                    <thead>
                        <tr>
                            <th className='text-center bg-transparent'>Title</th>
                            <th className='text-center bg-transparent'>Event</th>
                            <th className='text-center bg-transparent'>Status</th>
                            <th className='text-center bg-transparent'></th>
                            <th className='text-center bg-transparent'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposalsList.map(row => (
                            <tr key={row.id}>
                                <td className='bg-transparent border-l-2 border-l-slate-200'>{row.title}</td>
                                <td className='bg-transparent border-l-2 border-l-slate-200'>{row.event}</td>
                                <td className='bg-transparent border-l-2 border-l-slate-200'>{row.status}</td>
                                <td className='bg-transparent border-l-2 border-l-slate-200'>
                                    <button>
                                        <Link to={`/detail/${row.id}`}>Ver detalles</Link>
                                    </button>
                                </td>
                                <td className='bg-transparent border-l-2 border-l-slate-200'>
                                    <button onClick={() => deleteHandler(row.id)} className='bg-red-600'>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboardPage
