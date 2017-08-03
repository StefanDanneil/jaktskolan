#!/bin/bash

echo "Db username"
read user
echo "db password"
read password
echo "db name"
read name
echo "db hostname"
read host

if [ -f config.ini ]; then
    echo "This will override the existing config file. Continue? (y/n)"
    read override

    if [[ "$override" != "y" ]] ; then
        exit 1
    fi
fi

touch config.ini

printf "[database]\nusername = "$user" \npassword = "$password"\ndbname = "$name"\nhost = "$host"" > config.ini
