const Patient = require('../model/patient_info.model')

class PatientService {

    async getPatientInfo({ pid }) {

        const res = await Patient.findOne({ where: { id: pid } })
        console.log('1', res)
        return res.dataValues
    }
}



module.exports = new PatientService()