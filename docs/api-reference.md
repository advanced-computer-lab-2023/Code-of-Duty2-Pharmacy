# API Reference

This document provides a comprehensive reference for the REST API endpoints used in this software.

### Access Tokens

Access tokens are used to authenticate requests to the API. They are sent in the `Authorization` header with each request. The format of the header is `Bearer {access_token}`.

### Refresh Tokens

Refresh tokens are used to obtain a new access token when the current one expires. They are stored in `HttpOnly` cookies that are automatically sent with each request. The server sets the refresh token in a `Set-Cookie` header in the response to the login request.

## Authentication

<details>
<summary>Patient or Admin Login</summary>

```http
  POST /login/
```

Returns a refresh token in a HTTP-Only cookie and an access token in the response body to the user to login.

| Body Field | Type | Description   |
| :-------- | :--- | :------------ |
| `username`        | `string`   | **Required**. Username of the account of a Patient or Admin |
| `password`        | `string`   | **Required**. Password of the corresponding account. |

</details>

<details>
<summary>Pharmacist Login</summary>

```http
  POST /pharmacist-login/
```

Returns a refresh token in a HTTP-Only cookie and an access token in the response body to the user to login.

| Body Field | Type | Description   |
| :-------- | :--- | :------------ |
| `username`        | `string`   | **Required**. Username of the account of a Pharmacist. |
| `password`        | `string`   | **Required**. Password of the corresponding account. |

</details>

<details>
<summary>Logout</summary>

```http
  POST /logout/
```

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist, Doctor or Admin. |

Invalidates the refresh token of the user.

</details>

<details>
<summary>Refresh the access token</summary>

```http
  POST /refresh-token/
```

Returns a new access token.

| Header Parameter | Type | Description   |
| :-------- | :--- | :------------ |
| `Cookie`        | `string`   | **Required**. Refresh token previously set by the server. |

</details>

<details>
<summary>Register as Patient</summary>

```http
  POST /patient/
```

Registers a new patient.

| Body Field | Type | Description   |
| :-------- | :--- | :------------ |
| `username`        | `string`   | **Required**. Username of the new patient. |
| `name`        | `string`   | **Required**. Name of the new patient. |
| `email`        | `string`   | **Required**. Email of the new patient. |
| `password`        | `string`   | **Required**. Password of the new patient. |
| `dateOfBirth`        | `Date`   | **Required**. Date of birth of the new patient. |
| `gender`        | `string`   | **Required**. Gender of the new patient. |
| `mobileNumber`        | `string`   | **Required**. Mobile number of the new patient. |
| `emergencyContact`        | `object`   | **Required**. Username of the new patient. |

#### `emergencyContact` object:

| Attribute        | Type     | Description                                       |
| :--------------- | :------- | :------------------------------------------------ |
| `fullname`     | `string` | **Required**. Full name of the emergency contact.          |
| `mobileNumber` | `string` | **Required**. Mobile number of the emergency contact |
| `relationToPatient` | `string` | **Required**. Relation of the emergency contact to the patient. |

</details>

<details>
<summary>Register as Pharmacist</summary>

```http
  POST /pharmacist/
```

Registers a new pharmacist registration request.

| Body Field | Type | Description   |
| :-------- | :--- | :------------ |
| `username`        | `string`   | **Required**. Username of the new pharmacist. |
| `name`        | `string`   | **Required**. Name of the new pharmacist. |
| `email`        | `string`   | **Required**. Email of the new pharmacist. |
| `password`        | `string`   | **Required**. Password of the new pharmacist. |
| `dateOfBirth`        | `Date`   | **Required**. Date of birth of the new pharmacist. |
| `hourlyRate`        | `number`   | **Required**. Hourly rate for the pay of the new pharmacist. |
| `affiliation`        | `string`   | **Required**. Pharmacy to which the new pharmacist is affiliated with. |
| `educationalBackground`        | `string`   | **Required**. Educational background of the new pharmacist. |

</details>

<details>
<summary>Reset Password Request</summary>
</details>

<details>
<summary>Delete Password Reset Info</summary>
</details>

<details>
<summary>Validate Password Reset Info</summary>
</details>

<details>
<summary>Reset Password</summary>
</details>

## Medicines

<details>
<summary>Get Medicines</summary>

```http
  GET /medicines
```

Returns a list of all medicines.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist, Doctor or Admin. |

</details>

<details>
<summary>Add Medicine</summary>

```http
  POST /medicines
```

Adds a new medicine.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field          | Type       | Description                                                           |
| :------------------ | :--------- | :-------------------------------------------------------------------- |
| `name`              | `string`   | **Required**. Name of the medicine.                                   |
| `activeIngredients` | `string[]` | **Required**. Active ingredients of the medicine.                     |
| `price`             | `number`   | **Required**. The price of this medicine in EGP.                      |
| `availableQuantity` | `string`   | **Required**. The initial available stock of this medicine.           |

</details>

<details>
<summary>Get all sales of all medicines</summary>

```http
  GET /medicines/sales
```
Returns an object containing objects of medicine IDs and corresponding bought quantities.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

</details>

<details>
<summary>Get all sales of a medicine</summary>

```http
  POST /medicines/sales
```
Returns the total sales of a medicine.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field          | Type       | Description                                                           |
| :------------------ | :--------- | :-------------------------------------------------------------------- |
| `medicineId`              | `string`   | **Required**. Database ID of the medicine.                                   |

</details>

<details>
<summary>Search for Medicine</summary>

```http
  GET /medicines/search?name={name}
```

Returns medicines that match the medicine name search query.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field       | Type     | Description                                                                             |
| :-------------- | :------- | :-------------------------------------------------------------------------------------- |
| `name`          | `string` | **Required**. Name of the medicine(s) being searched for.                               |

</details>

<details>
<summary>Bulk Update Medicine Quantities</summary>

```http
  PATCH /medicines/bulk-update
```

Updates quantities of bought medicines.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field | Type       | Description                             |
| :-------- | :--------- | :-------------------------------------- |
| `updates` | `object[]` | **Required**. Updates to the medicines. |

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

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Pharmacist. |

| Body Field           | Type       | Description                                                                   |
| :------------------ | :--------- | :---------------------------------------------------------------------------- |
| `id`                | `string`   | **Required**. Database ID of a medicine.                                      |
| `name`              | `string`   | **Optional**. Name of the medicine.                                           |
| `price`             | `number`   | **Optional**. Price of the medicine.                                          |
| `description`       | `number`   | **Optional**. Description of the medicine.                                    |
| `usages`            | `string[]` | **Optional**. Medicinal usages of the medicine.                               |
| `activeIngredients` | `string[]` | **Optional**. Active Ingredients of the medicine.                             |
| `pictureUrl`        | `number`   | **Optional**. URL of the medicine's picture, uploaded to the Firebase bucket. |
| `availableQuantity` | `number`   | **Optional**. Available stock of the medicine.                                |

</details>

## Admins

<details>
<summary>Get Admins</summary>

```http
  GET /admins
```

Returns all admins.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

</details>

<details>
<summary>Add Admin</summary>

```http
  POST /admins
```

Creates a new admin.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Body Field | Type | Description   |
| :-------- | :--- | :------------ |
| `username`        | `string`   | **Required**. Username of the new Admin. |
| `password`        | `string`   | **Required**. Password of the new Admin. |

</details>

<details>
<summary>Admin Change Password</summary>

```http
  POST /admins/change-password
```

Changes an admin's password.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Body Field | Type | Description   |
| :-------- | :--- | :------------ |
| `currentPassword`        | `string`   | **Required**. Current password of the Admin. |
| `newPassword`        | `string`   | **Required**. New password of the Admin. |

</details>

<details>
<summary>Delete Admin</summary>

```http
  DELETE /admins/:id
```

Deletes an admin.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Admin. |

| Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `id` | `string` | **Required**. Database ID of the Admin to be deleted. |

</details>

## Patients

## Pharmacists

## Stripe Payments

<details>
<summary>Get Stripe Publishable Key</summary>

```http
  GET /payments/config
```

Returns stripe publishable key.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>

<details>
<summary>Create Stripe Payment Intent</summary>

```http
  POST /payments/create-payment-intent
```

Creates a new stripe payment intent and returns the client secret.

| Header Parameter          | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient. |

</details>