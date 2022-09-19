import { ISchema } from '@formily/json-schema'
export interface DesignablePage {
    form: {
        labelCol: Number,
        wrapperCol: Number
    },
    schema: ISchema
}
