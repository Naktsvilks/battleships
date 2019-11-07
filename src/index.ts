import application from './app';
import { createConnection } from 'typeorm';

const PORT = 3000;

console.log('--------------------');
console.log('Creating connection');
createConnection()
    .then(() => {
        console.log('Connected');
        new application().app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => console.error('TypeORM connection error: ', error));
