export default function (instance){
    return{
         getAPI(link){
       return instance.get('/private/switcher/module' + link)
    },
    }
}