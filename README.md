# Offline encryption tool using Advanced Encryption Standard

## Usage

Create a vault by setting a master password

![Creating vault](./docs/create_vault.png)

Navigate `Create resource`. Set data that you want to encrypt into `Sensitive data` field. Give a name to your record. Click `Save` button

![Storing data](./docs/store_data.png)

Enter your master password to confirm the change. The password is bound to the encrypted session.

> All data is encrypted using [cipher](src/utils/cipher.js) and persisted in the localStorage

![Before storing data](./docs/before_store_data.png)

To read the encrypted data click `Edit resource`

![Reading data](./docs/read_data.png)

Enter your master password

![Before viewing data](./docs/before_view_data.png)

View your data

![Viewing data](./docs/view_data.png)

To view all records navigate `All resources`

![Viewing all resources](./docs/all_resources.png)

To logout refresh or close the page

> You may also destroy your data by clicking `Destroy session`

![Login](./docs/login.png)
