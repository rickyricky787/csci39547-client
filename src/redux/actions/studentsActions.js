import {

    START_FETCHING_STUDENTS,
    FETCH_A_STUDENT,
    FETCH_ALL_STUDENTS,
    ADD_A_STUDENT,
    REMOVE_A_STUDENT
} from "../types/studentTypes";
import {FETCH_A_CAMPUS} from "../types/campusesTypes";


export const fetchAllStudents = () => {
    return{
        type: START_FETCHING_STUDENTS,
    };
};


export const fetchStudent = (id) => {
    return {
        type: FETCH_A_STUDENT,
        payload: id,
    };
};

export const addStudent = () => {
    return {
        type: ADD_A_STUDENT,
    };
};


export const removeStudent = () => {
    return {
        type: REMOVE_A_STUDENT,
    };
};