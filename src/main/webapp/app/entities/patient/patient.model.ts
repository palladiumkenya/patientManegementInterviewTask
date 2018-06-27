import { BaseEntity } from './../../shared';

export class Patient implements BaseEntity {
    constructor(
        public id?: number,
        public surname?: string,
        public otherNames?: string,
        public dateOfBirth?: any,
        public county?: string,
        public subcounty?: string,
        public ward?: string,
        public village?: string,
        public isDeleted?: boolean,
        public enrollments?: BaseEntity[],
        public nextOfKin?: BaseEntity,
    ) {
        this.isDeleted = false;
    }
}
