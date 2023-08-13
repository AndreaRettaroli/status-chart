# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory to /app
ENV WORKINGDIR=/root/app
# set working dir
WORKDIR ${WORKINGDIR}
COPY . ${WORKINGDIR}/

# Install the dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port 5173 for the application
EXPOSE 5173

# Command to start the application
CMD ["npm", "run", "dev"]