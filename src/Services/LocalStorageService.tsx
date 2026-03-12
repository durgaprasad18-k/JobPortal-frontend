const setItem=(key:string, obj:any)=>{
    localStorage.setItem(key, JSON.stringify(obj));
}
const getItem=(key:string)=>{
    return JSON.parse(localStorage.getItem(key) as string);
}
const removeItem=(key:string)=>{
    localStorage.removeItem(key);
}   
export  {setItem, getItem, removeItem};