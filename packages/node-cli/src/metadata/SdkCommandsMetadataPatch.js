module.exports = {
	"account:manageauth": {
		"options": {
			"info": {
				"description": "Prints the following information for the specified authentication ID: account ID, role ID, and url. Usage: account:manageauth --info {authenticationID}."
			},
			"list": {
				"description": "Prints a list of all the configured authentication IDs. Usage: account:manageauth --list."
			},
			"remove": {
				"description": "Removes an authentication ID. Usage: account:manageauth --remove {authenticationID}."
			},
			"rename": {
				"description": "Renames an authentication ID. You must specify it together with the renameto option. Usage: account:manageauth --rename {authenticationID} --renameto {newAuthenticationID}."
			},
			"renameto": {
				"description": "Specifies the new ID for an authentication ID. You must specify it together with the rename option. Usage: account:manageauth --rename {authenticationID} --renameto {newAuthenticationID}."
			},
			"revoke": {
				"description": "Revokes the TBA token that was issued to your account and is linked to the specified authentication ID. Usage: account:manageauth --revoke {authenticationID}."
			}
		}
	},
	"file:import": {
		"options": {
			"calledfromcomparefiles": {
				"name": "calledfromcomparefiles",
				"option": "calledfromcomparefiles",
				"description": "Message displayed should be different if called from Compare Files.",
				"mandatory": false,
				"type": "FLAG",
				"defaultOption": false,
				"disableInIntegrationMode": false
			},
			"calledfromupdate": {
				"name": "calledfromupdate",
				"option": "calledfromupdate",
				"description": "Message displayed should be different if called from Update File.",
				"mandatory": false,
				"type": "FLAG",
				"defaultOption": false,
				"disableInIntegrationMode": false
			}
		}
	},
	"object:update": {
		"options": {
			"includeinstances": {
				"name": "includeinstances",
				"option": "includeinstances",
				"description": "Includes instances. This is only available for custom records.",
				"mandatory": false,
				"type": "FLAG",
				"usage": "",
				"defaultOption": true,
				"disableInIntegrationMode": false
			}
		}
	},
	"project:create": {
		"options": {
			"includeunittesting": {
				"name": "includeunittesting",
				"type": "FLAG",
				"disableInIntegrationMode": true
			}
		}
	},
	"project:deploy": {
		"options": {
			"dryrun": {
				"name": "dryrun",
				"option": "dryrun",
				"description": "Runs a preview of your deploy process. Your project is not deployed.",
				"mandatory": false,
				"type": "FLAG",
				"usage": "",
				"defaultOption": false,
				"disableInIntegrationMode": false
			},
			"applyinstallprefs": {
				"alias": "a"
			}
		}
	},
	"project:validate": {
		"options": {
			"applyinstallprefs": {
				"alias": "a"
			}
		}
	}
};
