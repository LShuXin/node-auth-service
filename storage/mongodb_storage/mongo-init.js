/*
 * @Author: liushuxin admin@example.com
 * @Date: 2025-01-11 18:43:52
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 15:18:26
 * @FilePath: /node-auth-service/mongodb_storage/mongo-init.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
const dbName = 'auth';
const username = 'auth';
const password = 'auth';
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
