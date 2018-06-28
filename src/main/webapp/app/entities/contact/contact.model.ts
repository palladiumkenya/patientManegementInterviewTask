import { BaseEntity } from './../../shared';

export class Contact implements BaseEntity {
    constructor(
        public id?: number,
        public cellPhone?: string,
        public email?: string,
        public alternativeCellNumber?: string,
        public patient?: BaseEntity,
    ) {
    }
}
