import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/cross_black.svg';
import INALogo from '../../assets/INA_icon_vertical_color.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img width="100" height="100" src={logoImg} alt="Logo INA" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#fbd700" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img width="390.6" height="279.4" src={INALogo} alt="INA" />
        </div>
    );
}