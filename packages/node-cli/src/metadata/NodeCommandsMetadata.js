module.exports = {
	"account:savetoken": {
		"name": "account:savetoken",
		"description": "Saves a TBA token that you issued previously in NetSuite.",
        "isSetupRequired": false,
        "options": {
            "account": {
                "name": "account",
                "description": "References the ID of the account to log in to.",
                "mandatory": true,
				"type": "SINGLE",
				"disableInIntegrationMode": false
            },
            "authid": {
                "name": "authid",
                "description": "References the custom name you gave to a specific account-role combination.",
                "mandatory": true,
				"type": "SINGLE",
				"disableInIntegrationMode": false
            },
            "tokenid": {
                "name": "tokenid",
                "description": "Enter the token ID of a TBA token you issued previously in NetSuite.",
                "mandatory": true,
				"type": "SINGLE",
				"disableInIntegrationMode": false
            },
            "tokensecret": {
                "name": "tokensecret",
                "description": "Enter the token secret of a TBA token you issued previously in NetSuite.",
                "mandatory": true,
				"type": "SINGLE",
				"disableInIntegrationMode": false
            },
            "url": {
                "name": "url",
                "description": "Specify the NetSuite domain of the account you want to use. You only need to specify the NetSuite domain if you are not using a production account.",
                "mandatory": false,
				"type": "SINGLE",
				"disableInIntegrationMode": false
            }
        }
    },
    "account:setup": {
        "name": "account:setup",
        "alias": "sa",
        "description": "Sets up an account to use with the SuiteCloud CLI for Node.js.",
        "isSetupRequired": false,
        "forceInteractiveMode": true,
        "options": {
            "dev": {
                "name": "dev",
                "alias": "d",
                "description": "Specify the NetSuite domain of the account you want to use. You only need to specify the NetSuite domain if you are not using a production account.",
                "type": "FLAG",
                "mandatory": false,
				"disableInIntegrationMode": false
			}
        }
    }
};