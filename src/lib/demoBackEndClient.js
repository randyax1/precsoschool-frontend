import axios from "axios";

// Conection on localhost
const localhost = "http://localhost:8080";

const host = localhost;
const BASE_ENDPOINT = "/api";

const TEACHERUSER_ENDPOINT = BASE_ENDPOINT + "/auth/teacher";

const STUDENTUSER_ENDPOINT = BASE_ENDPOINT + "/auth/student";

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
