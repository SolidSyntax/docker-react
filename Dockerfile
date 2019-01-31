#Multi-step build example
#Creates an image for the build environment
#And an image for the production result

#Builder image
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#Builder results are now stored in '/app/build'

#Run image
FROM nginx
#EXPOSE is not used by the local docker
#Used by aws elastic beanstalk to map ports  
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
