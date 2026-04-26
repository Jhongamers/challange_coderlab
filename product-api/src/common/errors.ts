export class NotFoundError extends Error {
    constructor(entity: string, key: number, attribute: string = `id`){
        super(`${entity} with ${attribute} ${key} not found`);
    }
}