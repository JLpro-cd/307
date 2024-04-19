import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };
  
  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

/*app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});
*/

  app.get("/users", (req, res) =>{
    res.status(200).json(users)
  });

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = 'ID' + Math.random().toString(10);
    const addedUser = addUser(userToAdd);
    res.status(201).json(addedUser)
  });

  app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });