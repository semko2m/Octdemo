var faker = require('faker');

var database = { profiles: []};

for (var i = 3; i<= 300; i++) {
  database.profiles.push({
    id: i,
    text: faker.lorem.sentences(),
    status: faker.datatype.number({
      'min': 2,
      'max': 4
    })
  });
}
// database.profiles[1] = {
//   id: 1,
//   text: faker.lorem.sentences(),
//   status: 0
// }
// database.profiles[2] = {
//   id: 2,
//   text: faker.lorem.sentences(),
//   status: 1
// }

console.log(JSON.stringify(database));
