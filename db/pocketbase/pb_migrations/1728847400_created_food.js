/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "y3fcuyjmc42327u",
    "created": "2024-10-13 19:23:20.213Z",
    "updated": "2024-10-13 19:23:20.213Z",
    "name": "food",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pce2z8di",
        "name": "item",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": [],
          "maxSelect": 99,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y3fcuyjmc42327u");

  return dao.deleteCollection(collection);
})
