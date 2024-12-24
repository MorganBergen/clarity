/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3fcuyjmc42327u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "offunvgh",
    "name": "userId",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y3fcuyjmc42327u")

  // remove
  collection.schema.removeField("offunvgh")

  return dao.saveCollection(collection)
})
