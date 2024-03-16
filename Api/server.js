const express = require('express');
const port = process.env.port || 3000;
const app = express();

const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json(JSON.parse(data));
        }
    })
})
//*get Method :
app.get('/api/get',(req,res)=>{
    const getdata=req.query;
    fs.readFile('./data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            const objdata=JSON.parse(data);
            objdata.push(getdata);
            fs.writeFile('./data.json',JSON.stringify(objdata),(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).json({message:"data is send in get method"});
                }
            })
        }
    })
})
//*post
app.post('/api/post',(req,res)=>{
    const fromdata=req.body;
    fs.readFile('./data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            const objdata=JSON.parse(data)||[];
            objdata.push(fromdata);
            fs.writeFile('./data.json',JSON.stringify(objdata),(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).json({message:"data send in post method"});
                }
            })
        }
    })
})
//*put method :
app.put('/api/put/:id',(req,res)=>{
    let id=req.params.id;
    let name=req.body.name; //change korbo
    fs.readFile('./data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            let users=JSON.parse(data);
            let user=users.find(item=>
                item.id===id
            )
            if(!user){
                return res.status(404).json({message:'user not found'});
            }
            user.name=name;
            fs.writeFile('./data.json',JSON.stringify(users),(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).json({message:`update this ${id} no`})
                }
            })
        }
    })
})
//*Delete :
app.delete('/api/delete/:id',(req,res)=>{
    let id=req.params.id;
    fs.readFile('./data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            let user=JSON.parse(data);
            const index=user.findIndex(item=>item.id===id);
            if(index === -1){
                res.status(400).json({message:'user not found'});
            }
            user.splice(index,1);
            fs.writeFile('./data.json',JSON.stringify(user),(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).json({message:`user is deleted id no ${id}`});
                }
            })
        }
    })
})
app.listen(port, () => {
    console.log(`Running the port no ${port}`);
})