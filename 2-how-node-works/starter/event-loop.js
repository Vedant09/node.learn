const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(()=> console.log("Timer 1 finished"),0);
setImmediate(()=> console.log("immediate time 1 finished"));


fs.readFile('test-file.txt',()=>{
    console.log("I/O Finished");
    console.log("--------------");
    setTimeout(()=> console.log("Timer 2 finished"),0);
    setTimeout(()=> console.log("Timer 3 finished"),3000);
    setImmediate(()=> console.log("immediate time 2 finished"));

    process.nextTick(()=> console.log("Process next tick"));

    crypto.pbkdf2("password","salt",10000, 1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted")
    })
    crypto.pbkdf2("password","salt",10000, 1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted")
    })
    crypto.pbkdf2("password","salt",10000, 1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted")
    })
    crypto.pbkdf2("password","salt",10000, 1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted")
    })
    crypto.pbkdf2("password","salt",10000, 1024,"sha512",()=>{
        console.log(Date.now()-start,"Password encrypted")
    })
});

console.log("top level code finished"); 