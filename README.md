# semat-web - http://semat.org/

SEMAT (Software Engineering Method and Theory) drives a process to refound software engineering based on a solid theory, proven principles and best practices

Generated from - https://github.com/SINTEF-9012/remics-essence

![Semat](images/things_to_work_with.png)

### Test Locally
You need node6 and npm3:

```
npm i
npm start
```

Browse to:

```
https://localhost:8080/
```

### Deploy on Openshift

You need a node6 s2i builder image for h2:

```
oc import-image centos7-s2i-nodejs --from=docker.io/ryanj/centos7-s2i-nodejs:current --confirm -n openshift
oc tag -n openshift --insecure=true --source=docker docker.io/ryanj/centos7-s2i-nodejs:current openshift/centos7-s2i-nodejs:latest
```

Build and Deploy:

```
oc new-project semat
oc new-build --binary --name=semat -l app=semat -i centos7-s2i-nodejs
oc start-build semat --from-dir=. --follow
oc new-app semat
oc expose svc semat
oc patch route/semat -p '{"spec":{"tls":{"termination":"passthrough"}}}'
```

[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](http://creativecommons.org/licenses/by/4.0/)
