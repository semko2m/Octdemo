var faker = require('faker');

var database = { profiles: []};

for (var i = 1; i<= 300; i++) {
  database.profiles.push({
    id: i,
    text: faker.lorem.sentences(),
    status: faker.datatype.number({
      'min': 0,
      'max': 4
    })

  });
}

console.log(JSON.stringify(database));
