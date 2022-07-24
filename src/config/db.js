const { Pool } = require('pg')
const connectionString = `postgres://abfuoibhldpxpn:6c622fe4af96bb8df175662ed5f3e83cd9d2e514be35d1c7241acb364b3e44ff@ec2-54-152-28-9.compute-1.amazonaws.com:5432/ddk8bbg0n56uqf`
const pool = new Pool({
    connectionString : connectionString,
    // user : 'postgres',
    // host : 'localhost',
    // database : 'telegram',
    // password : 'toor',
    // port : '5432',
    ssl: { rejectUnauthorized : false }
})

pool.connect((err) => {
    if (err){
        console.log(err)
    }else {
        console.log("success connect to db postgres heroku")
    }
})


module.exports = pool

// const connectionString = 'postgres://hjunlhdhavctjo:1dee3f9ff767e383211235514221724b019b2684a00f75196cff6716857f3481@ec2-54-165-184-219.compute-1.amazonaws.com:5432/d5arene10ff50t'
// const { Pool } = require('pg')
// const pool = new Pool({
//   connectionString: connectionString,
//   ssl: { rejectUnauthorized : false }
// })

// module.exports = pool
