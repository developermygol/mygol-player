import axios from '../axios';
import { flow } from 'mobx';
import { requestAsync } from '../components/Utils';
import { removeByIdInArray, updateByIdInArray, sortArrayById } from '../components/Data';


const defaultOptions = {
    beforeEdit: null, 
    beforeCreate: null,

    afterGet: null,
    afterGetAll: (responseData) => { return responseData; },
    afterCreate: (requestData, responseData) => { requestData.id = responseData; return requestData; },    // Response is the new Id, set it and return the updated original. 
    afterEdit: (requestData, responseData) => { return requestData; },                                     // Response is true if edited, so we update the table with edited data from the user
    postProcessAll: (all) => { return sortArrayById(all) }                                                           // By default, we sort by Id after loading
}


export const createCrudActions = (target, listUrl, addUrl = null, editUrl = null, removeUrl = null, options = defaultOptions) => {
    addUrl = addUrl || listUrl;
    editUrl = editUrl || listUrl;
    removeUrl = removeUrl || listUrl;

    return {
        getAll: flow( function *(url = null) {
            let result = yield requestAsync(target, axios.get, null, url || listUrl);
            
            if (options.afterGetAll) result = options.afterGetAll(result);

            target.all = result;    // result is converted to observableArray here

            if (options.postProcessAll) {
                target.all = options.postProcessAll(target.all);
            }

            return result;
        }),

        get: flow( function *(id, url = null) {
            const detailUrl = listUrl + '/' + id;

            //target.current = null;

            let result = yield requestAsync(
                                    target,
                                    axios.get,
                                    null, 
                                    url || detailUrl
            );

            if (options.afterGet) result = options.afterGet(result);

            if (!target.all) target.all = [];
            updateByIdInArray(target.all, id, result);

            target.current = result;

            return result;
        }),

        create: flow( function *(data, url = null, okMessage = null) {
            
            if (options.beforeCreate) data = options.beforeCreate(data);

            let result = yield requestAsync(
                                    target, 
                                    axios.post, 
                                    okMessage || 'Item created ok', 
                                    url || addUrl, 
                                    data);
            if (!result) return;
    
            if (options.afterCreate) result = options.afterCreate(data, result);
            target.all.push(result);

            if (options.postProcessAll) target.all = options.postProcessAll(target.all);

            return result;
        }),
    
        edit: flow( function *(data, url = null, okMessage = null) {
            
            if (options.beforeEdit) data = options.beforeEdit(data);
            
            let result = yield requestAsync(
                                    target, 
                                    axios.put, 
                                    okMessage || 'Item updated ok', 
                                    url || editUrl, 
                                    data);
            if (!result) return;
    
            if (options.afterEdit) result = options.afterEdit(data, result);

            updateByIdInArray(target.all, data.id, result);

            if (options.postProcessAll) target.all = options.postProcessAll(target.all);

            return result;
        }),
    
        remove: flow( function *(data, url = null, okMessage = null) {
            const result = yield requestAsync(
                                    target, 
                                    axios.post, 
                                    okMessage || 'Item deleted ok', 
                                    url || removeUrl + '/delete', 
                                    data);
            if (!result) return;
    
            removeByIdInArray(target.all, data.id);

            if (options.postProcessAll) target.all = options.postProcessAll(target.all);
        })

    }
}