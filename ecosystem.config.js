module.exports = {
  apps : [{
    name: "nutriapi",
    script: 'index.js',
    watch: '.',
    env: {
      "NODE_ENV": "development",
      "PATHSWAGGER": "http://localhost:3000",
      "MONGODB_URI": "mongodb+srv://admin:admin12345@nutriappcluster.4e7o2.mongodb.net/nutriapp",
      
    }
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
