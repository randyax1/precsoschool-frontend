import React from 'react';
import TitleLabel from '../../../components/TitleLabel';
import { CourseTable } from '../CourseContainer/CourseTable';

const CourseContainer = () => {

    return (
        <div style={{ marginTop:'15px' }}>
            <TitleLabel titleLabel="Cursos" />
            <CourseTable/>
        </div>
    )
}

export default CourseContainer
