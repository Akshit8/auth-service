###### AUTH SERVICE DOCKER IMAGE ######

# the following Dockerfile uses multi-stage build
# the builder stage builds typescript project to javascript
# the final stage build minimal docker image from javascript code produced in last step

# builder stage
# pulling base image of node 14
FROM node:14.8.0-alpine3.12 as builder

# image maintained by
LABEL maintainer="akshitsadana@gmail.com"

# setting build working directory
WORKDIR /builder

# copying configuration files
COPY package*.json ./
COPY tsconfig.json ./

# creating and copying source folders
ADD @types ./@types
ADD src ./src

# installing dependencies
RUN npm ci --no-optional

# building typescript to javascript
RUN npm run build

# final stage
FROM node:14.8.0-alpine3.12

# setting working directory
WORKDIR /app

# copy required files from builder image
COPY --from=builder /builder/package*.json ./
COPY --from=builder /builder/build ./

# installing production dependencies only
RUN npm ci --only=production --no-optional

# exposing network interface 3000
# make sure app runs on 0.0.0.0
EXPOSE 3000

# triggering start script on formation of container
CMD ["npm", "start"]