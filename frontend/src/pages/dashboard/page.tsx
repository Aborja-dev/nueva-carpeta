import { Link, useLoaderData } from 'react-router-dom'
import { Proposal } from '../../types/types'

const DashboardPage = () => {
    const { proposalsList } = useLoaderData() as { proposalsList: Proposal[] }
    return (
        <>
            <div className='mx-auto w-5/6'>
                <h1 className='text-3xl text-center py-4'>Dashboard</h1>
                <Link to={'/create'}>Crear propuesta</Link>
                <table>
                    <thead>
                        <tr>
                            <th className='text-center bg-transparent'>Title</th>
                            <th className='text-center bg-transparent'>Event</th>
                            <th className='text-center bg-transparent'>Status</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboardPage
