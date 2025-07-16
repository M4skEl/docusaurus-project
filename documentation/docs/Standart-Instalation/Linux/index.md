---
sidebar_position: 1
label: 'Linux'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Linux

<ReadTime readTime={8} />

## Basic requirements

- Docker and Docker Compose plugin installed
- Run by a user who is a member of the docker group
- AVX-compatible CPU

## Main scripts

[Online installation](./Online-Installation)

[Offline installation](./Offline-Installation)

## Administration scripts

[Online installation](./Online-Installation)

[Offline installation](./Offline-Installation)

## Description and advantages

The standard installation on Linux uses Docker. Docker images are structured in such a way that all important data is stored in directories that are shared with the host machine, so you can stop, delete, and create new containers.

Configuration files are also stored in mounted directories, so most configuration changes to components can be made without modifying Docker images or containers directly. To do this, make changes to the configuration file of the necessary component and restart the container.

## Contents

The build consists of six containers. Some containers are launched by default, while the others can be enabled or disabled by changing the COMPOSE_PROFILES environment variable in the `.env` file:

**Nginx** — an image based on the official Nginx image. It is launched by default.

**PHP** — an image with PHP and PHP-FPM based on Ubuntu. It is launched by default.

**Cron** — a separate container based on the PHP image for running scheduled tasks. It is launched by default.

**PSMDB** — an image based on the official Percona Server for MongoDB image. Startup can be disabled if an external MongoDB/PSMDB is being used.

**Postfix** — an image with Postfix based on Ubuntu. It can be disabled if notifications are sent through PHP Mailer.

**Certbot** — the official Certbot image from Let's Encrypt. It is necessary if you are using a certificate from Let's Encrypt. It can be disabled if you are using other SSL certificates.

## Scripts and commands

### Scripts

`update.sh` — performs updates of the application code to the latest version available in your license.

`db-backup.sh` — backup all databases to the backup folder.

`db-restore.sh` — restores the backup. If no backup name is passed, a list of available backups from the backup folder will be displayed.

`collect-log.sh` — collects component logs.

`collect-conf.sh` — collects component configuration files.

### Commands

`docker compose stop` — stop the service

`docker compose restart` — restart the service

`docker compose start` — start a stopped service

`docker compose down` — remove the service. Data, including the database and configuration files, will be preserved.

## Parameters and settings

### Parameters

Most of the settings can be applied through environment variables in `.env` or by modifying the configuration file of a separate component:

| Parameter             | Default value                                                                                                                                                                                                                 | Description                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| CERT                  | Passwork certificate number. Used in the upgrade script to retrieve application files from the customer portal.                                                                                                               | XXX-XXX-XXX-XXX-XXXXXXXXXXXX                 |
| USE_LETSENCRYPT       | Use Certbot to issue SSL certificates                                                                                                                                                                                         | false                                        |
| LETSENCRYPT_STAGING   | Test mode for certbot. Useful for debugging, since Let's Encrypt has a limit on the number of requests. Defaults to true to avoid errors due to a misconfigured DNS record or others. It is recommended to use staging first. | true                                         |
| LETSENCRYPT_REG_EMAIL | Email for Let's encrypt                                                                                                                                                                                                       |                                              |
| DOMAIN                | Domain for Let's encrypt                                                                                                                                                                                                      |                                              |
| ALIAS_CONTAINERS_NAME | Container's name prefix                                                                                                                                                                                                       | "passwork\_"                                 |
| COMPOSE_PROFILES      | Compose profiles that allow you to enable/disable the startup of services                                                                                                                                                     | "local_notify,mong 0"                        |
| PHP_CONF_DIR          | PHP config directory                                                                                                                                                                                                          | ./conf/php                                   |
| PHP_LOG_DIR           | PHP logs directory                                                                                                                                                                                                            | ./log/php                                    |
| APP_DIR               | Passwork application directory                                                                                                                                                                                                | ./www/latest (symlink to the latest version) |
| APP_LOG_DIR           | Application logs directory                                                                                                                                                                                                    | ./log/app                                    |
| KEYS_DIR              | The directory with the license keys and main application configuration file                                                                                                                                                   | ./conf/keys                                  |
| NGINX_CONF_DIR        | Nginx config directory                                                                                                                                                                                                        | ./conf/nginx                                 |
| NGINX_LOG_DIR         | Nginx logs directory                                                                                                                                                                                                          | ./log/nginx                                  |
| SSL_DIR               | Directory with SSL certificates                                                                                                                                                                                               | ./conf/ssl                                   |
| MONGO_DATA_DIR        | Directory with mongo data                                                                                                                                                                                                     | ./data/mongo                                 |
| CUSTOM_CA_DIR         | Directory for additional root certificates (e.g. for LDAPS)                                                                                                                                                                   | ./conf/custom_ca                             |
| POSTFIX_LOG_DIR       | Postfix logs directory                                                                                                                                                                                                        | ./log/postfix                                |
| POSTFIX_CONF_DIR      | Postfix config directory                                                                                                                                                                                                      | ./conf/postfix                               |

### Saving settings

After making changes to the `.env` or configuration file of a specific component, it is necessary to restart the corresponding container.

<Tabs className="tabs-container">
  <TabItem className="tab-item-container" value="shell" label="shell">
    ```shell
    docker restart container_name
    ```
  </TabItem>
</Tabs>

To implement changes in config.ini, please execute.

<Tabs className="tabs-container">
  <TabItem className="tab-item-container" value="shell" label="shell">
    ```shell
    docker restart passwork_php
    ```
  </TabItem>
</Tabs>

<LastUpdateDate children='Updated 04 May 2025'/>