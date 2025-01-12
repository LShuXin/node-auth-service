const dbName = 'auth';
const username = 'bigtalkapp';
const password = 'bigtalkapp';
const roles = [
  {
    role: 'readWrite', 
    db: dbName
  }
];

if (!db.getUser(username)) {
  db.createUser({
    user: username,
    pwd: password,
    roles: roles,
  });
  print(`User ${username} created successfully`);
} else {
  print(`User ${username} already exists`);
}

const collections = ['collection1', 'collection2'];

collections.forEach((collectionName) => {
  if (!db.getCollectionNames().includes(collectionName)) {
    db.createCollection(collectionName);
    print(`Collection ${collectionName} created successfully`);
  } else {
    print(`Collection ${collectionName} already exists`);
  }
});

db.collection1.insertMany([
  { name: 'Item1', value: 100 },
  { name: 'Item2', value: 200 },
]);

print('Initialization complete.');
