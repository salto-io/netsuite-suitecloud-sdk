module.exports = {
    "account:setup": {
        "name": "account:setup",
        "alias": "sa",
        "description": "Sets up an account to use with the SuiteCloud CLI for Node.js.",
        "isSetupRequired": false,
        "options": [
            {
                "name": "dev",
                "alias": "d",
                "description": "Specify the domain URL of the account you want to use. You only need to specify the domain URL if you are not using a production account.",
                "type": "FLAG",
                "mandatory": false
            },
            {
              "name": "authid",
              "option": "authid",
              "description": "Specify an existing or a new authentication id.",
              "mandatory": true,
              "type": "SINGLE",
              "usage": "123",
              "defaultOption": false,
              "disableInIntegrationMode": false
            },
            {
              "name": "accountid",
              "option": "accountid",
              "description": "Specify the account id.",
              "mandatory": false,
              "type": "SINGLE",
              "usage": "2056431",
              "defaultOption": false,
              "disableInIntegrationMode": false
            },
            {
              "name": "tokenid",
              "option": "tokenid",
              "description": "Specify the token id.",
              "mandatory": false,
              "type": "SINGLE",
              "usage": "342gf354124235saddsb12351as23412341dssvdsf141dsfq",
              "defaultOption": false,
              "disableInIntegrationMode": false
            },
            {
              "name": "tokensecret",
              "option": "tokensecret",
              "description": "Specify the token secret.",
              "mandatory": false,
              "type": "SINGLE",
              "usage": "34hj23g4jhk23kf4g123f51g23f5jh23g4hj134123j1l2k3j",
              "defaultOption": false,
              "disableInIntegrationMode": false
            }
        ]
    },
    "suitecommerce:localserver": {
        "name": "suitecommerce:localserver",
        "description": "Generates a local server of your SuiteCommerce extensions and themes. This set of compiled files is stored in your SuiteApp project folder and the server is located on port 7777. You can use this server to run and test the SuiteCommerce themes and extensions that you are developing.",
        "isSetupRequired": false,
        "options": [
            {
                "name": "theme",
                "alias": "t",
                "description": "Specify the SuiteCommerce theme you want to include in your local build. You can only specify one theme. The XML object must be added in the objects tag within the deploy.xml file, and in the Objects folder of your project.",
                "mandatory": true
            },
            {
                "name": "extensions",
                "alias": "e",
                "description": "Specify the SuiteCommerce extension you want to include in your local build. To specify multiple extensions, enter the names of the objects separated by commas. The XML object must be added in the objects tag within the deploy.xml file, and in the Objects folder of your project.",
                "mandatory": false
            },
            {
                "name": "port",
                "alias": "p",
                "description": "Specify the port number where the server is located.",
                "mandatory": false
            }
        ]
    },
    "config:proxy": {
        "name": "config:proxy",
        "description": "Configures a proxy server.",
        "isSetupRequired": false,
        "options": [
            {
                "name": "set",
                "alias": "s",
                "description": "Enter the URL of the server you want to use as your proxy. For example, http://my-proxy-domain:80",
                "type": "SINGLE",
                "mandatory": false
            },
            {
                "name": "clear",
                "alias": "c",
                "description": "Remove the last proxy server you set.",
                "type": "FLAG",
                "mandatory": false
            }
        ]
    }
};