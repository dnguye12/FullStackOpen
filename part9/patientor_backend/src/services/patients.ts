import patientsData from '../../data/patients'

import { NonSensitivePatient } from '../types';

const patients: NonSensitivePatient[] = patientsData as NonSensitivePatient[];

const getPatients = () : NonSensitivePatient[] => {
    return patients;
};

export default {
    getPatients
};