import Service from "./Service"

export default {
    get(){
        return Service.get('getUsers')
    },
    post(users){
        return Service.post('saveUsers', users)
    }
}