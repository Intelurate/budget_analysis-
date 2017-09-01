var Immutable = require('immutable');

var user =  Immutable.fromJS({ name: "eddie", teams: {name: "pirates", account: { id: "98679456749v867v9b7"} } })


//console.log(user.get('team').forEach('name'))
// console.log(user.get('team'))

// user.get('team').forEach((v)=>{

//     console.log(v.get('name'))

// })

var history = [];

var newUser = user;


// user.get('teams').forEach((v)=>{
//     console.log(v.get('name'))
// })

newUser = newUser.updateIn(['teams', 'account', 'id'], v => v = "inner-value" );

console.log( newUser.get('teams').get("account").get('id') )

//newUser = newUser.update('name', v => v = "John" );

//newUser = newUser.updateIn(['teams', 0], v => v.set('name', "Yankees") );

//newUser = newUser.get('teams').set(0, v => v.set('name', 'KOKOKO') )

// newUser = newUser.get('teams').get(1).set('name', 'kdhjdkhd')

// newUser.get('teams').forEach((v)=>{
//     console.log(v.get('name'))
// })
