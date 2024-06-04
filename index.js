const express =  require('express');
const app = express();
const PORT = 3000;
const users = require("./MOCK_DATA.json");
const fs = require('fs');

app.use(express.urlencoded({ extended: false}));

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id); 
    return res.json(user);
});

app.post("/api/users", (req,res) => {
    const body = req.body;
    users.push({...body, id: users.length +1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
       return res.json({status: "success",id: users.length}) 
    });

});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));