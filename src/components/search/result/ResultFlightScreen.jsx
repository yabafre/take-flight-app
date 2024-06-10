import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { format, parseISO, differenceInDays } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import airlineLogos from '@app/utils/airlineLogos';
import CountryFlag from "react-native-country-flag";
import { Airplane, Setting4 } from 'iconsax-react-native';


const flightData = {
  "meta": {
    "count": 10,
    "links": {
      "self": "https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PAR&destinationLocationCode=OKA&departureDate=2024-08-25&adults=1"
    }
  },
  "data": [
    {
      "type": "flight-offer",
      "id": "1",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-06-30",
      "lastTicketingDateTime": "2024-06-30",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT17H5M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "2E",
                "at": "2024-08-25T13:25:00"
              },
              "arrival": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-26T07:00:00"
              },
              "carrierCode": "MU",
              "number": "554",
              "aircraft": {
                "code": "77W"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT11H35M",
              "id": "36",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-26T09:50:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "I",
                "at": "2024-08-26T13:30:00"
              },
              "carrierCode": "MU",
              "number": "2085",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT2H40M",
              "id": "37",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "617.71",
        "base": "450.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "617.71"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "MU"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "617.71",
            "base": "450.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "36",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "V",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            },
            {
              "segmentId": "37",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "B",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "2",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-06-30",
      "lastTicketingDateTime": "2024-06-30",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT19H5M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "2E",
                "at": "2024-08-25T13:25:00"
              },
              "arrival": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-26T07:00:00"
              },
              "carrierCode": "MU",
              "number": "554",
              "aircraft": {
                "code": "77W"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT11H35M",
              "id": "38",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-26T11:40:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "I",
                "at": "2024-08-26T15:30:00"
              },
              "carrierCode": "MU",
              "number": "287",
              "aircraft": {
                "code": "321"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT2H50M",
              "id": "39",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "617.71",
        "base": "450.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "617.71"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "MU"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "617.71",
            "base": "450.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "38",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "V",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            },
            {
              "segmentId": "39",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "B",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "3",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-06-30",
      "lastTicketingDateTime": "2024-06-30",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT33H10M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "2E",
                "at": "2024-08-25T21:20:00"
              },
              "arrival": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-26T14:40:00"
              },
              "carrierCode": "MU",
              "number": "570",
              "aircraft": {
                "code": "77W"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT11H20M",
              "id": "119",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-27T09:50:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "I",
                "at": "2024-08-27T13:30:00"
              },
              "carrierCode": "MU",
              "number": "2085",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT2H40M",
              "id": "120",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "617.71",
        "base": "450.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "617.71"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "MU"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "617.71",
            "base": "450.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "119",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "V",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            },
            {
              "segmentId": "120",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "B",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "4",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-06-30",
      "lastTicketingDateTime": "2024-06-30",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT35H10M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "2E",
                "at": "2024-08-25T21:20:00"
              },
              "arrival": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-26T14:40:00"
              },
              "carrierCode": "MU",
              "number": "570",
              "aircraft": {
                "code": "77W"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT11H20M",
              "id": "123",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "PVG",
                "terminal": "1",
                "at": "2024-08-27T11:40:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "I",
                "at": "2024-08-27T15:30:00"
              },
              "carrierCode": "MU",
              "number": "287",
              "aircraft": {
                "code": "321"
              },
              "operating": {
                "carrierCode": "MU"
              },
              "duration": "PT2H50M",
              "id": "124",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "617.71",
        "base": "450.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "617.71"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "MU"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "617.71",
            "base": "450.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "123",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "V",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            },
            {
              "segmentId": "124",
              "cabin": "ECONOMY",
              "fareBasis": "VS50BMSQ",
              "class": "B",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              }
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "5",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-06-15",
      "lastTicketingDateTime": "2024-06-15",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT42H20M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "2E",
                "at": "2024-08-25T10:20:00"
              },
              "arrival": {
                "iataCode": "AUH",
                "terminal": "A",
                "at": "2024-08-25T19:00:00"
              },
              "carrierCode": "EY",
              "number": "32",
              "aircraft": {
                "code": "351"
              },
              "operating": {
                "carrierCode": "EY"
              },
              "duration": "PT6H40M",
              "id": "178",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "AUH",
                "terminal": "A",
                "at": "2024-08-26T08:15:00"
              },
              "arrival": {
                "iataCode": "ICN",
                "terminal": "1",
                "at": "2024-08-26T21:40:00"
              },
              "carrierCode": "EY",
              "number": "858",
              "aircraft": {
                "code": "789"
              },
              "operating": {
                "carrierCode": "EY"
              },
              "duration": "PT8H25M",
              "id": "179",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "ICN",
                "terminal": "2",
                "at": "2024-08-27T09:10:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "I",
                "at": "2024-08-27T11:40:00"
              },
              "carrierCode": "EY",
              "number": "8485",
              "aircraft": {
                "code": "223"
              },
              "operating": {
                "carrierCode": "KE"
              },
              "duration": "PT2H30M",
              "id": "180",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "686.51",
        "base": "469.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "686.51"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "EY"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "686.51",
            "base": "469.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "178",
              "cabin": "ECONOMY",
              "fareBasis": "ENN20V2R",
              "brandedFare": "YVALUE",
              "brandedFareLabel": "ECONOMY VALUE",
              "class": "E",
              "includedCheckedBags": {
                "weight": 25,
                "weightUnit": "KG"
              },
              "includedCabinBags": {
                "weight": 7,
                "weightUnit": "KG"
              },
              "amenities": [
                {
                  "description": "EXCESS WEIGHT SPECIAL CHARGE",
                  "isChargeable": true,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "FOOD AND BEVERAGE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "PRIORITY ACCESS",
                  "isChargeable": true,
                  "amenityType": "TRAVEL_SERVICES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "NO SHOW FEE",
                  "isChargeable": true,
                  "amenityType": "TRAVEL_SERVICES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDARD SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "REFUNDABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BID TO UPGRADE",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "179",
              "cabin": "ECONOMY",
              "fareBasis": "ENN20V2R",
              "brandedFare": "YVALUE",
              "brandedFareLabel": "ECONOMY VALUE",
              "class": "E",
              "includedCheckedBags": {
                "weight": 25,
                "weightUnit": "KG"
              },
              "includedCabinBags": {
                "weight": 7,
                "weightUnit": "KG"
              },
              "amenities": [
                {
                  "description": "EXCESS WEIGHT SPECIAL CHARGE",
                  "isChargeable": true,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "FOOD AND BEVERAGE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "PRIORITY ACCESS",
                  "isChargeable": true,
                  "amenityType": "TRAVEL_SERVICES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "NO SHOW FEE",
                  "isChargeable": true,
                  "amenityType": "TRAVEL_SERVICES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDARD SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "REFUNDABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BID TO UPGRADE",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "180",
              "cabin": "ECONOMY",
              "fareBasis": "ENN20V2R",
              "brandedFare": "YVALUE",
              "brandedFareLabel": "ECONOMY VALUE",
              "class": "E",
              "includedCheckedBags": {
                "weight": 25,
                "weightUnit": "KG"
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "EXCESS WEIGHT SPECIAL CHARGE",
                  "isChargeable": true,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "FOOD AND BEVERAGE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "PRIORITY ACCESS",
                  "isChargeable": true,
                  "amenityType": "TRAVEL_SERVICES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "NO SHOW FEE",
                  "isChargeable": true,
                  "amenityType": "TRAVEL_SERVICES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDARD SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "REFUNDABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BID TO UPGRADE",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "6",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-08-25",
      "lastTicketingDateTime": "2024-08-25",
      "numberOfBookableSeats": 4,
      "itineraries": [
        {
          "duration": "PT31H15M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "1",
                "at": "2024-08-25T19:50:00"
              },
              "arrival": {
                "iataCode": "IST",
                "at": "2024-08-26T00:20:00"
              },
              "carrierCode": "TK",
              "number": "1828",
              "aircraft": {
                "code": "77W"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT3H30M",
              "id": "142",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "IST",
                "at": "2024-08-26T02:00:00"
              },
              "arrival": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-26T19:00:00"
              },
              "carrierCode": "TK",
              "number": "86",
              "aircraft": {
                "code": "789"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT11H",
              "id": "143",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-27T08:00:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "D",
                "at": "2024-08-27T10:05:00"
              },
              "carrierCode": "TK",
              "number": "8833",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "NH"
              },
              "duration": "PT2H5M",
              "id": "144",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "695.07",
        "base": "306.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "695.07"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "TK"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "695.07",
            "base": "306.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "142",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "143",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "144",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "7",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-08-25",
      "lastTicketingDateTime": "2024-08-25",
      "numberOfBookableSeats": 4,
      "itineraries": [
        {
          "duration": "PT33H10M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "1",
                "at": "2024-08-25T17:55:00"
              },
              "arrival": {
                "iataCode": "IST",
                "at": "2024-08-25T22:35:00"
              },
              "carrierCode": "TK",
              "number": "1834",
              "aircraft": {
                "code": "32B"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT3H40M",
              "id": "116",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "IST",
                "at": "2024-08-26T02:00:00"
              },
              "arrival": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-26T19:00:00"
              },
              "carrierCode": "TK",
              "number": "86",
              "aircraft": {
                "code": "789"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT11H",
              "id": "117",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-27T08:00:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "D",
                "at": "2024-08-27T10:05:00"
              },
              "carrierCode": "TK",
              "number": "8833",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "NH"
              },
              "duration": "PT2H5M",
              "id": "118",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "695.07",
        "base": "306.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "695.07"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "TK"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "695.07",
            "base": "306.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "116",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "117",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "118",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "8",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-08-25",
      "lastTicketingDateTime": "2024-08-25",
      "numberOfBookableSeats": 4,
      "itineraries": [
        {
          "duration": "PT35H",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "1",
                "at": "2024-08-25T16:05:00"
              },
              "arrival": {
                "iataCode": "IST",
                "at": "2024-08-25T20:45:00"
              },
              "carrierCode": "TK",
              "number": "1826",
              "aircraft": {
                "code": "32B"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT3H40M",
              "id": "30",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "IST",
                "at": "2024-08-26T02:00:00"
              },
              "arrival": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-26T19:00:00"
              },
              "carrierCode": "TK",
              "number": "86",
              "aircraft": {
                "code": "789"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT11H",
              "id": "31",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-27T08:00:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "D",
                "at": "2024-08-27T10:05:00"
              },
              "carrierCode": "TK",
              "number": "8833",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "NH"
              },
              "duration": "PT2H5M",
              "id": "32",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "695.07",
        "base": "306.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "695.07"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "TK"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "695.07",
            "base": "306.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "30",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "31",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "32",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "9",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-08-25",
      "lastTicketingDateTime": "2024-08-25",
      "numberOfBookableSeats": 4,
      "itineraries": [
        {
          "duration": "PT36H55M",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "1",
                "at": "2024-08-25T14:10:00"
              },
              "arrival": {
                "iataCode": "IST",
                "at": "2024-08-25T18:50:00"
              },
              "carrierCode": "TK",
              "number": "1824",
              "aircraft": {
                "code": "332"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT3H40M",
              "id": "413",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "IST",
                "at": "2024-08-26T02:00:00"
              },
              "arrival": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-26T19:00:00"
              },
              "carrierCode": "TK",
              "number": "86",
              "aircraft": {
                "code": "789"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT11H",
              "id": "414",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-27T08:00:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "D",
                "at": "2024-08-27T10:05:00"
              },
              "carrierCode": "TK",
              "number": "8833",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "NH"
              },
              "duration": "PT2H5M",
              "id": "415",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "695.07",
        "base": "306.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "695.07"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "TK"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "695.07",
            "base": "306.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "413",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "414",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "415",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "flight-offer",
      "id": "10",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": false,
      "lastTicketingDate": "2024-08-25",
      "lastTicketingDateTime": "2024-08-25",
      "numberOfBookableSeats": 4,
      "itineraries": [
        {
          "duration": "PT40H",
          "segments": [
            {
              "departure": {
                "iataCode": "CDG",
                "terminal": "1",
                "at": "2024-08-25T11:05:00"
              },
              "arrival": {
                "iataCode": "IST",
                "at": "2024-08-25T15:45:00"
              },
              "carrierCode": "TK",
              "number": "1822",
              "aircraft": {
                "code": "333"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT3H40M",
              "id": "33",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "IST",
                "at": "2024-08-26T02:00:00"
              },
              "arrival": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-26T19:00:00"
              },
              "carrierCode": "TK",
              "number": "86",
              "aircraft": {
                "code": "789"
              },
              "operating": {
                "carrierCode": "TK"
              },
              "duration": "PT11H",
              "id": "34",
              "numberOfStops": 0,
              "blacklistedInEU": false
            },
            {
              "departure": {
                "iataCode": "KIX",
                "terminal": "1",
                "at": "2024-08-27T08:00:00"
              },
              "arrival": {
                "iataCode": "OKA",
                "terminal": "D",
                "at": "2024-08-27T10:05:00"
              },
              "carrierCode": "TK",
              "number": "8833",
              "aircraft": {
                "code": "320"
              },
              "operating": {
                "carrierCode": "NH"
              },
              "duration": "PT2H5M",
              "id": "35",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "EUR",
        "total": "695.07",
        "base": "306.00",
        "fees": [
          {
            "amount": "0.00",
            "type": "SUPPLIER"
          },
          {
            "amount": "0.00",
            "type": "TICKETING"
          }
        ],
        "grandTotal": "695.07"
      },
      "pricingOptions": {
        "fareType": [
          "PUBLISHED"
        ],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": [
        "TK"
      ],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "EUR",
            "total": "695.07",
            "base": "306.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "33",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "34",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            },
            {
              "segmentId": "35",
              "cabin": "ECONOMY",
              "fareBasis": "TN2XPBO",
              "brandedFare": "PS",
              "brandedFareLabel": "PROMOTIONAL",
              "class": "T",
              "includedCheckedBags": {
                "quantity": 2
              },
              "includedCabinBags": {
                "quantity": 1
              },
              "amenities": [
                {
                  "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "BAG INCLUDED",
                  "isChargeable": false,
                  "amenityType": "BAGGAGE",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "MEAL SERVICE",
                  "isChargeable": false,
                  "amenityType": "MEAL",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "STANDART SEAT SELECTION",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "CHANGEABLE TICKET",
                  "isChargeable": true,
                  "amenityType": "BRANDED_FARES",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                },
                {
                  "description": "ONLINE MESSAGE RIGHT",
                  "isChargeable": false,
                  "amenityType": "ENTERTAINMENT",
                  "amenityProvider": {
                    "name": "BrandedFare"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
  ],
  "dictionaries": {
    "locations": {
      "PVG": {
        "cityCode": "SHA",
        "countryCode": "CN"
      },
      "OKA": {
        "cityCode": "OKA",
        "countryCode": "JP"
      },
      "CDG": {
        "cityCode": "PAR",
        "countryCode": "FR"
      },
      "AMS": {
        "cityCode": "AMS",
        "countryCode": "NL"
      },
      "TPE": {
        "cityCode": "TPE",
        "countryCode": "TW"
      },
      "IST": {
        "cityCode": "IST",
        "countryCode": "TR"
      },
      "HEL": {
        "cityCode": "HEL",
        "countryCode": "FI"
      },
      "NRT": {
        "cityCode": "TYO",
        "countryCode": "JP"
      },
      "FCO": {
        "cityCode": "ROM",
        "countryCode": "IT"
      },
      "AUH": {
        "cityCode": "AUH",
        "countryCode": "AE"
      },
      "FRA": {
        "cityCode": "FRA",
        "countryCode": "DE"
      },
      "ICN": {
        "cityCode": "SEL",
        "countryCode": "KR"
      },
      "PEK": {
        "cityCode": "BJS",
        "countryCode": "CN"
      },
      "MUC": {
        "cityCode": "MUC",
        "countryCode": "DE"
      },
      "KIX": {
        "cityCode": "OSA",
        "countryCode": "JP"
      },
      "HND": {
        "cityCode": "TYO",
        "countryCode": "JP"
      }
    },
    "aircraft": {
      "223": "AIRBUS  A220-300",
      "319": "AIRBUS A319",
      "320": "AIRBUS A320",
      "321": "AIRBUS A321",
      "332": "AIRBUS A330-200",
      "333": "AIRBUS A330-300",
      "351": "AIRBUS A350-1000",
      "359": "AIRBUS A350-900",
      "737": "BOEING 737 ALL SERIES PASSENGER",
      "738": "BOEING 737-800",
      "767": "BOEING 767",
      "772": "BOEING 777-200/200ER",
      "773": "BOEING 777-300",
      "781": "BOEING 787-10",
      "787": "787  ALL SERIES PASSENGER",
      "788": "BOEING 787-8",
      "789": "BOEING 787-9",
      "32A": "AIRBUS A320 (SHARKLETS)",
      "7M8": "BOEING 737 MAX 8",
      "32B": "AIRBUS A321 (SHARKLETS)",
      "74H": "BOEING 747-8",
      "32N": "AIRBUS A320NEO",
      "32Q": "AIRBUS A321NEO",
      "32S": "AIRBUS INDUSTRIE A318/A319/A320/A321",
      "77W": "BOEING 777-300ER"
    },
    "currencies": {
      "EUR": "EURO"
    },
    "carriers": {
      "JL": "JAPAN AIRLINES",
      "EH": "ANA WINGS",
      "GK": "JETSTAR JAPAN",
      "AF": "AIR FRANCE",
      "CI": "CHINA AIRLINES LTD.",
      "MU": "CHINA EASTERN AIRLINES",
      "OZ": "ASIANA AIRLINES",
      "BR": "EVA AIR",
      "EY": "ETIHAD AIRWAYS",
      "6J": "SOLASEED AIR",
      "TK": "TURKISH AIRLINES",
      "AY": "FINNAIR",
      "AZ": "ITA AIRWAYS",
      "KE": "KOREAN AIR",
      "NH": "ALL NIPPON AIRWAYS",
      "LH": "LUFTHANSA",
      "CA": "AIR CHINA",
      "LJ": "JIN AIR"
    }
  }
};



const ResultFlightScreen = () => {

  const formatDuration = (duration) => {
    const matches = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = matches[1] ? matches[1].slice(0, -1) : '0';
    const minutes = matches[2] ? matches[2].slice(0, -1) : '0';
    return `${hours}h ${minutes}min`;
  };

  const getCarrierLogoComponent = (carrierCode) => {
    const LogoComponent = airlineLogos[carrierCode]?.compact_svg || airlineLogos[carrierCode]?.full_svg;
    return LogoComponent ? <LogoComponent width={14} height={14} /> : null;
  };

  const generateDateDots = () => {
    const daysDifference = 15;
    const dots = [];
    for (let i = 0; i < daysDifference; i++) {
      dots.push(<Text key={i} className="text-white text-sm font-bold">-</Text>);
    }
    return dots;
  };

  return (
    <>
      <View className="bg-[#121212] h-full top-4 py-4 px-6 mb-36 gap-6">
        <View className="p-4 bg-[#1400ff] rounded-2xl h-[255px] w-full flex flex-col items-start justify-between relative">
          <View className={'flex flex-col items-start gap-2'}>
            <Text className="text-white text-lg font-extralight">Round Trip</Text>
            <Text className="text-white text-6xl font-light">Paris to Okinawa</Text>
          </View>
          <View className="flex flex-row items-center gap-4">
            <Text className="text-white text-lg font-bold">1 Adult</Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-white text-lg font-bold">25 Aug</Text>
            <View className={'dots flex flex-row items-center justify-between w-[60%]'}>
              <Text className="text-white text-2xl font-bold">•</Text>
              {generateDateDots()}
              <Text className="text-white text-2xl font-bold">•</Text>
            </View>
            <Text className="text-white text-lg font-bold">15 Sep</Text>
          </View>
          <View className="absolute bottom-4 right-2 top-24">
            <View className="flex flex-row items-center gap-4 bg-white rounded-xl py-1 px-2 relative overflow-hidden">
              <View className="transform rotate-45 relative ">
                <Airplane size={18} variant={'Bold'} color="black" />
              </View>
              <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#E0E0E018] opacity-50" />
              <CountryFlag isoCode={'JP'} size={12} />
            </View>
          </View>
        </View>
        <View className=" flex flex-row justify-between items-center p-4 bg-[#181818] rounded-xl">
          <Text className="text-white text-lg font-normal">Showing {flightData.meta.count} results</Text>
          <TouchableOpacity className="flex-row items-center gap-2 mt-2">
            <Setting4 size={18} color="white" />
            <Text className="text-white text-base">Filter</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-col gap-4">
          {flightData.data.map(flight => {
            const departureSegment = flight.itineraries[0].segments[0];
            const arrivalSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
            const totalDuration = flight.itineraries[0].duration;

            return (
              <View key={flight.id} className="bg-[#181818] rounded-2xl p-4 shadow-lg">
                <View className="flex-row items-center">
                  {getCarrierLogoComponent(flight.validatingAirlineCodes[0])}
                  <Text className="ml-4 text-white font-bold text-md capitalize">{flightData.dictionaries.carriers[flight.validatingAirlineCodes[0]]}</Text>
                </View>
                <View className="mt-4 flex-row justify-between items-center">
                  <Text className="text-white font-bold text-lg">{format(parseISO(departureSegment.departure.at), 'HH:mm')}</Text>
                  <Text className="text-white">-</Text>
                  <View className="transform rotate-90 relative ">
                    <Airplane size={18} variant={'Bold'} color="white" />
                  </View>
                  <Text className="text-white">-</Text>
                  <Text className="text-white font-bold text-lg">{format(parseISO(arrivalSegment.arrival.at), 'HH:mm')}</Text>
                </View>
                <View className="mt-2 flex-row justify-between items-center">
                  <Text className="text-white">{departureSegment.departure.iataCode}</Text>
                  <Text className="text-white">{formatDuration(totalDuration)}</Text>
                  <Text className="text-white">{arrivalSegment.arrival.iataCode}</Text>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-white font-bold text-lg">{flight.price.total} {flightData.dictionaries.currencies[flight.price.currency]}</Text>
                  <TouchableOpacity className="mt-4 bg-black py-2 px-4 rounded-lg items-center">
                    <Text className="text-white font-bold">Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default ResultFlightScreen;
