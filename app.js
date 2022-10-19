//Esta app se puede ejecutar con el comando "npm run dev"
//Se ejecuta en Localhost:3005
/*-----------Librerias-------------- */
const mysql = require('mysql')
const cors = require('cors')
const express = require('express')

require ('dotenv').config();

const app = express()
app.use(express.json());
app.use(cors());
/*Libreria vistas */

let ejs = require('ejs');
app.set('views','./vista')
app.set('view engine','ejs')

/*-----------Conexion con mysql()-------------- */
const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user:process.env.DBUSER,
  password:process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
});


/*-----------Comando de error/conexion exitosa-------------- */
connection.connect((error)=>{
  if(error){
    throw error;
  } else{
    console.log("CONEXION EXITOSA");
  }
});

/*-----------Funciones-------------- */

//GET -Obtener -INDEX.EJS 
app.get('/', (req, res) => {
  connection.query('SELECT * FROM producto',(error,result)=>{
    if(error){
      throw error;
    }else{
      res.render('index',{result:result});
    }
  })
});

//GET 
app.get('/producto', (req, res) => {
  connection.query('SELECT * FROM producto',(error,fila)=>{
    if(error){
      throw error;
    }else{
      res.send(fila);
    }
  })
});

//GET by ID
app.get('/producto/:idProducto', (req, res) => {
  connection.query('SELECT * FROM producto WHERE idProducto = ?',[req.params.idProducto],(error,fila)=>{
    if(error){
      throw error;
    }else{
      res.send(fila);
    }
  })
});

//Post-Agregar
app.post('/producto', (req, res) => {
  let data = {
    description:req.body.description, 
    price:req.body.price,
    count:req.body.count
  };

  let sql = "INSERT INTO producto SET ?";
  connection.query(sql,data, function(error,result){
    if(error){
      throw error;
    }else{
      res.send(result);
    }
  }); 
});

//Put - Editar
app.put('/producto/:idProducto', (req, res) => {
  let idProducto = req.params.idProducto;
  let description = req.body.description; 
  let price = req.body.price;
  let count =req.body.count;
  let sql = 'UPDATE producto SET description = ?, price = ?, count = ? WHERE idProducto = ? ';
  connection.query(sql,[description,price,count,idProducto], function(error,result) {
    if(error){
      throw error;
    }else{
      res.send(result);
    }
  })
});
//Delete - borrar
app.delete('/producto/:idProducto', (req, res) => {
  connection.query('DELETE FROM producto WHERE idProducto = ?',[req.params.idProducto],(error,filas)=>{
    if(error){
      throw error;
    }else{
      res.send(filas);
    }
  })
});
/*-----------Aviso de uso del port-------------- */
const port = 3005 //Puerto del localhost
app.listen(port, () => {
  console.log(`Se habilitado el ${port}`)
})




  