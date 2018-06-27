import { BaseEntity } from './../../shared';

export class Enrollment implements BaseEntity {
    constructor(
        public id?: number,
        public enrollmentDate?: any,
        public enrollmentNumber?: string,
        public patient?: BaseEntity,
    ) {
    }
}
