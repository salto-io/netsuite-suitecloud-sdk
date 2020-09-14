module.exports = {
    "account:ci": {
        "name": "account:ci",
        "description": "Set up an account to use with the SuiteCloud CLI for Node.js. This command only supports non-interactive mode.",
        "isSetupRequired": false,
        "options": {
            "account": {
                "name": "account",
                "description": "References the ID of the account to log in to.",
                "mandatory": false
            },
            "authid": {
                "name": "authid",
                "description": "References the custom name you gave to a specific account-role combination.",
                "mandatory": false
            },
            "savetoken" :{
                "name": "savetoken",
                "description": "Enter a TBA token that you issued previously in NetSuite.",
                "type": "FLAG",
                "mandatory": false
            },
            "tokenid": {
                "name": "tokenid",
                "description": "Enter the token ID of a TBA token you issued previously in NetSuite.",
                "mandatory": false
            },
            "tokensecret": {
                "name": "tokensecret",
                "description": "Enter the token secret of a TBA token you issued previously in NetSuite.",
                "mandatory": false
            },
            "url": {
                "name": "url",
                "description": "Specify the NetSuite domain of the account you want to use. You only need to specify the NetSuite domain if you are not using a production account.",
                "mandatory": false
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
                "mandatory": false
            }
        }
    },
    "config:proxy": {
        "name": "config:proxy",
        "description": "Configures a proxy server.",
        "isSetupRequired": false,
        "options": {
            "clear": {
                "name": "clear",
                "alias": "c",
                "description": "Remove the last proxy server you set.",
                "type": "FLAG",
                "mandatory": false
            },
            "set": {
                "name": "set",
                "alias": "s",
                "description": "Enter the URL of the server you want to use as your proxy. For example, http://my-proxy-domain:80",
                "type": "SINGLE",
                "mandatory": false
            }
        }
    },
    "suitecommerce:localserver": {
        "name": "suitecommerce:localserver",
        "description": "Generates a local server of your SuiteCommerce extensions and themes. This set of compiled files is stored in your SuiteApp project folder and the server is located on port 7777. You can use this server to run and test the SuiteCommerce themes and extensions that you are developing.",
        "isSetupRequired": false,
        "options": {
            "extensions": {
                "name": "extensions",
                "alias": "e",
                "description": "Specify the SuiteCommerce extension you want to include in your local build. To specify multiple extensions, enter the names of the objects separated by commas. The XML object must be added in the objects tag within the deploy.xml file, and in the Objects folder of your project.",
                "mandatory": false
            },
            "port": {
                "name": "port",
                "alias": "p",
                "description": "Specify the port number where the server is located.",
                "mandatory": false
            },
            "theme": {
                "name": "theme",
                "alias": "t",
                "description": "Specify the SuiteCommerce theme you want to include in your local build. You can only specify one theme. The XML object must be added in the objects tag within the deploy.xml file, and in the Objects folder of your project.",
                "mandatory": true
            }
        }
    }
};