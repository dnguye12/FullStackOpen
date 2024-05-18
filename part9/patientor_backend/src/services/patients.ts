import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: NonSensitivePatient[] = patientsData as NonSensitivePatient[];

const getPatients = (): NonSensitivePatient[] => {
    return patients;
};

const addPatient = ( patient : NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);

    return newPatient;
}

export default {
    getPatients,
    addPatient
};