# to run readTmp.js you will need the following packages:
# i2c-bus, request
# 
npm install -g i2c-bus

npm install -g request

# this adds the readTmp.js to the crontab
echo "# 
45 * * * * root /root/ECE497repo/hw05/DataPush/readTmp.js
" >> /etc/crontab 