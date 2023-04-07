function formatPrice (price: number) {
    const numString = price.toString();
  
    // Định dạng chuỗi số thành VND
    const formattedNumber = numString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return formattedNumber;
}
export {
    formatPrice
}