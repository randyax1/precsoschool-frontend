import React from 'react';
import TitleLabel from '../../../components/TitleLabel';
import { StudentTable } from './StudentTable';

const StudentContainer = () => {

    return (
        <div style={{ marginTop:'15px' }}>
            <TitleLabel titleLabel="Estudiantes" />
            <StudentTable/>
        </div>
    )
}

export default StudentContainer
