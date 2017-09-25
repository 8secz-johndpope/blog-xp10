// var schema_v1 = {
//  "name": "post",
//   "plural": "posts",
//   "base": "PersistedModel",
//   "idInjection": true,
//   "options": {
//     "validateUpsert": true
//   },
//   "properties": {
//     "title": {
//       "type": "string",
//       "required": true
//     },
//     "subtitle": {
//       "type": "string",
//       "required": true
//     },
//     "content": {
//       "type": "string",
//       "required": true
//     },
//     "image": {
//       "type": "string",
//       "required": false
//     },
//     "tags": {
//       "type": "string",
//       "required": true
//     },
//     "slug": {
//       "type": "string",
//       "required": true
//     },
//     "thumbsUp": {
//       "type": "number",
//       "required": true,
//       "default": 0
//     },
//     "thumbsDown": {
//       "type": "number",
//       "required": true,
//       "default": 0
//     },
//     "views": {
//       "type": "number",
//       "required": true,
//       "default": 0
//     },
//     "isPublished": {
//       "type": "boolean",
//       "required": true,
//       "default": true
//     },
//     "createdDate": {
//       "type": "date",
//       "required": true
//     },
//     "lastUpdatedDate": {
//       "type": "date",
//       "required": true
//     },
//     "user": {
//       "type": "string",
//       "required": true
//     },
//     "sectionId": {
//       "type": "number",
//       "required": true
//     }
//   },
//   "validations": [],
//   "relations": {
//     "section": {
//       "type": "belongsTo",
//       "model": "section",
//       "foreignKey": "sectionId"
//     },
//     "comments": {
//       "type": "hasMany",
//       "model": "comment",
//       "foreignKey": ""
//     }
//   },
//   "acls": [
//     {
//       "accessType": "*",
//       "principalType": "ROLE",
//       "principalId": "$everyone",
//       "permission": "DENY"
//     },
//     {
//       "accessType": "READ",
//       "principalType": "ROLE",
//       "principalId": "$everyone",
//       "permission": "ALLOW"
//     },
//     {
//       "accessType": "WRITE",
//       "principalType": "ROLE",
//       "principalId": "$authenticated",
//       "permission": "ALLOW"
//     },
//     {
//       "accessType": "WRITE",
//       "principalType": "ROLE",
//       "principalId": "$owner",
//       "permission": "ALLOW"
//     },
//     {
//       "accessType": "EXECUTE",
//       "principalType": "ROLE",
//       "principalId": "$owner",
//       "permission": "ALLOW",
//       "property": "publish"
//     }
//   ],
//   "methods": {}
// };
// var loopback = require('loopback');
// var ds = loopback.createDataSource('mysql', {
//   "host": "sql10.freemysqlhosting.net",
//   "port": 3306,
//   "url": "",
//   "database": "sql10196018",
//   "password": "n7a8rIdQx8",
//   "name": "mysql",
//   "user": "sql10196018",
//   "connector": "mysql"
// });



// ds.createModel(schema_v1.name, schema_v1.properties, schema_v1.options);

// ds.automigrate(function () {
//   ds.discoverModelProperties('Post', function (err, props) {
//     console.log(props);
//   });
// });

// // // ds.automigrate(function () {
// // //   ds.discoverModelProperties('Post', function (err, props) {
// // //     console.log(props);
// // //   });
// // // });

// // // ds.automigrate(function () {
// // //   ds.discoverModelProperties('Comment', function (err, props) {
// // //     console.log(props);
// // //   });
// // // });



// // // ds.automigrate(function () {
// // //   ds.discoverModelProperties('Leads', function (err, props) {
// // //     console.log(props);
// // //   });
// // // });