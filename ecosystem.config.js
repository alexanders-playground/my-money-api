module.exports = {
	  apps: [{
		      name: 'my-money',
		      script: './myserver.js'
		    }],
	  deploy: {
		      production: {
			            user: 'alexander',
			            host: 'ec2-13-55-104-12.ap-southeast-2.compute.amazonaws.com',
			            key: '~/.ssh/id_rsa',
			            ref: 'origin/master',
			            repo: 'git@github.com:alexanders-playground/my-money-api.git',
			            path: '/var/server/',
			            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
			          }
		    }
}
