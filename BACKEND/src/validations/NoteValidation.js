import joi from 'joi';

//create schema
const noteSchema=joi.object({
    title:joi.string().required(),
    content:joi.string().required(),
    tags:joi.string()
})


//update schema
const updateSchema=joi.object({
    title:joi.string(),
    content:joi.string(),
    tags:joi.string()
})

export {noteSchema,updateSchema};