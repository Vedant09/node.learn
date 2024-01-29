const fs = require('fs')
const { off } = require('process')

//Blocking, synchronous way
// const textinput = fs.readFileSync('./starter/txt/input.txt','utf-8')
// console.log(textinput)

// const textoutput = `This is what we know about the avocado : ${textinput}.\nCreated on ${Date.now()}` 

// fs.writeFileSync('./starter/txt/output.txt',textoutput)
// console.log("done")

//non-blocking, asynchronous way
fs.readFile('./starter/txt/start.txt','utf-8',(err,data1)=>{
    if(err) return console.log('error 💣')
    fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2)
        fs.readFile('./starter/txt/append.txt','utf-8',(err,data3)=>{
            console.log(data3)
            fs.writeFile('./starter/txt/final.txt',`${data2}\n${data3}`,'utf-8', err =>{
                if(err) throw err;
                console.log("youre file has been written")
            } )
        })
    })
})
console.log('reading....')