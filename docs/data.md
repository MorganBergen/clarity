#  data structure in json for nutritional analysis

object -> `data.json`

the object will contain an array of `food_items`

```JSON
{
    "food_items": [ "item_1", "item_2", "item_3" ],

    "item_1": {

        "quantity": "",
        "unit": "",

        "macros": {
            "calories": [number, "unit"],
            "protein": [number, "unit"],
            "fat": [number, "unit"],
            "carbohydrates": [number, "unit"]
        },

        "micros": {

            "vitamins": {
                "vitamin_a": [number, "unit"],
                "vitamin_d": [number, "unit"],
                "vitamin_e": [number, "unit"],
                "vitamin_c": [number, "unit"],
                "vitamin_b1": [number, "unit"],
                "vitamin_b2": [number, "unit"],
                "vitamin_b6": [number, "unit"],
                "vitamin_b12": [number, "unit"],
                "vitamin_pp": [number, "unit"],
                "biotin": [number, "unit"],
                "pantothenic_acid": [number, "unit"],
            },

            "minerals": {
                "calcium": [number, "unit"],
                "phosphorus": [number, "unit"],
                "magnesium": [number, "unit"],
                "sodium": [number, "unit"],
                "potassium": [number, "unit"],
                "chloride": [number, "unit"],
                "iron": [number, "unit"],
                "zinc": [number, "unit"],
                "copper": [number, "unit"],
                "manganese": [number, "unit"],
                "fluoride": [number, "unit"],
                "selenium": [number, "unit"],
                "chromium": [number, "unit"],
                "iodine": [number, "unit"],
            },

            "proteins": {
                "casein": [number, "unit"],
                "serum_protein": [number, "unit"],
                "nucleotides": [number, "unit"],
            },

            "fats": {
                "saturated_fat": [number, "unit"],
                "monounsaturated_fat": [number, "unit"],
                "polyunsaturated_fat": [number, "unit"],
                "trans_fats": [number, "unit"],
            },

            "fatty_acids": {
                "butyric_acid": [number, "unit"],
                "caprylic_acid": [number, "unit"],
                "lauric_acid": [number, "unit"],
                "omega_3": [number, "unit"],
                "omega_6": [number, "unit"],
                "omega_9": [number, "unit"],
                "palmitic_acid": [number, "unit"],
                "myristic_acid": [number, "unit"],
                "stearic_acid": [number, "unit"],
                "gamma_linolenic_acid": [number, "unit"],
                "nervonic_acid": [number, "unit"],
                "behenic_acid": [number, "unit"],
            },

            "carbohydrates": {
                "sugars": [number, "unit"],
                "sucrose": [number, "unit"],
                "glucose": [number, "unit"],
                "fructose": [number, "unit"],
                "lactose": [number, "unit"],
                "maltose": [number, "unit"],
                "maltodextrin": [number, "unit"],
                "starch": [number, "unit"],
                "polyols": [number, "unit"],
            },

            "other": {
                "fiber": [number, "unit"],
                "silica": [number, "unit"],
                "alcohol": [number, "unit"],
                "caffeine": [number, "unit"],
                "ph": [number, "unit"],
            }

        }
    }
}
```

##  open food facts `response.data.product`

`const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);`

`response.data`

`response.data.product`

