Buffer.prototype.split=function(sep){
    let sepLen =Buffer.from(sep).length;
    let arr=[];
    let offset=0;
    let currentIndex = 0 ;
    while((currentIndex = this.indexOf(sep,offset)) !== -1){
        arr.push( this.slice(offset,currentIndex) );
        offset = currentIndex + sepLen;
    }
    arr.push(this.slice(offset));
    return arr ;
}