import axios from "axios";

// Conection on localhost
const localhost = "http://localhost:8080";

const host = localhost;

const BASE_ENDPOINT = "/api";

const TEACHERUSER_ENDPOINT = BASE_ENDPOINT + "/auth/teacher";
const STUDENTUSER_ENDPOINT = BASE_ENDPOINT + "/auth/student";

const COURSE_ENDPOINT = BASE_ENDPOINT + "/courses/";
const STUDENT_ENDPOINT = BASE_ENDPOINT + "/students/"

const createAuthHeader = (token)  => {
    return { 'x-token': `${token}`};
}

export const TeacherLoginUser = async (email, password) => {
    const body = {
        "email": email,
        "password": password
    };

    return await axios.post(
        `${host}${TEACHERUSER_ENDPOINT}`,
        body
    );

};

export const StudentLoginUser = async (email, password) => {
    const body = {
        "email": email,
        "password": password
    };

    return await axios.post(
        `${host}${STUDENTUSER_ENDPOINT}`,
        body
    );

};

export const getCourses = async (token) => {
    const config = {
        headers: {
            ...createAuthHeader(token)
        }
    };

    return await axios.get(
        `${host}${COURSE_ENDPOINT}`,
        config
        );
};

export const deleteCourseById = async (courseId, token) => {
    const config = {
        headers: {
            ...createAuthHeader(token)
        }
    };

    return await axios.delete(
        `${host}${COURSE_ENDPOINT}${courseId}`,
        config
    );
};

export const getStudents = async (token) => {
    const config ={
        headers: {
            ...createAuthHeader(token)
        }
    };

    return await axios.get(
        `${host}${STUDENT_ENDPOINT}`,
        config
    );
};

export const deleteStudentById = async (studentId, token) => {
    const config = {
        headers: {
            ...createAuthHeader(token)
        }
    }

    return await axios.delete(
        `${host}${STUDENT_ENDPOINT}${studentId}`,
        config
        );
};