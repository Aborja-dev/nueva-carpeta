import React from 'react'
import Icon from './Icon'
import { Link, useNavigate } from 'react-router-dom'
import { deleteSesion } from '../../services/service'

export interface HeaderProps {
    name: string,
    avatar?: string
}

const Header: React.FC<HeaderProps> = ({ name, avatar }) => {
    const navigate = useNavigate()
    const onLogout = () => {
        deleteSesion()
        navigate('/')
    }
    return (
        <header className='flex py-4 shadow-lg bg-[#0f1031]'>
            <div className='flex-grow'>
            </div>
            <div className='w-1/4 h-full flex'>
                <figure className='flex items-center mr-4'>
                    {
                        avatar
                            ? <img src={avatar} alt={name} />
                            : <Icon.Avatar />
                    }
                </figure>
                <div className='space-y-1'>
                    <p className='m-0 uppercase'>{name}</p>
                    <p onClick={onLogout}>
                        <Link className='hover:underline' to={'/'}>Cerrar sesion</Link>
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Header
