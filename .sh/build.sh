# provide +x permissions to this file before running

# compiling typescript to javascript using tsc
# config specified at tsconfig.json
# generate build folder with following command
# ensure that required dependencies(typescript) is there before executing the next step
npm run build

# copying required files to build folder for getting a clean build while dockerizing
cp package*.json ./build
cp Dockerfile ./build

# building docker image with Dockerfile
docker build -t auth:service ./build

# removing build folder
rm -rf build



