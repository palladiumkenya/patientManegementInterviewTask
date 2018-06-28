import { BaseEntity } from './../../shared';

export class ChangeSet implements BaseEntity {
    constructor(
        public id?: number,
        public tableName?: string,
        public operation?: string,
        public columnName?: string,
        public entity?: number,
        public user?: string,
        public oldValue?: string,
        public newValue?: string,
    ) {
    }
}
