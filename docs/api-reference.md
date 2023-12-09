# API Reference

This document provides a comprehensive reference for the REST API endpoints used in this software.

## Medicines

#### Get all medicines

```http
  GET /medicines
```

| Parameter       | Type     | Description                                                                                     |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist, Doctor or Admin. |

#### Add a new medicine

```http
  POST /medicines
```

| Parameter           | Type       | Description                                                           |
| :------------------ | :--------- | :-------------------------------------------------------------------- |
| `name`              | `string`   | **Required**. Name of the medicine.                                   |
| `activeIngredients` | `string[]` | **Required**. Active ingredients of the medicine.                     |
| `price`             | `number`   | **Required**. The price of this medicine in EGP.                      |
| `availableQuantity` | `string`   | **Required**. The initial available stock of this medicine.           |
| `Authorization`     | `string`   | **Required**. JWT Token signed by a user having a role of Pharmacist. |

#### Search for medicines

```http
  GET /medicines/search?name={name}
```

| Parameter       | Type     | Description                                                                             |
| :-------------- | :------- | :-------------------------------------------------------------------------------------- |
| `name`          | `string` | **Required**. Name of the medicine(s) being searched for.                               |
| `Authorization` | `string` | **Required**. JWT Token signed by a user having a role of Patient, Pharmacist or Admin. |

#### Update quantities of bought medicines

```http
  PATCH /medicines/bulk-update
```

| Parameter | Type       | Description                             |
| :-------- | :--------- | :-------------------------------------- |
| `updates` | `object[]` | **Required**. Updates to the medicines. |

#### `updates` array:

- Contains multiple `update` objects. Each `update` object has the following structure:

| Attribute        | Type     | Description                                       |
| :--------------- | :------- | :------------------------------------------------ |
| `medicineId`     | `string` | **Required**. Database ID of a medicine.          |
| `boughtQuantity` | `number` | **Required**. Quantity bought from that medicine. |

#### Update a medicine's details

```http
  PATCH /medicines/:id
```

| Parameter           | Type       | Description                                                                   |
| :------------------ | :--------- | :---------------------------------------------------------------------------- |
| `id`                | `string`   | **Required**. Database ID of a medicine.                                      |
| `Authorization`     | `string`   | **Required**. JWT Token signed by a user having a role of Pharmacist.         |
| `name`              | `string`   | **Optional**. Name of the medicine.                                           |
| `price`             | `number`   | **Optional**. Price of the medicine.                                          |
| `description`       | `number`   | **Optional**. Description of the medicine.                                    |
| `usages`            | `string[]` | **Optional**. Medicinal usages of the medicine.                               |
| `activeIngredients` | `string[]` | **Optional**. Active Ingredients of the medicine.                             |
| `pictureUrl`        | `number`   | **Optional**. URL of the medicine's picture, uploaded to the Firebase bucket. |
| `availableQuantity` | `number`   | **Optional**. Available stock of the medicine.                                |

## Authentication

#### Patient or Admin login

```http
  POST /login/
```

| Parameter | Type | Description   |
| :-------- | :--- | :------------ |
| ``        | ``   | **Required**. |

#### Pharmacist login

```http
  POST /pharmacist-login/
```

| Parameter | Type | Description   |
| :-------- | :--- | :------------ |
| ``        | ``   | **Required**. |

#### Logout

```http
  POST /logout/
```

| Parameter | Type | Description   |
| :-------- | :--- | :------------ |
| ``        | ``   | **Required**. |

#### Refresh an old access token

```http
  POST /refresh-token/
```

| Parameter | Type | Description   |
| :-------- | :--- | :------------ |
| ``        | ``   | **Required**. |

#### Register as Patient

```http
  POST /patient/
```

| Parameter | Type | Description   |
| :-------- | :--- | :------------ |
| ``        | ``   | **Required**. |

#### Register as Pharmacist

```http
  POST /pharmacist/
```

| Parameter | Type | Description   |
| :-------- | :--- | :------------ |
| ``        | ``   | **Required**. |
