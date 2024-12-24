/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6slq0xkis147hs3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d1j7qacx",
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
  const collection = dao.findCollectionByNameOrId("6slq0xkis147hs3")

  // remove
  collection.schema.removeField("d1j7qacx")

  return dao.saveCollection(collection)
})
