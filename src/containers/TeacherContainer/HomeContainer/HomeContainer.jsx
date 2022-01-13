import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../auth/authContext';
import TitleLabel from '../../../components/TitleLabel';

const HomeContainer = () => {

    const { user } = useContext(AuthContext);
    console.log(user.name)
    
    return (
        <div style={{ marginTop:'12px' }}>
            <TitleLabel titleLabel={"¡Bienvenido " + user.name + "!"} />
        </div>
    )
}

export default HomeContainer
