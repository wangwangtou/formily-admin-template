import { Schema } from "@formily/json-schema";

interface IEntityStore {

}

type EntityFieldType = 'varchar' | 'char' | 'text' | 'int' | 'uint' | 'float' | 'double' | 'boolean' | 'date' | 'datetime' | 'timestamp' | 'timestamp_millis' | (string & {});

interface IEntityItemBase {
    desc: string; // 描述
    name: string; // 名称
}

interface IEntityField extends IEntityItemBase {
    type: EntityFieldType;
    required: boolean; // 是否必填
    default?: any; // 默认值
    length?: number; // 字符长度 / 数字长度
    precision?: number; // 数字宽度
    pattern?: string | RegExp;
    validators: any; // 校验器 
}

type EntityRelationType = 'one_one' | 'one_many';

interface IEntityRelation {
    type: EntityRelationType
}

interface IEntity extends IEntityItemBase {
    storage: IEntityStore; // 存储器
    parent: IEntity;
    children: (IEntity & IEntityRelation)[];
    fields: IEntityField[];
}

type EntityPageMode = 'create' | 'retrieve' | 'update' | 'delete' | 'list' | string

interface IEntityPageComponents extends IEntityItemBase {
    entity?: IEntity | string;
    field?: IEntityField | string;
    formRef: string;
    children: IEntityPageComponents[];
}

interface IEntityPage extends IEntityItemBase {
    mode: EntityPageMode,
    components: IEntityPageComponents[];
}

type EntityFieldForm = (Schema | ((field: IEntityField) => Schema))  & { ref: string };

interface IEntityDisplay {
    entity: IEntity;
    formPool: EntityFieldForm[];
    pages: IEntityPage[];
}

interface PageForm {
    schema: Schema;
    scope: any;
    components: any;
}

export class QuickCRUDCore implements IEntityDisplay {
    entity: IEntity;
    formPool: EntityFieldForm[];
    pages: IEntityPage[];

    constructor(config: IEntityDisplay) {
        this.entity = config.entity;
        this.formPool = config.formPool;
        this.pages = config.pages;
    }

    getPageForm(mode: EntityPageMode): PageForm {
        const schema: Schema = null;
        const scope: any = null;
        const page = this.pages.find(page => page.mode == mode);
        if (page) {
            return this.transtoPageForm()
        }
        return null;
    }
}