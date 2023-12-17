# API Reference

This document provides a comprehensive reference for the REST API endpoints used in this software.

### Access Tokens

Access tokens are used to authenticate requests to the API. They are sent in the `Authorization` header with each request. The format of the authorization header is `Bearer {access_token}`.

### Refresh Tokens

Refresh tokens are used to obtain a new access token when the current one expires. They are stored in `HttpOnly` cookies that are automatically sent with each request. The server sets the refresh token in a `Set-Cookie` header in the response to the login request.

### Endpoints

The endpoints are grouped herein according to the entity they manipulate or are most closely associated with. This grouping is similar, but not 1:1, to the actual grouping in the code.

**Note:** All endpoint URLs provided should be preceded by the server's URL.

- [Authentication](#authentication)
- [Medicines](#medicines)
- [Prescriptions](#prescriptions)
- [Admins](#admins)
- [Patients](#patients)
- [Pharmacists](#pharmacists)
- [Stripe Payments](#stripe-payments)

## Authentication

<details>
<summary>Patient or Admin Login</summary>

```http
  POST /auth/login/
```

Returns a refresh token in a HTTP-Only cookie and an access token in the response body to the user to login.

| Body Field | Type     | Description                                                 |
| :--------- | :------- | :---------------------------------------------------------- |
| `username` | `string` | **Required**. Username of the account of a Patient or Admin |
| `password` | `string` | **Required**. Password of the corresponding account.        |

</details>

<details>
<summary>Pharmacist Login</summary>

```http
  POST /auth/pharmacist-login/
```

Returns a refresh token in a HTTP-Only cookie and an access token in the response body to the user to login.

| Body Field | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `username` | `string` | **Required**. Username of the account of a Pharmacist. |
| `password` | `string` | **Required**. Password of the corresponding account.   |

</details>

<details>
<summary>Logout</summary>

```http
  POST /auth/logout/
```

| Header Parameter | Type     | Description                                                                                     |
| :--------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist, Doctor or Admin. |

Invalidates the refresh token of the user.

</details>

<details>
<summary>Refresh the access token</summary>

```http
  POST /auth/refresh-token/
```

Returns a new access token.

| Header Parameter | Type     | Description                                               |
| :--------------- | :------- | :-------------------------------------------------------- |
| `Cookie`         | `string` | **Required**. Refresh token previously set by the server. |

</details>

<details>
<summary>Register as Patient</summary>

```http
  POST /patient/
```

Registers a new patient.

| Body Field         | Type     | Description                                     |
| :----------------- | :------- | :---------------------------------------------- |
| `username`         | `string` | **Required**. Username of the new patient.      |
| `name`             | `string` | **Required**. Name of the new patient.          |
| `email`            | `string` | **Required**. Email of the new patient.         |
| `password`         | `string` | **Required**. Password of the new patient.      |
| `dateOfBirth`      | `Date`   | **Required**. Date of birth of the new patient. |
| `gender`           | `string` | **Required**. Gender of the new patient.        |
| `mobileNumber`     | `string` | **Required**. Mobile number of the new patient. |
| `emergencyContact` | `object` | **Required**. Username of the new patient.      |

#### `emergencyContact` object:

| Attribute           | Type     | Description                                                     |
| :------------------ | :------- | :-------------------------------------------------------------- |
| `fullname`          | `string` | **Required**. Full name of the emergency contact.               |
| `mobileNumber`      | `string` | **Required**. Mobile number of the emergency contact            |
| `relationToPatient` | `string` | **Required**. Relation of the emergency contact to the patient. |

</details>

<details>
<summary>Register as Pharmacist</summary>

```http
  POST /pharmacist/
```

Registers a new pharmacist registration request.

| Body Field              | Type     | Description                                                            |
| :---------------------- | :------- | :--------------------------------------------------------------------- |
| `username`              | `string` | **Required**. Username of the new pharmacist.                          |
| `name`                  | `string` | **Required**. Name of the new pharmacist.                              |
| `email`                 | `string` | **Required**. Email of the new pharmacist.                             |
| `password`              | `string` | **Required**. Password of the new pharmacist.                          |
| `dateOfBirth`           | `Date`   | **Required**. Date of birth of the new pharmacist.                     |
| `hourlyRate`            | `number` | **Required**. Hourly rate for the pay of the new pharmacist.           |
| `affiliation`           | `string` | **Required**. Pharmacy to which the new pharmacist is affiliated with. |
| `educationalBackground` | `string` | **Required**. Educational background of the new pharmacist.            |

</details>

<details>
<summary>Reset Password Request</summary>

```http
  POST /auth/reset-password-request
```

Initiates a request for a password reset and sends OTP to the provided email.

| Body Field | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User's email. |

</details>

<details>
<summary>Delete Password Reset Info</summary>

```http
  DELETE /auth/delete-password-reset-info
```

Deletes/Invalidates password reset information/OTP

| Body Field | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User's email. |

</details>

<details>
<summary>Validate Password Reset Info</summary>

```http
  POST /auth/validate-password-reset-info
```

Validates the OTP for password reset.

| Body Field | Type     | Description                           |
| :--------- | :------- | :------------------------------------ |
| `userData` | `object` | **Required**. User's data.            |
| `otp`      | `string` | **Required**. OTP for password reset. |

#### `userData` object:

| Attribute | Type     | Description                                                                 |
| :-------- | :------- | :-------------------------------------------------------------------------- |
| `id`      | `object` | **Required**. Database ID of the user.                                      |
| `role`    | `string` | **Required**. Role of the user (admin, patient, or pharmacist in this case) |

</details>

<details>
<summary>Reset Password</summary>

```http
  POST /auth/reset-password
```

Resets the user’s password.

| Body Field        | Type     | Description                                     |
| :---------------- | :------- | :---------------------------------------------- |
| `password`        | `string` | **Required**. New password.                     |
| `confirmPassword` | `string` | **Required**. Confirmation of the new password. |

</details>

## Medicines

<details>
<summary>Get Medicines</summary>

```http
  GET /medicines
```

Returns a list of all medicines.

| Header Parameter | Type     | Description                                                                                     |
| :--------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist, Doctor or Admin. |

</details>

<details>
<summary>Add Medicine</summary>

```http
  POST /medicines
```

Adds a new medicine.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field          | Type       | Description                                                 |
| :------------------ | :--------- | :---------------------------------------------------------- |
| `name`              | `string`   | **Required**. Name of the medicine.                         |
| `activeIngredients` | `string[]` | **Required**. Active ingredients of the medicine.           |
| `price`             | `number`   | **Required**. The price of this medicine in EGP.            |
| `availableQuantity` | `string`   | **Required**. The initial available stock of this medicine. |

</details>

<details>
<summary>Get all sales of all medicines</summary>

```http
  GET /medicines/sales
```

Returns an object containing objects of medicine IDs and corresponding bought quantities.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

</details>

<details>
<summary>Get all sales of a medicine</summary>

```http
  POST /medicines/sales
```

Returns the total sales of a medicine.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field   | Type     | Description                                |
| :----------- | :------- | :----------------------------------------- |
| `medicineId` | `string` | **Required**. Database ID of the medicine. |

</details>

<details>
<summary>Search for Medicine</summary>

```http
  GET /medicines/search?name={name}
```

Returns medicines that match the medicine name search query.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Parameter | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `name`    | `string` | **Required**. Name of the medicine(s) being searched for. |

</details>

<details>
<summary>Bulk Update Medicine Quantities</summary>

```http
  PATCH /medicines/bulk-update
```

Updates quantities of bought medicines.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field | Type       | Description                             |
| :--------- | :--------- | :-------------------------------------- |
| `updates`  | `object[]` | **Required**. Updates to the medicines. |

#### `updates` array:

- Each object in the `updates` array has the following structure:

| Attribute        | Type     | Description                                       |
| :--------------- | :------- | :------------------------------------------------ |
| `medicineId`     | `string` | **Required**. Database ID of a medicine.          |
| `boughtQuantity` | `number` | **Required**. Quantity bought from that medicine. |

</details>

<details>
<summary>Update Medicine Details</summary>

```http
  PATCH /medicines/:id
```

Updates a medicine's details.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `string` | **Required**. Database ID of a medicine. |

| Body Field          | Type       | Description                                                                   |
| :------------------ | :--------- | :---------------------------------------------------------------------------- |
| `name`              | `string`   | **Optional**. Name of the medicine.                                           |
| `price`             | `number`   | **Optional**. Price of the medicine.                                          |
| `description`       | `number`   | **Optional**. Description of the medicine.                                    |
| `usages`            | `string[]` | **Optional**. Medicinal usages of the medicine.                               |
| `activeIngredients` | `string[]` | **Optional**. Active Ingredients of the medicine.                             |
| `pictureUrl`        | `number`   | **Optional**. URL of the medicine's picture, uploaded to the Firebase bucket. |
| `availableQuantity` | `number`   | **Optional**. Available stock of the medicine.                                |

</details>

## Prescriptions

<details>
<summary>Get Prescription</summary>

```http
  GET /prescriptions/:prescriptionId
```

Returns a prescription with the supplied id.

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

| Parameter        | Type     | Description                                                    |
| :--------------- | :------- | :------------------------------------------------------------- |
| `prescriptionId` | `string` | **Required**. Database ID of the prescription to be retrieved. |

</details>

<details>
<summary>Add Medicine To Prescription</summary>

```http
  POST /prescriptions/:prescriptionId/medicines
```

Adds a medicine to a prescription.

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

| Parameter        | Type     | Description                                    |
| :--------------- | :------- | :--------------------------------------------- |
| `prescriptionId` | `string` | **Required**. Database ID of the prescription. |

| Body Field   | Type     | Description                                                              |
| :----------- | :------- | :----------------------------------------------------------------------- |
| `medicineId` | `string` | **Required**. Database ID of a medicine to be added to the prescription. |

</details>

<details>
<summary>Remove Medicine From Prescription</summary>

```http
  DELETE /prescriptions/:prescriptionId/medicines/:medicineId
```

Removes a medicine from a prescription.

| Header Parameter | Type     | Description                                                       |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Doctor. |

| Parameter        | Type     | Description                                    |
| :--------------- | :------- | :--------------------------------------------- |
| `prescriptionId` | `string` | **Required**. Database ID of the prescription. |

| Parameter    | Type     | Description                                                                    |
| :----------- | :------- | :----------------------------------------------------------------------------- |
| `medicineId` | `string` | **Required**. Database ID of the medicine to be removed from the prescription. |

</details>

## Admins

<details>
<summary>Get Admins</summary>

```http
  GET /admins
```

Returns all admins.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Add Admin</summary>

```http
  POST /admins
```

Creates a new admin.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Body Field | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `username` | `string` | **Required**. Username of the new Admin. |
| `password` | `string` | **Required**. Password of the new Admin. |

</details>

<details>
<summary>Admin Change Password</summary>

```http
  POST /admins/change-password
```

Changes an admin's password.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Body Field        | Type     | Description                                  |
| :---------------- | :------- | :------------------------------------------- |
| `currentPassword` | `string` | **Required**. Current password of the Admin. |
| `newPassword`     | `string` | **Required**. New password of the Admin.     |

</details>

<details>
<summary>Delete Admin</summary>

```http
  DELETE /admins/:id
```

Deletes an admin.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Required**. Database ID of the Admin to be deleted. |

</details>

<details>
<summary>View Sales Report</summary>

```http
  GET /admins/areport-data
```

Gets all orders, along with bought medicines info needed (medicine name,Id,price)

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

## Patients

<details>
<summary>Get Patients</summary>

```http
  GET /patients
```

Returns all patients.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Get a Patient's Orders</summary>

```http
  GET /patients/orders
```

Returns the orders of the logged in patient. Uses the Patient ID embedded in the Access Token of the logged in patient to get his/her orders.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Cancel Order</summary>

```http
  DELETE /patients/orders/:orderId
```

Cancels a patient's order. Uses the Patient ID embedded in the Access Token of the logged in patient to make sure that the order being cancelled actually belongs to the patient.

| Header Parameter | Type     | Description                                                                                                                   |
| :--------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient, with the order in consideration belonging to that Patient. |

| Parameter | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| `orderId` | `string` | **Required**. Database ID of the order to be cancelled. |

</details>

<details>
<summary>Delete Patient</summary>

```http
  DELETE /patients/:id
```

Delete's a patient's account.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Parameter | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| `id`      | `string` | **Required**. Database ID of the patient to be deleted. |

</details>

<details>
<summary>Patient Change Password</summary>

```http
  POST /patients/change-password
```

Changes a patient's password.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field        | Type     | Description                                    |
| :---------------- | :------- | :--------------------------------------------- |
| `currentPassword` | `string` | **Required**. Current password of the Patient. |
| `newPassword`     | `string` | **Required**. New password of the Patient.     |

</details>

<details>
<summary>Get a Patient's Delivery Addresses</summary>

```http
  GET /patients/addresses
```

Returns a patient's delivery addresses. Uses the Patient ID embedded in the Access Token of the logged in patient to get his/her addresses.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Add a Patient's Delivery Address</summary>

```http
  POST /patients/addresses
```

Adds to a patient's delivery addresses. Uses the Patient ID embedded in the Access Token of the logged in patient to add to his/her addresses.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `address`  | `string` | **Required**. Delivery address to be added. |

</details>

<details>
<summary>Get a Patient's Details</summary>

```http
  GET /patients/me
```

Returns a patient's details. Uses the Patient ID embedded in the Access Token of the logged in patient to get his/her details.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Get Cart Items</summary>

```http
  GET /patients/me/cart
```

Returns a patient's cart items. Uses the Patient ID embedded in the Access Token of the logged in patient to get his/her cart items.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Clear Cart</summary>

```http
  DELETE /patients/me/cart
```

Clears a patient's cart from all items. Uses the Patient ID embedded in the Access Token of the logged in patient to clear his/her cart.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Add to Cart</summary>

```http
  POST /patients/me/cart
```

Adds an item to a patient's cart. Uses the Patient ID embedded in the Access Token of the logged in patient to clear his/her cart.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field   | Type      | Description                                                                                                                                                               |
| :----------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OTC`        | `boolean` | **Required**. Whether the medicine is an over-the-counter medicine or not. If it's not, then it's a prescription medicine. (Can only be bought if prescribed by a doctor) |
| `medicineId` | `string`  | **Required**. Database ID of the medicine to be added to the cart.                                                                                                        |
| `quantity`   | `number`  | **Required**. Quantity of the medicine to be added to the cart.                                                                                                           |

</details>

<details>
<summary>Remove from Cart</summary>

```http
  DELETE /patients/me/cart/:itemId
```

Remove an item from a patient's cart. Uses the Patient ID embedded in the Access Token of the logged in patient to remove from his/her cart.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Parameter | Type     | Description                                                                      |
| :-------- | :------- | :------------------------------------------------------------------------------- |
| `itemId`  | `string` | **Required**. Database ID of the medicine to be removed from the patient's cart. |

</details>

<details>
<summary>Change Cart Item Quantity</summary>

```http
  PATCH /patients/me/cart/:medicineId/change-quantity/:newQuantity
```

Updates a medicine's quantity in a patient's cart. Uses the Patient ID embedded in the Access Token of the logged in patient to update in his cart.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Parameter     | Type     | Description                                               |
| :------------ | :------- | :-------------------------------------------------------- |
| `medicineId`  | `string` | **Required**. Database ID of the medicine to be updated.  |
| `newQuantity` | `number` | **Required**. New quantity of the medicine to be updated. |

</details>

<details>
<summary>Get Cart Medicines Stock</summary>

```http
  GET /patients/me/cart-medicines-stock
```

Returns the currently available quantities of the medicines that have been placed in a patient's cart. Uses the Patient ID embedded in the Access Token of the logged in patient to access his cart.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Create Order</summary>

```http
  POST /patients/orders
```

Creates a new order belonging to this patient.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field            | Type       | Description                                                                   |
| :-------------------- | :--------- | :---------------------------------------------------------------------------- |
| `patientId`           | `string`   | **Required**. Database ID of the patient to which the new order belongs.      |
| `patientName`         | `string`   | **Required**. Name of the patient to which the new order belongs.             |
| `patientAddress`      | `string`   | **Required**. Delivery Address of the patient to which the new order belongs. |
| `patientMobileNumber` | `string`   | **Required**. Mobile Number of the patient to which the new order belongs.    |
| `medicines`           | `object[]` | **Required**. Medicines ordered in the new order.                             |
| `paidAmount`          | `number`   | **Required**. Paid amount for the order.                                      |
| `paymentMethod`       | `string`   | **Required**. Payment method of the order.                                    |

#### `medicines` array:

- Each object in the `medicines` array has the following structure:

| Attribute    | Type     | Description                                       |
| :----------- | :------- | :------------------------------------------------ |
| `medicineId` | `string` | **Required**. Database ID of a medicine.          |
| `quantity`   | `number` | **Required**. Quantity bought from that medicine. |

</details>

<details>
<summary>Check Patient Wallet Exists</summary>

```http
  GET /patients/wallets/exists
```

Returns a boolean flag determining if the logged in patient already has a wallet on the system or not. Uses the Patient ID embedded in the Access Token of the logged in patient to check for his/her wallet's existence.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Validate Wallet PIN Code</summary>

```http
  POST /patients/validate-wallet-pin-code
```

Returns a wallet token in a cookie if the supplied PIN code is validated, allowing the user to access the wallet for as long as the token is still valid. (Unexpired)

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field | Type     | Description                                                         |
| :--------- | :------- | :------------------------------------------------------------------ |
| `pinCode`  | `string` | **Required**. Wallet PIN code entered by the user, to be validated. |

</details>

<details>
<summary>Add Patient Wallet</summary>

```http
  POST /patients/wallets
```

Adds a patient's wallet. Uses the Patient ID embedded in the Access Token of the logged in patient to add his/her wallet.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field        | Type     | Description                                                     |
| :---------------- | :------- | :-------------------------------------------------------------- |
| `desiredCurrency` | `string` | **Required**. Desired Currency type for the wallet.             |
| `pinCode`         | `string` | **Required**. Wallet PIN code entered by the user.              |
| `confirmPinCode`  | `string` | **Required**. Wallet PIN code confirmation entered by the user. |

</details>

<details>
<summary>Get Patient Wallet</summary>

```http
  GET /patients/wallets
```

Returns a patient's wallet. Uses the Patient ID embedded in the Access Token of the logged in patient to retrieve his/her wallet.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Patient Make Wallet Transaction</summary>

```http
  PATCH /patients/wallet-transactions
```

Performs a transaction with a patient's wallet. Uses the Patient ID embedded in the Access Token of the logged in patient to make the transaction with his/her wallet.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field          | Type     | Description                                                       |
| :------------------ | :------- | :---------------------------------------------------------------- |
| `transactionAmount` | `string` | **Required**. Transaction amount, to be deducted from the wallet. |

</details>

<details>
<summary>Patient Recharge Wallet</summary>

```http
  PATCH /patients/wallet-recharge
```

Recharges a patient's wallet. Uses the Patient ID embedded in the Access Token of the logged in patient to recharge his/her wallet.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

| Body Field          | Type     | Description                                                                     |
| :------------------ | :------- | :------------------------------------------------------------------------------ |
| `transactionAmount` | `string` | **Required**. Transaction amount (recharged amount), to be added to the wallet. |

</details>

## Pharmacists

<details>
<summary>Get Pharmacist Registration Requests</summary>

```http
  GET /pharmacist-registration-requests
```

Returns all pharmacist registration requests.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Accept Pharmacist Registration Request</summary>

```http
  POST /pharmacist-registration-requests/accept-pharmacist-request
```

Accepts a pharmacist registration request.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Body Field | Type     | Description                                                           |
| :--------- | :------- | :-------------------------------------------------------------------- |
| `username` | `string` | **Required**. Username of the pharmacist that requested registration. |

</details>

<details>
<summary>Reject Pharmacist Registration Request</summary>

```http
  POST /pharmacist-registration-requests/reject-pharmacist-request
```

Rejects a pharmacist registration request.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Body Field | Type     | Description                                                           |
| :--------- | :------- | :-------------------------------------------------------------------- |
| `username` | `string` | **Required**. Username of the pharmacist that requested registration. |

</details>

<details>
<summary>Delete Pharmacist</summary>

```http
  DELETE /pharmacists/:id
```

Deletes a pharmacist's account.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Parameter | Type     | Description                                                |
| :-------- | :------- | :--------------------------------------------------------- |
| `id`      | `string` | **Required**. Database ID of the pharmacist to be deleted. |

</details>

<details>
<summary>Get Pharmacists</summary>

```http
  GET /pharmacists
```

Returns all pharmacists.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Search Pharmacists</summary>

```http
  GET /pharmacists/search?username={username}&email={email}
```

Searches for and returns pharmacists that match the provided search parameters.

| Header Parameter | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Parameter  | Type     | Description                                             |
| :--------- | :------- | :------------------------------------------------------ |
| `username` | `string` | **Optional**. Username of the pharmacist to search for. |
| `email`    | `string` | **Optional**. Email of the pharmacist to search for.    |

**Note:** At least **_ONE_** of the above parameters should be supplied.

</details>

<details>
<summary>Pharmacist Change Password</summary>

```http
  POST /pharmacists/change-password
```

Changes a pharmacist's password. Uses the Pharmacist ID embedded in the Access Token of the logged in pharmacist to change his/her password.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Parameter         | Type     | Description                                       |
| :---------------- | :------- | :------------------------------------------------ |
| `currentPassword` | `string` | **Optional**. Current password of the pharmacist. |
| `newPassword`     | `string` | **Optional**. New password of the pharmacist.     |

</details>

<details>
<summary>Get Pharmacist Info</summary>

```http
  GET /pharmacists/me/complete-info
```

Returns a pharmacist's info. Uses the Pharmacist ID embedded in the Access Token of the logged in pharmacist to determine whose info to return.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

</details>

<details>
<summary>Update Pharmacist Info</summary>

```http
  PATCH /pharmacists/me/complete-info
```

Updates a pharmacist's info. Uses the Pharmacist ID embedded in the Access Token of the logged in pharmacist to determine whose info to update.

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field       | Type     | Description                                                          |
| :--------------- | :------- | :------------------------------------------------------------------- |
| `name`           | `string` | **Required**. Name of the pharmacist.                                |
| `mobileNumber`   | `string` | **Required**. Mobile number of the pharmacist.                       |
| `dateOfBirth`    | `Date`   | **Required**. Date of birth of the pharmacist.                       |
| `gender`         | `string` | **Required**. Gender of the pharmacist.                              |
| `identification` | `string` | **Required**. URL to the identification document of the pharmacist.  |
| `pharmacyDegree` | `string` | **Required**. URL to the pharmacy degree of the pharmacist.          |
| `workingLicense` | `string` | **Required**. URL to the working license document of the pharmacist. |

</details>

<details>
<summary>View Sales Report</summary>

```http
  GET /pharmacists/areport-data
```

Gets all orders, along with bought medicines info needed (medicine name,Id,price)

| Header Parameter | Type     | Description                                                           |
| :--------------- | :------- | :-------------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

</details>

## Stripe Payments

<details>
<summary>Get Stripe Publishable Key</summary>

```http
  GET /payments/config
```

Returns stripe publishable key.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Create Stripe Payment Intent</summary>

```http
  POST /payments/create-payment-intent
```

Creates a new stripe payment intent and returns the client secret.

| Header Parameter | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `Authorization`  | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>
