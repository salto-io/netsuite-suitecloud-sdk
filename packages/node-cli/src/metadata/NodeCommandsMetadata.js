module.exports = {
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