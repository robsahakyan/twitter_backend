import { ForbiddenException } from '@nestjs/common';

export class EmptyBodyException extends ForbiddenException {
    constructor() {
        super('error',`request body is empty.`);
    }
}