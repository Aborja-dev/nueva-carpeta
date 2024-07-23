import { client } from '@model/config/connection';

console.log('Hello, model from Backend!');

async function main() {
    await client.$connect();
}

main();
