import axios from 'axios';

export class AppService {

    public async getStudMarks(): Promise<any> {
        const response = await axios.get('http://localhost:8000/students_marks');
        return response.data;
    }
}