export class Model {
    static schema

    constructor(data) {
        this.constructor.validateTypes(data)
    }

    /**
     * Validates the data with the defined schema
     * @param data
     */
    static validateTypes(data) {
        for (const key in this.schema) {
            if (data[key] === undefined && this.schema[key].required === false) continue
            if (this.schema[key].type === "array") {
                if (data[key] === undefined || !Array.isArray(data[key])) {
                    throw new TypeError(`Invalid type for ${key}: expected ${this.schema[key].type}, got ${typeof data[key]}`)
                }
                if (typeof this.schema[key].objectName !== "function") {
                    data[key].forEach((element) => {
                        if (typeof element !== this.schema[key].objectName) {
                            throw new TypeError(`Invalid type for element of array ${key}: expected ${this.schema[key].objectName}, got ${typeof element}`)
                        }
                    })
                }
            } else {
                if (data[key] === undefined || typeof data[key] !== this.schema[key].type) {
                    throw new TypeError(`Invalid type for ${key}: expected ${this.schema[key].type}, got ${typeof data[key]}`)
                }
            }
        }
    }
}

/**
 * Shorthand for declaring schema types
 */
export const SchemaTypes = {
    String: {type: "string", objectName: "", required: true},
    StringOptional: {type: "string", objectName: "", required: false},
    Number: {type: "number", objectName: "", required: true},
    NumberOptional: {type: "number", objectName: "", required: false},
    StringArray: {type: "array", objectName: "string", required: true},
    StringArrayOptional: {type: "array", objectName: "string", required: false},
    NumberArray: {type: "array", objectName: "number", required: true},
}