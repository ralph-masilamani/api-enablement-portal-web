node {

  	def nodeHome = tool 'NodeJs'
  	env.PATH="${env.PATH}:${nodeHome}/bin"

    stage ('Checkout') { checkout scm }

	stage('compile') {
		withNPM(npmrcConfig:'valueblock-npmrc') {
			sh 'yarn install --network-timeout 1000000'
			sh 'yarn run build'
		}
	}

/*
  stage('upload-site-to-s3-bucket-wwwvalueblockio') {
			withAWS(region:'eu-west-1', credentials:'jenkinss3uploader') {
			s3Upload(file:'build', bucket:'wwwvalueblockio', path:'bantz', acl:'PublicRead')
			s3Upload(file:'build/static', bucket:'wwwvalueblockio', path:'bantz/static', acl:'PublicRead')
		}
	}
	*/
}
