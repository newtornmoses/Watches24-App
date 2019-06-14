export interface Cart {
    
    Items: Array<item>;
    Total_price: number;
    Total_Qty: number;

}


export interface item{
    title: string;
    price: number;
    description: string;
    Qty: number;
    image: string

}

