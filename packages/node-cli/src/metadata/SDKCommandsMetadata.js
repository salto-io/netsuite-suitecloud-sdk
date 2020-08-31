module.exports = {
  "project:adddependencies": {
    "name": "project:adddependencies",
    "sdkCommand": "adddependencies",
    "usage": "",
    "description": "Adds the missing dependencies to the manifest file.",
    "isSetupRequired": false,
    "options": [
      {
        "name": "all",
        "option": "all",
        "description": "Add all missing dependencies to the SuiteCloud project. When specified, ensure that you do not use the -feature, -file, and -object options.",
        "mandatory": false,
        "type": "FLAG",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "feature",
        "option": "feature",
        "description": "Specify the feature dependency references to add to the project. Each reference is a name:value pair that is delimited by a space. For example, CUSTOMRECORD:required. When specified, ensure that you do not use the -all option.",
        "mandatory": false,
        "type": "MULTIPLE",
        "usage": "CUSTOMRECORD:required [...]",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "file",
        "option": "file",
        "description": "Specify the files to add to the project. When specified, ensure that you do not use the -all option.",
        "mandatory": false,
        "type": "MULTIPLE",
        "usage": "\/js\/test.js [...]",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "object",
        "option": "object",
        "description": "Specify the object script IDs to add to the project. When specified, ensure that you do not use the -all option.",
        "mandatory": false,
        "type": "MULTIPLE",
        "usage": "scriptid [...]",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "project",
        "option": "project",
        "description": "Set the folder or zipped file containing the project. It overrides the default project.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "c:\/project\/",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  },
  "project:create": {
    "name": "project:create",
    "sdkCommand": "createproject",
    "usage": "",
    "description": "Creates a SuiteCloud project, either a SuiteApp or an account customization project (ACP).",
    "isSetupRequired": false,
    "options": [
      {
        "name": "parentdirectory",
        "option": "parentdirectory",
        "description": "Set the parent folder where to create the project.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "d:\/foo\/bar",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "overwrite",
        "option": "overwrite",
        "description": "Overwrite the existing project.",
        "mandatory": false,
        "type": "FLAG",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "type",
        "option": "type",
        "description": "Specify the project type.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "ACCOUNTCUSTOMIZATION",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "projectname",
        "option": "projectname",
        "description": "Specify the project name.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "FooBar",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "publisherid",
        "option": "publisherid",
        "description": "Specify the publisher ID. It is mandatory for SuiteApps.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "com.netsuite",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "projectid",
        "option": "projectid",
        "description": "Specify the project ID. It is mandatory for SuiteApps.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "foobar",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "projectversion",
        "option": "projectversion",
        "description": "Specify the project version. It is mandatory for SuiteApps.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "1.0.0",
        "defaultOption": false,
        "disableInIntegrationMode": false
      }
    ]
  },
  "project:deploy": {
    "name": "project:deploy",
    "sdkCommand": "deploy",
    "usage": "",
    "description": "Deploys the folder containing the project. The project folder is zipped before deployment, only including the files and folders referenced in the deploy.xml file.",
    "isSetupRequired": true,
    "options": [
      {
        "name": "log",
        "option": "log",
        "description": "Sets the deployment log file location, as either a directory or a file name. If it is a directory, a default log file is generated in the specified location. If a log file already exists in the specified location, deployment log details are appended to that existing file.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "d:\/path\/test.log",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "validate",
        "option": "validate",
        "description": "Validate the project before deploying. If an error ocurrs during the deployment, the process is stopped.",
        "mandatory": false,
        "type": "FLAG",
        "alias": "v",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "no_preview",
        "option": "no_preview",
        "description": "Skip the preview step.",
        "mandatory": false,
        "type": "FLAG",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "skip_warning",
        "option": "skip_warning",
        "description": "Indicates that the warning before deployment to production account will be skipped.",
        "mandatory": false,
        "type": "FLAG",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "applycontentprotection",
        "option": "applycontentprotection",
        "description": "Apply the content protection settings from the hiding.xml and locking.xml files. It only applies to SuiteApps.",
        "mandatory": false,
        "type": "FLAG",
        "alias": "c",
        "usage": "T",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "accountspecificvalues",
        "option": "accountspecificvalues",
        "description": "Indicate how to handle the presence of account-specific values in an account customization project. If there are account-specific values in the project, enter WARNING to continue with the deployment process, or ERROR to stop it. If the option is not specified, the default value is ERROR. It only applies to account customization projects.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "WARNING",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "project",
        "option": "project",
        "description": "Set the folder or zipped file containing the project. It overrides the default project.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "c:\/project\/",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  },
  "file:import": {
    "name": "file:import",
    "sdkCommand": "importfiles",
    "usage": "",
    "description": "Imports files from an account to your account customization project. You cannot import files from a SuiteApp.",
    "isSetupRequired": true,
    "options": [
      {
        "name": "paths",
        "option": "paths",
        "description": "Specify the File Cabinet paths of the files to import. For example, \"\/SuiteScripts\".",
        "mandatory": true,
        "type": "MULTIPLE",
        "usage": "\"\/SuiteScripts\/test.js\"",
        "defaultOption": true,
        "disableInIntegrationMode": false
      },
      {
        "name": "excludeproperties",
        "option": "excludeproperties",
        "description": "Exclude all file properties within the .attributes folder.",
        "mandatory": false,
        "type": "FLAG",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "project",
        "option": "project",
        "description": "Set the folder or zipped file containing the project. It overrides the default project.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "c:\/project\/",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  },
  "object:import": {
    "name": "object:import",
    "sdkCommand": "importobjects",
    "usage": "",
    "description": "Imports custom objects from your NetSuite account to the SDF project. In account customization projects (ACP), if SuiteScript files are referenced in the custom objects you import, these files get imported by default.",
    "isSetupRequired": true,
    "options": [
      {
        "name": "appid",
        "option": "appid",
        "description": "Specify your application ID. If specified, only custom objects with that application ID are imported. Otherwise, only custom objects with no application ID are imported.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "org.mycompany.helloworldapp",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "scriptid",
        "option": "scriptid",
        "description": "Specify the script ID. To specify multiple IDs, enter the IDs separated by spaces. Enter \"ALL\" to import all custom objects of the specified type.",
        "mandatory": true,
        "type": "MULTIPLE",
        "usage": "customrecord_tes01 customrecord_test02 [...]",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "type",
        "option": "type",
        "description": "Specify the type of custom objects to import. Enter \"ALL\" to import all custom objects. To see what custom objects are supported by SDF, see https:\/\/system.netsuite.com\/app\/help\/helpcenter.nl?fid=sdfxml.html.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "customrecordtype",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "destinationfolder",
        "option": "destinationfolder",
        "description": "Specify the project folder where objects will be stored. It must be within the Objects folder of your project. For example, \/Objects\/MyObjects.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "\/Objects",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "excludefiles",
        "option": "excludefiles",
        "description": "Indicates that the SuiteScript files referenced in custom objects are not imported. It can only be used in account customization projects (ACP).",
        "mandatory": false,
        "type": "FLAG",
        "usage": "\/Objects",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "project",
        "option": "project",
        "description": "Set the folder or zipped file containing the project. It overrides the default project.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "c:\/project\/",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  },
  "file:list": {
    "name": "file:list",
    "sdkCommand": "listfiles",
    "usage": "",
    "description": "Lists the files in the File Cabinet of your account.",
    "isSetupRequired": true,
    "options": [
      {
        "name": "folder",
        "option": "folder",
        "description": "Specify the File Cabinet path, for example, \"\/SuiteScripts\". All files within subfolders are included.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "\"\/SuiteScripts\"",
        "defaultOption": true,
        "disableInIntegrationMode": false
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  },
  "object:list": {
    "name": "object:list",
    "sdkCommand": "listobjects",
    "usage": "",
    "description": "Lists the custom objects deployed in an account.",
    "isSetupRequired": true,
    "options": [
      {
        "name": "appid",
        "option": "appid",
        "description": "Specify your application ID. If specified, only custom objects with that application ID are listed. Otherwise, only custom objects with no application ID are listed.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "org.mycompany.helloworldapp",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "scriptid",
        "option": "scriptid",
        "description": "Specify the script ID. If you specify it, only objects containing that script ID will be listed. Otherwise, all objects are listed.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "customrecord",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "type",
        "option": "type",
        "description": "Specify the type of custom objects to list. To specify multiple types, enter the types separated by spaces. Otherwise, all types are listed. To see what custom objects are supported by SDF, see https:\/\/system.netsuite.com\/app\/help\/helpcenter.nl?fid=sdfxml.html.",
        "mandatory": false,
        "type": "MULTIPLE",
        "usage": "customrecordtype workflow [...]",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  },
  "object:update": {
    "name": "object:update",
    "sdkCommand": "update",
    "usage": "",
    "description": "Overwrites the custom objects in the project with the custom objects in an account.",
    "isSetupRequired": true,
    "options": [
      {
        "name": "scriptid",
        "option": "scriptid",
        "description": "Specify the script ID of the objects you want to overwrite.",
        "mandatory": true,
        "type": "MULTIPLE",
        "usage": "scriptid [...]",
        "defaultOption": true,
        "disableInIntegrationMode": false
      },
      {
        "name": "project",
        "option": "project",
        "description": "Set the folder or zipped file containing the project. It overrides the default project.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "c:\/project\/",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  },
  "project:validate": {
    "name": "project:validate",
    "sdkCommand": "validate",
    "usage": "",
    "description": "Validates the folder containing the SuiteCloud project.",
    "isSetupRequired": true,
    "options": [
      {
        "name": "log",
        "option": "log",
        "description": "Sets the validation log file location, as either a directory or a file name. If it is a directory, a default log file is generated in the specified location. If a log file already exists in the specified location, validation log details are appended to that existing file.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "d:\/path\/test.log",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "server",
        "option": "server",
        "description": "Indicates that the server will perform the validation.",
        "mandatory": false,
        "type": "FLAG",
        "alias": "s",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "applycontentprotection",
        "option": "applycontentprotection",
        "description": "Apply the content protection settings from the hiding.xml and locking.xml files. It only applies to SuiteApps.",
        "mandatory": false,
        "type": "FLAG",
        "alias": "c",
        "usage": "T",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "accountspecificvalues",
        "option": "accountspecificvalues",
        "description": "Indicate how to handle the presence of account-specific values in an account customization project. If there are account-specific values in the project, enter WARNING to continue with the deployment process, or ERROR to stop it. If the option is not specified, the default value is ERROR. It only applies to account customization projects.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "WARNING",
        "defaultOption": false,
        "disableInIntegrationMode": false
      },
      {
        "name": "project",
        "option": "project",
        "description": "Set the folder or zipped file containing the project. It overrides the default project.",
        "mandatory": true,
        "type": "SINGLE",
        "usage": "c:\/project\/",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "url",
        "option": "url",
        "description": "Specify the domain URL. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "email",
        "option": "email",
        "description": "Specify your email address. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "account",
        "option": "account",
        "description": "Specify your account ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "role",
        "option": "role",
        "description": "Specify the role ID. It overrides the SDF file settings.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      },
      {
        "name": "authid",
        "option": "authid",
        "description": "References the custom name you gave to a specific account-role combination. When you use this option in a command execution, you should not specify any of the following options: -email, -account, -url, or -role.",
        "mandatory": false,
        "type": "SINGLE",
        "usage": "",
        "defaultOption": false,
        "disableInIntegrationMode": true
      }
    ]
  }
};