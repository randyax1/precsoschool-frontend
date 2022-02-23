import axios from "axios";

// Conection on localhost
const localhost = "http://localhost:8080";

const host = localhost;
const BASE_ENDPOINT = "/api";
const TEACHERUSER_ENDPOINT = BASE_ENDPOINT + "/auth/teacher/";

export const TeacherLoginUser = async (email, password) => {
    const body = {
        "email": email,
        "password": password
    };
    console.log(body);
    return await axios.post(
        `${host}${TEACHERUSER_ENDPOINT}`,
        body
    );

};
