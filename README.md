# About Project

An application used by LocalSearch engineers to check my knowledge while searchig some business entries :)

---

## Features

* Get all available buisness entries
* Search buisness entries by specific term

---

## How to run App?

Clone this repository and run:

```bash
docker-compose up --build
```

After the build is completed app is running on `localhost:8000`.

---

## How to run tests?

```bash
docker-compose run --rm server yarn run test
```

---

## Postman Collection

You can find exported postman collection on the following [link](./LocalSearchBE.postman_collection.json). If you want to test API, download file and import in your postman. :)

---

## API Docs

```http
GET /business-entries
```

##### Response

```json
[
{
        "displayWhat": "Casa Ferlin",
        "displayWhere": "Stampfenbachstrasse 38, 8006 Zürich",
        "openingHours": {
            "days": {
                "monday": [
                    {
                        "start": "11:30",
                        "end": "14:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "22:00",
                        "type": "OPEN"
                    }
                ],
                "tuesday": [
                    {
                        "start": "11:30",
                        "end": "14:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "22:00",
                        "type": "OPEN"
                    }
                ],
                "wednesday": [
                    {
                        "start": "11:30",
                        "end": "14:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "22:00",
                        "type": "OPEN"
                    }
                ],
                "thursday": [
                    {
                        "start": "11:30",
                        "end": "14:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "22:00",
                        "type": "OPEN"
                    }
                ],
                "friday": [
                    {
                        "start": "11:30",
                        "end": "14:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "22:00",
                        "type": "OPEN"
                    }
                ]
            },
            "closed_on_holidays": true,
            "open_by_arrangement": false
        },
        "phoneNumbers": [
            "0443623509",
            "0443623523",
            "0443623534"
        ],
        "zipCodes": [
            8006
        ],
        "websites": [
            "http://www.casaferlin.ch"
        ]
    },
]
```

---
```http
GET /search?term=le
```

##### Response

```json
[
    {
        "displayWhat": "Le Café du Marché",
        "displayWhere": "Rue de Conthey 17, 1950 Sion",
        "openingHours": {
            "days": {
                "tuesday": [
                    {
                        "start": "11:30",
                        "end": "15:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "00:00",
                        "type": "OPEN"
                    }
                ],
                "wednesday": [
                    {
                        "start": "11:30",
                        "end": "15:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "00:00",
                        "type": "OPEN"
                    }
                ],
                "thursday": [
                    {
                        "start": "11:30",
                        "end": "15:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "00:00",
                        "type": "OPEN"
                    }
                ],
                "friday": [
                    {
                        "start": "11:30",
                        "end": "15:00",
                        "type": "OPEN"
                    },
                    {
                        "start": "18:30",
                        "end": "00:00",
                        "type": "OPEN"
                    }
                ],
                "saturday": [
                    {
                        "start": "18:00",
                        "end": "00:00",
                        "type": "OPEN"
                    }
                ],
                "sunday": [
                    {
                        "start": "11:30",
                        "end": "15:00",
                        "type": "OPEN"
                    }
                ]
            }
        },
        "phoneNumbers": [
            "0273211181"
        ],
        "zipCodes": [
            1950
        ],
        "websites": [
            "http://cafemarche.ch"
        ]
    }
]
```
