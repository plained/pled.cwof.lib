#Using temporary image
FROM node:latest 
LABEL maintainer govindaraj.rangan@gmail.com
RUN apt-get update && apt-get install -y \
  nodejs npm && rm -rf /var/lib/apt/lists/*
# set default workdir  
COPY ./ /opt/
WORKDIR /opt
RUN npm install
# Run Web Server
CMD ["npm", "start"]
EXPOSE 3000