import {mongoose} from 'mongoose';
import {Model, SchemaTypes as S} from "../model/Model.js";
import {Card} from "../model/Card.js";

/**
 * Build a Mongoose schema from a Model schema
 * @param modelClass <Model> : The model class
 * @return  The corresponding mongoose schema
 */
export function buildMongooseSchema(modelClass) {
    if (!(modelClass.prototype instanceof Model)) throw new Error('modelClass must be a Model');
    const schemaOptions = {}
    const schema = modelClass.schema
    for (const key in schema) {
        switch (schema[key].type) {
            case 'string':
                schemaOptions[key] = {type: String, required: schema[key].required}
                break
            case 'number':
                schemaOptions[key] = {type: Number, required: schema[key].required}
                break
            case 'array':
                switch (schema[key].objectName) {
                    case 'string':
                        schemaOptions[key] = {type: [String], required: schema[key].required}
                        break
                    case 'number':
                        schemaOptions[key] = {type: [Number], required: schema[key].required}
                        break
                    default:
                        if (!(schema[key].objectName.prototype instanceof Model)) throw new Error(`Unknown schema "${schema[key].objectName}"`)
                        schemaOptions[key] = {
                            type: [buildMongooseSchema(schema[key].objectName)],
                            required: schema[key].required
                        }
                }
                break
            case 'object':
                if (!(schema[key].objectName.prototype instanceof Model)) throw new Error(`Unknown schema "${schema[key].objectName}"`)
                schemaOptions[key] = {
                    type: buildMongooseSchema(schema[key].objectName),
                    required: schema[key].required
                }
                break
        }
    }
    return new mongoose.Schema(schemaOptions)
}

export const projection = { _id: 0, __v:0}