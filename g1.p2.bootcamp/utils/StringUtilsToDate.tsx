export default (date : String) => {
    
    if(date === null || date.length < 6){
        console.log('Invalid Date');
    }
   
    let DateFormat = new Date(`${date}`);

    DateFormat.setDate(DateFormat.getDate() + 1)
    DateFormat.setUTCHours(0,0,0,0);

    return  DateFormat;

}