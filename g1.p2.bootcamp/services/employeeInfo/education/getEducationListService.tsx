import error403 from "../../../utils/error403";
import getEducationListDao from '../../../db/employeeInfo/getEducationListDao';

let getEducationList = async (params: any) =>{
    try{
        // re structure the data
        let limit ;
        let search;
        let skip;

        !params.limit  ? limit = 10 : limit = parseInt(params.limit);
        !params.page   ? skip = 0: skip = (parseInt(params.page) -  1 ) * limit;
        !params.search ? search = '' : search = params.search.toString();

        let preData = {
            skip : skip,
            limit : limit,
            search : search
        }   
        let resp = await  getEducationListDao(preData);
        return resp;
    }catch(e){
        return error403('Invalid Request')
    }
}

export default getEducationList;