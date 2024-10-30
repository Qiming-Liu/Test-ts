export const data = {
    "sid": "6c16f608-a100-441a-9b51-a096fdbdbd66",
    "accessLevel": "FULL",
    "id": 2145891,
    "description": "Payments",
    "status": "SIGNED",
    "patientId": 235781,
    "courseId": 2145891,
    "courseInformation": {
      "name": "Payments",
      "events": [
        {
          "recordId": 2145891,
          "user": {
            "id": 83614,
            "name": "Temara Pia"
          },
          "dateTime": "2022-06-20T22:28:15Z"
        }
      ]
    },
    "secondaryType": {
      "id": 321672,
      "name": "Telehealth",
      "description": "Phone or online session",
      "formType": "CONSULTATION",
      "visible": true,
      "created": "2022-02-17T22:50:04Z",
      "updated": "2022-03-09T19:42:17Z"
    },
    "accDetails": [],
    "modalityId": 218,
    "teamId": 1613,
    "teamName": "Payments and Referrals",
    "version": 14,
    "documents": [],
    "clientCreated": "2022-06-20T22:28:15Z",
    "updated": "2022-07-25T01:34:57Z",
    "created": "2022-06-20T22:28:18Z",
    "signed": "2022-07-25T01:34:57Z",
    "accessControl": [],
    "restricted": false,
    "accessOverridden": false,
    "accessCanBeOverridden": false,
    "type": "CONSULTATION",
    "extensions": [],
    "participantRecord": false,
    "canBeDeleted": false,
    "domain": "RECORD",
    "links": {},
    "accRecord": false,
    "purchaseOrderRecord": false,
    "securePatientId": 235781,
    "groupingKey": 271637424,
    "content": {
      "model": {}
    },
    "form": {
      "id": 8436,
      "name": "Main",
      "visible": true,
      "status": "SUPERSEDED",
      "type": "CONSULTATION",
      "modalityId": 218,
      "created": "2019-11-28T23:18:53Z",
      "updated": "2024-06-04T22:12:23Z",
      "mappingId": "NOTED-MN-01",
      "default": false,
      "json": {
        "schema": {
          "type": "object",
          "properties": {
            "notes": {
              "type": "object",
              "properties": {
                "nNotes": {
                  "type": "string",
                  "title": "Notes"
                }
              }
            }
          }
        },
        "form": [
          {
            "type": "fieldsetcollapse",
            "key": "notes",
            "title": "Notes",
            "items": [
              {
                "key": "notes.nNotes",
                "type": "textarea",
                "placeholder": "Please don't record any information here that is required for reporting"
              }
            ]
          }
        ]
      }
    },
    "user": {
      "id": 83614,
      "firstName": "Temara",
      "lastName": "Pia"
    },
    "creator": {
      "id": 83060,
      "firstName": "Laura",
      "lastName": "Fear"
    },
    "questions": [
      {
        "id": 795967,
        "content": {
          "model": {
            "multipleDate": "No",
            "sessiondate": "2022-05-15T12:00:00Z",
            "fee": "95",
            "paymentStatus": "Paid",
            "mode": "Internet Banking",
            "details": "Full payment of $285 made covering 2/5, 9/5, 16/5"
          }
        },
        "form": {
          "id": 9229,
          "name": "Payment Tracking",
          "visible": true,
          "status": "SUPERSEDED",
          "type": "QUESTION",
          "predecessorId": 8443,
          "modalityId": 218,
          "created": "2022-02-18T02:46:07Z",
          "updated": "2022-12-13T03:42:37Z",
          "default": false,
          "json": {
            "schema": {
              "type": "object",
              "properties": {
                "multipleDate": {
                  "type": "string",
                  "enum": [
                    "Yes",
                    "No"
                  ]
                },
                "mupltipleDatesDetails": {
                  "type": "string"
                },
                "sessiondate": {
                  "type": "string"
                },
                "fee": {
                  "type": "string"
                },
                "paymentStatus": {
                  "type": "string",
                  "enum": [
                    "Paid",
                    "Partial Payment",
                    "Unpaid"
                  ]
                },
                "paymentdate": {
                  "type": "string"
                },
                "outstanding": {
                  "type": "string"
                },
                "mode": {
                  "type": "string",
                  "enum": [
                    "Cash",
                    "Eftpos",
                    "Internet Banking",
                    "Other"
                  ]
                },
                "modeCash": {
                  "type": "string"
                },
                "modeOther": {
                  "type": "string"
                },
                "details": {
                  "type": "string"
                }
              }
            },
            "form": [
              {
                "type": "fieldsetcollapse",
                "title": "Payment Tracking",
                "expanded": true,
                "items": [
                  {
                    "key": "multipleDate",
                    "type": "radiobuttons",
                    "title": "Does this payment cover multiple session dates"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.multipleDate == 'Yes'",
                    "items": [
                      {
                        "key": "mupltipleDatesDetails",
                        "type": "textarea",
                        "title": "Please list all session dates covered by this entry"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.multipleDate == 'No'",
                    "items": [
                      {
                        "key": "sessiondate",
                        "type": "date",
                        "title": "Single session date"
                      }
                    ]
                  },
                  {
                    "key": "fee",
                    "type": "text",
                    "title": "Fee per session"
                  },
                  {
                    "key": "paymentStatus",
                    "type": "radiobuttons",
                    "title": "Payment status"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.paymentStatus.includes('Partial Payment') || model.pay[arrayIndex].paymentStatus.includes('Paid')",
                    "items": [
                      {
                        "key": "paymentdate",
                        "type": "date",
                        "title": "Payment date"
                      },
                      {
                        "key": "outstanding",
                        "condition": "model.paymentStatus == 'Partial Payment'",
                        "type": "textarea",
                        "title": "Partial payment details",
                        "placeholder": "Please include amount outstanding"
                      }
                    ]
                  },
                  {
                    "key": "mode",
                    "type": "radiobuttons",
                    "title": "Method of Payment"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.mode == 'Cash'",
                    "items": [
                      {
                        "key": "modeCash",
                        "type": "textarea",
                        "title": "Cash details",
                        "placeholder": "Eg: Cash put in cash box at Massey"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.mode == 'Other'",
                    "items": [
                      {
                        "key": "modeOther",
                        "type": "text",
                        "title": "Other Details"
                      }
                    ]
                  },
                  {
                    "key": "details",
                    "type": "textarea",
                    "title": "Details"
                  }
                ]
              }
            ]
          }
        },
        "name": "Session date 16/5",
        "created": "2022-06-20T22:30:43Z",
        "updated": "2022-06-20T22:31:05Z"
      },
      {
        "id": 795966,
        "content": {
          "model": {
            "multipleDate": "No",
            "sessiondate": "2022-05-08T12:00:00Z",
            "fee": "95",
            "paymentStatus": "Paid",
            "details": "Full payment of $285 made covering 2/5, 9/5, 16/5",
            "mode": "Internet Banking"
          }
        },
        "form": {
          "id": 9229,
          "name": "Payment Tracking",
          "visible": true,
          "status": "SUPERSEDED",
          "type": "QUESTION",
          "predecessorId": 8443,
          "modalityId": 218,
          "created": "2022-02-18T02:46:07Z",
          "updated": "2022-12-13T03:42:37Z",
          "default": false,
          "json": {
            "schema": {
              "type": "object",
              "properties": {
                "multipleDate": {
                  "type": "string",
                  "enum": [
                    "Yes",
                    "No"
                  ]
                },
                "mupltipleDatesDetails": {
                  "type": "string"
                },
                "sessiondate": {
                  "type": "string"
                },
                "fee": {
                  "type": "string"
                },
                "paymentStatus": {
                  "type": "string",
                  "enum": [
                    "Paid",
                    "Partial Payment",
                    "Unpaid"
                  ]
                },
                "paymentdate": {
                  "type": "string"
                },
                "outstanding": {
                  "type": "string"
                },
                "mode": {
                  "type": "string",
                  "enum": [
                    "Cash",
                    "Eftpos",
                    "Internet Banking",
                    "Other"
                  ]
                },
                "modeCash": {
                  "type": "string"
                },
                "modeOther": {
                  "type": "string"
                },
                "details": {
                  "type": "string"
                }
              }
            },
            "form": [
              {
                "type": "fieldsetcollapse",
                "title": "Payment Tracking",
                "expanded": true,
                "items": [
                  {
                    "key": "multipleDate",
                    "type": "radiobuttons",
                    "title": "Does this payment cover multiple session dates"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.multipleDate == 'Yes'",
                    "items": [
                      {
                        "key": "mupltipleDatesDetails",
                        "type": "textarea",
                        "title": "Please list all session dates covered by this entry"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.multipleDate == 'No'",
                    "items": [
                      {
                        "key": "sessiondate",
                        "type": "date",
                        "title": "Single session date"
                      }
                    ]
                  },
                  {
                    "key": "fee",
                    "type": "text",
                    "title": "Fee per session"
                  },
                  {
                    "key": "paymentStatus",
                    "type": "radiobuttons",
                    "title": "Payment status"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.paymentStatus.includes('Partial Payment') || model.pay[arrayIndex].paymentStatus.includes('Paid')",
                    "items": [
                      {
                        "key": "paymentdate",
                        "type": "date",
                        "title": "Payment date"
                      },
                      {
                        "key": "outstanding",
                        "condition": "model.paymentStatus == 'Partial Payment'",
                        "type": "textarea",
                        "title": "Partial payment details",
                        "placeholder": "Please include amount outstanding"
                      }
                    ]
                  },
                  {
                    "key": "mode",
                    "type": "radiobuttons",
                    "title": "Method of Payment"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.mode == 'Cash'",
                    "items": [
                      {
                        "key": "modeCash",
                        "type": "textarea",
                        "title": "Cash details",
                        "placeholder": "Eg: Cash put in cash box at Massey"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.mode == 'Other'",
                    "items": [
                      {
                        "key": "modeOther",
                        "type": "text",
                        "title": "Other Details"
                      }
                    ]
                  },
                  {
                    "key": "details",
                    "type": "textarea",
                    "title": "Details"
                  }
                ]
              }
            ]
          }
        },
        "name": "Session date 9/5",
        "created": "2022-06-20T22:30:16Z",
        "updated": "2022-06-20T22:31:05Z"
      },
      {
        "id": 795955,
        "content": {
          "model": {
            "multipleDate": "No",
            "sessiondate": "2022-05-01T12:00:00Z",
            "fee": "95",
            "paymentStatus": "Paid",
            "mode": "Internet Banking",
            "details": "Full payment of $285 made covering 2/5, 9/5, 16/5"
          }
        },
        "form": {
          "id": 9229,
          "name": "Payment Tracking",
          "visible": true,
          "status": "SUPERSEDED",
          "type": "QUESTION",
          "predecessorId": 8443,
          "modalityId": 218,
          "created": "2022-02-18T02:46:07Z",
          "updated": "2022-12-13T03:42:37Z",
          "default": false,
          "json": {
            "schema": {
              "type": "object",
              "properties": {
                "multipleDate": {
                  "type": "string",
                  "enum": [
                    "Yes",
                    "No"
                  ]
                },
                "mupltipleDatesDetails": {
                  "type": "string"
                },
                "sessiondate": {
                  "type": "string"
                },
                "fee": {
                  "type": "string"
                },
                "paymentStatus": {
                  "type": "string",
                  "enum": [
                    "Paid",
                    "Partial Payment",
                    "Unpaid"
                  ]
                },
                "paymentdate": {
                  "type": "string"
                },
                "outstanding": {
                  "type": "string"
                },
                "mode": {
                  "type": "string",
                  "enum": [
                    "Cash",
                    "Eftpos",
                    "Internet Banking",
                    "Other"
                  ]
                },
                "modeCash": {
                  "type": "string"
                },
                "modeOther": {
                  "type": "string"
                },
                "details": {
                  "type": "string"
                }
              }
            },
            "form": [
              {
                "type": "fieldsetcollapse",
                "title": "Payment Tracking",
                "expanded": true,
                "items": [
                  {
                    "key": "multipleDate",
                    "type": "radiobuttons",
                    "title": "Does this payment cover multiple session dates"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.multipleDate == 'Yes'",
                    "items": [
                      {
                        "key": "mupltipleDatesDetails",
                        "type": "textarea",
                        "title": "Please list all session dates covered by this entry"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.multipleDate == 'No'",
                    "items": [
                      {
                        "key": "sessiondate",
                        "type": "date",
                        "title": "Single session date"
                      }
                    ]
                  },
                  {
                    "key": "fee",
                    "type": "text",
                    "title": "Fee per session"
                  },
                  {
                    "key": "paymentStatus",
                    "type": "radiobuttons",
                    "title": "Payment status"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.paymentStatus.includes('Partial Payment') || model.pay[arrayIndex].paymentStatus.includes('Paid')",
                    "items": [
                      {
                        "key": "paymentdate",
                        "type": "date",
                        "title": "Payment date"
                      },
                      {
                        "key": "outstanding",
                        "condition": "model.paymentStatus == 'Partial Payment'",
                        "type": "textarea",
                        "title": "Partial payment details",
                        "placeholder": "Please include amount outstanding"
                      }
                    ]
                  },
                  {
                    "key": "mode",
                    "type": "radiobuttons",
                    "title": "Method of Payment"
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.mode == 'Cash'",
                    "items": [
                      {
                        "key": "modeCash",
                        "type": "textarea",
                        "title": "Cash details",
                        "placeholder": "Eg: Cash put in cash box at Massey"
                      }
                    ]
                  },
                  {
                    "type": "fieldset",
                    "condition": "model.mode == 'Other'",
                    "items": [
                      {
                        "key": "modeOther",
                        "type": "text",
                        "title": "Other Details"
                      }
                    ]
                  },
                  {
                    "key": "details",
                    "type": "textarea",
                    "title": "Details"
                  }
                ]
              }
            ]
          }
        },
        "name": "Session date 2 May 2022",
        "created": "2022-06-20T22:28:29Z",
        "updated": "2022-06-20T22:31:05Z"
      }
    ]
  }