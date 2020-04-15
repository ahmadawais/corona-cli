FROM node:alpine
RUN npm install -g corona-cli
ENTRYPOINT [ "/usr/local/bin/corona" ]
CMD [ "--help" ]
