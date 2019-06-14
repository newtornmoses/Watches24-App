export class CardExpiry{
        months = [];
        years = [];
        year = new Date().getUTCFullYear();
 

//   get expiryMonth
expiryMonth() {
    for(let i: any = 1; i < 13; i++) {
        if(i < 10) {
          i = '0'+ i;
          
        }
        else{ i = '' + i }
        this.months.push(i)
        return this.months;
      }
}


//   get expiryYear
expiryYear() {
  for(var i = 0; i < 20; i++) {
  
    this.years.push(this.year++)
        return this.years;
   
  }
  
}



}



  