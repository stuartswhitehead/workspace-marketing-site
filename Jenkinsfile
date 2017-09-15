properties([
    buildDiscarder(logRotator(numToKeepStr: '10')), disableConcurrentBuilds()
])

node('standard') {
    checkoutScm()
    if (env.BRANCH_NAME == 'master') {
        stage('Publish to S3') {
            withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'aws.s3.S3-toscana-pipeline',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
            ]]) {
                sh 'aws s3 sync ./ s3://w3.workspace.ibm.com-rnbejw7/'
            }
        }
    }
}

def checkoutScm() {
    checkout([
        $class: 'GitSCM',
        branches: scm.branches,
        extensions: scm.extensions + [[$class: 'CleanBeforeCheckout']],
        userRemoteConfigs: scm.userRemoteConfigs
    ])
}

