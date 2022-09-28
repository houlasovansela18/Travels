export default (date : Date) => {

    if(date === null){
        console.log('Invalid Date');
    }
    return date.toLocaleDateString();
    
}