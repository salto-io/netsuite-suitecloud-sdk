module.exports = {
	"account:manageauth": {
		"options": {
			"info": {
				"description": "Prints the following information for the specified authentication ID (authID): account ID, role ID, and url. Usage: account:manageauth --info {authID}."
			},
			"list": {
				"description": "Prints a list of all the configured authentication IDs (authID). Usage: account:manageauth --list."
			},
			"remove": {
				"description": "Remove an authentication ID (authID). Usage: account:manageauth --remove {authID}."
			},
			"rename": {
				"description": "Rename an authentication ID (authID). You must specify it together with the renameto option. Usage: account:manageauth --rename {authID} --renameto {newauthID}."
			},
			"renameto": {
				"description": "Enter the new ID for an authentication ID (authID). You must specify it together with the rename option. Usage: account:manageauth --rename {authID} --renameto {newauthID}."
			},
			"revoke": {
				"description": "Revokes the TBA token that was issued to your account and is linked to the specified authentication ID (authID). Usage: account:manageauth --revoke {authID}."
			}
		}
	},
	"object:import": {
		"options": {
			"scriptid": {
				"description": "Specify the script ID. You can import one custom object or all custom objects. For example, \"--scriptid customrecord_1\" imports only one object, and \"--scriptid ALL\" imports all custom objects of the specified type."
			}
		}
	},
	"file:import": {
		"description": "Imports files from an account to your account customization project. You cannot import files from a SuiteApp.",
		"options": {
			"paths": {
				"description": "Specify the file cabinet path of the file to import. For example, \"/SuiteScripts/file.js\"."
			}
		}
	},
	"file:upload": {
		"options": {
			"paths": {
				"description": "Specify the file cabinet path of the file to upload. For example, \"/SuiteScripts/file.js\"."
			}
		}
	}
};
