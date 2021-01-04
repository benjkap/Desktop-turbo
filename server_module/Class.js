class Test {
    constructor() {
        console.log('Class created');
    }
    initTest(){
        console.log('test');
    }
    testHello(){
        this.initTest();
        console.log('Hello');
    }
}
module.exports=Test;