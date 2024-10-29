
How to Puch to ECR 
==================

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 777189480975.dkr.ecr.eu-central-1.amazonaws.com

docker build -t csp-demo/csp .

docker tag csp-demo/csp:latest 777189480975.dkr.ecr.eu-central-1.amazonaws.com/csp-demo/csp:latest


docker push 777189480975.dkr.ecr.eu-central-1.amazonaws.com/csp-demo/csp:latest


How to Apply the csp-deployment on eks
=======================================

with_dst_mgmt k apply  -f csp-deployment/csp-deployment.yaml

with_dst_mgmt k apply  -f csp-deployment/csp-ingress.yaml

with_dst_mgmt k apply  -f csp-deployment/csp-service.yaml


To check service endpoint 
--------------------------
with_dst_mgmt  kubectl get endpoints csp-service