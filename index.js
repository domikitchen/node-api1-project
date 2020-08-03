const express = require('express');
const shortid = require('shortid');
const e = require('express');

const server = express();

server.use(express.json());

let users = [ { id: "1df3487", name: "Jane Doe", bio: "Not Tarzan's Wife, another jane"}, { id: "sdf983", name: "sdf sdf", bio: "sg g ae tbsfghsge gr"} ];

server.post('/api/users', (request, response) => {
    const user = request.body;

    if(user.hasOwnProperty('name') && user.hasOwnProperty('bio')){
        user.id = shortid.generate();
        users.push(user);
        response.status(201).json(users);
    }
    else if(user.name === undefined || user.bio === undefined){
        response.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    else{
        try{
            users;
        }
        catch(error) {
            response.status(500).json({ errorMessage: "The users information could not be retrieved." });
        }
    }

});

server.get('/api/users', (request, response) => {
    response.status(200).json(users);
    try{
        users;
    }
    catch(error) {
        response.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
});

server.get('/api/users/:id', (request, response) => {
    const idd = request.params.id.toLocaleLowerCase();
    const user = users.filter(u => u.id.toLocaleLowerCase() === idd);
    if(user[0] === undefined){ 
        response.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    }
    else{
        response.status(201).json(user);
        try{
            user;
        }
        catch(error){
            response.status(500).json({ errorMessage: "The user information could not be retrieved." });
        }
    }
});

server.delete('/api/users/:id', (request, response) => {
    const idd = request.params.id.toLocaleLowerCase();
    const user = users.filter(u => u.id.toLocaleLowerCase() === idd);
    users = users.filter(u => u.id.toLocaleLowerCase() !== idd);
    if(user[0] === undefined){ 
        response.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    }
    else{
        response.status(204).end();
        try{
            user;
        }
        catch(error){
            response.status(500).json({ errorMessage: "The user could not be removed" });
        }
    }
});

server.put('/api/users/:id', (request, response) => {
    const idd = request.params.id;
    const newUser = request.body;
    
    let found = users.find(u => u.id === idd);
    if(found && newUser.hasOwnProperty('name') && newUser.hasOwnProperty('bio')) {
        Object.assign(found, newUser);

        response.status(200).json(users);
    }
    else if(newUser.name === undefined || newUser.bio === undefined){
        response.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    else if(found === undefined){
        response.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else{
        try{
            found;
        }
        catch(error){
            response.status(500).json({ errorMessage: "The user information could not be modified." });
        }
    }
});

const port = 8000;
server.listen(port, () => console.log("server NYOOM"));