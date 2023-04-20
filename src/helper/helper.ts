import { ObjectId } from 'mongodb'

export const logs = (input:any) => console.log(input);
export const logsError = (input:any) => console.error(input);
export const sendResponse = (input: {} | [] | string) => {
    if(typeof input === 'string'
        || input === null
        || input === undefined
        || (
            typeof input === 'object' && Object.keys(input).length === 0 
        )
        || (
            Array.isArray(input) && input.length === 0
        )
        || !input
    ){
        return {
            ok: false,
            result: {
                message: input || 'Something Wrong'
            }
        }
    }
    return {
        ok: true,
        result: input
    }
}

export const stringToObjectID = (_id: ObjectId) => new ObjectId(_id);

export const verifyGmail = (gmail:string) => /^[a-z]([a-z0-9]+)(\.?[a-z0-9]+)@gmail.com$/g.test(gmail);
export const verifyMobile = (mobile:string) => /^(0|\+[9][1])?[6-9][0-9]{9}$/g.test(mobile);