const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const argon2 = require("argon2");

app.set("port", 8080);
var Pool = require("pg").Pool;
var config = {
	host: "localhost",
	user: "searchuser",
	password: "searchuser",
	database: "supersearch"
};
var pool = new Pool(config);

app.post("/api/login", async (req, res) => {
  //message: 1=successful, 2=pw wrong, 3=un not found
    console.log("api/login " + req.body.username);
    const username = req.body.username;
    const password = req.body.password;
    try {
      const query = "SELECT * from users where username = $1";
      const result = await pool.query(query, [username]);
      if (result.rowCount == 1) {
        if (await argon2.verify(result.rows[0].password, password)) {
          res.json({name:username, zip:result.rows[0].zipcode,message:1});
          //res.json("Log In successful");
        } else {
          res.json({name:null, zip:null, message:2});
          //res.json("Password incorrect");
        }
      } else {
        res.json({name:null, zip:null, message:3});
        //res.json("username not found");
      }
    } catch (err) {
      console.log("ERROR " + err);
    }
  });
  
  app.post("/api/create", async (req, res) => {
    let hash;
    const username = req.body.username;
    const password = req.body.password;
    const zip = req.body.zipcode;
    try {
      hash = await argon2.hash(password);
      const query = "INSERT INTO users (username, password, zipcode) VALUES ($1, $2, $3)";
      const result = await pool.query(query, [username, hash, zip]);
      //console.log(result);
      if (result.rowCount == 1) {
        res.json({name:username, zip:zip,message:4});
        //res.json("User created");
      } else {
        res.json({name:null, zip:null,message:5});
        //res.json("User not created");
      }
    } catch (err) {
      console.log("ERROR " + err);
      if (err.message.search("duplicate") != -1) {
        res.json({name:null, zip:null,message:6});
        //res.json("Username taken");
      }
    }
  });

  //SELECT ALL BY TYPE (/api/usersearch)
  //select s.name, s.address, s.city, s.zip, t.type
  // from stores_types st 
  //inner join stores s on s.id=st.store_id 
  //inner join types t on t.id=st.type_id 
  //where t.type ilike '%$1%' or s.name ilike '%$1%';
    //OR
  //select s.name, s.address, s.city, s.zipcode, t.type 
  // from stores s, types t, stores_types st
  //where s.id=st.store_id and t.id=st.type_id 
  //and (t.type ilike '%$1%' or s.name ilike '%$1%');
  app.get("/api/usersearch", async (req, res) => {
    try {
      const template = 
      "select DISTINCT st.id, s.name, s.address, s.city, s.zipcode, t.type "
      + "from stores s, types t, stores_types st, users u "
      + "where s.id=st.store_id and t.id=st.type_id "
      + "and s.zipcode=u.zipcode and u.username=$2 "
      + "and (t.type ilike $1 or s.name ilike $1) limit 20;";
      const response = await pool.query(template, ['%' + req.query.param + '%',req.query.username]);

      const templateMovies = 
      "select DISTINCT m.id, m.theater, m.movie as name, m.address, m.city, m.zipcode, 'movie' as type "
      + "from movies m, users u "
      + "where m.zipcode=u.zipcode and u.username=$2 "
      + "and m.movie ilike $1 limit 20;";
      const responseMovie = await pool.query(templateMovies, ['%' + req.query.param + '%',req.query.username]);
      
      if (responseMovie.rowCount == 0) {
        if(response.rowCount == 0) {
	  res.json({ info : response.rows });
        } else {
          const results = response.rows.map(function(item) {
            return item;
          });          
          res.json({ info: results });
        }
      } else {
        const resultsMovie = responseMovie.rows.map(function(item) {
          return item;
        });  
        res.json({ info: resultsMovie });
      }
      
    } catch (err) {
      console.error("Error running query " + err);
    }
  });

  //SELECT BY USER ZIP (/api/search)
  //select s.name, s.address, s.city, s.zipcode, t.type 
  // from stores s, types t, stores_types st, users u 
  //where s.id=st.store_id and t.id=st.type_id 
  //and s.zipcode=u.zipcode and u.username='kfrye' 
  //and (t.type ilike '%$1%' or s.name ilike '%$1%');
  app.get("/api/search", async (req, res) => {
    try {
      const template = "select DISTINCT st.id, s.name, s.address, s.city, s.zipcode, t.type "
                     + "from stores s, types t, stores_types st "
                     + "where s.id=st.store_id and t.id=st.type_id "
                     + "and (t.type ilike $1 or s.name ilike $1) limit 20;";
          
      const response = await pool.query(template, ['%' + req.query.param + '%']);

      const templateMovies = 
      "select DISTINCT m.id, m.theater, m.movie as name, "
      + "m.address, m.city, m.zipcode, 'movie' as type "
      + "from movies m where m.movie ilike $1 limit 20;";
      const responseMovie = await pool.query(templateMovies, ['%' + req.query.param + '%']);

      if (responseMovie.rowCount == 0) {
        if(response.rowCount == 0) {
	  res.json({ info: response.rows });
        } else {
          const results = response.rows.map(function(item) {
            return item;
          });          
          res.json({ info: results });
        }
      } else {
        const resultsMovie = responseMovie.rows.map(function(item) {
          return item;
        });  
        res.json({ info: resultsMovie });
      }
    } catch (err) {
      console.error("Error running query " + err);
    }
  });

app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}/`);
});
