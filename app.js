const express=require('express')
const bodyParser=require('body-parser')
const graphqlHttp=require('express-graphql')
const mongoose = require ('mongoose')
const app = express()
const graphQlSchema = require('./graphql/schemas/index')
const graphQlResolvers = require ('./graphql/resolvers/index')
const isAuth = require('./middleware/is_auth')


app.use(bodyParser.json())

app.use(isAuth)

app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,  
  graphiql: true
}))

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@pipeline-ufoab.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  ).then(()=>{
    app.listen(3000)
  }).catch(err =>{
    console.log(err)
  })

  