/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3fcuyjmc42327u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lkvtmdlj",
    "name": "usda_data",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3fcuyjmc42327u")

  // remove
  collection.schema.removeField("lkvtmdlj")

  return dao.saveCollection(collection)
})
