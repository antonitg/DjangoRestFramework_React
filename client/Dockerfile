FROM node:latest
ENV NODE_ENV=production
# WORKDIR /
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 3000
RUN 
CMD [ "npm", "run", "start" ]