```JSON
{
  "_id": "0099900100873",
  "_keywords": [
    "artificial",
    "butterfinger",
    "candie",
    "confectionerie",
    "flavor",
    "gluten",
    "nestle",
    "no",
    "snack",
    "sweet"
  ],
  "added_countries_tags": [],
  "additives_debug_tags": [],
  "additives_n": 1,
  "additives_old_n": 1,
  "additives_old_tags": [
    "en:e160b"
  ],
  "additives_original_tags": [
    "en:e322i"
  ],
  "additives_prev_original_tags": [],
  "additives_tags": [
    "en:e322",
    "en:e322i"
  ],
  "allergens": "en:milk,en:peanuts,en:soybeans",
  "allergens_from_ingredients": "en:peanuts, peanuts, milk, soy lecithin, : milk, peanut, soy",
  "allergens_from_user": "(en) en:milk,en:peanuts,en:soybeans",
  "allergens_hierarchy": [
    "en:milk",
    "en:peanuts",
    "en:soybeans"
  ],
  "allergens_imported": "Peanuts",
  "allergens_lc": "en",
  "allergens_tags": [
    "en:milk",
    "en:peanuts",
    "en:soybeans"
  ],
  "amino_acids_prev_tags": [],
  "amino_acids_tags": [],
  "brand_owner": "BUTTERFINGER",
  "brand_owner_imported": "BUTTERFINGER",
  "brands": "Nestlé",
  "brands_tags": [
    "nestle"
  ],
  "categories": "Snacks, Sweet snacks, Confectioneries, Candies",
  "categories_hierarchy": [
    "en:snacks",
    "en:sweet-snacks",
    "en:confectioneries",
    "en:candies"
  ],
  "categories_imported": "Snacks, Sweet snacks, Confectioneries",
  "categories_lc": "en",
  "categories_old": "Snacks, Sweet snacks, Confectioneries, Candies",
  "categories_properties": {
    "agribalyse_food_code:en": "31003",
    "ciqual_food_code:en": "31003"
  },
  "categories_properties_tags": [
    "all-products",
    "categories-known",
    "agribalyse-food-code-31003",
    "agribalyse-food-code-known",
    "agribalyse-proxy-food-code-unknown",
    "ciqual-food-code-31003",
    "ciqual-food-code-known",
    "agribalyse-known",
    "agribalyse-31003"
  ],
  "categories_tags": [
    "en:snacks",
    "en:sweet-snacks",
    "en:confectioneries",
    "en:candies"
  ],
  "category_properties": {},
  "checkers_tags": [],
  "ciqual_food_name_tags": [
    "unknown"
  ],
  "cities_tags": [],
  "code": "0099900100873",
  "codes_tags": [
    "code-13",
    "0099900100xxx",
    "009990010xxxx",
    "00999001xxxxx",
    "0099900xxxxxx",
    "009990xxxxxxx",
    "00999xxxxxxxx",
    "0099xxxxxxxxx",
    "009xxxxxxxxxx",
    "00xxxxxxxxxxx",
    "0xxxxxxxxxxxx"
  ],
  "compared_to_category": "en:candies",
  "complete": 0,
  "completeness": 0.6875,
  "correctors_tags": [
    "openfoodfacts-contributors",
    "org-database-usda",
    "foodless",
    "yuka.sY2b0xO6T85zoF3NwEKvlhF3Ucb7_SvWPDjlqRaP_orRLI3BTPhLwZjLNqg",
    "kiliweb",
    "roboto-app",
    "inf",
    "wolfgang8741",
    "yuka.sY2b0xO6T85zoF3NwEKvlhJIf4XAjDGaKxLihG-wmui-Ic3jc89dxNb4M6s",
    "scrypt"
  ],
  "countries": "France,Ireland,United States",
  "countries_hierarchy": [
    "en:france",
    "en:ireland",
    "en:united-states"
  ],
  "countries_imported": "United States",
  "countries_lc": "en",
  "countries_tags": [
    "en:france",
    "en:ireland",
    "en:united-states"
  ],
  "created_t": 1552247009,
  "creator": "kiliweb",
  "data_quality_bugs_tags": [],
  "data_quality_errors_tags": [],
  "data_quality_info_tags": [
    "en:no-packaging-data",
    "en:ingredients-percent-analysis-ok",
    "en:ecoscore-extended-data-not-computed",
    "en:food-groups-1-known",
    "en:food-groups-2-known",
    "en:food-groups-3-unknown"
  ],
  "data_quality_tags": [
    "en:no-packaging-data",
    "en:ingredients-percent-analysis-ok",
    "en:ecoscore-extended-data-not-computed",
    "en:food-groups-1-known",
    "en:food-groups-2-known",
    "en:food-groups-3-unknown",
    "en:nutrition-value-very-high-for-category-fat",
    "en:nutrition-value-very-high-for-category-saturated-fat",
    "en:ecoscore-origins-of-ingredients-origins-are-100-percent-unknown",
    "en:ecoscore-packaging-packaging-data-missing",
    "en:ecoscore-production-system-no-label"
  ],
  "data_quality_warnings_tags": [
    "en:nutrition-value-very-high-for-category-fat",
    "en:nutrition-value-very-high-for-category-saturated-fat",
    "en:ecoscore-origins-of-ingredients-origins-are-100-percent-unknown",
    "en:ecoscore-packaging-packaging-data-missing",
    "en:ecoscore-production-system-no-label"
  ],
  "data_sources": "App - yuka, Apps, Databases, database-usda, App - InFood, App - smoothie-openfoodfacts",
  "data_sources_imported": "Databases, database-usda",
  "data_sources_tags": [
    "app-yuka",
    "apps",
    "databases",
    "database-usda",
    "app-infood",
    "app-smoothie-openfoodfacts"
  ],
  "debug_param_sorted_langs": [
    "en",
    "fr"
  ],
  "ecoscore_data": {
    "adjustments": {
      "origins_of_ingredients": {
        "aggregated_origins": [
          {
            "epi_score": "0",
            "origin": "en:unknown",
            "percent": 100,
            "transportation_score": 0
          }
        ],
        "epi_score": 0,
        "epi_value": -5,
        "origins_from_categories": [
          "en:unknown"
        ],
        "origins_from_origins_field": [
          "en:unknown"
        ],
        "transportation_score": 0,
        "transportation_scores": {
          "ad": 0,
          "al": 0,
          "at": 0,
          "ax": 0,
          "ba": 0,
          "be": 0,
          "bg": 0,
          "ch": 0,
          "cy": 0,
          "cz": 0,
          "de": 0,
          "dk": 0,
          "dz": 0,
          "ee": 0,
          "eg": 0,
          "es": 0,
          "fi": 0,
          "fo": 0,
          "fr": 0,
          "gg": 0,
          "gi": 0,
          "gr": 0,
          "hr": 0,
          "hu": 0,
          "ie": 0,
          "il": 0,
          "im": 0,
          "is": 0,
          "it": 0,
          "je": 0,
          "lb": 0,
          "li": 0,
          "lt": 0,
          "lu": 0,
          "lv": 0,
          "ly": 0,
          "ma": 0,
          "mc": 0,
          "md": 0,
          "me": 0,
          "mk": 0,
          "mt": 0,
          "nl": 0,
          "no": 0,
          "pl": 0,
          "ps": 0,
          "pt": 0,
          "ro": 0,
          "rs": 0,
          "se": 0,
          "si": 0,
          "sj": 0,
          "sk": 0,
          "sm": 0,
          "sy": 0,
          "tn": 0,
          "tr": 0,
          "ua": 0,
          "uk": 0,
          "us": 0,
          "va": 0,
          "world": 0,
          "xk": 0
        },
        "transportation_value": 0,
        "transportation_values": {
          "ad": 0,
          "al": 0,
          "at": 0,
          "ax": 0,
          "ba": 0,
          "be": 0,
          "bg": 0,
          "ch": 0,
          "cy": 0,
          "cz": 0,
          "de": 0,
          "dk": 0,
          "dz": 0,
          "ee": 0,
          "eg": 0,
          "es": 0,
          "fi": 0,
          "fo": 0,
          "fr": 0,
          "gg": 0,
          "gi": 0,
          "gr": 0,
          "hr": 0,
          "hu": 0,
          "ie": 0,
          "il": 0,
          "im": 0,
          "is": 0,
          "it": 0,
          "je": 0,
          "lb": 0,
          "li": 0,
          "lt": 0,
          "lu": 0,
          "lv": 0,
          "ly": 0,
          "ma": 0,
          "mc": 0,
          "md": 0,
          "me": 0,
          "mk": 0,
          "mt": 0,
          "nl": 0,
          "no": 0,
          "pl": 0,
          "ps": 0,
          "pt": 0,
          "ro": 0,
          "rs": 0,
          "se": 0,
          "si": 0,
          "sj": 0,
          "sk": 0,
          "sm": 0,
          "sy": 0,
          "tn": 0,
          "tr": 0,
          "ua": 0,
          "uk": 0,
          "us": 0,
          "va": 0,
          "world": 0,
          "xk": 0
        },
        "value": -5,
        "values": {
          "ad": -5,
          "al": -5,
          "at": -5,
          "ax": -5,
          "ba": -5,
          "be": -5,
          "bg": -5,
          "ch": -5,
          "cy": -5,
          "cz": -5,
          "de": -5,
          "dk": -5,
          "dz": -5,
          "ee": -5,
          "eg": -5,
          "es": -5,
          "fi": -5,
          "fo": -5,
          "fr": -5,
          "gg": -5,
          "gi": -5,
          "gr": -5,
          "hr": -5,
          "hu": -5,
          "ie": -5,
          "il": -5,
          "im": -5,
          "is": -5,
          "it": -5,
          "je": -5,
          "lb": -5,
          "li": -5,
          "lt": -5,
          "lu": -5,
          "lv": -5,
          "ly": -5,
          "ma": -5,
          "mc": -5,
          "md": -5,
          "me": -5,
          "mk": -5,
          "mt": -5,
          "nl": -5,
          "no": -5,
          "pl": -5,
          "ps": -5,
          "pt": -5,
          "ro": -5,
          "rs": -5,
          "se": -5,
          "si": -5,
          "sj": -5,
          "sk": -5,
          "sm": -5,
          "sy": -5,
          "tn": -5,
          "tr": -5,
          "ua": -5,
          "uk": -5,
          "us": -5,
          "va": -5,
          "world": -5,
          "xk": -5
        },
        "warning": "origins_are_100_percent_unknown"
      },
      "packaging": {
        "non_recyclable_and_non_biodegradable_materials": 1,
        "value": -15,
        "warning": "packaging_data_missing"
      },
      "production_system": {
        "labels": [],
        "value": 0,
        "warning": "no_label"
      },
      "threatened_species": {
        "ingredient": "en:palm-oil",
        "value": -10
      }
    },
    "agribalyse": {
      "agribalyse_food_code": "31003",
      "co2_agriculture": 0.90458397,
      "co2_consumption": 0,
      "co2_distribution": 0.017321188,
      "co2_packaging": 0.27113509,
      "co2_processing": 0.33658487,
      "co2_total": 1.729890518,
      "co2_transportation": 0.2002654,
      "code": "31003",
      "dqr": "3.64",
      "ef_agriculture": 0.32106012,
      "ef_consumption": 0,
      "ef_distribution": 0.0046415086,
      "ef_packaging": 0.022590713,
      "ef_processing": 0.043818585,
      "ef_total": 0.4106592346,
      "ef_transportation": 0.018548308,
      "is_beverage": 0,
      "name_en": "Candies, all types",
      "name_fr": "Bonbons, tout type",
      "score": 62,
      "version": "3.1"
    },
    "grade": "d",
    "grades": {
      "ad": "d",
      "al": "d",
      "at": "d",
      "ax": "d",
      "ba": "d",
      "be": "d",
      "bg": "d",
      "ch": "d",
      "cy": "d",
      "cz": "d",
      "de": "d",
      "dk": "d",
      "dz": "d",
      "ee": "d",
      "eg": "d",
      "es": "d",
      "fi": "d",
      "fo": "d",
      "fr": "d",
      "gg": "d",
      "gi": "d",
      "gr": "d",
      "hr": "d",
      "hu": "d",
      "ie": "d",
      "il": "d",
      "im": "d",
      "is": "d",
      "it": "d",
      "je": "d",
      "lb": "d",
      "li": "d",
      "lt": "d",
      "lu": "d",
      "lv": "d",
      "ly": "d",
      "ma": "d",
      "mc": "d",
      "md": "d",
      "me": "d",
      "mk": "d",
      "mt": "d",
      "nl": "d",
      "no": "d",
      "pl": "d",
      "ps": "d",
      "pt": "d",
      "ro": "d",
      "rs": "d",
      "se": "d",
      "si": "d",
      "sj": "d",
      "sk": "d",
      "sm": "d",
      "sy": "d",
      "tn": "d",
      "tr": "d",
      "ua": "d",
      "uk": "d",
      "us": "d",
      "va": "d",
      "world": "d",
      "xk": "d"
    },
    "missing": {
      "labels": 1,
      "origins": 1,
      "packagings": 1
    },
    "missing_data_warning": 1,
    "missing_key_data": 1,
    "previous_data": {
      "agribalyse": {
        "warning": "missing_agribalyse_match"
      },
      "grade": null,
      "score": null
    },
    "score": 32,
    "scores": {
      "ad": 32,
      "al": 32,
      "at": 32,
      "ax": 32,
      "ba": 32,
      "be": 32,
      "bg": 32,
      "ch": 32,
      "cy": 32,
      "cz": 32,
      "de": 32,
      "dk": 32,
      "dz": 32,
      "ee": 32,
      "eg": 32,
      "es": 32,
      "fi": 32,
      "fo": 32,
      "fr": 32,
      "gg": 32,
      "gi": 32,
      "gr": 32,
      "hr": 32,
      "hu": 32,
      "ie": 32,
      "il": 32,
      "im": 32,
      "is": 32,
      "it": 32,
      "je": 32,
      "lb": 32,
      "li": 32,
      "lt": 32,
      "lu": 32,
      "lv": 32,
      "ly": 32,
      "ma": 32,
      "mc": 32,
      "md": 32,
      "me": 32,
      "mk": 32,
      "mt": 32,
      "nl": 32,
      "no": 32,
      "pl": 32,
      "ps": 32,
      "pt": 32,
      "ro": 32,
      "rs": 32,
      "se": 32,
      "si": 32,
      "sj": 32,
      "sk": 32,
      "sm": 32,
      "sy": 32,
      "tn": 32,
      "tr": 32,
      "ua": 32,
      "uk": 32,
      "us": 32,
      "va": 32,
      "world": 32,
      "xk": 32
    },
    "status": "known"
  },
  "ecoscore_grade": "d",
  "ecoscore_score": 32,
  "ecoscore_tags": [
    "d"
  ],
  "editors_tags": [
    "curiouscamel",
    "foodless",
    "inf",
    "kiliweb",
    "openfoodfacts-contributors",
    "org-database-usda",
    "roboto-app",
    "scrypt",
    "wolfgang8741",
    "yuka.WXF0UkhQOGRuNkZUbVBJYzNqakVwdko2NXJMNWZHS3VOK2NxSVE9PQ",
    "yuka.sY2b0xO6T85zoF3NwEKvlhF3Ucb7_SvWPDjlqRaP_orRLI3BTPhLwZjLNqg",
    "yuka.sY2b0xO6T85zoF3NwEKvlhJIf4XAjDGaKxLihG-wmui-Ic3jc89dxNb4M6s"
  ],
  "emb_codes": "",
  "emb_codes_tags": [],
  "entry_dates_tags": [
    "2019-03-10",
    "2019-03",
    "2019"
  ],
  "expiration_date": "",
  "food_groups": "en:sweets",
  "food_groups_tags": [
    "en:sugary-snacks",
    "en:sweets"
  ],
  "generic_name": "",
  "generic_name_en": "",
  "generic_name_fr": "",
  "id": "0099900100873",
  "image_front_small_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.200.jpg",
  "image_front_thumb_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.100.jpg",
  "image_front_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.400.jpg",
  "image_ingredients_small_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_en.25.200.jpg",
  "image_ingredients_thumb_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_en.25.100.jpg",
  "image_ingredients_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_en.25.400.jpg",
  "image_nutrition_small_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/nutrition_en.44.200.jpg",
  "image_nutrition_thumb_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/nutrition_en.44.100.jpg",
  "image_nutrition_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/nutrition_en.44.400.jpg",
  "image_small_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.200.jpg",
  "image_thumb_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.100.jpg",
  "image_url": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.400.jpg",
  "images": {
    "1": {
      "sizes": {
        "100": {
          "h": 100,
          "w": 75
        },
        "400": {
          "h": 400,
          "w": 300
        },
        "full": {
          "h": 1200,
          "w": 899
        }
      },
      "uploaded_t": 1552247010,
      "uploader": "kiliweb"
    },
    "2": {
      "sizes": {
        "100": {
          "h": 72,
          "w": 100
        },
        "400": {
          "h": 288,
          "w": 400
        },
        "full": {
          "h": 1200,
          "w": 1668
        }
      },
      "uploaded_t": 1552247011,
      "uploader": "kiliweb"
    },
    "3": {
      "sizes": {
        "100": {
          "h": 75,
          "w": 100
        },
        "400": {
          "h": 300,
          "w": 400
        },
        "full": {
          "h": 3024,
          "w": 4032
        }
      },
      "uploaded_t": 1622391748,
      "uploader": "foodless"
    },
    "4": {
      "sizes": {
        "100": {
          "h": 50,
          "w": 100
        },
        "400": {
          "h": 199,
          "w": 400
        },
        "full": {
          "h": 912,
          "w": 1836
        }
      },
      "uploaded_t": 1639631847,
      "uploader": "kiliweb"
    },
    "5": {
      "sizes": {
        "100": {
          "h": 48,
          "w": 100
        },
        "400": {
          "h": 193,
          "w": 400
        },
        "full": {
          "h": 440,
          "w": 912
        }
      },
      "uploaded_t": 1639631848,
      "uploader": "kiliweb"
    },
    "6": {
      "sizes": {
        "100": {
          "h": 22,
          "w": 100
        },
        "400": {
          "h": 87,
          "w": 400
        },
        "full": {
          "h": 550,
          "w": 2519
        }
      },
      "uploaded_t": 1639867052,
      "uploader": "inf"
    },
    "7": {
      "sizes": {
        "100": {
          "h": 18,
          "w": 100
        },
        "400": {
          "h": 73,
          "w": 400
        },
        "full": {
          "h": 493,
          "w": 2717
        }
      },
      "uploaded_t": 1639867093,
      "uploader": "inf"
    },
    "8": {
      "sizes": {
        "100": {
          "h": 30,
          "w": 100
        },
        "400": {
          "h": 119,
          "w": 400
        },
        "full": {
          "h": 233,
          "w": 784
        }
      },
      "uploaded_t": 1680211175,
      "uploader": "kiliweb"
    },
    "9": {
      "sizes": {
        "100": {
          "h": 100,
          "w": 75
        },
        "400": {
          "h": 400,
          "w": 300
        },
        "full": {
          "h": 1200,
          "w": 899
        }
      },
      "uploaded_t": 1680211177,
      "uploader": "kiliweb"
    },
    "front_en": {
      "angle": 0,
      "coordinates_image_size": "full",
      "geometry": "0x0--1--1",
      "imgid": "8",
      "normalize": null,
      "rev": "34",
      "sizes": {
        "100": {
          "h": 30,
          "w": 100
        },
        "200": {
          "h": 59,
          "w": 200
        },
        "400": {
          "h": 119,
          "w": 400
        },
        "full": {
          "h": 233,
          "w": 784
        }
      },
      "white_magic": null,
      "x1": "-1",
      "x2": "-1",
      "y1": "-1",
      "y2": "-1"
    },
    "front_fr": {
      "angle": null,
      "geometry": "0x0-0-0",
      "imgid": "1",
      "normalize": "0",
      "rev": "4",
      "sizes": {
        "100": {
          "h": 100,
          "w": 75
        },
        "200": {
          "h": 200,
          "w": 150
        },
        "400": {
          "h": 400,
          "w": 300
        },
        "full": {
          "h": 1200,
          "w": 899
        }
      },
      "white_magic": "0",
      "x1": null,
      "x2": null,
      "y1": null,
      "y2": null
    },
    "ingredients_en": {
      "angle": null,
      "coordinates_image_size": "400",
      "geometry": "0x0-0-0",
      "imgid": "7",
      "normalize": null,
      "rev": "25",
      "sizes": {
        "100": {
          "h": 18,
          "w": 100
        },
        "200": {
          "h": 36,
          "w": 200
        },
        "400": {
          "h": 73,
          "w": 400
        },
        "full": {
          "h": 493,
          "w": 2717
        }
      },
      "white_magic": null,
      "x1": null,
      "x2": null,
      "y1": null,
      "y2": null
    },
    "ingredients_fr": {
      "angle": null,
      "geometry": "0x0-0-0",
      "imgid": "2",
      "normalize": "0",
      "ocr": 1,
      "orientation": null,
      "rev": "7",
      "sizes": {
        "100": {
          "h": 72,
          "w": 100
        },
        "200": {
          "h": 144,
          "w": 200
        },
        "400": {
          "h": 288,
          "w": 400
        },
        "full": {
          "h": 1200,
          "w": 1668
        }
      },
      "white_magic": "0",
      "x1": null,
      "x2": null,
      "y1": null,
      "y2": null
    },
    "nutrition_en": {
      "angle": "0",
      "coordinates_image_size": "full",
      "geometry": "0x0-0-0",
      "imgid": "5",
      "normalize": "false",
      "rev": "44",
      "sizes": {
        "100": {
          "h": 48,
          "w": 100
        },
        "200": {
          "h": 96,
          "w": 200
        },
        "400": {
          "h": 193,
          "w": 400
        },
        "full": {
          "h": 440,
          "w": 912
        }
      },
      "white_magic": "false",
      "x1": "0",
      "x2": "0",
      "y1": "0",
      "y2": "0"
    }
  },
  "informers_tags": [
    "yuka.WXF0UkhQOGRuNkZUbVBJYzNqakVwdko2NXJMNWZHS3VOK2NxSVE9PQ",
    "kiliweb",
    "openfoodfacts-contributors",
    "roboto-app",
    "org-database-usda",
    "foodless",
    "inf",
    "curiouscamel",
    "scrypt"
  ],
  "ingredients": [
    {
      "ciqual_proxy_food_code": "31089",
      "id": "en:corn-syrup",
      "percent_estimate": 54.1666666666667,
      "percent_max": 100,
      "percent_min": 8.33333333333333,
      "rank": 1,
      "text": "corn syrup",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "ciqual_proxy_food_code": "31016",
      "id": "en:sugar",
      "percent_estimate": 19.5,
      "percent_max": 39,
      "percent_min": 0,
      "rank": 2,
      "text": "sugar",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "ciqual_food_code": "15001",
      "id": "en:peanut",
      "percent_estimate": 13.1666666666667,
      "percent_max": 33.3333333333333,
      "percent_min": 0,
      "rank": 3,
      "text": "peanuts",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "from_palm_oil": "maybe",
      "has_sub_ingredients": "yes",
      "id": "en:vegetable-oil",
      "percent_estimate": 6.58333333333334,
      "percent_max": 25,
      "percent_min": 0,
      "rank": 4,
      "text": "vegetable oil",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "ciqual_food_code": "15001",
      "id": "en:peanut-flour",
      "percent_estimate": 3.29166666666667,
      "percent_max": 20,
      "percent_min": 0,
      "rank": 5,
      "text": "peanut flour",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "ciqual_proxy_food_code": "19051",
      "id": "en:skimmed-milk",
      "percent_estimate": 1.64583333333334,
      "percent_max": 16.6666666666667,
      "percent_min": 0,
      "rank": 6,
      "text": "nonfat milk",
      "vegan": "no",
      "vegetarian": "yes"
    },
    {
      "id": "en:less-than-2-of-cocoa",
      "percent_estimate": 0.822916666666671,
      "percent_max": 14.2857142857143,
      "percent_min": 0,
      "rank": 7,
      "text": "less than 2% of cocoa"
    },
    {
      "ciqual_proxy_food_code": "19051",
      "id": "en:milk",
      "percent_estimate": 0.411458333333336,
      "percent_max": 12.5,
      "percent_min": 0,
      "rank": 8,
      "text": "milk",
      "vegan": "no",
      "vegetarian": "yes"
    },
    {
      "ciqual_food_code": "11058",
      "id": "en:salt",
      "percent_estimate": 0.205729166666671,
      "percent_max": 0.743,
      "percent_min": 0,
      "rank": 9,
      "text": "salt",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "ciqual_food_code": "42200",
      "id": "en:soya-lecithin",
      "percent_estimate": 0.102864583333336,
      "percent_max": 0.743,
      "percent_min": 0,
      "rank": 10,
      "text": "soy lecithin",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "id": "en:natural-flavouring",
      "percent_estimate": 0.0514322916666714,
      "percent_max": 0.743,
      "percent_min": 0,
      "rank": 11,
      "text": "natural flavor",
      "vegan": "maybe",
      "vegetarian": "maybe"
    },
    {
      "id": "en:annatto-color",
      "percent_estimate": 0.0514322916666714,
      "percent_max": 0.743,
      "percent_min": 0,
      "rank": 12,
      "text": "annatto color"
    },
    {
      "from_palm_oil": "yes",
      "id": "en:palm-kernel-oil",
      "percent_estimate": 3.29166666666667,
      "percent_max": 25,
      "percent_min": 0,
      "text": "palm kernel",
      "vegan": "yes",
      "vegetarian": "yes"
    },
    {
      "ciqual_food_code": "16129",
      "from_palm_oil": "yes",
      "id": "en:palm-oil",
      "percent_estimate": 3.29166666666667,
      "percent_max": 12.5,
      "percent_min": 0,
      "text": "palm oil",
      "vegan": "yes",
      "vegetarian": "yes"
    }
  ],
  "ingredients_analysis": {
    "en:non-vegan": [
      "en:skimmed-milk",
      "en:milk"
    ],
    "en:palm-oil": [
      "en:palm-kernel-oil",
      "en:palm-oil"
    ],
    "en:vegan-status-unknown": [
      "en:less-than-2-of-cocoa",
      "en:annatto-color"
    ],
    "en:vegetarian-status-unknown": [
      "en:less-than-2-of-cocoa",
      "en:annatto-color"
    ]
  },
  "ingredients_analysis_tags": [
    "en:palm-oil",
    "en:non-vegan",
    "en:vegetarian-status-unknown"
  ],
  "ingredients_debug": [],
  "ingredients_from_or_that_may_be_from_palm_oil_n": 0,
  "ingredients_from_palm_oil_n": 0,
  "ingredients_from_palm_oil_tags": [],
  "ingredients_hierarchy": [
    "en:corn-syrup",
    "en:added-sugar",
    "en:disaccharide",
    "en:sugar",
    "en:peanut",
    "en:nut",
    "en:vegetable-oil",
    "en:oil-and-fat",
    "en:vegetable-oil-and-fat",
    "en:peanut-flour",
    "en:skimmed-milk",
    "en:dairy",
    "en:milk",
    "en:less-than-2-of-cocoa",
    "en:salt",
    "en:soya-lecithin",
    "en:e322",
    "en:e322i",
    "en:natural-flavouring",
    "en:flavouring",
    "en:annatto-color",
    "en:palm-kernel-oil",
    "en:palm-kernel-oil-and-fat",
    "en:palm-oil",
    "en:palm-oil-and-fat"
  ],
  "ingredients_ids_debug": [],
  "ingredients_lc": "en",
  "ingredients_n": 14,
  "ingredients_n_tags": [
    "14",
    "11-20"
  ],
  "ingredients_original_tags": [
    "en:corn-syrup",
    "en:sugar",
    "en:peanut",
    "en:vegetable-oil",
    "en:peanut-flour",
    "en:skimmed-milk",
    "en:less-than-2-of-cocoa",
    "en:milk",
    "en:salt",
    "en:soya-lecithin",
    "en:natural-flavouring",
    "en:annatto-color",
    "en:palm-kernel-oil",
    "en:palm-oil"
  ],
  "ingredients_percent_analysis": 1,
  "ingredients_tags": [
    "en:corn-syrup",
    "en:added-sugar",
    "en:disaccharide",
    "en:sugar",
    "en:peanut",
    "en:nut",
    "en:vegetable-oil",
    "en:oil-and-fat",
    "en:vegetable-oil-and-fat",
    "en:peanut-flour",
    "en:skimmed-milk",
    "en:dairy",
    "en:milk",
    "en:less-than-2-of-cocoa",
    "en:salt",
    "en:soya-lecithin",
    "en:e322",
    "en:e322i",
    "en:natural-flavouring",
    "en:flavouring",
    "en:annatto-color",
    "en:palm-kernel-oil",
    "en:palm-kernel-oil-and-fat",
    "en:palm-oil",
    "en:palm-oil-and-fat"
  ],
  "ingredients_text": "corn syrup, sugar, peanuts, vegetable oil (palm kernel and palm oil), peanut flour, nonfat milk, less than 2% of cocoa, milk, salt, soy lecithin, natural flavor, annatto color.\r\n\r\ncontains: milk, peanut, soy.",
  "ingredients_text_en": "corn syrup, sugar, peanuts, vegetable oil (palm kernel and palm oil), peanut flour, nonfat milk, less than 2% of cocoa, milk, salt, soy lecithin, natural flavor, annatto color.\r\n\r\ncontains: milk, peanut, soy.",
  "ingredients_text_en_imported": "Corn syrup, sugar, peanuts, vegetable oil (palm kernel and palm oil), peanut flour, nonfat milk, and less than 2% of cocoa milk, salt, yellow corn flour, soy lecithin, natural flavor, annatto color.",
  "ingredients_text_en_ocr_1639867249": "ingredients: corn syrup, sugar, peanuts, vegetable oil (palm kernel and palm oil), peanut flour, nonfat milk, less than 2% of cocoa, milk, salt, soy lecithin, natural flavor, annatto color. contains: milk, peanut, soy.",
  "ingredients_text_en_ocr_1639867249_result": "Corn syrup, sugar, peanuts, vegetable oil (palm kernel and palm oil), peanut flour, nonfat milk, less than 2% of cocoa, milk, salt, soy lecithin, natural flavor, annatto color. contains: milk, peanut, soy.",
  "ingredients_text_fr": "",
  "ingredients_text_with_allergens": "corn syrup, sugar, <span class=\"allergen\">peanuts</span>, vegetable oil (palm kernel and palm oil), peanut flour, nonfat milk, less than 2% of cocoa, <span class=\"allergen\">milk</span>, salt, <span class=\"allergen\">soy lecithin</span>, natural flavor, annatto color.\r\n\r\ncontains<span class=\"allergen\">: milk</span>, <span class=\"allergen\">peanut</span>, <span class=\"allergen\">soy</span>.",
  "ingredients_text_with_allergens_en": "corn syrup, sugar, <span class=\"allergen\">peanuts</span>, vegetable oil (palm kernel and palm oil), peanut flour, nonfat milk, less than 2% of cocoa, <span class=\"allergen\">milk</span>, salt, <span class=\"allergen\">soy lecithin</span>, natural flavor, annatto color.\r\n\r\ncontains<span class=\"allergen\">: milk</span>, <span class=\"allergen\">peanut</span>, <span class=\"allergen\">soy</span>.",
  "ingredients_text_with_allergens_fr": "",
  "ingredients_that_may_be_from_palm_oil_n": 0,
  "ingredients_that_may_be_from_palm_oil_tags": [],
  "ingredients_with_specified_percent_n": 0,
  "ingredients_with_specified_percent_sum": 0,
  "ingredients_with_unspecified_percent_n": 13,
  "ingredients_with_unspecified_percent_sum": 100,
  "ingredients_without_ciqual_codes": [
    "en:annatto-color",
    "en:less-than-2-of-cocoa",
    "en:natural-flavouring",
    "en:palm-kernel-oil",
    "en:vegetable-oil"
  ],
  "ingredients_without_ciqual_codes_n": 5,
  "interface_version_created": "20150316.jqm2",
  "interface_version_modified": "20190830",
  "known_ingredients_n": 23,
  "labels": "No gluten, No artificial flavors",
  "labels_hierarchy": [
    "en:no-gluten",
    "en:no-artificial-flavors"
  ],
  "labels_lc": "en",
  "labels_old": "No gluten, No artificial flavors",
  "labels_tags": [
    "en:no-gluten",
    "en:no-artificial-flavors"
  ],
  "lang": "en",
  "languages": {
    "en:english": 5,
    "en:french": 3
  },
  "languages_codes": {
    "en": 5,
    "fr": 3
  },
  "languages_hierarchy": [
    "en:english",
    "en:french"
  ],
  "languages_tags": [
    "en:english",
    "en:french",
    "en:2",
    "en:multilingual"
  ],
  "last_edit_dates_tags": [
    "2023-10-07",
    "2023-10",
    "2023"
  ],
  "last_editor": "scrypt",
  "last_image_dates_tags": [
    "2023-03-30",
    "2023-03",
    "2023"
  ],
  "last_image_t": 1680211177,
  "last_modified_by": "scrypt",
  "last_modified_t": 1696688590,
  "last_updated_t": 1707614974,
  "lc": "en",
  "lc_imported": "en",
  "link": "",
  "main_countries_tags": [],
  "manufacturing_places": "",
  "manufacturing_places_tags": [],
  "max_imgid": "9",
  "minerals_prev_tags": [],
  "minerals_tags": [],
  "misc_tags": [
    "en:packagings-number-of-components-0",
    "en:nutriscore-computed",
    "en:nutrition-fruits-vegetables-nuts-estimate-from-ingredients",
    "en:nutrition-all-nutriscore-values-known",
    "en:nutrition-fruits-vegetables-legumes-estimate-from-ingredients",
    "en:nutriscore-2021-same-as-2023",
    "en:nutriscore-2021-e-2023-e",
    "en:packagings-not-complete",
    "en:packagings-empty",
    "en:ecoscore-extended-data-not-computed",
    "en:ecoscore-missing-data-warning",
    "en:ecoscore-missing-data-labels",
    "en:ecoscore-missing-data-origins",
    "en:ecoscore-missing-data-packagings",
    "en:ecoscore-missing-data-no-packagings",
    "en:ecoscore-computed",
    "en:ecoscore-changed",
    "en:ecoscore-grade-changed"
  ],
  "no_nutrition_data": "",
  "nova_group": 4,
  "nova_group_debug": "",
  "nova_groups": "4",
  "nova_groups_markers": {
    "3": [
      [
        "categories",
        "en:candies"
      ],
      [
        "ingredients",
        "en:salt"
      ],
      [
        "ingredients",
        "en:sugar"
      ],
      [
        "ingredients",
        "en:vegetable-oil"
      ],
      [
        "categories",
        "en:sweet-snacks"
      ]
    ],
    "4": [
      [
        "additives",
        "en:e322"
      ],
      [
        "ingredients",
        "en:flavouring"
      ]
    ]
  },
  "nova_groups_tags": [
    "en:4-ultra-processed-food-and-drink-products"
  ],
  "nucleotides_prev_tags": [],
  "nucleotides_tags": [],
  "nutrient_levels": {
    "fat": "moderate",
    "salt": "moderate",
    "saturated-fat": "high",
    "sugars": "high"
  },
  "nutrient_levels_tags": [
    "en:fat-in-moderate-quantity",
    "en:saturated-fat-in-high-quantity",
    "en:sugars-in-high-quantity",
    "en:salt-in-moderate-quantity"
  ],
  "nutriments": {
    "calcium": 0.037,
    "calcium_100g": 0.0688,
    "calcium_serving": 0.037,
    "calcium_unit": "mg",
    "calcium_value": 37,
    "carbohydrates": 36,
    "carbohydrates_100g": 66.9,
    "carbohydrates_serving": 36,
    "carbohydrates_unit": "g",
    "carbohydrates_value": 36,
    "cholesterol": 0,
    "cholesterol_100g": 0,
    "cholesterol_serving": 0,
    "cholesterol_unit": "mg",
    "cholesterol_value": 0,
    "energy": 1046,
    "energy-kcal": 250,
    "energy-kcal_100g": 465,
    "energy-kcal_serving": 250,
    "energy-kcal_unit": "kcal",
    "energy-kcal_value": 250,
    "energy-kcal_value_computed": 256,
    "energy_100g": 1940,
    "energy_serving": 1046,
    "energy_unit": "kcal",
    "energy_value": 250,
    "fat": 10,
    "fat_100g": 18.6,
    "fat_serving": 10,
    "fat_unit": "g",
    "fat_value": 10,
    "fiber": 1,
    "fiber_100g": 1.86,
    "fiber_serving": 1,
    "fiber_unit": "g",
    "fiber_value": 1,
    "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0,
    "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0,
    "fruits-vegetables-nuts-estimate-from-ingredients_100g": 16.4583333333333,
    "fruits-vegetables-nuts-estimate-from-ingredients_serving": 16.4583333333333,
    "iron": 0.00065,
    "iron_100g": 0.00121,
    "iron_serving": 0.00065,
    "iron_unit": "mg",
    "iron_value": 0.65,
    "nova-group": 4,
    "nova-group_100g": 4,
    "nova-group_serving": 4,
    "nutrition-score-fr": 24,
    "nutrition-score-fr_100g": 24,
    "potassium": 0.075,
    "potassium_100g": 0.139,
    "potassium_serving": 0.075,
    "potassium_unit": "mg",
    "potassium_value": 75,
    "proteins": 5,
    "proteins_100g": 9.29,
    "proteins_serving": 5,
    "proteins_unit": "g",
    "proteins_value": 5,
    "salt": 0.4,
    "salt_100g": 0.743,
    "salt_serving": 0.4,
    "salt_unit": "mg",
    "salt_value": 400,
    "saturated-fat": 5,
    "saturated-fat_100g": 9.29,
    "saturated-fat_serving": 5,
    "saturated-fat_unit": "g",
    "saturated-fat_value": 5,
    "sodium": 0.16,
    "sodium_100g": 0.297,
    "sodium_serving": 0.16,
    "sodium_unit": "mg",
    "sodium_value": 160,
    "sugars": 21,
    "sugars_100g": 39,
    "sugars_serving": 21,
    "sugars_unit": "g",
    "sugars_value": 21,
    "trans-fat": 0,
    "trans-fat_100g": 0,
    "trans-fat_serving": 0,
    "trans-fat_unit": "g",
    "trans-fat_value": 0
  },
  "nutriscore": {
    "2021": {
      "category_available": 1,
      "data": {
        "energy": 1940,
        "energy_points": 5,
        "energy_value": 1940,
        "fiber": 1.86,
        "fiber_points": 1,
        "fiber_value": 1.86,
        "fruits_vegetables_nuts_colza_walnut_olive_oils": 16.4583333333333,
        "fruits_vegetables_nuts_colza_walnut_olive_oils_points": 0,
        "fruits_vegetables_nuts_colza_walnut_olive_oils_value": 16.5,
        "is_beverage": 0,
        "is_cheese": 0,
        "is_fat": 0,
        "is_water": 0,
        "negative_points": 25,
        "positive_points": 1,
        "proteins": 9.29,
        "proteins_points": 5,
        "proteins_value": 9.29,
        "saturated_fat": 9.29,
        "saturated_fat_points": 9,
        "saturated_fat_value": 9.3,
        "sodium": 297,
        "sodium_points": 3,
        "sodium_value": 297,
        "sugars": 39,
        "sugars_points": 8,
        "sugars_value": 39
      },
      "grade": "e",
      "nutrients_available": 1,
      "nutriscore_applicable": 1,
      "nutriscore_computed": 1,
      "score": 24
    },
    "2023": {
      "category_available": 1,
      "data": {
        "components": {
          "negative": [
            {
              "id": "energy",
              "points": 5,
              "points_max": 10,
              "unit": "kJ",
              "value": 1940
            },
            {
              "id": "sugars",
              "points": 11,
              "points_max": 15,
              "unit": "g",
              "value": 39
            },
            {
              "id": "saturated_fat",
              "points": 9,
              "points_max": 10,
              "unit": "g",
              "value": 9.29
            },
            {
              "id": "salt",
              "points": 3,
              "points_max": 20,
              "unit": "g",
              "value": 0.74
            }
          ],
          "positive": [
            {
              "id": "fiber",
              "points": 0,
              "points_max": 5,
              "unit": "g",
              "value": 1.86
            },
            {
              "id": "fruits_vegetables_legumes",
              "points": 0,
              "points_max": 5,
              "unit": "%",
              "value": 0
            }
          ]
        },
        "count_proteins": 0,
        "count_proteins_reason": "negative_points_greater_than_or_equal_to_11",
        "is_beverage": 0,
        "is_cheese": 0,
        "is_fat_oil_nuts_seeds": 0,
        "is_red_meat_product": 0,
        "is_water": 0,
        "negative_points": 28,
        "negative_points_max": 55,
        "positive_nutrients": [
          "fiber",
          "fruits_vegetables_legumes"
        ],
        "positive_points": 0,
        "positive_points_max": 10
      },
      "grade": "e",
      "nutrients_available": 1,
      "nutriscore_applicable": 1,
      "nutriscore_computed": 1,
      "score": 28
    }
  },
  "nutriscore_2021_tags": [
    "e"
  ],
  "nutriscore_2023_tags": [
    "e"
  ],
  "nutriscore_data": {
    "energy": 1940,
    "energy_points": 5,
    "energy_value": 1940,
    "fiber": 1.86,
    "fiber_points": 1,
    "fiber_value": 1.86,
    "fruits_vegetables_nuts_colza_walnut_olive_oils": 16.4583333333333,
    "fruits_vegetables_nuts_colza_walnut_olive_oils_points": 0,
    "fruits_vegetables_nuts_colza_walnut_olive_oils_value": 16.5,
    "grade": "e",
    "is_beverage": 0,
    "is_cheese": 0,
    "is_fat": 0,
    "is_water": 0,
    "negative_points": 25,
    "positive_points": 1,
    "proteins": 9.29,
    "proteins_points": 5,
    "proteins_value": 9.29,
    "saturated_fat": 9.29,
    "saturated_fat_points": 9,
    "saturated_fat_value": 9.3,
    "score": 24,
    "sodium": 297,
    "sodium_points": 3,
    "sodium_value": 297,
    "sugars": 39,
    "sugars_points": 8,
    "sugars_value": 39
  },
  "nutriscore_grade": "e",
  "nutriscore_score": 24,
  "nutriscore_score_opposite": -24,
  "nutriscore_tags": [
    "e"
  ],
  "nutriscore_version": "2021",
  "nutrition_data": "on",
  "nutrition_data_per": "serving",
  "nutrition_data_per_imported": "100g",
  "nutrition_data_prepared": "",
  "nutrition_data_prepared_per": "100g",
  "nutrition_data_prepared_per_imported": "100g",
  "nutrition_grade_fr": "e",
  "nutrition_grades": "e",
  "nutrition_grades_tags": [
    "e"
  ],
  "nutrition_score_beverage": 0,
  "nutrition_score_debug": "",
  "nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients": 1,
  "nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value": 0,
  "nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients": 1,
  "nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value": 16.4583333333333,
  "origin": "",
  "origin_en": "",
  "origin_fr": "",
  "origins": "",
  "origins_hierarchy": [],
  "origins_lc": "en",
  "origins_tags": [],
  "other_nutritional_substances_tags": [],
  "packaging_materials_tags": [],
  "packaging_recycling_tags": [],
  "packaging_shapes_tags": [],
  "packaging_text": "",
  "packaging_text_en": "",
  "packaging_text_fr": "",
  "packagings": [],
  "packagings_complete": 0,
  "packagings_materials": {},
  "photographers_tags": [
    "kiliweb",
    "foodless",
    "inf"
  ],
  "pnns_groups_1": "Sugary snacks",
  "pnns_groups_1_tags": [
    "sugary-snacks",
    "known"
  ],
  "pnns_groups_2": "Sweets",
  "pnns_groups_2_tags": [
    "sweets",
    "known"
  ],
  "popularity_key": 4,
  "popularity_tags": [
    "bottom-25-percent-scans-2019",
    "bottom-20-percent-scans-2019",
    "top-85-percent-scans-2019",
    "top-90-percent-scans-2019",
    "top-5000-us-scans-2019",
    "top-10000-us-scans-2019",
    "top-50000-us-scans-2019",
    "top-100000-us-scans-2019",
    "top-country-us-scans-2019",
    "top-10000-it-scans-2019",
    "top-50000-it-scans-2019",
    "top-100000-it-scans-2019",
    "bottom-25-percent-scans-2020",
    "bottom-20-percent-scans-2020",
    "top-85-percent-scans-2020",
    "top-90-percent-scans-2020",
    "top-50000-es-scans-2020",
    "top-100000-es-scans-2020",
    "top-country-es-scans-2020",
    "top-75-percent-scans-2023",
    "top-80-percent-scans-2023",
    "top-85-percent-scans-2023",
    "top-90-percent-scans-2023",
    "top-50000-us-scans-2023",
    "top-100000-us-scans-2023",
    "top-country-us-scans-2023"
  ],
  "product_name": "Butterfinger",
  "product_name_en": "Butterfinger",
  "product_name_en_imported": "Crispety, crunchety, peanut-buttery! candy bar",
  "product_name_fr": "Butterfinger",
  "product_quantity": 53.8,
  "product_type": "food",
  "purchase_places": "",
  "purchase_places_tags": [],
  "quantity": "53.8 g",
  "removed_countries_tags": [],
  "rev": 45,
  "scans_n": 1,
  "selected_images": {
    "front": {
      "display": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.400.jpg",
        "fr": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_fr.4.400.jpg"
      },
      "small": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.200.jpg",
        "fr": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_fr.4.200.jpg"
      },
      "thumb": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_en.34.100.jpg",
        "fr": "https://images.openfoodfacts.org/images/products/009/990/010/0873/front_fr.4.100.jpg"
      }
    },
    "ingredients": {
      "display": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_en.25.400.jpg",
        "fr": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_fr.7.400.jpg"
      },
      "small": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_en.25.200.jpg",
        "fr": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_fr.7.200.jpg"
      },
      "thumb": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_en.25.100.jpg",
        "fr": "https://images.openfoodfacts.org/images/products/009/990/010/0873/ingredients_fr.7.100.jpg"
      }
    },
    "nutrition": {
      "display": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/nutrition_en.44.400.jpg"
      },
      "small": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/nutrition_en.44.200.jpg"
      },
      "thumb": {
        "en": "https://images.openfoodfacts.org/images/products/009/990/010/0873/nutrition_en.44.100.jpg"
      }
    }
  },
  "serving_quantity": 53.8,
  "serving_size": "53.8 g",
  "serving_size_imported": "1 BAR (54 g)",
  "sortkey": 1587669856,
  "sources": [
    {
      "fields": [
        "lc",
        "product_name_en",
        "categories",
        "countries",
        "brand_owner",
        "data_sources",
        "serving_size",
        "allergens",
        "ingredients_text_en",
        "nutrients.calcium_unit",
        "nutrients.calcium_value",
        "nutrients.carbohydrates_unit",
        "nutrients.carbohydrates_value",
        "nutrients.cholesterol_unit",
        "nutrients.cholesterol_value",
        "nutrients.energy_value",
        "nutrients.energy-kcal_value",
        "nutrients.fat_unit",
        "nutrients.fat_value",
        "nutrients.fiber_unit",
        "nutrients.fiber_value",
        "nutrients.iron_unit",
        "nutrients.iron_value",
        "nutrients.potassium_unit",
        "nutrients.potassium_value",
        "nutrients.proteins_unit",
        "nutrients.proteins_value",
        "nutrients.salt_unit",
        "nutrients.salt_value",
        "nutrients.saturated-fat_unit",
        "nutrients.saturated-fat_value",
        "nutrients.sugars_unit",
        "nutrients.sugars_value",
        "nutrients.trans-fat_unit",
        "nutrients.trans-fat_value"
      ],
      "id": "database-usda",
      "images": [],
      "import_t": 1587669856,
      "manufacturer": null,
      "name": "database-usda",
      "url": null
    }
  ],
  "sources_fields": {
    "org-database-usda": {
      "available_date": "2019-01-18T00:00:00Z",
      "fdc_category": "Candy",
      "fdc_data_source": "LI",
      "fdc_id": "691042",
      "modified_date": "2019-01-18T00:00:00Z",
      "publication_date": "2019-12-06T00:00:00Z"
    }
  },
  "states": "en:to-be-completed, en:nutrition-facts-completed, en:ingredients-completed, en:expiration-date-to-be-completed, en:packaging-code-to-be-completed, en:characteristics-to-be-completed, en:origins-to-be-completed, en:categories-completed, en:brands-completed, en:packaging-to-be-completed, en:quantity-completed, en:product-name-completed, en:photos-to-be-validated, en:packaging-photo-to-be-selected, en:nutrition-photo-selected, en:ingredients-photo-selected, en:front-photo-selected, en:photos-uploaded",
  "states_hierarchy": [
    "en:to-be-completed",
    "en:nutrition-facts-completed",
    "en:ingredients-completed",
    "en:expiration-date-to-be-completed",
    "en:packaging-code-to-be-completed",
    "en:characteristics-to-be-completed",
    "en:origins-to-be-completed",
    "en:categories-completed",
    "en:brands-completed",
    "en:packaging-to-be-completed",
    "en:quantity-completed",
    "en:product-name-completed",
    "en:photos-to-be-validated",
    "en:packaging-photo-to-be-selected",
    "en:nutrition-photo-selected",
    "en:ingredients-photo-selected",
    "en:front-photo-selected",
    "en:photos-uploaded"
  ],
  "states_tags": [
    "en:to-be-completed",
    "en:nutrition-facts-completed",
    "en:ingredients-completed",
    "en:expiration-date-to-be-completed",
    "en:packaging-code-to-be-completed",
    "en:characteristics-to-be-completed",
    "en:origins-to-be-completed",
    "en:categories-completed",
    "en:brands-completed",
    "en:packaging-to-be-completed",
    "en:quantity-completed",
    "en:product-name-completed",
    "en:photos-to-be-validated",
    "en:packaging-photo-to-be-selected",
    "en:nutrition-photo-selected",
    "en:ingredients-photo-selected",
    "en:front-photo-selected",
    "en:photos-uploaded"
  ],
  "stores": "SuperValu",
  "stores_tags": [
    "supervalu"
  ],
  "traces": "",
  "traces_from_ingredients": "",
  "traces_from_user": "(en) ",
  "traces_hierarchy": [],
  "traces_lc": "en",
  "traces_tags": [],
  "unique_scans_n": 1,
  "unknown_ingredients_n": 2,
  "unknown_nutrients_tags": [],
  "update_key": "add-product-type",
  "vitamins_prev_tags": [],
  "vitamins_tags": [],
  "weighers_tags": []
}
```