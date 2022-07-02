
function schemaValidator(data,schema){
    let response = schema.validate(data,{abortEarly : false, stripUnknown: true})
    if (response.error){
        throw new Error(response.error);   
    }
    return response.value;  
}

module.exports = schemaValidator
