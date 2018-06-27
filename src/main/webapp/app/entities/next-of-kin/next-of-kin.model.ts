import { BaseEntity } from './../../shared';

export class NextOfKin implements BaseEntity {
    constructor(
        public id?: number,
        public surname?: string,
        public otherNames?: string,
        public idNumber?: string,
        public patients?: BaseEntity[],
    ) {
    }
}
